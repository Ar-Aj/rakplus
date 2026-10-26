/**
 * One-off generator: emits src/lib/fittings-catalogue-data.ts from the
 * authoritative catalogue JSON so every PART NO / DIMENSION / Pcs per
 * Packet / Pcs per Box row is verbatim (no hand transcription).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'PPR CATALOG 03-11-22.json'), 'utf8'));
const items = raw.products.find((p) => p.slug === 'ppr-fittings-green').fittingItems;

// ─── Taxonomy + copy, keyed by the JSON `type` field ───────────────────
const META = {
  'socket': ['sockets-reducers', 'Socket', 'Straight coupling joining two PP-R pipes of equal diameter by socket fusion welding.', 'p.09'],
  'reducer-socket': ['sockets-reducers', 'Reducer Socket', 'Concentric reducing coupling for joining two PP-R pipes of different diameters.', 'p.09'],
  'saddle-socket': ['sockets-reducers', 'Saddle Socket', 'Saddle-tee that taps a branch off a live main without reducing line pressure.', 'p.13'],

  'elbow-90': ['elbows-bends', 'Elbow 90°', '90° elbow for directional changes in PP-R pipework via socket fusion welding.', 'p.10'],
  'elbow-45': ['elbows-bends', 'Elbow 45°', '45° elbow for shallower directional changes across horizontal pipe runs.', 'p.10'],
  'reducer-elbow': ['elbows-bends', 'Reducer Elbow', '90° reducing elbow combining a direction change and a diameter change in one fitting.', 'p.10'],
  'spigot-elbow-90': ['elbows-bends', 'Spigot Elbow 90°', 'Spigot-end 90° elbow for compact connections inside mechanical chase spaces.', 'p.10'],
  'bend': ['elbows-bends', 'Bend', 'Long-radius bend for smooth directional changes with minimal flow turbulence.', 'p.13'],
  'cross-over-long-type': ['elbows-bends', 'Cross Over Long Tee', 'Long-body cross-over tee that keeps hot and cold lines apart inside wall cavities.', 'p.12'],
  'cross-over-short-type': ['elbows-bends', 'Cross Over Short Tee', 'Short-body cross-over tee for tight wall-cavity installations.', 'p.12'],

  'equal-tee': ['tees-crosses', 'Equal Tee', 'Equal-diameter tee for splitting or combining PP-R flow lines.', 'p.12'],
  'reducer-tee': ['tees-crosses', 'Reducer Tee', 'Reducing tee for branching off a main line at a different diameter.', 'p.11'],
  'cross-tee': ['tees-crosses', 'Cross Tee', 'Four-way cross tee for distribution manifolds and multi-port connections.', 'p.11'],

  'transition-female-socket-round': ['brass-transitions', 'Transition Female Socket — Round', 'PP-R to female BSP brass thread transition with a round body.', 'p.15'],
  'transition-female-socket-hexagonal': ['brass-transitions', 'Transition Female Socket — Hex', 'PP-R to female BSP brass thread transition with a hex body for wrench grip.', 'p.16'],
  'transition-male-socket-round': ['brass-transitions', 'Transition Male Socket — Round', 'PP-R to male BSP brass thread transition with a round body.', 'p.16'],
  'transition-male-socket-hexagonal': ['brass-transitions', 'Transition Male Socket — Hex', 'PP-R to male BSP brass thread transition with a hex body.', 'p.16'],
  'transition-female-union-brass': ['brass-transitions', 'Transition Female Union — Brass', 'Brass union coupling for serviceable transition joints.', 'p.16'],
  'transition-male-union-brass': ['brass-transitions', 'Transition Male Union — Brass', 'Brass male union for serviceable connections to fixtures.', 'p.17'],
  'transition-female-tee-round-hexagon': ['brass-transitions', 'Transition Female Tee — Round/Hex', 'Transition tee with a female BSP brass thread branch.', 'p.17'],
  'transition-female-elbow-round-hexagon': ['brass-transitions', 'Transition Female Elbow — Round/Hex', '90° transition elbow with a female BSP brass thread.', 'p.17'],
  'transition-male-elbow': ['brass-transitions', 'Transition Male Elbow', '90° transition elbow with a male BSP brass thread.', 'p.18'],
  'transition-valve-body': ['brass-transitions', 'Transition Valve Body', 'Brass valve body for in-line shut-off and isolation.', 'p.17'],
  'transition-female-wall-elbow': ['brass-transitions', 'Transition Female Wall Elbow', 'Wall-mounted female transition elbow for tap and faucet connections.', 'p.18'],
  'transition-wall-mount-group-horizontal': ['brass-transitions', 'Wall Mount Group — Horizontal', 'Horizontal wall-mount assembly for shower and mixer connections.', 'p.18'],
  'transition-wall-mount-group-vertical': ['brass-transitions', 'Wall Mount Group — Vertical', 'Vertical wall-mount assembly for vertical fixture drops.', 'p.18'],

  'ppr-ball-valve-lever-type': ['valves-manifolds', 'PP-R Ball Valve — Lever', 'Full-bore PP-R ball valve with a lever handle for visible shut-off.', 'p.15'],
  'ppr-manifold': ['valves-manifolds', 'PP-R Manifold', 'Distribution manifold for multi-port potable water distribution.', 'p.15'],
  'stop-valve-with-round-wheel': ['valves-manifolds', 'Stop Valve — Round Wheel', 'PP-R stop valve for inline shut-off.', 'p.19'],
  'concealed-valve': ['valves-manifolds', 'Concealed Valve', 'Concealed in-wall valve for finished installations.', 'p.19'],
  'ball-valve-brass': ['valves-manifolds', 'Brass Ball Valve', 'Full-bore brass ball valve for high-cycle isolation duty.', 'p.19'],
  'angle-valve-v5': ['valves-manifolds', 'Angle Valve V5', 'V5 compact angle valve for tap and fixture connections.', 'p.19'],
  'angle-valve-v8': ['valves-manifolds', 'Angle Valve V8', 'V8 heavy-duty angle valve for commercial fixture drops.', 'p.19'],

  'union-both-ends-welding': ['unions-caps-plugs-clamps', 'Union — Both Ends Weldable', 'Weld-union for repeated disconnection points in serviceable pipework.', 'p.12'],
  'end-cap': ['unions-caps-plugs-clamps', 'End Cap', 'End cap for closing off a PP-R pipe run or a future extension point.', 'p.13'],
  'end-plug-type-a': ['unions-caps-plugs-clamps', 'End Plug Type A — Short', 'Short-thread end plug for pressure-testing dead legs.', 'p.14'],
  'end-plug-type-b': ['unions-caps-plugs-clamps', 'End Plug Type B — Long', 'Long-thread end plug for deeper pipe ends.', 'p.14'],
  'bracket-for-pipe': ['unions-caps-plugs-clamps', 'Bracket for Pipe', 'Standard pipe bracket for wall-mounted horizontal runs.', 'p.14'],
  'bracket-with-clamp': ['unions-caps-plugs-clamps', 'Bracket with Clamp', 'Acoustic-damping pipe bracket with integral clamp.', 'p.14'],
  'pipe-hanging-clamp': ['unions-caps-plugs-clamps', 'Pipe Hanging Clamp', 'Hanging clamp for vertical pipework suspension in service risers.', 'p.15'],
};

const BRASS_TYPES = new Set(Object.keys(META).filter((t) => {
  const c = META[t][0];
  return c === 'brass-transitions' || t === 'ball-valve-brass' || t.startsWith('angle-valve');
}));

// ─── Size parsing ─────────────────────────────────────────────────────
const INCH = { '¼': 0.25, '½': 0.5, '¾': 0.75, '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875 };

function parseMm(dim) {
  const out = new Set();
  // "20mm", "32 X 1\"", "20 mm" — the mm unit may be omitted on hex rows
  const re = /(\d+)\s*mm/gi;
  let m;
  while ((m = re.exec(String(dim)))) out.add(Number(m[1]));
  // Bare leading size, e.g. "32 X 1\"" (RPMSH hex rows print no "mm")
  const bare = String(dim).match(/^\s*(\d{2,3})\s*(?:X|x|×)/);
  if (bare) out.add(Number(bare[1]));
  return [...out].sort((a, b) => a - b);
}

function parseInches(dim) {
  const out = new Set();
  const s = String(dim);
  // Fractional glyphs, e.g. 1", 1½"
  const frac = /(\d+)?\s*([¼½¾⅛⅜⅝⅞])"|(\d+)\s*(\d+)\/(\d+)"|(\d+)\s*"/g;
  let m;
  while ((m = frac.exec(s))) {
    if (m[2] != null) out.add((m[1] ? Number(m[1]) : 0) + INCH[m[2]]);
    else if (m[3] != null) out.add(Number(m[3]) + Number(m[4]) / Number(m[5]));
    else if (m[6] != null) out.add(Number(m[6]));
  }
  return [...out].sort((a, b) => a - b);
}

function parseThreadsInPartNo(partNo) {
  // RPFSH - 321 => 32mm x 1"   |   RPMSH - 401¼ => 40mm x 1¼"   | RPAV5 - ½" => ½"
  return parseInches(String(partNo));
}

// Escapes a value for a TS double-quoted string literal. The catalogue uses
// a straight double-quote as the inch mark, which must not terminate the
// literal, so it is escaped.
const esc = (s) =>
  String(s)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

const families = items.map((f) => {
  const meta = META[f.type];
  if (!meta) throw new Error('Unmapped fitting type: ' + f.type);
  const [category, shortName, description, cataloguePage] = meta;
  const skus = f.specifications.map((s) => {
    const mm = [...new Set([...parseMm(s.dimension), ...parseMm(s.partNumber)])].sort((a, b) => a - b);
    const inches = [...new Set([...parseInches(s.dimension), ...parseThreadsInPartNo(s.partNumber)])].sort((a, b) => a - b);
    return { partNo: String(s.partNumber), dimension: String(s.dimension), pcsPerPacket: s.packingUnit, pcsPerBox: s.piecesPerPack ?? null, mm, inches };
  });
  return { id: f.type, catalogueName: String(f.name), shortName, prefix: betterPrefix(f), description, category, connection: BRASS_TYPES.has(f.type) ? 'brass' : 'polymer', cataloguePage, skus };
});

/**
 * Derives the part-number prefix from the family's first SKU row.
 *   "RPE90 - 20"        -> RPE90     "RPFSH - 321"       -> RPFSH
 *   "RPMF 3225 - 2W"    -> RPMF      "RPAV5 - ½\""        -> RPAV5
 * A standalone size token (`3225`, `321`) is dropped; a fraction glyph that
 * is genuinely part of the code (`RPAV5`) is kept.
 */
