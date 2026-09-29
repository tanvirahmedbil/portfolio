// Injects the server-rendered app into dist/index.html, then removes the temporary SSR bundle.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const template = fs.readFileSync(indexPath, 'utf8')
const marker = '<!--app-html-->'
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`)

let html = template.replace(marker, render())
// Let the browser start fetching the hero portrait (the largest first-screen element) before it parses the body.
const hero = html.match(/<img src="([^"]+)" srcset="([^"]+)" sizes="([^"]+)"[^>]*fetchpriority="high"/i)
if (hero) {
  const [, src, srcset, sizes] = hero
  html = html.replace('</title>', `</title>\n    <link rel="preload" as="image" href="${src}" imagesrcset="${srcset}" imagesizes="${sizes}" fetchpriority="high" />`)
}
fs.writeFileSync(indexPath, html)
fs.rmSync(ssrDir, { recursive: true, force: true })
console.log('prerender: dist/index.html now contains the rendered page')
