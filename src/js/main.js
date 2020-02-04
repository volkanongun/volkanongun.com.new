
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


var imageMap = [
    
    'images/projects/indie/1.png',
    'images/projects/indie/2.png',

    'images/projects/melo/1.png',
    'images/projects/melo/2.png',
    'images/projects/melo/3.png',

    'images/projects/akbank/1.jpg',
    'images/projects/akbank/2.jpg',
    'images/projects/akbank/3.jpg',

    'images/projects/loreal/skin/1.png',
    'images/projects/loreal/skin/2.png',
    'images/projects/loreal/skin/3.png',
    'images/projects/loreal/skin/4.png',

    'images/projects/koding/activity.png',
    'images/projects/koding/codeview.png',
    'images/projects/koding/invites.png',
    'images/projects/koding/members.png',
    'images/projects/koding/settings.png',

    'images/projects/kinder/1.png',
    'images/projects/kinder/2.png',
    'images/projects/kinder/3.png',
    'images/projects/kinder/4.png',
    'images/projects/kinder/5.png',
    'images/projects/kinder/6.png',

    'images/projects/istinyepark/1.png',
    'images/projects/istinyepark/2.png',
    'images/projects/istinyepark/3.png',

    'images/projects/nescafe/1.png',
    'images/projects/nescafe/2.png',
    'images/projects/nescafe/3.png',
    'images/projects/nescafe/4.jpg',

    'images/projects/macfit/ipad/1.png',
    'images/projects/macfit/ipad/2.png',
    'images/projects/macfit/ipad/3.png',

    'images/projects/macfit/iphone/1.png',
    'images/projects/macfit/iphone/2.png',

    'images/projects/macfit/web/1.png',
    'images/projects/macfit/web/2.png',
    'images/projects/macfit/web/3.png',
    'images/projects/macfit/web/4.png',

    'images/projects/waveofdemocracy/1.png',
    'images/projects/waveofdemocracy/2.png',
    'images/projects/waveofdemocracy/3.png',

    'images/projects/factorytrouble/factorytrouble1.png',
    'images/projects/factorytrouble/factorytrouble2.png',
    'images/projects/factorytrouble/factorytrouble3.png'
];

$('.preloader').css({
    'padding-top' : document.body.clientHeight / 4
}).animateCSS('fadeIn');

var loader = {
    loaded: true,
    loadedCount: 0, // Assets that have been loaded so far
    totalCount: 0, // Total number of assets that need to be loaded
    percentage : 0,

    loadImage: function(url) {
        this.totalCount++;
        this.loaded = false;
        var image = new Image();
        image.src = url;
        $(image).load(loader.itemLoaded);
        return image;
    },

    printimages : function(percentage){
        $('#percentage').html(percentage);
    },

    itemLoaded: function() {
        loader.loadedCount++;

        //$('#loadingmessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);
        //console.log('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);

        loader.percentage = (loader.loadedCount * 100 / imageMap.length).toFixed(0);
        loader.printimages(loader.percentage);

        if (loader.loadedCount === loader.totalCount) {
            loader.loaded = true;

            $('.preloader').removeClass('fadeIn').animateCSS('fadeOut', function(){
                $(this).remove();
                console.log("faded out");
            });

            $(document).trigger('preload:complete');
        }
    }
}


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

for(var i=0; i < imageMap.length; i++){
    var imege = loader.loadImage(imageMap[i]);
}

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



Detector = {

  canvas: !! window.CanvasRenderingContext2D,
  webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
  workers: !! window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,

  getWebGLErrorMessage: function () {
  
    var element = document.createElement( 'div' );
    element.id = 'webgl-error-message';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';
    element.style.display = 'none';
  
    if ( ! this.webgl ) {
  
      element.innerHTML = window.WebGLRenderingContext ? [
        'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' ) : [
        'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
        'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
      ].join( '\n' );
  
    }
  
    return element;
  
  },
  
  addGetWebGLMessage: function ( parameters ) {
  
    var parent, id, element;
  
    parameters = parameters || {};
  
    parent = parameters.parent !== undefined ? parameters.parent : document.body;
    id = parameters.id !== undefined ? parameters.id : 'oldie';
  
    element = Detector.getWebGLErrorMessage();
    element.id = id;
  
    parent.appendChild( element );
  
  }

};













