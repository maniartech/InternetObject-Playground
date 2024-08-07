import dummyData          from "./separate-schema";
import complex            from "./complex/complex";
import variables          from "./complex/variables";

import json               from "./json/json";
import jsonSchema         from "./json/json-schema";

// Simple
import simple             from "./simple/simple-object";
import simpleCollection   from "./simple/simple-collection";
import typedCollection    from "./simple/typed-collection";

// Schema and Definition
import multipSections     from "./sections/multiple-sections";

// Types
import any                from "./types/any";
import strings            from "./types/strings";
import numbers            from "./types/numbers";
import datetimes          from "./types/datetimes";
import arrays             from "./types/arrays";
import objects            from "./types/objects";

import employeeRegister   from "./employee-register";
import recursiveSchema    from "./recursive-schema";
import recursiveSchemaComplex from "./recursive-schema-comples";
import SampleOptions      from "./sample-options";

// Applications
import collectionResponse from "./applications/api-collection-response";
import multipleCollectionResponse from "./applications/api-multiple-collections-response";
import structuredLog      from "./applications/structured-logging";
import mlLearningData     from "./applications/ml-training-data";
import appSeedData        from "./applications/app-seed-data";
import config             from "./applications/as-config";

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
      datetimes,
      arrays,
      objects
    ]
  },
  {
    group: "Multiple Sections",
    items: [
      multipSections
    ]
  },
  {
    group: "JSON",
    items: [
      json,
      jsonSchema,
      complex,
      variables,
      dummyData
    ]
  },
  {
    group: "Applications & Use Cases",
    items: [
      collectionResponse,
      multipleCollectionResponse,
      appSeedData,
      structuredLog,
      mlLearningData,
      config,
    ]
  }
]

export default sampleData;
