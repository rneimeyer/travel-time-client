# Project Overview


## Project Schedule

| Day   | Deliverable                          | Status     |
| ----- | ------------------------------------ | ---------- |
| Day 1 | Planning and Approval                | Complete   |
| Day 1 | Set up backend files and structure   | Complete   |
| Day 2 | Set up frontend files and structure  | Complete   |
| Day 3 | Test and deploy backend              | Complete   |
| Day 4 | CSS Styling and Responsive Design    | Complete   |
| Day 5 | MVP & Bug Fixes & Adding Seed Data   | Complete   |
| Day 6 | Final Touches and deploying frontend | Complete   |
| Day 7 | Present                              | Incomplete |

## Project Description

Travel Time is a travel tracker where users can plan for future trips. Users can enter a trip with their budget and dates and add flights, hotels, and potential activities to choose the best options for them. Users can store data for a variety of trips with all potential ideas to see everything in one place.

This app will include a backend database using MongoDB and Express.js and a frontend web application using Node.js and React.

## User Stories

The user of this app loves to travel and is looking for a way to store all trip plans and ideas and compare for the best options. They are always browsing multiple sites but lose their place and want to hold it all in one location. This user is also concerned with budget and would like to compare different options to see what the most fiscally responsible idea is.

## Wireframes

- [Mobile & Desktop](https://s3.amazonaws.com/assets.mockflow.com/app/wireframepro/company/C9c1df959635a4aee914f74a5cf3d9a7b/projects/M40WmDPcunb/pages/0aea6d2b5be04142ac95939134f00557/image/0aea6d2b5be04142ac95939134f00557.png?1648237490386)

### MVP/PostMVP

#### MVP

- 5 models for data (Traveller, Trip, Flight, Hotel, Activity)
- CRUD functionality
- Have Routes and components on frontend
- Fetch data from backend API
- Responsive design from mobile to desktop
- Use bootstrap for design
- Fully Deployed frontend and backend
- Sorting functionality within each trip based on date

#### PostMVP

- Login authentication
- View friends' travel plans
- Adding animations

## Models

```js

Traveller = {
    name: String,
    email: String,
    trips: []
}

Trip = {
    name: String,
    budget: Number
    start_date: Date,
    end_date: Date
    flights: [],
    hotels: [],
    activities: []
}

Flight = {
    flight_type: String,
    airline: String,
    flight_number: String,
    date: Date,
    starting_airport: String,
    ending_airport: String,
    departure_time: String,
    arrival_time: String,
    price: Number
}

Hotel = {
    hotel: String,
    room_type: String,
    check_in: Date,
    check_out: Date,
    price: Number,
    ammenities: String
}

Activity = {
    activity: String,
    date: Date,
    time: String,
    price: Number,
    notes: String
}

```

## Routing Table

| **URL**       | **HTTP Verb** | **Action** | **Description**              |
| ------------- | ------------- | ---------- | ---------------------------- |
| /traveller    | POST          | create     | add new user                 |
| /trip         | POST          | create     | add new trip                 |
| /trip         | GET           | show       | show all of this users trips |
| /trip/:id     | GET           | show       | show specific trip           |
| /trip/:id     | PUT           | update     | update specific trip         |
| /trip/:id     | DELETE        | delete     | delete specific trip         |
| /flight       | POST          | create     | add flight                   |
| /flight/:id   | GET           | show       | show flight                  |
| /flight/:id   | PUT           | update     | edit flight                  |
| /flight/:id   | DELETE        | delete     | delete flight                |
| /hotel        | POST          | create     | add hotel                    |
| /hotel/:id    | GET           | show       | show hotel                   |
| /hotel/:id    | PUT           | update     | edit hotel                   |
| /hotel/:id    | DELETE        | delete     | delete hotel                 |
| /activity     | POST          | create     | add activity                 |
| /activity/:id | GET           | show       | show activity                |
| /activity/:id | PUT           | update     | edit activity                |
| /activity/:id | DELETE        | delete     | delete activity              |

## Functional Components

| Component |                    Description                    |
| --------- | :-----------------------------------------------: |
| Home      |         Landing Page to add new traveller         |
| AllTrips  |      Page to view, delete and add new trips       |
| Trip      | View all flights, hotels, and activities for trip |
| Flight    |            Add/delete flights for trip            |
| Hotel     |            Add/delete hotels for trip             |
| Activity  |          Add/delete activities for trip           |
| About     |            About the site and creator             |
| Header    |                   Logo and Menu                   |
| Footer    |    Created by and link to Github and Linkedin     |

#### MVP

| Component                          | Priority | Estimated Time | Actual Time |
| ---------------------------------- | :------: | :------------: | :---------: |
| Installing and Setup for backend   |    H     |      1hr       |     1hr     |
| Models                             |    H     |      3hr       |     3hr     |
| CRUD Routes and testing on Postman |    H     |      3hr       |     4hr     |
| Deploying backend                  |    H     |     1.5hr      |    1.5hr    |
| Creating React App                 |    H     |      1hr       |     1hr     |
| Add Routes                         |    H     |      2hr       |     3hr     |
| Create Components                  |    H     |      5hr       |     8hr     |
| Sorting functionality              |    H     |      3hr       |     3hr     |
| Fetch and test data on frontend    |    H     |      5hr       |     8hr     |
| Responsive Design                  |    H     |      4hr       |     4hr     |
| CSS and Bootstrap                  |    H     |      5hr       |     5hr     |
| Deploy frontend                    |    H     |      1hr       |    1.5hr    |
| Total                              |    H     |     34.5hr     |    43hr     |

#### PostMVP

| Component            | Priority | Estimated Time | Actual Time |
| -------------------- | :------: | :------------: | :---------: |
| Friends              |    L     |      6hr       |     hr      |
| Login Authentication |    H     |      4hr       |     hr      |
| Animations           |    H     |      4hr       |     hr      |
| Total                |    H     |      14hr      |     hr      |

## Additional Libraries

- Bootstrap
- Da Font
- Canva

## Code Snippet

Sorting method for flights based on date and time:

```js
for (let i = 0; i < flights.length; i++) {
  flights.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    if (a.date === b.date) {
      if (a.departure_time < b.departure_time) {
        return -1;
      }
      if (a.departure_time > b.departure_time) {
        return 1;
      }
    }
    return 0;
  });
}
```

## Issues and Resolutions

Issue: Adding new trips/flights/hotels/activities was not refreshing the page on the deployed site on Google Chrome. It was refreshing on localhost and Safari.

Resolution: Moved the useState into the put function to call after that fetch was complete. Discovered that it was being called before the put was complete, so the new addition wasn't being added to the user or trip.
