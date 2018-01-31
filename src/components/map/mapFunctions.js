/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Map from '../map/map';
import conf from '../map/map.config.js';

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



export const MapClass = new Map(conf.map)
export const MAP = MapClass.map

// create element to keep track of the clicked feature 
let Highlight;
// function to locate the user on map 
export const geolocateOnMap = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const coords = proj.fromLonLat([pos.coords.longitude, pos.coords.latitude]);
        MAP.getView().animate({ center: coords });
        const position = new Vector();
        const vector = new VectorLayer({
            source: position
            , name: 'my location',
            id: 'L04'
        });
        MAP.addLayer(vector);
   
        // add the marker on the map
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
       ($('#location-switch input').attr('id')!='undefined')? $('#location-switch input').attr('id','L04'):null;
     
    });
};

// class for creating a map style 
const createStyle = (styleObj) => {
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
const popupOverlayCreater = (map = MAP) => {
    const overlay = new Overlay({
        element: $('#info-dummy')[0],
        positioning: 'bottom-center',
        offset: [0, -10]
    });
    MAP.addOverlay(overlay);
    return overlay
}
// creates a layer overlay for the selected elements 
const featureOverlayCreater = (map = MAP) => {
    let highlightStyle = createStyle({
        fillColor: 'rgba(255, 255, 0,1)',
        strokeColor: '#f00',
        strokeWidth: 1,
        textColor: '#000',
        textStrokeColor: '#f00',
        textStrokeWidth: 3
    });

    return new VectorLayer({
        source: new Vector(),
        map: MAP,
        style: function (feature) {
            highlightStyle.getText().setText(feature.get('name'))
            return highlightStyle;
        }
    });
}
const overlays = { popupOverlay: popupOverlayCreater(), featureOverlay: featureOverlayCreater() }

// the function for changingthe clicked features color
export const changeColor = (pixel) => {
    const infobox = $('#information-box');
    let feature = MAP.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (feature !== Highlight) {
        if (Highlight) {
            overlays.featureOverlay.getSource().removeFeature(Highlight);
            infobox.text('');
            $('#detail-box').hide();
        }
        if (feature) {
            overlays.featureOverlay.getSource().addFeature(feature);
            infobox.text(feature.get('NAME'));

            $('#detail-box').show()

        }
        Highlight = feature;


    }

};

// the function for updating the tooltip
export const displayFeatureInfo = (pixel) => {
    const info = $('#info');
    overlays.popupOverlay.setPosition();
    var feature = MAP.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (feature) {
        info.css({
            left: (pixel[0] + 4) + 'px',
            top: (pixel[1] - 35) + 'px'

        });
        //  console.log(feature)
        info.text(feature.get('NAME'));
        if (feature.getGeometry().getType() === 'Point') {
            var coords = feature.getGeometry().getCoordinates();
            var hdms = coordinate.toStringHDMS(proj.toLonLat(coords));
            overlays.popupOverlay.getElement().innerHTML = hdms;
            overlays.popupOverlay.setPosition(coords);
        }

    } else {
        info.text('');

    }
};



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

export const getstyle = (feature) => {
    let x = feature.getProperties().MALE;
    // console.log(x)
    let style;
    if (x < 1000000)
        style = styleGenerator('#fef0d9', 'blue')
    if (x > 1000000 && x < 1500000)
        style = styleGenerator('#fdcc8a', 'blue')
    if (x > 1500000 && x < 2000000)
        style = styleGenerator('#fc8d59', 'gray')
    if (x > 2000000 && x < 2500000)
        style = styleGenerator('#e34a33', 'gray')
    if (x > 2500000)
        style = styleGenerator('#b30000', 'gray')

    return style
};