// bg webgl ocean wave was so awesome so i borrowed it from here.
// http://thecarpandtheseagull.thecreatorsproject.com/


var renderer;
var splashScene;

var camera;
var camTarget;

var oceanMeshMaterial;
var oceanUniforms;
var oceanMaterial;

var ocean;
var oceanPlane;
var oceanWidth = 3000 *3;
var oceanLength = 3000 *3;
var oceanDivisions = 30 *3;

var threecontainer;
var background;

var splashClock;

var opVertPos, opVerts;
var opColVertPos, opColVerts;

var waveHeightA = 265;
var waveSpeedA = 7.1;
var waveOffsetA = 1.28;

var waveHeightB = 0.001;
var waveSpeedB = 2.96;
var waveOffsetB = 2.3;

var aa_target = new THREE.Scene();

var wavesPlaying = false;

var aa_available = true;

var composer;

var datgui = new dat.GUI();

datgui.options = {
    closed: true,
  camera: {
    speed: 0.0001
  },
  ocean:{
    scale:{
        x: 3000 *3,
        y: 3000 *3,
        z: 30 *3
    }
  },
  reset: function() {
    camera.position.x = -338;
    camera.position.y = 48;
    camera.position.z = 4000;

    ocean.scale.x = 9000;
    ocean.scale.y = 9000;
    ocean.scale.z = 90;
  }
};



function generateTexture() {

    var size = 512;

    // create canvas
    canvas = document.createElement( 'canvas' );
    canvas.width = size;
    canvas.height = size;

    // get context
    var context = canvas.getContext( '2d' );

    // draw gradient
    context.rect( 0, 0, size, size );
    var gradient = context.createLinearGradient( 0, 0, size, size );
    gradient.addColorStop(0, '#ff0000'); // red
    gradient.addColorStop(1, 'transparent'); // dark blue
    context.fillStyle = gradient;
    context.fill();

    return canvas;

}


function start()
{
  
  if ( ! Detector.webgl ) {
    Detector.addGetWebGLMessage();
  }

  //
  threecontainer = document.createElement( 'div' );
  document.body.appendChild( threecontainer );
  threecontainer.setAttribute("id", "vertexOcean");
  
  renderer = new THREE.WebGLRenderer({
    antialias: true, 
    alpha: true 
  });

  //aa_test();

  renderer.setSize(window.innerWidth, window.innerHeight);  
  threecontainer.appendChild(renderer.domElement);

  splashScene = new THREE.Scene();
  splashScene.dynamic = true;

  // image
    var texture = new THREE.Texture( generateTexture() );
    textureImage = texture.image

    // material texture
    var texture = new THREE.Texture( generateTexture() );
    texture.needsUpdate = true; // important!

  oceanMeshMaterial = new THREE.MeshBasicMaterial( { color: 0x253a59, map: texture, wireframe: true, transparent: true, opacity: 0.1 } );
  //blackMaterial = new THREE.MeshBasicMaterial( { color: 0x111111, wireframe: false, transparent: false, opacity: 1.0 } );
  backgroundMat = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false, transparent: true, opacity: 0.0 } );

  oceanUniforms = {
    u_color : { type: "c", value: new THREE.Color( 0x383a49 ) }
  };
  
  oceanPlane = new THREE.PlaneGeometry(oceanWidth, oceanLength, oceanDivisions, oceanDivisions);
  oceanPlane.doubleSided = true;
  oceanPlane.dynamic = true;
  oceanPlane.computeFaceNormals();
  oceanPlane.computeVertexNormals();

  ocean = new THREE.Mesh(oceanPlane, oceanMeshMaterial);
  ocean.name = name +"_ocean";
  ocean.rotation.x = Math.PI/2;
  ocean.doubleSided = true;
  
  splashScene.add(ocean);

  /*
            ________          __                                                    
      ___  / __/ __/__  _____/ /_   _________  ____ ___  ____  ____  ________  _____
     / _ \/ /_/ /_/ _ \/ ___/ __/  / ___/ __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
    /  __/ __/ __/  __/ /__/ /_   / /__/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /    
    \___/_/ /_/  \___/\___/\__/   \___/\____/_/ /_/ /_/ .___/\____/____/\___/_/     
                                                     /_/                            
  */
  
  ////////////////////////////////////////////////////////////////////////
  
  loadCamera();
  
  renderer.clear();

  composer = new THREE.EffectComposer( renderer );
  composer.addPass( new THREE.RenderPass( splashScene, camera ) );
  
  var shaderVignette = THREE.VignetteShader;

  var effectVignette = new THREE.ShaderPass( shaderVignette );
  // larger values = darker closer to center
  // darkness < 1  => lighter edges
  effectVignette.uniforms[ "offset" ].value = 1.5;
  effectVignette.uniforms[ "darkness" ].value = 1.6;
  effectVignette.renderToScreen = true;
  composer.addPass(effectVignette);
  shaderActive = "vignette";

  splashClock = new THREE.Clock();
  splashClock.start();
  waveTime = 0;

  wavesPlaying = true;

    var cam = datgui.addFolder('Camera');
    cam.add(camera.position, 'x', -338, 1).listen();
    cam.add(camera.position, 'y', 0, 48).listen();
    cam.add(camera.position, 'z', 0, 4000).listen();

    var oceanic = datgui.addFolder('OceanPlane');
    oceanic.add(ocean.scale, 'z', 0, 90).name('Length').listen();

    datgui.add(datgui.options, 'reset');

  animate();
}


