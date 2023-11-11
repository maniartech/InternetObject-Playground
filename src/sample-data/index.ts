import dummyData          from "./dummy-data";
import simple             from "./simple";
import simpleCollection   from "./simple-collection";

const sampleData:Array<{
  doc:string,
  schema:string | null,
  name: string,
}> = [
  simple,
  simpleCollection,
  dummyData,
]

export default sampleData;