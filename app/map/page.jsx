'use client';
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/store";
import axios from "axios";
import Map from 'ol/Map.js';
import TileJSON from 'ol/source/TileJSON.js';
import OSM from 'ol/source/OSM.js';
import ol from 'ol';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import * as olProj from 'ol/proj';

const MapPage = () => {

  const [exams, setExams] = useState();
  const { loggedInUser } = useContext(GlobalContext);

  const getExams = () => axios.get('https://laravel-php-api.vercel.app/public/api/exams', {
  headers: {'Authorization': 'Bearer ' + loggedInUser.token}
}).then(({data}) => data);

useEffect(() => {
  getExams()
  .then(res => {
    setExams(res.exams);
  })
  .catch(() => {

  });
}, []);

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new TileJSON({
        url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=lzhV9bRphSRybrPBAIPE',
        tileSize: 512,
      }),
    }),
  ],
  view: new View({
    center: olProj.fromLonLat([11.2313123, 15.2341212]),
    zoom: 2,
  }),
  target: 'map'
});

const marker = new Vector({
    source: new ol.source.Vector({
        features: [
            new ol.Feature({
                geometry: new ol.geom.Point(
                    olProj.fromLonLat([-23.43434, -12.232322])
                )
            })
        ]
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
        })
    })
});

    map.addLayer(marker);

    return (<div id="map"></div>);
};

export default MapPage;