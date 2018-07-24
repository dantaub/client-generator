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

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _BaseGenerator2 = require("./BaseGenerator");

var _BaseGenerator3 = _interopRequireDefault(_BaseGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_BaseGenerator) {
  (0, _inherits3.default)(_class, _BaseGenerator);

  function _class(params) {
    (0, _classCallCheck3.default)(this, _class);

    var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, params));

    _this.registerTemplates("react-common/", [
    // actions
    "actions/foo/create.js", "actions/foo/delete.js", "actions/foo/list.js", "actions/foo/update.js", "actions/foo/show.js",

    // utils
    "utils/fetch.js",

    // reducers
    "reducers/foo/create.js", "reducers/foo/delete.js", "reducers/foo/index.js", "reducers/foo/list.js", "reducers/foo/update.js", "reducers/foo/show.js"]);

    _this.registerTemplates("react/", [
    // components
    "components/foo/Create.js", "components/foo/Form.js", "components/foo/index.js", "components/foo/List.js", "components/foo/Update.js", "components/foo/Show.js"]);
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: "help",
    value: function help(resource) {
      var titleLc = resource.title.toLowerCase();

      console.log('Code for the "%s" resource type has been generated!', resource.title);
      console.log("Paste the following definitions in your application configuration (`client/src/index.js` by default):");
      console.log(_chalk2.default.green("\n// import reducers\nimport " + titleLc + " from './reducers/" + titleLc + "/';\n\n// Add the reducer\ncombineReducers(" + titleLc + ",{/* ... */}),\n"));
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
      var _arr = [dir + "/utils", dir + "/config"];
      for (var _i = 0; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir, false);
      }

      var _arr2 = [dir + "/actions/" + lc, dir + "/components/" + lc, dir + "/reducers/" + lc];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var _dir2 = _arr2[_i2];
        this.createDir(_dir2);
      }

      var _arr3 = [
      // actions
      "actions/%s/create.js", "actions/%s/delete.js", "actions/%s/list.js", "actions/%s/update.js", "actions/%s/show.js",

      // components
      "components/%s/Create.js", "components/%s/Form.js", "components/%s/index.js", "components/%s/List.js", "components/%s/Update.js", "components/%s/Show.js",

      // reducers
      "reducers/%s/create.js", "reducers/%s/delete.js", "reducers/%s/index.js", "reducers/%s/list.js", "reducers/%s/update.js", "reducers/%s/show.js"];
      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var pattern = _arr3[_i3];
        this.createFileFromPattern(pattern, dir, lc, context);
      }

      this.createFile("utils/fetch.js", dir + "/utils/fetch.js", context, false);
      this.createEntrypoint(api.entrypoint, dir + "/config/_entrypoint.js");
    }
  }]);
  return _class;
}(_BaseGenerator3.default);

exports.default = _class;