///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap'
import '../../styles/map-style.css';
import 'jquery';
import { sliderToggle, layerList, switchToggleListner } from './interface';
import conf from '../map/map.config.js';
import fetchData from '../map/wfsToLayer'
import * as MapFunctions from '../map/mapFunctions';


// create the slider bar on the right side 
sliderToggle();
switchToggleListner();

// get the created and watch for change in the layers array to create a list of layers to show on addition 
const map = MapFunctions.MAP;
map.getLayers().on('add', a => layerList(a.element));

// add layers to the map
conf.layers.map((layer) => MapFunctions.MapClass.LayerAdder(layer.layerData, layer.layerName, layer.layerId));
conf.requestLayers.map(fetchableLayer => fetchData(fetchableLayer));

//create a hover event and translate the pixel into feature  
map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    MapFunctions.displayTooltipInfo(pixel);
});


// add a interaction to map 
map.addInteraction(MapFunctions.clickInteraction);
MapFunctions.clickInteraction.on('select', MapFunctions.displayAttributes);

