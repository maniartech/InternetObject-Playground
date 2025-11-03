const doc = `name, age, gender, joiningDt, address: {street, city, state?}, colors, isActive
---
~ Alice Smith, 28, f, d'2021-04-15', {Elm Street, Dallas, TX}, [yellow, green, T
~ Bob Johnson, 22, m, d'2022-02-20', {Oak Street, Chicago, IL, [blue, black], T
~ Rachel Green, 31, f, d'2021-12-11', {Sunset Boulevard, Los Angeles, CA}, [purple, pink], T
~ Michael Scott, 41, m, d'2021-07-22', {Pine Street, Scranton, PA}, [green, orange], F
~ Monica Geller, 27, f, d'2022-08-19', {Maple Street, New York, NY}, [red, yellow], T
~ Joey Tribbiani, 25, m, d'2023-01-10', {6th Street, Las Vegas, NV}, [black, blue], T
~ Lisa Kudrow, 36, f, d'2021-11-05', {Broadway, Los Angeles, CA, [pink, red], F
~ Chandler Bing, 30, m, d'2023-03-12', {Wall Street, New York, NY}, [blue, grey], T
~ Ross Geller, 32, m, d'2022-06-30', {1st Avenue, New York, NY}, [green, purple], T
~ Phoebe Buffay, 29, f, d'2022-09-21', {Lexington Avenue, New York, NY}, [yellow, red], T
~ Bruce Wayne, 38, m, d'2022-05-15', {Wayne Manor, Gotham City, [black, silver], F
~ Diana Prince, 29, f, d'2023-02-28', {Themyscira Drive, Washington, DC}, [blue, gold], T
~ Tony Stark, 34, m, d'2022-07-04', {Stark Tower, New York, NY}, [red, gold], F
~ Natasha Romanoff, 32, f, d'2021-08-23', {5th Avenue, New York, NY}, [black, grey], T
~ Steve Rogers, 36, m, d'2023-04-14', {Brooklyn Heights, New York, NY}, [blue, white, red], T
~ Thor Odinson, 30, m, d'2021-03-17', {Asgard Lane, Oklahoma City, OK}, [red, silver], F
~ Wanda Maximoff, 28, f, d'2022-04-27', {Vision Street, Westview, NJ}, [red, crimson], T
~ Stephen Strange, 40, m, d'2022-12-01', {Bleecker Street, New York, NY}, [blue, gold], F
~ Carol Danvers, 35, f, d'2022-01-16', {Roosevelt Avenue, Chicago, IL}, [blue, red], T
~ Scott Lang, 30, m, d'2023-03-30', {Ant Hill Road, San Francisco, CA}, [red, silver], T
~ Hope van Dyne, 32, f, d'2021-05-05', {Pym Lane, San Francisco, CA}, [red, gold], F
~ Nick Fury, 50, m, d'2021-06-09', {Shield Road, Washington, DC}, [black], T
~ Sam Wilson, 33, m, d'2022-11-11', {Falcon Street, Harlem, NY}, [red, white, T
~ James Rhodes, 38, m, d'2022-07-29', {War Machine Blvd, Philadelphia, PA}, [grey, silver], T
~ Pepper Potts, 37, f, d'2021-09-13', {Stark Industries, Malibu, CA}, [green, white], F
~ Shuri, 24, f, d'2023-01-01', {Wakanda Way, Oakland, CA}, [black, purple], T
~ "T'Challa", 35, m, d'2022-04-30', {Royal Palace, Birnin Zana}, [black, silver], F
~ Okoye, 33, f, d'2021-08-18', {Warrior Falls, Birnin Zana}, [red, green], T
~ Erik Killmonger, 29, m, d'2022-10-31', {Golden City, Birnin Zana}, [gold, black], F
~ "M'Baku", 31, m, d'2021-12-12', {Jabari Land, Birnin Zana}, [white, brown], T
`

const exportable = {
  doc,
  schema: null,
  name: 'Simple Collection',
  id: 'simple-collection'
}

export default exportable;