/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Vector from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/GeoJSON';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
export default {
    map: {
        target: 'map',
        center: [0, 0],
        zoom: 3
    }
    , layers: [{
        layerName: 'base layer',
        layerId: 'L01',
        layerData: new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        })
    }, {
        layerName: 'world population map',
        layerId: 'L02',
        layerData: new VectorLayer({
            source: new Vector({
                url: 'https://raw.githubusercontent.com/MinnPost/simple-map-d3/master/example-data/world-population.geo.json',
                format: new GeoJSON()
            })
        })
    }
    ],
    requestLayers: [
        {
            layerName: 'Population of US',
            layerId: 'L03', requestType: 'wfs', requestBody: {
                srsName: 'EPSG:3857',
                featureNS: "http://www.openplans.org/topp", //'http://geoserver.org/saveh' , //'http://openstreemap.org',
                featurePrefix: 'topp', //'test_saveh', //workspace
                version: "2.0.0",
                featureTypes: ['states'], //['nahie'],//['water_areas'],
                outputFormat: 'application/json'

            }, requestAddress: 'https://demo.boundlessgeo.com/geoserver/wfs'
        }
    ]
}
