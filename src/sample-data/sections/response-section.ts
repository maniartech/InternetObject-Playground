const schema = `
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}}
~ $res: {
  success: bool,
  error*: string,
  count: number,
  page: number,
  prev*: string,
  next*: string
}
`.trim()

const doc = `
--- $res
T, N, 102, 11, /api/v1/users?page=10, /api/v1/users?page=12
--- $users
~ johndoe1, John Doe, Standard
~ janesmith1, Jane Smith, Premium
~ alexjohnson1, Alex Johnson, Standard
~ emilywilliams1, Emily Williams, Premium
~ michaelsmith1, Michael Smith, Standard
~ sarahjones1, Sarah Jones, Premium
~ davidbrown1, David Brown, Standard
~ lisataylor1, Lisa Taylor, Premium
~ jameswhite1, James White, Standard
~ maryharris1, Mary Harris, Premium
~ robertmartin1, Robert Martin, Standard
~ patriciathompson1, Patricia Thompson, Premium
~ johngarcia1, John Garcia, Standard
~ barbararodriguez1, Barbara Rodriguez, Premium
~ michaelmartinez1, Michael Martinez, Standard
~ susananderson1, Susan Anderson, Premium
~ kevinlee1, Kevin Lee, Standard
~ donnathomas1, Donna Thomas, Premium
~ jasonmoore1, Jason Moore, Standard
~ lindajackson1, Linda Jackson, Premium
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Response Section',
  id: 'response-section'
}

export default exportable;
