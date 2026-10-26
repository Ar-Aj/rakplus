import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Re-derive everything the UI derives, from the source JSON, and assert it
// against the exact values the user specified.
const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'PPR CATALOG 03-11-22.json'), 'utf8'));

const EXPECT = {
  PN10: { sdr: 'SDR11', rows: [['RP1020',20,1.9,16.0,100,0.107],['RP1025',25,2.3,20.4,100,0.164],['RP1032',32,2.9,26.2,40,0.261],['RP1040',40,3.7,32.6,40,0.412],['RP1050',50,4.6,40.8,20,0.638],['RP1063',63,5.8,51.4,20,1.010],['RP1075',75,6.8,61.4,16,1.410],['RP1090',90,8.2,73.6,12,2.030],['RP10110',110,10.0,90.0,8,3.010]] },
  PN16: { sdr: 'SDR7.4', rows: [['RP1620',20,2.8,14.4,100,0.147],['RP1625',25,3.5,18.0,100,0.229],['RP1632',32,4.4,23.2,40,0.370],['RP1640',40,5.5,29.0,40,0.578],['RP1650',50,6.9,36.2,20,0.906],['RP1663',63,8.6,45.8,20,1.426],['RP1675',75,10.3,54.4,16,2.031],['RP1690',90,12.3,65.4,12,2.880],['RP16110',110,15.1,79.8,8,4.295]] },
  PN20: { sdr: 'SDR6', rows: [['RP2020',20,3.4,13.2,100,0.172],['RP2025',25,4.2,16.6,100,0.266],['RP2032',32,5.4,21.2,40,0.432],['RP2040',40,6.7,26.6,40,0.670],['RP2050',50,8.3,33.4,20,1.040],['RP2063',63,10.5,42.0,20,1.645],['RP2075',75,12.5,50.0,16,2.340],['RP2090',90,15.0,60.0,12,3.360],['RP20110',110,18.3,73.4,8,5.008]] },
  PN25: { sdr: 'SDR5', rows: [['RP2520',20,4.1,11.8,100,0.198],['RP2525',25,5.1,14.8,100,0.307],['RP2532',32,6.5,19.0,40,0.498],['RP2540',40,8.1,23.8,40,0.775],['RP2550',50,10.1,29.8,20,1.210],['RP2563',63,12.7,37.6,20,1.910],['RP2575',75,15.1,44.8,16,2.701],['RP2590',90,18.1,53.8,12,3.880],['RP25110',110,22.1,65.8,8,5.780]] },
};
const WATER_PN25 = [0.111,0.178,0.291,0.461,0.703,1.137,1.619,2.336,2.742];

const SLUG = { PN10:'ppr-green-pn10', PN16:'ppr-green-pn16', PN20:'ppr-green-pn20', PN25:'ppr-green-pn25' };
let fails = 0;
const check = (label, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { fails++; console.log('  FAIL', label, '\n    got :', JSON.stringify(got), '\n    want:', JSON.stringify(want)); }
};

for (const [pn, exp] of Object.entries(EXPECT)) {
  const p = raw.products.find((x) => x.slug === SLUG[pn]);
  const t = p.dimensionalTable;
  console.log('===', pn, exp.sdr, '===');
  check('row count', t.length, 9);
  t.forEach((r, i) => {
    const [part, od, wall, id, pack, kg] = exp.rows[i];
    check(`${part} part`, r.part, part);
    check(`${part} od`, r.dimension, od);
    check(`${part} wall`, r.wallThickness, wall);
    check(`${part} id`, r.innerDiameter, id);
    check(`${part} packing`, r.packingUnit, `${pack}Mtrs`);
    check(`${part} kg`, r.weight, kg);
    if (pn === 'PN25') check(`${part} water`, r.waterContent, WATER_PN25[i]);
    else check(`${part} water must be absent`, r.waterContent === undefined, true);
  });
}

// Yellow line must mirror green dimensions (same catalogue part numbers)
const y25 = raw.products.find((x) => x.slug === 'ppr-yellow-pn25').dimensionalTable;
const g25 = raw.products.find((x) => x.slug === 'ppr-green-pn25').dimensionalTable;
check('yellow PN25 mirrors green', y25.map((r) => [r.part, r.dimension, r.wallThickness, r.innerDiameter, r.weight, r.waterContent]),
      g25.map((r) => [r.part, r.dimension, r.wallThickness, r.innerDiameter, r.weight, r.waterContent]));

// Every generated fitting SKU must exist verbatim in the catalogue.
// NOTE: the catalogue re-prints some PART NOs under two family headings
// (e.g. RPU-20 / RPU-25 appear under BOTH "Union Both Ends Welding" and
// "Cross Over Short Type" on p.12; RPBT-25 / RPBT-32 under BOTH "Bracket for
// Pipe" and "Bracket with Clamp" on p.14) with different Pcs/Box quantities.
// So truth is keyed by (catalogueName, partNo), not partNo alone.
const gen = fs.readFileSync(path.join(__dirname, '..', 'src/lib/fittings-catalogue-data.ts'), 'utf8');
const greenFit = raw.products.find((x) => x.slug === 'ppr-fittings-green').fittingItems;

const STR = '"((?:[^"\\\\]|\\\\.)*)"';
const famRe = new RegExp(
  'catalogueName: ' + STR + '.*?skus: \\[(.*?)\\n    \\],', 'gs');
const rowRe = new RegExp(
  '\\{ partNo: ' + STR + ', dimension: ' + STR +
  ', pcsPerPacket: (\\d+), pcsPerBox: (null|\\d+), mm: \\[(.*?)\\], inches: \\[(.*?)\\] \\}', 'g');
const unq = (s) => JSON.parse('"' + s + '"');

const truth = new Map();
greenFit.forEach((f) => f.specifications.forEach((s) => {
  truth.set(`${String(f.name)}|${String(s.partNumber)}`,
    { dim: String(s.dimension), pk: s.packingUnit, bx: s.piecesPerPack ?? null });
}));

let famCount = 0, rowCount = 0, mismatch = 0;
for (const fm of gen.matchAll(famRe)) {
  famCount++;
  const catName = unq(fm[1]);
  for (const rm of fm[2].matchAll(rowRe)) {
    rowCount++;
    const partNo = unq(rm[1]);
    const t = truth.get(`${catName}|${partNo}`);
    if (!t) { mismatch++; console.log('  NOT IN CATALOGUE:', catName, '::', partNo); continue; }
    if (t.dim !== unq(rm[2]) || t.pk !== Number(rm[3]) || String(t.bx) !== rm[4]) {
      mismatch++;
      console.log('  MISMATCH', catName, partNo, '| gen:', [unq(rm[2]), rm[3], rm[4]].join('/'),
        '| truth:', [t.dim, t.pk, t.bx].join('/'));
    }
  }
}
console.log('\n=== parsed', famCount, 'families /', rowCount, 'SKU rows | catalogue families:', greenFit.length, '/ rows:', truth.size, '===');
console.log('verbatim mismatches:', mismatch);
fails += mismatch;
if (famCount !== greenFit.length) { fails++; console.log('  FAMILY COUNT MISMATCH'); }

console.log('\n' + (fails === 0 ? 'ALL CHECKS PASSED ✓' : `${fails} CHECK(S) FAILED ✗`));
process.exit(fails === 0 ? 0 : 1);