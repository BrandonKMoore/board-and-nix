import { IoLogoGithub } from "react-icons/io";
import { BsLinkedin } from "react-icons/bs";
import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div>Website Developed by Kiante Moore</div>
        <div className="contacts">
            <a
              href="https://github.com/BrandonKMoore"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <IoLogoGithub className="github-logo" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/kiante-moore-779250101"
              target="_blank"
              rel="noreferrer"
              className="footer-link"
            >
              <BsLinkedin className="linkedin-logo" />
              <span>LinkedIn</span>
            </a>
          </div>
      </div>
    </div>
  )
}
