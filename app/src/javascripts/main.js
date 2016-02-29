window.onload = function () {
    // load dependencies
    var $ = jQuery = require('jquery');
    var Swiper = require('../../../node_modules/swiper/dist/js/swiper.jquery.js');
    var animationControl = require('./animation-control.js');
    
    var bgMusic = $('audio').get(0);
    var $btnMusic = $('.btn-music');
    var $btnSwipe = $('.btn-swipe');

    // background music control
    $('.btn-music').click(function () {
        if (bgMusic.paused) {
            bgMusic.play();
            $(this).removeClass('paused');
        } else {
            bgMusic.pause();
            $(this).addClass('paused');
        }
    });

    // init Swiper
    new Swiper('.swiper-container', {
        effect: 'coverflow',    // fade, coverflow or flip
        speed: 400,
        direction: 'vertical',
        onInit: function (swiper) {
            animationControl.initAnimationItems();  // get items ready for animations
            animationControl.playAnimation(swiper); // play animations of the first slide
        },
        onSlideChangeStart: function (swiper) {     // on the last slide, hide .btn-swipe
            if (swiper.activeIndex === swiper.slides.length - 1) {
                $btnSwipe.hide();
            } else {
                $btnSwipe.show();
            }
        },
        onSlideChangeEnd: function (swiper) {       // play animations of the current slide
            animationControl.playAnimation(swiper);
        },
        onTouchStart: function (swiper, event) {    // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
            if (!$btnMusic.hasClass('paused') && bgMusic.paused) {
                bgMusic.play();
            }
        }
    });

    // hide loading animation since everything is ready
    $('.loading-overlay').slideUp();
};
