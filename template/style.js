var uploadsTab = document.querySelector('.uploadsTab');
var porthole = document.querySelector('.porthole');
var portholeFill = document.querySelector('.portholeFill');
var percentageComplete = 0;
var portholeVisibleClass = 'uploadsTabPortholeVisible';
var rubberDuckyClass = 'portholeRubberDuckyVisible';
var rubberDuckyAnimationDuration = 8000;
var maybeShowRubberDuckyHandle = null;
var removeRubberDuckyHandle = null;

setTimeout(simulateUpload, 0);

function simulateUpload() {
    // Start at 0%
    percentageComplete = 0;
    showPercentage();
    portholeFill.offsetTop;

    // Show the progress indicator and start making progress
    uploadsTab.classList.add(portholeVisibleClass);
    makeProgress();

    // Maybe show the Easter egg
    porthole.classList.remove(rubberDuckyClass);
    maybeShowRubberDucky();
    maybeShowRubberDuckyHandle = setInterval(maybeShowRubberDucky, rubberDuckyAnimationDuration);
};

function makeProgress() {
    percentageComplete += Math.random() * 1;
    showPercentage();

    if (percentageComplete >= 100) {
        clearInterval(maybeShowRubberDuckyHandle);
        clearTimeout(removeRubberDuckyHandle);
        uploadsTab.classList.remove(portholeVisibleClass);
        setTimeout(simulateUpload, 2000);
    } else {
        setTimeout(makeProgress, 500);
    }
}

function showPercentage() {
    var transform = 'translateY(-' + percentageComplete + '%)';
    portholeFill.style['-webkit-transform'] = transform;
    portholeFill.style['transform'] = transform;
}

function maybeShowRubberDucky() {
    // It's less likely in production!
    var chance = 100;

    if (Math.random() > chance) {
        return;
    }

    porthole.classList.add(rubberDuckyClass);
    removeRubberDuckyHandle = setTimeout(function () {
        porthole.classList.remove(rubberDuckyClass);
    }, rubberDuckyAnimationDuration);
}




// requestAnimationFrame Polyfill
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function () {
            callback(currTime + timeToCall);
        },
            timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
        clearTimeout(id);
    };
}());





// The Parallax Script.
function parralaxWrapper() {
    var bodyHeight = window.innerHeight,
        imgHeight = bodyHeight / 6,
        images = document.getElementsByClassName('image'),
        imagesInner = document.querySelectorAll('.image > .image-inner'),
        imagesOffset = [],
        imageLength = images.length,
        scrollTop = 0,
        parallaxFactor;

    for (var y = 0; y < imageLength; y++) {
        imagesOffset.push(images[y].offsetTop);
    }

    window.onscroll = function () {
        scrollTop = window.scrollY;
    };

    function parallax() {
        for (var x = 0; x < imageLength; x++) {
            if (imagesOffset[x] < bodyHeight) {
                imagesInner[x].style.webkitTransform = 'translate3d(0,' + scrollTop * 0.6 + 'px,0)';
                imagesInner[x].style.transform = 'translate3d(0,' + scrollTop * 0.6 + 'px,0)';
            } else {
                if (scrollTop > imagesOffset[x] - bodyHeight) {
                    parallaxFactor = 0.6 * (scrollTop - (imagesOffset[x] - bodyHeight));
                    imagesInner[x].style.webkitTransform = 'translate3d(0,' + parallaxFactor + 'px,0)';
                    imagesInner[x].style.transform = 'translate3d(0,' + parallaxFactor + 'px,0)';
                }
            }
        }
        requestAnimationFrame(parallax);
    }
    parallax();
}

window.onload = function () {
    parralaxWrapper();
};