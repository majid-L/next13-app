'use client';
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import axios from "axios";
import React from "react";
import BingMapsReact from "bingmaps-react";

const MapPage = () => {

  const [exams, setExams] = useState();
  const { loggedInUser } = useContext(GlobalContext);

  const getExams = () => axios.get('https://laravel-php-api.vercel.app/public/api/exams', {
  headers: {'Authorization': 'Bearer ' + loggedInUser.token}
}).then(({data}) => data);

useEffect(() => {
  getExams()
  .then(res => {
    setExams(res.exams.map(({latitude, longitude, title}) => {
      return {
        center: {
          latitude,
          longitude
        },
        options: {
          title
        }
      }
    }));
  })
  .catch(() => {

  });
}, []);
 
return <main className=""><div className="block m-auto"><BingMapsReact bingMapsKey="AgWz7lrowQaBmXiXmXXzepTNUmKwZrEs-gTdNUijBoVZDV0bltjdBdVAvHg8gqod" height="500px"
mapOptions={{
  navigationBarMode: "square",
}}
width="500px"
pushPinsWithInfoboxes={exams}
viewOptions={{
  center: {  latitude: 27.98785, longitude: 86.925026 },
  mapTypeId: "grayscale",
}}/></div></main>;
}

export default MapPage;