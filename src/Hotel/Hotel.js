import "./Hotel.css";

const Hotel = ({ hotels }) => {

        const yourHotels = hotels.map((hotel) => {
        return (
            <div key={hotel._id} className="box">
                <div>{hotel.name}</div>
                <a href={hotel.link} target="_blank">Link to hotel</a>
                <p>Price: ${hotel.price}</p>
            </div>
        )
    })

  return (
    <div className="hotel">
     {hotels[0] === undefined ? (
            <div>Add a hotel!</div>
        ) : (
            <div>{yourHotels}</div>  
        )}
    </div>
  );
};

export default Hotel;