import "./About.css";
import map from "./../assets/map.png";

const About = () => {
  return (
    <div className="about">
      <h1>About</h1>
      <div className="about-content">
        <div>
          <img
            className="about-img"
            src={map}
            alt="overhead view of map to plan travel"
          />
        </div>
        <div className="about-text">
          <h3>About Travel Time</h3>
          <p>
            This project was created to help you plan your next vacation! Enter all
            your details and make sure you are planning within your budget!
          </p>
          <h3>About the Creator</h3>
          <p>
            Hi! My name is Rebecca Neimeyer. I love to travel and wanted to
            create an easy way to keep track of all upcoming trips. Please feel
            free to reach out to me via{" "}
            <a
              href="https://www.linkedin.com/in/rebecca-neimeyer"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>{" "}
            or check out my{" "}
            <a
              href="https://rneimeyer.github.io/project-1-portfolio/"
              target="_blank"
              rel="noreferrer"
            >
              portfolio
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
