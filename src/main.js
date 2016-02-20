'use babel'

import FS from 'fs'
import Path from 'path'
import Less from 'less'
import promisify from 'sb-promisify'

const readFile = promisify(FS.readFile)

export const minifier = false
export const compiler = true
export async function process(contents, {rootDirectory, filePath, config, state}) {
  const output = await Less.render(contents, Object.assign({}, config.less, {
    filename: Path.relative(rootDirectory, filePath),
    sourceMap: true,
    paths: [Path.dirname(filePath)]
  }))

  if (!output.map) {
    return null
  }

  output.imports.forEach(function(item) {
    state.imports.push(Path.join(rootDirectory, item))
  })

  const map = JSON.parse(output.map)
  map.sourcesContent = []
  await Promise.all(map.sources.map(async function(filePath) {
    const fullPath = Path.join(rootDirectory, filePath)
    map.sourcesContent.push((await readFile(fullPath)).toString())
  }))

  return {
    contents: output.css,
    sourceMap: map
  }
}
