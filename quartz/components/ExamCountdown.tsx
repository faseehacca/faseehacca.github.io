import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const ExamCountdown: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={displayClass ?? ""}>
      <div class="exam-countdown">
        <div class="countdown-title">Next Exam</div>
        <div class="countdown-exam">10 December 2026</div>

        <div class="countdown-time">
          <div class="countdown-unit">
            <span class="countdown-value days">--</span>
            <span class="countdown-label">days</span>
          </div>

          <div class="countdown-unit">
            <span class="countdown-value hours">--</span>
            <span class="countdown-label">hours</span>
          </div>

          <div class="countdown-unit">
            <span class="countdown-value minutes">--</span>
            <span class="countdown-label">min</span>
          </div>

          <div class="countdown-unit">
            <span class="countdown-value seconds">--</span>
            <span class="countdown-label">sec</span>
          </div>
        </div>
      </div>
    </div>
  )
}

ExamCountdown.afterDOMLoaded = `
  (() => {
    const initializeCountdowns = () => {
      const countdowns = document.querySelectorAll(".exam-countdown")

      countdowns.forEach((countdown) => {
        const daysElement = countdown.querySelector(".countdown-value.days")
        const hoursElement = countdown.querySelector(".countdown-value.hours")
        const minutesElement = countdown.querySelector(".countdown-value.minutes")
        const secondsElement = countdown.querySelector(".countdown-value.seconds")

        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return

        const examDate = new Date("2026-12-10T00:00:00")

        const updateCountdown = () => {
          const now = new Date()
          const difference = examDate.getTime() - now.getTime()

          if (difference <= 0) {
            daysElement.textContent = "0"
            hoursElement.textContent = "0"
            minutesElement.textContent = "0"
            secondsElement.textContent = "0"
            return
          }

          const totalSeconds = Math.floor(difference / 1000)

          const days = Math.floor(totalSeconds / (24 * 60 * 60))
          const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60))
          const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
          const seconds = totalSeconds % 60

          daysElement.textContent = String(days)
          hoursElement.textContent = String(hours)
          minutesElement.textContent = String(minutes)
          secondsElement.textContent = String(seconds)
        }

        updateCountdown()

        const interval = window.setInterval(updateCountdown, 1000)

        document.addEventListener(
          "nav",
          () => {
            window.clearInterval(interval)
          },
          { once: true }
        )
      })
    }

    initializeCountdowns()

    document.addEventListener("nav", initializeCountdowns)
  })()
`

ExamCountdown.css = `
.exam-countdown {
  margin-top: 1.25rem;
  font-size: 0.85rem;
}

.countdown-title {
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--dark);
  margin-bottom: 0.25rem;
}

.countdown-exam {
  color: var(--gray);
  font-size: 0.75rem;
  margin-bottom: 0.75rem;
}

.countdown-time {
  display: flex;
  gap: 0.65rem;
}

.countdown-unit {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.countdown-value {
  color: var(--secondary);
  font-size: 1.05rem;
  font-weight: 700;
}

.countdown-label {
  color: var(--gray);
  font-size: 0.65rem;
}

`

export default (() => ExamCountdown) satisfies QuartzComponentConstructor