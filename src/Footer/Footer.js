import "./Footer.css";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className="footer">
      <p>Created by Rebecca Neimeyer - 2022</p>
      <a href="https://www.linkedin.com/in/rebecca-neimeyer/" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://github.com/rneimeyer" target="_blank">
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
};

export default Footer;
