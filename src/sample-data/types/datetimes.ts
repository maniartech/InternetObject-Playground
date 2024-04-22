const schema = `
# This example demonstrates the representation of date and time in Internet Object using annotated strings.
# The types 'datetime', 'date', and 'time' are denoted by 'dt', 'd', and 't' annotations respectively.
# See how values can be expressed with or without separators, and how you can omit the later parts of the date and time
# without affecting the parsing. The 'validations' section demonstrates how you can specify the min and max values for
# datetime, date, and time types.

~ $dateTimes:{ dt1:datetime, dt2:datetime, dt3:datetime, dt4:datetime, dt5:datetime, dt6:datetime, dt7:datetime, dt8:datetime }
~ $dates:{ d1:date, d2:date, d3 }
~ $times:{ t1:time, t2:time, t3:time, t4:time, t5:time }
~ $validations: {
    dt: {datetime, min: dt'2024-01-00T00:00:00Z', max: dt'2024-12-31T23:59:59Z' }, # During 2024
    d: {date, min: d'2024-01-01', max:d'2024-03-31' }, # First quater 2024
    t: {time, min: t'09:00', max:t'17:00' } # 9 AM to 5 PM
  }
`.trim()

const doc = `
--- $dateTimes
~ dt'2020-05-10T12:00:00Z', dt'2020-05-10T12:00', dt'2020-05-10T12:00', dt'2020-05-10T12', dt'2020-05-10', dt'2020-05', dt'2020-05', dt'2020' # with separators
~ dt'20200510T120000Z', dt'20200510T1200', dt'20200510T1200', dt'20200510T12', dt'20200510', dt'20200510', dt'20200510', dt'2020' # without separators

--- $dates
~ d'2020-05-10', d'2020-05', d'2024' # with separators
~ d'20200510', d'202005', d'2024'    # without separators

--- $times # JSON will truncate t1 milliseconds
~ t'14:35:58.123456', t'14:35:58.123', t'14:35:48', t'14:35', t'14'  # with separators
~ t'143548123456', t'143548123', t'143548',t'1435', t'14'        # without separators

--- $validations
~ dt'2024-06-15T12:39:54.765', d'2024-02-19', t'13:42'
`.trim()

const exportable = {
  doc,
  schema:schema,
  name: 'IO Date and Times',
  id: 'io-datetimes',
  schemaPanelHeight:320,
}

export default exportable;