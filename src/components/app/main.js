///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
import '../../styles/map-style.css';
import 'jquery';
import { sliderToggle, layerList } from './interface';
import conf from '../map/map.config.js';
import fetchData from '../map/wfsToLayer'
import * as MapFunctions from '../map/mapFunctions';
import 'bootstrap/dist/css/bootstrap.min.css';
 

// create the slider bar on the right side 
sliderToggle();

// initiate the openlayer map 
const map = MapFunctions.MAP;
map.getLayers().on('add', a => layerList(a.element));
// add layers to the map
conf.layers.map((layer) => {
   // layer.layerData.set('name',layer.layerName)
MapFunctions.MapClass.LayerAdder(layer.layerData,layer.layerName,layer.layerId)

  //  map.addLayer(layer.layerData)
});
conf.requestLayers.map(fetchableLayer =>{
   const mapLayer= fetchData(fetchableLayer);
  //  mapLayer.set('name',fetchableLayer.layerName)
} )

// create interactions for the click and hover 
map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
  
    const pixel = map.getEventPixel(evt.originalEvent);
    MapFunctions.displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
    MapFunctions.changeColor(evt.pixel);
});


// show the location of the user on the map 
//MapFunctions.geolocateOnMap(map);



 // generate a GetFeature request

// // create the overlay element for user click
// const featureOverlay = MapFunctions.featureOverlayCreater(map);

// // create the overlay element for pointer click
// map.addOverlay(MapFunctions.popupOverlay);