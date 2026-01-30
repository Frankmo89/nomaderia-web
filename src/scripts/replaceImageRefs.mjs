import fg from 'fast-glob';
import fs from 'fs/promises';

async function main() {
  const reportPath = 'scripts/converted-images.json';
  const exists = await fs.stat(reportPath).then(() => true).catch(() => false);
  if (!exists) {
    console.error('Conversion report not found. Run convertToWebp.mjs first.');
    process.exit(1);
  }

  const converted = JSON.parse(await fs.readFile(reportPath, 'utf8'));
  if (!converted.length) {
    console.log('No converted images to replace.');
    return;
  }

  // build map original web path -> webp path (web paths relative to project)
  const map = {};
  for (const item of converted) {
    // item.original e.g. public/images/parks/..../file.jpg
    const origWeb = item.original.replace(/^public/, '');
    const webpWeb = item.webp.replace(/^public/, '');
    map[origWeb] = webpWeb;
  }

  // find code files
  const codeFiles = await fg(['src/**/*.{ts,tsx,js,jsx}'], { dot: false });

  for (const file of codeFiles) {
    let content = await fs.readFile(file, 'utf8');
    let updated = content;

    for (const [orig, webp] of Object.entries(map)) {
      // replace occurrences of '/images/...' and "/images/..."
      const orig1 = `'${orig}`;
      const orig2 = `"${orig}`;
      const webp1 = `'${webp}`;
      const webp2 = `"${webp}`;
      updated = updated.split(orig1).join(webp1);
      updated = updated.split(orig2).join(webp2);
    }

    if (updated !== content) {
      await fs.writeFile(file, updated, 'utf8');
      console.log(`Updated references in ${file}`);
    }
  }

  console.log('Reference replacement completed.');
}

main().catch(err => { console.error(err); process.exit(1); });
