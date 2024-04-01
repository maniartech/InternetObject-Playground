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
~ johndoe1, John Doe, Standard, [{2345678901, d"2024-01-20"}]
~ janesmith1, Jane Smith, Premium, []
~ alexjohnson1, Alex Johnson, Standard, [{2345678902, d"2024-01-21"}]
~ emilywilliams1, Emily Williams, Premium, []
~ michaelsmith1, Michael Smith, Standard, [{2345678903, d"2024-01-22"}]
~ sarahjones1, Sarah Jones, Premium, []
~ davidbrown1, David Brown, Standard, [{2345678904, d"2024-01-23"}]
~ lisataylor1, Lisa Taylor, Premium, []
~ jameswhite1, James White, Standard, [{2345678905, d"2024-01-24"}]
~ maryharris1, Mary Harris, Premium, []
~ robertmartin1, Robert Martin, Standard, [{2345678906, d"2024-01-25"}]
~ patriciathompson1, Patricia Thompson, Premium, []
~ johngarcia1, John Garcia, Standard, [{2345678907, d"2024-01-26"}]
~ barbararodriguez1, Barbara Rodriguez, Premium, []
~ michaelmartinez1, Michael Martinez, Standard, [{2345678908, d"2024-01-27"}]
~ susananderson1, Susan Anderson, Premium, []
~ kevinlee1, Kevin Lee, Standard, [{2345678909, d"2024-01-28"}]
~ donnathomas1, Donna Thomas, Premium, []
~ jasonmoore1, Jason Moore, Standard, [{2345678910, d"2024-01-29"}]
~ lindajackson1, Linda Jackson, Premium, []
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Response Section',
  id: 'response-section'
}

export default exportable;
