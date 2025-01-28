(function() {

    "use strict";

    var $body = document.querySelector('body');

    // Methods/polyfills.

    // classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
    !function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

    // canUse
    window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

    // window.addEventListener
    (function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

    // Play initial animations on page load.
    window.addEventListener('load', function() {
        window.setTimeout(function() {
            $body.classList.remove('is-preload');
        }, 100);
    });

    // Hide top bar on scroll.
    (function() {
        var lastScrollY = window.scrollY;
        var topBar = document.getElementById('top-bar'); // Ensure your top bar has the ID "top-bar"

        if (topBar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > lastScrollY) {
                    // Scrolling down - hide the top bar
                    topBar.style.top = '-80px'; // Move top bar offscreen
                } else {
                    // Scrolling up - show the top bar
                    topBar.style.top = '0'; // Reset to the original position
                }
                lastScrollY = window.scrollY;
            });
        }
    })();

    // Slideshow Background.
    (function() {

        // Settings.
        var settings = {
            // Images (in the format of 'url': 'alignment').
            images: {
                'images/toronto-dog-walker-01.jpg': 'center',
                'images/toronto-dog-walker-02.jpg': 'center',
                'images/toronto-dog-walker-03.jpg': 'center'
            },

            // Delay.
            delay: 6000
        };

        // Vars.
        var pos = 0, lastPos = 0,
            $wrapper, $bgs = [], $bg,
            k, v;

        // Create BG wrapper, BGs.
        $wrapper = document.createElement('div');
        $wrapper.id = 'bg';
        $body.appendChild($wrapper);

        for (k in settings.images) {
            // Create BG.
            $bg = document.createElement('div');
            $bg.style.backgroundImage = 'url("' + k + '")';
            $bg.style.backgroundPosition = settings.images[k];
            $wrapper.appendChild($bg);

            // Add it to array.
            $bgs.push($bg);
        }

        // Main loop.
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');

        // Bail if we only have a single BG or the client doesn't support transitions.
        if ($bgs.length == 1 || !canUse('transition')) return;

        window.setInterval(function() {

            lastPos = pos;
            pos++;

            // Wrap to beginning if necessary.
            if (pos >= $bgs.length) pos = 0;

            // Swap top images.
            $bgs[lastPos].classList.remove('top');
            $bgs[pos].classList.add('visible');
            $bgs[pos].classList.add('top');

            // Hide last image after a short delay.
            window.setTimeout(function() {
                $bgs[lastPos].classList.remove('visible');
            }, settings.delay / 2);

        }, settings.delay);

    })();

    // Signup Form with Formspark integration
    (function() {

        // Vars.
        var $form = document.querySelector('#signup-form'),
            $submit = document.querySelector('#signup-form input[type="submit"]'),
            $message;

        // Bail if addEventListener isn't supported.
        if (!('addEventListener' in $form)) return;

        // Message.
        $message = document.createElement('span');
        $message.classList.add('message');
        $form.appendChild($message);

        $message._show = function(type, text) {
            $message.innerHTML = text;
            $message.classList.add(type);
            $message.classList.add('visible');

            window.setTimeout(function() {
                $message._hide();
            }, 3000);
        };

        $message._hide = function() {
            $message.classList.remove('visible');
        };

        // Events.
        $form.addEventListener('submit', function(event) {

            event.stopPropagation();
            event.preventDefault();

            // Hide message.
            $message._hide();

            // Disable submit.
            $submit.disabled = true;

            // Create form data object
            var formData = new FormData($form);

            // Send form data to Formspark via Fetch API
            fetch('https://submit.formspark.io/PXKPPs1ZR', {  // Replace with your actual Formspark form endpoint
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    // Reset form after successful submission.
                    $form.reset();

                    // Enable submit button.
                    $submit.disabled = false;

                    // Show success message.
                    $message._show('success', 'Thank you for signing up!');
                } else {
                    // Show failure message if something goes wrong.
                    $message._show('failure', 'Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                // Handle any network errors.
                $message._show('failure', 'Something went wrong. Please try again.');
                $submit.disabled = false;
            });

        });

    })();

})();
