'use client';
import { useState, useEffect } from "react";
import { getExams } from '../api/apiRequests';
import React from "react";
import BingMapsReact from "../../bing";
import { useWindowWidth } from '@react-hook/window-size/throttled'
import Spinner from "./Spinner";

const ExamsMap = ({isLoading, exams}) => {
  const [mapWidth, setMapWidth] = useState(800);
  
  // Recalculates window width each time it changes (throttled at 30fps)
  const windowWidth = useWindowWidth();
  const mappableExamsAray = exams.map(({latitude, longitude, title, description, candidateId, candidateName, id}) => {
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
        id,
        candidateName
      }
    }
  });

return (
<main>
  {isLoading && <Spinner/>}

  {/* Buttons */}
  {!isLoading && windowWidth > 360 &&
  <div className="text-center bg-slate-200 w-56 mx-auto mt-10 rounded-lg">
  <p className="bg-brightPink p-2 rounded-t-md">Change map size</p>
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
      pushPinsWithInfoboxes={mappableExamsAray}
      viewOptions={{
        center: {  latitude: 27.98785, longitude: 86.925026 },
        mapTypeId: "canvasLight",
        zoom: 1
      }}/>
  </div>}
</main>);
}

export default ExamsMap;