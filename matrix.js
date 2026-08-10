const fs = require('fs');
const path = require('path');

const files = [
  './src/app/page.tsx',
  './src/app/about/AboutPageClient.tsx',
  './src/app/innovation/InnovationPageClient.tsx',
  './src/app/products/ppr/[color]/[spec]/PPRProductClient.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // 1. Typography Reset
  // Strip font-display from everywhere EXCEPT <h1
  // We'll replace font-display with font-sans font-extrabold on h2, h3, etc.
  newContent = newContent.replace(/<h[2-6][^>]*?>/g, match => {
    return match.replace(/font-display/g, 'font-sans font-extrabold').replace(/font-black/g, 'font-extrabold');
  });

  // Ensure <h1 has Geist if we keep font-display, but we'll also replace font-black with font-extrabold
  newContent = newContent.replace(/<h1[^>]*?>/g, match => {
    return match.replace(/font-black/g, 'font-extrabold');
  });

  // 2. Container Widen & Text Bump
  // The structure: <div className="bg-emerald-50/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl...">
  // Let's widen them to max-w-3xl w-full
  newContent = newContent.replace(/bg-emerald-50\/40([^"]*?)max-w-(md|lg|xl|2xl)/g, 'bg-emerald-50/40$1max-w-3xl w-full');
  // If it doesn't have max-w at all, just append max-w-3xl w-full
  newContent = newContent.replace(/(bg-emerald-50\/40 backdrop-blur-md border-l-4 border-emerald-500 p-6 rounded-r-2xl(?!.*max-w-))/g, '$1 max-w-3xl w-full');

  // Text Bump: <p className="gsap-liquid-body ... text-neutral-950 text-lg md:text-xl font-normal leading-loose">
  newContent = newContent.replace(/<p\s+className="([^"]*?gsap-liquid-body[^"]*?)"/g, (match, classes) => {
    let newClasses = classes
      .replace(/text-(base|lg|xl)/g, '')
      .replace(/md:text-[a-z0-9]+/g, '')
      .replace(/font-(light|normal)/g, '')
      .replace(/leading-loose/g, '');
    
    // Clean up double spaces
    newClasses = newClasses.replace(/\s+/g, ' ').trim();
    
    return `<p className="${newClasses} text-xl md:text-2xl font-bold leading-relaxed text-neutral-950"`;
  });

  // 3. Funky Keyword Matrix
  // We need to apply this to the text inside the gsap-liquid-body paragraphs.
  // "UAE" or "Dubai" -> text-red-600
  // "German Standard", "DIN 8077/8078", "ISO 9001:2015" -> text-yellow-400
  // "100% Virgin Material", "50 Years", "50-year", "Eco-Friendly" -> text-emerald-500

  // We will run this over the inner HTML of the gsap-liquid-body paragraphs
  const pRegex = /(<p\s+className="[^"]*?gsap-liquid-body[^"]*?">)([\s\S]*?)(<\/p>)/g;
  newContent = newContent.replace(pRegex, (match, open, inner, close) => {
    let modifiedInner = inner;
    
    // Safety check: don't double wrap if already wrapped
    const wrap = (word, color) => {
      // Regex to find word not inside a span
      const r = new RegExp(`(?<!<span[^>]*>\\s*)(${word})(?!\\s*<\\/span>)`, 'gi');
      modifiedInner = modifiedInner.replace(r, `<span className="${color}">$1</span>`);
    };

    wrap('UAE', 'text-red-600');
    wrap('Dubai', 'text-red-600');
    
    wrap('German Standard', 'text-yellow-400');
    wrap('German standards', 'text-yellow-400');
    wrap('DIN 8077\\/8078', 'text-yellow-400');
    wrap('ISO 9001:2015', 'text-yellow-400');
    wrap('ISO 14001:2015', 'text-yellow-400');
    wrap('DVS 2207', 'text-yellow-400');
    
    wrap('100% Virgin Material', 'text-emerald-500');
    wrap('50 Years', 'text-emerald-500');
    wrap('50-year', 'text-emerald-500');
    wrap('Eco-Friendly', 'text-emerald-500');

    // Clean up nested spans if any happen
    modifiedInner = modifiedInner.replace(/<span className="[^"]+"><span className="([^"]+)">([^<]+)<\/span><\/span>/g, '<span className="$1">$2</span>');

    return open + modifiedInner + close;
  });

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Updated:', file);
  }
});
