import "./Trip.css";
import Flight from "./../Flight/Flight";
import Hotel from "./../Hotel/Hotel";

const Trip = ({ urlBase, currentTrip }) => {
  console.log(currentTrip.flights);

const cleanDate = (date) => {
    const d = new Date(date);
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
    let newDate = month + " " + d.getDate() + ", " + d.getFullYear();
    return newDate;
}

  return (
    <div className="trip">
      {currentTrip.name === undefined ? (
        <div></div>
      ) : (
        <div>
          <h1 className="trip-name">{currentTrip.name}</h1>
          <h3>Budget: ${currentTrip.budget}</h3>
          <h3>From {cleanDate(currentTrip.start_date)} to {cleanDate(currentTrip.end_date)}</h3>
          <h3>Flights</h3>
          <Flight flights={currentTrip.flights} />
          <h3>Hotels</h3>
          <Hotel hotels={currentTrip.hotels} />
        </div>
      )}
    </div>
  );
};

export default Trip;
