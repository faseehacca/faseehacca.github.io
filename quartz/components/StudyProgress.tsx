import { QuartzComponent, QuartzComponentConstructor } from "./types"

const StudyProgress: QuartzComponent = () => {
  const subjects = [
    { name: "Financial Reporting", code: "FR", progress: 3 },
    { name: "Audit & Assurance", code: "AA", progress: 0 },
  ]

  return (
    <section className="study-progress">
      <h2>Currently Studying</h2>

      <div className="study-grid">
        {subjects.map((subject) => (
          <div className="study-card" key={subject.code}>
            <div className="study-header">
              <div>
                <strong>{subject.code}</strong>
                <span>{subject.name}</span>
              </div>
              <span className="study-percentage">{subject.progress}%</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

StudyProgress.css = `
.study-progress {
  margin-top: 2rem;
}

.study-progress h2 {
  margin-bottom: 1rem;
}

.study-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.study-card {
  padding: 1rem;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  background: var(--light);
}

.study-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.study-header > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.study-header strong {
  font-size: 1.05rem;
}

.study-header span:not(.study-percentage) {
  font-size: 0.85rem;
  color: var(--darkgray);
}

.study-percentage {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
}

.progress-track {
  width: 100%;
  height: 9px;
  background: var(--lightgray);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  min-width: 0;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    var(--secondary),
    color-mix(in srgb, var(--secondary) 65%, var(--tertiary))
  );
  transition: width 0.3s ease;
}

@media all and (max-width: 600px) {
  .study-grid {
    grid-template-columns: 1fr;
  }
}
`

export default (() => StudyProgress) satisfies QuartzComponentConstructor