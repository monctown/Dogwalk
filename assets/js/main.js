(function() {
    "use strict";

    var $body = document.querySelector('body');

    // Methods/polyfills.
    !function(){
        function t(t){
            this.el=t;
            for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])
        }
        function n(t,n,i){
            Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)
        }
        if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){
            var i=Array.prototype,
                e=i.push,
                s=i.splice,
                o=i.join;
            t.prototype={add:function(t){
                this.contains(t)||(e.call(this,t),this.el.className=this.toString())
            },
            contains:function(t){return-1!=this.el.className.indexOf(t)},
            item:function(t){return this[t]||null},
            remove:function(t){
                if(this.contains(t)){
                    for(var n=0;n<this.length&&this[n]!=t;n++);
                    s.call(this,n,1),this.el.className=this.toString()
                }
            },
            toString:function(){return o.call(this," ")},
            toggle:function(t){
                return this.contains(t)?this.remove(t):this.add(t),this.contains(t)
            }},
            window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})
    }}();

    window.canUse=function(p){
        if(!window._canUse)window._canUse=document.createElement("div");
        var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);
        return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

    // window.addEventListener polyfill for older browsers
    (function(){
        if("addEventListener"in window)return;
        window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}
    })();

    // Play initial animations on page load.
    window.addEventListener('load', function() {
        window.setTimeout(function() {
            $body.classList.remove('is-preload');
        }, 100);
    });

    // Hide top bar on scroll.
    (function() {
        var lastScrollY = window.scrollY;
        var topBar = document.getElementById('top-bar');
        var isHidden = false; // Track visibility state

        if (topBar) {
            window.addEventListener('scroll', function() {
                var currentScrollY = window.scrollY;

                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    // Scrolling down and past 50px - hide the top bar
                    if (!isHidden) {
                        topBar.classList.add('hidden');
                        isHidden = true;
                    }
                } else {
                    // Scrolling up - show the top bar
                    if (isHidden) {
                        topBar.classList.remove('hidden');
                        isHidden = false;
                    }
                }

                lastScrollY = currentScrollY;
            });
        }
    })();

    // Slideshow Background.
    (function() {
        var settings = {
            images: {
                'images/toronto-dog-walker-01.jpg': 'center',
                'images/toronto-dog-walker-02.jpg': 'center',
                'images/toronto-dog-walker-03.jpg': 'center'
            },
            delay: 6000
        };

        var pos = 0, lastPos = 0, $wrapper, $bgs = [], $bg, k;

        // Create BG wrapper, BGs.
        $wrapper = document.createElement('div');
        $wrapper.id = 'bg';
        $body.appendChild($wrapper);

        for (k in settings.images) {
            $bg = document.createElement('div');
            $bg.style.backgroundImage = 'url("' + k + '")';
            $bg.style.backgroundPosition = settings.images[k];
            $wrapper.appendChild($bg);
            $bgs.push($bg);
        }

        // Main loop for slideshow.
        $bgs[pos].classList.add('visible');
        $bgs[pos].classList.add('top');
        if ($bgs.length == 1 || !canUse('transition')) return;

        window.setInterval(function() {
            lastPos = pos;
            pos++;

            if (pos >= $bgs.length) pos = 0;

            $bgs[lastPos].classList.remove('top');
            $bgs[pos].classList.add('visible');
            $bgs[pos].classList.add('top');

            window.setTimeout(function() {
                $bgs[lastPos].classList.remove('visible');
            }, settings.delay / 2);

        }, settings.delay);

    })();

    // Signup Form Success/Failure message
    (function() {
        var $form = document.querySelectorAll('#signup-form')[0],
            $message;

        if (!('addEventListener' in $form)) return;

        $message = document.createElement('span');
        $message.classList.add('message');
        $form.appendChild($message);

        // Display the success message after form submission
        $form.addEventListener('submit', function() {
            $message.textContent = 'Thank you for signing up!';
            $message.classList.add('success');
            setTimeout(function() {
                $message.textContent = '';
                $message.classList.remove('success');
            }, 3000);
        });
    })();

})();
