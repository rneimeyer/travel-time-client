import "./AllTrips.css";
import { Link } from "react-router-dom";

const AllTrips = ({ currentTraveller }) => {
  return (
    <div className="all-trips">
      <h1>All Trips</h1>
      {currentTraveller === undefined ? (
        <div>
          <h3>
            Please <Link to="/">sign in</Link> to view and update your trips!
          </h3>
        </div>
      ) : (
        <div>
          <div className="current-traveller">
            Current Traveller: {currentTraveller.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrips;
