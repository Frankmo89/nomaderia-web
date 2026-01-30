import fg from 'fast-glob';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const folders = ['public/images/hero', 'public/images/parks'];

async function main() {
  const patterns = folders.map(f => `${f}/**/*.{jpg,jpeg,JPG,JPEG}`);
  const entries = await fg(patterns, { dot: false });

  const converted = [];

  for (const entry of entries) {
    try {
      const stat = await fs.stat(entry);
      if (stat.size <= 200 * 1024) continue;

      const out = entry.replace(/\.(jpg|jpeg)$/i, '.webp');
      await sharp(entry)
        .webp({ quality: 80 })
        .toFile(out);

      console.log(`Converted: ${entry} -> ${out}`);
      converted.push({ original: entry.replace(/\\/g, '/'), webp: out.replace(/\\/g, '/') });
    } catch (err) {
      console.error('Error converting', entry, err.message || err);
    }
  }

  // write a report
  const reportPath = 'scripts/converted-images.json';
  await fs.writeFile(reportPath, JSON.stringify(converted, null, 2), 'utf8');
  console.log(`Conversion finished. Report: ${reportPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
