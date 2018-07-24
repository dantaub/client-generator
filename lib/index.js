#!/usr/bin/env node
"use strict";

require("isomorphic-fetch");

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _parseHydraDocumentation = require("@api-platform/api-doc-parser/lib/hydra/parseHydraDocumentation");

var _parseHydraDocumentation2 = _interopRequireDefault(_parseHydraDocumentation);

var _parseSwaggerDocumentation = require("@api-platform/api-doc-parser/lib/swagger/parseSwaggerDocumentation");

var _parseSwaggerDocumentation2 = _interopRequireDefault(_parseSwaggerDocumentation);

var _package = require("../package.json");

var _generators = require("./generators");

var _generators2 = _interopRequireDefault(_generators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package.version).description("Generate a CRUD application built with React, Redux and React Router from an Hydra-enabled API").usage("entrypoint outputDirectory").option("-r, --resource [resourceName]", "Generate CRUD for the given resource").option("-p, --hydra-prefix [hydraPrefix]", "The hydra prefix used by the API", "hydra:").option("-g, --generator [generator]", 'The generator to use, one of "react", "react-native", "vue", "admin-on-rest"', "react").option("-t, --template-directory [templateDirectory]", "The templates directory base to use. Final directory will be ${templateDirectory}/${generator}", __dirname + "/../templates/").option("-f, --format [hydra|swagger]", '"hydra" or "swagger', "hydra").parse(process.argv);

if (2 !== _commander2.default.args.length && (!process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT || !process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT)) {
  _commander2.default.help();
}

var entrypoint = _commander2.default.args[0] || process.env.API_PLATFORM_CLIENT_GENERATOR_ENTRYPOINT;
var outputDirectory = _commander2.default.args[1] || process.env.API_PLATFORM_CLIENT_GENERATOR_OUTPUT;

var generator = (0, _generators2.default)(_commander2.default.generator)({
  hydraPrefix: _commander2.default.hydraPrefix,
  templateDirectory: _commander2.default.templateDirectory
});
var resourceToGenerate = _commander2.default.resource ? _commander2.default.resource.toLowerCase() : null;

var parser = function parser(entrypoint) {
  var parseDocumentation = "swagger" === _commander2.default.format ? _parseSwaggerDocumentation2.default : _parseHydraDocumentation2.default;

  return parseDocumentation(entrypoint);
};

parser(entrypoint).then(function (ret) {
  ret.api.resources.filter(function (_ref) {
    var deprecated = _ref.deprecated;
    return !deprecated;
  }).forEach(function (resource) {
    var nameLc = resource.name.toLowerCase();
    var titleLc = resource.title.toLowerCase();

    if (null === resourceToGenerate || nameLc === resourceToGenerate || titleLc === resourceToGenerate) {
      resource.fields = resource.fields.filter(function (_ref2) {
        var deprecated = _ref2.deprecated;
        return !deprecated;
      });
      resource.readableFields = resource.readableFields.filter(function (_ref3) {
        var deprecated = _ref3.deprecated;
        return !deprecated;
      });
      resource.writableFields = resource.writableFields.filter(function (_ref4) {
        var deprecated = _ref4.deprecated;
        return !deprecated;
      });

      generator.generate(ret.api, resource, outputDirectory);
      generator.help(resource);
    }
  });
}).catch(function (e) {
  console.log(e);
});