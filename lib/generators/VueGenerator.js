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

    _this.registerTemplates("vue/", [
    // modules
    "store/modules/foo/index.js", "store/modules/foo/create/actions.js", "store/modules/foo/create/getters.js", "store/modules/foo/create/index.js", "store/modules/foo/create/mutation_types.js", "store/modules/foo/create/mutations.js", "store/modules/foo/delete/actions.js", "store/modules/foo/delete/getters.js", "store/modules/foo/delete/index.js", "store/modules/foo/delete/mutation_types.js", "store/modules/foo/delete/mutations.js", "store/modules/foo/list/actions.js", "store/modules/foo/list/getters.js", "store/modules/foo/list/index.js", "store/modules/foo/list/mutation_types.js", "store/modules/foo/list/mutations.js", "store/modules/foo/show/actions.js", "store/modules/foo/show/getters.js", "store/modules/foo/show/index.js", "store/modules/foo/show/mutation_types.js", "store/modules/foo/show/mutations.js", "store/modules/foo/update/actions.js", "store/modules/foo/update/getters.js", "store/modules/foo/update/index.js", "store/modules/foo/update/mutation_types.js", "store/modules/foo/update/mutations.js",

    // components
    "components/foo/Create.vue", "components/foo/Form.vue", "components/foo/List.vue", "components/foo/Update.vue", "components/foo/Show.vue",

    // routes
    "router/foo.js",

    // error
    "error/SubmissionError.js",

    // utils
    "utils/fetch.js"]);
    return _this;
  }

  (0, _createClass3.default)(_class, [{
    key: "help",
    value: function help(resource) {
      var titleLc = resource.title.toLowerCase();

      console.log('Code for the "%s" resource type has been generated!', resource.title);
      console.log("Paste the following definitions in your application configuration:");
      console.log(_chalk2.default.green("\n//import routes\nimport " + titleLc + "Routes from './router/" + titleLc + "';\n\n// Add routes to VueRouter\nconst router = new VueRouter({\n  // ...\n  routes: [\n      ..." + titleLc + "Routes,\n  ]\n});\n\n// Add the modules in the store\nimport " + titleLc + " from './store/modules/" + titleLc + "/';\n\nexport const store = new Vuex.Store({\n  // ...\n  modules: {\n    " + titleLc + "\n  }\n});\n"));
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
      var _arr = [dir + "/config", dir + "/error", dir + "/router", dir + "/utils"];
      for (var _i = 0; _i < _arr.length; _i++) {
        var _dir = _arr[_i];
        this.createDir(_dir, false);
      }

      var _arr2 = [dir + "/store/modules/" + lc, dir + "/store/modules/" + lc + "/create", dir + "/store/modules/" + lc + "/delete", dir + "/store/modules/" + lc + "/list", dir + "/store/modules/" + lc + "/show", dir + "/store/modules/" + lc + "/update", dir + "/components/" + lc];
      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var _dir2 = _arr2[_i2];
        this.createDir(_dir2);
      }

      var _arr3 = [
      // modules
      "store/modules/%s/index.js", "store/modules/%s/create/actions.js", "store/modules/%s/create/getters.js", "store/modules/%s/create/index.js", "store/modules/%s/create/mutation_types.js", "store/modules/%s/create/mutations.js", "store/modules/%s/delete/actions.js", "store/modules/%s/delete/getters.js", "store/modules/%s/delete/index.js", "store/modules/%s/delete/mutation_types.js", "store/modules/%s/delete/mutations.js", "store/modules/%s/list/actions.js", "store/modules/%s/list/getters.js", "store/modules/%s/list/index.js", "store/modules/%s/list/mutation_types.js", "store/modules/%s/list/mutations.js", "store/modules/%s/show/actions.js", "store/modules/%s/show/getters.js", "store/modules/%s/show/index.js", "store/modules/%s/show/mutation_types.js", "store/modules/%s/show/mutations.js", "store/modules/%s/update/actions.js", "store/modules/%s/update/getters.js", "store/modules/%s/update/index.js", "store/modules/%s/update/mutation_types.js", "store/modules/%s/update/mutations.js",

      // components
      "components/%s/Create.vue", "components/%s/Form.vue", "components/%s/List.vue", "components/%s/Update.vue", "components/%s/Show.vue",

      // routes
      "router/%s.js"];
      for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
        var pattern = _arr3[_i3];
        this.createFileFromPattern(pattern, dir, lc, context);
      }

      // error
      this.createFile("error/SubmissionError.js", dir + "/error/SubmissionError.js", context, false);

      this.createEntrypoint(api.entrypoint, dir + "/config/_entrypoint.js");
      this.createFile("utils/fetch.js", dir + "/utils/fetch.js", { hydraPrefix: this.hydraPrefix }, false);
    }
  }]);
  return _class;
}(_BaseGenerator3.default);

exports.default = _class;