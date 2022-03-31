import "./Flight.css";

const Flight = ({ flights }) => {
console.log(flights)
    const yourFlights = flights.map((flight) => {
        return (
            <div key={flight._id} className="box">
                <div>{flight.name}</div>
                <a href={flight.link} target="_blank">Link to flight</a>
                <p>Price: ${flight.price}</p>
            </div>
        )
    })

  return (
    <div className="flight">
     {yourFlights}
    </div>
  );
};

export default Flight;