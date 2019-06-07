// JavaScript Document
$(function() {
    setParallaxNoBar('.scroll-page');
    function setParallaxNoBar(selector) {
        var numPage = $(selector).length;
        var pagePrev = 0;
        var pageNow = 0;
        var pageNext = 0;
        var eventScroll = '';
        var onAnimation = false;
        var isWheelBlocked = false;
        var timerId = '';
    
        // 브라우저에 따른 이벤트 식별
        eventScroll = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';

        $('.scroll-page').each(function(i) {
            $('#page-indicator').append('<li><a href="#">' + (i + 1) + ' 페이지</a></li>\n');
            $(this).css({'top': (i * 100) + '%'});
        });
        showPage(1);
        
        // indicator event
        $('#page-indicator li a').on('click', function() {
            var index = $('#page-indicator li').index($(this).parent());
            showPage(index + 1);
        });

        // 마우스 휠
        window.addEventListener(eventScroll, function(e) {
            e.preventDefault();
            clearTimeout(timerId);
            timerId = setTimeout(function() {isWheelBlocked = false;}, 200);
            if (onAnimation === true || isWheelBlocked === true) return false;
            isWheelBlocked = true;

            var delta = 0;
            if (eventScroll === 'mousewheel') {
                delta = e.wheelDelta / -120;
            } else {
                delta = e.detail / 3;
            }
            if (delta > 0) {
                showPage(pageNext);
            } else {
                showPage(pagePrev);
            }
        }, {passive: false});

        // focusin 이벤트
        $('.scroll-page').on('focusin', function() {
            var index = $('.scroll-page').index($(this));
            showPage(index + 1);
        });
        
        function showPage(n) {
            if (pageNow === 0) {
                $('#main').css({'transition': 'none'});
            } else {
                $('#main').css({'transition': 'all 0.5s'});
            }
            $('#main').css({'top': -((n - 1) * 100) + '%'});
            $('#page-indicator li').removeClass('on');
            $('#page-indicator li:eq(' + (n - 1) + ')').addClass('on');
            pageNow = n;
            pagePrev = (n - 1) < 1 ? 1 : n - 1;
            pageNext = (n + 1) > numPage ? numPage : n + 1;
        }    
    } 
});

// gallery
$(function() {
    var numSlide = $('div.image-slide ul.slide li').length;
    var slideNow = 0;
    var slidePrev = 0;
    var slideNext = 0;

    showSlide(1);

    $('div.image-slide ul.indicator li a').on('click', function() {
        var index = $('div.image-slide ul.indicator li').index($(this).parent());
        showSlide(index + 1);
    });
    $('div.image-slide p.control a.prev').on('click', function() {
        showSlide(slidePrev);
    });
    $('div.image-slide p.control a.next').on('click', function() {
        showSlide(slideNext);
    });


    function showSlide(n) {
        $('div.image-slide ul.slide li').css({'display': 'none'});
        $('div.image-slide ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
        $('div.image-slide ul.indicator li').removeClass('on');
        $('div.image-slide ul.indicator li:eq(' + (n - 1) + ')').addClass('on');
        slideNow = n;
        slidePrev = (n - 1) < 1 ? numSlide : n - 1;
        slideNext = (n + 1) > numSlide ? 1 : n + 1;
        //console.log(slidePrev + ' / ' + slideNow + ' / ' + slideNext);
    } 
});