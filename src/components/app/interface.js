/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { MAP, geolocateOnMap, getPointsCoord } from '../map/mapFunctions';



// creates the slider elements 
const setToggleSlider = () => {

    var windows = $(window).width();
    var sliderWidth = $("#module-container").width()
    if (windows) {
        if ($("#module-container").css('display') != "block") {
            $("#menu-slider") // Set the left to its calculated position
                .animate({
                    "left": sliderWidth
                }, "fast");
        } else {
            $("#menu-slider") // Set the left to its calculated position
                .animate({
                    "left": "16px"
                }, "fast");
        }
    }

};

//set the sliding effect 
const layerToggle = (el) => {
    const id = $(el.target).attr('id');
    MAP.getLayers().getArray().filter(function (layer) {
        if (layer.getProperties().id === id) layer.setVisible(!layer.getVisible())
    })

};

const createCheckbox = (layer) => {
    const parent = $('#layers-box');
    const id = (layer.getProperties().id);
    const name = layer.getProperties().name;
    const header = "<ul></ul>";
    ($('#layers-box ul').length > 0) ? $('#layers-box ul') : $(header).appendTo(parent);
    let selection = $('#layers-box ul');
    const template = `<li><div class="custom-checkbox"  >
  <input type="checkbox" class="checkbox-input"  checked id=${id}>
  <label class="checkbox-label" for=${id}>${name}</label>
    </div></li>`
    const li = $(template)
        .click(layerToggle)
        .appendTo(selection);

}

// creates the sliding leftbar  eventlistners
export const sliderToggle = () => {
    $("#menu-slider").css({
        left: $("#module-container").width()
    })
    $("#menu-slider").unbind('click')
        .click(function (d) {
            $("#module-container").animate({
                width: 'toggle'
            }, {
                    duration: 250,
                    complete: setToggleSlider()
                });
            $("#menu-slider div").toggleClass("off");
        });
};

// layers checkbox creater 
export const layerList = (layer) => {
    if (layer.get('id') != 'L04') createCheckbox(layer);
};
//create the event listner for the locater radio button 
export const switchToggleListner = () => {
    $('#location-switch input').click(function (ev) {
        //console.log   (($(ev.target).prop('checked') )) ;
        const LayerIdList = MAP.getLayers().getArray().map(layer => layer.get('id'));
        (LayerIdList.indexOf('L04') < 0) ? geolocateOnMap() : layerToggle(ev);
    });
}

// create the attributes from map features 
export const setAttrToHtmlElement = (feature, element, layer) => {
    const Allfields = {
        NAME: 'Country Name', STATE_NAME: 'State Name',
        PERSONS: 'Population', MALE: 'Males', POP2005: 'Population', FEMALE: 'Female'
    }
    const point = getPointsCoord(feature);
    if (!point) $(`<p class='fields-header'">${layer.get('name')}</p>`).appendTo(element);
    const fields = Object.keys(feature.getProperties()).filter(prop => Object.keys(Allfields).indexOf(prop) > -1);
    fields.map(prop => $(`<p>${Allfields[prop]}: ${feature.get(prop)}</p>`).appendTo(element));
    $('#notifier').hide();

}
// clear the atrribute list
export const clearAttrFromElement = (element) => {
    $(element).empty();
    $('#notifier').show();

}
