import dummyData          from "./separate-schema";
import complex            from "./complex";

import json               from "./json/json";
import jsonSchema         from "./json/json-schema";

// Simple
import simple             from "./simple/simple-object";
import simpleCollection   from "./simple/simple-collection";
import typedCollection    from "./simple/typed-collection";

// Schema and Definition

import multipSections     from "./sections/multiple-sections";
import responseSection    from "./sections/response-section";

import employeeRegister   from "./employee-register";
import recursiveSchema    from "./recursive-schema";
import recursiveSchemaComplex from "./recursive-schema-comples";
import SampleOptions      from "./sample-options";

const sampleData:SampleOptions = new SampleOptions()
sampleData.groups = [
  {
    group: "Simple",
    items: [
      simple,
      simpleCollection,
      typedCollection
    ]
  },
  {
    group: "Schema and Definition",
    items: [
      employeeRegister,
      recursiveSchema,
      recursiveSchemaComplex
    ]
  },
  {
    group: "Multiple Sections",
    items: [
      multipSections,
      responseSection
    ]
  },
  {
    group: "JSON",
    items: [
      json,
      jsonSchema,
      complex,
      dummyData
    ]

  }
]


export default sampleData;
