import { QuartzComponent, QuartzComponentConstructor } from "./types"

type StudyEntry = {
  date: string
  hours: number
}

type StudyHeatmapProps = {
  entries?: StudyEntry[]
}

const StudyHeatmap: QuartzComponent = ({ entries = [] }: StudyHeatmapProps) => {
  const year = new Date().getFullYear()

  const data = new Map(entries.map((entry) => [entry.date, entry.hours]))

  const start = new Date(year, 0, 1)
  const end = new Date(year, 11, 31)

  // Move the starting point back to Sunday so the grid forms complete weeks.
  const gridStart = new Date(start)
  gridStart.setDate(start.getDate() - start.getDay())

  // Move the ending point forward to Saturday.
  const gridEnd = new Date(end)
  gridEnd.setDate(end.getDate() + (6 - end.getDay()))

  const days: Date[] = []
  const cursor = new Date(gridStart)

  while (cursor <= gridEnd) {
    days.push(new Date(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }

  const weeks: Date[][] = []

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const getLevel = (hours: number) => {
    if (hours <= 0) return 0
    if (hours < 1) return 1
    if (hours < 2) return 2
    if (hours < 4) return 3
    return 4
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <section class="study-heatmap">
      <h2>Study Activity</h2>

      <div class="heatmap-wrapper">
        <div class="heatmap-grid">
          <div class="weekday-labels">
            <span></span>
            <span>Mon</span>
            <span></span>
            <span>Wed</span>
            <span></span>
            <span>Fri</span>
            <span></span>
          </div>

          <div class="heatmap-weeks">
            {weeks.map((week, weekIndex) => (
              <div class="heatmap-week" key={weekIndex}>
                {week.map((date) => {
                  const dateString = `${date.getFullYear()}-${String(
                    date.getMonth() + 1,
                  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

                  const isCurrentYear = date.getFullYear() === year
                  const hours = data.get(dateString) ?? 0
                  const level = getLevel(hours)

                  return (
                    <div
                      class={`heatmap-cell level-${level} ${
                        isCurrentYear ? "" : "outside-year"
                      }`}
                      title={
                        isCurrentYear
                          ? `${formatDate(date)} — ${hours} hour${
                              hours === 1 ? "" : "s"
                            }`
                          : ""
                      }
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div class="heatmap-legend">
          <span>Less</span>
          <span class="legend-cell level-0" />
          <span class="legend-cell level-1" />
          <span class="legend-cell level-2" />
          <span class="legend-cell level-3" />
          <span class="legend-cell level-4" />
          <span>More</span>
        </div>
      </div>
    </section>
  )
}

StudyHeatmap.css = `
.study-heatmap {
  margin-top: 2rem;
}

.study-heatmap h2 {
  margin-bottom: 1rem;
}

.heatmap-wrapper {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.heatmap-grid {
  display: flex;
  gap: 0.5rem;
  min-width: max-content;
}

.weekday-labels {
  display: grid;
  grid-template-rows: repeat(7, 12px);
  gap: 3px;
  padding-top: 1px;
  width: 32px;
  flex-shrink: 0;
}

.weekday-labels span {
  font-size: 0.65rem;
  line-height: 12px;
  color: var(--darkgray);
}

.heatmap-weeks {
  display: flex;
  gap: 3px;
}

.heatmap-week {
  display: grid;
  grid-template-rows: repeat(7, 12px);
  gap: 3px;
}

.heatmap-cell,
.legend-cell {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid var(--lightgray);
  box-sizing: border-box;
}

.heatmap-cell {
  background: var(--lightgray);
}

.heatmap-cell.level-1,
.legend-cell.level-1 {
  background: color-mix(in srgb, var(--secondary) 25%, var(--light));
}

.heatmap-cell.level-2,
.legend-cell.level-2 {
  background: color-mix(in srgb, var(--secondary) 45%, var(--light));
}

.heatmap-cell.level-3,
.legend-cell.level-3 {
  background: color-mix(in srgb, var(--secondary) 70%, var(--light));
}

.heatmap-cell.level-4,
.legend-cell.level-4 {
  background: var(--secondary);
}

.heatmap-cell.outside-year {
  visibility: hidden;
}

.heatmap-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 0.75rem;
  font-size: 0.7rem;
  color: var(--darkgray);
}

.heatmap-legend .legend-cell {
  flex-shrink: 0;
}

@media all and (max-width: 600px) {
  .heatmap-wrapper {
    margin-right: -0.5rem;
  }
}
`

export default (() => StudyHeatmap) satisfies QuartzComponentConstructor