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
    , layers: [
        new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        }),
        new VectorLayer({
            source: new Vector({
                url: 'https://openlayers.org/en/v4.6.4/examples/data/geojson/countries.geojson',
                format: new GeoJSON()
            })
        })


    ]
}
