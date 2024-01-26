import dummyData          from "./separate-schema";
import simple             from "./simple";
import complex            from "./complex";
import json               from "./json";
import simpleCollection   from "./simple-collection";
import multipSections     from "./multiple-sections";
import employeeRegister   from "./employee-register";

const sampleData:Array<{ doc:string, schema:string | null, name: string, }> = [
  simple,
  complex,
  json,
  simpleCollection,
  employeeRegister,
  multipSections,
  dummyData,
]

export default sampleData;
