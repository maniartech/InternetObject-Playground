import dummyData          from "./separate-schema";
import complex            from "./complex";
import json               from "./json";

// Simple
import simple             from "./simple/simple-object";
import simpleCollection   from "./simple/simple-collection";

// Schema and Definition

import multipSections     from "./multiple-sections";
import employeeRegister   from "./employee-register";
import recursiveSchema    from "./recursive-schema";
import recursiveSchemaComplex from "./recursive-schema-comples";

type SampleMenuItem = { doc:string, schema:string | null, name: string, id: string }
type SampleMenuGroup = { group: string, items: SampleMenuItem[] }

class SampleDataStructure {
  public groups: SampleMenuGroup[] = []
  find(id:string):SampleMenuItem | undefined {
    for (let group of this.groups) {
      for (let item of group.items) {
        if (item.id === id) return item
      }
    }
  }
}

const sampleData:SampleDataStructure = new SampleDataStructure()
sampleData.groups = [
  {
    group: "Simple",
    items: [
      simple,
      simpleCollection
    ]
  },
  {
    group: "Schema and Definition",
    items: [
      employeeRegister,
      multipSections,
      recursiveSchema,
      recursiveSchemaComplex
    ]
  },
  {
    group: "Complex",
    items: [
      complex,
      json,
      dummyData
    ]

  }
  // "Complex",
  // complex,
  // json,
  // recursiveSchema,
  // recursiveSchemaComplex,
  // employeeRegister,
  // multipSections,
  // dummyData,
]


export default sampleData;
