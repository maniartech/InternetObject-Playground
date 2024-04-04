
export type SampleOptionItem = {
  id: string
  name: string,
  doc:string,
  schema:string | null,
  schemaPanelHeight?:number,
}

type SampleOptionGroup = { group: string, items: SampleOptionItem[] }


class SampleOptions {
  public groups: SampleOptionGroup[] = []
  find(id:string):SampleOptionItem | undefined {
    for (let group of this.groups) {
      for (let item of group.items) {
        if (item.id === id) return item
      }
    }
  }
}

export default SampleOptions