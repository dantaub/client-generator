"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generators;

var _AdminOnRestGenerator = require("./generators/AdminOnRestGenerator");

var _AdminOnRestGenerator2 = _interopRequireDefault(_AdminOnRestGenerator);

var _ReactGenerator = require("./generators/ReactGenerator");

var _ReactGenerator2 = _interopRequireDefault(_ReactGenerator);

var _ReactNativeGenerator = require("./generators/ReactNativeGenerator");

var _ReactNativeGenerator2 = _interopRequireDefault(_ReactNativeGenerator);

var _TypescriptInterfaceGenerator = require("./generators/TypescriptInterfaceGenerator");

var _TypescriptInterfaceGenerator2 = _interopRequireDefault(_TypescriptInterfaceGenerator);

var _VueGenerator = require("./generators/VueGenerator");

var _VueGenerator2 = _interopRequireDefault(_VueGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrap(cl) {
  return function (_ref) {
    var hydraPrefix = _ref.hydraPrefix,
        templateDirectory = _ref.templateDirectory;
    return new cl({ hydraPrefix: hydraPrefix, templateDirectory: templateDirectory });
  };
}

function generators() {
  var generator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "react";

  switch (generator) {
    case "admin-on-rest":
      return wrap(_AdminOnRestGenerator2.default);
    case "react":
      return wrap(_ReactGenerator2.default);
    case "react-native":
      return wrap(_ReactNativeGenerator2.default);
    case "typescript":
      return wrap(_TypescriptInterfaceGenerator2.default);
    case "vue":
      return wrap(_VueGenerator2.default);
  }
}