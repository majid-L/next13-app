'use client';
import { useState, useContext, useEffect, useMemo, useLayoutEffect } from "react";
import { GlobalContext } from "../context/store";
import { getExams } from '../api/apiRequests';
import React from "react";
import BingMapsReact from "bingmaps-react";
import { useWindowWidth } from '@react-hook/window-size/throttled'


const MapPage = () => {
  const [exams, setExams] = useState();
  const [mapWidth, setMapWidth] = useState(500);
  const { loggedInUser } = useContext(GlobalContext);
  
  // Recalculates window width each time it changes (throttled at 30fps)
  const windowWidth = useWindowWidth();
  
  // Memoising an anonymous function that fixes mapSize at 500px on narrow viewports
  const adjustMapWidth = useMemo(() => ((windowWidth, mapSize) => 
    windowWidth < 460 ? 500 
    : mapWidth)(windowWidth, mapWidth));
  
  // Whenever the screen is resized, this call resets map size prior to next paint
  useLayoutEffect(() => setMapWidth(500), [windowWidth]);

useEffect(() => {
  getExams(loggedInUser)
  .then(res => {
    setExams(res.exams.map(({latitude, longitude, title, description : subTitle}) => {
      return {
        center: {
          latitude,
          longitude
        },
        options: {
          title,
          subTitle,
          enableHoverStyle: true
        }
      }
    }));
  })
  .catch(() => {
    /* * */
  });
}, []);
// if windowWidth is under 360 => mapSize needs to be fixed at 500
return (
<main>
  <h1 className="text-center text-stone-100 font-bold text-4xl mt-20 mx-4">Viewing all exam locations</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 mx-4">You can zoom and select different view styles.To view information on a specific exam, click on its icon.</p>

  {/* Buttons */}
  <div className="text-center bg-slate-200 max-w-fit mx-auto mt-10 rounded-lg">
  <p className="bg-fuchsia-800 text-slate-200 p-2 rounded-t-md">Change size</p>
  <div className="flex justify-center">
  <button onClick={() => setMapWidth(mapWidth + 100)} disabled={windowWidth < 360} className="m-2">
  <img className="w-7 h-7" src="/images/plus-square-fill.svg"/>
  </button>
  <button onClick={() => setMapWidth(mapWidth - 100)} disabled={windowWidth < 360} className="m-2">
  <img className="w-7 h-7" src="/images/dash-square-fill.svg"/>
  </button>
  </div>
  </div>

  {/* Map */}
  <div className="flex justify-center m-auto mt-4 w-11/12 max-w-screen-lg">
    <BingMapsReact 
      bingMapsKey="AgWz7lrowQaBmXiXmXXzepTNUmKwZrEs-gTdNUijBoVZDV0bltjdBdVAvHg8gqod" height={`${adjustMapWidth}px`} width={`${adjustMapWidth}px`}
      mapOptions={{
        navigationBarMode: "square",
      }}
      infoboxesWithPushPins = {[
        {
          "location":[41.19197, 25.33719], 
          "addHandler": "click", //on click the pushpin, infobox shown
          "infoboxOption": { title: '№ на станция', description: '...' },
          "pushPinOption":{ color: 'yellow' },
        }
      ]}
      pushPinsWithInfoboxes={exams}
      viewOptions={{
        center: {  latitude: 27.98785, longitude: 86.925026 },
        mapTypeId: "grayscale",
        zoom: 1
      }}/>
  </div>
</main>);
}

export default MapPage;