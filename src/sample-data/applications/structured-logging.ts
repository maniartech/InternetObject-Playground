const schema = `
# Showcases the validated way to store nested and tabular structured logs using
# Internet Object! Superior to CSV and JSON, Internet Object is perfectly suited
# for any structured data, including logs.
~ $log: { # The structured log object definition
  timestamp: datetime,
  level: {string, choices:[info, warn, error]},
  message: string,
  user: string,
  session: {string, pattern: r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"},
  details: {
    ipAddress: string,
    browser: string,
    os: string,
    device: string
  }
}
~ $schema: $log
`.trim()

const doc = `
~ dt"2024-04-20T00:47:21Z", error, Login attempt failed, annbrown, "471dbfa8-c3d4-4888-b7a7-02bcfeeadf00", {122.27.53.82, Safari 14.0, Windows 10, Tablet}
~ dt"2024-04-20T04:36:04Z", info, User logged in, annbrown, "55bf3d74-f4b9-43f0-ba4e-3215c24b80cb", {205.71.80.66, Firefox 89.0, Ubuntu 20.04, Mobile}
~ dt"2024-04-20T06:08:04Z", info, User logged in, johndoe, "91d9ba1b-8123-4baf-86ff-5b0cbf2e6d92", {101.62.46.76, Safari 14.0, Android 11, Tablet}
~ dt"2024-04-20T06:46:04Z", error, Login attempt failed, janedoe, "7181637f-e977-4744-b4f2-3fe77b0a4ac5", {254.31.22.32, Chrome 91.0, Windows 10, Desktop}
~ dt"2024-04-20T09:55:04Z", error, Login attempt failed, annbrown, "ca9c0858-a894-40ff-a486-a868fee9b4eb", {235.74.34.84, Chrome 91.0, Windows 10, Laptop}
~ dt"2024-04-20T10:23:04Z", error, Login attempt failed, janedoe, "e298547c-5dd7-464d-b79c-09a1a597f847", {175.87.54.34, Safari 14.0, macOS 11.4, Laptop}
~ dt"2024-04-20T12:20:04Z", error, Login attempt failed, johndoe, "6558d335-acb2-4de4-a7aa-be1f7663ad0e", {133.12.60.80, Safari 14.0, Windows 10, Laptop}
~ dt"2024-04-20T14:17:04Z", info, User logged in, janedoe, "a9182934-3e2e-4242-88d5-6439ecfa9f93", {163.97.31.17, Firefox 89.0, Windows 10, Desktop}
~ dt"2024-04-20T15:18:04Z", info, User logged in, mikesmith, "80deff88-b7c1-47cb-be34-0ae441c781aa", {227.11.38.95, Edge 91.0, Ubuntu 20.04, Laptop}
~ dt"2024-04-20T16:55:21Z", error, Login attempt failed, annbrown, "534cc4f2-d84a-4844-9d47-1a0c72482c7f", {241.33.52.33, Firefox 89.0, macOS 11.4, Mobile}
~ dt"2024-04-21T02:54:04Z", error, Login attempt failed, annbrown, "7754193e-0bb8-47bd-9f40-bed5256c8fb7", {181.13.14.79, Safari 14.0, Windows 10, Mobile}
~ dt"2024-04-21T03:52:04Z", error, Login attempt failed, johndoe, "a594da3e-ac27-408a-b7ff-03787bcfdc3e", {166.53.89.15, Chrome 91.0, Ubuntu 20.04, Laptop}
~ dt"2024-04-21T03:54:04Z", warn, User session expired, mikesmith, "38b68ec6-cee3-4ab4-ae9f-12c924f83c4b", {181.45.63.40, Chrome 91.0, Android 11, Laptop}
~ dt"2024-04-21T04:19:04Z", warn, User session expired, annbrown, "96dc045d-e7af-49d1-89da-55ff9ebd8150", {104.56.86.74, Chrome 91.0, Android 11, Tablet}
~ dt"2024-04-21T06:36:21Z", error, Login attempt failed, johndoe, "e3e64ad1-5b43-4041-91d8-6829f77e3881", {178.33.34.37, Chrome 91.0, Windows 10, Laptop}
~ dt"2024-04-21T07:44:04Z", info, User logged in, mikesmith, "a168b755-ea73-4409-85d8-51113ba415f9", {159.70.13.88, Safari 14.0, Windows 10, Desktop}
~ dt"2024-04-21T13:35:04Z", info, User logged in, annbrown, "362c202d-f77a-492e-a209-9f899f48e612", {212.13.97.56, Edge 91.0, macOS 11.4, Mobile}
~ dt"2024-04-21T13:56:04Z", warn, User session expired, mikesmith, "bd3d3010-e3fd-4051-880b-05e0556f83b7", {212.96.27.48, Edge 91.0, Ubuntu 20.04, Mobile}
~ dt"2024-04-21T14:40:04Z", info, User logged in, johndoe, "8aca7cda-ab6c-4969-b6e9-b34524d7f1bc", {210.32.71.90, Edge 91.0, Ubuntu 20.04, Tablet}
~ dt"2024-04-21T15:48:04Z", info, User logged in, annbrown, "ac85cf4f-8f1e-4532-bfc8-247b9c5f48fb", {156.99.93.33, Safari 14.0, Android 11, Desktop}
~ dt"2024-04-21T17:11:04Z", warn, User session expired, annbrown, "0cbb90ce-528c-46ad-aa6d-8df07fc2d056", {215.53.56.83, Safari 14.0, Windows 10, Desktop}
~ dt"2024-04-21T17:34:04Z", error, Login attempt failed, johndoe, "da260803-9ab4-46b8-9e1c-457f9d97b6e4", {137.54.43.88, Chrome 91.0, Android 11, Tablet}
~ dt"2024-04-21T18:06:21Z", warn, User session expired, annbrown, "75b6ad46-1716-4bdf-87a5-2ce1be3a21f4", {171.56.75.99, Edge 91.0, Android 11, Desktop}
~ dt"2024-04-21T21:26:04Z", info, User logged in, janedoe, "6c5b6591-ca18-4781-928d-15f4d08e1a09", {209.80.55.45, Edge 91.0, macOS 11.4, Desktop}
~ dt"2024-04-21T21:47:21Z", info, User logged in, annbrown, "7a27d3aa-5b91-4d34-9011-83f9b3e1721a", {115.13.90.53, Safari 14.0, Android 11, Mobile}
~ dt"2024-04-22T00:32:04Z", warn, User session expired, janedoe, "572acebc-a25b-4511-8008-278aeb60c4f6", {170.57.96.47, Firefox 89.0, Windows 10, Mobile}
~ dt"2024-04-22T03:05:13Z", warn, User session expired, janedoe, "a8b4cf55-bf09-4326-b699-be97498a13cd", {242.50.77.27, Chrome 91.0, macOS 11.4, Desktop}
~ dt"2024-04-22T03:47:04Z", warn, User session expired, johndoe, "b4cde40c-4952-45a6-b459-636f6306cd78", {220.79.82.19, Safari 14.0, Ubuntu 20.04, Tablet}
~ dt"2024-04-22T04:30:04Z", error, Login attempt failed, johndoe, "6e9ee1ad-3d35-49fd-8424-6fe55ff9550c", {205.85.28.65, Safari 14.0, Android 11, Desktop}
~ dt"2024-04-22T04:33:04Z", warn, User session expired, annbrown, "a0470d98-c513-4b25-8deb-445f758c3e95", {243.77.61.46, Edge 91.0, Android 11, Desktop}
~ dt"2024-04-22T06:00:04Z", error, Login attempt failed, mikesmith, "708428be-97ec-4f98-bc2e-9f108a29b8ee", {251.97.97.93, Chrome 91.0, macOS 11.4, Desktop}
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Logging (Structured) User Activity',
  id: 'structured-logging',
  schemaPanelHeight: 370,
}

export default exportable;
