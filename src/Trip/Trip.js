import "./Trip.css";
import Flight from "./../Flight/Flight";
import Hotel from "./../Hotel/Hotel";

const Trip = ({ urlBase, currentTrip }) => {
  console.log(currentTrip);

const cleanDate = (date) => {
    const d = new Date(date);
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][d.getMonth()];
    let newDate = month + " " + d.getDate() + ", " + d.getFullYear();
    return newDate;
}

  return (
    <div className="trip">
      {currentTrip[0] === undefined ? (
        <div></div>
      ) : (
        <div>
          <h1 className="trip-name">{currentTrip[0].name}</h1>
          <h3>Budget: ${currentTrip[0].budget}</h3>
          <h3>From {cleanDate(currentTrip[0].start_date)} to {cleanDate(currentTrip[0].end_date)}</h3>
          <h3>Flights</h3>
          <Flight flights={currentTrip[0].flights} />
          <h3>Hotels</h3>
          <Hotel hotels={currentTrip[0].hotels} />
        </div>
      )}
    </div>
  );
};

export default Trip;
