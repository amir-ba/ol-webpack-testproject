/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import 'ol/ol.css';
import OLMap from 'ol/map';
import View from 'ol/view';


class Map {
  constructor(conf) {
    this.conf = conf
  }

  get map() {
    this._map=this.createMap()
    return  this._map
  }
  createMap() {
    return new OLMap({
      target: this.conf.target,
      layers: [],
      view: new View({
        center: this.conf.center,
        zoom: this.conf.zoom
      })
    })
  }
  LayerAdder(layer,name,id){
     layer.set('name',name)
    layer.set('id',id)

    this._map.addLayer(layer);


  }

}

export default Map;
