$(document).ready(function(){

    $('a[href^="#"]').click(function() {
        var target = this.hash,
            $target = $(target);

        $('html, body').animate({
            scrollTop: $($target).offset().top
        }, 500, 'easeOutCirc');
    });

    function init() {
        window.addEventListener('scroll', function(e){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                shrinkOn = 150,
                header = document.querySelector("header");
            if (distanceY > shrinkOn) {
                $(header).addClass("smaller");
            } else {
                    $(header).removeClass("smaller");
            }
        });
    }
    window.onload = init();

});/**
 * Created by keneldridge on 6/4/16.
 */
