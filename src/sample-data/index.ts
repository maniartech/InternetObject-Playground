import dummyData          from "./separate-schema";
import complex            from "./complex/complex";

import json               from "./json/json";
import jsonSchema         from "./json/json-schema";

// Simple
import simple             from "./simple/simple-object";
import simpleCollection   from "./simple/simple-collection";
import typedCollection    from "./simple/typed-collection";

// Schema and Definition
import multipSections     from "./sections/multiple-sections";
import responseSection    from "./applications/api-collection-response";

// Types
import any                from "./types/any";
import strings            from "./types/strings";
import numbers            from "./types/numbers";

import employeeRegister   from "./employee-register";
import recursiveSchema    from "./recursive-schema";
import recursiveSchemaComplex from "./recursive-schema-comples";
import SampleOptions      from "./sample-options";

// Applications
import structuredLog      from "./applications/structured-log";

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
    group: "IO Types",
    items: [
      any,
      strings,
      numbers,
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
  },
  {
    group: "Applications",
    items: [
      structuredLog
    ]
  }
]

export default sampleData;
