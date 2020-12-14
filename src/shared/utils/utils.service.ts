import moment from 'moment'

export const carIsFromTheLastFiveYears = (year: number) => {
  const lastFiveYears = moment().subtract(5, 'years')
  const formatedYear = moment().set('year', year)

  const yearIsInTheLastFiveYears = formatedYear.isSameOrAfter(lastFiveYears)

  return yearIsInTheLastFiveYears
}
