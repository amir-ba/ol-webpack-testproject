/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



export  const sliderToggle = () => {
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
