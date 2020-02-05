
var Key = {

    _pressed: {},

    ESC: 27,
    ENTER: 13,
    BSPC: 8,
    SPC: 32,
    M: 77,

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },

    onKeydown: function(e) {
        e.preventDefault();
        this._pressed[e.keyCode] = true;
    },

    onKeyup: function(e) {
        delete this._pressed[e.keyCode];
    }

};



$('.preloader').css({
    'padding-top' : document.body.clientHeight / 4
}).animateCSS('fadeIn');


var container = $('#st-container');
var openMenu = $('#openMenu');
var submenu = $('.submenu');
var previousPage = '';
var currentPage = '';

var activePage = null;

var app;
var WEBAPP = window.WEBAPP = window.WEBAPP || {};

var logo = document.querySelector('.logo');

var currentState = '';

// qConfig obj for share text
var shareObj = {

    fb: {
        link: 'https://www.facebook.com/apppage/app_181966221983106',
        title: 'TITLE!',
        picture: 'http://www.siteurl.com/FACEBOOKAPPNAME/Content/img/300x300.png',
        desc: 'desc!'
    },

    tw: 'desc #campName http://bit.ly/campName'
};



//   _       ____________  ___    ____  ____     __  _________________  ______  ____  _____
//  | |     / / ____/ __ )/   |  / __ \/ __ \   /  |/  / ____/_  __/ / / / __ \/ __ \/ ___/
//  | | /| / / __/ / __  / /| | / /_/ / /_/ /  / /|_/ / __/   / / / /_/ / / / / / / /\__ \ 
//  | |/ |/ / /___/ /_/ / ___ |/ ____/ ____/  / /  / / /___  / / / __  / /_/ / /_/ /___/ / 
//  |__/|__/_____/_____/_/  |_/_/   /_/      /_/  /_/_____/ /_/ /_/ /_/\____/_____//____/  
//                                                                                      

