import "./About.css";
import map from "./../assets/map.png"

const About = () => {
  return (
    <div className="about">
     <h1>About</h1>
     <img className="about-img" src={map} />
    </div>
  );
};

export default About;