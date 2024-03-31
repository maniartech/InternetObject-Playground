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

const sampleData:Array<
{ doc:string, schema:string | null, name: string, id: string } |
string
> = [
  "Simple",
  simple,
  simpleCollection,

  "Complex",
  complex,
  json,
  recursiveSchema,
  recursiveSchemaComplex,
  employeeRegister,
  multipSections,
  dummyData,
]

export default sampleData;
