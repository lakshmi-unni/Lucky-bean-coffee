import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.resolve(import.meta.dirname, '../public')
const manifestPath = path.resolve(import.meta.dirname, '../src/data/image-manifest.json')

const files = (await readdir(publicDir)).filter((f) =>
  /\.(jpe?g|png)$/i.test(f),
)

const manifest = {}

for (const file of files) {
  const inputPath = path.join(publicDir, file)
  const base = file.replace(/\.(jpe?g|png)$/i, '')
  const webpName = `${base}.webp`
  const webpPath = path.join(publicDir, webpName)

  const buffer = await readFile(inputPath)
  const image = sharp(buffer)
  const meta = await image.metadata()

  await image
    .clone()
    .webp({ quality: 80 })
    .toFile(webpPath)

  const lqipBuffer = await sharp(buffer)
    .resize(24)
    .webp({ quality: 35 })
    .toBuffer()

  manifest[`/${file}`] = {
    webp: `/${webpName}`,
    lqip: `data:image/webp;base64,${lqipBuffer.toString('base64')}`,
    width: meta.width,
    height: meta.height,
  }

  console.log(`optimized ${file} -> ${webpName}`)
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
console.log(`\nWrote manifest with ${Object.keys(manifest).length} entries -> ${manifestPath}`)
