const doc = `
name: string,
age: number,
gender: {string, choices: [m, f]},
joiningDt: date,
address: {
  street: string,
  city: string,
  state?: {string, len: 2} # Optional
},
colors: string
---
~ Alice Smith, 28, f, d'2021-04-15', {Elm Street, Dallas, TX}, yellow
~ Bob Johnson, 22, m, d'2022-02-20', {Oak Street, Chicago, IL}, blue
~ Rachel Green, 31, f, d'2021-12-11', {Sunset Boulevard, Los Angeles, CA}, purple
~ Michael Scott, 41, m, d'2021-07-22', {Pine Street, Scranton, PA}, green
~ Monica Geller, 27, f, d'2022-08-19', {Maple Street, New York, NY}, red
~ Joey Tribbiani, 25, m, d'2023-01-10', {6th Street, Las Vegas, NV}, black
~ Lisa Kudrow, 36, f, d'2021-11-05', {Broadway, Los Angeles, CA}, pink
~ Chandler Bing, 30, m, d'2023-03-12', {Wall Street, New York, NY}, blue
~ Ross Geller, 32, m, d'2022-06-30', {1st Avenue, New York, NY}, green
~ Phoebe Buffay, 29, f, d'2022-09-21', {Lexington Avenue, New York, NY}, yellow
~ Bruce Wayne, 38, m, d'2022-05-15', {Wayne Manor, Gotham City}, black
~ Diana Prince, 29, f, d'2023-02-28', {Themyscira Drive, Washington, DC}, blue
~ Tony Stark, 34, m, d'2022-07-04', {Stark Tower, New York, NY}, red
~ Natasha Romanoff, 32, f, d'2021-08-23', {5th Avenue, New York, NY}, black
~ Steve Rogers, 36, m, d'2023-04-14', {Brooklyn Heights, New York, NY}, blue
~ Thor Odinson, 30, m, d'2021-03-17', {Asgard Lane, Oklahoma City, OK}, red
~ Wanda Maximoff, 28, f, d'2022-04-27', {Vision Street, Westview, NJ}, red
~ Stephen Strange, 40, m, d'2022-12-01', {Bleecker Street, New York, NY}, blue
~ Carol Danvers, 35, f, d'2022-01-16', {Roosevelt Avenue, Chicago, IL}, blue
~ Scott Lang, 30, m, d'2023-03-30', {Ant Hill Road, San Francisco, CA}, red
~ Hope van Dyne, 32, f, d'2021-05-05', {Pym Lane, San Francisco, CA}, red
~ Nick Fury, 50, m, d'2021-06-09', {Shield Road, Washington, DC}, black
~ James Rhodes, 38, m, d'2022-07-29', {War Machine Blvd, Philadelphia, PA}, grey
~ Pepper Potts, 37, f, d'2021-09-13', {Stark Industries, Malibu, CA}, green
~ Shuri, 24, f, d'2023-01-01', {Wakanda Way, Oakland, CA}, black
~ "T'Challa", 35, m, d'2022-04-30', {Royal Palace, Birnin Zana}, black
~ Okoye, 33, f, d'2021-08-18', {Warrior Falls, Birnin Zana}, red
~ Erik Killmonger, 29, m, d'2022-10-31', {Golden City, Birnin Zana}, gold
~ "M'Baku", 31, m, d'2021-12-12', {Jabari Land, Birnin Zana}, white
`.trim()

const exportable = {
  doc,
  schema: null,
  id: 'simple-collection-with-types',
  name: 'Simple Collection With Types'
}

export default exportable
