const schema = `
# This examples represents the seed data for a single page application. It
# contains the dashboard data, initial users and account information required
# to seed the application with initial data.
~ $dashboard: {
  states: { activeUsers: int, totalTasks: int, uptime: float },
  recentActivities: [{ username:string, activity: string, timestamp: datetime }],
  pendingTasks: [{ taskId: int, title: string, dueDate: date }],
  leaderBoards: [{ userId: string, points: int }]
}
~ $initialUsers: { id: int, username: string, firstName: string, lastName: string, avatar: string, role: string }
~ $accountInfo: { accountId: int, name: string, logo: string, theme: string, owner: string, created: datetime, status: string }
`.trim()

const doc = `
--- $dashboard
{ 100, 20, 99.5 }, # stats
[ # recent activities
  { "johndoe", "Published artible", dt"2021-01-01T10:00:00" },
  { "johndoe", "Commented on post", dt"2021-01-01T10:15:00" },
  { "johndoe", "Shared a link", dt"2021-01-01T10:30:00" },
  { "janesmith", "Liked a post", dt"2021-01-01T10:45:00" },
  { "janesmith", "Published artible", dt"2021-01-01T11:00:00" } ],
[ # pending tasks
  { 1, "Design the logo", d"2021-01-01" },
  { 2, "Create a new landing page", d"2021-01-02" },
  { 3, "Update the pricing page", d"2021-01-03" },
  { 4, "Fix the login issue", d"2021-01-04" },
  { 5, "Update the profile page", d"2021-01-05" } ],
[ # leader board
  { "johndoe", 100 },
  { "janesmith", 200 },
  { "alexjohnson", 300 } ]

--- users: $initialUsers
~ 31, johndoe, John, Doe, "johndoe.jpg", "admin"
~ 52, janesmith, Jane, Smith, "janesmith.jpg", "editor"
~ 63, alexjohnson, Alex, Johnson, "alexjohnson.jpg", "editor"
~ 94, emilywilliams, Emily, Williams, "emilywilliams.jpg", "editor"
~ 55, michaelsmith, Michael, Smith, "michaelsmith.jpg", "editor"
~ 46, sarahjones, Sarah, Jones, "sarahjones.jpg", "editor"
~ 67, davidbrown, David, Brown, "davidbrown.jpg", "editor"
~ 88, lisataylor, Lisa, Taylor, "lisataylor.jpg", "editor"
~ 9, jameswhite, James, White, "jameswhite.jpg", "editor"
~ 110, maryharris, Mary, Harris, "maryharris.jpg", "editor"

--- $accountInfo
~ 23, "Acme Inc", "acme.jpg", "light", "johndoe", dt"2021-01-01T10:00:00", "active"
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Application Seed Data REST Response',
  id: 'app-seed-data',
  schemaPanelHeight: 270,
}

export default exportable;
