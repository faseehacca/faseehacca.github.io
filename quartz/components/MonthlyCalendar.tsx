import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const MonthlyCalendar: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={displayClass ?? ""}>
      <div class="monthly-calendar">
        <div class="calendar-header">
          <button class="calendar-nav prev" type="button" aria-label="Previous month">
            Prev
          </button>

          <div class="calendar-month" aria-live="polite"></div>

          <button class="calendar-nav next" type="button" aria-label="Next month">
            Next
          </button>
        </div>

        <div class="calendar-weekdays" aria-hidden="true">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div class="calendar-days"></div>
      </div>
    </div>
  )
}

MonthlyCalendar.afterDOMLoaded = `
  (() => {
    const initializeCalendars = () => {
      const calendars = document.querySelectorAll(".monthly-calendar")

      calendars.forEach((calendar) => {
        const monthLabel = calendar.querySelector(".calendar-month")
        const daysContainer = calendar.querySelector(".calendar-days")
        const previousButton = calendar.querySelector(".calendar-nav.prev")
        const nextButton = calendar.querySelector(".calendar-nav.next")

        if (!monthLabel || !daysContainer || !previousButton || !nextButton) return

        let currentDate = new Date()

        const renderCalendar = () => {
          const year = currentDate.getFullYear()
          const month = currentDate.getMonth()

          monthLabel.textContent = currentDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })

          const firstDay = new Date(year, month, 1).getDay()
          const daysInMonth = new Date(year, month + 1, 0).getDate()
          const today = new Date()

          daysContainer.innerHTML = ""

          for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("span")
            emptyDay.className = "calendar-day empty"
            daysContainer.appendChild(emptyDay)
          }

          for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("span")
            dayElement.className = "calendar-day"
            dayElement.textContent = String(day)

            if (
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear()
            ) {
              dayElement.classList.add("today")
            }

            daysContainer.appendChild(dayElement)
          }
        }

        previousButton.addEventListener("click", () => {
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1,
          )
          renderCalendar()
        })

        nextButton.addEventListener("click", () => {
          currentDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1,
          )
          renderCalendar()
        })

        renderCalendar()
      })
    }

    initializeCalendars()

    document.addEventListener("nav", initializeCalendars)
  })()
`

MonthlyCalendar.css = `
.monthly-calendar {
  font-size: 0.85rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.calendar-month {
  font-weight: 600;
  color: var(--dark);
}

.calendar-nav {
  border: 0;
  background: transparent;
  color: var(--darkgray);
  cursor: pointer;
  font-size: 0.7rem;
  line-height: 1;
  padding: 0.25rem 0.4rem;
  border-radius: 0.35rem;
}

.calendar-nav:hover {
  background: var(--lightgray);
  color: var(--secondary);
}

.calendar-weekdays,
.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.calendar-weekdays {
  color: var(--gray);
  font-size: 0.7rem;
  margin-bottom: 0.35rem;
}

.calendar-day {
  padding: 0.3rem 0;
  color: var(--darkgray);
}

.calendar-day.empty {
  visibility: hidden;
}

.calendar-day.today {
  background: var(--secondary);
  color: var(--light);
  border-radius: 50%;
  font-weight: 700;
}
`

export default (() => MonthlyCalendar) satisfies QuartzComponentConstructor