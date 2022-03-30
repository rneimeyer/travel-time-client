import "./Trip.css";
import { useParams } from "react-router";
import Flight from "./../Flight/Flight"
import Hotel from "./../Hotel/Hotel"

const Trip = ({ trip }) => {
    console.log(trip)
  return (
    <div className="trip">
     {trip[0].name}
     <Flight />
     <Hotel />
    </div>
  );
};

export default Trip;