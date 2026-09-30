import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Footer: QuartzComponent = () => {
  const year = new Date().getFullYear()

  return (
    <footer class="custom-footer">
      <p>Built and Maintained by Smiley © {year}</p>
      <ul>
        <li>
          <a href="https://www.instagram.com/fineassguy/">Instagram</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/faseehullahacca/">LinkedIn</a>
        </li>
      </ul>
    </footer>
  )
}

Footer.css = `
.custom-footer {
  text-align: left;
  margin-bottom: 4rem;
  opacity: 0.7;
}

.custom-footer ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -1rem;
}
`

export default (() => Footer) satisfies QuartzComponentConstructor