WEBAPP = {

    settings: {

        menuopened: false,
        submenuOpened: false,
        subpage : false

    },

    init: function() {

        'use strict';

        var _this = this;

        _this.bindUIActions();
        _this.bindEvents();
        _this.bindKeyboardActions();

        $("#main").onepage_scroll({
            sectionContainer: "article",
            easing: "ease",
            animationTime: 1000,
            pagination: true,
            updateURL: true,
            beforeMove: function(index) {},
            afterMove: function(index) {
                activePage = $("#main article.active").data("index");
            },
            loop: false,
            responsiveFallback: false
        });

        $('#main').addClass('active');

        _this.enableArrow();

        currentPage = 'main';

        activePage = $("#main article.active").data("index");

        console.log(' WEBAPP initiated ☆ ');
    },

    enableArrow : function(){
        
        $('.pagescroller').fadeIn().on('click', function(){
            $("#main").moveTo(activePage + 1);
        });

        setTimeout(function () {
            $('.pagescroller').css({

                "-webkit-animation-duration" : "1s",
                "animation-duration" : "1s",
                "animation-iteration-count" : "3",
                "-webkit-animation-iteration-count" : "3"

            }).addClass('animated bounce');
        }, 2000);

    },

    disableArrow : function(){
        $('.pagescroller').fadeOut().off('click');
    },

    bindUIActions: function() {

        'use strict';

        var _this = this;


        $('.fb').on('click', function() {
            _this.fbTimelineShare(shareObj.fb);
        });


        $('.tw').on('click', function() {
            _this.twitterShare(shareObj.tw);
        });


        openMenu.on('click', function(e) {

            var data = $(this).data('effect');

            WEBAPP.fireEvent('menuOpened');

            //console.log('∆', " normal click");
        });


        submenu.on('click', function(e) {

            'use strict';

            var data = $(this).data('effect');

            if (e.target != this) {
                _this.closeSubMenu(data);
                submenu.removeClass('active');
            }

            $(this).addClass('active');

            _this.settings.submenuOpened = false;

            container.addClass(data);

        });

        $('nav .home').on('click', function(){
            $(".main").moveTo(1);
            WEBAPP.fireEvent('closeMenu', _this.closeMenu());
        });

        $('nav .contact').on('click', function(){
            $(".main").moveTo(5);
            WEBAPP.fireEvent('closeMenu', _this.closeMenu());
        });

        $(".st-menu.works a,.st-menu.games a").on('click', function(e){

            var data = $(this).data('page');

            if( $('.pagescroller').length > 0 ){
                _this.disableArrow();
            }
                
            if( $('.onepage-pagination').length > 0 ){
                $('.onepage-pagination').remove();
            }


            $(document).unbind('mousewheel DOMMouseScroll');
            
            $('.st-content').scrollTop(0).css({
                'overflow-y' : 'auto'
            });


            $(document).bind('mousewheel DOMMouseScroll', function(){

                /* Check the location of each desired element */
                $('.pagecont.active .frame').each( function(i){

                    var bottom_of_object = $(this).position().top + $(this).outerHeight();
                    var bottom_of_window = $(window).scrollTop() + $(window).height();

                    /* If the object is completely visible in the window, fade it it */
                    if( bottom_of_window > bottom_of_object / 2 ){
                        $(this).animate({'opacity':'1'},500);
                    }

                });

            });



            _this.settings.subpage = true;

            $('.st-content .pagecont').removeClass('fadeIn').removeClass('active').hide();

            var content = $('.st-content .pagecont#' + data + '');

            content.show().addClass('active').animateCSS('fadeIn');
            WEBAPP.fireEvent('closeMenu', _this.closeMenu());

        });

        $(".st-menu a.home,.st-menu a.contact").on('click', function(e){

            if(_this.settings.subpage){

                $('.st-content .pagecont').removeClass('fadeIn').scrollTop(0).removeClass('active').hide();

                $("#main").onepage_scroll({
                    sectionContainer: "article",
                    easing: "ease",
                    animationTime: 1000,
                    pagination: true,
                    updateURL: true,
                    beforeMove: function(index) {},
                    afterMove: function(index) {
                        activePage = $("#main article.active").data("index");
                    },
                    loop: false,
                    responsiveFallback: false
                });

                
                $('#main').addClass('fadeIn active').scrollTop(0).show();

                $('.st-content').css({
                    'overflow-y' : 'hidden'
                });

                _this.enableArrow();

                _this.settings.subpage = false;

            }

        });

        $('.contactme').on('click', function(){
            $("#main").moveTo(5);
        });



        $('.totop').on('click', function(){

            console.log('∆');

            $('html,body,.st-content').animate({ 
                scrollTop : 0
            }, 1000);
        });

    },

    bindEvents: function() {

        'use strict';

        var _this = this;

        WEBAPP.on('liked', function() {
            _this.likeState('liked');
        });

        WEBAPP.on('menuOpened', function() {
            _this.toggleMenu('leftIn');
        });

        WEBAPP.on('closeMenu', function() {
            _this.closeMenu();
        });

    },

    bindKeyboardActions: function() {

        'use strict';

        var _this = this;

        //console.log("∆†");
        $(window).on('keyup', function(event) {
            Key.onKeyup(event);
        });

        $(window).on('keydown', function(event) {

            Key.onKeydown(event);

            if (Key.isDown(Key.M)) WEBAPP.fireEvent('menuOpened');
            if (Key.isDown(Key.ESC)) WEBAPP.fireEvent('closeMenu');
            //if (Key.isDown(Key.ENTER)) console.log("ENTER");
            if (Key.isDown(Key.BSPC)) console.log("BSPC");
            if (Key.isDown(Key.SPC)) WEBAPP.fireEvent('menuOpened');

        });

    },

    toggleMenu: function(data) {

        'use strict';

        var _this = this;

        if (!_this.settings.menuopened) {
           _this.openLeftMenu(data);
        } else {
           WEBAPP.fireEvent('closeMenu');
        } 

    },

    openLeftMenu: function(data) {

        'use strict';

        var _this = this;

        container.addClass(data);
        _this.settings.menuopened = true;

        setTimeout(function() {
            container.addClass('st-menu-open');
        }, 100);

        _this.addOverlay();

    },

    closeMenu: function() {

        'use strict';

        var _this = this;

        container.removeClass('st-menu-open leftIn');
        _this.settings.menuopened = false;

        _this.removeOverlay();

        // RESET MENU
        //submenu.removeClass('active');

        // if(!_this.settings.submenuOpened) {
        //  _this.closeSubMenu();
        // }

    },

    addOverlay : function(){
        var overlay = $("<div/>").css({
            'height' : $('.st-content').height(),
            'width' : $('.st-content').width(),
            'position' : 'absolute',
            'left' : 0,
            'top' : 0,
            'width' : '100%',
            'height' : '100%',
            'z-index' : 2,
            'opacity' : 0,
            'background' : 'rgba(0,0,0,0.2)'
        }).addClass('coverlay animated');
        
        $('.st-content').before(overlay);
        overlay.addClass('fadeIn');

        $('.coverlay').on('click', function(){
            WEBAPP.fireEvent('closeMenu');
        });
    },

    removeOverlay : function(){
        $('.coverlay').removeClass('fadeIn').addClass('fadeOut');
        setTimeout(function(){
            $('.coverlay').remove();
        }, 100);
    },

    closeSubMenu: function(data) {

        'use strict';

        var _this = this;

        container.removeClass('games');
        container.removeClass('works');

        _this.settings.submenuOpened = false;

    },


    likeState: function(e) {

        'use strict';

        var _this = this;
        currentState = e;
        _this.moveCanvas();

        logo.style.marginTop = appstates.liked.logo + 'px';

    },


    twitterShare: function(tweet) {
        'use strict';
        window.open('//twitter.com/intent/tweet?text=' + encodeURIComponent(tweet), '(>_<)', 'width=500,height=350,resizable=1');
    },


    fbTimelineShare: function(inyourface) {

        'use strict';

        var obj = {
            method: 'feed',
            link: inyourface.link,
            picture: 'https://www.siteurl.com/FACEBOOKAPPNAME/img/300x300-large.jpg',
            name: inyourface.title,
            caption: '',
            description: inyourface.description
        };

        FB.ui(obj, function(response) {
            if (response) {
                console.log('∆ success');
            } else {
                console.log('∆ error');
            }
        });
    },

    getWidth: function() {
        'use strict';
        return window.innerWidth;
    },

    getHeight: function() {
        'use strict';
        return window.innerHeight;
    },

    updateDimensions: function(args) {

        'use strict';

        var _this = this;

        for (var i = 0; i < args.length; i++) {
            args[i].css({
                // 'width' : _this.getWidth(),
                // 'height' : _this.getHeight()
            });
        }

    }

};



