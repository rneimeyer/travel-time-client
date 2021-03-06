import "./Footer.css";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer">
      <p>Created by Rebecca Neimeyer - 2022</p>
      <a href="https://www.linkedin.com/in/rebecca-neimeyer/" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
      </a>
      <a href="https://github.com/rneimeyer" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} className="social-icon" />
      </a>
    </div>
  );
};

export default Footer;
