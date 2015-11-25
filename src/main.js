'use babel'

import Path from 'path'
import Less from 'less'

export const minifier = false
export const compiler = true
export function process(contents, {relativePath, absolutePath}, {state, config}) {
  state.ext = 'css'
  return Less.render(contents, Object.assign({}, config.less, {
    filename: relativePath,
    sourceMap: true,
    paths: [Path.dirname(absolutePath)]
  })).then(function(output) {
    if (output.imports.length) {
      state.imports = state.imports.concat(output.imports)
    }
    if (output.map) {
      state.sourceMap = output.map.toString()
    }
    return output.css
  })
}
