"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _BaseGenerator2 = require("./BaseGenerator");

var _BaseGenerator3 = _interopRequireDefault(_BaseGenerator2);

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

var _comparison = require("handlebars-helpers/lib/comparison");

var _comparison2 = _interopRequireDefault(_comparison);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_BaseGenerator) {
  (0, _inherits3.default)(_class, _BaseGenerator);

  function _class(params) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, params));

    _this.registerTemplates("admin-on-rest/", ["components/foo.js", "config/foo.js", "resources/foo.js", "resource-import.js"]);

    _handlebars2.default.registerHelper("compare", _comparison2.default.compare);
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: "help",
    value: function help(resource) {
      console.log('Code for the "%s" resource type has been generated!', resource.title);
    }
  }, {
    key: "appendFile",
    value: function appendFile(template, dest) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _fs2.default.appendFileSync(dest, this.templates[template](context));
    }
  }, {
    key: "generate",
    value: function generate(api, resource, dir) {
      var lc = resource.title.toLowerCase();
      var titleUcFirst = resource.title.charAt(0).toUpperCase() + resource.title.slice(1);

      var context = {
        title: resource.title,
        name: resource.name,
        lc: lc,
        uc: resource.title.toUpperCase(),
        fields: resource.readableFields,
        formFields: this.buildFields(resource.writableFields),
        hydraPrefix: this.hydraPrefix,
        titleUcFirst: titleUcFirst
      };

      // Create directories
      // These directories may already exist
      var _arr = [dir + "/config", dir + "/resources", dir + "/components/"];
      for (var _i = 0; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir, false);
      }

      var _arr2 = ["components/%s.js", "config/%s.js", "resources/%s.js"];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var pattern = _arr2[_i2];
        this.createFileFromPattern(pattern, dir, lc, context);
      }

      this.appendFile("resource-import.js", dir + "/resource-import.js", context);

      this.createEntrypoint(api.entrypoint, dir + "/config/_entrypoint.js");
    }
  }]);
  return _class;
}(_BaseGenerator3.default);

exports.default = _class;