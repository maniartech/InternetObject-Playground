import dummyData          from "./dummy-data";
import simple             from "./simple";
import complex            from "./complex";
import json               from "./json";
import simpleCollection   from "./simple-collection";
import multipSections     from "./multiple-sections";

const sampleData:Array<{
  doc:string,
  schema:string | null,
  name: string,
}> = [
  simple,
  complex,
  json,
  simpleCollection,
  multipSections,
  dummyData,

]

export default sampleData;