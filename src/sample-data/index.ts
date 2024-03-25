import dummyData          from "./separate-schema";
import simple             from "./simple";
import complex            from "./complex";
import json               from "./json";
import simpleCollection   from "./simple-collection";
import multipSections     from "./multiple-sections";
import employeeRegister   from "./employee-register";
import recursiveSchema    from "./recursive-schema";
import recursiveSchemaComplex from "./recursive-schema-comples";

const sampleData:Array<{ doc:string, schema:string | null, name: string, id: string }> = [
  simple,
  complex,
  json,
  recursiveSchema,
  recursiveSchemaComplex,
  simpleCollection,
  employeeRegister,
  multipSections,
  dummyData,
]

export default sampleData;
