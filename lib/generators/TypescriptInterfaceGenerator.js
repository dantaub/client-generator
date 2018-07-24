"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

var _BaseGenerator2 = require("./BaseGenerator");

var _BaseGenerator3 = _interopRequireDefault(_BaseGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypescriptInterfaceGenerator = function (_BaseGenerator) {
  (0, _inherits3.default)(TypescriptInterfaceGenerator, _BaseGenerator);

  function TypescriptInterfaceGenerator(params) {
    (0, _classCallCheck3.default)(this, TypescriptInterfaceGenerator);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TypescriptInterfaceGenerator.__proto__ || (0, _getPrototypeOf2.default)(TypescriptInterfaceGenerator)).call(this, params));

    _this.registerTemplates("typescript/", ["interface.ts"]);
    return _this;
  }

  (0, _createClass3.default)(TypescriptInterfaceGenerator, [{
    key: "help",
    value: function help(resource) {
      console.log('Interface for the "%s" resource type has been generated!', resource.title);
    }
  }, {
    key: "generate",
    value: function generate(api, resource, dir) {
      var dest = dir + "/interfaces";

      this.createDir(dest, false);
      this.createFile("interface.ts", dest + "/" + resource.title.toLowerCase() + ".ts", {
        fields: this.parseFields(resource),
        name: resource.title
      });
    }
  }, {
    key: "getType",
    value: function getType(field) {
      if (field.reference) {
        return field.reference.title;
      }

      switch (field.range) {
        case "http://www.w3.org/2001/XMLSchema#integer":
        case "http://www.w3.org/2001/XMLSchema#decimal":
          return "number";
        case "http://www.w3.org/2001/XMLSchema#boolean":
          return "boolean";
        case "http://www.w3.org/2001/XMLSchema#date":
        case "http://www.w3.org/2001/XMLSchema#dateTime":
        case "http://www.w3.org/2001/XMLSchema#time":
          return "Date";
        case "http://www.w3.org/2001/XMLSchema#string":
          return "string";
      }

      return "any";
    }
  }, {
    key: "getDescription",
    value: function getDescription(field) {
      return field.description ? field.description.replace(/"/g, "'") : "";
    }
  }, {
    key: "parseFields",
    value: function parseFields(resource) {
      var fields = {};

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(resource.writableFields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var field = _step.value;

          fields[field.name] = {
            notrequired: !field.required,
            name: field.name,
            type: this.getType(field),
            description: this.getDescription(field),
            readonly: false
          };
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

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(resource.readableFields), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _field = _step2.value;

          if (fields[_field.name] !== undefined) {
            continue;
          }

          fields[_field.name] = {
            notrequired: !_field.required,
            name: _field.name,
            type: this.getType(_field),
            description: this.getDescription(_field),
            readonly: true
          };
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

      return (0, _keys2.default)(fields).map(function (e) {
        return fields[e];
      });
    }
  }]);
  return TypescriptInterfaceGenerator;
}(_BaseGenerator3.default);

exports.default = TypescriptInterfaceGenerator;