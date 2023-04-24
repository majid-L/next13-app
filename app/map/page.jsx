'use client';
import { useState, useContext, useEffect, useMemo, useLayoutEffect } from "react";
import { GlobalContext } from "../context/store";
import { getExams } from '../api/apiRequests';
import React from "react";
import BingMapsReact from "../../bing";
import { useWindowWidth } from '@react-hook/window-size/throttled'
import Spinner from "../components/Spinner";

const MapPage = () => {
  const [exams, setExams] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [mapWidth, setMapWidth] = useState(800);
  const { loggedInUser } = useContext(GlobalContext);
  
  // Recalculates window width each time it changes (throttled at 30fps)
  const windowWidth = useWindowWidth();

useEffect(() => {
  setIsLoading(true);
  getExams(loggedInUser, 100)
  .then(res => {
    setIsLoading(false);
    setExams(res.exams.map(({latitude, longitude, title, description, candidateId, id}) => {
      return {
        center: {
          latitude,
          longitude
        },
        options: {
          title,
          enableHoverStyle: true,
          color: '#e73c7e',
          candidateId,
          description,
          id
        }
      }
    }));
  })
  .catch(() => {
    setIsLoading(false);
    /* * */
  });
}, []);

return (
<main className="pb-20">
  <h1 className="text-center text-stone-100 font-bold text-4xl md:text-5xl mt-20 mx-4">Viewing all exam locations</h1>
  <p className="text-center text-stone-100 mt-2 mb-16 mx-4 md:text-xl">You can zoom and select different view styles.To view information on a specific exam, click on its icon.</p>

  {isLoading && <Spinner/>}

  {/* Buttons */}
  {!isLoading && windowWidth > 360 &&
  <div className="text-center bg-slate-200 max-w-fit mx-auto mt-10 rounded-lg">
  <p className="bg-brightPink p-2 rounded-t-md">Change size</p>
  <div className="flex justify-center">
  <button onClick={() => setMapWidth(mapWidth + 100)} className="m-2">
  <img className="w-7 h-7" src="/images/plus-square-fill.svg"/>
  </button>
  <button onClick={() => setMapWidth(mapWidth - 100)} className="m-2">
  <img className="w-7 h-7" src="/images/dash-square-fill.svg"/>
  </button>
  </div>
  </div>}

  {/* Map */}
  {!isLoading && <div className="flex justify-center m-auto mt-4 w-11/12 max-w-screen-lg">
    <BingMapsReact 
      bingMapsKey="AgWz7lrowQaBmXiXmXXzepTNUmKwZrEs-gTdNUijBoVZDV0bltjdBdVAvHg8gqod" height={`${windowWidth < 460 ? 400 : windowWidth < 660 ? 500 : mapWidth}px`} width={`${windowWidth < 460 ? 500 : windowWidth < 660 ? 600 : mapWidth}px`}
      mapOptions={{
        navigationBarMode: "square",
      }}
      onClick={() => console.log('yayaya')}
      pushPinsWithInfoboxes={exams}
      viewOptions={{
        center: {  latitude: 27.98785, longitude: 86.925026 },
        mapTypeId: "canvasLight",
        zoom: 1
      }}/>
  </div>}
</main>);
}

export default MapPage;