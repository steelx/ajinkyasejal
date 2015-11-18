var Lilac;
! function(e) {
    "use strict";
    e(document).ready(function() {
        debugger;
        Lilac = {
            initialized: !1,
            mobMenuFlag: !1,
            wookHandler: null,
            wookOptions: null,
            scrollPos: 0,
            sendingMail: !1,
            mobileMenuTitle: mobileMenuTitle,
            hero100PercentHeight: hero100PercentHeight,
            twitter_username: twitter_username,
            map_canvas_id: map_canvas_id,
            map_color: map_color,
            map_initial_zoom: map_initial_zoom,
            map_initial_latitude: map_initial_latitude,
            map_initial_longitude: map_initial_longitude,
            use_default_map_style: use_default_map_style,
            contact_form_success_msg: contact_form_success_msg,
            contact_form_error_msg: contact_form_error_msg,
            c_days: c_days,
            c_hours: c_hours,
            c_minutes: c_minutes,
            c_seconds: c_seconds,
            countdownEndMsg: countdownEndMsg,
            init: function() {
                var e = this;
                e.initialized || (e.initialized = !0, e.build(), e.events())
            },
            build: function() {
                var t = this;
                t.preloader(), t.navigation(), t.createMobileMenu(), t.heroHeight(), t.curvedText(), t.bgImageGrid(), t.googleMap(), t.createPrettyPhoto(), t.createOwlSliders(), t.parallaxItems(), t.startNiceScroll()
            },
            events: function() {
                var e = this;
                e.windowResize(), e.resizeVideos(), e.contactForm(), e.buttons(), e.animateElems()
            },
            preloader: function() {
                var t = setInterval(function() {
                    /loaded|complete/.test(document.readyState) && (clearInterval(t), e("#preloader").fadeOut(500))
                }, 10)
            },
            navigation: function() {
                e(".nav li a").on("click", function(t) {
                    var a = e(this),
                        i = 0;
                    return !e.browser.mobile || a.closest(".dropdown").hasClass("open") && "block" !== !a.closest(".dropdown-menu").css("display") && a.parent().parent().hasClass("nav") ? void("#" === a.attr("href").charAt(0) ? (t.preventDefault(), "#home" !== a.attr("href") && (i = e(a.attr("href")).offset().top - 65), e("html, body").stop().animate({
                        scrollTop: i
                    }, 1500, "easeInOutExpo", function() {
                        a.blur()
                    })) : window.open(a.attr("href"), "_self")) : (t.preventDefault(), !1)
                });
                var t = new Waypoint.Sticky({
                    element: e(".nav-section")
                });
                t = t, e("#wrapper > section").waypoint({
                    handler: function(t) {
                        var a = e(this),
                            i = a[0].element.id;
                        "up" === t && (i = a[0].element.previousElementSibling.id), e(".nav a").removeClass("active"), e('nav a[href="#' + i + '"]').addClass("active")
                    },
                    offset: "50%"
                }), e(window).load(function() {
                    var a = location.hash.replace("#", "");
                    "" !== a && (location.hash = "", e("html, body").stop().animate({
                        scrollTop: e("#" + a).offset().top - 65
                    }, 1500, "easeInOutExpo")), t = new Waypoint.Sticky({
                        element: e(".nav-section")
                    })
                })
            },
            createMobileMenu: function(t) {
                var a, i, n = this,
                    o = e("#wrapper");
                i = e.browser.mobile ? "touchstart" : "click", null !== t && (t = e(window).innerWidth()), 975 >= t && !n.mobMenuFlag && (e("body").prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2><i class="fa fa-bars"></i>' + n.mobileMenuTitle + "</h2><ul></ul></nav>"), e(".nav-mobile > ul").html(e(".nav").html()), e(".nav-mobile b").remove(), e(".nav-mobile ul.dropdown-menu").removeClass().addClass("dropdown-mobile"), a = e(".nav-mobile"), e("#nav-mobile-btn").on(i, function(t) {
                    t.stopPropagation(), t.preventDefault(), setTimeout(function() {
                        o.addClass("open"), a.addClass("open"), a.getNiceScroll().show()
                    }, 25), e(document).on(i, function(t) {
                        e(t.target).hasClass("nav-mobile") || e(t.target).parents(".nav-mobile").length || (o.removeClass("open"), a.removeClass("open"), e(document).off(i))
                    }), e(">i", a).on(i, function() {
                        a.getNiceScroll().hide(), o.removeClass("open"), a.removeClass("open"), e(document).off(i)
                    })
                }), a.niceScroll({
                    autohidemode: !0,
                    cursorcolor: "#888888",
                    cursoropacitymax: "0.7",
                    cursorwidth: 10,
                    cursorborder: "0px solid #000",
                    horizrailenabled: !1,
                    zindex: "1"
                }), a.getNiceScroll().hide(), n.mobMenuFlag = !0, e(".nav-mobile li a").on("click", function(t) {
                    var n = e(this),
                        s = 0;
                    "#home" !== n.attr("href") && (s = e(n.attr("href")).offset().top - 65), e("html, body").stop().animate({
                        scrollTop: s
                    }, 1500, "easeInOutExpo", function() {
                        n.blur()
                    }), a.getNiceScroll().hide(), o.removeClass("open"), a.removeClass("open"), e(document).off(i), t.preventDefault()
                }))
            },
            heroHeight: function() {
                var t = this;
                t.hero100PercentHeight && (e("#home").css({
                    minHeight: e(window).innerHeight() + "px"
                }), e(window).resize(function() {
                    e("#home").css({
                        minHeight: e(window).innerHeight() + "px"
                    })
                }))
            },
            bgImageGrid: function() {
                if (e("#freewall").length) {
                    e("#freewall .item").each(function() {
                        var t = e(this);
                        t.width(Math.floor(260 + 200 * Math.random())), t.css({
                            "background-image": "url(" + e(">img", t).attr("src") + ")"
                        }), e(">img", t).remove()
                    }), e("#freewall").appendTo("#wrapper");
                    var t = new Freewall("#freewall");
                    t.reset({
                        selector: ".item",
                        animate: !1,
                        cellW: 20,
                        gutterX: 0,
                        gutterY: 0,
                        onResize: function() {
                            t.fitWidth()
                        }
                    }), t.fitWidth()
                }
            },
            googleMap: function() {
                if (0 === e("#map_canvas").length || "undefined" === map_markers || 0 === map_markers.length) return !1;
                var t, a, i, n, o, s = this,
                    r = [],
                    l = 0;
                for (/^\d|\.|-$/.test(s.map_initial_latitude) && /^\d|\.|-$/.test(map_initial_longitude) || (s.map_initial_latitude = map_markers[0].latitude, s.map_initial_longitude = map_markers[0].longitude), a = new google.maps.LatLng(s.map_initial_latitude, s.map_initial_longitude), this.use_default_map_style || (r = [{
                        stylers: [{
                            hue: map_color
                        }, {
                            saturation: -75
                        }, {
                            lightness: 5
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [{
                            saturation: 20
                        }, {
                            lightness: -70
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            saturation: -50
                        }, {
                            lightness: 40
                        }]
                    }, {
                        featureType: "road",
                        elementType: "geometry",
                        stylers: [{
                            hue: map_color
                        }, {
                            saturation: -100
                        }, {
                            lightness: 0
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry",
                        stylers: [{
                            hue: map_color
                        }, {
                            saturation: 5
                        }, {
                            lightness: 5
                        }]
                    }, {
                        featureType: "road",
                        elementType: "geometry.stroke",
                        stylers: [{
                            saturation: 10
                        }, {
                            lightness: 0
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            saturation: 0
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            hue: map_color
                        }, {
                            saturation: 30
                        }, {
                            lightness: -30
                        }]
                    }]), t = new google.maps.StyledMapType(r, {
                        name: "SejalAjinkya"
                    }), i = {
                        center: a,
                        zoom: s.map_initial_zoom,
                        scrollwheel: !1,
                        panControl: !1,
                        mapTypeControl: !1,
                        zoomControl: !0,
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        }
                    }, n = new google.maps.Map(document.getElementById(s.map_canvas_id), i), n.mapTypes.set("map_style", t), n.setMapTypeId("map_style"), o = function(e) {
                        var t = e.latitude,
                            a = e.longitude,
                            i = e.icon,
                            o = e.infoWindow,
                            s = new google.maps.InfoWindow({
                                content: '<div class="infoWindow">' + o + "</div>"
                            }),
                            r = new RichMarker({
                                position: new google.maps.LatLng(t, a),
                                map: n,
                                anchor: 8,
                                anchorPoint: new google.maps.Point(0, -40),
                                shadow: "none",
                                content: '<div class="marker"><i class="fa ' + i + '"></i></div>'
                            });
                        google.maps.event.addListener(r, "click", function() {
                            s.open(n, r)
                        })
                    }; l < map_markers.length;) o(map_markers[l]), l += 1
            },
            getLatestTweets: function() {
                var t = this;
                e(".tweet").html('<div class="heartbeat"></div>');
                var a = document.createElement("div");
                a.setAttribute("id", "twitter-box"), e("body").append(a), e("#twitter-box").css({
                    display: "none"
                });
                try {
                    e("#twitter-box").tweet({
                        username: t.twitter_username,
                        modpath: "twitter/",
                        count: 8,
                        loading_text: "Loading tweets...",
                        template: '<h3>{screen_name}</h3><div class="info"><a href="http://twitter.com/{screen_name}" target="_blank">@{screen_name}</a> | <a href="http://twitter.com/{screen_name}/statuses/{tweet_id}/" target="_blank" class="time">{tweet_relative_time}</a></div><div>{text}</div>'
                    })
                } catch (i) {
                    console.log("Your twitter account is misconfigured. " + i)
                }
                var n = 0,
                    o = e(".tweet").length;
                e("#twitter-box li").each(function() {
                    return o > n ? (e(".tweet").eq(n).html(e(this).html()), void(n += 1)) : !1
                }), e("#twitter-box").remove()
            },
            getInstagram: function() {
                var t = this;
                e(".instagram").html('<div class="heartbeat"></div>'), e.ajax({
                    type: "post",
                    url: "instagram/instagram.php",
                    contentType: "application/json",
                    dataType: "json",
                    success: function(a) {
                        var i = e.parseJSON(a),
                            n = e(".instagram").length,
                            o = 0,
                            s = 0,
                            r = 0;
                        for ("" !== i && i.hasOwnProperty("data") && (s = i.data.length); s > r;) n > o && (e(".instagram").eq(o).html('<img src="' + i.data[r].images.standard_resolution.url + '" alt="" /><span><a href="' + i.data[r].images.standard_resolution.url + '" data-gal="prettyPhoto[gallery]" title="' + i.data[r].caption.text + '"><i class="fa fa-link"></i></a><a href="' + i.data[r].link + '" target="_blank" title="View on Instagram"><i class="fa fa-external-link"></i></a></span>'), o += 1), r += 1;
                        t.createPrettyPhoto()
                    },
                    error: function() {
                        console.log("Error getting Instagram feed")
                    }
                })
            },
            createPrettyPhoto: function() {
                e("a[data-gal^='prettyPhoto']").prettyPhoto({
                    theme: "lilac",
                    hook: "data-gal"
                })
            },
            createOwlSliders: function() {
                e(".timeline-gallery").length && e(".timeline-gallery").owlCarousel({
                    navigation: !0,
                    navigationText: !1,
                    pagination: !1,
                    itemsCustom: [
                        [0, 1],
                        [392, 2],
                        [596, 3],
                        [751, 2],
                        [975, 3],
                        [1183, 3],
                        [1440, 3],
                        [1728, 3]
                    ]
                }), e(".bridesmaids-groomsmen-slider").length && e(".bridesmaids-groomsmen-slider").owlCarousel({
                    itemsCustom: [
                        [0, 1],
                        [590, 2],
                        [751, 2],
                        [975, 3],
                        [1183, 4],
                        [1440, 4],
                        [1728, 4]
                    ]
                })
            },
            createGallery: function() {
                var t = e(".gallery-scroller"),
                    a = !1;
                e(".gallery-right").on("click", function() {
                    return a ? !1 : (a = !0, void t.animate({
                        scrollLeft: t.scrollLeft() + 380
                    }, function() {
                        a = !1
                    }))
                }), e(".gallery-left").on("click", function() {
                    return a ? !1 : (a = !0, void t.animate({
                        scrollLeft: t.scrollLeft() - 380
                    }, function() {
                        a = !1
                    }))
                })
            },
            curvedText: function() {
                e(".curve").length && (e(".curve").arctext({
                    radius: 1e3
                }), e(window).resize(function() {
                    e(".curve").arctext("set", {
                        radius: 1e3
                    })
                })), e(".curve2").length && (e(".curve2").arctext({
                    radius: 800,
                    dir: -1
                }), e(window).resize(function() {
                    e(".curve2").arctext("set", {
                        radius: 800,
                        dir: -1
                    })
                }))
            },
            countdown: function(t, a) {
                function i() {
                    var t = new Date,
                        a = s - t;
                    if (0 > a) return r.html('<div class="end">' + o.countdownEndMsg + "</div>"), clearInterval(n), !1;
                    var i = Math.floor(a / 864e5 * 1),
                        l = Math.floor(a % 864e5 / 36e5 * 1),
                        c = Math.floor(a % 864e5 % 36e5 / 6e4 * 1),
                        d = Math.floor(a % 864e5 % 36e5 % 6e4 / 1e3 * 1);
                    e(".days > div", r).html(i), e(".hours > div", r).html(l), e(".minutes > div", r).html(c), e(".seconds > div", r).html(d)
                }
                var n, o = this,
                    s = new Date(a),
                    r = e("" + t);
                r.html('<div class="days"><span>' + o.c_days + '</span><div></div></div><div class="hours"><span>' + o.c_hours + '</span><div></div></div><div class="minutes"><span>' + o.c_minutes + '</span><div></div></div><div class="seconds"><span>' + o.c_seconds + "</span><div></div></div>"), n = setInterval(i, 1e3)
            },
            parallaxItems: function() {
                e.browser.mobile ? e(".parallax").css({
                    "background-position": "50% 50%",
                    "background-size": "cover",
                    "background-attachment": "scroll"
                }) : e.stellar()
            },
            startNiceScroll: function() {
                e(document).ready(function() {
                    e(".gallery-scroller").niceScroll({
                        cursorcolor: "#fff",
                        cursorwidth: "0px",
                        background: "#fff",
                        cursorborder: "0px solid #1F2326",
                        zindex: "999",
                        autohidemode: !1,
                        enablemousewheel: !1,
                        touchbehavior: !0
                    })
                })
            },
            windowResize: function() {
                var t = this;
                e(window).resize(function() {
                    var a = e(window).innerWidth();
                    t.createMobileMenu(a)
                })
            },
            resizeVideos: function() {
                var t = e("iframe[src^='http://player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], object, embed"),
                    a = e(".videoEmbed");
                t.each(function() {
                    var t = e(this);
                    t.attr("data-aspectRatio", t.height() / t.width()).removeAttr("height").removeAttr("width")
                }), e(window).resize(function() {
                    var i = a.width();
                    t.each(function() {
                        var t = e(this);
                        t.width(i).height(i * t.attr("data-aspectRatio"))
                    })
                }).resize()
            },
            contactForm: function() {
                var t = this;
                e(".submit_form").on("click", function(a) {
                    a.preventDefault();
                    var i, n, o, s = e(this),
                        r = s.closest("form"),
                        l = e("input, textarea, .radio-lilac", r),
                        c = 0,
                        d = /\S+@\S+\.\S+/,
                        m = "contact",
                        u = !1,
                        h = [];
                    return l.each(function() {
                        var t = e(this);
                        "hidden" === t.attr("type") ? t.hasClass("subject") ? m += "&subject=" + t.val() : t.hasClass("fromName") || t.hasClass("fromname") ? m += "&fromname=" + t.val() : t.hasClass("fromEmail") || t.hasClass("fromemail") ? m += "&fromemail=" + t.val() : (t.hasClass("emailTo") || t.hasClass("emailto")) && (m += "&emailto=" + t.val()) : t.hasClass("required") && "" === t.val() ? (t.addClass("invalid"), u = !0) : "email" === t.attr("type") && "" !== t.val() && d.test(t.val()) === !1 ? (t.addClass("invalid"), u = !0) : "recaptcha_response_field" !== t.attr("id") && (t.removeClass("invalid"), t.hasClass("subject") ? (m += "&subject=" + t.val(), m += "&subject_label=" + t.attr("name")) : t.hasClass("fromName") || t.hasClass("fromname") ? (m += "&fromname=" + t.val(), m += "&fromname_label=" + t.attr("name")) : t.hasClass("fromEmail") || t.hasClass("fromemail") ? (m += "&fromemail=" + t.val(), m += "&fromemail_label=" + t.attr("name")) : t.hasClass("radio-lilac") ? (m += "&field" + c + "_label=" + t.data("value"), m += "&field" + c + "_value=" + e(".active", t).data("value"), c += 1) : (m += "&field" + c + "_label=" + t.attr("name"), m += "&field" + c + "_value=" + t.val(), c += 1))
                    }), m += "&len=" + c, i = function() {
                        s.width(s.width()), e("i", s).each(function() {
                            var t = e(this),
                                a = t.attr("class");
                            t.removeClass(a).addClass("fa fa-times").delay(1500).queue(function(t) {
                                e(this).removeClass("fa fa-times").addClass(a), t()
                            })
                        }), s.addClass("btn-danger").delay(1500).queue(function(t) {
                            e(this).removeClass("btn-danger"), t()
                        }), e(".form_status_message").html('<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_error_msg + "</div>")
                    }, n = function() {
                        s.width(s.width()), e("i", s).each(function() {
                            var t = e(this),
                                a = t.attr("class");
                            t.removeClass(a).addClass("fa fa-check").delay(1500).queue(function(t) {
                                e(this).removeClass("fa fa-check").addClass(a), t()
                            })
                        }), s.addClass("btn-success").delay(1500).queue(function(t) {
                            e(this).removeClass("btn-success"), t()
                        }), e(".form_status_message").html('<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + contact_form_success_msg + "</div>")
                    }, o = function() {
                        e("i", s).each(function(t) {
                            var a = e(this);
                            a.removeClass("fa fa-cog fa-spin").addClass(h[t])
                        }), s.removeClass("disabled")
                    }, u || t.sendingMail ? i() : (t.sendingMail = !0, e("i", s).each(function(t) {
                        var a = e(this);
                        h[t] = a.attr("class"), a.removeClass(h[t]).addClass("fa fa-cog fa-spin")
                    }), s.addClass("disabled"), e.ajax({
                        type: "POST",
                        url: "contact.php",
                        data: m,
                        success: function(e) {
                            o(), "ok" === e ? (n(), r[0].reset()) : i(), t.sendingMail = !1
                        },
                        error: function() {
                            o(), i(), t.sendingMail = !1
                        }
                    })), !1
                })
            },
            buttons: function() {
                var t = !0;
                e(".nav-logo, .scrollto").on("click", function(t) {
                    var a = e(this),
                        i = 0;
                    t.preventDefault(), "#home" !== a.attr("href") && (i = e(a.attr("href")).offset().top - 65), e("html, body").stop().animate({
                        scrollTop: i
                    }, 1500, "easeInOutExpo", function() {
                        a.blur()
                    })
                }), e(".bridesmaids-groomsmen-buttons .btn").on("click", function(a) {
                    a.preventDefault();
                    var i = e(this),
                        n = i.data("slider");
                    i.hasClass("active") || (e(".bridesmaids-groomsmen-slider").addClass("hide").css({
                        opacity: 0
                    }), t ? (t = !1, e("#" + n).removeClass("hide")) : e("#" + n).removeClass("hide").animate({
                        opacity: 1
                    }, 500)), e(".bridesmaids-groomsmen-buttons .btn").removeClass("active"), i.addClass("active")
                }), e(".radio-lilac button").on("click", function(t) {
                    t.preventDefault();
                    var a = e(this);
                    return a.hasClass("active") ? !1 : (a.parent().find("button").removeClass("active"), void a.addClass("active"))
                }), e(".add_button").on("click", function(t) {
                    t.preventDefault();
                    var a, i = e(this),
                        n = i.data("wrapper"),
                        o = parseInt(e("#" + n).data("count"), 10) + 1 || 1,
                        s = e("#" + i.data("input")),
                        r = s.val();
                    return "" === r ? (s.addClass("invalid"), !1) : (a = '<div class="input-group"><input type="text" class="form-control" name="' + i.data("input") + "_" + o + '" value="' + r + '" /><span class="input-group-addon"><i class="fa fa-trash"></i></span></div>', e("#" + n).data("count", o).append(a), s.val(""), void s.removeClass("invalid"))
                }), e(".add_list").on("click", ".input-group-addon", function() {
                    e(this).closest(".input-group").remove()
                })
            },
            animateElems: function() {
                if (e.browser.mobile) return !1;
                var t = function() {
                    e("[data-animation-delay]").each(function() {
                        var t = e(this),
                            a = e(window).scrollTop(),
                            i = e(window).height(),
                            n = parseInt(t.attr("data-animation-delay"), 10),
                            o = t.data("animation-direction");
                        return void 0 === o ? !1 : (t.addClass("animate-" + o), void(a + i >= t.offset().top && (isNaN(n) || 0 === n ? t.removeClass("animate-" + o).addClass("animation-" + o) : setTimeout(function() {
                            t.removeClass("animate-me").addClass("animation-" + o)
                        }, n))))
                    })
                };
                e(window).innerWidth() >= 751 && (e(window).scroll(function() {
                    t()
                }), t())
            }
        }, Lilac.init()
    })
}(jQuery);