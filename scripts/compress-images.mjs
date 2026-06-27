// One-shot image compressor for public/imgs.
// - Backs up every original to public/imgs_original (once, never overwritten).
// - Resizes anything wider than MAX_WIDTH down to it (keeps aspect ratio).
// - Re-encodes JPEG/PNG at QUALITY, stripping metadata.
// Run:  node scripts/compress-images.mjs
import sharp from "sharp";
import { readdir, mkdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("public/imgs");
const BACKUP = path.resolve("public/imgs_original");
const MAX_WIDTH = 1800;
const QUALITY = 80;
const EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (EXT.has(path.extname(e.name).toLowerCase())) files.push(full);
  }
  return files;
}

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + "MB";
}

const files = await walk(SRC);
let before = 0;
let after = 0;

for (const file of files) {
  const rel = path.relative(SRC, file);
  const backupPath = path.join(BACKUP, rel);

  // 1) Back up original once.
  if (!existsSync(backupPath)) {
    await mkdir(path.dirname(backupPath), { recursive: true });
    await copyFile(file, backupPath);
  }

  const srcStat = await stat(file);
  before += srcStat.size;

  // 2) Re-encode from the pristine backup so re-runs stay lossless-relative.
  const input = sharp(backupPath, { failOn: "none" }).rotate();
  const meta = await input.metadata();
  const ext = path.extname(file).toLowerCase();

  let pipeline = input;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  if (ext === ".png") {
    pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9, palette: true });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
  }

  const buf = await pipeline.toBuffer();
  const { writeFile } = await import("node:fs/promises");
  await writeFile(file, buf);
  after += buf.length;

  console.log(`${rel}  ${fmt(srcStat.size)} -> ${fmt(buf.length)}`);
}

console.log("\n----------------------------------------");
console.log(`Files:   ${files.length}`);
console.log(`Before:  ${fmt(before)}`);
console.log(`After:   ${fmt(after)}`);
console.log(`Saved:   ${fmt(before - after)} (${Math.round((1 - after / before) * 100)}%)`);
console.log(`Originals backed up to: ${path.relative(process.cwd(), BACKUP)}`);
