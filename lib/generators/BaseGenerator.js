"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require("handlebars");

var _handlebars2 = _interopRequireDefault(_handlebars);

var _mkdirp = require("mkdirp");

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _sprintfJs = require("sprintf-js");

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
  function _class(_ref) {
    var hydraPrefix = _ref.hydraPrefix,
        templateDirectory = _ref.templateDirectory;
    (0, _classCallCheck3.default)(this, _class);
    this.templates = {};

    this.hydraPrefix = hydraPrefix;
    this.templateDirectory = templateDirectory;

    this.registerTemplates("", ["_entrypoint.js"]);
  }

  (0, _createClass3.default)(_class, [{
    key: "registerTemplates",
    value: function registerTemplates(basePath, paths) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(paths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var path = _step.value;

          this.templates[path] = _handlebars2.default.compile(_fs2.default.readFileSync(this.templateDirectory + "/" + basePath + path).toString());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "createDir",
    value: function createDir(dir) {
      var warn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (!_fs2.default.existsSync(dir)) {
        _mkdirp2.default.sync(dir);

        return;
      }

      if (warn) console.log("The directory \"" + dir + "\" already exists");
    }
  }, {
    key: "createFileFromPattern",
    value: function createFileFromPattern(pattern, dir, lc, context) {
      this.createFile((0, _sprintfJs.sprintf)(pattern, "foo"), (0, _sprintfJs.sprintf)(dir + "/" + pattern, lc), context);
    }
  }, {
    key: "createFile",
    value: function createFile(template, dest) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var warn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

      if (!_fs2.default.existsSync(dest)) {
        _fs2.default.writeFileSync(dest, this.templates[template](context));

        return;
      }

      if (warn) console.log("The file \"" + dest + "\" already exists");
    }
  }, {
    key: "createEntrypoint",
    value: function createEntrypoint(apiEntry, dest) {
      var url = _url2.default.parse(apiEntry);
      var protocol = url.protocol,
          host = url.host,
          pathname = url.pathname;


      this.createFile("_entrypoint.js", dest, { host: protocol + "//" + host, path: pathname }, false);
    }
  }, {
    key: "getHtmlInputTypeFromField",
    value: function getHtmlInputTypeFromField(field) {
      switch (field.id) {
        case "http://schema.org/email":
          return { type: "email" };

        case "http://schema.org/url":
          return { type: "url" };
      }

      switch (field.range) {
        case "http://www.w3.org/2001/XMLSchema#integer":
          return { type: "number" };

        case "http://www.w3.org/2001/XMLSchema#decimal":
          return { type: "number", step: "0.1" };

        case "http://www.w3.org/2001/XMLSchema#boolean":
          return { type: "checkbox" };

        case "http://www.w3.org/2001/XMLSchema#date":
          return { type: "date" };

        case "http://www.w3.org/2001/XMLSchema#time":
          return { type: "time" };

        case "http://www.w3.org/2001/XMLSchema#dateTime":
          return { type: "dateTime" };

        default:
          return { type: "text" };
      }
    }
  }, {
    key: "buildFields",
    value: function buildFields(apiFields) {
      var fields = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(apiFields), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var apiField = _step2.value;

          var field = this.getHtmlInputTypeFromField(apiField);
          field.required = apiField.required;
          field.name = apiField.name;
          field.description = apiField.description.replace(/"/g, "'"); // fix for Form placeholder description

          fields.push(field);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return fields;
    }
  }]);
  return _class;
}();

exports.default = _class;