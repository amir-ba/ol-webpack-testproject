/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import Vector from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import IconStyle from 'ol/style/icon';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Text from 'ol/style/text';
import proj from 'ol/proj';
import coordinate from 'ol/coordinate';
import Overlay from 'ol/overlay';

// create element to keep track of the clicked feature 
let Highlight;
// function to locate the user on map 
export const geolocateOnMap = (map) => {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const coords = proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]);
        map.getView().animate({center: coords});

        const position = new Vector();
        const vector = new VectorLayer({
            source: position
        });
        map.addLayer(vector);

        // inserindo um ponto com marker
        position.addFeature(new Feature(new Point(coords)));

        vector.setStyle(new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({
                    color: 'red'
                })
            })
//                new IconStyle({
//            src: './marker.png'
//        })
        }));
    });
};

// class for creating a map style 
const createStyle = (styleObj) =>{
    return new Style({
        fill: new Fill({
            color: styleObj.fillColor //'rgba(255, 255, 0,1)'
        }),
        stroke: new Stroke({
            color: styleObj.strokeColor, // '#f00',
            width: styleObj.strokeWidth
        }),
        text: new Text({
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: styleObj.textColor //'#000'
            }),
            stroke: new Stroke({
                color: styleObj.textStrokeColor, // '#f00',
                width: styleObj.textStrokeWidth //3
            })
        })


    });
}

;

// creates a popup bubble as an overlay for the point 
export const popupOverlay = new Overlay({
    element: $('#info-dummy')[0],
    positioning: 'bottom-center',
    offset: [0, -10]
});
// creates a layer overlay for the selected elements 
export const featureOverlayCreater = (map) => {
    let highlightStyle = createStyle({
        fillColor: 'rgba(255, 255, 0,1)',
        strokeColor: '#f00',
        strokeWidth: 1,
        textColor: '#000',
        textStrokeColor: '#f00',
        textStrokeWidth: 3
    });

    return  new VectorLayer({
        source: new Vector(),
        map: map,
        style: function (feature) {
            highlightStyle.getText().setText(feature.get('name'))
            return highlightStyle;
        }
    });
}

// the function for changingthe clicked features color
export const changeColor = (pixel, map, featureOverlay) => {
    const infobox = $('#information-box');
    let feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        console.log(feature)
        return feature;
    });
    if (feature !== Highlight) {
        if (Highlight) {
            featureOverlay.getSource().removeFeature(Highlight);
            infobox.text('');
        }
        if (feature) {
            featureOverlay.getSource().addFeature(feature);
            infobox.text(feature.get('name'));


        }
        Highlight = feature;


    }

};

// the function for updating the tooltip
export const  displayFeatureInfo = (pixel, map, popupOverlay) => {
    const info = $('#info');
    popupOverlay.setPosition();
    var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (feature) {
        info.css({
            left: (pixel[0] + 4) + 'px',
            top: (pixel[1] - 35) + 'px'

        });
        info.text(feature.get('name'));
        if (feature.getGeometry().getType() === 'Point') {
            var coords = feature.getGeometry().getCoordinates();
            var hdms = coordinate.toStringHDMS(proj.toLonLat(coords));
            popupOverlay.getElement().innerHTML = hdms;
            popupOverlay.setPosition(coords);
        }

    } else {
        info.text('');
    }
};