//           __                                  
//    ____  / /_  ________  ______   _____  _____
//   / __ \/ __ \/ ___/ _ \/ ___/ | / / _ \/ ___/
//  / /_/ / /_/ (__  )  __/ /   | |/ /  __/ /    
//  \____/_.___/____/\___/_/    |___/\___/_/     
//

WEBAPP.Observer = {
    on: function(event, fn) {

        'use strict';

        if (!this.handlers) {
            this.handlers = {};
        }

        var handlers = this.handlers[event];
        if (!handlers) {
            handlers = this.handlers[event] = [];
        }
        handlers.push(fn);
    },

    un: function(event, fn) {

        'use strict';

        if (!this.handlers) {
            return;
        }

        var handlers = this.handlers[event];
        if (handlers) {
            if (fn) {
                for (var i = handlers.length - 1; i >= 0; i--) {
                    if (handlers[i] === fn) {
                        handlers.splice(i, 1);
                    }
                }
            } else {
                handlers.length = 0;
            }
        }
    },

    once: function(event, handler) {

        'use strict';

        var fn = (function() {
            handler();
            this.un(event, fn);
        }).bind(this);

        this.on(event, fn);
    },

    fireEvent: function(event) {

        'use strict';

        if (!this.handlers) {
            return;
        }

        var handlers = this.handlers[event];
        var args = Array.prototype.slice.call(arguments, 1);
        if (handlers) {
            for (var i = 0, len = handlers.length; i < len; i += 1) {
                handlers[i].apply(null, args);
            }
        }
    }
};



//           __  _ __
//    __  __/ /_(_) /
//   / / / / __/ / / 
//  / /_/ / /_/ / /  
//  \__,_/\__/_/_/   
//                   

WEBAPP.util = {
    extend: function(dest) {

        'use strict';

        var sources = Array.prototype.slice.call(arguments, 1);
        sources.forEach(function(source) {
            if (source !== null) {
                Object.keys(source).forEach(function(key) {
                    dest[key] = source[key];
                });
            }
        });

        return dest;
    }
};


WEBAPP.util.extend(WEBAPP, WEBAPP.Observer);




// (~_~;)
// ( ͡° ͜ʖ ͡°)
// ಠ_ಠ  
// (>_<) 
// （´ー｀）
// ☆


//      __  ______    _____   __
//     /  |/  /   |  /  _/ | / /
//    / /|_/ / /| |  / //  |/ / 
//   / /  / / ___ |_/ // /|  /  
//  /_/  /_/_/  |_/___/_/ |_/   
//

// debug ready function
$(document).ready(function() {

    'use strict';

    // initializes the app with IIFE
    (function($, window, document, undefined) {

        //debug
        console.log(' you are inside : IIFE ( ͡° ͜ʖ ͡°) ');

        // Create an instance
        app = Object.create(WEBAPP);

        app.init();

        $('#st-container').animateCSS('fadeIn', function(){
          //console.log("??????");
          $('.idcard .profilepic').animateCSS('flipInX', function(){
            //console.log("∆∆∆∆∆");
              $('.idcard p.name').animateCSS('flipInX', function(){
                //console.log("®®®®®");
                $('.idcard p.rank').animateCSS('flipInX', function(){
                  //console.log("∑∑∑∑∑");
                  $('.idcard p.keyb').animateCSS('flipInX', function(){
                    //console.log("¬¬¬¬¬");
                  });
                });
              });
          });
        });

    }(jQuery, window, document));

    // debug
    // console.log(' you are inside : document.ready() ( ͡° ͜ʖ ͡°) ');
});



/*
                                   _        _____ ___________ _____ 
                                  | |      |_   _|_   _|  ___|  ___|
          ___ ___  _ __  ___  ___ | | ___    | |   | | | |_  | |__  
         / __/ _ \| '_ \/ __|/ _ \| |/ _ \   | |   | | |  _| |  __| 
        | (_| (_) | | | \__ \ (_) | |  __/  _| |_ _| |_| |   | |___ 
         \___\___/|_| |_|___/\___/|_|\___|  \___/ \___/\_|   \____/ 
    */


(function() {
    'use strict';

    var method;
    var noop = function() {};

    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];

    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// requestAnim shim layer by Paul Irish
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());




var csstransform = getsupportedprop(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);

function getsupportedprop(proparray) {
    var root = document.documentElement; //reference root element of document

    for (var i = 0; i < proparray.length; i++) { //loop through possible properties
        if (proparray[i] in root.style) { //if property exists on element (value will be string, empty string if not set)
            return proparray[i] //return that string
        }
    }
}





