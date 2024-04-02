
type SampleOptionItem = { doc:string, schema:string | null, name: string, id: string }

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