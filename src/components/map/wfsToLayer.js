
import {getstyle, MAP,MapClass} from './mapFunctions';

 import WFS from 'ol/format/wfs';
import GeoJSON from 'ol/format/GeoJSON';
import loadingstrategy from 'ol/loadingstrategy';
import Vector from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';


const CreateLayerFromJson = (json,requestData) => {
    const features = new GeoJSON().readFeatures(json);
    const vectorSource = new Vector();
    vectorSource.addFeatures(features);
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        strategy: loadingstrategy.bbox,
        style: getstyle
    });
    MAP.getView().fit(vectorSource.getExtent());
    MapClass.LayerAdder(vectorLayer,requestData.layerName,requestData.layerId)
}

export default (requestData) => {
    const featureRequest = new WFS().writeGetFeature(requestData.requestBody);
    fetch(requestData.requestAddress, {
        method: 'POST',
        body: new XMLSerializer().serializeToString(featureRequest)
    }).then(response => response.json()).then(response=>CreateLayerFromJson(response,requestData))
}

