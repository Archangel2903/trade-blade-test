import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'jquery-ui/ui/widgets/selectmenu';
import '../img/chevrone-down.svg';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';

$(window).on('load', function () {
    let b = $('body');
    let pw = $('.preload-wrapper');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    pw.fadeOut(300);
});

$(function () {
    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                // loop: true,
                autoplay: true,
                spaceBetween: 20,
                slidesPerView: "auto",
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev'
                // },
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true
                // },
                scrollbar: {
                    el: $('.swiper-scrollbar'),
                },
                dynamicBullets: true,
            });
        }
    }

    // JQuery UI
    $("#tabs").tabs({
        active: 0,
    });
    $(".select-js").selectmenu({
        icons: { button: 'ui-icon-caret-1-s' }
    });

    // FAQ
    (function () {
        let faq = $('.faq__item');
        if (faq.length) {
            $('.faq__item-head').on('click', function () {
                $(this).parent().toggleClass('active');
                $(this).next().stop().slideToggle(300);
            });
        }
    })();

    // Menu switch
    (function () {
        $('.header-navigation-opened').on('click', function() {
            $(this).prev().addClass('open');
        });

        $('.header-navigation-closed').on('click', function() {
            $(this).parent().removeClass('open');
        });
    })();

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});