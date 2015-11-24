'use strict';
'use babel';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compiler = exports.minifier = undefined;
exports.process = process;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _less = require('less');

var _less2 = _interopRequireDefault(_less);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const minifier = exports.minifier = false;
const compiler = exports.compiler = true;
function process(contents, _ref, _ref2) {
  let root = _ref.root;
  let relativePath = _ref.relativePath;
  let absolutePath = _ref.absolutePath;
  let fileName = _ref.fileName;
  let state = _ref2.state;
  let config = _ref2.config;

  return _less2.default.render(contents, Object.assign({}, config.less, {
    filename: relativePath,
    sourceMap: true,
    paths: [_path2.default.dirname(absolutePath)]
  })).then(function (output) {
    if (output.imports.length) {
      state.imports = state.imports.concat(output.imports);
    }
    if (output.map) {
      state.sourceMap = output.map.toString();
    }
    return output.css;
  });
}