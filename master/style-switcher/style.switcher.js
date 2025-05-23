var styleSwitcher = {
    initialized: !1,
    defaults: {
        saveToStorage: !0,
        preserveCookies: !1,
        colorPrimary: "#0088CC",
        colorSecondary: "#e36159",
        colorTertiary: "#2BAAB1",
        colorQuaternary: "#383f48",
        borderRadius: "4px",
        layoutStyle: "wide",
        websiteType: "normal",
        backgroundColor: "light",
        backgroundPattern: "",
        changeLogo: !0,
        showSwitcher: !1
    },
    initialize: function() {
        var t = this,
            r = $("html").data("style-switcher-options"),
            i = $("#styleSwitcherScript").data("base-path") ? $("#styleSwitcherScript").data("base-path") : "",
            o = $("head"),
            e = $("#styleSwitcherScript").data("skin-src") ? $("#styleSwitcherScript").data("skin-src") : i + "master/less/skin-default.less";
        t.basePath = i, this.initialized || (t.options = $.extend({}, t.defaults), String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1)
        }, jQuery.styleSwitcherCachedScript = function(o, e) {
            return e = $.extend(e || {}, {
                dataType: "script",
                cache: !0,
                url: o
            }), jQuery.ajax(e)
        }, null != $.cookie("borderRadius") && (t.options.borderRadius = $.cookie("borderRadius")), null != $.cookie("colorPrimary") && (t.options.colorPrimary = "#" + $.cookie("colorPrimary")), null != $.cookie("colorSecondary") && (t.options.colorSecondary = "#" + $.cookie("colorSecondary")), null != $.cookie("colorTertiary") && (t.options.colorTertiary = "#" + $.cookie("colorTertiary")), null != $.cookie("colorQuaternary") && (t.options.colorQuaternary = "#" + $.cookie("colorQuaternary")), r && (r = r.replace(/'/g, '"'), t.options = $.extend({}, t.options, JSON.parse(r)), t.options.preserveCookies = !0, t.options.saveToStorage = !1), o.append($('<link rel="stylesheet">').attr("href", i + "master/style-switcher/style-switcher.css")), $("[data-icon]").get(0) && $(window).on("theme.plugin.icon.svg.ready", function() {
            setTimeout(function() {
                $.event.trigger({
                    type: "styleSwitcher.modifyVars",
                    options: t.options
                })
            }, 10)
        }), null != $.cookie("showSwitcher") || t.options.showSwitcher || !$.cookie("initialized") ? (o.append($('<link rel="stylesheet/less">').attr("href", e)), o.append($('<link rel="stylesheet">').attr("href", i + "master/style-switcher/bootstrap-colorpicker/css/bootstrap-colorpicker.css")), $.styleSwitcherCachedScript(i + "master/style-switcher/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js").done(function(o, e) {
            less = {
                async: !0,
                env: "production",
                modifyVars: {
                    "@border-radius": t.options.borderRadius,
                    "@color-primary": t.options.colorPrimary,
                    "@color-secondary": t.options.colorSecondary,
                    "@color-tertiary": t.options.colorTertiary,
                    "@color-quaternary": t.options.colorQuaternary
                }
            }, $.styleSwitcherCachedScript(i + "master/less/less.js").done(function(o, e) {
                $.ajax({
                    url: i + "master/style-switcher/style.switcher.html"
                }).done(function(o) {
                    $("body").append(o), t.container = $("#styleSwitcher"), t.build(), t.events(), "img/logo.png" != $("#header .header-logo img").attr("src") && (t.options.changeLogo = !1), r || (null != $.cookie("layoutStyle") && (t.options.layoutStyle = $.cookie("layoutStyle")), $("body").hasClass("one-page") && (t.options.websiteType = "one-page"), null != $.cookie("backgroundColor") && (t.options.backgroundColor = $.cookie("backgroundColor")), null != $.cookie("backgroundPattern") && (t.options.backgroundPattern = $.cookie("backgroundPattern"))), t.setLayoutStyle(t.options.layoutStyle), t.setWebsiteType(t.options.websiteType), t.setBackgroundColor(t.options.backgroundColor), t.setBackgroundPattern(t.options.backgroundPattern), t.setColors(), t.setBorderRadius(t.options.borderRadius), $("#styleSwitcherSimple").remove(), t.initialized = !0, null == $.cookie("initialized") && $.cookie("initialized", !0)
                })
            })
        }), $.styleSwitcherCachedScript(i + "master/style-switcher/cssbeautify/cssbeautify.js").done(function(o, e) {})) : t.initializeSimpleMode())
    },
    initializeSimpleMode: function() {
        var e = this,
            t = $("#header .header-logo img"),
            r = $("#header .header-logo img").attr("src"),
            o = localStorage.getItem("porto-style-switcher-tooltip");
        $("body").append('<div id="styleSwitcherSimple" class="style-switcher style-switcher-simple d-none d-sm-block"><a id="styleSwitcherSimpleOpen" class="style-switcher-open" href="#"><i class="fas fa-cogs"></i><div class="style-switcher-tooltip"><strong>Style Switcher</strong><p>Check out different color options and styles.</p></div></a></div>'), o || (setTimeout(function() {
            $(".style-switcher-tooltip").addClass("active"), setTimeout(function() {
                $(".style-switcher-tooltip").removeClass("active")
            }, 8e3)
        }, 3e3), localStorage.setItem("porto-style-switcher-tooltip", !0)), "img/logo.png" == r && e.setLogo(), $("#styleSwitcherSimpleOpen").on("click", function(o) {
            o.preventDefault(), t.attr("src", r), $(this).find(".fa").removeClass().addClass("fas fa-cog fa-spin fa-fw"), $.cookie("showSwitcher", !0), e.initialized = !1, e.initialize()
        })
    },
    build: function() {
        var e = this,
            t = e.container.find(".color-primary input"),
            r = e.container.find(".color-secondary input"),
            i = e.container.find(".color-tertiary input"),
            a = e.container.find(".color-quaternary input");
        t.val(e.options.colorPrimary).parent().colorpicker(), r.val(e.options.colorSecondary).parent().colorpicker(), i.val(e.options.colorTertiary).parent().colorpicker(), a.val(e.options.colorQuaternary).parent().colorpicker(), $(".colorpicker").on("mousedown", function(o) {
            o.preventDefault(), e.isChanging = !0
        }).on("mouseup", function(o) {
            o.preventDefault(), e.isChanging = !1, e.options.colorPrimary = t.val(), e.options.colorSecondary = r.val(), e.options.colorTertiary = i.val(), e.options.colorQuaternary = a.val(), e.setColors()
        }), $(".colorpicker-element input").on("blur", function(o) {
            e.options.colorPrimary = t.val(), e.options.colorSecondary = r.val(), e.options.colorTertiary = i.val(), e.options.colorQuaternary = a.val(), e.setColors()
        }), this.container.find(".options-links.borders a").on("click", function(o) {
            o.preventDefault(), e.setBorderRadius($(this).attr("data-border-radius"))
        }), this.container.find(".options-links.layout a").on("click", function(o) {
            o.preventDefault(), e.setLayoutStyle($(this).attr("data-layout-type"), !0)
        }), this.container.find(".options-links.website-type a").on("click", function(o) {
            o.preventDefault(), $.cookie("showSwitcher", !0), self.location = $(this).attr("href")
        }), this.container.find(".options-links.background-color a").on("click", function(o) {
            o.preventDefault(), e.setBackgroundColor($(this).attr("data-background-color"))
        }), this.container.find("ul[data-type=patterns]").find("a").on("click", function(o) {
            o.preventDefault(), e.setBackgroundPattern($(this).attr("data-pattern"))
        }), e.container.find(".reset").on("click", function(o) {
            o.preventDefault(), e.reset()
        }), e.container.find(".get-css").on("click", function(o) {
            o.preventDefault(), e.getCss()
        })
    },
    events: function() {
        var e = this;
        $("#styleSwitcherOpen").on("click", function(o) {
            o.preventDefault(), e.container.toggleClass("active")
        }), null == $.cookie("showSwitcher") && !$("body").hasClass("one-page") || ($("#styleSwitcherOpen").trigger("click"), $.removeCookie("showSwitcher"))
    },
    setColors: function(o, e) {
        var t = this;
        if (this.isChanging) return !1;
        o && (t.options["color" + e.capitalize()] = o, t.container.find(".color-" + e + " input").val(o)), t.options.preserveCookies || ($.cookie("colorPrimary", t.options.colorPrimary.replace("#", "")), $.cookie("colorSecondary", t.options.colorSecondary.replace("#", "")), $.cookie("colorTertiary", t.options.colorTertiary.replace("#", "")), $.cookie("colorQuaternary", t.options.colorQuaternary.replace("#", ""))), t.modifyVars(), this.setLogo()
    },
    setBorderRadius: function(o) {
        var e = this;
        e.options.borderRadius = o, e.options.preserveCookies || $.cookie("borderRadius", o), e.modifyVars();
        var t = this.container.find(".options-links.borders");
        t.find(".active").removeClass("active"), t.find("a[data-border-radius=" + o + "]").addClass("active"), $.event.trigger({
            type: "styleSwitcher.setBorderRadius",
            radius: o
        })
    },
    setLayoutStyle: function(o, e) {
        if ($("body").hasClass("one-page")) return !1;
        if (this.options.preserveCookies || $.cookie("layoutStyle", o), this.options.saveToStorage && "undefined" != typeof localStorage && localStorage.setItem("porto-layout", o), e) return $.cookie("showSwitcher", !0), window.location.reload(), !1;
        var t = this.container.find(".options-links.layout"),
            r = this.container.find(".patterns");
        t.find(".active").removeClass("active"), t.find("a[data-layout-type=" + o + "]").addClass("active"), "wide" == o ? (r.hide(), $("html").removeClass("boxed"), $.removeCookie("backgroundPattern")) : (r.show(), $("html").addClass("boxed"), null == $.cookie("backgroundPattern") && this.container.find("ul[data-type=patterns] li:first a").trigger("click")), $.event.trigger({
            type: "styleSwitcher.setLayoutStyle",
            style: o
        })
    },
    setWebsiteType: function(o) {
        var e = this.container.find(".options-links.website-type"),
            t = this.container.find(".options-links.layout");
        "one-page" == o ? (e.find("a:last").addClass("active"), t.prev().remove(), t.remove()) : e.find("a:first").addClass("active")
    },
    setBackgroundColor: function(o) {
        this.options.preserveCookies || $.cookie("backgroundColor", o);
        var e = this.container.find(".options-links.background-color");
        e.find(".active").removeClass("active"), e.find("a[data-background-color=" + o + "]").addClass("active"), "dark" == o ? $("html").addClass("dark") : $("html").removeClass("dark"), $.event.trigger({
            type: "styleSwitcher.setBackgroundColor",
            color: o
        }), this.setLogo()
    },
    setBackgroundPattern: function(o) {
        if ("" == o) return this;
        $("html").hasClass("boxed") && $("html").css("background-image", "url(img/patterns/" + o + ".png)"), this.options.preserveCookies || $.cookie("backgroundPattern", o), $.event.trigger({
            type: "styleSwitcher.setBackgroundPattern",
            pattern: o
        })
    },
    setLogo: function(o) {
        if (!this.options.changeLogo) return this;
        o || ("#" + $.cookie("colorPrimary")).toUpperCase() == this.defaults.colorPrimary.toUpperCase() && "dark" != $.cookie("backgroundColor") ? $("#header .header-logo img").attr("src", "img/logo-default.png") : "dark" == $.cookie("backgroundColor") ? $("#header .header-logo img").attr("src", "img/logo-dark.png") : $("#header .header-logo img").attr("src", "img/logo.png"), $.event.trigger({
            type: "styleSwitcher.setLogo"
        })
    },
    modifyVars: function() {
        var o = this;
        window.clearTimeout(o.timer), o.timer = window.setTimeout(function() {
            less.modifyVars({
                "@border-radius": o.options.borderRadius,
                "@color-primary": o.options.colorPrimary,
                "@color-secondary": o.options.colorSecondary,
                "@color-tertiary": o.options.colorTertiary,
                "@color-quaternary": o.options.colorQuaternary
            }), o.options.saveToStorage && "undefined" != typeof localStorage && localStorage.setItem("porto-skin.html", $('style[id^="less:"]').text()), $.event.trigger({
                type: "styleSwitcher.modifyVars",
                options: o.options
            })
        }, 300)
    },
    reset: function() {
        $.removeCookie("borderRadius"), $.removeCookie("colorPrimary"), $.removeCookie("colorSecondary"), $.removeCookie("colorTertiary"), $.removeCookie("colorQuaternary"), $.removeCookie("layoutStyle"), $.removeCookie("backgroundColor"), $.removeCookie("backgroundPattern"), $.cookie("showSwitcher", !0), window.location.reload(), "undefined" != typeof localStorage && (localStorage.removeItem("porto-skin.html"), localStorage.removeItem("porto-layout"))
    },
    getCss: function() {
        raw = "", $("html").hasClass("boxed") ? (raw = 'html { background-image: url("../../img/patterns/' + $.cookie("backgroundPattern") + '.png"); }', $("#addBoxedClassInfo").show()) : $("#addBoxedClassInfo").hide(), $("#getCSSTextarea").text($('style[id^="less:"]').text()).focus(function() {
            var o = $(this);
            o.select(), o.mouseup(function() {
                return o.unbind("mouseup"), !1
            })
        }), $("#getCSSModal").modal("show"), options = {
            indent: "\t",
            autosemicolon: !0
        }, raw += $("#getCSSTextarea").text(), $("#getCSSTextarea").text(cssbeautify(raw, options))
    }
};
styleSwitcher.initialize();