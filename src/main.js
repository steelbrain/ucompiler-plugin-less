'use babel'

import Path from 'path'
import Less from 'less'

export const minifier = false
export const compiler = true
export function process(contents, {rootDirectory, filePath, config, state}) {
  return Less.render(contents, Object.assign({}, config.less, {
    filename: Path.relative(rootDirectory, filePath),
    sourceMap: true,
    paths: [Path.dirname(filePath)]
  })).then(function(output) {
    output.imports.forEach(function(item) {
      state.imports.push(Path.join(rootDirectory, item))
    })
    return {
      contents: output.css,
      sourceMap: JSON.parse(output.map)
    }
  })
}
