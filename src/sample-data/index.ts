import dummyData          from "./dummy-data";
import simple             from "./simple";
import complex            from "./complex";
import json               from "./json";
import simpleCollection   from "./simple-collection";

const sampleData:Array<{
  doc:string,
  schema:string | null,
  name: string,
}> = [
  simple,
  complex,
  json,
  simpleCollection,
  dummyData,
]

export default sampleData;