const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'rakansales_homepage_workbench_2026-08-21.json');
const outDir = path.join(__dirname, 'references');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const raw = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(raw);

let count = 0;
const manifest = [];

// 1. Process Global Images
if (data.global && Array.isArray(data.global.images)) {
  data.global.images.forEach((imgBase64, idx) => {
    count++;
    const match = imgBase64.match(/^data:image\/(\w+);base64,(.+)$/);
    if (match) {
      const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
      const filename = `global_ref_${idx + 1}.${ext}`;
      const filePath = path.join(outDir, filename);
      fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
      manifest.push({ section: 'Global', file: filename, path: filePath });
    }
  });
}

// 2. Process Section Images
if (data.sections) {
  for (const [secId, secData] of Object.entries(data.sections)) {
    if (secData.images && Array.isArray(secData.images)) {
      secData.images.forEach((imgBase64, idx) => {
        count++;
        const match = imgBase64.match(/^data:image\/(\w+);base64,(.+)$/);
        if (match) {
          const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
          const filename = `${secId}_ref_${idx + 1}.${ext}`;
          const filePath = path.join(outDir, filename);
          fs.writeFileSync(filePath, Buffer.from(match[2], 'base64'));
          manifest.push({ section: secId, file: filename, path: filePath });
        }
      });
    }
  }
}

console.log(`Extracted ${count} images into ${outDir}`);
console.log(JSON.stringify(manifest, null, 2));
