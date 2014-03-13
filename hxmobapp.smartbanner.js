/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
!function ($) {
    var SmartBanner = function (options) {
        this.origHtmlMargin = parseFloat($('html').css('margin-top')) // Get the original margin-top of the HTML element so we can take that into account
        this.options = $.extend({}, $.smartbanner.defaults, options)

        var standalone = navigator.standalone // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
        var UA = navigator.userAgent

        // Detect banner type (iOS or Android)
        if (this.options.force) {
            this.type = this.options.force
        } else if (UA.match(/iPad|iPhone|iPod/i) != null) {
            if (UA.match(/Safari/i) != null &&
               (UA.match(/CriOS/i) != null ||
               window.Number(navigator.userAgent.substr(navigator.userAgent.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) this.type = 'ios' // Check webview and native smart banner support (iOS 6+)
        } else if ((UA.match(/Android/i) != null) && (UA.match(/Silk|Kindle/i) === null))  {
            this.type = 'android'
        }

        // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner
        if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) return

        // Calculate scale
        this.scale = this.options.scale == 'auto' ? $(window).width() / window.screen.width : this.options.scale;
        if (this.scale < 1) this.scale = 1

        this.title = this.options.title;
        this.author = this.options.author;

        // Create banner
        this.create()
        this.show()
        this.listen()
    }

    SmartBanner.prototype = {

        constructor: SmartBanner

      , create: function() {
            var iconURL = this.options.icon;
            var link = this.options.urlParams ? (this.options.url + "?" + $.param(this.options.urlParams)) : this.options.url;
            var inStore = this.type === 'ios' ? this.options.inAppStore : this.options.inGooglePlay;

            $('body').append('<div id="smartbanner" class="'+this.type+'"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon" style="background-image:url('+iconURL+');"></span><div class="sb-info"><strong>'+this.title+'</strong><span>'+this.author+'</span><span>'+inStore+'</span></div><a href="'+link+'" class="sb-button"><span>'+this.options.button+'</span></a></div></div>')

            this.bannerHeight = $('#smartbanner').outerHeight() + 2

            if (this.scale > 1) {
                $('#smartbanner')
                    .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
                    .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
                $('#smartbanner .sb-container')
                    .css('-webkit-transform', 'scale('+this.scale+')')
                    .css('-msie-transform', 'scale('+this.scale+')')
                    .css('-moz-transform', 'scale('+this.scale+')')
                    .css('width', $(window).width() / this.scale)
            }
        }

      , listen: function () {
            $('#smartbanner .sb-close').on('click',$.proxy(this.close, this))
            $('#smartbanner .sb-button').on('click',$.proxy(this.install, this))
        }

      , show: function() {
            $('#smartbanner').css("top", "0px").addClass('shown');
            $('html').css("margin-top", this.origHtmlMargin+(this.bannerHeight*this.scale)+"px");
        }

      , hide: function(callback) {
            $('#smartbanner').css("top", -1*this.bannerHeight*this.scale + "px").removeClass('shown');
            $('html').css("margin-top", this.origHtmlMargin);
        }

      , close: function(e) {
            e.preventDefault()
            this.hide()
            this.setCookie('sb-closed','true',this.options.daysHidden)
        }

      , install: function(e) {
            this.hide()
            this.setCookie('sb-installed','true',this.options.daysReminder)
        }

      , setCookie: function(name, value, exdays) {
            var exdate = new Date()
            exdate.setDate(exdate.getDate()+exdays)
            value=escape(value)+((exdays==null)?'':'; expires='+exdate.toUTCString())
            document.cookie=name+'='+value+'; path=/;'
        }

      , getCookie: function(name) {
            var i,x,y,ARRcookies = document.cookie.split(";")
            for(i=0;i<ARRcookies.length;i++) {
                x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="))
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1)
                x = x.replace(/^\s+|\s+$/g,"")
                if (x==name) {
                    return unescape(y)
                }
            }
            return null
        }
    }

    $.smartbanner = function (option) {
        var $window = $(window)
        , data = $window.data('typeahead')
        , options = typeof option == 'object' && option
        if (!data) $window.data('typeahead', (data = new SmartBanner(options)))
        if (typeof option == 'string') data[option]()
    }

    // override these globally if you like (they are all optional)
    $.smartbanner.defaults = {
        title: 'Holiday Extras',
        author: 'Holiday Extras Ltd.',
        inAppStore: 'Free On the App Store',
        inGooglePlay: 'Free On Google Play',
        icon: "app-icon.jpg",
        button: 'VIEW',
        url: "http://mobile.holidayextras.co.uk/redirect",
        urlParams: null,
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
        force: null // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
    }

    $.smartbanner.Constructor = SmartBanner

}(window.jQuery);