function betterPrefix(f) {
  const s = String(f.specifications[0].partNumber).trim();
  const noSize = s.replace(/\s*\d{2,5}\s*-\s*\d?W\s*$/i, '');
  const m = noSize.match(/^([A-Z]+)\s*([0-9¼½¾]*)/);
  if (!m) return s.replace(/[^A-Z0-9]/gi, '');
  return m[1] + (m[2] && /\d/.test(m[2]) ? m[2] : '');
}

// ─── Emit ─────────────────────────────────────────────────────────────
const L = [];
L.push('/**');
L.push(' * GENERATED FILE — do not hand-edit.');
L.push(' *');
L.push(' * Every PART NO / DIMENSION / Pcs per Packet / Pcs per Box value below is');
L.push(' * emitted verbatim from `PPR CATALOG 03-11-22.json` (Catalogue pp.09–19).');
L.push(' *');
L.push(' * Regenerate with:  node scripts/generate-fittings-catalogue.mjs');
L.push(' */');
L.push('');
L.push('// ─── Engineer-centric category taxonomy ───────────────────────────');
L.push('export type FittingCategoryId =');
[...new Set(families.map((f) => f.category))].forEach((c, i) => L.push(`  | "${c}"${i === Object.keys(META).length ? '' : ''}`));
L.push('');
L.push('export type FittingConnection = "polymer" | "brass";');
L.push('');
L.push('export interface FittingSkuRow {');
L.push('  /** Verbatim PART NO from the catalogue, e.g. "RPFSH - 321" */');
L.push('  partNo: string;');
L.push('  /** Verbatim DIMENSION label, e.g. \'32mm X 1"\' */');
L.push('  dimension: string;');
L.push('  /** Pcs / Packet */');
L.push('  pcsPerPacket: number;');
L.push('  /** Pcs / Box — null where the catalogue publishes no box quantity */');
L.push('  pcsPerBox: number | null;');
L.push('  /** mm values parsed out of the dimension + part number, ascending */');
L.push('  mm: number[];');
L.push('  /** inch thread values parsed out of the dimension + part number, ascending */');
L.push('  inches: number[];');
L.push('}');
L.push('');
L.push('export interface FittingFamily {');
L.push('  /** Stable machine key (the catalogue `type` token) */');
L.push('  id: string;');
L.push('  /** Verbatim family name as printed in the catalogue */');
L.push('  catalogueName: string;');
L.push('  /** Short display label */');
L.push('  shortName: string;');
L.push('  /** Dominant part-number prefix, e.g. "RPFSH" */');
L.push('  prefix: string;');
L.push('  description: string;');
L.push('  category: FittingCategoryId;');
L.push('  connection: FittingConnection;');
L.push('  cataloguePage: string;');
L.push('  skus: FittingSkuRow[];');
L.push('}');
L.push('');
L.push('export const FITTING_FAMILIES: FittingFamily[] = [');
families.forEach((f) => {
  L.push('  {');
  L.push(`    id: "${f.id}",`);
  L.push(`    catalogueName: "${esc(f.catalogueName)}",`);
  L.push(`    shortName: "${esc(f.shortName)}",`);
  L.push(`    prefix: "${esc(f.prefix)}",`);
  L.push(`    description: "${esc(f.description)}",`);
  L.push(`    category: "${f.category}",`);
  L.push(`    connection: "${f.connection}",`);
  L.push(`    cataloguePage: "${f.cataloguePage}",`);
  L.push('    skus: [');
  f.skus.forEach((s) => {
    const mm = s.mm.length ? `[${s.mm.join(', ')}]` : '[]';
    const inl = s.inches.length ? `[${s.inches.join(', ')}]` : '[]';
    L.push(`      { partNo: "${esc(s.partNo)}", dimension: "${esc(s.dimension)}", pcsPerPacket: ${s.pcsPerPacket}, pcsPerBox: ${s.pcsPerBox === null ? 'null' : s.pcsPerBox}, mm: ${mm}, inches: ${inl} },`);
  });
  L.push('    ],');
  L.push('  },');
});
L.push('];');
L.push('');

const out = path.join(ROOT, 'src/lib/fittings-catalogue-data.ts');
fs.writeFileSync(out, L.join('\n'), 'utf8');

console.log('families:', families.length);
console.log('total SKU rows:', families.reduce((n, f) => n + f.skus.length, 0));
const byCat = {};
families.forEach((f) => { (byCat[f.category] = byCat[f.category] || []).push(f.prefix); });
Object.entries(byCat).forEach(([k, v]) => console.log('  ', k, '=>', v.length, ':', v.join(', ')));
console.log('brass families:', families.filter((f) => f.connection === 'brass').length);
console.log('rows with a parsed mm size:', families.reduce((n, f) => n + f.skus.filter((s) => s.mm.length).length, 0), '/', families.reduce((n, f) => n + f.skus.length, 0));
console.log('rows with a parsed inch thread:', families.reduce((n, f) => n + f.skus.filter((s) => s.inches.length).length, 0));
console.log('wrote', out);