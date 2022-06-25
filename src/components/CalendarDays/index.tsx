import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns'
import pt from 'date-fns/locale/pt-BR'
const CalendarDays = () => {
  const now = new Date()
  const dayArray = eachDayOfInterval({
    start: startOfWeek(now, { weekStartsOn: 1 }),
    end: endOfWeek(now, { weekStartsOn: 1 }),
  })

  let arrOfDays = []
  let arrNumberDays = []
  dayArray.map((a) => arrOfDays.push(format(a, 'dd', { locale: pt })))
  dayArray.map((a) => arrNumberDays.push(format(a, 'EEEEEE', { locale: pt })))

  console.log(arrOfDays)
  console.log(arrNumberDays)

  return (
    <div>
      <h3>teste calendar</h3>
    </div>
  )
}

export default CalendarDays
