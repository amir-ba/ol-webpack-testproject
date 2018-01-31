/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import { MAP , geolocateOnMap } from '../map/mapFunctions';

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

const setToggleSlider = () => {

    var windows = $(window).width();
    var sliderWidth = $("#module-container").width()
    if (windows > 600) {
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

const layerToggle = (el) => {
    const id = $(el.target).attr('id');
    MAP.getLayers().getArray().filter(function (layer) {
        if (layer.getProperties().id === id) layer.setVisible(!layer.getVisible())
    })

}
export const layerList = (layer) => {
    console.log(layer)
   if (layer.get('id') != 'L04') createCheckbox(layer)
}

function createCheckbox(layer) {
    const parent = $('#layers-box');
    const id = (layer.getProperties().id);
    const name = layer.getProperties().name;
    const header = "<ul></ul>";
    ($('#layers-box ul').length > 0) ? $('#layers-box ul') : $(header).appendTo(parent);
    let selection = $('#layers-box ul');
    const template = //`<li class='ui-menu-item'><input id=${id} type="checkbox" checked>${name}<li>` ;
  `<li><div class="custom-checkbox"  >
  <input type="checkbox" class="checkbox-input"  checked id=${id}   >
  <label class="checkbox-label" for=${id}>${name}</label>
</div></li>`
    const li = $(template)
        .click(layerToggle)
        .appendTo(selection);

}
$('#location-switch input').click(function(ev){
    //console.log   (($(ev.target).prop('checked') )) ;
    const LayerIdList = MAP.getLayers().getArray().map(layer=>layer.get('id'));
           (LayerIdList.indexOf('L04')<0)?  geolocateOnMap():layerToggle(ev);
})