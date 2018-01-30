///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
import '../../styles/map-style.css';
import 'jquery';
import conf from '../map/map.config.js';
import Map from '../map/map';
import {sliderToggle}
from './interface';
import * as MapFunctions from '../map/mapFunctions';
import Filter from 'ol/format/filter';
import Vector from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';


import WFS from 'ol/format/wfs';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import GeoJSON from 'ol/format/GeoJSON';
import loadingstrategy from 'ol/loadingstrategy'

        import Fill from 'ol/style/fill';


// initiate the openlayer map 
const initialMap = new Map(conf.map);
initialMap.init();
const map = initialMap.map;

// add layers to the map
conf.layers.map((layer) => map.addLayer(layer));

// create the overlay element for user click
const featureOverlay = MapFunctions.featureOverlayCreater(map);

// create the overlay element for pointer click
map.addOverlay(MapFunctions.popupOverlay);

// show the location of the user on the map 
//MapFunctions.geolocateOnMap(map);

// create the slider bar on the right side 
sliderToggle();

map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    MapFunctions.displayFeatureInfo(pixel, map, MapFunctions.popupOverlay);
});

map.on('click', function (evt) {
    MapFunctions.changeColor(evt.pixel, map, featureOverlay);
});




const styleGenerator = (fillColor, strokeColor) => {
    return new Style({
        stroke: new Stroke({
            color: strokeColor
        }),
        fill: new Fill({
            color: fillColor
        })
    })
}

const getstyle = (feature) => {
    let x = feature.getProperties().MALE;
   // console.log(x)
    let style;
    if (x < 1000000)
        style = styleGenerator('yellow', 'blue')
    if (x > 1000000 && x < 1500000)
        style = styleGenerator('red', 'blue')
    if (x > 1500000 && x < 2000000)
        style = styleGenerator('green', 'gray')
    if (x > 2000000 && x < 2500000)
        style = styleGenerator('blue', 'gray')
    if (x > 2500000 )
        style = styleGenerator('purple', 'gray')

    return style
};



var vectorSource = new Vector();
var vector = new VectorLayer({
    name:'wfs',
    source: vectorSource,
    strategy: loadingstrategy.bbox
    ,
    style: getstyle
//            new Style({
//        stroke: new Stroke({
//            color: 'rgba(0,255, 255, 1.0)',
//            width: 2
//        })
//    })
});

map.addLayer(vector)

console.log(map.getLayers().getArray())
// generate a GetFeature request
var featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:3857',
    featureNS: 'http://www.openplans.org/topp', //'http://geoserver.org/saveh' , //'http://openstreemap.org',
    featurePrefix: 'topp', //'test_saveh', //workspace
    version: "2.0.0",
    featureTypes: ['states'], //['nahie'],//['water_areas'],
    outputFormat: 'application/json'
//     ,   filter: Filter.and(
//            Filter.like('name', 'Mississippi*'),
//           Filter.equalTo('waterway', 'riverbank')
//        )
});
// then post the request and add the received features to a layer
fetch('http://localhost:8000/geoserver/topp/ows', {
    method: 'POST',
    body: new XMLSerializer().serializeToString(featureRequest)
}).then(function (response) {
    console.log(response);
    return response.json();
}).then(function (json) {
    var features = new GeoJSON().readFeatures(json);
    vectorSource.addFeatures(features);
    map.getView().fit(vectorSource.getExtent());
})
        ;

