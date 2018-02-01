/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import Map from './map';
import conf from './map.config.js';
import { setAttrToHtmlElement, clearAttrFromElement } from '../app/interface'
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
import interaction from 'ol/interaction'
import Select from 'ol/interaction/select'
import conditions from 'ol/events/condition'
import events from 'ol/events/'


//generates the map element
export const MapClass = new Map(conf.map)
export const MAP = MapClass.map


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

//check if feature is a point type 
const checkFeaturePoint = (feature) => {
    return (feature.getGeometry().getType() === 'Point') ? true : false;
}

// generate a mapcolor style instance based on the fill and stroke color
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

// class for creating a map style with an obj attribute of fill, color,stroke
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
};
 //on click ineraction 
export const clickInteraction = new Select({
    condition: conditions.click,
    style: createStyle({
        fillColor: 'rgba(255, 255, 0,1)',
        strokeColor: '#f00',
        strokeWidth: 1,
        textColor: '#000',
        textStrokeColor: '#f00',
        textStrokeWidth: 3
    })

});
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
        ($('#location-switch input').attr('id') != 'undefined') ? $('#location-switch input').attr('id', 'L04') : null;

    });
};
// creates an array from the points oordinates
export const getPointsCoord = (feature) => {
    if (checkFeaturePoint(feature)) {
        const coords = feature.getGeometry().getCoordinates();
        const hdms = (proj.toLonLat(coords));
        const newHdms=  hdms.map(x=>x.toFixed(2))
      return {coords:coords,projected:newHdms}
        ;
    }
    return null;
}
const setPointOverlay =(feature,element,overlayLayer)=>{
    if (checkFeaturePoint(feature)){
    const coordVal=  getPointsCoord(feature);
    overlayLayer.setPosition(coordVal.coords);
    $(element).popover({
        'placement': 'top',
        'animation': false,
        'html': true
        , 'content': `<p>Your location :</p><code> ${coordVal.projected}'</code>`
    });
    $(element).popover('show');
}
}
// creates a style based on the attribute
export const getstyle = (feature) => {
    let x = feature.getProperties().PERSONS;
    // console.log(x)
    let style;
    if (x < 1000000)
        style = styleGenerator('#fef0d9', 'gray')
    if (x > 1000000 && x < 1500000)
        style = styleGenerator('#fdcc8a', 'gray')
    if (x > 1500000 && x < 2000000)
        style = styleGenerator('#fc8d59', 'gray')
    if (x > 2000000 && x < 2500000)
        style = styleGenerator('#e34a33', 'gray')
    if (x > 2500000)
        style = styleGenerator('#b30000', 'gray')

    return style
};

// the function for selecting features on click
export const displayAttributes= (pixel) => {
    const infobox = $('#information-box');
   // overlays.popupOverlay.setPosition();
   const popupOverlay= popupOverlayCreater()
    const element = popupOverlay.getElement()
    const feature = pixel.selected[0];
 
    if (feature) {
        clearAttrFromElement(infobox);
        $(element).popover('hide');
        const layer = pixel.target.getLayer(pixel.selected[0]);
        setAttrToHtmlElement(feature, infobox, layer);
           setPointOverlay (feature,element,popupOverlay);
    }else{
        clearAttrFromElement(infobox);
        $(element).popover('hide');
    }

};


// the function for updating the tooltip
export const displayTooltipInfo = (pixel) => {
    const info = $('#info');

    var feature = MAP.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
    });
    if (feature) {
        info.css({
            left: (pixel[0] + 4) + 'px',
            top: (pixel[1] - 38) + 'px'

        });
        //  console.log(feature)
        info.text(feature.get('NAME'));
        info.show()
        if (checkFeaturePoint(feature)) info.hide();

    } else {
        info.text('');
        info.hide()
    }
};


// creates a layer overlay for the selected elements 
// const featureOverlayCreater = (map = MAP) => {
//     let highlightStyle = createStyle({
//         fillColor: 'rgba(255, 255, 0,1)',
//         strokeColor: '#f00',
//         strokeWidth: 1,
//         textColor: '#000',
//         textStrokeColor: '#f00',
//         textStrokeWidth: 3
//     });

//     return new VectorLayer({
//         source: new Vector(),
//         map: MAP,
//         style: function (feature) {
//             highlightStyle.getText().setText(feature.get('name'))
//             return highlightStyle;
//         }
//     });
// }