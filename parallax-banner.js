jQuery(document).ready(function() {
    jQuery('[data-component="parallax-banner"]').each(function() {
        var parallax = new components.parallaxBanner(this);
    });
});

var components = components || {};

components.parallaxBanner = function(el) {
    this.el = jQuery(el);
    this.backgroundImage = new Image();
    this.backgroundImage.src = this.el.data('pb-image');
    this.backgroundImage.onload = this.init.bind(this);
    this.elTop = this.el.offset().top;
    this.elHeight = this.el.outerHeight();
};
components.parallaxBanner.prototype = {
    init: function() {
        this.imageRatio = this.backgroundImage.width / this.backgroundImage.height;
        this.resize();
        jQuery(window).on({
            'scroll': this.scroll.bind(this),
            'resize': this.resize.bind(this)
        });
    },
    scroll: function() {
        if(jQuery(window).width() > 500) {
            var currentScrollTop = jQuery(window).scrollTop();
            if(
                currentScrollTop >= this.scrollingActiveArea.top &&
                currentScrollTop <= this.scrollingActiveArea.bottom
            ) {
                var scrolledDistance = currentScrollTop - this.scrollingActiveArea.top;
                var imageDistance = (this.imageScrollableDistance * scrolledDistance) /
                    this.totalScrollDistance;
                this.el.css('background-position', 'center -' + imageDistance + 'px');
            }
        }
    },
    resize: function() {
        var win = {
            h: jQuery(window).height(),
            w: jQuery(window).width()
        };
        if(win.w > 500) {
            this.imageHeight = win.w * (1 / this.imageRatio);
            this.scrollingActiveArea = {
                top: (this.elTop > win.h) ? this.elTop - win.h : 0,
                bottom: this.elTop + this.elHeight
            };
            this.totalScrollDistance = this.scrollingActiveArea.bottom - this.scrollingActiveArea.top;
            this.imageScrollableDistance = this.imageHeight - this.elHeight;
            this.scrollRatio = this.totalScrollDistance / this.imageScrollableDistance;
        } else {
            this.el.css('background-position', 'center');
        }
    }
};
