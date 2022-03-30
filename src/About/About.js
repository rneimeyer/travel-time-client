import "./About.css";
import map from "./../assets/map.png"

const About = () => {
  return (
    <div className="about">
     <h1>About</h1>
     <img className="about-img" src={map} alt="overhead view of map to plan travel" />
    </div>
  );
};

export default About;