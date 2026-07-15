// Rasterise favicon.svg into the formats Bing/Apple actually support.
// Bing ignores SVG favicons and looks for /favicon.ico at the domain root.
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'fs'

const SRC = process.argv[2]
const OUTDIR = process.argv[3]
const svg = readFileSync(SRC)

// Build a real multi-resolution .ico containing PNG images (modern ICO allows
// embedded PNG). Header: ICONDIR(6) + ICONDIRENTRY(16 each) + image data.
function buildIco(images) {
  const count = images.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: 1 = icon
  header.writeUInt16LE(count, 4)

  const entries = []
  const datas = []
  let offset = 6 + count * 16

  for (const { size, buf } of images) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0) // width  (0 means 256)
    e.writeUInt8(size >= 256 ? 0 : size, 1) // height
    e.writeUInt8(0, 2)                      // palette colours
    e.writeUInt8(0, 3)                      // reserved
    e.writeUInt16LE(1, 4)                   // colour planes
    e.writeUInt16LE(32, 6)                  // bits per pixel
    e.writeUInt32LE(buf.length, 8)          // image data size
    e.writeUInt32LE(offset, 12)             // image data offset
    entries.push(e)
    datas.push(buf)
    offset += buf.length
  }
  return Buffer.concat([header, ...entries, ...datas])
}

const icoSizes = [16, 32, 48]
const images = []
for (const size of icoSizes) {
  const buf = await sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()
  images.push({ size, buf })
}
writeFileSync(`${OUTDIR}/favicon.ico`, buildIco(images))
console.log('favicon.ico      ->', icoSizes.join('/'), 'px')

// Apple needs a PNG — it does not support SVG touch icons either.
await sharp(svg, { density: 768 }).resize(180, 180).png().toFile(`${OUTDIR}/apple-touch-icon.png`)
console.log('apple-touch-icon.png -> 180px')