function loadCamera() {

  camTarget = new THREE.Mesh(new THREE.Geometry(), backgroundMat);  
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

  camera.position.x = -338;
  camera.position.y = 48;
  camera.position.z = 4000;

  camera.rotation.x = 0;
  camera.rotation.y = 0;
  camera.rotation.z = 0;

  camTarget.position.x = 500;
  camTarget.position.y = -467;
  camTarget.position.z = 0

  camera.lookAt(camTarget.position);

  splashScene.add(camera);
}



function animate() {

  if(wavesPlaying){

    if(splashClock != undefined){
      var t = splashClock.getElapsedTime();
      
      waves(waveTime * 0.03);
      
      renderer.clear();
      renderer.render( splashScene, camera );
    
      waveTime++;
      window.requestAnimationFrame(animate, renderer.domElement);
    }
  }
  
}


function waves(t) {

  //big waves
  opVerts = oceanPlane.vertices;

  
  var len = opVerts.length;
  for ( var i = 0; i < len; i ++ )
  {
    opVerts[i].z = this.waveA(opVerts[i].x, opVerts[i].y, t );  
  }
  

  var waveVar;
  var colorWave;
  
  //small waves
  for ( var j = 0, l = this.oceanPlane.vertices.length; j < l; j ++ ) {   
    oceanPlane.vertices[ j ].z = oceanPlane.vertices[ j ].z + waveB(this.oceanPlane.vertices[j].x, oceanPlane.vertices[j].z, t);
  }

  ocean.geometry.__dirtyVertices = true;
  ocean.geometry.verticesNeedUpdate = true;
}

function waveA (x, y, t) {
  return Math.sin( ( x / 20 ) * waveOffsetA + ( t / waveSpeedA ) ) * Math.cos( ( y / 20 ) * waveOffsetA + ( t / waveSpeedA ) ) * waveHeightA;
}

function waveB (x, y, t) {
  return Math.sin( ( x / 2 ) * waveOffsetB + ( t / waveSpeedB ) ) * Math.cos( ( y / 2 ) * waveOffsetB + ( t / waveSpeedB ) ) * waveHeightB;
}

//generic mpping of a value from one range to another
function remap (value, initStart, initEnd, finalStart, finalEnd) {
  mapped = (( (value - initStart) *(finalEnd - finalStart) ) / (initEnd- initStart)) + finalStart;
  return mapped;
}

window.addEventListener( 'resize', onWindowResize, false );


function onWindowResize() {
  //playWaves();
  setTimeout(function() { 
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }, 10);
}

function pauseWaves(){
  ////console.log("pauseWaves");
  wavesPlaying = false;
}

function playWaves(){
  ////console.log("playWaves");
  wavesPlaying = true;  
  animate();
}


start();





