define("hbs!views/delete-link", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="video_deletelink alert-info">\n  <div class="video_deletelink_info">\n    <strong>Temporary deletion link:</strong> \n    <span>' + r((i = null != (i = t.deleteLink || (null != e ? e.deleteLink : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "deleteLink",
                    hash: {},
                    data: a
                }) : i)) + '</span>\n  </div>\n  <div class="video_deletelink_help">\n    This link only shows up once and will expire in 30 days.\n    Save it if you want to delete this video in the future.\n    Or, add this video to a <a class="sign-up-link" \n       data-claim-video="' + r((i = null != (i = t.videoId || (null != e ? e.videoId : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "videoId",
                    hash: {},
                    data: a
                }) : i)) + '"\n       data-claim-token="' + r((i = null != (i = t.accessToken || (null != e ? e.accessToken : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "accessToken",
                    hash: {},
                    data: a
                }) : i)) + '">new account</a>.\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/delete-link", n), n
    }), define("hbs!views/mobile-play-button", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '<div class="mobile-play-button" style="background-image: url(' + r((i = null != (i = t.thumbnail || (null != e ? e.thumbnail : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "thumbnail",
                    hash: {},
                    data: a
                }) : i)) + ') ">\n    <img src="' + r((i = null != (i = t.thumbnail || (null != e ? e.thumbnail : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "thumbnail",
                    hash: {},
                    data: a
                }) : i)) + '" alt=""/>\n    <div class="play-button">\n        <span class="contents"></span>\n    </div>\n    <div class="loading-indicator"></div>\n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/mobile-play-button", n), n
    }), define("site/vjs-mobile-play", ["jquery", "videojs", "hbs!views/mobile-play-button"], function(e, t, n) {
        "use strict";
        t.plugin("vmMobilePlayButton", function(a) {
            var i = this;
            if (e("body").hasClass("device-ios") && !i.options_.vidme.youtubeOverride) {
                var o = t.Component.extend({
                    init: function(n, i) {
                        this.wrapper = e(n.el_), this.video = this.wrapper.find("video"), this.postroll = this.wrapper.find(".postroll"), this.resume = this.postroll.find("button.resume"), this.play = this.postroll.find("button.play"), this.overlay = this.postroll.find(".postroll-overlay-ad"), this.thumbnail = a.thumbnail, t.Component.call(this, n, i), this.container = e(this.el_), this.button = this.container.find(".play-button"), this.loading = this.container.find(".loading-indicator"), this.player_.on("ended", t.bind(this, this.onEnded)), this.player_.on("pause", t.bind(this, this.onPause)), this.player_.on("play", t.bind(this, this.onPlay)), this.player_.on("playing", t.bind(this, this.onPlaying)), this.player_.on("ready", t.bind(this, this.onReady));
                        var o = e(document);
                        o.on("touchend", ".device-ios .mobile-play-button", t.bind(this, this.onTouchend)), o.on("touchend", "button.play", t.bind(this, this.onTouchend)), o.on("touchend", "button.resume", t.bind(this, this.onTouchend))
                    },
                    onReady: function() {
                        this.player_.ready(function() {
                            this.video.css("left", "-5000px")
                        })
                    },
                    onPlay: function() {
                        this.play.hide(), this.resume.show(), this.overlay.show()
                    },
                    onPlaying: function() {
                        this.loading && (this.loading.hide(), this.container.css("display", "none"), this.loading = null)
                    },
                    onPause: function() {
                        this.onPlaying(), this.postroll.css("opacity", 1), this.postroll.show(), this.resume.addClass("nohover"), this.video.css("left", "-5000px")
                    },
                    onEnded: function() {
                        this.resume.hide(), this.play.show()
                    },
                    onTouchend: function(e) {
                        e.preventDefault(), this.loading && (this.loading.show(), this.button.hide()), i.play(), this.resume.removeClass("nohover")
                    },
                    createEl: function() {
                        return e(n({
                            thumbnail: this.thumbnail
                        })).get(0)
                    }
                });
                i.ready(function() {
                    var t = new o(i);
                    e(i.el_).append(t.el_)
                })
            }
        })
    }), define("site/vjs-hd", ["jquery", "videojs"], function(e, t) {
        "use strict";
        t.plugin("vmHD", function() {
            var n = this,
                a = t.Button.extend({
                    init: function(e, n) {
                        t.Button.call(this, e, n), this.el_.setAttribute("aria-label", "HD"), this.el_.setAttribute("id", "vjs-hd-button"), this.isHD = n.defaultRes && "720p" === n.defaultRes["data-res"], this.update(), this.player_.on("resolutionchange", t.bind(this, this.onResolutionChange)), this.player_.on("loadeddata", t.bind(this, this.onLoadedData))
                    }
                });
            a.prototype.kind_ = "hd", a.prototype.buttonText = "HD", a.prototype.buildCSSClass = function() {
                return "vjs-hd-button vjs-control"
            }, a.prototype.onClick = function() {
                var t = e(this.player_.el_);
                this.prevHeight = t.height(), t.css("height", this.prevHeight + "px");
                var a, i = this.player_.options_.sources;
                for (var o in i)
                    if (i.hasOwnProperty(o)) {
                        var s = i[o];
                        (this.isHD && "480p" === s["data-res"] || !this.isHD && "720p" === s["data-res"]) && (a = s)
                    }
                n.changeResolution(a), this.isHD = "720p" === a["data-res"]
            }, a.prototype.onResolutionChange = function() {
                var t = e(this.player_.el_).find(".vjs-resolutions-button .vjs-selected");
                this.isHD = "720p" === t.text(), this.update()
            }, a.prototype.onLoadedData = function() {
                this.prevHeight && (e(this.player_.el_).css("height", ""), this.prevHeight = void 0)
            }, a.prototype.update = function() {
                this.isHD ? e(this.el_).addClass("vjs-selected") : e(this.el_).removeClass("vjs-selected")
            }, n.ready(function() {
                if (!(n.options_.sources.length <= 1)) {
                    var t = n.resolutions_.selectSource(n.options_.sources),
                        i = new a(n, {
                            defaultRes: t
                        });
                    n.controlBar.addChild(i), e(n.el_).find(".vjs-resolutions-button").hide()
                }
            })
        })
    }), define("site/vjs-branding", ["jquery", "videojs"], function(e, t) {
        "use strict";
        t.plugin("vmBranding", function() {
            var n = this,
                a = t.Button.extend({
                    init: function(e, n) {
                        this.url = e.options_.vidme.url, t.Button.call(this, e, n), this.el_.setAttribute("aria-label", "vidme"), this.el_.setAttribute("id", "embed_branding")
                    }
                });
            a.prototype.kind_ = "vidme", a.prototype.buttonText = "vidme", a.prototype.buildCSSClass = function() {
                return "vjs-branding-button vjs-control"
            }, a.prototype.createEl = function() {
                var t = e("<div><a><img><span></span></a></div>");
                return t.find("a").attr("href", this.url).attr("target", "_blank"), t.find("img").attr("src", window.cdn + "/images/logo60.png?" + window.cdnCounter).attr("alt", ""), t.find("span").text("vidme"), t.on("click", function() {
                    n.pause()
                }), t[0]
            }, n.ready(function() {
                if (!(window.location + "").match(/internal/)) {
                    var e = new a(n);
                    n.controlBar.addChild(e)
                }
            })
        })
    }), define("helpers/ifcmp", ["handlebars"], function(e) {
        "use strict";

        function t(e, t, n) {
            var a;
            switch (t) {
                case "==":
                    a = e == n;
                    break;
                case "===":
                    a = e === n;
                    break;
                case "!=":
                    a = e != n;
                    break;
                case "!==":
                    a = e !== n;
                    break;
                case ">":
                    a = e > n;
                    break;
                case ">=":
                    a = e >= n;
                    break;
                case "<":
                    a = n > e;
                    break;
                case "<=":
                    a = n >= e;
                    break;
                case "&&":
                    a = e && n;
                    break;
                case "||":
                    a = e || n
            }
            return a
        }

        function n(e, n, a, i) {
            return t(e, n, a) ? i.fn(this) : i.inverse(this)
        }
        return e.registerHelper("ifcmp", n), {
            cmp: t
        }
    }), define("helpers/numberFormat", ["handlebars", "phpjs"], function(e, t) {
        "use strict";

        function n(e) {
            return t.number_format(e)
        }
        return e.registerHelper("numberFormat", n), n
    }), define("helpers/plural", ["handlebars"], function(e) {
        "use strict";

        function t(e, t, n) {
            return 1 === parseInt(e) ? t : n
        }
        return e.registerHelper("plural", t), t
    }), define("hbs!views/vjs-stats", ["hbs", "handlebars", "helpers/ifcmp", "helpers/numberFormat", "helpers/plural"], function(e, t) {
        var n = t.template({
            1: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '        <a href="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '" target="_blank"><span>' + r((t.numberFormat || e && e.numberFormat || s).call(e, null != e ? e.viewCount : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + " " + r((t.plural || e && e.plural || s).call(e, null != e ? e.viewCount : e, "play", "plays", {
                    name: "plural",
                    hash: {},
                    data: a
                })) + "</span></a>\n"
            },
            3: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '        <a href="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '" target="_blank"><span>' + r((t.numberFormat || e && e.numberFormat || s).call(e, null != e ? e.watchingCount : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + " " + r((t.plural || e && e.plural || s).call(e, null != e ? e.watchingCount : e, "watching", "watching", {
                    name: "plural",
                    hash: {},
                    data: a
                })) + "</span></a>\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = "\n<div>\n";
                return i = (t.ifcmp || e && e.ifcmp || o).call(e, null != e ? e.viewCount : e, ">", 1, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), i = (t.ifcmp || e && e.ifcmp || o).call(e, null != e ? e.watchingCount : e, ">", 1, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(3, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), s + "</div>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/vjs-stats", n), n
    }), define("site/vjs-stats", ["jquery", "videojs", "hbs!views/vjs-stats"], function(e, t, n) {
        "use strict";
        t.plugin("vmStats", function() {
            var a = this,
                i = t.Button.extend({
                    init: function(e, n) {
                        t.Button.call(this, e, n), this.el_.setAttribute("aria-label", "stats"), this.el_.setAttribute("id", "embed_stats")
                    }
                });
            i.prototype.kind_ = "stats", i.prototype.buttonText = "stats", i.prototype.buildCSSClass = function() {
                return "vjs-stats-button vjs-control"
            }, i.prototype.createEl = function() {
                var t = e(n({
                    url: a.options_["data-video-url"],
                    viewCount: parseInt(a.options_["data-view-count"]) || 0,
                    watchingCount: parseInt(a.options_["data-watching-count"]) || 0
                }));
                return t.on("click", "a", function() {
                    a.pause()
                }), t[0]
            }, a.ready(function() {
                if ((window.location.href + "").match(/stats/)) {
                    var e = new i(a);
                    a.controlBar.addChild(e)
                }
            })
        })
    }), define("hbs!views/vjs-tools", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div>\n  <a href="' + r((i = null != (i = t.clipUrl || (null != e ? e.clipUrl : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "clipUrl",
                    hash: {},
                    data: a
                }) : i)) + '" data-toggle="tooltip" data-placement="top" title="Make a clip" target="_blank">\n    <i class="fa fa-scissors"></i>\n  </a>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/vjs-tools", n), n
    }), define("site/vjs-tools", ["jquery", "videojs", "hbs!views/vjs-tools"], function(e, t, n) {
        "use strict";
        t.plugin("vmTools", function() {
            function a() {
                if (!("localhost:3000" == window.location.hostname && Math.round(100 * Math.random()) > 10)) {
                    {
                        e(event.target)
                    }
                    mixpanel.track("Make a clip button clicked in embed player (10%)", {
                        "Video ID": i.options_["data-video"],
                        "Video URL": i.options_["data-video-url"]
                    })
                }
            }
            var i = this,
                o = t.Button.extend({
                    init: function(e, n) {
                        t.Button.call(this, e, n), this.el_.setAttribute("aria-label", "tools"), this.el_.setAttribute("id", "embed_tools")
                    }
                });
            o.prototype.kind_ = "tools", o.prototype.buttonText = "tools", o.prototype.buildCSSClass = function() {
                return "vjs-tools-button vjs-control"
            }, o.prototype.createEl = function() {
                var t = e(n({
                    clipUrl: "clip?video=" + i.options_["data-video"]
                }));
                return t.on("click", "a", function() {
                    a(), i.pause()
                }), t[0]
            }, i.ready(function() {
                if ((window.location + "").match(/tools/)) {
                    var e = new o(i);
                    i.controlBar.addChild(e)
                }
            })
        })
    }), define("lib/fit-outside", [], function() {
        "use strict";

        function e(e, t, n, a, i) {
            if (void 0 === i && (i = !0), 0 >= t || 0 >= e || 0 >= n || 0 >= a) return [0, 0];
            var o = n / e,
                s = a / t,
                r = s > o ? s : o;
            return r > 1 && !i ? [Math.round(e), Math.round(t)] : (t *= r, e *= r, [Math.round(e), Math.round(t)])
        }
        return e
    }), define("helpers/videoThumbnail", ["handlebars", "phpjs"], function(e, t) {
        "use strict";

        function n(e) {
            return Math.ceil(parseFloat(e.duration) / 60)
        }

        function a(e, a) {
            var i;
            if ("object" == typeof a && (a = void 0), !a && e.thumbnail) i = e.thumbnail;
            else {
                a || (a = 2);
                var o = n(e);
                a = Math.max(1, Math.min(a, o)), i = "videos/" + e.video_id + "-" + t.str_pad(a, 5, "0", "STR_PAD_LEFT") + ".png"
            }
            return cdnStorage + "/" + i.replace(cdnStorage + "/", "")
        }
        return e.registerHelper("videoThumbnail", a), a
    }), define("helpers/videoBox", ["jquery", "handlebars", "lib/fit-outside", "helpers/videoThumbnail"], function(e, t, n, a) {
        "use strict";

        function i(i, o, s, r) {
            if (!i || !i.width || !i.height) return "";
            "object" == typeof o ? (o = 300, s = 170) : (o = parseInt(o), s = parseInt(s));
            var l = n(i.width, i.height, o, s, !0),
                d = -1 * Math.round(l[0] > o ? (l[0] - o) / 2 : 0),
                c = -1 * Math.round(l[1] > s ? (l[1] - s) / 2 : 0),
                u = a(i),
                p = '<img src="' + e("<span>").text(u).html() + '" alt="" width="' + l[0] + '" height="' + l[1] + '" style="margin-left:' + d + "px; margin-top:" + c + 'px" class="' + (r ? "visible-phone" : "hidden-phone") + '">';
            return new t.SafeString(p)
        }
        return t.registerHelper("videoBox", i), i
    }), define("hbs!views/postroll", ["hbs", "handlebars", "helpers/videoBox"], function(e, t) {
        var n = t.template({
            1: function(e, t, n, a) {
                var i;
                return i = t["if"].call(e, null != (i = null != e ? e.upnext : e) ? i.thumbnail : i, {
                    name: "if",
                    hash: {},
                    fn: this.program(2, a),
                    inverse: this.noop,
                    data: a
                }), null != i ? i : ""
            },
            2: function() {
                return " has-upnext"
            },
            4: function(e) {
                var t, n = this.lambda,
                    a = this.escapeExpression;
                return '      <div class="postroll-overlay-ad device-mobile" style="display:none;">\n          <a href="' + a(n(null != (t = null != e ? e.ad : e) ? t.link : t, e)) + '" class="postroll-overlay-ad-link">\n            ' + a(n(null != (t = null != e ? e.ad : e) ? t.text : t, e)) + "\n          </a>\n      </div>\n"
            },
            6: function(e, t, n, a) {
                var i, o = "";
                return i = t["if"].call(e, null != (i = null != e ? e.upnext : e) ? i.thumbnail : i, {
                    name: "if",
                    hash: {},
                    fn: this.program(7, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (o += i), o
            },
            7: function(e, t, n, a) {
                var i, o = this.lambda,
                    s = this.escapeExpression,
                    r = t.helperMissing,
                    l = '      <div class="postroll_upnext play">\n        <div class="postroll_upnext_label">Up next</div>\n        <a class="postroll_upnext_thumb" href="' + s(o(null != (i = null != e ? e.upnext : e) ? i.url : i, e)) + '" ';
                return i = t.unless.call(e, null != e ? e.viewpage : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(8, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (l += i), l += ">\n          ", i = t["if"].call(e, null != (i = null != e ? e.upnext : e) ? i.title : i, {
                    name: "if",
                    hash: {},
                    fn: this.program(10, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (l += i), l + '\n          <span class="postroll_upnext_play"></span>\n          ' + s((t.videoBox || e && e.videoBox || r).call(e, null != e ? e.upnext : e, 350, 204, !1, {
                    name: "videoBox",
                    hash: {},
                    data: a
                })) + "\n          " + s((t.videoBox || e && e.videoBox || r).call(e, null != e ? e.upnext : e, 120, 85, !0, {
                    name: "videoBox",
                    hash: {},
                    data: a
                })) + ' \n        </a>\n      </div>\n      <div class="postroll_logo go-home in-embed">\n        <span class="go-home"></span>\n      </div>\n'
            },
            8: function() {
                return 'target="_blank"'
            },
            10: function(e) {
                var t, n = this.lambda,
                    a = this.escapeExpression;
                return '<span class="postroll_upnext_title">' + a(n(null != (t = null != e ? e.upnext : e) ? t.title : t, e)) + " </span>"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = '<div class="postroll">\n        <div class="inner play';
                return i = t.unless.call(e, null != e ? e.internal : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (o += i), o += '">\n\n    <button class="btn resume in-embed" style="display:none">\n      <i class="fa fa-play resume"></i>\n      <span class="resume">Resume</span>\n    </button>\n      <button class="btn play in-embed">\n      <i class="fa fa-refresh play"></i>\n      <span class="play">Play again</span>\n    </button>\n    <button class="btn js-embed-share in-embed">\n      <i class="fa fa-share-alt"></i>\n      <span>Share video</span>\n    </button>\n', i = t["if"].call(e, null != e ? e.ad : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(4, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (o += i), i = t.unless.call(e, null != e ? e.internal : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(6, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (o += i), o + "  </div>\n</div>"
            },
            useData: !0
        });
        return t.registerPartial("views/postroll", n), n
    }), define("site/vjs-postroll", ["jquery", "videojs", "hbs!views/postroll"], function(e, t, n) {
        "use strict";
        t.plugin("vmPostRoll", function(a) {
            var i = this;
            a = a || {};
            var o = t.Component.extend({
                init: function(n, a) {
                    this.videoUrl = n.options_.vidme.url, this.videoThumb = n.options_.vidme.thumb, this.videoTitle = n.options_.vidme.title, this.youtubeOverride = n.options_.vidme.youtubeOverride, t.Component.call(this, n, a), e("body").hasClass("device-ios") || (this.player_.on("ended", t.bind(this, this.onEnded)), this.player_.on("timeupdate", t.bind(this, this.onTimeUpdate)), this.player_.on("play", t.bind(this, this.onPlay)), e(this.el_).on("click", t.bind(this, this.onClick)))
                }
            });
            o.prototype.onEnded = function() {
                if (!this.youtubeOverride) {
                    var t = this.player_.options();
                    if (this.player_.loop()) return;
                    if (t.hasOwnProperty("loop") && t.loop === !0) return
                }
                e(this.el_).css("opacity", "0").css("display", "block").animate({
                    opacity: 1
                }, 10)
            }, o.prototype.onTimeUpdate = function() {
                e(this.el_).hide().css("opacity", 0)
            }, o.prototype.onPlay = function() {
                e(this.el_).hide().css("opacity", 0)
            }, o.prototype.createEl = function() {
                var t;
                a.hasOwnProperty("nextVideo") && (t = a.nextVideo);
                var i = -1 !== ("" + window.location).indexOf("internal"),
                    o = -1 === ("" + window.location).indexOf("/e/") && !i,
                    s = e(n({
                        title: this.videoTitle,
                        thumb: this.videoThumb,
                        url: this.videoUrl,
                        upnext: t,
                        ad: this.createAd(),
                        internal: i,
                        viewpage: o
                    }));
                return s[0]
            }, o.prototype.onClick = function(t) {
                var n = e(t.target);
                n.hasClass("go-home") ? (setTimeout(function() {
                    (window.location + "").match(/\/e\//) ? window.open("https://localhost:3000") : window.location.href = "/"
                }, 50), ga("send", "event", "Videos", "postRollSeeMore", "Post roll see more clicked", 1)) : ("postroll" === n.attr("class") || n.hasClass("play")) && this.player_.play()
            }, o.prototype.createAd = function() {
                var t;
                return e(".overlay-ad").has("a").each(function() {
                    var n = e(this).find("a");
                    t = {
                        link: n.prop("href"),
                        text: n.text()
                    }
                }), t
            }, i.ready(function() {
                if (!i.options_.vidme.isGif) {
                    var t = new o(i);
                    e(i.el_).append(t.el_)
                }
            })
        })
    }), define("loaders", ["underscore", "jquery", "async"], function(e, t, n) {
        "use strict";

        function a(e, n) {
            function a(e) {
                t(i).remove(), i = null, n(e)
            }
            var i = new Image;
            i.onload = a, i.onerror = a, i.src = e
        }

        function i(e, n) {
            function a(e) {
                t(i).remove(), i = null, n(e)
            }
            var i;
            try {
                i = new Video
            } catch (o) {
                i = document.createElement("video")
            }
            i.addEventListener("canplaythrough", a, !0), i.onerror = a, i.src = e, i.load()
        }

        function o(t, i, o) {
            var s = [];
            e.each(t, function(e) {
                s.push(function(t) {
                    a(e, function(e) {
                        o && o(e), t(void 0, e)
                    })
                })
            }), n.series(s, function(e, t) {
                i && i(t)
            })
        }

        function s(t, a, o) {
            var s = [];
            e.each(t, function(e) {
                s.push(function(t) {
                    i(e, function(e) {
                        o && o(e), t(void 0, e)
                    })
                })
            }), n.series(s, function(e, t) {
                a && a(t)
            })
        }
        return {
            loadImage: a,
            loadImages: o,
            loadVideo: i,
            loadVideos: s
        }
    }), define("site/vjs-scrub-preview", ["jquery", "loaders", "videojs"], function(e, t, n) {
        "use strict";
        var a = 1,
            i = 10,
            o = 10,
            s = i * o,
            r = 80,
            l = 80;
        n.plugin("vmScrubPreview", function() {
            var d = this,
                c = [],
                u = [],
                p = n.Component.extend({
                    controlBarThreshold: 50,
                    name: "ScrubPreview",
                    previewMargin: 20,
                    previewPadding: 3,
                    imageError: !1,
                    init: function(t, i) {
                        n.Component.call(this, t, i), this.$player = e(t.el_), this.$controlBar = e(t.controlBar.el_), this.videoDuration = t.duration() || parseFloat(t.options_.vidme.duration) || void 0, this.videoHeight = t.options_.vidme.height, this.videoId = t.options_.vidme.video_id, this.videoWidth = t.options_.vidme.width, this.videoVersion = t.options_.vidme.version, this.videoStoryboard = t.options_.vidme.storyboard, this.videoStoryboard && (this.videoImageNum = Math.ceil(this.videoDuration * a) + 2, this.videoStoryBoardNum = Math.ceil(this.videoImageNum / s), this.initVideo(i), this.detectPreviewSize(), this.initPreview(), this.initControlBar(), this.preloadUrl(cdn + "/images/loading.gif"), this.preloadPreviewAtTime(.001, function(n) {
                            this.error || null !== n || (e(window).on("mousemove", this.onMouseMove.bind(this)), e(window).on("resize", this.onWindowResize.bind(this)), t.on("seeking", this.onSeeking.bind(this)))
                        }.bind(this)))
                    },
                    initControlBar: function() {
                        this.controlBarOffsetX = this.$controlBar.offset().left, this.controlBarOffsetY = this.$controlBar.offset().top, this.controlBarHeight = this.$controlBar.height(), this.controlBarWidth = this.$controlBar.width()
                    },
                    initPreview: function() {
                        this.$preview = e('<div id="video_player_scrub_preview"></div>').css("position", "absolute").css("z-index", "99999").css("display", "none"), this.$previewInner = e('<div id="video_player_scrub_preview_inner">').css("width", this.previewWidth + "px").css("height", this.previewHeight + "px"), this.$preview.append(this.$previewInner), this.$player.append(this.$preview)
                    },
                    initVideo: function() {
                        isNaN(this.videoDuration) || isNaN(this.videoHeight) || isNaN(this.videoWidth) ? this.error = "invalid duration, height, or width" : isNaN(this.videoVersion) || this.videoVersion < 3 || isNaN(this.videoId) ? this.error = "invalid version or video ID" : this.videoDuration < 60 && (this.error = "video is too short")
                    },
                    calcAtTime: function(e) {
                        var t = e / this.videoDuration,
                            n = Math.ceil(t * this.videoImageNum) + 2;
                        0 >= n ? n = 1 : n > this.videoImageNum && (n = this.videoImageNum);
                        var a = Math.floor(e / s) + 1,
                            r = n - (a - 1) * s,
                            l = r - 1,
                            d = Math.floor(l / i),
                            c = l - d * o,
                            u = 1 >= a ? void 0 : a - 1,
                            p = a > this.videoStoryboardNum ? void 0 : a + 1;
                        return {
                            url: this.makeUrl(a),
                            prevUrl: u ? this.makeUrl(u) : void 0,
                            nextUrl: p ? this.makeUrl(p) : void 0,
                            imageOffsetX: -c * this.previewWidth,
                            imageOffsetY: -d * this.previewHeight
                        }
                    },
                    detectPreviewSize: function() {
                        var e = this.videoWidth,
                            t = this.videoHeight;
                        e > r && (t = t * r / e, e = r), t > l && (e = e * l / t, t = l), this.previewHeight = Math.round(t), this.previewWidth = Math.round(e)
                    },
                    makeUrl: function(e) {
                        var t = (10 > e ? "0" : "") + e;
                        return this.videoStoryboard.replace(/\{\d+\}/, t)
                    },
                    onMouseMove: function(t) {
                        this.clientX = t.clientX, this.clientY = t.clientY, this.initControlBar(), this.hidden = !e(t.target).hasClass("vjs-progress-control") && e(t.target).parents(".vjs-progress-control").length <= 0, this.hidden && this.$preview.css("display", "none");
                        var n = Math.abs(this.controlBarOffsetY - this.clientY);
                        this.controlBarFraction = (this.clientX - this.controlBarOffsetX) / this.controlBarWidth, this.controlBarFraction < 0 ? this.controlBarFraction = 0 : this.controlBarFraction > 1 && (this.controlBarFraction = 1), this.previewBottom = Math.round(this.controlBarHeight + 20), this.previewLeft = Math.round(this.clientX - this.controlBarOffsetX - (this.previewWidth + this.previewPadding) / 2), this.previewLeft < this.previewMargin ? this.previewLeft = this.previewMargin : this.previewLeft > this.controlBarWidth - this.previewWidth - this.previewMargin - 2 * this.previewPadding && (this.previewLeft = this.controlBarWidth - this.previewWidth - this.previewMargin), this.previewTime = this.videoDuration * this.controlBarFraction, this.hidden ? 300 >= n && this.preloadPreviewAtTime(this.previewTime) : this.showPreviewAtTime(this.previewTime)
                    },
                    onSeeking: function() {
                        !this.hidden && this.clientX && this.showPreviewAtTime(d.currentTime())
                    },
                    onWindowResize: function() {
                        this.initControlBar()
                    },
                    preloadPreviewAtTime: function(e, t) {
                        var n = this.calcAtTime(e);
                        this.preloadUrl(n.url, t)
                    },
                    preloadUrl: function(e, n) {
                        e && -1 === c.indexOf(e) && (c.push(e), t.loadImage(e, function(t) {
                            "error" !== t.type && (u.push(e), t = null), "function" == typeof n && n(t)
                        }))
                    },
                    showPreviewAtTime: function(e) {
                        var t = this.calcAtTime(e); - 1 === u.indexOf(t.url) ? this.$previewInner.css("background-image", "url(" + cdn + "/images/loading.gif)").css("background-position", "50% 50%").css("opacity", ".35") : this.$previewInner.css("opacity", "1").css("background-image", "url(" + t.url + ")").css("background-position", t.imageOffsetX + "px " + t.imageOffsetY + "px"), this.$previewInner.css("background-repeat", "no-repeat"), this.$preview.css("bottom", this.previewBottom + "px").css("left", this.previewLeft + "px").css("display", ""), this.preloadUrl(t.prevUrl), this.preloadUrl(t.nextUrl)
                    }
                });
            d.ready(function() {
                d.scrubePreview = new p(d)
            })
        })
    }),
    function(e) {
        e("crosstab", ["require", "exports", "module"], function(e, t, n) {
            "use strict";

            function a() {
                if (!M.supported) {
                    var e = "crosstab not supported",
                        t = [];
                    throw _ || t.push("localStorage not availabe"), window.addEventListener || t.push("addEventListener not available"), x && t.push("mobile browser"), T && t.push("frozen tab environment detected"), j || t.push("localStorage.setItem not allowed"), t.length > 0 && (e += ": " + t.join(", ")), new Error(e)
                }
            }

            function i(e) {
                {
                    var t;
                    M.supported
                }
                try {
                    t = e.newValue ? JSON.parse(e.newValue) : {}
                } catch (n) {
                    t = {}
                }
                if (t.id && t.id !== M.id && (e.newValue !== I || e.oldValue !== P))
                    if (I = e.newValue, P = e.oldValue, e.key === S.keys.MESSAGE_KEY) {
                        var a = t.data;
                        a.destination && a.destination !== M.id || E.emit(a.event, a)
                    } else e.key === S.keys.FROZEN_TAB_ENVIRONMENT ? (T = t.data, M.supported = M.supported && !t.data) : e.key === S.keys.SUPPORTED_KEY && (M.supported = M.supported && t.data)
            }

            function o(e, t) {
                var n = {
                    id: M.id,
                    data: t,
                    timestamp: S.now()
                };
                _.setItem(e, JSON.stringify(n))
            }

            function s(e) {
                var t = r(e);
                return t.data
            }

            function r(e) {
                var t = _ ? _.getItem(e) : null,
                    n = t ? JSON.parse(t) : {};
                return n
            }

            function l() {
                M.stopKeepalive = !0;
                var e = 0;
                S.forEach(S.tabs, function(t, n) {
                    n !== S.keys.MASTER_TAB && e++
                }), 1 === e ? (S.tabs = {}, b()) : m(S.eventTypes.tabClosed, M.id), S.events.destructor()
            }

            function d() {
                return S.tabs[S.keys.MASTER_TAB]
            }

            function c(e) {
                S.tabs[S.keys.MASTER_TAB] = e
            }

            function u() {
                delete S.tabs[S.keys.MASTER_TAB]
            }

            function p() {
                var e = null;
                S.forEach(S.tabs, function(t) {
                    (!e || t.id < e) && (e = t.id)
                }), e === M.id ? m(S.eventTypes.tabPromoted, M.id) : c({
                    id: e,
                    lastUpdated: S.now()
                })
            }

            function h(e, t, n) {
                n = n || "0";
                var a = e.toString();
                return a.length >= t ? a : new Array(t - a.length + 1).join(n) + a
            }

            function m(e, t, n) {
                M.supported || a();
                var i = {
                    id: S.generateId(),
                    event: e,
                    data: t,
                    destination: n,
                    origin: M.id,
                    timestamp: S.now()
                };
                i.destination !== i.origin && o(S.keys.MESSAGE_KEY, i), i.destination && i.destination !== i.origin || E.emit(e, i)
            }

            function v(e, t) {
                m(e, t, d().id)
            }

            function f() {
                M.supported = !1, T = !0, o(S.keys.FROZEN_TAB_ENVIRONMENT, !0), o(S.keys.SUPPORTED_KEY, !1)
            }

            function g() {
                var e = s(S.keys.TABS_KEY);
                return S.tabs = e || S.tabs || {}, S.tabs
            }

            function b() {
                o(S.keys.TABS_KEY, S.tabs)
            }

            function w() {
                function e(e) {
                    return n - e.lastUpdated < L
                }

                function t(t, n) {
                    return n !== S.keys.MASTER_TAB && !e(t)
                }
                var n = S.now(),
                    a = {
                        id: M.id,
                        lastUpdated: n
                    };
                m(S.eventTypes.tabUpdated, a);
                var i = S.filter(S.tabs, t);
                if (S.forEach(i, function(e) {
                        m(S.eventTypes.tabClosed, e.id)
                    }), !U) {
                    var s = M.util.tabs[M.util.keys.MASTER_TAB];
                    if (s && s.id !== a.id) {
                        var r, l;
                        M.util.events.once("PONG", function() {
                            U || (clearTimeout(r), o(S.keys.SUPPORTED_KEY, !0), o(S.keys.FROZEN_TAB_ENVIRONMENT, !1), S.events.emit("setupComplete"))
                        }), l = S.now();
                        var d = function(e) {
                                var t = S.now() - l;
                                U || (0 >= e && t > R ? (f(), S.events.emit("setupComplete")) : r = setTimeout(function() {
                                    d(e - 1)
                                }, 5))
                            },
                            c = 5;
                        r = setTimeout(function() {
                            d(5)
                        }, R - 5 * c), M.broadcastMaster("PING")
                    } else s && s.id === a.id && S.events.emit("setupComplete")
                }
            }

            function y() {
                M.supported && !M.stopKeepalive && (w(), window.setTimeout(y, A))
            }
            var _, k = navigator.userAgent || navigator.vendor || window.opera,
                x = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(k) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(k.substr(0, 4));
            try {
                _ = window.localStorage, _ = window["ie-eventlistener/storage"] || window.localStorage
            } catch (C) {}
            var j = !0;
            try {
                _.setItem("__crosstab", ""), _.removeItem("__crosstab")
            } catch (C) {
                j = !1
            } {
                var T = !1,
                    S = {
                        keys: {
                            MESSAGE_KEY: "crosstab.MESSAGE_KEY",
                            TABS_KEY: "crosstab.TABS_KEY",
                            MASTER_TAB: "MASTER_TAB",
                            SUPPORTED_KEY: "crosstab.SUPPORTED",
                            FROZEN_TAB_ENVIRONMENT: "crosstab.FROZEN_TAB_ENVIRONMENT"
                        }
                    };
                Object.prototype.toString
            }
            S.isArray = Array.isArray || function(e) {
                return e instanceof Array
            }, S.isNumber = function(e) {
                return "number" == typeof e
            }, S.isFunction = function(e) {
                return "function" == typeof e
            }, S.forEachObj = function(e, t) {
                for (var n in e) e.hasOwnProperty(n) && t.call(e, e[n], n)
            }, S.forEachArr = function(e, t) {
                for (var n = e.length, a = 0; n > a; a++) t.call(e, e[a], a, e)
            }, S.forEach = function(e, t) {
                S.isArray(e) ? S.forEachArr(e, t) : S.forEachObj(e, t)
            }, S.map = function(e, t) {
                var n = [];
                return S.forEach(e, function(e) {
                    n.push(t(e))
                }), n
            }, S.filter = function(e, t) {
                var n = S.isArray(e),
                    a = n ? [] : {};
                return n ? S.forEachArr(e, function(e, n) {
                    t(e, n) && a.push(e)
                }) : S.forEachObj(e, function(e, n) {
                    t(e, n) && (a[n] = e)
                }), a
            }, S.now = function() {
                return (new Date).getTime()
            }, S.tabs = g(), S.eventTypes = {
                becomeMaster: "becomeMaster",
                tabUpdated: "tabUpdated",
                tabClosed: "tabClosed",
                tabPromoted: "tabPromoted"
            }, S.createEventHandler = function() {
                var e = {},
                    t = {},
                    n = function(e, n) {
                        var a;
                        return t[e] && (a = t[e][n]), a
                    },
                    a = function(t, n) {
                        var a = -1,
                            i = e[t];
                        if (i && n)
                            for (var o = i.length || 0, s = 0; o > s; s++)
                                if (i[s] === n) {
                                    a = s;
                                    break
                                }
                        return a
                    },
                    i = function(e, i, o) {
                        var s, r = d(e),
                            l = n(e, o);
                        return void 0 === l ? (s = r.length, r[s] = i, t[e] || (t[e] = {}), o && (t[e][o] = i)) : (s = a(e, l), r[s] = i), o || i
                    },
                    o = function(i, o) {
                        var s = S.isFunction(o) ? o : n(i, o),
                            r = a(i, s);
                        return -1 === r ? !1 : e[i] && e[i][r] ? (e[i].splice(r, 1), delete t[i][o], !0) : !1
                    },
                    s = function(n) {
                        var a = !1;
                        return n ? (e[n] && (delete e[n], a = !0), t[n] && (delete t[n], a = a && !0)) : (e = {}, t = {}, a = !0), a
                    },
                    r = function(e) {
                        var t = Array.prototype.slice.call(arguments, 1),
                            n = d(e);
                        S.forEach(n, function(e) {
                            S.isFunction(e) && e.apply(this, t)
                        })
                    },
                    l = function(e, t, a) {
                        for (; !a || void 0 !== n(e, a);) a = S.generateId();
                        return i(e, function() {
                            o(e, a);
                            var n = Array.prototype.slice.call(arguments);
                            t.apply(this, n)
                        }, a), a
                    },
                    d = function(t) {
                        var n = e[t] = e[t] || [];
                        return n
                    },
                    c = function() {
                        s()
                    };
                return {
                    addListener: i,
                    destructor: c,
                    on: i,
                    off: function(e, t) {
                        var n = arguments.length;
                        return n ? 1 === n ? s(e) : o(e, t) : s()
                    },
                    once: l,
                    emit: r,
                    listeners: d,
                    removeListener: o,
                    removeAllListeners: s
                }
            };
            var E = S.createEventHandler();
            S.events = {
                addListener: E.addListener,
                on: E.on,
                off: E.off,
                once: E.once,
                emit: E.emit,
                listeners: E.listeners,
                removeListener: E.removeListener,
                removeAllListeners: E.removeAllListeners,
                destructor: E.destructor
            };
            var I, P;
            E.addListener(S.eventTypes.tabClosed, function(e) {
                var t = e.data;
                S.tabs[t] && delete S.tabs[t], d() && d().id !== t ? d().id === M.id && b() : (d() && u(), p())
            }), E.addListener(S.eventTypes.tabUpdated, function(e) {
                var t = e.data;
                S.tabs[t.id] = t, d() || p(), d().id === t.id && c(t), d().id === M.id && b()
            }), E.addListener(S.eventTypes.tabPromoted, function(e) {
                var t = e.data,
                    n = e.timestamp;
                c({
                    id: t,
                    lastUpdated: n
                }), M.id === t && (b(), S.events.emit(S.eventTypes.becomeMaster))
            }), S.generateId = function() {
                return S.now().toString() + h(2147483647 * Math.random() | 0, 10)
            };
            var U = !1;
            S.events.once("setupComplete", function() {
                U = !0
            });
            var M = function(e) {
                U ? e() : S.events.once("setupComplete", e)
            };
            if (M.id = S.generateId(), M.supported = !!_ && window.addEventListener && !x && j, M.util = S, M.broadcast = m, M.broadcastMaster = v, M.on = S.events.on, M.once = S.events.once, M.off = S.events.off, !U && M.supported) {
                var D = r(S.keys.FROZEN_TAB_ENVIRONMENT),
                    O = D.data;
                O === !0 && f();
                var V = r(S.keys.SUPPORTED_KEY),
                    N = V.data;
                (N === !1 || N === !0) && (M.supported = N, S.events.emit("setupComplete"))
            }
            var A = 3e3,
                L = 5e3,
                R = 500;
            M.supported ? (window.addEventListener("storage", i, !1), window.addEventListener("unload", l, !1), S.events.on("PING", function(e) {
                e.destination && e.destination === M.id && S.now() - e.timestamp < R && M.broadcast("PONG", null, e.origin)
            }), y()) : M.broadcast = a, n.exports = M
        })
    }("function" == typeof define && define.amd ? define : function(e) {
        "use strict";
        return "object" == typeof module ? function(e, t) {
            t(require, exports, module)
        } : function(t, n) {
            var a = {
                    exports: {}
                },
                i = function(t) {
                    return "jquery" === t && (t = "jQuery"), e[t]
                };
            n(i, a.exports, a), e[t] = a.exports
        }
    }(this)), define("helpers/secondsToHms", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            e = parseInt(e);
            var t = Math.floor(e / 3600),
                n = Math.floor(e / 60) % 60,
                a = e % 60;
            return t > 0 ? t + ":" + (10 > n ? "0" + n : n) + ":" + (10 > a ? "0" + a : a) : n + ":" + (10 > a ? "0" + a : a)
        }
        return e.registerHelper("secondsToHms", t), t
    }), define("site/vjs-misc", ["jquery", "videojs", "embedly-playerjs", "crosstab", "helpers/secondsToHms"], function(e, t, n, a, i) {
        "use strict";

        function o(e, t, n, a, i) {
            if (e = parseInt(e), t = parseInt(t), n = parseInt(n), a = parseInt(a), 0 >= t || 0 >= e || 0 >= n || 0 >= a) throw new Error("Invalid input dimensions");
            if (i) {
                var o = Math.min(n / e, a / t);
                o > 1 && (t *= o, e *= o)
            }
            var s;
            return (s = n / e) < 1 && (t = Math.round(t * s), e = Math.round(e * s)), (s = a / t) < 1 && (t = Math.round(t * s), e = Math.round(e * s)), [parseInt(e), parseInt(t)]
        }
        t.plugin("vmFlashError", function(t) {
            var n = this;
            if (n.options_.isDesktop && "Flash" !== n.techName && n.techName) {
                var a, i = 2e3,
                    o = 'Adobe Flash is required to play this video. Please enable or <a href="https://get.adobe.com/flashplayer/">install Flash</a> and try again.',
                    s = e(t.after),
                    r = !1;
                n.ready(function() {
                    var t = n.error();
                    return t && 4 === t.code ? void e(".vjs-error-display").hide() : (r = !0, void(a && (a.remove(), a = void 0)))
                }), setTimeout(function() {
                    r || (a = e('<div class="alert alert-warning" style="text-align: center"></div>').html(o).insertAfter(s))
                }, i)
            }
        }), t.plugin("vmFlashSizingHack", function() {
            function t() {
                r = e(window).width(), l = e(window).height(), d = e(".player").offset().top, c = e(".video_info").height() + parseInt(e(".video_info").css("paddingTop")) + parseInt(e(".video_info").css("paddingBottom")) + 20, u = r > 767 ? 350 : 200, n()
            }

            function n() {
                var t = e(".player").width(),
                    n = l - d - c;
                try {
                    var r = o(i, s, t, n, !0),
                        p = Math.max(u, r[1]),
                        h = e(a.tech.el_);
                    h.is("object") || (h = e("object").first()), e(a.el_).hasClass("vjs-fullscreen") ? (console.log("ARGHGGG", a.el_), h.height("").width("")) : h.height(p + "px")
                } catch (m) {
                    try {
                        console.log(m)
                    } catch (m) {}
                }
            }
            var a = this;
            if (a.options_.isDesktop) {
                var i = a.options_.vidme.width,
                    s = a.options_.vidme.height;
                if ("Flash" === a.techName && i && s) {
                    var r, l, d, c, u;
                    e(window).on("resize", t), a.on("play", t), a.on("fullscreenchange", t), t(), a.ready(function() {
                        t()
                    })
                }
            }
        }), t.plugin("vmEmbedFullScreen", function() {
            function t() {
                n.height(a.height()), n.width(a.width())
            }
            var n = this;
            if ("Flash" !== n.techName && n.techName) {
                var a = e(window);
                n.ready(function() {
                    t(), a.on("resize", t)
                })
            }
        }), t.plugin("vmEmbedly", function() {
            var e = this;
            e.ready(function() {
                var t = n.VideoJSAdapter(e);
                t.ready()
            })
        }), t.plugin("vmEmbedShare", function() {
            var n = this,
                a = t.Component.extend({
                    init: function(e, n) {
                        this.videoUrl = e.options_.vidme.url, this.videoThumb = e.options_.vidme.thumb, this.videoTitle = e.options_.vidme.title, t.Component.call(this, e, n), this.el_.setAttribute("aria-label", "share"), this.el_.setAttribute("id", "embed_share")
                    }
                });
            a.prototype.kind_ = "share", a.prototype.buttonText = "share", a.prototype.createEl = function() {
                var t = e("<div><a><i></i><span></span></a></div>");
                return t.find("a").attr("target", "_blank").attr("class", "embed_button js-embed-share").attr("data-url", this.videoUrl).attr("data-title", this.videoTitle).attr("data-thumb", this.videoThumb), t.find("i").attr("class", "fa fa-share-square-o"), t.find("span").text("share"), t[0]
            }, n.ready(function() {
                var e = new a(n);
                n.controlBar.addChild(e)
            })
        }), t.plugin("vmEmbedEmbed", function() {
            var n = this,
                a = t.Component.extend({
                    init: function(e, n) {
                        this.videoUrl = e.options_.vidme.url, this.videoWidth = e.options_.vidme.width, this.videoHeight = e.options_.vidme.height, t.Component.call(this, e, n), this.el_.setAttribute("aria-label", "embed"), this.el_.setAttribute("id", "embed_embed")
                    }
                });
            a.prototype.kind_ = "embed", a.prototype.buttonText = "embed", a.prototype.createEl = function() {
                var t = e("<div><a><i></i><span></span></a></div>");
                return t.find("a").attr("target", "_blank").attr("class", "embed_button js-embed-video-link").attr("data-url", this.videoUrl).attr("data-width", this.videoWidth).attr("data-height", this.videoHeight), t.find("i").attr("class", "fa fa-code"), t.find("span").text("embed"), t[0]
            }, n.ready(function() {
                var e = new a(n);
                n.controlBar.addChild(e)
            })
        }), t.plugin("vmEmbedWatch", function() {
            var n = this,
                a = t.Component.extend({
                    init: function(e, n) {
                        this.videoUrl = e.options_.vidme.url, this.videoWidth = e.options_.vidme.width, this.videoHeight = e.options_.vidme.height, t.Component.call(this, e, n), this.el_.setAttribute("aria-label", "watch"), this.el_.setAttribute("id", "embed_watch")
                    }
                });
            a.prototype.kind_ = "watch", a.prototype.buttonText = "watch", a.prototype.createEl = function() {
                var t = e("<div><a><span></span></a></div>");
                return t.find("a").attr("target", "_blank").attr("class", "embed_button js-embed-watch").attr("data-url", this.videoUrl).on("click", function() {
                    try {
                        ga("send", "event", "Video", "embedWatchClicked", "Clicked embed watch", 1)
                    } catch (e) {}
                    n.pause(), window.open(n.options_.vidme.url, "Vidme")
                }), t.find("span").text((window.location + "").match(/internal/) ? "permalink" : "watch on vidme"), t[0]
            }, n.ready(function() {
                var e = new a(n);
                n.controlBar.addChild(e)
            })
        }), t.plugin("vmDurationInitial", function() {
            var t = this;
            t.options_.vidme.duration && e(t.el_).find(".vjs-duration-display").text(i(Math.floor(t.options_.vidme.duration)))
        }), t.plugin("vmDblClickFullscreen", function() {
            function t() {
                n.isFullscreen() ? n.exitFullscreen() : n.requestFullscreen()
            }
            var n = this;
            if (n.options_.isDesktop) {
                var a, i = 0;
                n.ready(function() {
                    e(this.el_).on("click", "video, .vjs-tech", function(e) {
                        e.preventDefault(), i++, i >= 2 && (i = 0, t()), a && (clearTimeout(a), a = void 0), a = setTimeout(function() {
                            i = 0
                        }, 200)
                    })
                })
            }
        }), t.plugin("vmCrossTab", function() {
            function e(e) {
                a.id !== e.origin && n.pause()
            }

            function t() {
                a.broadcast("vidme.player.play"), a.on("vidme.player.play", e)
            }
            var n = this;
            try {
                if (!window.localStorage || !a.supported) return
            } catch (i) {
                return
            }
            n.ready(function() {
                n.on("play", t)
            })
        })
    }), define("player", ["underscore", "jquery", "videojs", "hbs!views/delete-link", "site/vjs-mobile-play", "videoJsResolutions", "videoJsPersistVolume", "videojs-youtube", "site/vjs-hd", "site/vjs-branding", "site/vjs-stats", "site/vjs-tools", "site/vjs-postroll", "site/vjs-scrub-preview", "site/vjs-misc", "site/vjs-mobile-play"], function(e, t, n, a) {
        "use strict";

        function i(e) {
            var t, n, a, i, o = e.split("#");
            for (var s in o)
                if (o.hasOwnProperty(s)) {
                    var r = /((\d+)h)?((\d+)m)?((\d+)s)/g.exec(o[s]);
                    if (!r) continue;
                    return t = parseInt(r[2] || 0), n = parseInt(r[4] || 0), a = parseInt(r[6] || 0), i = 3600 * t + 60 * n + a
                }
            return 0
        }

        function o(e) {
            e.one("play", function() {
                if (window.location.hash) {
                    var t = i(window.location.hash);
                    e.currentTime(t)
                }
            })
        }

        function s(e) {
            var a = document.getElementById("video_player");
            if (null !== a) {
                if (t("body").hasClass("device-android-old")) return void t(".loading").removeClass("loading");
                var i = t(a),
                    s = t("body").hasClass("device-desktop"),
                    r = t("body").hasClass("device-ios"),
                    l = parseInt(i.attr("data-video")),
                    d = "true" === i.attr("data-gif"),
                    c = i.attr("data-youtube-override"),
                    u = 0 === window.navigator.platform.indexOf("iPad"),
                    p = (d || s) && !u,
                    h = {
                        persistvolume: {
                            namespace: "vidme"
                        },
                        vmPostRoll: {
                            nextVideo: {
                                title: i.attr("data-next-video-title"),
                                thumbnail: i.attr("data-next-video-thumbnail"),
                                url: i.attr("data-next-video-url"),
                                width: i.attr("data-next-video-width"),
                                height: i.attr("data-next-video-height"),
                                video_id: i.attr("data-next-video-id")
                            }
                        },
                        vmDurationInitial: {}
                    };
                s ? (h.resolutions = {}, h.vmHD = {}, h.vmFlashError = {
                    after: ".player"
                }, h.vmDblClickFullscreen = {}, h.vmScrubPreview = {}, h.vmFlashSizingHack = {}, h.vmCrossTab = {}) : r && (h.vmMobilePlayButton = {
                    thumbnail: i.attr("data-video-thumb")
                });
                var m = {
                    preload: "auto",
                    techOrder: ["html5", "flash"],
                    autoplay: p,
                    controls: !0,
                    customControlsOnMobile: !r,
                    nativeControlsForTouch: r,
                    inactivityTimeout: s ? 250 : 1e3,
                    isDesktop: s,
                    plugins: h,
                    vidme: {
                        isGif: d,
                        duration: parseFloat(i.attr("data-duration")),
                        height: parseInt(i.attr("data-height")),
                        width: parseInt(i.attr("data-width")),
                        video_id: l,
                        version: parseInt(i.attr("data-version")),
                        url: i.attr("data-video-url"),
                        title: i.attr("data-video-title"),
                        thumb: i.attr("data-video-thumb"),
                        storyboard: i.attr("data-video-storyboard"),
                        watchingCount: parseInt(i.attr("data-watching-count")) || 0,
                        viewCount: parseInt(i.attr("data-view-count")) || 0,
                        youtubeOverride: c
                    }
                };
                c && (m.techOrder = ["youtube"], m.src = c, m.ytcontrols = !0, m.loop = !1, delete m.plugins.resolutions, delete m.plugins.vmHD), n(e, m, function() {
                    if (t(".loading").removeClass("loading"), o(this), this.one("play", function() {
                            t(".overlay-ad").each(function() {
                                t(this).show()
                            }), v(i)
                        }), t("body").hasClass("device-ios") && t(".vjs-control-bar").remove(), s) {
                        u || (t("#video_player .vjs-control-bar").addClass("hide"), t("#video_player").on("mouseover", function() {
                            t("#video_player .vjs-control-bar").removeClass("hide")
                        })), c || this.on("seeking", function() {
                            var e = this.options();
                            e.hasOwnProperty("loop") && e.loop === !0 && (t(".vjs-default-skin .vjs-loading-spinner").css("opacity", 0), t(".vjs-default-skin.loading2 .vjs-loading-spinner").css("opacity", 0), t(".vjs-default-skin .postroll").css("opacity", 0))
                        }), d ? this.play() : t("body").hasClass("device-desktop") && (t(this.el_).addClass("loading2"), this.on("loadeddata", function() {
                            t(this.el_).removeClass("loading2")
                        }), u && t(this.el_).removeClass("loading2"));
                        var e = this;
                        t(window).on("keypress", function(n) {
                            var a = t(document.activeElement);
                            a.is(":input") || "undefined" != typeof n.which && 32 === n.which && (n.preventDefault(), e.paused() ? e.play() : e.pause())
                        }), u && this.userActive(!0)
                    }
                })
            }
        }

        function r(a) {
            var i = document.getElementById(a);
            if (null !== i) {
                if (t("body").hasClass("device-android-old")) return t(".loading").removeClass("loading"), void t(".loading2").removeClass("loading2");
                var s = t(i),
                    r = "true" === s.attr("data-gif"),
                    l = s.prop("muted"),
                    d = t("body").hasClass("device-desktop"),
                    c = t("body").hasClass("device-ios"),
                    u = 0 === window.navigator.platform.indexOf("iPad"),
                    p = s.attr("data-youtube-override"),
                    h = {
                        persistvolume: {
                            namespace: "vidme"
                        },
                        vmPostRoll: {
                            nextVideo: {
                                title: s.attr("data-next-video-title"),
                                thumbnail: s.attr("data-next-video-thumbnail"),
                                url: s.attr("data-next-video-url"),
                                width: s.attr("data-next-video-width"),
                                height: s.attr("data-next-video-height"),
                                video_id: s.attr("data-next-video-id")
                            }
                        }
                    };
                d && (h.resolutions = {}, h.vmHD = {}), h = e.extend(h, {
                    vmTools: {},
                    vmBranding: {},
                    vmStats: {},
                    vmEmbedEmbed: {},
                    vmEmbedShare: {},
                    vmEmbedFullScreen: {},
                    vmEmbedly: {},
                    vmEmbedWatch: {}
                }), d ? (h.vmFlashError = {
                    after: ".player"
                }, h.vmDblClickFullscreen = {}, h.vmCrossTab = {}) : c && (h.vmMobilePlayButton = {
                    thumbnail: s.attr("data-video-thumb")
                });
                var m = {
                    preload: "none",
                    techOrder: ["html5", "flash"],
                    controls: !0,
                    customControlsOnMobile: !c,
                    nativeControlsForTouch: c,
                    inactivityTimeout: d ? 250 : 1e3,
                    isDesktop: d,
                    plugins: h,
                    vidme: {
                        isGif: r,
                        duration: parseFloat(s.attr("data-duration")),
                        height: parseInt(s.attr("data-height")),
                        width: parseInt(s.attr("data-width")),
                        video_id: parseInt(s.attr("data-video")),
                        version: parseInt(s.attr("data-version")),
                        url: s.attr("data-video-url"),
                        title: s.attr("data-video-title"),
                        thumb: s.attr("data-video-thumb"),
                        storyboard: s.attr("data-video-storyboard"),
                        youtubeOverride: p,
                        embed: !0
                    }
                };
                p && (m.techOrder = ["youtube"], m.src = p, m.ytcontrols = !0, m.loop = !1, delete m.plugins.resolutions, delete m.plugins.vmHD), n(a, m, function() {
                    !u && !p && t("body").hasClass("device-desktop") && this.autoplay() ? (t(this.el_).addClass("loading2"), this.on("loadeddata", function() {
                        t(this.el_).removeClass("loading2")
                    })) : u && t(this.el_).removeClass("loading2"), t("body").hasClass("device-ios") && t(".vjs-control-bar").remove(), o(this), this.one("play", function() {
                        t(".overlay-ad").each(function() {
                            t(this).show()
                        }), v(s)
                    }), this.one("play", function() {
                        l && (this.volume(0), this.muted(!0))
                    }), p || this.on("seeking", function() {
                        var e = this.options();
                        e.hasOwnProperty("loop") && e.loop === !0 && (t(".vjs-default-skin .vjs-loading-spinner").css("opacity", 0), t(".vjs-default-skin.loading2 .vjs-loading-spinngier").css("opacity", 0), t(".vjs-default-skin .postroll").css("opacity", 0))
                    })
                })
            }
        }

        function l(e) {
            function n(n) {
                if (n && n.video)
                    if ("initial" === n.video.state ? e.find(".downloading-header .note").text("Uploading video...") : "stored" === n.video.state && e.find(".downloading-header .note").text("Encoding video..."), "success" === n.video.state || "failed" === n.video.state || "over-limit" === n.video.state) setTimeout(function() {
                        window.location.reload()
                    }, 1e3);
                    else if ("stored" === n.video.state || "initial" === n.video.state) {
                    var a = Math.floor(1e3 * n.progress.progress) / 10,
                        i = Math.floor(.98 * a * 10) / 10;
                    a >= o && a > 0 && (t(".progress_wrapper .progress").removeClass("hide"), t(".progress_wrapper .progress-placeholder").addClass("hide"), t(".progress .progress-bar").css("width", i + "%").find(".sr-only").text(i + "%"), a >= 100 && e.find(".downloading-header .note").text("Wrapping up..."), o = a)
                }
            }

            function a() {
                i || (i = !0, t.getJSON("/api/video/" + e.attr("data-id")).done(n).always(function() {
                    i = !1
                }))
            }
            var i = !1,
                o = 0;
            setInterval(a, 2e3), a()
        }

        function d(e) {
            var n = JSON.parse(localStorage.getItem("videoAccessToken" + e));
            if (n && !window.Viewer) {
                var i = n.token,
                    o = new Date(n.expires),
                    s = o.valueOf() - (new Date).valueOf(),
                    r = window.location.protocol + "//" + window.location.host + "/delete/" + i,
                    l = t(a({
                        accessToken: i,
                        deleteLink: r,
                        videoId: e
                    }));
                t(".video_info").after(l), setTimeout(function() {
                    l.remove()
                }, s)
            }
        }

        function c() {
            for (var e in localStorage)
                if (localStorage.hasOwnProperty(e) && 0 === e.indexOf("videoAccessToken")) {
                    var t = localStorage.getItem(e);
                    if ("null" !== t) try {
                        var n = JSON.parse(t),
                            a = new Date(n.expires),
                            i = (new Date).valueOf() - a.valueOf();
                        i > 0 && localStorage.removeItem(e)
                    } catch (o) {
                        continue
                    } else localStorage.removeItem(e)
                }
        }

        function u(e) {
            try {
                ga("send", "event", "Videos", "downloaded", "Video downloaded", 1)
            } catch (n) {}
            window.open(t(e.target).attr("data-href"))
        }

        function p() {
            t(".vjs-error-display").hide(), t("head").append('<style type="text/css">.vjs-error-display{display:none;}</style>')
        }

        function h(e) {
            if (37 === e.keyCode || 39 === e.keyCode) {
                var n = t(e.target);
                if (!n.is(":input") && !t("body").hasClass("modal-open")) {
                    var a = vjs.players.video_player;
                    if (a) {
                        e.preventDefault();
                        var i = 37 === e.keyCode,
                            o = a.currentTime();
                        a.trigger("keydown"), a.currentTime(o + 5 * (i ? -1 : 1))
                    }
                }
            }
        }

        function m(e) {
            mixpanel.track("Youtube Source Link Clicked", {
                VideoURL: window.location.href,
                YoutubeURL: t(e.target).attr("href")
            })
        }

        function v(e) {
            "localhost:3000" == window.location.hostname && Math.round(1e5 * Math.random()) > 10 || mixpanel.track("Video play start (0.01%)", {
                VideoId: e.attr("data-video"),
                VideoTitle: e.attr("data-video-title"),
                VideoURL: e.attr("data-video-url"),
                Nsfw: e.attr("data-nsfw"),
                Duration: e.attr("data-duration"),
                Moderated: e.attr("data-moderated")
            })
        }

        function f(e) {
            if (!("localhost:3000" == window.location.hostname && Math.round(1e5 * Math.random()) > 10)) {
                var n = t(e.target);
                n.is("a") || (n = n.parents("a").first()), mixpanel.track("Banned domain embed click (0.01%)", {
                    "Video ID": n.attr("data-video"),
                    "Video URL": n.attr("data-video-url")
                })
            }
        }

        function g(e) {
            if (!("localhost:3000" == window.location.hostname && Math.round(1e3 * Math.random()) > 10)) {
                var n = t(e.target);
                mixpanel.track("Embed player (suspended video): Explore other videos button clicked (1%)", {
                    video_id: n.attr("data-video"),
                    video_url: n.attr("data-video-url")
                })
            }
        }

        function b() {
            s("video_player"), r("embed_video_player");
            var e = t(".js-video-is-converting");
            1 === e.length && l(e);
            var n = t("#video_player").attr("data-video") || t("#video_player video").attr("data-video") || t(".js-video-is-converting").attr("data-id");
            try {
                c(), d(n)
            } catch (a) {}
            var i = t(document);
            i.on("click", ".js-download-video-link", u), i.on("keydown", h), i.on("click", ".video_youtube a", m), i.on("click", ".embed-domain-disabled", f), i.on("click", ".embed-suspended-button a", g), window.addEventListener("beforeunload", p)
        }

        function w(e) {
            var n = "undefined" != typeof document.webkitFullscreenEnabled && document.webkitFullscreenEnabled === !1;
            window !== window.top && n && (e.FullscreenToggle.prototype.onClick = function() {
                var e = t("#embed_video_player_html5_api"),
                    n = e.get(0);
                "undefined" != typeof n.webkitDisplayingFullscreen && "undefined" != typeof n.webkitEnterFullScreen && (e.on("webkitfullscreenchange", function() {
                    n.webkitDisplayingFullscreen ? e.prop("controls", !0) : e.prop("controls", !1)
                }), n.webkitEnterFullScreen())
            }), e.VolumeBar.prototype.calculateDistance = e.Slider.prototype.calculateDistance = function(n) {
                var a, i, o, s, r, l, d, c, u;
                a = this.el_, i = e.findPosition(a), r = l = a.offsetWidth, d = this.handle;
                var p = (window.navigator.userAgent + "").match(/MSIE|Trident/) && window.self !== window.top && a.offsetWidth < a.clientWidth;
                if (p && (r = l = Math.round(100 * a.getBoundingClientRect().width), i.left *= 100, i.top *= 100, t(".vjs-volume-bar, .vjs-volume-control").css("width", "15em")), this.options().vertical) {
                    if (s = i.top, u = n.changedTouches ? n.changedTouches[0].pageY : n.pageY, d) {
                        var h = d.el().offsetHeight;
                        s += h / 2, l -= h
                    }
                    return Math.max(0, Math.min(1, (s - u + l) / l))
                }
                if (o = i.left, c = n.changedTouches ? n.changedTouches[0].pageX : n.pageX, d) {
                    var m;
                    m = p ? Math.round(100 * d.el().getBoundingClientRect().width) : d.el().offsetWidth, o += m / 2, r -= m
                }
                return Math.max(0, Math.min(1, (c - o) / r))
            }
        }
        vjs.options.flash.swf = window.cdn + "/bower/videojs/dist/video-js/video-js.swf", n.options.flash.swf = window.cdn + "/bower/videojs/dist/video-js/video-js.swf", n.options.flash.swf = window.cdn + "/bower/videojs/dist/video-js/video-js.swf", w(n), t(b)
    }), define("lib/ribbon", ["jquery"], function(e) {
        "use strict";

        function t(t) {
            return "string" == typeof t ? t = {
                text: t
            } : "object" != typeof t && (t = {}), t.text || t.html ? t.html && (t.text = e("<span>").html(t.html + "").text()) : t.text = "Changes saved!", t.timeout || (t.timeout = Math.max(2e3, 46 * t.text.length + 1300)), t.level || (t.level = "success"), t
        }

        function n() {
            function n() {
                i.trigger("vm.ribbon.hidden"), i.css("opacity", "0").remove()
            }
            e(".ribbon").remove();
            var a = t.apply(null, arguments),
                i = e('<div class="ribbon"></div>').addClass("ribbon-" + a.level);
            return a.html ? i.html(a.html) : i.text(a.text), i.appendTo("body"), i.css("opacity", 1).on("click", n), i.appendTo("body"), setTimeout(n, a.timeout), i
        }
        return e(function() {
            var e = (window.location.hash + "").match(/^#ribbon=(.+)/);
            e && (window.history && window.history.replaceState ? window.history.replaceState("", "", (window.location + "").replace(/#.+$/, "")) : window.location.hash = "", n(decodeURIComponent(e[1])))
        }), n
    }), define("hbs!views/video-menu", ["hbs", "handlebars", "helpers/ifcmp"], function(e, t) {
        var n = t.template({
            1: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '    <li>\n        <a class="js-edit-video" data-id="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-after="none">\n            Edit video\n        </a>\n        <a href="' + r((i = null != (i = t.full_url || (null != e ? e.full_url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "full_url",
                    hash: {},
                    data: a
                }) : i)) + '/edit-thumbnail">\n            Edit thumbnail\n        </a>\n    </li>\n'
            },
            3: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '    <li>\n      <a class="js-delete js-delete-video" data-video="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-after="none">\n        Delete video\n      </a>\n    </li>\n'
            },
            5: function(e, t, n, a) {
                var i, o = "";
                return i = t["if"].call(e, null != e ? e.can_report : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(6, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (o += i), o
            },
            6: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '    <li class="video_actions_report">\n      <a data-video="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '"\n         data-flagged="' + r((i = null != (i = t.videoIsFlagged || (null != e ? e.videoIsFlagged : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "videoIsFlagged",
                    hash: {},
                    data: a
                }) : i)) + '">\n        Report video\n      </a>\n    </li>\n'
            },
            8: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '    <li>\n      <a class="js-video-pin-channel" data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "video_id",
                        hash: {},
                        data: a
                    }) : o)) + '" \n         data-channel="' + l((o = null != (o = t.channel_id || (null != e ? e.channel_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "channel_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-state="';
                return i = t["if"].call(e, null != e ? e.is_pinned_to_channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '">\n        ', i = t["if"].call(e, null != e ? e.is_pinned_to_channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(11, a),
                    inverse: this.program(13, a),
                    data: a
                }), null != i && (d += i), d + "\n      </a>\n    </li>\n"
            },
            9: function() {
                return "true"
            },
            11: function() {
                return "Un-pin video"
            },
            13: function() {
                return "Pin video"
            },
            15: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '    <li>\n      <a class="js-video-pin-user" data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "video_id",
                        hash: {},
                        data: a
                    }) : o)) + '" \n         data-user="' + l((o = null != (o = t.user_id || (null != e ? e.user_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "user_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-state="';
                return i = t["if"].call(e, null != e ? e.is_pinned_to_user : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '">\n        ', i = t["if"].call(e, null != e ? e.is_pinned_to_user : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(11, a),
                    inverse: this.program(13, a),
                    data: a
                }), null != i && (d += i), d + "\n      </a>\n    </li>\n"
            },
            17: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '    <li>\n      <a class="js-video-remove-channel" data-video="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-remove="li[data-id]">\n        Remove from network\n      </a>\n    </li>\n'
            },
            19: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '    <li>\n      <a class="js-video-suspend" data-action="video/suspend" data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "video_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-remove="li[data-id]" data-suspend-all="0">\n        Suspend video\n      </a>\n      <a class="js-video-suspend" data-action="video/suspend" data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "video_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-remove="li[data-id]" data-suspend-all="1">\n        Suspend video + copies\n      </a>\n    </li>\n';
                return i = t["if"].call(e, null != e ? e.user_id : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(20, a),
                    inverse: this.program(22, a),
                    data: a
                }), null != i && (d += i), d
            },
            20: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '    <li>\n      <a class="js-user-ban" data-action="user/ban" data-user-id="' + r((i = null != (i = t.user_id || (null != e ? e.user_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "user_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-remove="li[data-id]">\n        Disable user & ban IP\n      </a>\n'
            },
            22: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = "";
                return i = (t.ifcmp || e && e.ifcmp || o).call(e, null != e ? e.state : e, "==", "success", {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(23, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), s
            },
            23: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '        <li>\n          <a class="js-video-ban" data-action="video/ban" data-video-id="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-remove="li[data-id]">\n            Suspend video & ban IP\n          </a>\n        </li>\n'
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '\n<div class="thumb_more dropdown">\n  <a class="action" data-toggle="dropdown"><i class="fa fa-gear"></i></a>\n  <ul class="dropdown-menu pull-left">\n    <li class="hidden-phone" onMouseOut="$(\'.js-video-copy-link\').removeClass(\'zeroclipboard-is-hover\');">\n      <a class="js-video-copy-link" data-clipboard-text="' + l((o = null != (o = t.full_url || (null != e ? e.full_url : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "full_url",
                        hash: {},
                        data: a
                    }) : o)) + "\" onMouseOut=\"$('.js-video-copy-link').removeClass('zeroclipboard-is-hover');\">\n        Copy link\n      </a>\n    </li>\n";
                return i = t["if"].call(e, null != e ? e.can_edit : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.can_delete : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t.unless.call(e, null != e ? e.is_owner : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.can_pin_channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(8, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.can_pin_user : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(15, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.can_channel_mod : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(17, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.is_mod : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(19, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + "  </ul>\n</div>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/video-menu", n), n
    }), define("site/video-menu", ["jquery", "lib/ribbon", "hbs!views/video-menu"], function(e, t, n) {
        "use strict";

        function a(t) {
            t = e(t);
            var a = t.attr("data-user"),
                o = t.attr("data-channel"),
                s = "1" === e("[data-allow-mod]").attr("data-allow-mod"),
                r = !1,
                l = !1,
                d = !1,
                c = !0,
                u = !1,
                p = !1,
                h = !1,
                m = !1,
                v = "true" === t.attr("data-channel-pinned"),
                f = "true" === t.attr("data-user-pinned");
            window.Viewer && (r = "moderator" === window.Viewer.acl, l = window.Viewer.user_id === a, c = !0, d = r || l, u = r || l, p = o && (r || s), m = e(".pg-user-view").length && (r || l), h = e(".pg-channel").length && p);
            var g = e(n({
                video_id: t.attr("data-id"),
                channel_id: o,
                full_url: t.attr("data-url"),
                user_id: a,
                is_mod: r ? 1 : 0,
                can_edit: d ? 1 : 0,
                can_delete: u ? 1 : 0,
                can_report: c ? 1 : 0,
                is_owner: l ? 1 : 0,
                can_channel_mod: p ? 1 : 0,
                state: "success",
                can_pin_user: m,
                can_pin_channel: h,
                is_pinned_to_channel: v,
                is_pinned_to_user: f
            }));
            t.find(".thumb_vote").after(g), i(g.find(".js-video-copy-link"))
        }

        function i(t) {
            function n() {
                t.parent().hide()
            }

            function a() {
                t.text("Copied!");
                var n = e('<div class="ribbon ribbon-success">Link copied!</div>').appendTo("body");
                e(".ribbon").css("opacity"), e(".ribbon").css("opacity", "1"), n.on("click", function() {
                    e(".ribbon").css("opacity"), e(".ribbon").css("opacity", "0"), n.remove()
                }), setTimeout(function() {
                    t.text("Copy link"), e(".ribbon").css("opacity"), e(".ribbon").css("opacity", "0"), setTimeout(function() {
                        n.remove()
                    }, 2e3)
                }, 2e3)
            }

            function i() {
                o.on("aftercopy", a)
            }
            if (1 !== t.length || !e("body").hasClass("device-desktop")) return void n();
            var o = t.data("zeroclipboard");
            o || require(["zeroclipboard"], function(e) {
                o = new e(t[0]), t.data("zeroclipboard", o), o.on("ready", i), o.on("error", n)
            })
        }

        function o(t) {
            var n = e(t.target).parents(".thumb_more").find(".js-video-copy-link");
            i(n)
        }

        function s(t) {
            var n = e(t.target).parents(".video_actions_more").find(".js-video-copy-link");
            i(n)
        }

        function r(n) {
            var a = e(n.target),
                i = a.attr("data-video"),
                o = a.attr("data-channel"),
                s = "true" !== a.attr("data-state") ? "true" : "false",
                r = "true" !== a.attr("data-state") ? "PUT" : "DELETE";
            e.ajax({
                url: "/api/channel/" + o + "/pin/" + i,
                type: r,
                data: {
                    _method: r
                },
                success: function() {
                    "true" === s ? (a.text("Un-pin video"), a.attr("data-state", "true"), t("Pinned!")) : (a.text("Pin video"), a.attr("data-state", "false"), t("Un-pinned!"))
                },
                error: function() {}
            })
        }

        function l(n) {
            var a = e(n.target),
                i = a.attr("data-video"),
                o = a.attr("data-user"),
                s = "true" !== a.attr("data-state") ? "true" : "false",
                r = "true" !== a.attr("data-state") ? "PUT" : "DELETE";
            e.ajax({
                url: "/api/user/" + o + "/pin/" + i,
                type: r,
                data: {
                    _method: r
                },
                success: function() {
                    "true" === s ? (a.text("Un-pin video"), a.attr("data-state", "true"), t("Pinned!")) : (a.text("Pin video"), a.attr("data-state", "false"), t("Un-pinned!"))
                },
                error: function() {}
            })
        }

        function d() {
            var t = e(document);
            if (t.on("click", '.thumb_more [data-toggle="dropdown"]', o), t.on("click", '.video_actions_more [data-toggle="dropdown"]', s), t.on("click", ".js-video-pin-channel", r), t.on("click", ".js-video-pin-user", l), window.Viewer) {
                var n = ".videos_list > li";
                e(n).each(function(e, t) {
                    a(t)
                })
            }
        }
        return e(d), {
            attachVideoMenu: a
        }
    }), define("helpers/videoUrl", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            var t = window.location.protocol + "//" + window.location.host;
            return e.full_url ? e.full_url : e.url ? t + "/" + e.url : t + "/vi/" + e.video_id
        }
        return e.registerHelper("videoUrl", t), t
    }), define("helpers/dcolor", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            var t = "transparent";
            if ("object" != typeof e || !e.colors) return t;
            var n = e.colors.split(",");
            if (!n.length) return t;
            var i, o = 0;
            for (var s in n) n.hasOwnProperty(s) && (i = a(n[s]), i.v > o && i.s > 20 && (o = i.v, t = n[s]));
            return t
        }

        function n(e) {
            return "#" === e.substr(0, 1) && (e = e.substr(1)), {
                r: e.slice(0, 2),
                g: e.slice(2, 4),
                b: e.slice(4, 6)
            }
        }

        function a(e) {
            var t, a = 256;
            t = "object" == typeof e ? e : n(e), t.r = parseInt(t.r, 16) / a, t.g = parseInt(t.g, 16) / a, t.b = parseInt(t.b, 16) / a;
            var i = Math.max(t.r, t.g, t.b),
                o = Math.min(t.r, t.g, t.b),
                s = i - o,
                r = {
                    h: 0,
                    s: 0 === i ? 0 : s / i,
                    v: i
                };
            if (i !== o) {
                switch (i) {
                    case t.r:
                        r.h = (t.g - t.b) / s + (t.g < t.b ? 6 : 0);
                        break;
                    case t.g:
                        r.h = (t.b - t.r) / s + 2;
                        break;
                    case t.b:
                        r.h = (t.r - t.g) / s + 4
                }
                r.h /= 6
            }
            return r.h = parseInt((360 * r.h).toFixed(0), 10) || 0, r.s = parseInt((100 * r.s).toFixed(0), 10) || 0, r.v = parseInt((100 * r.v).toFixed(0), 10) || 0, r
        }
        return e.registerHelper("dcolor", t), t
    }), define("helpers/channelUrl", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            return e ? "/n/" + e.url : ""
        }
        return e.registerHelper("channelUrl", t), t
    }), define("helpers/videoTitle", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            return e.title || ""
        }
        return e.registerHelper("videoTitle", t), t
    }), define("helpers/userUrl", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            return e.full_url ? e.full_url : "/u/" + e.username || ""
        }
        return e.registerHelper("userUrl", t), t
    }), define("helpers/userName", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            return e.displayname || e.username || ""
        }
        return e.registerHelper("userName", t), t
    }), define("helpers/ifany", ["handlebars"], function(e) {
        "use strict";

        function t() {
            for (var e = !1, t = arguments[arguments.length - 1], n = 0; n < arguments.length - 1; n++) arguments[n] && (e = !0);
            return e ? t.fn(this) : t.inverse(this)
        }
        return e.registerHelper("ifany", t), {
            ifany: t
        }
    }), define("helpers/timestamp", ["handlebars", "momentjs", "phpjs"], function(e, t, n) {
        "use strict";

        function a(a) {
            var i = t(a + " +0000", "YYYY-MM-DD hh:mm:ss Z");
            i.local();
            var o, s = t.duration(t().diff(i)),
                r = " ago";
            o = s.years() > 0 ? i.format("MMMM DD, YYYY") : s.months() >= 2 ? i.format("MMMM DD") : s.months() > 0 ? n.number_format(4 * s.months() + s.weeks()) + "w" + r : s.weeks() ? n.number_format(s.weeks()) + "w" + r : s.days() ? n.number_format(s.days()) + "d" + r : s.hours() ? n.number_format(s.hours()) + "h" + r : s.minutes() ? n.number_format(s.minutes()) + "m" + r : s.seconds() ? n.number_format(s.seconds()) + "s" + r : "just now";
            var l = '<time class="timestamp" title="' + i.format("MMMM Do YYYY, h:mm:ss a") + '" datetime="' + i.format() + '">' + o + "</time>";
            return new e.SafeString(l)
        }
        return e.registerHelper("timestamp", a), a
    }), define("hbs!views/feed-item", ["hbs", "handlebars", "helpers/videoUrl", "helpers/dcolor", "helpers/secondsToHms", "helpers/videoBox", "helpers/channelUrl", "helpers/videoTitle", "helpers/userUrl", "helpers/userName", "helpers/ifany", "helpers/ifcmp", "helpers/numberFormat", "helpers/plural", "helpers/timestamp"], function(e, t) {
        var n = t.template({
            1: function() {
                return " anonymous"
            },
            3: function() {
                return "active"
            },
            5: function() {
                return '          <span class="thumb_nsfw">NSFW</span>\n'
            },
            7: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = this.escapeExpression,
                    r = this.lambda;
                return '          <span class="thumb_channel">             \n            <a href="' + s((t.channelUrl || e && e.channelUrl || o).call(e, null != e ? e.channel : e, {
                    name: "channelUrl",
                    hash: {},
                    data: a
                })) + '">' + s(r(null != (i = null != e ? e.channel : e) ? i.title : i, e)) + "</a>\n          </span>\n"
            },
            9: function() {
                return '          <span class="thumb_channel thumb_featured">\n            <a href="/featured">Featured</a>\n          </span>\n'
            },
            11: function() {
                return '          <span class="thumb_channel thumb_featured" data-toggle="tooltip" data-placement="bottom" title="Pinned video"><i class=\'fa fa-thumb-tack\'></i></span>\n'
            },
            13: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '          <a class="thumb_title_label" href="' + o((t.videoUrl || e && e.videoUrl || i).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">' + o((t.videoTitle || e && e.videoTitle || i).call(e, e, {
                    name: "videoTitle",
                    hash: {},
                    data: a
                })) + "</a>\n"
            },
            15: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '          <div class="thumb_author" data-user="' + r((i = null != (i = t.user_id || (null != e ? e.user_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "user_id",
                    hash: {},
                    data: a
                }) : i)) + '">\n            <a href="' + r((t.userUrl || e && e.userUrl || s).call(e, null != e ? e.user : e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '" class="thumb_author_username">' + r((t.userName || e && e.userName || s).call(e, null != e ? e.user : e, {
                    name: "userName",
                    hash: {},
                    data: a
                })) + "</a>\n          </div>\n"
            },
            17: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = '        <div class="thumb_info_alt">\n';
                return i = t["if"].call(e, null != e ? e.title : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(18, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), i = (t.ifany || e && e.ifany || o).call(e, null != e ? e.user : e, null != e ? e.channel : e, {
                    name: "ifany",
                    hash: {},
                    fn: this.program(20, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), s + "        </div>\n"
            },
            18: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '            <div class="thumb_title_alt">\n              <a href="' + o((t.videoUrl || e && e.videoUrl || i).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">\n                ' + o((t.videoTitle || e && e.videoTitle || i).call(e, e, {
                    name: "videoTitle",
                    hash: {},
                    data: a
                })) + "\n              </a>\n            </div>\n"
            },
            20: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = '            <div class="thumb_info_alt2">\n';
                return i = t["if"].call(e, null != e ? e.channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(21, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), i = (t.ifcmp || e && e.ifcmp || o).call(e, null != e ? e.channel : e, "&&", null != e ? e.user : e, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(23, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), i = t["if"].call(e, null != e ? e.user : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(25, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (s += i), s + "            </div>\n"
            },
            21: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = this.escapeExpression,
                    r = this.lambda;
                return '                <span class="thumb_channel_alt">\n                  <a href="' + s((t.channelUrl || e && e.channelUrl || o).call(e, null != e ? e.channel : e, {
                    name: "channelUrl",
                    hash: {},
                    data: a
                })) + '"\n                     class="thumb_channel_title">' + s(r(null != (i = null != e ? e.channel : e) ? i.title : i, e)) + "</a>\n                </span>\n"
            },
            23: function() {
                return '                <span class="divider">&bull;</span>\n'
            },
            25: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '                <span class="thumb_author_alt">\n                  <a href="' + o((t.userUrl || e && e.userUrl || i).call(e, null != e ? e.user : e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '"\n                     class="thumb_author_username">' + o((t.userName || e && e.userName || i).call(e, null != e ? e.user : e, {
                    name: "userName",
                    hash: {},
                    data: a
                })) + "</a>\n                </span>\n"
            },
            27: function() {
                return '              <span class="num">0</span>\n              <span class="text">points</span>\n'
            },
            29: function(e, t, n, a) {
                var i, o = t.helperMissing,
                    s = this.escapeExpression,
                    r = '              <span class="num">' + s((t.numberFormat || e && e.numberFormat || o).call(e, null != e ? e.score : e, {
                        name: "numberFormat",
                        hash: {},
                        data: a
                    })) + "</span>\n";
                return i = (t.ifcmp || e && e.ifcmp || o).call(e, null != e ? e.score_modifier : e, "&&", null != e ? e.isGlobalModerator : e, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(30, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (r += i), r + '              <span class="text">' + s((t.plural || e && e.plural || o).call(e, null != e ? e.score : e, "point", "points", {
                    name: "plural",
                    hash: {},
                    data: a
                })) + "</span>\n"
            },
            30: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '                <span class="boost">(+' + r((i = null != (i = t.score_modifier || (null != e ? e.score_modifier : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "score_modifier",
                    hash: {},
                    data: a
                }) : i)) + ")</span>\n"
            },
            32: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '              <span class="num">' + o((t.numberFormat || e && e.numberFormat || i).call(e, null != e ? e.view_count : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + '</span>\n              <span class="text">' + o((t.plural || e && e.plural || i).call(e, null != e ? e.view_count : e, "play", "plays", {
                    name: "plural",
                    hash: {},
                    data: a
                })) + "</span>\n"
            },
            34: function() {
                return '              <span class="num">1</span>\n              <span class="text">play</span>\n'
            },
            36: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '          <li class="thumb_stat thumb_comments">\n            <a href="' + o((t.videoUrl || e && e.videoUrl || i).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">\n              <span class="num">' + o((t.numberFormat || e && e.numberFormat || i).call(e, null != e ? e.comment_count : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + '</span>\n              <span class="text">' + o((t.plural || e && e.plural || i).call(e, null != e ? e.comment_count : e, "comment", "comments", {
                    name: "plural",
                    hash: {},
                    data: a
                })) + "</span>\n            </a>\n          </li>\n"
            },
            38: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '          <li class="thumb_stat thumb_watching">\n            ' + o((t.numberFormat || e && e.numberFormat || i).call(e, null != e ? e.watching : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + "\n            watching\n          </li>\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '\n<li data-id="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "video_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-channel="' + l((o = null != (o = t.channel_id || (null != e ? e.channel_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "channel_id",
                        hash: {},
                        data: a
                    }) : o)) + '" data-user="' + l((o = null != (o = t.user_id || (null != e ? e.user_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "user_id",
                        hash: {},
                        data: a
                    }) : o)) + '"\n    data-url="' + l((o = null != (o = t.full_url || (null != e ? e.full_url : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "full_url",
                        hash: {},
                        data: a
                    }) : o)) + '"\n    data-ajax="true" class="';
                return i = t.unless.call(e, null != e ? e.user : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '">\n  <div class="inner">\n    <div class="thumb_vote_wrapper">\n      <div class="thumb_vote">\n        <a class="js-video-vote-up ', i = t["if"].call(e, null != e ? e.viewerVoteUp : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '"\n           data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '"\n           data-video-title="' + l((o = null != (o = t.title || (null != e ? e.title : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : o)) + '"\n           data-video-url="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '"><i class="fa fa-arrow-up"></i></a>\n        <a class="js-video-vote-down ', i = t["if"].call(e, null != e ? e.viewerVoteDown : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '"\n           data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '"\n           data-video-url="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '"><i class="fa fa-arrow-down"></i></a>\n      </div>\n    </div>\n    <div class="thumb_wrapper">\n      <a href="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '" style="background: ' + l((t.dcolor || e && e.dcolor || r).call(e, e, {
                    name: "dcolor",
                    hash: {},
                    data: a
                })) + ';">\n        <span class="thumb_duration">\n          ' + l((t.secondsToHms || e && e.secondsToHms || r).call(e, null != e ? e.duration : e, {
                    name: "secondsToHms",
                    hash: {},
                    data: a
                })) + "\n        </span>\n        " + l((t.videoBox || e && e.videoBox || r).call(e, e, 300, 170, !1, {
                    name: "videoBox",
                    hash: {},
                    data: a
                })) + "\n        " + l((t.videoBox || e && e.videoBox || r).call(e, e, 120, 85, !0, {
                    name: "videoBox",
                    hash: {},
                    data: a
                })) + '\n      </a>\n      <span class="thumb_title">\n', i = t["if"].call(e, null != e ? e.nsfw : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(7, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.is_featured : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.pinned_to_channel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(11, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.title : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(13, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.user : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(15, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '      </span>\n    </div> \n    <div class="thumb_info">\n', i = (t.ifany || e && e.ifany || r).call(e, null != e ? e.title : e, null != e ? e.user : e, null != e ? e.channel : e, {
                    name: "ifany",
                    hash: {},
                    fn: this.program(17, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '      <ul class="thumb_stats">\n        <li class="thumb_stat thumb_score">\n          <a href="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '" class="js-video-vote-score"\n                data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '"\n                data-score="' + l((o = null != (o = t.score || (null != e ? e.score : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "score",
                    hash: {},
                    data: a
                }) : o)) + '">\n', i = (t.ifcmp || e && e.ifcmp || r).call(e, null != e ? e.score : e, "<=", 0, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(27, a),
                    inverse: this.program(29, a),
                    data: a
                }), null != i && (d += i), d += '          </a>\n        </li>\n        <li class="thumb_stat thumb_views">\n          <a href="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">\n', i = t["if"].call(e, null != e ? e.view_count : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(32, a),
                    inverse: this.program(34, a),
                    data: a
                }), null != i && (d += i), d += "          </a>\n        </li>\n", i = t["if"].call(e, null != e ? e.comment_count : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(36, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '        <li class="thumb_stat thumb_date">\n          <a href="' + l((t.videoUrl || e && e.videoUrl || r).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">\n            ' + l((t.timestamp || e && e.timestamp || r).call(e, null != e ? e.date_completed : e, {
                    name: "timestamp",
                    hash: {},
                    data: a
                })) + "\n          </a>\n        </li>\n", i = t["if"].call(e, null != e ? e.watching : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(38, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + "      </ul>\n    </div> \n\n  </div> \n</li>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/feed-item", n), n
    }), define("feed", ["underscore", "jquery", "player", "loaders", "site/video-menu", "helpers/videoThumbnail", "hbs!views/feed-item"], function(e, t, n, a, i, o, s) {
        "use strict";

        function r(e) {
            var t = e.attr("data-order"),
                n = e.attr("data-direction"),
                a = e.attr("data-items-per-page"),
                i = parseInt(e.attr("data-user")) || 0,
                o = (parseInt(e.attr("data-offset")) || 0) + e.find("li[data-id]").length;
            S = window.Viewer && parseInt(Viewer.user_id) === i;
            var s = {
                moderated: 1,
                "private": 0,
                nsfw: 0
            };
            return t && (s.order = t), n && (s.direction = n), a && (s.limit = a), i && (s.user = i), o && (s.offset = o), U && D && (s.moderated = -1, s.nsfw = -1), U && V && (s["private"] = -1), (S || U) && M ? (s.moderated = -1, s["private"] = 1, s.nsfw = -1) : i && (s.moderated = -1, s["private"] = 0, s.nsfw = -1), O && (s.nsfw = -1), s
        }

        function l(e) {
            var t = r(e);
            switch (e.attr("data-type")) {
                case "channel":
                    t.channel = e.attr("data-channel");
                    break;
                case "search":
                    t.query = e.attr("data-query") || "", delete t.nsfw;
                    break;
                case "feed":
                    t.maxDateCompleted = e.attr("data-min-date-completed");
                    break;
                case "user":
                    t.order || (t.order = "date_completed");
                    break;
                case "tag":
            }
            return t
        }

        function d(e, n) {

            var a, i = e.attr("data-type"),
                o = e.attr("data-subtype"),
                s = l(e);
            "frontpage" === i ? a = "/api/videos/hot/frontpage" : "featured" === i ? a = "/api/videos/featured" : "likes" === i ? a = "/api/likes/list" : "hot" === i ? a = "/api/videos/hot" : "channel" === i ? a = "/api/channels/" + (o || "hot") : "search" === i ? a = "/api/videos/search" : "feed" === i ? a = "/api/videos/following" : "user" === i ? a = "/api/list" : "new" === i ? a = "/api/videos/new" : "tag" === i ? (a = "/api/tag/" + encodeURIComponent(e.attr("data-tag")), "top" === e.attr("data-order") ? (a += "/videos", s.order = "score") : "new" === e.attr("data-order") ? (a += "/videos", s.order = "score") : (a += "/hot", delete s.order)) : a = "/api/list", x(), t.ajax(a, {
                data: s,
                dataType: "json",
                success: function(t) {
                    _(), e.data("nextPageData", t), (t.page.total <= 0 || !t.videos || !t.videos.length) && e.data("eof", !0), n && n(!1, t, e)
                },
                error: function(t) {
                    console.log("front....")
                    _(), e.data("nextPageData", !1), n && n(!0, t, e)
                }
            })
        }

        function c(a, o) {
            var r = "";
            e.each(a.videos, function(e) {
                try {
                    if (a.watching && e.video_id in a.watching && (e.watching = a.watching[e.video_id]), a.viewerVotes && e.video_id in a.viewerVotes && parseInt(a.viewerVotes[e.video_id].value) && (1 === parseInt(a.viewerVotes[e.video_id].value) ? e.viewerVoteUp = !0 : e.viewerVoteDown = !0), window.Viewer && "moderator" === Viewer.acl && (e.isGlobalModerator = !0), o.find('[data-id="' + e.video_id + '"]').length > 0) return void console.log("Got duplicate video " + e.video_id);
                    r += s(e)
                } catch (t) {
                    try {
                        console.log(t)
                    } catch (t) {}
                }
            });
            var l = t(r);
            l.find("source").on("error", function(e) {
                n.onPlayOnHoverVideoSourceError(e)
            }), window.Viewer && l.each(function(e, t) {
                i.attachVideoMenu(t)
            }), o.append(l), a.page && a.page.minDateCompleted && o.attr("data-min-date-completed", a.page.minDateCompleted)
        }

        function u(n) {
            var i = t(n).data("nextPageData");
            if (i && i.videos) {
                var s = [];
                e.each(i.videos, function(e) {
                    s.push(o(e))
                }), a.loadImages(s)
            }
        }

        function p(e) {
            E || (E = !0, e = t(e), e.data("eof") || (e.data("nextPageData") ? (c(e.data("nextPageData"), e), e.data("nextPageData", !1), e.data("renderWhenLoaded", !1), d(e, function() {
                u(e), E = !1
            })) : (e.data("renderWhenLoaded", !0), d(e, function(e, t, n) {
                e || (n.data("nextPageData", !1), c(t, n)), E = !1
            }))))
        }

        function h() {
            t(".js-video-feed").each(function(e, t) {
                p(t)
            })
        }

        function m(e) {
            console.log("scrolling")
            var n = t(e.target),
                a = 0 === window.navigator.platform.indexOf("iPad");
            if (n.hasClass("thumb_title_label"));
            else if (n.parent().hasClass("thumb_wrapper"));
            else if (n.is("a") || a) return;
            e.preventDefault();
            var i = n.parents("li[data-id]"),
                o = n.parents(".videos_list"),
                s = i.find(".thumb_wrapper");
            i.parent().find("> .active").removeClass("active"), o.find("iframe").each(function(e, n) {
                try {
                    n.contentWindow.vjs.players.embed_video_player.pause()
                } catch (a) {}
                var i = t(n).parent().parent();
                t(n).remove(), i.children().show()
            }), i.addClass("active");
            var r, l = s.find("> a"),
                d = l.attr("href").replace(/\/([\w\d]+)$/, function(e, t) {
                    return r = t, "/e/" + t + "?internal&autoplay=1"
                }),
                c = t("<div>").addClass("video_list_embed_container"),
                u = t("<iframe>").attr("class", "video_list_embed_frame loading").attr("name", "embed-player-" + Math.round(1e3 * Math.random())).attr("src", "about:blank").attr("frameborder", 0).attr("allowfullscreen", "allowfullscreen").attr("webkitallowfullscreen", "webkitallowfullscreen").attr("mozallowfullscreen", "mozallowfullscreen").attr("scrolling", "no");
            if (c.append(u), s.children().hide(), s.append(c), t("body").hasClass("pg-index")) try {
                ga("send", "event", "Homepage Video", "Click", "Homepage video clicked", 1)
            } catch (p) {}
            var h = u.offset().top + u.height() / 2,
                m = h - t(window).height() / 2;
            window.scrollEventPause = !0, t("html, body").animate({
                scrollTop: m
            }, {
                duration: 150,
                easing: "linear",
                complete: function() {
                    window.scrollEventPause && (delete window.scrollEventPause, u.on("load", function() {
                        t(this).removeClass("loading")
                    }), u.attr("src", d))
                }
            });
            try {
                ga("send", "event", "Videos", "feedEmbedClick", "Feed embed opened", 1)
            } catch (p) {}
        }

        function v(e) {
            e && e.length && (m({
                target: e.find("img:first"),
                preventDefault: function() {}
            }), e.next() && e.next().length || h())
        }

        function f(e, n) {
            var a = !e,
                i = t(".video_list_embed_frame");
            a ? P && P.length ? P = P.prev() : i && i.length && (P = i.parents("li:first").prev()) : P = P && P.length ? P.next() : i && i.length ? i.parents("li:first").next() : t("ul.js-video-feed > li:first"), P && P.length && (n && n.preventDefault(), I && (clearTimeout(I), I = void 0), I = setTimeout(function() {
                var e = P;
                P = void 0, I = void 0, v(e)
            }, 100))
        }

        function g(e, n) {
            var a = t(".video_list_embed_frame"),
                i = a.attr("name");
            if (a.length && i && i in window.frames) {
                n && n.preventDefault();
                var o = window.frames[i],
                    s = o.vjs.players.embed_video_player,
                    r = s.currentTime();
                s.trigger("keydown"), s.currentTime(r + 5 * (e ? 1 : -1))
            }
        }

        function b(e) {
            if (!(e.keyCode < 37 || e.keyCode > 40)) {
                var n = t(e.target);
                if (!n.is(":input") && !t("body").hasClass("modal-open")) switch (37 === e.keyCode || 39 === e.keyCode ? g(39 === e.keyCode, e) : (38 === e.keyCode || 40 === e.keyCode) && f(40 === e.keyCode, e), e.keyCode) {
                    case 37:
                        w("left");
                        break;
                    case 39:
                        w("right");
                        break;
                    case 38:
                        w("up");
                        break;
                    case 40:
                        w("down")
                }
            }
        }

        function w(e) {
            e && (t(".keyboard_" + e).addClass("active"), setTimeout(function() {
                t(".keyboard_" + e).removeClass("active")
            }, 100))
        }

        function y(e) {
            var n = t(e.target);
            switch (n.is("a") || (n = n.parent()), n.attr("class")) {
                case "keyboard_up":
                    f(!1, e);
                    break;
                case "keyboard_down":
                    f(!0, e);
                    break;
                case "keyboard_left":
                    g(!1, e);
                    break;
                case "keyboard_right":
                    g(!0, e)
            }
        }

        function _() {
            var e = t(".listing > .inner > .loading-more");
            e.remove()
        }

        function k() {
            var e = ['<div class="loading-more">', '<div class="spinner">', "</div>", "</div>"].join("");
            return t(e)
        }

        function x() {
            var e = t(".listing > .inner"),
                n = k();
            _(), e.append(n)
        }

        function C() {
            var e = t(window),
                n = t(document);
            e.on("scrollToBottom", h), t("body").hasClass("device-ios") || n.on("click", ".videos_list .thumb_wrapper", m), t(".js-video-feed").length && (n.on("click", ".keyboard", y), n.on("keydown", b), t("body").append('<div class="keyboard"><span class="keyboard_up"><i class="fa fa-caret-up"></i></span><br /><span class="keyboard_left"><i class="fa fa-caret-left"></i></span><span class="keyboard_down"><i class="fa fa-caret-down"></i></span><span class="keyboard_right"><i class="fa fa-caret-right"></i></span></div>')), E = !0, t(".js-video-feed").each(function(e, n) {
                d(t(n), function() {
                    u(n), E = !1
                })
            })
        }
        var j = window.location + "",
            T = j.replace(/(m|o)=\d+&?/g, "").replace(/[?&]$/, "");
        T += -1 === T.indexOf("?") ? "?" : "&";
        var S, E, I, P, U = window.Viewer && "moderator" === Viewer.acl,
            M = -1 !== j.indexOf("/private"),
            D = -1 !== j.indexOf("moderated=0"),
            O = -1 !== j.indexOf("nsfw=1"),
            V = -1 !== j.indexOf("private=1") || -1 !== j.indexOf("public=0");
        t(C)
    }), define("home", ["jquery", "lib/fit-outside"], function(e, t) {
        "use strict";

        function n(t) {
            var n = e("[data-action='message/number']");
            if (!n.prop("disabled")) {
                var a = n.val();
                e.post("/api/send-download-link", {
                    number: a
                }, function(a) {
                    if (!a.status || "false" === a.status) return require(["jquery-ui/effect-shake"], function() {
                        e(".sendlink>div>div").effect("shake")
                    }), void n.prop("disabled", !1);
                    e(".sendlink>div.control input").val("Download link sent :)").prop("readonly", !0).off("keypress"), e(t.target).off("click");
                    try {
                        mixpanel.track("Download SMS Request")
                    } catch (i) {}
                }), n.prop("disabled", !0)
            }
        }

        function a(t) {
            13 === t.which && e(".sendlink button.btn").trigger("click")
        }

        function i(t) {
            if (t) {
                e(".label-follow-unread").remove();
                var n = '<span class="label label-follow-unread">' + t + "</span>";
                e(".menu-following > a").append(n), e(".navbar-brand").append(n)
            }
        }

        function o() {
            var t = e(".menu-following");
            if (t && t.length)
                if (e("body.pg-following").length) try {
                    localStorage.removeItem("vidmeFeedUnreadCount")
                } catch (n) {} else {
                    try {
                        var a = parseInt(localStorage.getItem("vidmeFeedUnreadCount"));
                        i(a)
                    } catch (n) {}
                    e.ajax({
                        url: "/api/videos/following",
                        success: function(e) {
                            var t = parseInt(e.page.unreadCount);
                            t >= e.page.limit && (t = e.page.limit + "+"), i(t);
                            try {
                                localStorage.setItem("vidmeFeedUnreadCount", t)
                            } catch (n) {}
                        }
                    })
                }
        }

        function s(t) {
            var n = e(t.target);
            if (!n.hasClass("thumb_author_username")) try {
                ga("send", "event", "Homepage Video", "Click", "Homepage video clicked", 1)
            } catch (a) {}
        }

        function r() {
            var t = e(window).scrollTop();
            void 0 !== u && p !== 500 > t && (p = 500 > t, p ? (u.appendTo(".splash_video_wrapper"), u[0].play()) : (u[0].pause(), u.remove()))
        }

        function l() {
            var n = e(".splash_video");
            if (n.length) {
                u = n;
                var a = n[0],
                    i = e(".splash"),
                    o = function() {
                        var e = i.width(),
                            o = i.height() + parseInt(i.css("margin-bottom")),
                            s = t(a.videoWidth, a.videoHeight, e, o, !0);
                        n.css("width", s[0] + "px"), n.css("height", s[1] + "px");
                        var r = Math.round((o - s[1]) / 2);
                        n.css("margin-top", r + "px")
                    },
                    s = function() {
                        "1" !== n.css("opacity") ? (a.currentTime = 0, setTimeout(function() {
                            n.css("opacity", 1), o(), s = o
                        }, 0)) : o()
                    };
                a.videoWidth ? s() : n.on("loadeddata", function() {
                    s()
                }), e(window).on("resize", s).on("scroll", r)
            }
        }

        function d(t) {
            if (!("localhost:3000" == window.location.hostname && Math.round(1e3 * Math.random()) > 10)) {
                var n = e(t.target);
                n.is("a") || (n = n.parents("a").first()), mixpanel.track("App install button on homepage clicked (1%)", {
                    label: n.attr("data-label")
                })
            }
        }

        function c() {
            var t = e(document);
            t.on("click", ".sendlink button.btn", n), t.on("keypress", ".sendlink input:text", a), t.on("click", "#index .thumb_wrapper", s), t.on("click", "#index .applinks a", d), window.Viewer && o(), l()
        }
        var u, p = !0;
        e(c)
    }), define("helpers/userLinkTypeInfo", ["handlebars"], function(e) {
        "use strict";

        function t(e, t) {
            return e in n || (e = "web"), "icon" === t ? cdn + "/images/social-links/" + e + ".png" : n[e]
        }
        var n = {
            facebook: "Facebook",
            linkedin: "LinkedIn",
            soundcloud: "SoundCloud",
            vimeo: "Vimeo",
            "google-plus": "Google+",
            mail: "Mail",
            spotify: "Spotify",
            web: "Web",
            instagram: "Instagram",
            reddit: "Reddit",
            tumblr: "Tumblr",
            youtube: "YouTube",
            email: "Mail",
            twitter: "Twitter"
        };
        return e.registerHelper("userLinkTypeInfo", t), t
    }), define("hbs!../views/settings/_link", ["hbs", "handlebars", "helpers/userLinkTypeInfo"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = this.lambda,
                    s = this.escapeExpression,
                    r = t.helperMissing;
                return '\n<li data-link="' + s(o(null != (i = null != e ? e.link : e) ? i.link_id : i, e)) + '">\n    <img class="link_type" src="' + s((t.userLinkTypeInfo || e && e.userLinkTypeInfo || r).call(e, null != (i = null != e ? e.link : e) ? i.type : i, "icon", {
                    name: "userLinkTypeInfo",
                    hash: {},
                    data: a
                })) + '" alt="" />\n    <input type="hidden" name="links[' + s(o(null != (i = null != e ? e.link : e) ? i.link_id : i, e)) + '][type]" class="js-settings-links-type-input" value="' + s(o(null != (i = null != e ? e.link : e) ? i.type : i, e)) + '" />\n    <input type="text" name="links[' + s(o(null != (i = null != e ? e.link : e) ? i.link_id : i, e)) + '][link]" class="form-control js-settings-links-link-input" placeholder="http://" value="' + s(o(null != (i = null != e ? e.link : e) ? i.link : i, e)) + '" />\n    <input type="text" name="links[' + s(o(null != (i = null != e ? e.link : e) ? i.link_id : i, e)) + '][title]" class="form-control js-settings-links-title-input" placeholder="Short title" value="' + s(o(null != (i = null != e ? e.link : e) ? i.title : i, e)) + '" />\n    <a data-dismiss="close"><i class="fa fa-trash-o"></i></a>\n</li>\n'
            },
            useData: !0
        });
        return t.registerPartial("../views/settings/_link", n), n
    }), define("settings", ["jquery", "phpjs", "lib/ribbon", "helpers/userLinkTypeInfo", "hbs!../views/settings/_link"], function(e, t, n, a, i) {
        "use strict";

        function o(e) {
            return function(t) {
                e.find(".js-error-alert").removeClass("hide"), e.find(".js-error-alert div").html("<strong>Oops!</strong> " + t), e.scrollTop(0)
            }
        }

        function s(e) {
            return function() {
                e.find(".js-error-alert").addClass("hide")
            }
        }

        function r(t) {
            t.preventDefault();
            var a = e(t.target),
                i = o(a),
                r = s(a);
            r();
            var l = {};
            if (e.each(a.serializeArray(), function(e, t) {
                    l[t.name] = t.value
                }), l.password) {
                if (l.password !== l.password_confirm) return i("Please make sure the passwords match.")
            } else delete l.password;
            delete l.password_confirm, e.ajax("/api/user/" + Viewer.user_id + "/edit", {
                type: "POST",
                dataType: "json",
                data: l,
                success: function(e) {
                    return e.status ? void n("Changes saved!") : i(e.error || v)
                },
                error: function(e) {
                    i(e.responseJSON && e.responseJSON.error ? e.responseJSON.error : v)
                }
            })
        }

        function l(t) {
            var a = e(t.target),
                i = o(a),
                s = e(t.target);
            e.ajax("/api/user/email/send-verify", {
                type: "POST",
                dataType: "json",
                success: function(e) {
                    e.status ? (s.parent().remove(), n("Thanks! We sent you an email with a link to confirm your email address.")) : i(v)
                },
                error: function(e) {
                    i(e.responseJSON && e.responseJSON.error ? e.responseJSON.error : v)
                }
            })
        }

        function d() {
            var t = e.post("/api/auth/disconnect/facebook").fail(function() {
                var e = "Whoops, something went wrong. Please try again later.";
                t.responseJSON && ("cannot_deauth_last_method" === t.responseJSON.code ? e = "We can't disconnect Facebook because you haven't created a Vidme password yet. <a class='js-user-password-link' data-nopass='true'>Create one here.</a>" : t.responseJSON.error && (e = t.responseJSON.error)), n({
                    html: e,
                    level: "danger"
                })
            }).done(function() {
                window.location.reload()
            })
        }

        function c() {
            var t = e.post("/api/auth/disconnect/twitter").fail(function() {
                var e = "Whoops, something went wrong. Please try again later.";
                t.responseJSON && ("cannot_deauth_last_method" === t.responseJSON.code ? e = "We can't disconnect Twitter because you haven't created a Vidme password yet. <a class='js-user-password-link' data-nopass='true'>Create one here.</a>" : t.responseJSON.error && (e = t.responseJSON.error)), n({
                    text: e,
                    level: "danger"
                })
            }).done(function() {
                window.location.reload()
            })
        }

        function u(t) {
            var n = e(t.target),
                a = n.parents(".settings_links").find("ul"),
                o = i({
                    link: {
                        link_id: "_" + ++g
                    }
                });
            a.append(o)
        }

        function p(t) {
            var n = e(t.target),
                a = n.parents("li").first(),
                i = a.attr("data-link");
            "_" !== (i + "").charAt(0) && a.parents(".settings_links").append(e('<input type="hidden" name="links[' + i + ']" value="delete">')), a.remove()
        }

        function h(n) {
            var i, o = e(n.target),
                s = o.parents("li").first(),
                r = s.find(".js-settings-links-link-input"),
                l = r.val();
            if (-1 !== l.indexOf("@")) i = "email";
            else {
                l && 0 !== l.toLowerCase().indexOf("http") && (l = "http://" + l);
                var d = t.parse_url(l);
                d.host && (d.host = d.host.replace(/^www\./, ""));
                var i = "globe";
                d.host in f && (i = f[d.host])
            }
            s.find("img").attr("src", a(i, "icon")), s.find(".js-settings-links-type-input").val(i)
        }

        function m() {
            var t = e(document);
            t.on("submit", ".js-form-settings", r), t.on("click", ".js-user-email-verify-send", l), t.on("click", ".js-disconnect-facebook", d), t.on("click", ".js-disconnect-twitter", c), t.on("click", ".js-form-settings .settings_links_add", u), t.on("click", '.js-form-settings a[data-dismiss="close"]', p);
            var n;
            t.on("paste cut change propertychange", ".js-form-settings .settings_links input", function(e) {
                setTimeout(function() {
                    h(e)
                }, 10)
            }), t.on("keyup touchend input", ".js-form-settings .settings_links input", function(e) {
                n && clearTimeout(n), n = setTimeout(function() {
                    h(e)
                }, 250)
            })
        }
        var v = "Whoops! Something went wrong, please try again later.",
            f = {
                "bitbucket.org": "bitbucket",
                "deviantart.com": "deviantart",
                "dropbox.com": "dropbox",
                "facebook.com": "facebook",
                "flickr.com": "flickr",
                "foursquare.com": "foursquare",
                "github.com": "github",
                "gratipay.com": "gratipay",
                "instagram.com": "instagram",
                "jsfiddle.net": "jsfiddle",
                "kernel.org": "linux",
                "launchpad.net": "empire",
                "linkedin.com": "linkedin",
                "medium.com": "medium",
                "news.ycombinator.com": "hacker-news",
                "openid.net": "openid",
                "pinterest.com": "pinterest",
                "plus.google.com": "google-plus",
                "reddit.com": "reddit",
                "renren.com": "renren",
                "skype.com": "skype",
                "slack.com": "slack",
                "soundclound.com": "soundcloud",
                "spotify.com": "spotify",
                "stackexchange.com": "stack-exchange",
                "stackoverflow.com": "stack-overflow",
                "steamcommunity.com": "steam",
                "stumbleupon.com": "stumbleupon",
                "tumblr.com": "tumblr",
                "twitch.tv": "twitch",
                "twitter.com": "twitter",
                "vine.co": "vine",
                "vk.com": "vk",
                "weibo.com": "weibo",
                "microsoft.com": "windows",
                "wordpress.com": "wordpress",
                "xing.com": "xing",
                "yahoo.com": "yahoo",
                "yelp.com": "yelp",
                "youtube.com": "youtube"
            },
            g = 0;
        e(m)
    }), define("hbs!views/sign-in", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="modal" id="sign-in-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Log in</h4>\n      </div>\n      <form role="form" id="login-form" class="login-form" onsubmit="event.preventDefault()">\n        <div class="modal-body">\n          <div class="alert alert-warning in hide">\n            <div>\n              <strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.\n            </div>\n          </div>\n\n          <div class="social-auth">\n            <div class="social-auth-buttons">\n              <a href="/connect/twitter" class="social-auth-twitter"><i class="fa fa-twitter"></i></a>\n              <a href="/connect/facebook" class="social-auth-facebook"><i class="fa fa-facebook"></i></a>\n            </div>\n          </div>\n\n          <div class="form-group">\n            <!--<label for="loginInputUsername">Username</label>-->\n            <input name="identity" type="" class="form-control" autocapitalize="off" id="loginInputIdentity"\n                   placeholder="Username" autofocus>\n          </div>\n          <div class="form-group">\n            <!--<label for="loginInputPassword">\n              Password\n              <span class="login-forgot">\n                <a class="forgot-password-link">forgot?</a>\n              </span>\n            </label>-->\n            <input name="password" type="password" class="form-control" id="loginInputPassword" placeholder="Password">\n          </div>\n          <div>\n            <span class="login-forgot">\n              <a class="forgot-password-link">forgot?</a>\n            </span>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-info submit-login">\n            Log in\n            <i class="fa fa-spinner fa-spin hide"></i>\n          </button>\n          <span class="form-alternative">\n            <a class="sign-up-instead">Create an account</a>\n          </span>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/sign-in", n), n
    }), define("sign-in", ["jquery", "hbs!views/sign-in"], function(e, t) {
        "use strict";

        function n() {
            var n = e("#sign-in-modal");
            return n.length <= 0 && (n = e(t()), e("body").append(n)), n
        }

        function a(t) {
            t && t.preventDefault(), n().modal("show"), e("#loginInputIdentity")[0].focus()
        }

        function i() {
            h.show()
        }

        function o() {
            e("body").hasClass("device-desktop") || e(".player > .video-js").hide()
        }

        function s() {
            window.signInUpCallback = void 0, e("body").hasClass("device-desktop") || e(".player > .video-js").show()
        }

        function r(t) {
            t && t.preventDefault();
            var n = e("#login-form"),
                a = !1,
                i = "";
            try {
                l()
            } catch (o) {
                a = !0, i = o.toString()
            }
            return a ? (e("#sign-in-modal .alert").removeClass("hide"), e("#sign-in-modal .alert div").html("<strong>Oops!</strong> " + i + ' <a class="forgot-password-link">Forgot your password?</a>'), void e("#sign-in-modal").scrollTop(0)) : (e(".submit-login").addClass("disabled"), e(".submit-login i").removeClass("hide"), void e.ajax("/api/auth/create", {
                dataType: "json",
                type: "POST",
                data: n.serialize(),
                success: d,
                error: c
            }))
        }

        function l() {
            if ("" === e("#loginInputIdentity").val().trim()) throw "Username is required.";
            if ("" === e("#loginInputPassword").val().trim()) throw "A password is required."
        }

        function d(t) {
            if (e(".submit-login").removeClass("disabled"), e(".submit-login i").addClass("hide"), t.status) {
                window.Viewer = t.user;
                try {
                    ga("send", "event", "Users", "signIn", "User signed in", 1), mixpanel.track("User Sign-In")
                } catch (n) {}
                window.signInUpCallback ? window.signInUpCallback(t) : setTimeout(function() {
                    window.location.reload()
                }, 500)
            } else e(".submit-login").removeClass("disabled"), e(".submit-login i").addClass("hide"), e("#sign-in-modal .alert").removeClass("hide"), e("#sign-in-modal .alert div").html("<strong>Oops!</strong> " + t.error + ' <a class="forgot-password-link">Forgot your password?</a>'), e("#sign-in-modal").scrollTop(0)
        }

        function c(t) {
            e(".submit-login").removeClass("disabled"), e(".submit-login i").addClass("hide");
            var n = e.parseJSON(t.responseText);
            e("#sign-in-modal .alert").removeClass("hide"), e("#sign-in-modal .alert div").html("<strong>Oops!</strong> " + n.error + ' <a class="forgot-password-link">Forgot your password?</a>'), e("#sign-in-modal").scrollTop(0)
        }

        function u(t) {
            t && t.preventDefault();
            var n = e(t.target),
                a = n.attr("href");
            try {
                ga("send", "event", "Users", "signOut", "User signed out", 1), mixpanel.track("User Sign-Out")
            } catch (i) {}
            setTimeout(function() {
                window.location = a
            }, 500)
        }

        function p() {
            var t = e(document);
            t.on("click", ".sign-in-link", a), t.on("click", ".sign-up-instead", i), t.on("click", ".sign-out-link", u), t.on("submit", ".login-form", r), t.on("show.bs.modal", "#sign-in-modal", o), t.on("hide.bs.modal", "#sign-in-modal", s)
        }
        var h;
        return require(["sign-up"], function(e) {
            h = e
        }), e(p), {
            show: a
        }
    }), define("hbs!views/sign-up", ["hbs", "handlebars", "helpers/ifcmp"], function(e, t) {
        var n = t.template({
            1: function() {
                return "          with Facebook\n"
            },
            3: function() {
                return "          with Twitter\n"
            },
            5: function() {
                return ""
            },
            7: function() {
                return '          <div class="social-auth">\n            <div class="social-auth-buttons">\n              <a href="/connect/twitter" class="social-auth-twitter"><i class="fa fa-twitter"></i></a>\n              <a href="/connect/facebook" class="social-auth-facebook"><i class="fa fa-facebook"></i></a>\n            </div>\n            <div class="social-auth-or">Or pick a username and password:</div>\n          </div>\n'
            },
            9: function() {
                return '            <label for="signupInputUsername">Please choose a Vidme username:</label>\n'
            },
            11: function() {
                return '          <div class="form-group">\n            <!--<label for="signupInputPassword">Password</label>-->\n            <input name="password" type="password" class="form-control" id="signupInputPassword" placeholder="Password">\n          </div>\n          <div class="form-group">\n            <!--<label for="signupInputPasswordConfirm">Password again</label>-->\n            <input name="password_confirm" type="password" class="form-control" id="signupInputPasswordConfirm" placeholder="Retype password">\n          </div>\n'
            },
            13: function() {
                return '          <span class="form-alternative">\n            <a class="sign-in-instead">Log in to your account</a>\n          </span>\n'
            },
            15: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '        <input type="hidden" name="facebook_connect_id" value="' + r((i = null != (i = t.facebookConnectId || (null != e ? e.facebookConnectId : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "facebookConnectId",
                    hash: {},
                    data: a
                }) : i)) + '">\n'
            },
            17: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '        <input type="hidden" name="twitter_connect_id" value="' + r((i = null != (i = t.twitterConnectId || (null != e ? e.twitterConnectId : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "twitterConnectId",
                    hash: {},
                    data: a
                }) : i)) + '">\n'
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = t.helperMissing,
                    r = "function",
                    l = this.escapeExpression,
                    d = '\n<div class="modal" id="sign-up-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">\n          Sign up\n';
                return i = t["if"].call(e, null != e ? e.facebookConnectId : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.twitterConnectId : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(3, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '        </h4>\n      </div>\n      <form role="form" id="signup-form" class="form-signup" onsubmit="event.preventDefault()">\n        <div class="modal-body">\n          <div class="alert alert-warning in hide">\n            <div>\n              <strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.\n            </div>\n          </div>\n\n', i = (t.ifcmp || e && e.ifcmp || s).call(e, null != e ? e.facebookConnectId : e, "||", null != e ? e.twitterConnectId : e, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.program(7, a),
                    data: a
                }), null != i && (d += i), d += '\n          <div class="form-group">\n', i = (t.ifcmp || e && e.ifcmp || s).call(e, null != e ? e.facebookConnectId : e, "||", null != e ? e.twitterConnectId : e, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(9, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '            <!--<label for="signupInputUsername">Username</label>-->\n            <input type="text" name="username" class="form-control" autocapitalize="off" id="signupInputUsername" value="' + l((o = null != (o = t.username || (null != e ? e.username : e)) ? o : s, typeof o === r ? o.call(e, {
                    name: "username",
                    hash: {},
                    data: a
                }) : o)) + '" placeholder="Username">\n          </div>\n          <div class="form-group">\n            <!--<label for="signupInputEmail">Email address <span class="light">(optional)</span></label>-->\n            <input name="email" type="email" class="form-control" autocapitalize="off" id="signupInputEmail" value="' + l((o = null != (o = t.email || (null != e ? e.email : e)) ? o : s, typeof o === r ? o.call(e, {
                    name: "email",
                    hash: {},
                    data: a
                }) : o)) + '" placeholder="Email address (optional)">\n          </div>\n', i = t.unless.call(e, null != e ? e.nopass : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(11, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d += '        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success create-account">Sign up <i class="fa fa-spinner fa-spin hide"></i></button>\n', i = (t.ifcmp || e && e.ifcmp || s).call(e, null != e ? e.facebookConnectId : e, "||", null != e ? e.twitterConnectId : e, {
                    name: "ifcmp",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.program(13, a),
                    data: a
                }), null != i && (d += i), d += "        </div>\n", i = t["if"].call(e, null != e ? e.facebookConnectId : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(15, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), i = t["if"].call(e, null != e ? e.twitterConnectId : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(17, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + "      </form>\n    </div>\n  </div>\n</div>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/sign-up", n), n
    }), define("sign-up", ["jquery", "hbs!views/sign-up"], function(e, t) {
        "use strict";

        function n(n) {
            return e("#sign-up-modal").length <= 0 && e("body").append(t(n || {})), e("#sign-up-modal")
        }

        function a(t) {
            t && t.preventDefault();
            var a = n().modal("show");
            if (e("#signupInputUsername")[0].focus(), t) {
                var i = e(t.target).attr("data-claim-video"),
                    o = e(t.target).attr("data-claim-token");
                o && a.attr("data-claim-video", i).attr("data-claim-token", o)
            }
        }

        function i() {
            p.show()
        }

        function o() {
            e("body").hasClass("device-desktop") || e(".player > .video-js").hide()
        }

        function s() {
            window.signInUpCallback = void 0, e("body").hasClass("device-desktop") || e(".player > .video-js").show()
        }

        function r(t) {
            t && t.preventDefault();
            var a = n(),
                i = e("#signup-form"),
                o = i.serialize();
            i.find(".alert").addClass("hide");
            var s = !1,
                r = "";
            try {
                l()
            } catch (u) {
                s = !0, r = u.toString()
            }
            return s ? (i.find(".alert").removeClass("hide"), i.find(".alert div").html("<strong>Oops!</strong> " + r), void a.scrollTop(0)) : (i.find(".create-account").addClass("disabled"), i.find(".create-account i").removeClass("hide"), void e.ajax("/api/user/create", {
                dataType: "json",
                type: "POST",
                data: o,
                success: d,
                error: c
            }))
        }

        function l() {
            if ("" === e("#signupInputUsername").val().trim()) throw "Please choose a username.";
            if (e("#signupInputUsername").val().trim().length < 3) throw "Please select a username that is at least 3 characters long.";
            var t;
            if ((t = e(':input[name="facebook_connect_id"]')).length && "" !== t.val().trim());
            else if ((t = e(':input[name="twitter_connect_id"]')).length && "" !== t.val().trim());
            else {
                if ("" === e("#signupInputPassword").val().trim()) throw "A password is required.";
                if (e("#signupInputPassword").val().trim().length < 3) throw "Please use a password that is at least 3 characters long.";
                if (e("#signupInputPassword").val().trim() !== e("#signupInputPasswordConfirm").val().trim()) throw "The passwords do not match."
            }
        }

        function d(t) {
            function a() {
                window.signInUpCallback ? window.signInUpCallback(t) : setTimeout(function() {
                    window.location = t.user.full_url
                }, 500)
            }
            var i = n();
            if (t.status) {
                window.Viewer = t.user;
                try {
                    ga("send", "event", "Users", "signUp", "User signed up", 1), mixpanel.track("User Sign-Up", {
                        Method: i.attr("data-method")
                    })
                } catch (o) {}
                var s = n().attr("data-claim-video"),
                    r = n().attr("data-claim-token");
                s && r ? e.ajax("/api/video/" + s + "/claim", {
                    type: "POST",
                    dataType: "json",
                    data: {
                        claimToken: r
                    },
                    complete: a
                }) : a()
            } else i.find(".create-account").removeClass("disabled"), i.find(".create-account i").addClass("hide"), i.find(".alert").removeClass("hide"), i.find(".alert div").html("<strong>Oops!</strong> " + t.error), i.scrollTop(0)
        }

        function c(t) {
            var a = n();
            a.find(".create-account").removeClass("disabled"), a.find(".create-account i").addClass("hide");
            var i = e.parseJSON(t.responseText);
            a.find(".alert").removeClass("hide"), a.find(".alert div").html("<strong>Oops!</strong> " + i.error), a.scrollTop(0)
        }

        function u() {
            var t = e(document);
            t.on("click", ".sign-up-link", a), t.on("click", ".sign-in-instead", i), t.on("show.bs.modal", "#sign-up-modal", o), t.on("hide.bs.modal", "#sign-up-modal", s), t.on("submit", ".form-signup", r), e(document.body).hasClass("pg-auth-facebookreceiver") ? n({
                nopass: !0,
                facebookConnectId: window.signupFacebookConnectId,
                email: window.signupEmail,
                username: window.signupUsername,
                redirectUri: window.signupRedirectUri,
                method: "facebook"
            }).attr("data-method", "facebook").modal("show") : e(document.body).hasClass("pg-auth-twitterreceiver") && n({
                nopass: !0,
                twitterConnectId: window.signupTwitterConnectId,
                username: window.signupUsername,
                redirectUri: window.signupRedirectUri
            }).attr("data-method", "twitter").modal("show")
        }
        var p;
        return require(["sign-in"], function(e) {
            p = e
        }), e(u), {
            show: a
        }
    }), define("follow", ["jquery"], function(e) {
        "use strict";

        function t(t) {
            t && t.preventDefault();
            var a = e(t.target);
            return window.Viewer ? void n(a) : (window.signInUpCallback = function() {
                e(".modal").modal("hide"), n(a)
            }, void e(".sign-in-link").trigger("click"))
        }

        function n(t) {
            if (t.hasClass("fa") && (t = t.parent(".video_gutter_actions a")), !t.hasClass("self")) {
                var n, o = parseInt(t.attr("data-follower-count"));
                t.hasClass("following") ? (n = 1, t.removeClass("following"), t.removeClass("btn-info"), t.addClass("btn-default"), t.html("Follow"), o -= 1) : (n = 0, t.removeClass("btn-default"), t.addClass("following"), t.addClass("btn-info"), t.html("<i class='fa fa-check'></i> Following"), o += 1), 0 > o && (o = 0), t.attr("data-follower-count", o), e("#user_view").length > 0 && (e("#user_view .follower-count .num").html(o), e("#user_view .follower-count .unit").html(1 === o ? " follower" : " followers"));
                try {
                    e.ajax({
                        type: "POST",
                        url: "/api/user/" + t.attr("data-user-id") + "/" + (n ? "unfollow" : "follow"),
                        dataType: "json",
                        success: a,
                        error: i
                    })
                } catch (s) {
                    (console.error || console.log)(s)
                }
                try {
                    mixpanel.track("User " + (n ? "Unfollowed" : "Followed"), {
                        FollowerUsername: window.Viewer.username,
                        FolloweeUsername: t.attr("data-username") || null
                    })
                } catch (s) {}
            }
        }

        function a(e) {
            e.status || i({
                responseJSON: {
                    error: e.error
                }
            })
        }

        function i() {}

        function o() {
            var n = e(document);
            n.on("click", ".js-user-follow", t)
        }
        e(o)
    }), define("helpers/userPhoto", ["handlebars", "phpjs"], function(e, t) {
        "use strict";

        function n(e, n) {
            var a = t.strrpos(e, ".");
            return !1 === a ? e + "." + n : t.substr(e, 0, a) + "." + n + "." + t.substr(e, a + 1)
        }

        function a(e, t) {
            var a = e && e.avatar && "none" !== e.avatar ? e.avatar : void 0;
            if (t = "string" == typeof t && -1 !== ["small", "medium", "original", "square"].indexOf(t) ? t : "small", a) {
                a = cdnStorage + "/" + a;
                var o = 1,
                    s = a.indexOf("?v");
                return -1 !== s && (o = parseInt(a.substr(s + 2, s + 3))), o in i || (t = "medium"), -1 === i[o].indexOf(t) && (t = "medium"), "medium" !== t && (a = n(a, t)), a
            }
            if (e && e.user_id) {
                var r = e && e.user_id ? parseInt(e.user_id) : 0;
                return cdn + "/images/default-avatars/" + (r % 50 + 1) + ".png?" + cdnCounter
            }
            return cdn + "/images/default-avatars/anon.png?" + cdnCounter
        }
        var i = {
            1: ["original", "medium"],
            2: ["original", "medium", "small"],
            3: ["original", "medium", "small", "square"],
            4: ["original", "medium", "small", "square", "square-medium"]
        };
        return e.registerHelper("userPhoto", a), a
    }), define("hbs!views/avatar-upload", ["hbs", "handlebars", "helpers/userPhoto"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i = t.helperMissing,
                    o = this.escapeExpression;
                return '\n<div id="avatar-upload-modal" class="modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4 class="modal-title">Upload a profile photo</h4>\n      </div>\n      <div class="modal-body">\n        <div class="message">\n          <div class="alert alert-danger"></div>\n        </div>\n        \n        <form id="avatarupload" action="javascript:void(0)" method="POST" enctype="multipart/form-data">\n          <div id="avatardropzone" class="cta draganddrop visible-desktop">\n            <span class="choose">\n              Choose a photo\n              <input type="file" name="filedata" accept="image/*">\n            </span>\n            <span class="or">or</span>\n            <span class="drop">\n              drop it here\n            </span>\n          </div>\n          <div class="draganddrop visible-phone visible-tablet">\n            <a class="choose btn btn-info">\n              <i class="fa fa-upload"></i>\n              Choose a photo\n              <input type="file" name="filedata" accept="image/*">\n            </a>\n          </div>\n        </form>\n        \n        <div class="progress progress-striped active">\n          <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">\n            <span class="sr-only">0% Complete</span>\n          </div>\n        </div>\n        \n        <div class="crop-area hide">\n          <img src="' + o((t.userPhoto || e && e.userPhoto || i).call(e, null != e ? e.user : e, "original", {
                    name: "userPhoto",
                    hash: {},
                    data: a
                })) + '">\n        </div>\n        \n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">Cancel</button>\n        <span class="form-alternative">\n          <a class="js-avatar-crop">Crop photo</a>\n        </span>\n        <a class="js-avatar-crop-send btn btn-primary pull-right hide">Save changes <i class="fa fa-spinner fa-spin hide"></i></a>\n        <button type="button" class="btn btn-danger remove-avatar-button pull-right">Remove photo</button>\n      </div>\n    </div>\n  </div>\n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/avatar-upload", n), n
    }), define("avatar", ["jquery", "async", "hbs!views/avatar-upload"], function(e, t, n) {
        "use strict";

        function a() {
            if (e("#avatar-upload-modal").length <= 0) {
                var t = e(n({
                    user: Viewer
                }));
                return t.on("show.bs.modal", function() {
                    e("body").addClass("alt-drop-zone")
                }).on("hide.bs.modal", function() {
                    e("body").removeClass("alt-drop-zone")
                }).on("hidden.bs.modal", function() {
                    t.remove()
                }), e("body").append(t), t
            }
            return e("#avatar-upload-modal")
        }

        function i(t) {
            var n = e(t.target),
                i = a();
            i.modal({
                backdrop: "static"
            }), n.attr("data-avatar-status") ? i.find(".remove-avatar-button").on("click", d) : i.find(".remove-avatar-button").hide(), require(["css!cropper", "cropper"], function() {}), require(["jquery-fileupload"], function() {
                e("#avatar-upload-modal #avatarupload").fileupload({
                    dataType: "json",
                    dropZone: e("#avatardropzone"),
                    autoUpload: !0,
                    add: o,
                    done: s,
                    fail: r,
                    progressall: l
                })
            })
        }

        function o(t, n) {
            var a = n.files[0].size;
            return a > 15e6 ? void e("#avatar-upload-modal .message").show().find(".alert").text("The image you selected is too big. Please choose a smaller one.") : (e(".js-avatar-crop").addClass("hide"), e("#avatarupload").attr("action", "/api/user/" + Viewer.user_id + "/avatar/update"), e("#avatar-upload-modal .message").hide(), e("#avatar-upload-modal .pre-upload").show(), e("#avatarupload").hide(), e("#avatar-upload-modal .remove-avatar-button").hide(), e("#avatar-upload-modal .modal-title").html("Uploading photo..."), void n.submit())
        }

        function s() {
            window.location.reload()
        }

        function r(t, n) {
            if ("undefined" != typeof n.jqXHR.responseText && null !== e.parseJSON(n.jqXHR.responseText)) {
                var a = e.parseJSON(n.jqXHR.responseText).error;
                e("#avatar-upload-modal .message").show().find(".alert").text(a)
            } else e("#avatar-upload-modal .message").show().find(".alert").text("Oops! That was not supposed to happen... Please try again.");
            e(".progress").hide(), e(".progress .progress-bar").css("width", "0%").attr("arial-valuenow", 0)
        }

        function l(t, n) {
            var a = parseInt(n.loaded / n.total * 100, 10);
            e(".progress").show(), e(".progress .progress-bar").css("width", a + "%").attr("arial-valuenow", a)
        }

        function d(t) {
            t && t.preventDefault(), e.ajax({
                type: "POST",
                url: "/api/user/" + Viewer.user_id + "/avatar/remove",
                dataType: "json",
                success: c
            })
        }

        function c() {
            window.location.reload()
        }

        function u() {
            function n() {
                var t = i[0].width / i[0].height,
                    n = Math.round(e(window).height() / 2),
                    o = Math.round(n * t);
                e.each([a, i], function(e, t) {
                    t.css("max-height", n + "px").css("max-width", o + "px")
                })
            }
            var a = e(".crop-area");
            if (a.hasClass("hide")) {
                e("#avatarupload").addClass("hide"), e("#avatar-upload-modal .modal-title").text("Crop profile photo"), e(".js-avatar-crop-send").removeClass("hide").addClass("disabled").prop("disabled", !0), e(".js-avatar-crop").addClass("hide"), e(".remove-avatar-button").addClass("hide"), a.removeClass("hide"), e(".js-avatar-crop-send .fa-spinner").removeClass("hide");
                var i = a.find("img");
                i.on("built.cropper", function() {
                    e(".js-avatar-crop-send .fa-spinner").addClass("hide"), e(".js-avatar-crop-send").removeClass("disabled").prop("disabled", !1)
                }), t.parallel([function(e) {
                    var t = function() {
                        n(), e(), e = function() {}
                    };
                    i[0].width ? t() : i.on("load", t).on("error", t)
                }, function(e) {
                    require(["css!cropper", "cropper"], function() {
                        e()
                    })
                }], function() {
                    i.cropper({
                        aspectRatio: 1,
                        rotatable: !1
                    })
                })
            }
        }

        function p() {
            var t = e(".crop-area > img"),
                n = t.cropper("getData");
            e(".js-avatar-crop-send").addClass("disabled").prop("disabled", !0), e(".js-avatar-crop-send .fa-spinner").removeClass("hide"), e.ajax({
                type: "POST",
                url: "/api/user/" + Viewer.user_id + "/avatar/crop",
                data: n,
                success: function() {
                    window.location.reload()
                },
                error: function() {
                    alert("Whoops! Something went wrong.")
                },
                complete: function() {
                    e(".js-avatar-crop-send .fa-spinner").addClass("hide"), e(".js-avatar-crop-send").removeClass("disabled").prop("disabled", !1)
                }
            })
        }

        function h() {
            var t = e(document);
            t.on("click", ".edit-avatar-link", i), t.on("click", "#avatar-upload-modal .js-avatar-crop", u), t.on("click", "#avatar-upload-modal .js-avatar-crop-send", p)
        }
        e(h)
    }), define("helpers/implode", ["handlebars"], function(e) {
        "use strict";

        function t(e, t) {
            return t.join(e)
        }
        return e.registerHelper("implode", t), t
    }), define("helpers/commentFlags", ["handlebars"], function(e) {
        "use strict";

        function t(e, t) {
            var n = [];
            return t && e.user_id === t.user_id && n.push("comment-op"), e.user_id === Viewer.user_id && "moderator" === Viewer.acl && n.push("comment-mod"), n
        }
        return e.registerHelper("commentFlags", t), t
    }), define("hbs!../views/_commentList", ["hbs", "handlebars", "helpers/implode", "helpers/commentFlags", "helpers/userUrl", "helpers/userPhoto", "helpers/userName", "helpers/timestamp"], function(e, t) {
        var n = t.template({
            1: function() {
                return "comments_list js-comments-list"
            },
            3: function() {
                return "comments_list_child js-comments-list-child"
            },
            5: function(e, t, n, a, i) {
                var o, s, r = t.helperMissing,
                    l = this.escapeExpression,
                    d = "function",
                    c = '        <li class="js-comment-container ' + l((t.implode || e && e.implode || r).call(e, " ", (t.commentFlags || e && e.commentFlags || r).call(e, e, null != i[1] ? i[1].parent : i[1], null != i[1] ? i[1].channelModeratorUserIds : i[1], {
                        name: "commentFlags",
                        hash: {},
                        data: a
                    }), {
                        name: "implode",
                        hash: {},
                        data: a
                    })) + '"\n            data-comment="' + l((s = null != (s = t.comment_id || (null != e ? e.comment_id : e)) ? s : r, typeof s === d ? s.call(e, {
                        name: "comment_id",
                        hash: {},
                        data: a
                    }) : s)) + '" id="comment-' + l((s = null != (s = t.comment_id || (null != e ? e.comment_id : e)) ? s : r, typeof s === d ? s.call(e, {
                        name: "comment_id",
                        hash: {},
                        data: a
                    }) : s)) + '">\n            <ul class="comment_vote">\n                <li class="comment_upvote js-comment-vote-up';
                return o = t["if"].call(e, (t.eq || e && e.eq || r).call(e, 1, null != (o = null != e ? e.viewerVote : e) ? o.value : o, {
                    name: "eq",
                    hash: {},
                    data: a
                }), {
                    name: "if",
                    hash: {},
                    fn: this.program(6, a, i),
                    inverse: this.noop,
                    data: a
                }), null != o && (c += o), c += '">\n                    <a><i class="fa fa-chevron-up"></i></a>\n                </li>\n                <li class="comment_downvote js-comment-vote-down', o = t["if"].call(e, (t.eq || e && e.eq || r).call(e, -1, null != (o = null != e ? e.viewerVote : e) ? o.value : o, {
                    name: "eq",
                    hash: {},
                    data: a
                }), {
                    name: "if",
                    hash: {},
                    fn: this.program(6, a, i),
                    inverse: this.noop,
                    data: a
                }), null != o && (c += o), c += '">\n                    <a><i class="fa fa-chevron-down"></i></a>\n                </li>\n            </ul>\n            <div class="inner">\n                <div class="comment_author_photo">\n                    <a href="' + l((t.userUrl || e && e.userUrl || r).call(e, null != e ? e.user : e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '">\n                        <img src="' + l((t.userPhoto || e && e.userPhoto || r).call(e, null != e ? e.user : e, "square", {
                    name: "userPhoto",
                    hash: {},
                    data: a
                })) + '" alt="">\n                    </a>\n                </div>\n                <div class="comment_inner">\n                    <span class="comment_author_username">\n                        <a href="' + l((t.userUrl || e && e.userUrl || r).call(e, null != e ? e.user : e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '">' + l((t.userName || e && e.userName || r).call(e, null != e ? e.user : e, {
                    name: "userName",
                    hash: {},
                    data: a
                })) + '</a>\n                    </span>\n                    <span class="comment_body auto-link auto-tag auto-mention">' + l((s = null != (s = t.body || (null != e ? e.body : e)) ? s : r, typeof s === d ? s.call(e, {
                    name: "body",
                    hash: {},
                    data: a
                }) : s)) + '</span>\n                    <span class="comment_date">' + l((t.timestamp || e && e.timestamp || r).call(e, null != e ? e.date_created : e, {
                    name: "timestamp",
                    hash: {},
                    data: a
                })) + "</span>\n", o = t["if"].call(e, (t.canDeleteComment || e && e.canDeleteComment || r).call(e, null != i[1] ? i[1].currentUser : i[1], e, null != i[1] ? i[1].parent : i[1], null != i[1] ? i[1].isChannelModerator : i[1], {
                    name: "canDeleteComment",
                    hash: {},
                    data: a
                }), {
                    name: "if",
                    hash: {},
                    fn: this.program(8, a, i),
                    inverse: this.noop,
                    data: a
                }), null != o && (c += o), c + "                </div>\n            </div>\n        </li>\n"
            },
            6: function() {
                return " active"
            },
            8: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '                        <span class="comment_delete js-comment-delete"\n                              data-comment="' + r((i = null != (i = t.comment_id || (null != e ? e.comment_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "comment_id",
                    hash: {},
                    data: a
                }) : i)) + '"\n                              data-user="' + r((i = null != (i = t.user_id || (null != e ? e.user_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "user_id",
                    hash: {},
                    data: a
                }) : i)) + '">\n                            <a>delete</a>\n                        </span>\n'
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a, i) {
                var o, s = '\n<ul class="';
                return o = t["if"].call(e, null != e ? e.top : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, a, i),
                    inverse: this.program(3, a, i),
                    data: a
                }), null != o && (s += o), s += '">\n', o = t.each.call(e, null != e ? e.comments : e, {
                    name: "each",
                    hash: {},
                    fn: this.program(5, a, i),
                    inverse: this.noop,
                    data: a
                }), null != o && (s += o), s + "</ul>\n"
            },
            useData: !0,
            useDepths: !0
        });
        return t.registerPartial("../views/_commentList", n), n
    }), define("hbs!views/comment-composer", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="comments_composer js-comment-composer">\n  <div class="comments_composer_input">\n    <textarea placeholder="Say something..." class="js-mentioner js-tagger"\n              style="overflow: hidden; word-wrap: break-word; resize: none; height: 20px;"></textarea>\n  </div>\n  <div class="comments_composer_submit" style="display: none;">\n    <button class="btn btn-info js-comment-submit">\n      Post comment\n    </button>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/comment-composer", n), n
    }), define("helpers/eq", ["handlebars", "jquery"], function(e) {
        "use strict";

        function t(e, t) {
            return e == t
        }
        return e.registerHelper("eq", t), t
    }), define("helpers/canDeleteComment", ["handlebars"], function(e) {
        "use strict";

        function t(e, t, n, a) {
            if (!e) return !1;
            var i = e.user_id === t.user_id,
                o = "moderator" === e.acl || e.isModerator,
                s = n && e.user_id === n.user_id;
            return a || i || o || s
        }
        return e.registerHelper("canDeleteComment", t), t
    }), define("comments", ["jquery", "phpjs", "videojs", "hbs!../views/_commentList", "hbs!views/comment-composer", "sign-in", "helpers/eq", "helpers/canDeleteComment"], function(e, t, n, a, i, o) {
        "use strict";

        function s(t, n) {
            e.ajax("/api/comment/" + t + "/delete", {
                type: "POST",
                dataType: "json",
                success: function() {
                    n && n()
                },
                error: function() {
                    n && n(!0)
                }
            })
        }

        function r(n, i) {
            var o = n.comment;
            o.viewerVote = {
                value: 1
            }, o.user = Viewer;
            var s = e(a({
                currentUser: Viewer,
                comments: [o]
            })).find("li").first();
            if (n.comment.parent_comment_id) {
                var r = i.find('.js-comment-container[data-comment="' + n.comment.parent_comment_id + '"]'),
                    l = r.find("> .js-comments-list-child");
                l && l.length || (l = e('<ul class="comments_list_child js-comments-list-child"></ul>').appendTo(r)), l.prepend(s)
            } else i.find(".js-comments-list").append(s);
            var d = i.find(".js-comment-count"),
                c = 1 + parseInt(d.attr("data-count")),
                u = 1 === c ? "comment" : "comments";
            d.attr("data-count", c).text(t.number_format(c) + " " + u), i.find(".js-comments-list .js-comment-composer").remove(), i.find(".auto-link").autoLink().autoTag().autoMention();
            try {
                mixpanel.track("Commented Created")
            } catch (p) {}
        }

        function l(n) {
            if (!k) {
                k = !0;
                var a = e(n.target);
                a.hasClass("js-comment-delete") || (a = a.parents(".js-comment-delete:first"));
                var i = a.attr("data-comment");
                s(i, function(n) {
                    return k = !1, n ? void alert("Whoops! Something went wrong, please try again later") : void e('.js-comment-container[data-comment="' + i + '"]').each(function(n, a) {
                        a = e(a);
                        var i = a.parents(".js-comments").find(".js-comment-count"),
                            o = parseInt(i.attr("data-count")) - 1;
                        1 > o && (o = 0);
                        var s = 1 === o ? "comment" : "comments";
                        i.attr("data-count", o).text(t.number_format(o) + " " + s), a.remove()
                    })
                })
            }
        }

        function d(t, n, a, i) {
            function s(e, t) {
                1 === e ? (a.addClass("active"), i.removeClass("active")) : -1 === e ? (a.removeClass("active"), i.addClass("active")) : (a.removeClass("active"), i.removeClass("active"));
                var n = 1 === t || "1" === t ? "point" : "points";
                d.text(t + " " + n).attr("data-score", t)
            }
            if (!window.Viewer) return void o.show();
            if (!x) {
                x = !0;
                var r = a.parents("li.js-comment-container:first"),
                    l = r.attr("data-comment"),
                    d = r.find("> .inner .js-comment-score"),
                    c = parseInt(d.attr("data-score")) + n;
                s(t, c), e.ajax("/api/comment/" + l + "/vote", {
                    type: "POST",
                    dataType: "json",
                    data: {
                        value: t
                    },
                    success: function(e) {
                        e && e.status && s(parseInt(e.vote.value) || 0, e.comment.score)
                    },
                    complete: function() {
                        x = !1
                    }
                })
            }
        }

        function c(t) {
            var n = e(t.target).parents(".js-comment-vote-down"),
                a = n.parent().find(".js-comment-vote-up"),
                i = a.hasClass("active") ? 1 : n.hasClass("active") ? -1 : 0,
                o = -1 === i ? 0 : -1,
                s = o - i;
            return d(o, s, a, n)
        }

        function u(t) {
            var n = e(t.target).parents(".js-comment-vote-up"),
                a = n.parent().find(".js-comment-vote-down"),
                i = n.hasClass("active") ? 1 : a.hasClass("active") ? -1 : 0,
                o = 1 === i ? 0 : 1,
                s = o - i;
            return d(o, s, n, a)
        }

        function p(t) {
            var n = e(t.target);
            n.is("a") && (n = n.parent());
            var a = n.parents(".inner:first"),
                o = n.parents(".js-comments"),
                s = n.attr("data-comment"),
                r = a.find(".js-comment-composer");
            r && r.length || (o.find(".js-comments-list .js-comment-composer").remove(), r = e(i({})).appendTo(a)), r.attr("data-comment", s);
            var l = r.find("textarea");
            setTimeout(function() {
                l[0].focus()
            }, 0)
        }

        function h(t) {
            var n = e(t.target),
                a = n.parents(".js-comment-composer");
            a.addClass("active"), a.find(".js-comment-submit").parent().show()
        }

        function m(t) {
            var n = e(t.target),
                a = n.parents(".js-comment-composer");
            (n.val() + "").trim() || setTimeout(function() {
                a.removeClass("active"), a.find(".js-comment-submit").parent().hide()
            }, 200)
        }

        function v(t, a) {
            if (!_) {
                _ = !0;
                var i = t.parents(".js-comment-composer:first"),
                    o = t.parents(".js-comments:first"),
                    s = i.find("textarea"),
                    l = parseInt(o.attr("data-video")) || void 0,
                    d = parseInt(o.attr("data-album")) || void 0,
                    c = (s.val() + "").trim(),
                    u = parseInt(i.attr("data-comment")) || void 0,
                    p = e("#video_player").length ? n("#video_player").currentTime() || void 0 : void 0,
                    h = {
                        video: l,
                        album: d,
                        body: c,
                        at: p,
                        comment: u
                    };
                s.val(""), t.prop("disabled", !0), e(".js-comment-composer.active").removeClass("active"), b(), e.ajax({
                    url: "/api/comment/create",
                    type: "POST",
                    data: h,
                    success: function(e) {
                        r(e, o)
                    },
                    error: function(e, t, n) {
                        w(n), s.val(c)[0].focus()
                    },
                    complete: function() {
                        _ = !1, t.prop("disabled", !1), a && a()
                    }
                })
            }
        }

        function f(t) {
            var n = e(t.target);
            if (!window.Viewer) return window.signInUpCallback = function() {
                e(".modal").modal("hide"), v(n, function() {
                    window.location.reload()
                })
            }, void o.show();
            var a = e(".comments_composer_input textarea"),
                i = a.val().trim();
            return i ? (v(n), void e(".comments_composer_submit").hide()) : (b(), void w("Please enter a comment."))
        }

        function g() {
            var t = (window.location.hash + "").match(/comment-(\d+)/i);
            if (t && !(t.length < 2)) {
                var n = e("#" + t[0]);
                n && n.length || (b(), w("Sorry, this comment couldn't be found â€” maybe it's been deleted?"), n = e(".comments_composer_error")), n.addClass("in-url");
                try {
                    var a = n.offset().top;
                    e("html, body").animate({
                        scrollTop: a
                    }, 200)
                } catch (i) {
                    try {
                        console.log(i)
                    } catch (i) {}
                }
            }
        }

        function b() {
            var t = e(".comments_composer_input").parent(),
                n = t.find(".comments_composer_error");
            n.length && n.remove()
        }

        function w(t) {
            "Internal Server Error" === t && (t = "An unexpected error occurred."), "Too Many Requests" === t && (t = "Please wait a few seconds before posting another comment.");
            var n = '<div class="comments_composer_error alert alert-warning">' + t + "</div>",
                a = e(".comments_composer_input").parent();
            b(), a.prepend(n)
        }

        function y() {
            var t = e(document);
            t.on("focus", ".js-comment-composer textarea", h), t.on("blur", ".js-comment-composer textarea", m), t.on("click", ".js-comment-composer .js-comment-submit", f), t.on("click", ".js-comment-reply", p), t.on("click", ".js-comment-vote-up", u), t.on("click", ".js-comment-vote-down", c), t.on("click", ".js-comment-delete", l), g(), e(".js-comment-composer textarea").length && require(["jquery-autosize"], function() {
                e(".js-comment-composer textarea").autosize({
                    append: ""
                })
            })
        }
        var _ = !1,
            k = !1,
            x = !1;
        e(y)
    }), define("hbs!views/embed", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="embed-modal modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Embed video</h4>\n      </div>\n      <div class="modal-body">\n        <textarea class="embed-code"\n                  spellcheck="false"\n                  readonly="readonly"\n                  data-url="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '"\n                  data-width="' + r((i = null != (i = t.width || (null != e ? e.width : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "width",
                    hash: {},
                    data: a
                }) : i)) + '"\n                  data-height="' + r((i = null != (i = t.height || (null != e ? e.height : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "height",
                    hash: {},
                    data: a
                }) : i)) + '">' + r((i = null != (i = t.code || (null != e ? e.code : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "code",
                    hash: {},
                    data: a
                }) : i)) + '</textarea>\n        <ul class="embed-options">\n          <li>\n            <label>\n              <input type="checkbox" class="autoplay"> Autoplay\n            </label>\n          </li>\n          <li>\n            <label>\n              <input type="checkbox" class="loop"> Repeat\n            </label>\n          </li>\n          <li>\n            <label>\n              <input type="checkbox" class="muted"> Muted\n            </label>\n          </li>\n            <li>\n                <label>\n                    <input type="checkbox" class="show-stats" checked> Show stats\n                </label>\n            </li>\n            <li>\n                <label>\n                    <input type="checkbox" class="show-tools" checked> Show tools\n                </label>\n            </li>\n          <li style="display: none;">\n            <label>\n              <input type="checkbox" class="disableSuggestions"> Hide video postroll after playback\n            </label>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/embed", n), n
    }), define("helpers/encodeURIComponent", ["handlebars"], function(e) {
        "use strict";

        function t(e) {
            return encodeURIComponent(e)
        }
        return e.registerHelper("encodeURIComponent", t), t
    }), define("hbs!views/embed-share", ["hbs", "handlebars", "helpers/encodeURIComponent"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="embed-share-modal modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Share video</h4>\n      </div>\n      <div class="modal-body"> \n\n        <div class=\'video_share postroll-share-buttons\'>\n          <ul>\n            <li class="video_options_reddit_static">\n              <a class="sharing reddit js-share-reddit" \n               href="http://www.reddit.com/submit?url=' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + "&title=" + r((i = null != (i = t.title || (null != e ? e.title : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : i)) + '" \n               target="_blank"></a>\n            </li>\n            <li>\n              <a class="sharing facebook js-share-facebook" \n               href="https://www.facebook.com/dialog/feed?app_id=500311450085524&amp;display=page&amp;name=' + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.title : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;caption=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;link=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;redirect_uri=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;picture=" + r((i = null != (i = t.thumb || (null != e ? e.thumb : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "thumb",
                    hash: {},
                    data: a
                }) : i)) + '" \n               data-target="_blank"></a>\n            </li>\n            <li>\n              <a class="sharing twitter js-share-twitter" \n               href="https://twitter.com/intent/tweet?text=' + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.title : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "+" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + '" \n               target="_blank"></a>\n            </li>\n            <li>\n              <a class="sharing tumblr js-share-tumblr" \n               href="http://www.tumblr.com/share/link?url=' + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;name=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.title : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + '&amp;description=Check+out+this+video+on+vidme%21" \n               title="Share on Tumblr" \n               target="_blank"></a>\n            </li>\n            <li>\n              <a class="sharing stumbleupon js-share-stumbleupon" \n               href="http://www.stumbleupon.com/submit?url=' + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&amp;title=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.title : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + '" \n               title="Share on Stumbleupon" \n               target="_blank"></a>\n            </li>\n            <li>\n              <a class="sharing tackk js-share-tackk"\n               href="https://tackk.com/share?title=' + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.title : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + "&url=" + r((t.encodeURIComponent || e && e.encodeURIComponent || s).call(e, null != e ? e.url : e, {
                    name: "encodeURIComponent",
                    hash: {},
                    data: a
                })) + '&content=" \n               title="Tackk this!"\n               target="_blank"></a>\n            </li>\n          </ul>\n        </div>\n        <div class="timewidget">\n          <div class="timewidget-url">\n            <input type="text" id="timewidget-url" class="form-control timewidget-url" value="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '" data-url="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '" />\n          </div>\n          <div class="timewidget-settings">\n            <label><input id="timewidget-check" type="checkbox" class="timewidget-check" /><span>Share at:</span></label>\n            <input type="text" id="timewidget-time" class="form-control timewidget-time" value="' + r((i = null != (i = t.time || (null != e ? e.time : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "time",
                    hash: {},
                    data: a
                }) : i)) + '" />\n          </div>\n        </div>\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n '
            },
            useData: !0
        });
        return t.registerPartial("views/embed-share", n), n
    }), define("embed", ["jquery", "phpjs", "hbs!views/embed", "hbs!views/embed-share", "helpers/secondsToHms"], function(e, t, n, a, i) {
        "use strict";

        function o() {
            var t = e(".embed-modal textarea.embed-code");
            t.length <= 0 || (t = t[0], setTimeout(function() {
                t.focus(), s(t)
            }, 0))
        }

        function s(e) {
            var t, n, a = document,
                i = "string" == typeof e ? a.getElementById(e) : e;
            void 0 !== e.selectionStart ? (e.selectionStart = 0, e.selectionEnd = void 0 !== e.value ? e.value.length : e.innerHTML.length) : a.body.createTextRange ? (t = a.body.createTextRange(), t.moveToElementText(i), t.select()) : window.getSelection && (n = window.getSelection(), t = a.createRange(), t.selectNodeContents(i), n.removeAllRanges(), n.addRange(t))
        }

        function r(e) {
            var n = window.location.protocol + "//" + window.location.host + "/e/" + e.url,
                a = [];
            e.autoplay && a.push("autoplay=1"), e.loop && a.push("loop=1"), e.muted && a.push("muted=1"), e.disableSuggestions && a.push("disableSuggestions=1"), e.showStats && a.push("stats=1"), e.showTools && a.push("tools=1"), a.length > 0 && (n += "?" + a.join("&"));
            var i = "<iframe";
            return i += ' src="' + t.htmlspecialchars(n) + '"', i += ' width="' + (e.width || "640") + '"', i += ' height="' + (e.height || "480") + '"', i += ' frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"', i += "></iframe>"
        }

        function l() {
            var t = e(".embed-modal").first(),
                n = t.find("textarea.embed-code"),
                a = n.attr("data-url"),
                i = n.attr("data-width"),
                o = n.attr("data-height"),
                s = t.find(".autoplay:input").prop("checked"),
                l = t.find(".disableSuggestions:input").prop("checked"),
                d = t.find(".loop:input").prop("checked"),
                c = t.find(".muted:input").prop("checked"),
                u = t.find(".show-stats:input").prop("checked"),
                p = t.find(".show-tools:input").prop("checked"),
                h = r({
                    url: a,
                    width: i,
                    height: o,
                    autoplay: s,
                    loop: d,
                    muted: c,
                    disableSuggestions: l,
                    showStats: u,
                    showTools: p
                });
            n.val(h)
        }

        function d(t) {
            function a() {
                e(n({
                    url: s,
                    width: r,
                    height: d
                })).appendTo(u).filter(".modal").on("hidden.bs.modal", function() {
                    e(".embed-modal").remove()
                }).on("shown.bs.modal", function() {
                    o()
                }).modal("show"), l()
            }
            var i = e(t.target);
            i = i.hasClass("js-embed-video-link") ? i : i.parents(".js-embed-video-link");
            var s = i.attr("data-url"),
                r = i.attr("data-width"),
                d = i.attr("data-height"),
                c = s.match(/\/[\w\d]+$/);
            c && (s = c[0].substr(1));
            var u;
            u = e("#embed_video_player").length ? "#embed_video_player" : "body";
            var p = e(".embed-modal");
            p && p.length ? p.one("hidden.bs.modal", a).modal("hide") : a(), ga("send", "event", "Videos", "embedLink", "Embed link clicked", 1)
        }

        function c() {
            o()
        }

        function u(t) {
            function n() {
                var t = {
                        url: d,
                        title: c,
                        thumb: u
                    },
                    n = vjs.players.embed_video_player || vjs.players.video_player;
                if (n) {
                    var s = "0:00";
                    n.ended() || (s = i(n.currentTime())), t.time = s
                }
                e(a(t)).appendTo(r).filter(".modal").on("hidden.bs.modal", function() {
                    e(".embed-share-modal").remove()
                }).on("shown.bs.modal", function() {
                    o()
                }).modal("show"), l()
            }
            t.preventDefault();
            var s = e(t.target);
            s = e(".video-js");
            var r, d = s.attr("data-video-url"),
                c = s.attr("data-video-title"),
                u = s.attr("data-video-thumb");
            r = e("#embed_video_player").length ? "#embed_video_player" : "body";
            var p = e(".embed-share-modal");
            p && p.length ? p.one("hidden.bs.modal", n).modal("hide") : n()
        }

        function p() {
            var t = e("#timewidget-check"),
                n = e("#timewidget-time"),
                a = e("#timewidget-url"),
                i = 2,
                o = ["s", "m", "h"],
                s = "",
                r = n.val().trim().split(":"),
                l = r.reverse();
            for (var d in l)
                if (l.hasOwnProperty(d)) {
                    if (i-- < 0) break;
                    s = (parseInt(r[d]) || 0) + o[d] + s
                }
            var c = s ? "#" + s : s;
            a.val(t.prop("checked") ? a.attr("data-url") + c : a.attr("data-url")), a.focus()
        }

        function h(t) {
            var n = e(t.target).parents(".overlay-ad");
            n.remove()
        }

        function m(t) {
            e(t.target).parents(".overlay-ad").find("a[data-video-id]").each(function() {
                var t = e(this),
                    n = e("video[data-video-url]");
                "localhost:3000" == window.location.hostname && Math.round(1e3 * Math.random()) > 10 || mixpanel.track("Video player overlay ad clicked (1% sample)", {
                    video_id: t.attr("data-video-id"),
                    video_url: n.attr("data-video-url"),
                    nsfw: t.attr("data-video-nsfw"),
                    ad_url: t.attr("href"),
                    ad_text: t.text()
                })
            })
        }

        function v() {
            var t = e(document);
            t.on("click", ".js-embed-video-link", d), t.on("change", ".embed-modal input", l), t.on("click", "textarea.embed-code", c), t.on("click", ".js-embed-share", u), t.on("change", ".timewidget-time", p), t.on("change", ".timewidget-check", p), t.on("click", ".overlay-ad .overlay-dismiss", h), t.on("click", ".overlay-ad a", m)
        }
        e(v)
    }), define("hbs!views/video-edit", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            1: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '              <div class="form-group">\n                <label for="score_modifier">Score Boost</label>\n                <div class="form-group">\n                  <input type="number" name="score_modifier" class="form-control"\n                         id="score_modifier" value="' + l((o = null != (o = t.score_modifier || (null != e ? e.score_modifier : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "score_modifier",
                        hash: {},
                        data: a
                    }) : o)) + '">\n                </div>\n              </div>\n              <div class="form-group">\n                <label for="view_count">Plays</label>\n                <div class="form-group">\n                  <input type="number" name="view_count" class="form-control"\n                         id="view_count" value="' + l((o = null != (o = t.view_count || (null != e ? e.view_count : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "view_count",
                        hash: {},
                        data: a
                    }) : o)) + '">\n                </div>\n              </div>\n              <div class="form-group">\n                <label class="checkbox">\n                  <input type="checkbox" name="nsfw">\n                  NSFW\n                </label>\n              </div>\n              <div class="form-group">\n                <label class="checkbox">\n                  <input type="checkbox" name="moderated">\n                  Reviewed\n                </label>\n              </div>\n';
                return i = t.unless.call(e, null != e ? e.isNsfw : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(2, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d
            },
            2: function() {
                return '                  <div class="form-group">\n                      <label class="checkbox">\n                          <input type="checkbox" name="featured">\n                          Featured\n                      </label>\n                  </div>\n'
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '\n<div class="modal video-edit-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" class="edit-form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Edit video</h4>\n        </div>\n        <div class="modal-body">\n          <div>\n            <div class="form-group">\n              <label for="title">Title</label>\n              <input type="text" name="title" class="form-control" id="title" value="' + l((o = null != (o = t.title || (null != e ? e.title : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : o)) + '" maxlength="150">\n            </div>\n            <div class="form-group">\n              <label for="description">Description</label>\n              <textarea name="description" class="form-control js-tagger js-mentioner" \n                        id="description"\n                        rows="4" style="resize: none;"\n                        maxlength="' + l((o = null != (o = t.maxDescLen || (null != e ? e.maxDescLen : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "maxDescLen",
                        hash: {},
                        data: a
                    }) : o)) + '">' + l((o = null != (o = t.description || (null != e ? e.description : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "description",
                        hash: {},
                        data: a
                    }) : o)) + '</textarea>\n            </div>\n            <div class="form-group">\n              <label class="checkbox">\n                <input type="checkbox" name="public">\n                Share on Vidme\n              </label>\n              <div class="public-description help"></div>\n            </div>\n            <div class="form-group">\n              <label class="video-channel-label" for="video-channel">Network <span class="light">(optional)</span></label>\n              <div class="form-group video-channel-field">\n                <input type="text" class="form-control js-channel-suggest">\n                <input type="hidden" name="channel" id="video-channel" value="' + l((o = null != (o = t.channel_id || (null != e ? e.channel_id : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "channel_id",
                        hash: {},
                        data: a
                    }) : o)) + '">\n              </div>\n            </div>\n';
                return i = t["if"].call(e, null != e ? e.isGlobalModerator : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + '          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">\n            Save changes\n          </button>\n          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Cancel</button>\n        </div>\n      </form>\n    </div>\n  </div>  \n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/video-edit", n), n
    }), define("hbs!views/video-delete", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="modal video-delete-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Delete video?</h4>\n      </div>\n      <div class="modal-body">\n        <div class="alert alert-warning in hide">\n          <div>\n            <strong>Oh no!</strong> There was an issue removing the video. Please try again later.\n          </div>\n        </div>\n        <div>\n          We are about to permanently remove this video. This action will not be reversible. Are you absolutely sure you want to do this? \n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-danger pull-right js-confirm-delete">Confirm <i class="fa fa-spinner fa-spin hide"></i></button>\n        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button>\n      </div>\n    </div>\n  </div>  \n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/video-delete", n), n
    }), define("video-edit", ["jquery", "hbs!views/video-edit", "hbs!views/video-delete"], function(e, t, n) {
        "use strict";

        function a(n, a) {
            e(".video-edit-modal").modal("hide"), n.maxDescLen = maxDescLen || 500;
            var i = e(t(n)).appendTo("body").filter(".modal").modal("show");
            i.find(".edit-form").attr("data-id", n.video_id).attr("data-after", "" + (a && a.after || "")), i.find('input[name="public"]').prop("checked", !n["private"]), u(i), i.find('input[name="nsfw"]').prop("checked", n.nsfw), i.find('input[name="moderated"]').prop("checked", n.isReviewed), i.find('input[name="featured"]').prop("checked", n.isFeatured), "FormData" in window || i.find('input[type="file"]').parents(".form-group").remove();
            var o = parseInt(n.channel_id);
            !isNaN(o) && o && e.getJSON("/api/channel/" + o, function(e) {
                i.find(".js-channel-suggest").trigger("suggestSelection", [e.channel.channel_id, e.channel.title])
            })
        }

        function i(t) {
            return e(n({})).appendTo("body").filter(".modal").modal("show").find(".js-confirm-delete").attr("data-id", t)
        }

        function o(t) {
            if (!h) {
                h = !0;
                var n = e(t.target),
                    i = n.attr("data-after");
                e.ajax({
                    url: "/api/video/" + n.attr("data-id"),
                    dataType: "json",
                    success: function(e) {
                        var t = e.video;
                        t.isModerator = "moderator" === e.isModerator || "channel" === e.isModerator, t.isGlobalModerator = "moderator" === e.isModerator, t.isFeatured = e.isFeatured, t.isNsfw = 1 === e.nsfw, t.isReviewed = e.isReviewed, t.isOwner = window.Viewer.user_id === t.user_id, a(t, {
                            after: i
                        })
                    },
                    complete: function() {
                        n.find(".fa-spin").remove(), h = !1
                    }
                })
            }
        }

        function s(t) {
            e(t.target).remove()
        }

        function r(t) {
            function n(e) {
                a.find(".alert").remove(), a.find(".modal-body").prepend('<div class="alert alert-warning"><div><strong>Oops!</strong> <span></span></div></div>').find(".alert-warning span").text(e)
            }
            if (!m) {
                m = !0;
                var a = e(t.target),
                    i = a.find('button[type="submit"]'),
                    o = a.find("#video-channel-remove, #video-channel").length > 0;
                i.prop("disabled", !0), i.find("i").remove(), i.append('<i class="fa fa-spinner fa-spin"></i>');
                var s = "FormData" in window,
                    r = a.attr("data-id"),
                    l = a.find('input[name="nsfw"]'),
                    d = a.find('input[name="featured"]'),
                    c = a.find('input[name="channel"]'),
                    u = {};
                u.title = a.find(':input[name="title"]').val(), u.description = a.find(':input[name="description"]').val(), u["private"] = a.find('input[name="public"]').prop("checked") ? "0" : "1", o && l.length && (u.nsfw = l.prop("checked") ? 1 : 0), o && d.length && (u.featured = d.prop("checked") ? 1 : 0), o && ("checkbox" !== c.attr("type") ? u.channel_id = c.val() || 0 : c.prop("checked") && (u.channel_id = 0), u.moderated = a.find(':input[name="moderated"]').prop("checked") ? 1 : 0, u.score_modifier = a.find(':input[name="score_modifier"]').val(), u.view_count = a.find(':input[name="view_count"]').val());
                var p = 1 === parseInt(u["private"]),
                    h = 1 === parseInt(u.nsfw);
                if (u.featured && (p || h)) return n("A video that is unlisted or NSFW cannot be featured.");
                if (s) {
                    var v = new FormData;
                    for (var f in u) u.hasOwnProperty(f) && v.append(f, u[f]);
                    u = v
                }
                e.ajax({
                    url: "/api/video/" + r + "/edit",
                    type: "POST",
                    dataType: "json",
                    data: u,
                    cache: !1,
                    processData: !s,
                    contentType: s ? !1 : void 0,
                    success: function(t) {
                        if (a.find(".alert").remove(), a.find(".modal-body").prepend('<div class="alert alert-success"><div>Changes saved!</div></div>'), a.find(".modal-body > *:not(.alert)").remove(), a.find(".modal-footer > *:not(.btn-default)").remove(), a.find(".modal-footer > .btn-default").text("Close"), "none" !== a.attr("data-after")) window.location.reload();
                        else if ("moderator" === Viewer.acl) {
                            var n = t.video;
                            if (n && void 0 !== typeof n.id) {
                                var i = "li[data-id=" + n.video_id + "] .thumb_views .num";
                                e(i).html(n.view_count)
                            }
                        }
                    },
                    error: function(e) {
                        var t = (e.responseJSON || {
                            error: "An error has occurred. Please try again later."
                        }).error;
                        n(t)
                    },
                    complete: function() {
                        i.prop("disabled", !1), i.find("i").remove(), m = !1
                    }
                })
            }
        }

        function l(t) {
            var n, a, o = e(t.target),
                s = o.parents(".video-edit-modal");
            s && s.length ? n = s.find("form").attr("data-id") : (n = o.attr("data-video"), a = o.attr("data-token"));
            var r = e(".modal-open .modal");
            r && r.length > 0 ? r.on("hidden.bs.modal", function() {
                setTimeout(function() {
                    i(n)
                }, 100)
            }).attr("data-token", a).modal("hide") : i(n).attr("data-token", a)
        }

        function d(t) {
            var n = e(t.target),
                a = n.attr("data-id"),
                i = n.attr("data-token");
            if (!v) {
                v = !0;
                var o = n.parents(".modal").find(".modal-body"),
                    s = n;
                s.prop("disabled", !0), s.find("i").remove(), s.append('<i class="fa fa-spinner fa-spin"></i>'), e.ajax({
                    url: "/api/video/" + a + "/delete",
                    type: "POST",
                    dataType: "json",
                    data: {
                        deleteToken: i
                    },
                    success: function() {
                        o.find(".alert").remove(), o.prepend('<div class="alert alert-success"><div>Video deleted!</div></div>'), setTimeout(function() {
                            window.location = "Viewer" in window ? Viewer.full_url : "/"
                        }, 500)
                    },
                    error: function(e) {
                        var t = (e.responseJSON || {
                            error: "An error has occurred. Please try again later."
                        }).error;
                        o.prepend('<div class="alert alert-warning"><div><strong>Oops!</strong> <span></span></div></div>').find(".alert-warning span").text(t)
                    },
                    complete: function() {
                        s.prop("disabled", !1), s.find("i").remove(), v = !1
                    }
                })
            }
        }

        function c(t) {
            u(e(t.target).parents(".video-edit-modal"))
        }

        function u(e) {
            var t = e.find('input[name="public"]').prop("checked");
            e.find(".public-description").text(t ? "This video can be discovered by anyone on Vidme." : "Only people with the link can watch this video.")
        }

        function p() {
            var t = e(document);
            t.on("click", ".js-edit-video", o), t.on("hidden.bs.modal", ".video-edit-modal", s), t.on("hidden.bs.modal", ".video-delete-modal", s), t.on("submit", ".edit-form", r), t.on("click", ".video-delete-modal .js-confirm-delete", d), t.on("click", ".js-delete", l), t.on("change", '.video-edit-modal input[name="public"]', c)
        }
        var h = !1,
            m = !1,
            v = !1;
        e(p)
    }), define("hbs!views/search-result-user", ["hbs", "handlebars", "helpers/userUrl", "helpers/userPhoto"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '<li data-user="' + r((i = null != (i = t.user_id || (null != e ? e.user_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "user_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-user-url="' + r((t.userUrl || e && e.userUrl || s).call(e, e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '">\n  <div class="thumb"><img src="' + r((t.userPhoto || e && e.userPhoto || s).call(e, e, {
                    name: "userPhoto",
                    hash: {},
                    data: a
                })) + '"></div>\n  <div>\n    <span class="title">' + r((i = null != (i = t.username || (null != e ? e.username : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "username",
                    hash: {},
                    data: a
                }) : i)) + '</span>\n    <i class="fa fa-user"></i>\n  </div>\n</li>'
            },
            useData: !0
        });
        return t.registerPartial("views/search-result-user", n), n
    }), define("hbs!views/search-result-video", ["hbs", "handlebars", "helpers/videoUrl", "helpers/videoThumbnail"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '<li data-video="' + r((i = null != (i = t.video_id || (null != e ? e.video_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : i)) + '" data-video-url="' + r((t.videoUrl || e && e.videoUrl || s).call(e, e, {
                    name: "videoUrl",
                    hash: {},
                    data: a
                })) + '">\n  <div class="thumb"><img src="' + r((t.videoThumbnail || e && e.videoThumbnail || s).call(e, e, {
                    name: "videoThumbnail",
                    hash: {},
                    data: a
                })) + '"></div>\n  <div>\n    <span class="title">' + r((i = null != (i = t.title || (null != e ? e.title : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : i)) + "</span>\n  </div>\n</li>"
            },
            useData: !0
        });
        return t.registerPartial("views/search-result-video", n), n
    }), define("search", ["jquery", "underscore", "loaders", "hbs!views/search-result-user", "hbs!views/search-result-video"], function(e, t, n, a, i) {
        "use strict";

        function o() {
            var t = e(".js-search-input").parent(),
                n = t.find(".js-search-results");
            return n && n.length || (n = e('<div class="search-result-list js-search-results"></div>').appendTo(t), n.append("<ul></ul>"), n.append('<div class="no-results-alert">No videos found.</div>'), n.append('<div class="loading-results-alert">Searching...</div>')), n
        }

        function s(s) {
            var r = s.data,
                l = o().find("ul"),
                d = l.parents(".js-search");
            d.removeClass("loading"), l.empty();
            var c = !1;
            r.users && r.users.length && (t.each(r.users, function(t) {
                var i = e(a(t)),
                    o = i.find("img");
                o.css("display", "none"), n.loadImage(o.attr("src"), function(e) {
                    "error" !== e.type && o.css("display", "")
                }), l.append(i)
            }), c = !0), r.videos && r.videos.length && (t.each(r.videos, function(t) {
                (t.title + "").length > 25 && (t.title = t.title.substr(0, 25) + "..."), (t.description + "").length > 100 && (t.description = t.description.substr(0, 100) + "...");
                var a = e(i(t)),
                    o = a.find("img");
                o.css("display", "none"), n.loadImage(o.attr("src"), function(e) {
                    "error" !== e.type && o.css("display", "")
                }), l.append(a)
            }), c = !0), c ? d.addClass("has-results") : (l.empty(), d.removeClass("has-results"))
        }

        function r(t, n) {
            if (t)
                if (t in k) n(null, k[t], t);
                else {
                    e.ajax({
                        url: "/api/videos/search",
                        dataType: "json",
                        data: {
                            query: t
                        },
                        success: function(e) {
                            k[t] = e, n(null, e, t)
                        },
                        error: function() {
                            k[t] = !1, n(!0, null, t)
                        }
                    });
                    try {
                        ga("send", "event", "Search", "Search Autosuggest Executed", "Search Autosuggest Executed")
                    } catch (a) {}
                } else n(null, {}, t)
        }

        function l(e, n, a) {
            for (t.each(C, function(t) {
                    t.text === a && (t.err = e, t.data = n)
                }); C.length;) {
                var i = C.shift();
                if ("err" in i && null !== i.err);
                else {
                    if (!("data" in i)) {
                        C.unshift(i);
                        break
                    }
                    s(i)
                }
            }
        }

        function d(e) {
            w = e, C.push({
                guid: ++_,
                text: e
            }), r(e, l)
        }

        function c(t) {
            var n = e(t.target),
                a = n.parent(".js-search"),
                i = (n.val() + "").trim();
            i !== n.attr("data-last-value") && (n.attr("data-last-value", i), a.addClass("active"), a.addClass("loading"), i ? (a.addClass("not-empty"), a.find(".loading-results-alert").text('Search for "' + i + '"...')) : (a.removeClass("not-empty"), a.find(".loading-results-alert").text("Search...")), b = (new Date).valueOf(), y && (clearTimeout(y), y = void 0), y = setTimeout(function() {
                d(n.val())
            }, x))
        }

        function u(t) {
            var n = e(t.target),
                a = n.parent(".js-search");
            o(), a.addClass("active"), a.addClass("focus"), g && (clearTimeout(g), g = void 0)
        }

        function p(t) {
            var n = e(t.target),
                a = n.parent(".js-search"),
                i = (n.val() + "").trim();
            i || a.removeClass("active"), g && (clearTimeout(g), g = void 0), g = setTimeout(function() {
                a.removeClass("focus")
            }, 250)
        }

        function h(t) {
            function n(t) {
                var n, a = e(".js-search-results .selected"),
                    i = e(".js-search-results li:first"),
                    o = e(".js-search-results li:last"),
                    s = a.next(),
                    r = a.prev();
                n = "up" === t ? r && r.length ? r : o : s && s.length ? s : i, a.removeClass("selected"), n.addClass("selected")
            }
            var a = (e(".js-search-input").val() + "").trim();
            switch (t.keyCode) {
                case 13:
                    e(".js-search-results .selected").length > 0 ? e(".js-search-results .selected").first().trigger("click") : 1 === e(".js-search-results ul > li").length ? e(".js-search-results ul > li").first().trigger("click") : a && m(a);
                    break;
                case 27:
                    e(".js-search-results .selected").removeClass("selected");
                    break;
                case 37:
                    break;
                case 38:
                    t.preventDefault(), n("up");
                    break;
                case 39:
                    break;
                case 40:
                    t.preventDefault(), n("down")
            }
        }

        function m(e) {
            try {
                ga("send", "event", "Search", "Search Executed", "Search Executed")
            } catch (t) {}
            setTimeout(function() {
                window.location = "/search?q=" + encodeURIComponent(e)
            }, 50)
        }

        function v(t) {
            var n = e(t.target);
            n.is("li") || (n = n.parents("li:first"));
            var a = n.attr("data-video-url") || n.attr("data-user-url");
            try {
                ga("send", "event", "Search", "Search Autosuggest Result Clicked", "Search Autosuggest Result Clicked")
            } catch (i) {}
            setTimeout(function() {
                window.location.href = a
            }, 50)
        }

        function f() {
            var t = e(document);
            t.on("focus", ".js-search-input", u), t.on("blur", ".js-search-input", p), t.on("keyup paste cut", ".js-search-input", c), t.on("keydown", ".js-search-input", h), t.on("click", ".js-search-results", v), e(".js-search-input").on("paste", c)
        }
        var g, b, w, y, _ = 0,
            k = {},
            x = 250,
            C = [];
        e(f)
    }), define("lib/suggest", ["underscore", "jquery"], function(e, t) {
        "use strict";
        var n = {
                "char": "~",
                classPrefix: "suggest",
                dataKey: "suggest",
                endpoint: null,
                flagsKey: "flags",
                idKey: "id",
                labelKey: "label",
                textKey: "text",
                regex: null,
                responseKey: "data"
            },
            a = function(a, i, o) {
                this.$element = t(a), this.$input = t(i), this.options = e.defaults(o || {}, n)
            };
        return a.prototype.init = function() {
            this.$relative = t(this.options.container || this.$element), this.cache = {}, this.last = null, this.$container = null, this.mutex = !1, this.delayed = !1, this.$element.data(this.options.dataKey) || this.$element.data(this.options.dataKey, this)
        }, a.prototype.opt = function(e, t) {
            return e in this.options ? this.options[e] : e in n ? n[e] : t
        }, a.prototype.onEvent = function(e) {
            switch (e.type) {
                case "keydown":
                    this._onKeyDown(e);
                    break;
                case "keyup":
                    this._onKeyUp(e);
                    break;
                case "click":
                    this._onClick(e)
            }
        }, a.prototype._onKeyDown = function(e) {
            if (this.active) switch (e.keyCode) {
                case 13:
                    this.$selected && (e.preventDefault(), this.select(this.$selected));
                    break;
                case 27:
                    this.$selected && (e.preventDefault(), this.navigate("none"));
                    break;
                case 37:
                    break;
                case 38:
                    e.preventDefault(), this.navigate("up");
                    break;
                case 39:
                    break;
                case 40:
                    e.preventDefault(), this.navigate("down")
            }
        }, a.prototype._onKeyUp = function(e) {
            this._doUpdate(e)
        }, a.prototype._onClick = function(e) {
            this._doUpdate(e)
        }, a.prototype._doUpdate = function() {
            var e = this.$element.val(),
                t = this.$element[0].selectionStart,
                n = this.$element[0].selectionEnd;
            if (t !== n) return void this.hide();
            e = e.substring(0, t);
            var a;
            return (a = e.match(this.options.regex)) ? (e = a[2], !(this.last && e.length > this.last.length && 0 === e.indexOf(this.last)) || this.last in this.cache && this.cache[this.last] ? void(e in this.cache ? this.render(e) : this.query(e, this.render.bind(this))) : void this.hide()) : void this.hide()
        }, a.prototype._onContainerClick = function(e) {
            var n = t(e.target);
            n.is("li") || (n = n.parents("li:first")), this.select(n)
        }, a.prototype.hide = function() {
            this.active = !1, this.$container && this.$container.hide()
        }, a.prototype.show = function() {
            this.active = !0, this.$container && this.$container.show()
        }, a.prototype.render = function(n) {
            if (n === this.last) return void(this.active && this.show());
            if (this.last = n, this.$selected = !1, !this.$container) {
                this.$container = t("<ul>").addClass(this.options.classPrefix + "-list suggest-list").css("position", "absolute").click(this._onContainerClick.bind(this)).insertAfter(this.$relative);
                var a = parseInt(this.$container.css("padding-left") || 0) + parseInt(this.$container.css("padding-right") || 0) + parseInt(this.$container.css("border-left-width") || 0) + parseInt(this.$container.css("border-right-width") || 0),
                    i = this.$relative.outerWidth() - a;
                this.$container.css("width", i)
            }
            var o = this.cache[n];
            if (!o || !o.length) return void this.hide();
            var s = this.opt("idKey"),
                r = this.opt("textKey"),
                l = this.opt("labelKey"),
                d = this.opt("flagsKey");
            this.$container.empty(), e.each(o, function(e) {
                var a = t("<li>");
                a.attr("data-id", e[s]), a.attr("data-text", e[r]), d in e && e[d] && a.attr("class", e[d]), a.text(e[l]), this._highlight(a, n), this.$container.append(a)
            }.bind(this)), this.show()
        }, a.prototype.navigate = function(e) {
            var t = this.$selected;
            switch (e) {
                case "none":
                    this.$selected = !1;
                    break;
                case "up":
                    this.$selected && (this.$selected = this.$selected.prev(), this.$selected.length || (this.$selected = !1)), this.$selected || (this.$selected = this.$container.children().last(), this.$selected.length || (this.$selected = !1));
                    break;
                case "down":
                    this.$selected && (this.$selected = this.$selected.next(), this.$selected.length || (this.$selected = !1)), this.$selected || (this.$selected = this.$container.children().first(), this.$selected.length || (this.$selected = !1))
            }
            t && t.removeClass("active"), this.$selected && this.$selected.addClass("active")
        }, a.prototype.select = function(e) {
            var t = e.attr("data-id"),
                n = e.attr("data-text"),
                a = this.$element.val(),
                i = this.$element[0].selectionStart,
                o = a.substring(0, i).lastIndexOf(this.options["char"]);
            if (-1 !== o) {
                var s = i,
                    r = a.substring(0, o) + this.options["char"] + n + (" " !== a.substring(s, s + 1) ? " " : ""),
                    l = r.length;
                r += a.substring(s), this.$element.val(r), this.$element[0].selectionStart = this.$element[0].selectionEnd = l, this.hide(), "function" == typeof this.options.onSelect && this.options.onSelect({
                    id: t,
                    name: n
                })
            }
        }, a.prototype.query = function(e, n) {
            return this.mutex ? void(this.delayed = function() {
                this.delayed = !1, this.query(e, n)
            }.bind(this)) : (this.mutex = !0, void t.ajax({
                url: this.options.endpoint,
                data: {
                    text: e
                },
                dataType: "json",
                success: function(t) {
                    this.onQuerySuccess(e, t, n)
                }.bind(this)
            }))
        }, a.prototype.onQuerySuccess = function(e, t, n) {
            this.mutex = !1, this.cache[e] = t && this.options.responseKey in t && t[this.options.responseKey] ? t[this.options.responseKey] : !1, n(e), this.delayed && this.delayed()
        }, a.prototype._highlight = function(e, t) {
            t && e.html(e.html().replace(t, function(e) {
                return "<strong>" + e + "</strong>"
            }, "ig"))
        }, a
    }), define("tag", ["underscore", "jquery", "lib/suggest"], function(e, t, n) {
        "use strict";

        function a(e) {
            var n = t(e.target),
                a = n.data(o.dataKey) || new s(n);
            a.onEvent(e)
        }

        function i() {
            t(document).on("keyup keydown click", ".js-tagger:input", a)
        }
        var o = {
                "char": "#",
                classPrefix: "tag",
                dataKey: "tag",
                endpoint: "/api/tags/suggest",
                regex: /(^|\s+)[#]([^\s]*)$/,
                responseKey: "tags"
            },
            s = function(n, a, i) {
                this.$element = t(n), this.$input = t(a), this.options = e.defaults(i || {}, o), this.init()
            };
        return s.prototype = new n, t(i), s
    }), define("mention", ["underscore", "jquery", "lib/suggest"], function(e, t, n) {
        "use strict";

        function a(e) {
            var n = t(e.target),
                a = n.data(o.dataKey) || new s(n);
            a.onEvent(e)
        }

        function i() {
            var e = t(document);
            e.on("keyup keydown click", ".js-mentioner:input", a)
        }
        var o = {
                "char": "@",
                classPrefix: "mention",
                dataKey: "mention",
                endpoint: "/api/users/suggest",
                idKey: "user_id",
                labelKey: "username",
                regex: /(^|\s+)[@]([^\s]*)$/,
                responseKey: "users",
                textKey: "username"
            },
            s = function(n, a, i) {
                this.$element = t(n), this.$input = t(a), this.options = e.defaults(i || {}, o), this.init()
            };
        return s.prototype = new n, t(i), s
    }), define("vote", ["jquery", "phpjs", "videojs", "sign-in"], function(e, t, n, a) {
        "use strict";

        function i(o, s, r, d) {
            function c(e, n) {
                v.attr("data-score", n), 0 >= n && (n = 0), 1 === e ? (r.addClass("active"), d.removeClass("active"), m = "Video Upvoted") : -1 === e ? (r.removeClass("active"), d.addClass("active"), m = "Video Downvoted") : (r.removeClass("active"), d.removeClass("active"));
                var a = 1 === n || "1" === n ? "point" : "points";
                v.find(".num").text(t.number_format(n)), v.find(".text").text(a)
            }
            var u = r.attr("data-video"),
                p = r.attr("data-video-url"),
                h = r.attr("data-video-title");
            if (!window.Viewer) return window.signInUpCallback = function() {
                e(".modal").modal("hide"), i(o, s, r, d), setTimeout(function() {
                    window.location = "/vi/" + u
                }, 200)
            }, void a.show();
            if (!l) {
                l = !0;
                var m, v = e('.js-video-vote-score[data-video="' + u + '"]'),
                    f = parseInt(v.attr("data-score")) + s;
                c(o, f);
                var g = e("#video_player").length ? n("#video_player").currentTime() || void 0 : void 0,
                    b = {
                        value: o,
                        at: g
                    };
                e.ajax("/api/video/" + u + "/vote", {
                    type: "POST",
                    dataType: "json",
                    data: b,
                    success: function(e) {
                        e && e.status && c(parseInt(e.vote.value) || 0, e.video.score)
                    },
                    complete: function() {
                        l = !1
                    }
                }), m && mixpanel.track(m, {
                    VideoURL: p,
                    VideoTitle: h
                })
            }
        }

        function o(t) {
            var n = e(t.target),
                a = n.hasClass("js-video-vote-down") ? n : n.parents(".js-video-vote-down"),
                o = a.parent().find(".js-video-vote-up"),
                s = o.hasClass("active") ? 1 : a.hasClass("active") ? -1 : 0,
                r = -1 === s ? 0 : -1,
                l = r - s;
            return i(r, l, o, a)
        }

        function s(t) {
            var n = e(t.target),
                a = n.hasClass("js-video-vote-up") ? n : n.parents(".js-video-vote-up"),
                o = a.parent().find(".js-video-vote-down"),
                s = a.hasClass("active") ? 1 : o.hasClass("active") ? -1 : 0,
                r = 1 === s ? 0 : 1,
                l = r - s;
            return i(r, l, a, o)
        }

        function r() {
            var t = e(document);
            t.on("click", ".js-video-vote-up", s), t.on("click", ".js-video-vote-down", o)
        }
        var l = !1;
        e(r)
    }), define("suggest-channel", ["underscore", "jquery", "lib/suggest"], function(e, t, n) {
        "use strict";

        function a(e) {
            var n = t(e.target),
                a = n.data(l.dataKey) || new d(n, void 0, {
                    onSelect: function(e) {
                        n.trigger("suggestSelection", [e.id, e.name])
                    }
                });
            a.onEvent(e)
        }

        function i(e) {
            setTimeout(function() {
                var n = t(e.target),
                    a = n.data(l.dataKey);
                a && a.hide(), n.val("")
            }, 500)
        }

        function o(e) {
            var n = t(e.target),
                a = n.data(l.dataKey);
            a && a.show(), n.val("")
        }

        function s(e, n, a) {
            var i = t(e.target),
                o = t('<div class="selected-channel form-control">').text(a).append('<a class="pull-right">&times;</a>').on("click", "a", function() {
                    i.show(), o.remove(), s.remove(), i.focus()
                }),
                s = i.parent().find('input[name="channel"]');
            s.length || (s = t('<input type="hidden" name="channel" id="video-channel">')), s.val(n + ""), i.val("").hide().after(o).after(s)
        }

        function r() {
            var e = t(document);
            e.on("keyup keydown click", ".js-channel-suggest:input", a), e.on("blur", ".js-channel-suggest:input", i), e.on("focus", ".js-channel-suggest:input", o), e.on("suggestSelection", ".js-channel-suggest:input", s)
        }
        var l = {
                "char": "",
                classPrefix: "channel",
                dataKey: "text",
                endpoint: "/api/channels/suggest",
                regex: /(^|\s+)([^\s]*)$/,
                responseKey: "data"
            },
            d = function(n, a, i) {
                this.$element = t(n), this.$input = t(a), this.options = e.defaults(i || {}, l), this.init()
            };
        return d.prototype = new n, t(r), d
    }), define("hbs!views/album-create", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="modal album-create-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Create album</h4>\n        </div>\n        <div class="modal-body">\n          <div class="form-group">\n            <input type="text" name="title" class="form-control"\n                   id="title" value="' + r((i = null != (i = t.title || (null != e ? e.title : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : i)) + '" maxlength="150" \n                   placeholder="Title (optional)" autocomplete="off">\n          </div>\n          <div class="form-group">\n            Your album link will be:\n            <span class="album-link">https://localhost:3000/username/albums/</span>\n            <input type="hidden" name="url" value="" data-original="' + r((i = null != (i = t.url || (null != e ? e.url : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "url",
                    hash: {},
                    data: a
                }) : i)) + '">\n          </div>\n          <div class="form-group">\n            <textarea name="description" class="form-control" \n                      id="description"\n                      rows="4" style="resize: none;"\n                      maxlength="' + r((i = null != (i = t.maxDescLen || (null != e ? e.maxDescLen : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "maxDescLen",
                    hash: {},
                    data: a
                }) : i)) + '" \n                      placeholder="Description (optional)">' + r((i = null != (i = t.description || (null != e ? e.description : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "description",
                    hash: {},
                    data: a
                }) : i)) + '</textarea>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">\n            Continue\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>  \n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/album-create", n), n
    }), define("hbs!views/album-edit", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="modal album-edit-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Edit album</h4>\n        </div>\n        <div class="modal-body">\n          <div class="form-group">\n            <input type="text" name="title" class="form-control" \n                   id="title" value="' + r((i = null != (i = t.title || (null != e ? e.title : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : i)) + '" maxlength="150" placeholder="Title">\n          </div>\n          <div class="form-group">\n            <textarea name="description" class="form-control" \n                      id="description"\n                      rows="4" style="resize: none;"\n                      placeholder="Description">' + r((i = null != (i = t.description || (null != e ? e.description : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "description",
                    hash: {},
                    data: a
                }) : i)) + '</textarea>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">\n            Save changes\n          </button>\n          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Cancel</button>\n        </div>\n        <input type="hidden" name="album" value="' + r((i = null != (i = t.album_id || (null != e ? e.album_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "album_id",
                    hash: {},
                    data: a
                }) : i)) + '" />\n      </form>\n    </div>\n  </div>  \n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/album-edit", n), n
    }), define("hbs!views/album-add-videos", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="modal album-add-videos-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Add video</h4>\n        </div>\n        <div class="modal-body">\n          <div class="modal-desc">\n            Select one of your existing videos to add to this album.\n            If you want to add a new video, you\'ll need to upload it first.\n          </div>\n          <div class="form-group">\n            <div class="input-group">\n              <input type="text" name="title" autocomplete="off"\n                     class="form-control js-album-add-videos-suggest" \n                     id="title" maxlength="150" placeholder="Search your videos">\n              <span class="input-group-addon">\n                <i class="fa fa-spinner fa-spin" style="display: none;"></i>\n              </span>\n            </div>\n          </div>\n          <div class="form-group">\n            <ul class="album-add-video-list js-album-add-video-list"></ul>\n            <div style="display: none" class="alert alert-warning">\n              No videos with that title were found.\n            </div>\n          </div>\n        </div>\n        <div class="modal-footer">\n          <!--button type="submit" class="btn btn-success">\n            Save changes\n          </button-->\n          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Cancel</button>\n        </div>\n        <input type="hidden" name="album" value="' + r((i = null != (i = t.album_id || (null != e ? e.album_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "album_id",
                    hash: {},
                    data: a
                }) : i)) + '" />\n      </form>\n    </div>\n  </div>  \n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/album-add-videos", n), n
    }), define("hbs!views/album-edit-videos", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="modal album-edit-videos-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Edit album videos</h4>\n        </div>\n        <div class="modal-body">\n          \n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">\n            Save changes\n          </button>\n          <button type="button" class="btn btn-default pull-right" data-dismiss="modal">Cancel</button>\n        </div>\n        <input type="hidden" name="album" value="' + r((i = null != (i = t.album_id || (null != e ? e.album_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "album_id",
                    hash: {},
                    data: a
                }) : i)) + '" />\n      </form>\n    </div>\n  </div>  \n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/album-edit-videos", n), n
    }), define("hbs!views/album-delete", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div class="modal album-delete-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <form role="form" onsubmit="event.preventDefault()">\n        <div class="modal-header">\n          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n          <h4 class="modal-title">Delete album?</h4>\n        </div>\n        <div class="modal-body">\n          <div>\n            We are about to permanently remove this album. This action will not \n            be reversible. Are you absolutely sure you want to do this? \n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-danger pull-right">Confirm <i class="fa fa-spinner fa-spin hide"></i></button>\n          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button>\n        </div>\n        <input type="hidden" name="album" value="' + r((i = null != (i = t.album_id || (null != e ? e.album_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "album_id",
                    hash: {},
                    data: a
                }) : i)) + '" />\n      </form>\n    </div>\n  </div>  \n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/album-delete", n), n
    }), define("hbs!views/album-edit-video-item", ["hbs", "handlebars", "helpers/videoThumbnail"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = this.lambda;
                return '\n<fieldset data-video="' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '">\n  <div class="left">\n    <div class="handle">\n      <i class="fa fa-bars"></i>\n    </div>\n    <label class="thumb" for="album_video_' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '_title">\n      <img src="' + l((t.videoThumbnail || e && e.videoThumbnail || r).call(e, e, {
                    name: "videoThumbnail",
                    hash: {},
                    data: a
                })) + '">\n    </label>\n  </div>\n  <div class="form-group right"> \n    <input type="text" name="videos[' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '][title]" class="form-control" \n           id="album_video_' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '_title" value="' + l(d(null != (i = null != e ? e.albumVideo : e) ? i.title : i, e)) + '" \n           maxlength="150" placeholder="' + l((o = null != (o = t.title || (null != e ? e.title : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "title",
                    hash: {},
                    data: a
                }) : o)) + '">\n    <textarea name="videos[' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '][description]" class="form-control" \n              id="description"\n              rows="3" style="resize: none;"\n              placeholder="' + l((o = null != (o = t.description || (null != e ? e.description : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "description",
                    hash: {},
                    data: a
                }) : o)) + '">' + l(d(null != (i = null != e ? e.albumVideo : e) ? i.description : i, e)) + '</textarea>\n    <div class="remove">\n      <a class="js-album-edit-videos-remove">remove</a>\n    </div>\n    <input type="hidden" name="videos[' + l((o = null != (o = t.video_id || (null != e ? e.video_id : e)) ? o : r, typeof o === s ? o.call(e, {
                    name: "video_id",
                    hash: {},
                    data: a
                }) : o)) + '][order]" value="' + l(d(null != (i = null != e ? e.albumVideo : e) ? i.order : i, e)) + '"\n           class="order-input">\n  </div>\n</fieldset>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/album-edit-video-item", n), n
    }), define("site/albums", ["underscore", "jquery", "async", "lib/ribbon", "hbs!views/album-create", "hbs!views/album-edit", "hbs!views/album-add-videos", "hbs!views/album-edit-videos", "hbs!views/album-delete", "hbs!views/album-edit-video-item", "hbs!views/search-result-video"], function(e, t, n, a, i, o, s, r, l, d, c) {
        "use strict";

        function u(e) {
            var t;
            "string" == typeof e ? t = e : e.responseJSON && (t = e.responseJSON.error), a({
                level: "danger",
                text: t || "An unknown error has ocurred. Please try again later."
            })
        }

        function p(e, n) {
            t.ajax({
                url: "/api/album/" + e,
                success: function(e) {
                    return e.error ? u(e.error) : void n(e.album)
                },
                error: u
            })
        }

        function h(e) {
            return N ? e(N) : void t.ajax({
                url: "/api/videos/list",
                data: {
                    user: Viewer.user_id,
                    moderated: -1,
                    "private": -1,
                    nsfw: -1,
                    limit: 100
                },
                success: function(t) {
                    e(N = t.videos)
                },
                error: u
            })
        }

        function m(e, n) {
            return e in L ? n(L[e]) : void t.ajax({
                url: "/api/videos/search",
                data: {
                    user: Viewer.user_id,
                    query: e,
                    limit: 100
                },
                error: u,
                success: function(t) {
                    n(L[e] = t.videos)
                }
            })
        }

        function v(e, n) {
            t.ajax({
                url: "/api/album/" + e + "/videos",
                data: {
                    limit: 100
                },
                error: function() {
                    n(!0), u.apply(null, arguments)
                },
                success: function(e) {
                    n(null, e.videos)
                }
            })
        }

        function f() {
            for (var e = "", t = "abcdefghijklmnopqrstuvwxyz0123456789-", n = 0; 5 > n; n++) e += t.charAt(Math.floor(Math.random() * t.length));
            return e
        }

        function g(e) {
            return (e + "").toLowerCase().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
        }

        function b(e) {
            var n = t(e.target),
                a = n.parents("form"),
                i = n.val(),
                o = a.find('input[name="url"]');
            i || (i = o.attr("data-original") || f()), i = g(i), o.val(i), a.find(".album-link").text(Viewer.full_url + "/albums/" + i)
        }

        function w() {
            var e = t(i({}));
            e.appendTo("body").one("hidden.bs.modal", function() {
                e.remove()
            }).modal("show"), e.find('input[name="url"]').attr("data-original", f()), e.find('input[name="title"]').trigger("keyup")
        }

        function y(n) {
            n.preventDefault();
            var a = t(n.target),
                i = a.find(':input[type="submit"]'),
                o = {};
            e.each(a.serializeArray(), function(e) {
                o[e.name] = e.value
            }), i.append('<i class="fa fa-spinner fa-spin"></i>').prop("disabled", !0), t.ajax({
                url: "/api/album",
                type: "POST",
                dataType: "json",
                data: o,
                success: function(e) {
                    if (e.error) return u(e.error);
                    try {
                        mixpanel.track("Album Created", {
                            albumId: e.album.album_id,
                            userId: Viewer.userId,
                            username: Viewer.username
                        })
                    } catch (t) {}
                    setTimeout(function() {
                        window.location = e.album.full_url
                    }, 100)
                },
                error: u,
                complete: function() {
                    i.prop("disabled", !1).find("i").remove()
                }
            })
        }

        function _(e) {
            var n = t(e.target),
                a = n.attr("data-album");
            p(a, function(e) {
                var n = t(o(e));
                n.appendTo("body").one("hidden.bs.modal", function() {
                    n.remove()
                }).modal("show"), n.find('input[name="title"]').trigger("keyup")
            })
        }

        function k(n) {
            n.preventDefault();
            var i = t(n.target),
                o = i.find(':input[type="submit"]'),
                s = {};
            e.each(i.serializeArray(), function(e) {
                s[e.name] = e.value
            });
            var r = s.album;
            return delete s.album, r ? (o.append('<i class="fa fa-spinner fa-spin"></i>').prop("disabled", !0), void t.ajax({
                url: "/api/album/" + r,
                type: "POST",
                dataType: "json",
                data: s,
                success: function(e) {
                    if (e.error) a({
                        text: e.error,
                        level: "danger"
                    });
                    else {
                        try {
                            mixpanel.track("Album Info Edited", {
                                albumId: e.album.album_id,
                                userId: Viewer.userId,
                                username: Viewer.username
                            })
                        } catch (t) {}
                        setTimeout(function() {
                            window.location = e.album.full_url + "#ribbon=" + encodeURIComponent("Changes saved!")
                        }, 100)
                    }
                },
                error: u,
                complete: function() {
                    o.prop("disabled", !1).find("i").remove()
                }
            })) : u()
        }

        function x(n) {
            var a = t(".js-album-add-video-list"),
                i = a.parents(".modal");
            i.find(".fa-spinner").hide(), a.empty();
            var o = "";
            n.length ? (e.each(n, function(e) {
                o += c(e)
            }), i.find(".alert").hide(), a.show()) : (i.find(".alert").show(), a.hide()), a.append(o)
        }

        function C(e) {
            var n = t(e.target),
                a = n.attr("data-album");
            p(a, function(e) {
                var n = t(s(e));
                n.appendTo("body").one("hidden.bs.modal", function() {
                    n.remove()
                }).modal("show"), n.find(".fa-spinner").show(), h(x)
            })
        }

        function j(e) {
            var n = t(e.target);
            A && (clearTimeout(A), A = null), A = setTimeout(function() {
                var e = n.val(),
                    t = n.parents(".modal"),
                    a = t.find(".fa-spinner");
                a.show(), e ? m(e, x) : h(x)
            }, 500)
        }

        function T(e) {
            var n = t(e.target);
            n.is("li") || (n = n.parents("li:first"));
            var a = n.attr("data-video"),
                i = n.parents("form").find('input[name="album"]').val();
            t.ajax({
                url: "/api/album/" + i + "/video/" + a,
                type: "POST",
                success: function() {
                    t(".modal").modal("hide");
                    try {
                        mixpanel.track("Album Video Added", {
                            albumId: i,
                            userId: Viewer.userId,
                            username: Viewer.username
                        })
                    } catch (e) {}
                    setTimeout(function() {
                        window.location.hash = "#album-video-" + a, window.location.reload()
                    }, 100)
                },
                error: u
            })
        }

        function S(n) {
            var a = t(".album-edit-videos-modal .modal-body");
            e.each(n, function(e) {
                var n = t(d(e));
                a.append(n)
            }), a.sortable({
                containment: t(".album-edit-videos-modal"),
                axis: "y",
                tolerance: "pointer"
            })
        }

        function E(e) {
            var a = t(e.target),
                i = a.attr("data-album"),
                o = t(r({
                    album_id: i
                }));
            o.appendTo("body").one("hidden.bs.modal", function() {
                o.remove()
            }).modal("show"), n.parallel([function(e) {
                require(["jquery-ui/sortable"], function() {
                    e()
                })
            }, function(e) {
                v(i, e)
            }], function(e, t) {
                e || S(t[1])
            })
        }

        function I(n) {
            n.preventDefault();
            var a = t(n.target),
                i = a.find(':input[type="submit"]'),
                o = 1;
            a.find(".order-input").each(function(e, n) {
                t(n).val(o++)
            });
            var s = {};
            e.each(a.serializeArray(), function(e) {
                s[e.name] = e.value
            });
            var r = s.album;
            delete s.album, i.append('<i class="fa fa-spinner fa-spin"></i>').prop("disabled", !0), t.ajax({
                url: "/api/album/" + r + "/videos",
                type: "POST",
                data: s,
                success: function() {
                    try {
                        mixpanel.track("Album Videos Edited", {
                            albumId: r,
                            userId: Viewer.userId,
                            username: Viewer.username
                        })
                    } catch (e) {}
                    setTimeout(function() {
                        window.location.hash = "#ribbon=" + encodeURIComponent("Changes saved!"), window.location.reload()
                    }, 100)
                },
                error: u,
                complete: function() {
                    i.prop("disabled", !1).find("i").remove()
                }
            })
        }

        function P(e) {
            var n = t(e.target),
                a = n.parents("fieldset"),
                i = a.parents("form"),
                o = a.attr("data-video");
            i.append(t("<input>").attr("type", "hidden").attr("name", "videos[" + o + "]").val("remove")), a.remove()
        }

        function U(e) {
            var n = t(e.target),
                a = n.attr("data-album"),
                i = t(l({
                    album_id: a
                }));
            i.appendTo("body").one("hidden.bs.modal", function() {
                i.remove()
            }).modal("show")
        }

        function M(n) {
            n.preventDefault();
            var i = t(n.target),
                o = i.find(':input[type="submit"]'),
                s = {};
            e.each(i.serializeArray(), function(e) {
                s[e.name] = e.value
            });
            var r = s.album;
            return delete s.album, r ? (o.append('<i class="fa fa-spinner fa-spin"></i>').prop("disabled", !0), void t.ajax({
                url: "/api/album/" + r,
                type: "DELETE",
                dataType: "json",
                success: function(e) {
                    if (e.error) a({
                        text: e.error,
                        level: "danger"
                    });
                    else {
                        a("Album deleted");
                        try {
                            mixpanel.track("Album Deleted", {
                                albumId: r,
                                userId: Viewer.userId,
                                username: Viewer.username
                            })
                        } catch (t) {}
                        setTimeout(function() {
                            window.location = "/"
                        }, 100)
                    }
                },
                error: u,
                complete: function() {
                    o.prop("disabled", !1).find("i").remove()
                }
            })) : u()
        }

        function D(n) {
            var a = t(n.target);
            a.is("a") || (a = a.parents("a:first"));
            var i = a.attr("data-url") + "?internal&autoplay=1",
                o = a.parents("li:first"),
                s = o.parent(),
                r = a.width(),
                l = a.height();
            s.find("iframe").each(function(e, n) {
                try {
                    n.contentWindow.vjs.players.embed_video_player.pause()
                } catch (a) {}
                var i = t(n).parent().parent();
                t(n).parent().remove(), i.children().show()
            }), o.addClass("active");
            var d = t("<div>").addClass("video_list_embed_container"),
                c = t("<iframe>").attr("class", "video_list_embed_frame").attr("name", "embed-player-" + Math.round(1e3 * Math.random())).attr("src", "about:blank").attr("frameborder", 0).attr("allowfullscreen", "allowfullscreen").attr("webkitallowfullscreen", "webkitallowfullscreen").attr("mozallowfullscreen", "mozallowfullscreen").attr("scrolling", "no");
            e.each([d, c], function(e) {
                e.css("width", r + "px").css("height", l + "px")
            }), d.append(c), a.hide(), a.after(d);
            var u = c.offset().top + c.height() / 2,
                p = u - t(window).height() / 2;
            window.scrollEventPause = !0, t("html, body").animate({
                scrollTop: p
            }, {
                duration: 150,
                easing: "linear",
                complete: function() {
                    window.scrollEventPause && (delete window.scrollEventPause, c.attr("src", i))
                }
            });
            try {
                ga("send", "event", "Videos", "albumListEmbedClick", "Album embed opened", 1)
            } catch (h) {}
        }

        function O() {
            t(".album_videos > li").each(function(e, n) {
                n = t(n);
                var a, i = n.find("a.embed-frame-activator"),
                    o = parseInt(i.attr("data-width")),
                    s = parseInt(i.attr("data-height")),
                    r = n.width(),
                    l = r;
                r > o ? (a = o / r, o = Math.round(o / a), s = Math.round(s / a)) : o > r && (a = o / r, o = Math.round(o / a), s = Math.round(s / a));
                var d = o,
                    c = s,
                    u = 0;
                s > l && (a = s / l, s = Math.round(s / a), u = -Math.round((c - s) / 2)), i.css("width", o + "px").css("height", s + "px"), i.find("> img").css("width", d + "px").css("height", c + "px").css("margin-top", u + "px")
            })
        }

        function V() {
            var e = t(document);
            if (e.on("click", ".js-album-create", w), e.on("click", ".js-album-edit", _), e.on("click", ".js-album-add-videos", C), e.on("click", ".js-album-edit-videos", E), e.on("click", ".js-album-delete", U), e.on("submit", ".album-create-modal form", y), e.on("submit", ".album-edit-modal form", k), e.on("submit", ".album-edit-videos-modal form", I), e.on("submit", ".album-delete-modal form", M), e.on("click", ".album-edit-videos-modal .js-album-edit-videos-remove", P), e.on("keyup", '.album-create-modal input[name="title"]', b), e.on("keyup", '.album-edit-modal input[name="title"]', b), e.on("keyup", ".js-album-add-videos-suggest", j), e.on("click", ".js-album-add-video-list li", T), e.on("click", ".album_videos .embed-frame-activator", D), t(".album_videos").length) {
                t(window).on("resize", O), O();
                var n = (window.location.hash + "").match(/album-video-\d+/);
                n && (a("Video added!"), t("html, body").animate({
                    scrollTop: t("#" + n[0]).offset().top
                }, 1e3))
            }
        }
        var N, A, L = {};
        t(V)
    }), define("hbs!views/basic-modal", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            1: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return r((i = null != (i = t.cancel || (null != e ? e.cancel : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "cancel",
                    hash: {},
                    data: a
                }) : i))
            },
            3: function() {
                return "Close"
            },
            5: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '          <button type="button" class="btn btn-' + r((i = null != (i = t.level || (null != e ? e.level : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "level",
                    hash: {},
                    data: a
                }) : i)) + ' pull-right js-confirm">' + r((i = null != (i = t.confirm || (null != e ? e.confirm : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "confirm",
                    hash: {},
                    data: a
                }) : i)) + "</button>\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '\n<div class="modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4 class="modal-title">' + l((o = null != (o = t.title || (null != e ? e.title : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : o)) + '</h4>\n      </div>\n      <div class="modal-body">\n        <div class="message">\n          <div class="alert alert-' + l((o = null != (o = t.level || (null != e ? e.level : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "level",
                        hash: {},
                        data: a
                    }) : o)) + '">' + l((o = null != (o = t.message || (null != e ? e.message : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "message",
                        hash: {},
                        data: a
                    }) : o)) + '</div>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default btn-cancel pull-left" data-dismiss="modal">';
                return i = t["if"].call(e, null != e ? e.cancel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.program(3, a),
                    data: a
                }), null != i && (d += i), d += "</button>\n", i = t["if"].call(e, null != e ? e.confirm : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + "      </div>\n    </div>\n  </div>\n</div>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/basic-modal", n), n
    }), define("site/application-create", ["jquery", "underscore", "hbs!views/basic-modal"], function(e, t, n) {
        "use strict";

        function a(a) {
            a.preventDefault();
            var i = e(a.target),
                o = {};
            t.each(i.serializeArray(), function(e) {
                o[e.name] = e.value
            }), e.ajax({
                url: "/api/oauth/register",
                type: "POST",
                dataType: "json",
                data: o,
                success: function(e) {
                    window.location = "/oauth/client/" + e.application.application_id
                },
                error: function(t) {
                    var a = t.responseJSON,
                        i = a && a.error ? a.error : "An unknown error has ocurred. Please try again later.";
                    e(n({
                        title: "Whoops",
                        level: "warning",
                        message: i
                    })).modal("show")
                }
            })
        }

        function i(a) {
            a.preventDefault();
            var i = e(a.target),
                o = {};
            t.each(i.serializeArray(), function(e) {
                o[e.name] = e.value
            });
            var s = o.application_id;
            delete o.application_id, e.ajax({
                url: "/api/oauth/client/" + s + "/edit",
                type: "POST",
                dataType: "json",
                data: o,
                success: function() {
                    i.find(".alert").remove(), console.log(i), i.prepend('<div class="alert alert-success">Changes saved!</div>')
                },
                error: function(t) {
                    var a = t.responseJSON,
                        i = a && a.error ? a.error : "An unknown error has ocurred. Please try again later.";
                    e(n({
                        title: "Whoops",
                        level: "warning",
                        message: i
                    })).modal("show")
                }
            })
        }
        e(function() {
            var t = e(document);
            t.on("submit", ".js-application-create-form", a), t.on("submit", ".js-application-edit-form", i)
        })
    }), define("site/channel-follow", ["jquery"], function(e) {
        "use strict";

        function t(t, n) {
            t.attr("data-state", n + "").text(n ? "Following" : e("#explore").length ? "Follow" : "Follow network"), n ? (t.removeClass("btn-default").addClass("btn-info").addClass("following"), t.prepend("<i class='fa fa-check'></i> ")) : (t.addClass("btn-default").removeClass("btn-info").removeClass("following"), t.find("i").remove())
        }

        function n(n) {
            var a = e(n.target),
                i = a.attr("data-channel"),
                o = a.attr("data-channel-url"),
                s = "true" === a.attr("data-state");
            if (!window.Viewer) return void e(".sign-in-link").trigger("click");
            t(a, !s);
            var r = "/api/channel/" + i + "/" + (s ? "unfollow" : "follow");
            e.ajax({
                url: r,
                type: "POST",
                dataType: "json",
                error: function() {
                    t(a, s)
                }
            });
            try {
                mixpanel.track("Network " + (s ? "Unfollowed" : "Followed"), {
                    NetworkId: i,
                    NetworkUrl: o
                })
            } catch (l) {}
        }

        function a() {
            var t = e(document);
            t.on("click", ".js-channel-follow-link", n)
        }
        e(a)
    }),
    function(e, t) {
        if ("function" == typeof define && define.amd) define("bootstrap-slider", ["jquery"], t);
        else if ("object" == typeof module && module.exports) {
            var n;
            try {
                n = require("jquery")
            } catch (a) {
                n = null
            }
            module.exports = t(n)
        } else e.Slider = t(e.jQuery)
    }(this, function(e) {
        var t;
        return function(e) {
                "use strict";

                function t() {}

                function n(e) {
                    function n(t) {
                        t.prototype.option || (t.prototype.option = function(t) {
                            e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
                        })
                    }

                    function i(t, n) {
                        e.fn[t] = function(i) {
                            if ("string" == typeof i) {
                                for (var s = a.call(arguments, 1), r = 0, l = this.length; l > r; r++) {
                                    var d = this[r],
                                        c = e.data(d, t);
                                    if (c)
                                        if (e.isFunction(c[i]) && "_" !== i.charAt(0)) {
                                            var u = c[i].apply(c, s);
                                            if (void 0 !== u && u !== c) return u
                                        } else o("no such method '" + i + "' for " + t + " instance");
                                    else o("cannot call methods on " + t + " prior to initialization; attempted to call '" + i + "'")
                                }
                                return this
                            }
                            var p = this.map(function() {
                                var a = e.data(this, t);
                                return a ? (a.option(i), a._init()) : (a = new n(this, i), e.data(this, t, a)), e(this)
                            });
                            return !p || p.length > 1 ? p : p[0]
                        }
                    }
                    if (e) {
                        var o = "undefined" == typeof console ? t : function(e) {
                            console.error(e)
                        };
                        return e.bridget = function(e, t) {
                            n(t), i(e, t)
                        }, e.bridget
                    }
                }
                var a = Array.prototype.slice;
                n(e)
            }(e),
            function(e) {
                function n(t, n) {
                    function a(e, t) {
                        var n = "data-slider-" + t.replace(/_/g, "-"),
                            a = e.getAttribute(n);
                        try {
                            return JSON.parse(a)
                        } catch (i) {
                            return a
                        }
                    }
                    "string" == typeof t ? this.element = document.querySelector(t) : t instanceof HTMLElement && (this.element = t), n = n ? n : {};
                    for (var o = Object.keys(this.defaultOptions), s = 0; s < o.length; s++) {
                        var r = o[s],
                            l = n[r];
                        l = "undefined" != typeof l ? l : a(this.element, r), l = null !== l ? l : this.defaultOptions[r], this.options || (this.options = {}), this.options[r] = l
                    }
                    var d, c, u, p, h, m = this.element.style.width,
                        v = !1,
                        f = this.element.parentNode;
                    if (this.sliderElem) v = !0;
                    else {
                        this.sliderElem = document.createElement("div"), this.sliderElem.className = "slider";
                        var g = document.createElement("div");
                        if (g.className = "slider-track", c = document.createElement("div"), c.className = "slider-track-low", d = document.createElement("div"), d.className = "slider-selection", u = document.createElement("div"), u.className = "slider-track-high", p = document.createElement("div"), p.className = "slider-handle min-slider-handle", h = document.createElement("div"), h.className = "slider-handle max-slider-handle", g.appendChild(c), g.appendChild(d), g.appendChild(u), this.ticks = [], Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                            for (s = 0; s < this.options.ticks.length; s++) {
                                var b = document.createElement("div");
                                b.className = "slider-tick", this.ticks.push(b), g.appendChild(b)
                            }
                            d.className += " tick-slider-selection"
                        }
                        if (g.appendChild(p), g.appendChild(h), this.tickLabels = [], Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0)
                            for (this.tickLabelContainer = document.createElement("div"), this.tickLabelContainer.className = "slider-tick-label-container", s = 0; s < this.options.ticks_labels.length; s++) {
                                var w = document.createElement("div");
                                w.className = "slider-tick-label", w.innerHTML = this.options.ticks_labels[s], this.tickLabels.push(w), this.tickLabelContainer.appendChild(w)
                            }
                        var y = function(e) {
                                var t = document.createElement("div");
                                t.className = "tooltip-arrow";
                                var n = document.createElement("div");
                                n.className = "tooltip-inner", e.appendChild(t), e.appendChild(n)
                            },
                            _ = document.createElement("div");
                        _.className = "tooltip tooltip-main", y(_);
                        var k = document.createElement("div");
                        k.className = "tooltip tooltip-min", y(k);
                        var x = document.createElement("div");
                        x.className = "tooltip tooltip-max", y(x), this.sliderElem.appendChild(g), this.sliderElem.appendChild(_), this.sliderElem.appendChild(k), this.sliderElem.appendChild(x), this.tickLabelContainer && this.sliderElem.appendChild(this.tickLabelContainer), f.insertBefore(this.sliderElem, this.element), this.element.style.display = "none"
                    }
                    if (e && (this.$element = e(this.element), this.$sliderElem = e(this.sliderElem)), this.eventToCallbackMap = {}, this.sliderElem.id = this.options.id, this.touchCapable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, this.tooltip = this.sliderElem.querySelector(".tooltip-main"), this.tooltipInner = this.tooltip.querySelector(".tooltip-inner"), this.tooltip_min = this.sliderElem.querySelector(".tooltip-min"), this.tooltipInner_min = this.tooltip_min.querySelector(".tooltip-inner"), this.tooltip_max = this.sliderElem.querySelector(".tooltip-max"), this.tooltipInner_max = this.tooltip_max.querySelector(".tooltip-inner"), i[this.options.scale] && (this.options.scale = i[this.options.scale]), v === !0 && (this._removeClass(this.sliderElem, "slider-horizontal"), this._removeClass(this.sliderElem, "slider-vertical"), this._removeClass(this.tooltip, "hide"), this._removeClass(this.tooltip_min, "hide"), this._removeClass(this.tooltip_max, "hide"), ["left", "top", "width", "height"].forEach(function(e) {
                            this._removeProperty(this.trackLow, e), this._removeProperty(this.trackSelection, e), this._removeProperty(this.trackHigh, e)
                        }, this), [this.handle1, this.handle2].forEach(function(e) {
                            this._removeProperty(e, "left"), this._removeProperty(e, "top")
                        }, this), [this.tooltip, this.tooltip_min, this.tooltip_max].forEach(function(e) {
                            this._removeProperty(e, "left"), this._removeProperty(e, "top"), this._removeProperty(e, "margin-left"), this._removeProperty(e, "margin-top"), this._removeClass(e, "right"), this._removeClass(e, "top")
                        }, this)), "vertical" === this.options.orientation ? (this._addClass(this.sliderElem, "slider-vertical"), this.stylePos = "top", this.mousePos = "pageY", this.sizePos = "offsetHeight", this._addClass(this.tooltip, "right"), this.tooltip.style.left = "100%", this._addClass(this.tooltip_min, "right"), this.tooltip_min.style.left = "100%", this._addClass(this.tooltip_max, "right"), this.tooltip_max.style.left = "100%") : (this._addClass(this.sliderElem, "slider-horizontal"), this.sliderElem.style.width = m, this.options.orientation = "horizontal", this.stylePos = "left", this.mousePos = "pageX", this.sizePos = "offsetWidth", this._addClass(this.tooltip, "top"), this.tooltip.style.top = -this.tooltip.outerHeight - 14 + "px", this._addClass(this.tooltip_min, "top"), this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + "px", this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + "px"), Array.isArray(this.options.ticks) && this.options.ticks.length > 0 && (this.options.max = Math.max.apply(Math, this.options.ticks), this.options.min = Math.min.apply(Math, this.options.ticks)), Array.isArray(this.options.value) ? this.options.range = !0 : this.options.range && (this.options.value = [this.options.value, this.options.max]), this.trackLow = c || this.trackLow, this.trackSelection = d || this.trackSelection, this.trackHigh = u || this.trackHigh, "none" === this.options.selection && (this._addClass(this.trackLow, "hide"), this._addClass(this.trackSelection, "hide"), this._addClass(this.trackHigh, "hide")), this.handle1 = p || this.handle1, this.handle2 = h || this.handle2, v === !0)
                        for (this._removeClass(this.handle1, "round triangle"), this._removeClass(this.handle2, "round triangle hide"), s = 0; s < this.ticks.length; s++) this._removeClass(this.ticks[s], "round triangle hide");
                    var C = ["round", "triangle", "custom"],
                        j = -1 !== C.indexOf(this.options.handle);
                    if (j)
                        for (this._addClass(this.handle1, this.options.handle), this._addClass(this.handle2, this.options.handle), s = 0; s < this.ticks.length; s++) this._addClass(this.ticks[s], this.options.handle);
                    this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos], this.setValue(this.options.value), this.handle1Keydown = this._keydown.bind(this, 0), this.handle1.addEventListener("keydown", this.handle1Keydown, !1), this.handle2Keydown = this._keydown.bind(this, 1), this.handle2.addEventListener("keydown", this.handle2Keydown, !1), this.mousedown = this._mousedown.bind(this), this.touchCapable && this.sliderElem.addEventListener("touchstart", this.mousedown, !1), this.sliderElem.addEventListener("mousedown", this.mousedown, !1), "hide" === this.options.tooltip ? (this._addClass(this.tooltip, "hide"), this._addClass(this.tooltip_min, "hide"), this._addClass(this.tooltip_max, "hide")) : "always" === this.options.tooltip ? (this._showTooltip(), this._alwaysShowTooltip = !0) : (this.showTooltip = this._showTooltip.bind(this), this.hideTooltip = this._hideTooltip.bind(this), this.sliderElem.addEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.addEventListener("mouseleave", this.hideTooltip, !1), this.handle1.addEventListener("focus", this.showTooltip, !1), this.handle1.addEventListener("blur", this.hideTooltip, !1), this.handle2.addEventListener("focus", this.showTooltip, !1), this.handle2.addEventListener("blur", this.hideTooltip, !1)), this.options.enabled ? this.enable() : this.disable()
                }
                var a = {
                        formatInvalidInputErrorMsg: function(e) {
                            return "Invalid input value '" + e + "' passed in"
                        },
                        callingContextNotSliderInstance: "Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method"
                    },
                    i = {
                        linear: {
                            toValue: function(e) {
                                var t = e / 100 * (this.options.max - this.options.min);
                                if (this.options.ticks_positions.length > 0) {
                                    for (var n, a, i, o = 0, s = 0; s < this.options.ticks_positions.length; s++)
                                        if (e <= this.options.ticks_positions[s]) {
                                            n = s > 0 ? this.options.ticks[s - 1] : 0, i = s > 0 ? this.options.ticks_positions[s - 1] : 0, a = this.options.ticks[s], o = this.options.ticks_positions[s];
                                            break
                                        }
                                    if (s > 0) {
                                        var r = (e - i) / (o - i);
                                        t = n + r * (a - n)
                                    }
                                }
                                var l = this.options.min + Math.round(t / this.options.step) * this.options.step;
                                return l < this.options.min ? this.options.min : l > this.options.max ? this.options.max : l
                            },
                            toPercentage: function(e) {
                                if (this.options.max === this.options.min) return 0;
                                if (this.options.ticks_positions.length > 0) {
                                    for (var t, n, a, i = 0, o = 0; o < this.options.ticks.length; o++)
                                        if (e <= this.options.ticks[o]) {
                                            t = o > 0 ? this.options.ticks[o - 1] : 0, a = o > 0 ? this.options.ticks_positions[o - 1] : 0, n = this.options.ticks[o], i = this.options.ticks_positions[o];
                                            break
                                        }
                                    if (o > 0) {
                                        var s = (e - t) / (n - t);
                                        return a + s * (i - a)
                                    }
                                }
                                return 100 * (e - this.options.min) / (this.options.max - this.options.min)
                            }
                        },
                        logarithmic: {
                            toValue: function(e) {
                                var t = 0 === this.options.min ? 0 : Math.log(this.options.min),
                                    n = Math.log(this.options.max),
                                    a = Math.exp(t + (n - t) * e / 100);
                                return a = this.options.min + Math.round((a - this.options.min) / this.options.step) * this.options.step, a < this.options.min ? this.options.min : a > this.options.max ? this.options.max : a
                            },
                            toPercentage: function(e) {
                                if (this.options.max === this.options.min) return 0;
                                var t = Math.log(this.options.max),
                                    n = 0 === this.options.min ? 0 : Math.log(this.options.min),
                                    a = 0 === e ? 0 : Math.log(e);
                                return 100 * (a - n) / (t - n)
                            }
                        }
                    };
                if (t = function(e, t) {
                        return n.call(this, e, t), this
                    }, t.prototype = {
                        _init: function() {},
                        constructor: t,
                        defaultOptions: {
                            id: "",
                            min: 0,
                            max: 10,
                            step: 1,
                            precision: 0,
                            orientation: "horizontal",
                            value: 5,
                            range: !1,
                            selection: "before",
                            tooltip: "show",
                            tooltip_split: !1,
                            handle: "round",
                            reversed: !1,
                            enabled: !0,
                            formatter: function(e) {
                                return Array.isArray(e) ? e[0] + " : " + e[1] : e
                            },
                            natural_arrow_keys: !1,
                            ticks: [],
                            ticks_positions: [],
                            ticks_labels: [],
                            ticks_snap_bounds: 0,
                            scale: "linear",
                            focus: !1
                        },
                        over: !1,
                        inDrag: !1,
                        getValue: function() {
                            return this.options.range ? this.options.value : this.options.value[0]
                        },
                        setValue: function(e, t, n) {
                            e || (e = 0);
                            var a = this.getValue();
                            this.options.value = this._validateInputValue(e);
                            var i = this._applyPrecision.bind(this);
                            this.options.range ? (this.options.value[0] = i(this.options.value[0]), this.options.value[1] = i(this.options.value[1]), this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0])), this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]))) : (this.options.value = i(this.options.value), this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))], this._addClass(this.handle2, "hide"), this.options.value[1] = "after" === this.options.selection ? this.options.max : this.options.min), this.percentage = this.options.max > this.options.min ? [this._toPercentage(this.options.value[0]), this._toPercentage(this.options.value[1]), 100 * this.options.step / (this.options.max - this.options.min)] : [0, 0, 100], this._layout();
                            var o = this.options.range ? this.options.value : this.options.value[0];
                            return t === !0 && this._trigger("slide", o), a !== o && n === !0 && this._trigger("change", {
                                oldValue: a,
                                newValue: o
                            }), this._setDataVal(o), this
                        },
                        destroy: function() {
                            this._removeSliderEventHandlers(), this.sliderElem.parentNode.removeChild(this.sliderElem), this.element.style.display = "", this._cleanUpEventCallbacksMap(), this.element.removeAttribute("data"), e && (this._unbindJQueryEventHandlers(), this.$element.removeData("slider"))
                        },
                        disable: function() {
                            return this.options.enabled = !1, this.handle1.removeAttribute("tabindex"), this.handle2.removeAttribute("tabindex"), this._addClass(this.sliderElem, "slider-disabled"), this._trigger("slideDisabled"), this
                        },
                        enable: function() {
                            return this.options.enabled = !0, this.handle1.setAttribute("tabindex", 0), this.handle2.setAttribute("tabindex", 0), this._removeClass(this.sliderElem, "slider-disabled"), this._trigger("slideEnabled"), this
                        },
                        toggle: function() {
                            return this.options.enabled ? this.disable() : this.enable(), this
                        },
                        isEnabled: function() {
                            return this.options.enabled
                        },
                        on: function(e, t) {
                            return this._bindNonQueryEventHandler(e, t), this
                        },
                        getAttribute: function(e) {
                            return e ? this.options[e] : this.options
                        },
                        setAttribute: function(e, t) {
                            return this.options[e] = t, this
                        },
                        refresh: function() {
                            return this._removeSliderEventHandlers(), n.call(this, this.element, this.options), e && e.data(this.element, "slider", this), this
                        },
                        relayout: function() {
                            return this._layout(), this
                        },
                        _removeSliderEventHandlers: function() {
                            this.handle1.removeEventListener("keydown", this.handle1Keydown, !1), this.handle1.removeEventListener("focus", this.showTooltip, !1), this.handle1.removeEventListener("blur", this.hideTooltip, !1), this.handle2.removeEventListener("keydown", this.handle2Keydown, !1), this.handle2.removeEventListener("focus", this.handle2Keydown, !1), this.handle2.removeEventListener("blur", this.handle2Keydown, !1), this.sliderElem.removeEventListener("mouseenter", this.showTooltip, !1), this.sliderElem.removeEventListener("mouseleave", this.hideTooltip, !1), this.sliderElem.removeEventListener("touchstart", this.mousedown, !1), this.sliderElem.removeEventListener("mousedown", this.mousedown, !1)
                        },
                        _bindNonQueryEventHandler: function(e, t) {
                            void 0 === this.eventToCallbackMap[e] && (this.eventToCallbackMap[e] = []), this.eventToCallbackMap[e].push(t)
                        },
                        _cleanUpEventCallbacksMap: function() {
                            for (var e = Object.keys(this.eventToCallbackMap), t = 0; t < e.length; t++) {
                                var n = e[t];
                                this.eventToCallbackMap[n] = null
                            }
                        },
                        _showTooltip: function() {
                            this.options.tooltip_split === !1 ? (this._addClass(this.tooltip, "in"), this.tooltip_min.style.display = "none", this.tooltip_max.style.display = "none") : (this._addClass(this.tooltip_min, "in"), this._addClass(this.tooltip_max, "in"), this.tooltip.style.display = "none"), this.over = !0
                        },
                        _hideTooltip: function() {
                            this.inDrag === !1 && this.alwaysShowTooltip !== !0 && (this._removeClass(this.tooltip, "in"), this._removeClass(this.tooltip_min, "in"), this._removeClass(this.tooltip_max, "in")), this.over = !1
                        },
                        _layout: function() {
                            var e;
                            if (e = this.options.reversed ? [100 - this.percentage[0], this.percentage[1]] : [this.percentage[0], this.percentage[1]], this.handle1.style[this.stylePos] = e[0] + "%", this.handle2.style[this.stylePos] = e[1] + "%", Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
                                var t = Math.max.apply(Math, this.options.ticks),
                                    n = Math.min.apply(Math, this.options.ticks),
                                    a = "vertical" === this.options.orientation ? "height" : "width",
                                    i = "vertical" === this.options.orientation ? "marginTop" : "marginLeft",
                                    o = this.size / (this.options.ticks.length - 1);
                                if (this.tickLabelContainer) {
                                    var s = 0;
                                    if (0 === this.options.ticks_positions.length) this.tickLabelContainer.style[i] = -o / 2 + "px", s = this.tickLabelContainer.offsetHeight;
                                    else
                                        for (r = 0; r < this.tickLabelContainer.childNodes.length; r++) this.tickLabelContainer.childNodes[r].offsetHeight > s && (s = this.tickLabelContainer.childNodes[r].offsetHeight);
                                    "horizontal" === this.options.orientation && (this.sliderElem.style.marginBottom = s + "px")
                                }
                                for (var r = 0; r < this.options.ticks.length; r++) {
                                    var l = this.options.ticks_positions[r] || 100 * (this.options.ticks[r] - n) / (t - n);
                                    this.ticks[r].style[this.stylePos] = l + "%", this._removeClass(this.ticks[r], "in-selection"), this.options.range ? l >= e[0] && l <= e[1] && this._addClass(this.ticks[r], "in-selection") : "after" === this.options.selection && l >= e[0] ? this._addClass(this.ticks[r], "in-selection") : "before" === this.options.selection && l <= e[0] && this._addClass(this.ticks[r], "in-selection"), this.tickLabels[r] && (this.tickLabels[r].style[a] = o + "px", void 0 !== this.options.ticks_positions[r] && (this.tickLabels[r].style.position = "absolute", this.tickLabels[r].style[this.stylePos] = this.options.ticks_positions[r] + "%", this.tickLabels[r].style[i] = -o / 2 + "px"))
                                }
                            }
                            if ("vertical" === this.options.orientation) this.trackLow.style.top = "0", this.trackLow.style.height = Math.min(e[0], e[1]) + "%", this.trackSelection.style.top = Math.min(e[0], e[1]) + "%", this.trackSelection.style.height = Math.abs(e[0] - e[1]) + "%", this.trackHigh.style.bottom = "0", this.trackHigh.style.height = 100 - Math.min(e[0], e[1]) - Math.abs(e[0] - e[1]) + "%";
                            else {
                                this.trackLow.style.left = "0", this.trackLow.style.width = Math.min(e[0], e[1]) + "%", this.trackSelection.style.left = Math.min(e[0], e[1]) + "%", this.trackSelection.style.width = Math.abs(e[0] - e[1]) + "%", this.trackHigh.style.right = "0", this.trackHigh.style.width = 100 - Math.min(e[0], e[1]) - Math.abs(e[0] - e[1]) + "%";
                                var d = this.tooltip_min.getBoundingClientRect(),
                                    c = this.tooltip_max.getBoundingClientRect();
                                d.right > c.left ? (this._removeClass(this.tooltip_max, "top"), this._addClass(this.tooltip_max, "bottom"), this.tooltip_max.style.top = "18px") : (this._removeClass(this.tooltip_max, "bottom"), this._addClass(this.tooltip_max, "top"), this.tooltip_max.style.top = this.tooltip_min.style.top)
                            }
                            var u;
                            if (this.options.range) {
                                u = this.options.formatter(this.options.value), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = (e[1] + e[0]) / 2 + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px"), "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px");
                                var p = this.options.formatter(this.options.value[0]);
                                this._setText(this.tooltipInner_min, p);
                                var h = this.options.formatter(this.options.value[1]);
                                this._setText(this.tooltipInner_max, h), this.tooltip_min.style[this.stylePos] = e[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_min, "margin-top", -this.tooltip_min.offsetHeight / 2 + "px") : this._css(this.tooltip_min, "margin-left", -this.tooltip_min.offsetWidth / 2 + "px"), this.tooltip_max.style[this.stylePos] = e[1] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip_max, "margin-top", -this.tooltip_max.offsetHeight / 2 + "px") : this._css(this.tooltip_max, "margin-left", -this.tooltip_max.offsetWidth / 2 + "px")
                            } else u = this.options.formatter(this.options.value[0]), this._setText(this.tooltipInner, u), this.tooltip.style[this.stylePos] = e[0] + "%", "vertical" === this.options.orientation ? this._css(this.tooltip, "margin-top", -this.tooltip.offsetHeight / 2 + "px") : this._css(this.tooltip, "margin-left", -this.tooltip.offsetWidth / 2 + "px")
                        },
                        _removeProperty: function(e, t) {
                            e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(t)
                        },
                        _mousedown: function(e) {
                            if (!this.options.enabled) return !1;
                            this.offset = this._offset(this.sliderElem), this.size = this.sliderElem[this.sizePos];
                            var t = this._getPercentage(e);
                            if (this.options.range) {
                                var n = Math.abs(this.percentage[0] - t),
                                    a = Math.abs(this.percentage[1] - t);
                                this.dragged = a > n ? 0 : 1
                            } else this.dragged = 0;
                            this.percentage[this.dragged] = this.options.reversed ? 100 - t : t, this._layout(), this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), this.mousemove && document.removeEventListener("mousemove", this.mousemove, !1), this.mouseup && document.removeEventListener("mouseup", this.mouseup, !1), this.mousemove = this._mousemove.bind(this), this.mouseup = this._mouseup.bind(this), this.touchCapable && (document.addEventListener("touchmove", this.mousemove, !1), document.addEventListener("touchend", this.mouseup, !1)), document.addEventListener("mousemove", this.mousemove, !1), document.addEventListener("mouseup", this.mouseup, !1), this.inDrag = !0;
                            var i = this._calculateValue();
                            return this._trigger("slideStart", i), this._setDataVal(i), this.setValue(i, !1, !0), this._pauseEvent(e), this.options.focus && this._triggerFocusOnHandle(this.dragged), !0
                        },
                        _triggerFocusOnHandle: function(e) {
                            0 === e && this.handle1.focus(), 1 === e && this.handle2.focus()
                        },
                        _keydown: function(e, t) {
                            if (!this.options.enabled) return !1;
                            var n;
                            switch (t.keyCode) {
                                case 37:
                                case 40:
                                    n = -1;
                                    break;
                                case 39:
                                case 38:
                                    n = 1
                            }
                            if (n) {
                                if (this.options.natural_arrow_keys) {
                                    var a = "vertical" === this.options.orientation && !this.options.reversed,
                                        i = "horizontal" === this.options.orientation && this.options.reversed;
                                    (a || i) && (n = -n)
                                }
                                var o = this.options.value[e] + n * this.options.step;
                                return this.options.range && (o = [e ? this.options.value[0] : o, e ? o : this.options.value[1]]), this._trigger("slideStart", o), this._setDataVal(o), this.setValue(o, !0, !0), this._trigger("slideStop", o), this._setDataVal(o), this._layout(), this._pauseEvent(t), !1
                            }
                        },
                        _pauseEvent: function(e) {
                            e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), e.cancelBubble = !0, e.returnValue = !1
                        },
                        _mousemove: function(e) {
                            if (!this.options.enabled) return !1;
                            var t = this._getPercentage(e);
                            this._adjustPercentageForRangeSliders(t), this.percentage[this.dragged] = this.options.reversed ? 100 - t : t, this._layout();
                            var n = this._calculateValue(!0);
                            return this.setValue(n, !0, !0), !1
                        },
                        _adjustPercentageForRangeSliders: function(e) {
                            if (this.options.range) {
                                var t = this._getNumDigitsAfterDecimalPlace(e);
                                t = t ? t - 1 : 0;
                                var n = this._applyToFixedAndParseFloat(e, t);
                                0 === this.dragged && this._applyToFixedAndParseFloat(this.percentage[1], t) < n ? (this.percentage[0] = this.percentage[1], this.dragged = 1) : 1 === this.dragged && this._applyToFixedAndParseFloat(this.percentage[0], t) > n && (this.percentage[1] = this.percentage[0], this.dragged = 0)
                            }
                        },
                        _mouseup: function() {
                            if (!this.options.enabled) return !1;
                            this.touchCapable && (document.removeEventListener("touchmove", this.mousemove, !1), document.removeEventListener("touchend", this.mouseup, !1)), document.removeEventListener("mousemove", this.mousemove, !1), document.removeEventListener("mouseup", this.mouseup, !1), this.inDrag = !1, this.over === !1 && this._hideTooltip();
                            var e = this._calculateValue(!0);
                            return this._layout(), this._trigger("slideStop", e), this._setDataVal(e), !1
                        },
                        _calculateValue: function(e) {
                            var t;
                            if (this.options.range ? (t = [this.options.min, this.options.max], 0 !== this.percentage[0] && (t[0] = this._toValue(this.percentage[0]), t[0] = this._applyPrecision(t[0])), 100 !== this.percentage[1] && (t[1] = this._toValue(this.percentage[1]), t[1] = this._applyPrecision(t[1]))) : (t = this._toValue(this.percentage[0]), t = parseFloat(t), t = this._applyPrecision(t)), e) {
                                for (var n = [t, 1 / 0], a = 0; a < this.options.ticks.length; a++) {
                                    var i = Math.abs(this.options.ticks[a] - t);
                                    i <= n[1] && (n = [this.options.ticks[a], i])
                                }
                                if (n[1] <= this.options.ticks_snap_bounds) return n[0]
                            }
                            return t
                        },
                        _applyPrecision: function(e) {
                            var t = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
                            return this._applyToFixedAndParseFloat(e, t)
                        },
                        _getNumDigitsAfterDecimalPlace: function(e) {
                            var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
                            return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
                        },
                        _applyToFixedAndParseFloat: function(e, t) {
                            var n = e.toFixed(t);
                            return parseFloat(n)
                        },
                        _getPercentage: function(e) {
                            !this.touchCapable || "touchstart" !== e.type && "touchmove" !== e.type || (e = e.touches[0]);
                            var t = e[this.mousePos],
                                n = this.offset[this.stylePos],
                                a = t - n,
                                i = a / this.size * 100;
                            return i = Math.round(i / this.percentage[2]) * this.percentage[2], Math.max(0, Math.min(100, i))
                        },
                        _validateInputValue: function(e) {
                            if ("number" == typeof e) return e;
                            if (Array.isArray(e)) return this._validateArray(e), e;
                            throw new Error(a.formatInvalidInputErrorMsg(e))
                        },
                        _validateArray: function(e) {
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t];
                                if ("number" != typeof n) throw new Error(a.formatInvalidInputErrorMsg(n))
                            }
                        },
                        _setDataVal: function(e) {
                            var t = "value: '" + e + "'";
                            this.element.setAttribute("data", t), this.element.setAttribute("value", e), this.element.value = e
                        },
                        _trigger: function(t, n) {
                            n = n || 0 === n ? n : void 0;
                            var a = this.eventToCallbackMap[t];
                            if (a && a.length)
                                for (var i = 0; i < a.length; i++) {
                                    var o = a[i];
                                    o(n)
                                }
                            e && this._triggerJQueryEvent(t, n)
                        },
                        _triggerJQueryEvent: function(e, t) {
                            var n = {
                                type: e,
                                value: t
                            };
                            this.$element.trigger(n), this.$sliderElem.trigger(n)
                        },
                        _unbindJQueryEventHandlers: function() {
                            this.$element.off(), this.$sliderElem.off()
                        },
                        _setText: function(e, t) {
                            "undefined" != typeof e.innerText ? e.innerText = t : "undefined" != typeof e.textContent && (e.textContent = t)
                        },
                        _removeClass: function(e, t) {
                            for (var n = t.split(" "), a = e.className, i = 0; i < n.length; i++) {
                                var o = n[i],
                                    s = new RegExp("(?:\\s|^)" + o + "(?:\\s|$)");
                                a = a.replace(s, " ")
                            }
                            e.className = a.trim()
                        },
                        _addClass: function(e, t) {
                            for (var n = t.split(" "), a = e.className, i = 0; i < n.length; i++) {
                                var o = n[i],
                                    s = new RegExp("(?:\\s|^)" + o + "(?:\\s|$)"),
                                    r = s.test(a);
                                r || (a += " " + o)
                            }
                            e.className = a.trim()
                        },
                        _offsetLeft: function(e) {
                            for (var t = e.offsetLeft;
                                (e = e.offsetParent) && !isNaN(e.offsetLeft);) t += e.offsetLeft;
                            return t
                        },
                        _offsetTop: function(e) {
                            for (var t = e.offsetTop;
                                (e = e.offsetParent) && !isNaN(e.offsetTop);) t += e.offsetTop;
                            return t
                        },
                        _offset: function(e) {
                            return {
                                left: this._offsetLeft(e),
                                top: this._offsetTop(e)
                            }
                        },
                        _css: function(t, n, a) {
                            if (e) e.style(t, n, a);
                            else {
                                var i = n.replace(/^-ms-/, "ms-").replace(/-([\da-z])/gi, function(e, t) {
                                    return t.toUpperCase()
                                });
                                t.style[i] = a
                            }
                        },
                        _toValue: function(e) {
                            return this.options.scale.toValue.apply(this, [e])
                        },
                        _toPercentage: function(e) {
                            return this.options.scale.toPercentage.apply(this, [e])
                        }
                    }, e) {
                    var o = e.fn.slider ? "bootstrapSlider" : "slider";
                    e.bridget(o, t)
                }
            }(e), t
    }), define("site/clipper", ["underscore", "jquery", "videojs", "helpers/secondsToHms", "bootstrap-slider"], function(e, t, n, a) {
        function i(e) {
            var n = e.attr("data-url"),
                a = e.attr("data-video");
            a ? t.getJSON("/api/video/" + a).done(function(t) {
                e.empty(), e.attr("data-url", t.video.full_url), o(e, {
                    user_id: t.video.user_id,
                    stream: t.video.complete_url
                })
            }).fail(function() {}) : n && t.getJSON("/api/grab/preview", {
                url: n
            }).done(function(t) {
                t.stream && (e.empty(), o(e, t))
            }).fail(function() {})
        }

        function o(e, a) {
            var i = t("<video loop>");
            i.attr("src", a.stream).attr("id", "clipper-video").attr("class", "video-js vjs-default-skin").prop("controls", !1).prop("muted", !0).prop("autoplay", !0).prop("preload", "auto"), e.append(i), n("clipper-video").one("loadedmetadata", function() {
                s(e, this, a)
            })
        }

        function s(n, i, o) {
            function s() {
                var e = m.width(),
                    t = i.currentTime();
                (u > t || t > p) && (t = u);
                var n = 1e3 * t / c / 10,
                    a = n * e / 100 - 5;
                v.css("left", a + "px")
            }

            function r() {
                var e = n.find(".errors");
                h > d ? e.length || (f.prop("disabled", !0), e = t('<div class="errors"><span class="alert alert-warning">Please make your clip shorter than 10 minutes.</span></div>').appendTo(n)) : e.length && (e.remove(), f.prop("disabled", !1))
            }
            var l = t('<input type="slider">');
            n.append(l);
            var c = i.duration(),
                u = 0,
                p = Math.min(60, c),
                h = p - u;
            l.slider({
                min: 0,
                max: i.duration(),
                range: !0,
                step: .1,
                value: [u, p],
                tooltip_split: !0,
                formatter: function(t) {
                    return e.isArray(t) ? [a(t[0]), a(t[1])] : a(t)
                }
            });
            var m = n.find(".slider-track"),
                v = t('<span class="caret">');
            m.append(v), l.on("change", function(e) {
                var t = i.currentTime();
                u = e.value.newValue[0], p = e.value.newValue[1], h = p - u, (u > t || t > p) && i.currentTime(u), s(), r()
            }), setInterval(s, 10), i.on("timeupdate", function() {
                {
                    var e = i.currentTime();
                    Math.round(1e3 * e / c) / 10
                }(u > e || e > p) && i.currentTime(u)
            }), n.append('<div class="options"><button class="btn">Make clip</button></div>');
            var f = n.find("button");
            if (f.on("click", function() {
                    f.prop("disabled", !0).addClass("disabled");
                    var e = "/api/grab",
                        a = {
                            url: n.attr("data-url"),
                            start: u,
                            end: p
                        };
                    g && g.prop("checked") && (e = "/api/video/" + n.attr("data-video") + "/clip", delete a.url), t.ajax({
                        type: "POST",
                        url: e,
                        data: a
                    }).done(function(e) {
                        window.location.href = e.video.full_url
                    }).fail(function() {
                        f.prop("disabled", !1).removeClass("disabled")
                    });
                    try {
                        mixpanel.track("Make clip button clicked on the clipper page", {
                            "Source URL": n.attr("data-url")
                        })
                    } catch (i) {}
                }), window.Viewer && Viewer.user_id == o.user_id || "true" === n.attr("data-device")) {
                var g = t('<label class="keep-url"><input type="checkbox">Keep the same video link (URL)</label>').appendTo(n).find("input");
                (window.location.href + "").match(/replace/) && g.prop("checked", !0).parent().hide()
            }
        }

        function r(e) {
            t(e.target);
            mixpanel.track("Make clip button clicked on the video page", {
                "Video URL": window.location + ""
            })
        }

        function l() {
            var e = t(".js-clipper");
            e.length && i(e);
            var n = t(document);
            n.on("click", "#video_view .video_actions_clip a", r)
        }
        var d = 600;
        t(l)
    }), define("hbs!views/forgot-password", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="modal" id="forgot-password-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Reset password</h4>\n      </div>\n      <form role="form" class="forgot-password-form" action="/api/forgot">\n        <div class="modal-body">\n          <div class="alert alert-warning in hide">\n            <div>\n              <strong>Holy guacamole!</strong> Best check yo self, you\'re not looking too good.\n            </div>\n          </div>\n          <div class="alert alert-success in hide">\n            We&#039;ve sent you an email with a link.\n            Please click that link to reset your password.\n          </div>\n          <div class="form-group">\n            <label for="signupInputUsername">Email address</label>\n            <input type="text" name="usernameOrEmail" class="form-control" autocapitalize="off" id="forgotPasswordUsernameOrEmail" placeholder="Enter your email here">\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">Submit <i class="fa fa-spinner fa-spin hide"></i></button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/forgot-password", n), n
    }), define("site/forgot", ["jquery", "hbs!views/forgot-password"], function(e, t) {
        "use strict";

        function n() {
            return e("#forgot-password-modal").length <= 0 && e("body").append(t()), e("#forgot-password-modal")
        }

        function a(t) {
            t && t.preventDefault(), e("#sign-in-modal").one("hidden.bs.modal", function() {
                setTimeout(function() {
                    n().modal("show")
                }, 100)
            }).modal("hide")
        }

        function i(t) {
            t && t.preventDefault(), e("#forgot-password-modal .alert").addClass("hide");
            try {
                e.ajax({
                    type: "POST",
                    url: "/api/user/forgot",
                    dataType: "json",
                    data: {
                        usernameOrEmail: e(t.target).find("#forgotPasswordUsernameOrEmail").val().trim()
                    },
                    success: s,
                    error: r
                })
            } catch (n) {
                (console.error || console.log)(n)
            }
        }

        function o(t) {
            setTimeout(function() {
                e(t.target).find("#forgotPasswordUsernameOrEmail")[0].focus()
            }, 10)
        }

        function s(t) {
            t.status ? (e("#forgot-password-modal .alert-success").removeClass("hide"), e("#forgot-password-modal").find(".modal-footer, .form-group").remove(), e("#forgot-password-modal").on("hidden.bs.modal", function() {
                e("#forgot-password-modal").remove()
            })) : r({
                responseJSON: {
                    error: t.error
                }
            })
        }

        function r(t) {
            var n = t.responseJSON && t.responseJSON.error || "An unknown error has occurred.";
            e("#forgot-password-modal .alert-warning").removeClass("hide"), e("#forgot-password-modal .alert-warning div").html("<strong>Oops!</strong> " + n), e("#forgot-password-modal").scrollTop(0)
        }
        return e(function() {
            var t = e(document);
            t.on("shown.bs.modal", "#forgot-password-modal", o), t.on("click", ".forgot-password-link", a), t.on("submit", ".forgot-password-form", i)
        }), {
            show: a
        }
    }), define("site/moderate", ["jquery"], function(e) {
        "use strict";

        function t(t) {
            t.preventDefault();
            var n = e(t.target),
                a = n.attr("data-user-id"),
                i = n.attr("data-remove");
            confirm("Are you sure you want to ban this user?") && e.post("/api/user/" + a + "/ban").success(function() {
                var e = "Banned";
                n.html(e), n.prop("disable", !0), n.addClass("disabled"), i && i.length ? n.parents(i).remove() : window.location.reload()
            }).error(function() {
                alert("Whoops! Something went wrong.")
            })
        }

        function n(t) {
            t.preventDefault();
            var n = e(t.target),
                a = n.attr("data-video-id"),
                i = n.attr("data-remove");
            confirm("Are you sure you want to ban this video?") && e.post("/api/video/" + a + "/ban").success(function() {
                var e = "Banned";
                n.html(e), n.prop("disable", !0), n.addClass("disabled"), i && i.length ? n.parents(i).remove() : window.location.reload()
            }).error(function() {
                alert("Whoops! Something went wrong.")
            })
        }

        function a(t) {
            var n = e(t.target),
                a = n.attr("data-video"),
                i = n.attr("data-remove"),
                o = e.ajax({
                    url: "/api/video/" + a + "/remove-channel",
                    type: "POST",
                    dataType: "json"
                });
            o.success(function() {
                i && i.length ? n.parents(i).remove() : window.location.reload()
            })
        }

        function i(t) {
            var n = e(t.target),
                a = n.attr("data-video"),
                i = n.attr("data-remove"),
                o = n.attr("data-action"),
                s = n.attr("data-suspend-all");
            if (confirm("Are you sure you want to suspend this video?")) {
                var r = e.ajax({
                    url: "/api/video/" + a + "/edit",
                    type: "POST",
                    dataType: "json",
                    data: {
                        suspended: "video/suspend" === o ? 1 : 0,
                        suspendall: s
                    }
                });
                r.success(function() {
                    i && i.length ? n.parents(i).remove() : (n.remove(), window.location.reload())
                })
            }
        }

        function o(t) {
            if (confirm("Are you sure you want to delete this user?")) {
                var n = e(t.target),
                    a = parseInt(n.attr("data-user"));
                e.ajax({
                    url: "/api/user/" + a + "/delete",
                    type: "POST",
                    success: function() {
                        window.location.href = "/"
                    },
                    error: function() {
                        alert("Whoops! Something went wrong!")
                    }
                })
            }
        }

        function s(t) {
            if (confirm("Are you sure you want to disable this user?")) {
                var n = e(t.target),
                    a = parseInt(n.attr("data-user"));
                e.ajax({
                    url: "/api/user/" + a + "/disable",
                    type: "POST",
                    success: function() {
                        window.location.href = "/"
                    },
                    error: function() {
                        alert("Whoops! Something went wrong!")
                    }
                })
            }
        }

        function r() {
            var r = e(document);
            r.on("click", ".js-user-ban", t), r.on("click", ".js-video-ban", n), r.on("click", ".js-video-remove-channel", a), r.on("click", ".js-video-suspend", i), r.on("click", ".js-user-delete", o), r.on("click", ".js-user-disable", s)
        }
        e(r)
    }), define("site/oauth", ["jquery", "hbs!views/basic-modal", "sign-in"], function(e, t, n) {
        "use strict";

        function a(n) {
            e(t({
                title: "Whoops!",
                level: "warning",
                message: n || "Something went wrong! Please try again later."
            })).modal("show")
        }

        function i(e) {
            return {
                client_id: e.attr("data-client-id"),
                response_type: e.attr("data-response-type"),
                redirect_uri: e.attr("data-redirect-uri"),
                scope: e.attr("data-scope")
            }
        }

        function o(e, t) {
            var n = e.redirect_uri,
                a = -1 === n.indexOf("?") ? "?" : "&";
            n += "allow" === t.authorization ? "token" === t.response_type ? "#access_token=" + encodeURIComponent(t.access_token) : a + "code=" + encodeURIComponent(t.code) : "token" === t.response_type ? "#error=denied" : "?error=denied", setTimeout(function() {
                window.location = n
            }, 500)
        }

        function s(t) {
            c || (c = !0, e.ajax({
                url: "/api/oauth/authorize",
                type: "POST",
                dataType: "json",
                data: t,
                success: function(e) {
                    return e.status ? o(t, e) : a(e.error)
                },
                error: function(e) {
                    a(e.responseJSON.error)
                },
                complete: function() {
                    c = !1
                }
            }))
        }

        function r(t) {
            var n = e(t.target),
                a = n.parents(".js-oauth-dialog").first(),
                o = i(a);
            o.authorization = "allow", s(o)
        }

        function l(t) {
            var n = e(t.target),
                a = n.parents(".js-oauth-dialog").first(),
                o = i(a);
            o.authorization = "deny", s(o)
        }

        function d(t) {
            var n = e(t.target),
                a = n.attr("data-client-id");
            e.ajax({
                url: "/api/oauth/revoke",
                type: "POST",
                dataType: "json",
                data: {
                    client_id: a
                },
                complete: function() {
                    window.location.reload()
                }
            })
        }
        var c = !1;
        ! function() {
            var t = e(".js-oauth-dialog");
            if (t && t.length && !("Viewer" in window)) {
                var a = t.find("a");
                a.on("click", function(e) {
                    n.show(), e.preventDefault(), e.stopPropagation()
                }), n.show()
            }
        }(), e(function() {
            var t = e(document);
            t.on("click", ".js-oauth-dialog .js-oauth-allow", r), t.on("click", ".js-oauth-dialog .js-oauth-deny", l), t.on("click", ".js-oauth-revoke", d)
        })
    }), define("hbs!views/report-modal", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            1: function() {
                return '                    <div data-action="report/video">\n                        <p>\n                            Is this video illegal or abusive in some way? If so, please submit this report and we will\n                            review it.\n                        </p>\n                        <div class="form-group video-channel-field">\n                            <select name="reason" id="reason" class="form-control">\n                                <option value="none">Reason</option>\n                                <option value="spam">Spam</option>\n                                <option value="harassment">Harassment</option>\n                                <option value="violence">Promotes violence</option>\n                            </select>\n                        </div>\n                    </div>\n'
            },
            3: function() {
                return '                    <div data-action="unreport/video">\n                        <div class="alert alert-warning">\n                            You\'ve already reported this video as being inappropriate or abusive. Do you want to cancel\n                            your report?\n                        </div>\n                    </div>\n'
            },
            5: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return r((i = null != (i = t.cancel || (null != e ? e.cancel : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "cancel",
                    hash: {},
                    data: a
                }) : i))
            },
            7: function() {
                return "Close"
            },
            9: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '                    <button type="button" class="btn btn-' + r((i = null != (i = t.level || (null != e ? e.level : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "level",
                    hash: {},
                    data: a
                }) : i)) + ' pull-right js-confirm">' + r((i = null != (i = t.confirm || (null != e ? e.confirm : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "confirm",
                    hash: {},
                    data: a
                }) : i)) + "</button>\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o, s = "function",
                    r = t.helperMissing,
                    l = this.escapeExpression,
                    d = '\n<div class="modal video-report-modal">\n    <div class="modal-dialog">\n        <div class="modal-content">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n                <h4 class="modal-title">' + l((o = null != (o = t.title || (null != e ? e.title : e)) ? o : r, typeof o === s ? o.call(e, {
                        name: "title",
                        hash: {},
                        data: a
                    }) : o)) + '</h4>\n            </div>\n            <div class="modal-body">\n                <div class="message">\n';
                return i = t.unless.call(e, null != e ? e.flagged : e, {
                    name: "unless",
                    hash: {},
                    fn: this.program(1, a),
                    inverse: this.program(3, a),
                    data: a
                }), null != i && (d += i), d += '                </div>\n            </div>\n            <div class="modal-footer">\n                <button type="button" class="btn btn-default btn-cancel pull-left" data-dismiss="modal">', i = t["if"].call(e, null != e ? e.cancel : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, a),
                    inverse: this.program(7, a),
                    data: a
                }), null != i && (d += i), d += "</button>\n", i = t["if"].call(e, null != e ? e.confirm : e, {
                    name: "if",
                    hash: {},
                    fn: this.program(9, a),
                    inverse: this.noop,
                    data: a
                }), null != i && (d += i), d + "            </div>\n        </div>\n    </div>\n</div>\n"
            },
            useData: !0
        });
        return t.registerPartial("views/report-modal", n), n
    }), define("site/report", ["jquery", "hbs!views/report-modal"], function(e, t) {
        "use strict";

        function n(t) {
            t.preventDefault();
            var n = e(t.target).attr("data-video"),
                a = e('.video_actions_report a[data-video="' + n + '"]'),
                i = parseInt(a.attr("data-flagged"));
            window.Viewer || (i = 0);
            var o = "/api/video/" + n + "/flag",
                s = {
                    value: i ? 0 : 1
                },
                r = e("#report_video .message > div");
            i || (s.reason = e('[data-action="report/video"] select[name="reason"]').val());
            var l = e.post(o, s);
            l.success(function(t) {
                a.attr("data-flagged", t.flagged ? 1 : 0);
                var n;
                if (t.flagged) {
                    n = ["Thanks! Our team has received your report and we'll", "check this video out as soon as possible."].join(" ");
                    try {
                        mixpanel.track("Video Flagged", {
                            Reason: s.reason
                        })
                    } catch (i) {}
                } else n = "Thanks! Our team has received your report.";
                r.html(n).addClass("alert").removeClass("alert-danger").addClass("alert-warning"), e("#report_video .btn-danger, #report_video .btn-warning").hide()
            }).error(function() {
                r.html("Whoops, something went wrong. Please try again later.").addClass("alert").removeClass("alert-danger").addClass("alert-warning"), e("#report_video .btn-danger, #report_video .btn-warning").hide()
            })
        }

        function a(a) {
            a.preventDefault();
            var i = e(a.target);
            i.is("a") || (i = i.parents("a"));
            var o = parseInt(i.attr("data-video")),
                s = parseInt(i.attr("data-flagged"));
            window.Viewer || (s = 0), e("#report_video").length && e("#report_video").remove();
            var r, l, d;
            s ? (r = "Cancel report", l = "Close", d = "warning") : (r = "Send report", l = "Cancel", d = "danger");
            var c = e(t({
                title: "Report video",
                confirm: r,
                cancel: l,
                flagged: s,
                level: d
            }));
            c.attr("id", "report_video").on("hidden.bs.modal", function() {
                e(this).remove()
            }).on("click", ".js-confirm", n).modal("show"), c.find(".js-confirm").attr("data-video", o)
        }

        function i() {
            var t = e(document);
            t.on("click", ".js-video-report", a)
        }
        e(i)
    }), define("site/share", ["jquery", "phpjs", "lib/ribbon"], function(e, t, n) {
        "use strict";

        function a(e, t, n, a) {
            var i = "undefined" != typeof window.screenLeft ? window.screenLeft : screen.left,
                o = "undefined" != typeof window.screenTop ? window.screenTop : screen.top,
                s = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                r = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                l = s / 2 - n / 2 + i,
                d = r / 2 - a / 2 + o,
                c = window.open(e, t, "scrollbars=yes, width=" + n + ", height=" + a + ", top=" + d + ", left=" + l);
            return window.focus && c.focus(), c
        }

        function i() {
            var n = e("li.share_count"),
                a = parseInt(n.attr("data-share-count")) + 1;
            n.attr("data-share-count", a), n.html('<div class="arrow-left"></div>' + t.number_format(a) + " shares"), e.ajax("/api/video/share", {
                dataType: "json",
                type: "POST",
                data: {
                    video_id: n.attr("data-video-id")
                }
            })
        }

        function o(t) {
            t.preventDefault();
            var n = e(t.target).attr("href").replace(/display=page/, "display=popup");
            a(n, "Share on Facebook", 800, 600)
        }

        function s(t) {
            t.preventDefault();
            var n = e(t.target).attr("href");
            a(n, "Share on Twitter", 800, 600)
        }

        function r(t) {
            t.preventDefault();
            var n = e(t.target).attr("href");
            a(n, "Share on Tumblr", 800, 600)
        }

        function l(t) {
            t.preventDefault();
            var n = e(t.target).attr("href");
            a(n, "Share on Stumbleupon", 800, 600)
        }

        function d(t) {
            t.preventDefault();
            var n = e(t.target).attr("href");
            a(n, "Share on Tackk", 800, 600)
        }

        function c(t) {
            t.preventDefault();
            var n = e(t.target).attr("href") + "&newwindow=1";
            a(n, "Share on Reddit", 800, 600)
        }

        function u(t) {
            function a() {
                t.hide()
            }

            function i() {
                n("Copied!");
                var e = t.parent().find("input");
                mixpanel.track("Quicklink copied", {
                    Label: e.attr("data-label") || "Video link",
                    View: "Desktop",
                    Via: "ZeroClipboard"
                })
            }

            function o() {
                s.on("aftercopy", i)
            }
            var s;
            return 1 === t.length && e("body").hasClass("device-desktop") ? void require(["zeroclipboard"], function(e) {
                s = new e(t[0]), s.on("ready", o), s.on("error", a)
            }) : void a()
        }

        function p(t) {
            t.target.select();
            var n = e(t.target);
            mixpanel.track("Quicklink copied", {
                Label: n.attr("data-label") || "Video link",
                View: "Desktop",
                Via: "Input"
            })
        }

        function h(t) {
            var n = e(t.target),
                a = n.attr("data-id");
            e(".video_link_wrapper").hide(), e("#" + a).toggle(), e(".video_links .active").removeClass("active"), e("#" + a + "_select").addClass("active")
        }

        function m() {
            var t = e(document);
            t.on("click", ".video_actions_share a", i), t.on("click", ".js-share-facebook", o), t.on("click", ".js-share-twitter", s), t.on("click", ".js-share-reddit", c), t.on("click", ".js-share-tumblr", r), t.on("click", ".js-share-stumbleupon", l), t.on("click", ".js-share-tackk", d), t.on("click", ".video_links input", p), t.on("click", ".video_links_pills a", h), e(".js-video-copy-link").each(function(t, n) {
                u(e(n))
            })
        }
        e(m)
    }), define("hbs!views/feed-user", ["hbs", "handlebars", "helpers/userUrl", "helpers/userPhoto", "helpers/userName", "helpers/numberFormat"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<li data-user="' + r((i = null != (i = t.user_id || (null != e ? e.user_id : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "user_id",
                    hash: {},
                    data: a
                }) : i)) + '">\n  <a href="' + r((t.userUrl || e && e.userUrl || s).call(e, e, {
                    name: "userUrl",
                    hash: {},
                    data: a
                })) + '">\n    <span class="user_photo">\n      <img src="' + r((t.userPhoto || e && e.userPhoto || s).call(e, e, "square", {
                    name: "userPhoto",
                    hash: {},
                    data: a
                })) + '" alt="">\n    </span>\n    <div class="inner">\n      <span class="user_username">' + r((t.userName || e && e.userName || s).call(e, e, {
                    name: "userName",
                    hash: {},
                    data: a
                })) + '</span>\n      <span class="user_followers"><i class="fa fa-user"></i>' + r((t.numberFormat || e && e.numberFormat || s).call(e, null != e ? e.follower_count : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + '</span>  \n      <span class="user_views"><i class="fa fa-play-circle"></i>' + r((t.numberFormat || e && e.numberFormat || s).call(e, null != e ? e.video_views : e, {
                    name: "numberFormat",
                    hash: {},
                    data: a
                })) + "</span>  \n    </div>\n  </a>\n</li>"
            },
            useData: !0
        });
        return t.registerPartial("views/feed-user", n), n
    }), define("site/user-feed", ["underscore", "jquery", "loaders", "helpers/userPhoto", "hbs!views/feed-user"], function(e, t, n, a, i) {
        "use strict";

        function o(e, n) {
            var a, i = e.attr("data-type"),
                o = e.attr("data-items-per-page"),
                s = e.attr("data-user"),
                r = e.attr("data-channel"),
                l = e.attr("data-max-date-last-seen"),
                d = (parseInt(e.attr("data-offset")) || 0) + e.find("li[data-user]").length,
                c = e.attr("data-query"),
                u = {
                    limit: o
                };
            if ("followers" === i) a = "/api/user/" + s + "/followers", u.order = "date_last_seen", u.maxDateLastSeen = l;
            else if ("suggest" === i) a = "/api/users/suggest", u.offset = d, u.text = c;
            else if ("channel-followers" === i) a = "/api/channel/" + r + "/followers", u.offset = d;
            else {
                if ("channel-moderators" !== i) return;
                a = "/api/channel/" + r + "/moderators", u.offset = d
            }
            t.ajax(a, {
                data: u,
                dataType: "json",
                success: function(t) {
                    e.data("nextPageData", t), (t.page.total <= 0 || !t.users || !t.users.length) && e.data("eof", !0), n && n(!1, t, e)
                },
                error: function(t) {
                    e.data("nextPageData", !1), n && n(!0, t, e)
                }
            })
        }

        function s(t, n) {
            var a = "";
            e.each(t.users, function(e) {
                try {
                    if (n.find('[data-user="' + e.user_id + '"]').length > 0) return void console.log("Got duplicate user " + e.user_id);
                    a += i(e)
                } catch (t) {
                    try {
                        console.log(t)
                    } catch (t) {}
                }
            }), n.append(a), t.page && (t.page.maxDateLastSeen && n.attr("data-max-date-last-seen", t.page.maxDateLastSeen), t.page.offset && n.attr("data-offset", t.page.offset))
        }

        function r(i) {
            var o = t(i).data("nextPageData");
            if (o && o.users) {
                var s = [];
                e.each(o.users, function(e) {
                    s.push(a(e))
                }), n.loadImages(s)
            }
        }

        function l(e) {
            h || (h = !0, e = t(e), e.data("eof") || (e.data("nextPageData") ? (s(e.data("nextPageData"), e), e.data("nextPageData", !1), e.data("renderWhenLoaded", !1), o(e, function() {
                r(e), h = !1
            })) : (e.data("renderWhenLoaded", !0), o(e, function(e, t, n) {
                e || (n.data("nextPageData", !1), s(t, n)), h = !1
            }))))
        }

        function d() {
            t(".js-user-feed").each(function(e, t) {
                l(t)
            })
        }

        function c() {
            var e = t(window);
            e.on("scrollToBottom", d), h = !0, t(".js-user-feed").each(function(e, n) {
                o(t(n), function() {
                    r(n), h = !1
                })
            })
        }
        var u = window.location + "",
            p = u.replace(/(m|o)=\d+&?/g, "").replace(/[?&]$/, "");
        p += -1 === p.indexOf("?") ? "?" : "&";
        var h;
        t(c)
    }), define("site/watchers", ["jquery", "underscore", "async"], function(e, t, n) {
        "use strict";

        function a(e) {
            var n = [];
            return t.each(e.countries, function(e) {
                var t = e.toLowerCase(); - 1 !== u.indexOf(t) && n.push('<i class="fam-flag fam-flag-' + t + '"></i>')
            }), n.join(" ")
        }

        function i(e) {
            var t = e.data("watchers");
            if (t.countries && t.countries.length && e.attr("data-hover")) {
                var n = "user" === e.attr("data-type") ? "left" : "bottom";
                e.tooltip({
                    container: e,
                    html: !0,
                    title: a(t),
                    trigger: "manual",
                    delay: 0,
                    placement: n,
                    animation: !1
                }).tooltip("show")
            }
        }

        function o(e) {
            e.find(".tooltip").remove()
        }

        function s(t, a) {
            if (!c) {
                c = !0;
                var i = t.attr("data-type"),
                    o = t.attr("data-" + i);
                n.parallel([function(n) {
                    e.getJSON("/api/" + i + "/" + o).done(function(e) {
                        t.data("watchers", e.watchers || null), n()
                    }).fail(function() {
                        t.data("watchers", !1), n(!0)
                    })
                }, function(e) {
                    require(["css!fam-flag-css"], function() {
                        e()
                    })
                }], function(e) {
                    c = !1, e || a(t)
                })
            }
        }

        function r(t) {
            var n = e(t.target);
            n.hasClass("js-video-watchers") || (n = n.parents(".js-video-watchers")), n.attr("data-hover", "over");
            var a = n.data("watchers");
            return "undefined" != typeof a && null !== a ? i(n) : void s(n, i)
        }

        function l(t) {
            var n = e(t.target);
            n.hasClass("js-video-watchers") || (n = n.parents(".js-video-watchers")), n.attr("data-hover", ""), o(n)
        }

        function d() {
            var t = e(document);
            t.on("mouseenter", ".js-video-watchers", r), t.on("mouseleave", ".js-video-watchers", l)
        }
        var c = !1,
            u = ["ad", "ae", "af", "ag", "ai", "al", "am", "an", "ao", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "catalonia", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "cr", "cs", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "eh", "england", "er", "es", "et", "europeanunion", "fam", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "in", "io", "iq", "ir", "is", "it", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "scotland", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "sv", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "um", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wales", "wf", "ws", "ye", "yt", "za", "zm", "zw"];
        e(d)
    }), define("hbs!views/uploader", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, t, n, a) {
                var i, o = "function",
                    s = t.helperMissing,
                    r = this.escapeExpression;
                return '\n<div id="uploader-modal" class="modal">\n  <form method="POST" enctype="multipart/form-data" action="/api/video/upload">\n    <div class="modal-dialog">\n      <div class="modal-content">\n        <div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n          <h4 class="modal-title">Upload</h4>\n        </div>\n        <div class="modal-body">\n            <div class="alert alert-danger hide"></div>\n\n            <!-- choose method -->\n            <div class="step step1">\n                <label for="filedata" class="browse">\n                    <i class="fa fa-file-video-o"></i>\n                    <span>\n                        Choose a video or GIF file\n                    </span>\n                    <input type="file" id="filedata" name="filedata" accept="' + r((i = null != (i = t.fileInputAccept || (null != e ? e.fileInputAccept : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "fileInputAccept",
                    hash: {},
                    data: a
                }) : i)) + '">\n                </label>\n                <div class="grab">\n                    <i class="fa fa-globe"></i>\n                    <input type="text" placeholder="Paste a video or GIF link (URL)" />\n                </div>\n                <div class="drag-and-drop hidden-tablet hidden-phone">  \n                    <i class="fa fa-bullseye"></i>\n                    <span>\n                        Drop a video or GIF file here\n                    </span>\n                </div>\n            </div>\n            \n            <!-- enter video information -->\n            <div class="step step2 hide">\n                <label for="video-title">Video title <span class="light">(optional)</span></label>\n                <div class="form-group">\n                  <input type="text" \n                         class="form-control js-tagger"\n                         id="video-title"\n                         name="title"\n                         placeholder="Untitled"\n                         maxlength="150">\n                </div>\n                <label for="video-description">Video description <span class="light">(optional)</span></label>\n                <div class="form-group">\n                  <textarea id="video-description" \n                            name="description"\n                            maxlength="' + r((i = null != (i = t.maxDescLen || (null != e ? e.maxDescLen : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "maxDescLen",
                    hash: {},
                    data: a
                }) : i)) + '" \n                            class="form-control js-tagger js-mentioner" \n                            rows="4"\n                            style="resize: none;"></textarea>\n                </div>\n                <div class="form-group">\n                  <label class="checkbox video-public">\n                    <input type="checkbox" name="public" id="video-public" checked="checked">\n                    Share on Vidme <span class="light">(optional)</span>\n                  </label>\n                  <div class="public-description"></div>\n                </div>\n\n                <label class="video-channel-label" for="video-channel">Network <span class="light">(optional)</span></label>\n                <div class="form-group video-channel-field">\n                  <input type="text" class="form-control js-channel-suggest">\n                </div>\n                <div>\n                  <span class="light">\n                    Your video must comply with our <a href="/terms-of-use" target="_blank">terms of use</a>.\n                  </span>\n                </div>\n            </div>\n            \n            <!-- progress -->\n            <div class="step step3 hide">\n                <div class="progress progress-striped active">\n                  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">\n                    <span class="sr-only">0% Complete</span>\n                  </div>\n                </div>\n                <div class="progress-bytes">\n                  <span class="completed-bytes"></span>\n                  of\n                  <span class="total-bytes"></span>\n                </div>\n                <div class="progress-filename"></div>\n                <div class="spinner hide">\n                    <img src="' + r((i = null != (i = t.loadingImageSrc || (null != e ? e.loadingImageSrc : e)) ? i : s, typeof i === o ? i.call(e, {
                    name: "loadingImageSrc",
                    hash: {},
                    data: a
                }) : i)) + '">\n                    <span>Uploading your video, this may take a while...</span>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <button type="button" class="btn btn-info grab-preview-button pull-right hide"><i class="fa fa-spinner fa-spin hide"></i> <span class="text">Continue</span></button>\n            <button type="button" class="btn btn-info grab-video-button pull-right hide">Post video</button>\n            <button type="button" class="btn btn-info upload-video-button pull-right hide">Upload video</button>\n            <button type="button" class="btn btn-default btn-cancel pull-left" data-dismiss="modal">Cancel</button>\n        </div>\n      </div>\n    </div>\n    <input type="hidden" name="PLATFORM" value="web" />\n    <input type="hidden" name="source" value="computer" />\n  </form>\n  <div class="drag-and-drop-overlay">\n      <div class="drag-and-drop-overlay-close">\n          &times;\n      </div>\n      <div class="drag-and-drop-overlay-inner">\n          Upload\n      </div>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/uploader", n), n
    }), define("site/uploader", ["underscore", "jquery", "phpjs", "fingerprint", "hbs!views/uploader"], function(e, t, n, a, i) {
        "use strict";

        function o(e, t) {
            var a;
            a = void 0 !== t ? function(e) {
                return n.number_format(e, t)
            } : function(e) {
                return e + ""
            };
            for (var i = 0, o = e; o > 1024;) o /= 1024, i++;
            switch (i) {
                default:
                    case 0:
                    return a(e) + "B";
                case 1:
                        return a(o) + "KB";
                case 2:
                        return a(o) + "MB";
                case 3:
                        return a(o) + "GB";
                case 4:
                        return a(o) + "TB"
            }
        }

        function s(e) {
            function t(e) {
                return e === Math.floor(e) ? n.number_format(e) : n.number_format(e, 1)
            }
            return 1024 >= e ? t(e) + "B" : 1048576 >= e ? t(e / 1024) + "KB" : t(e / 1024 / 1024) + "MB"
        }

        function r(e, t) {
            var n = d();
            switch (n.find(".alert").addClass("hide"), n.find(".grab-preview-button").addClass("hide"), n.find(".grab-video-button").addClass("hide"), n.find(".upload-video-button").addClass("hide"), n.find(".step").addClass("hide"), window.Viewer || n.find(".video-channel-label, .video-channel-field").remove(), e) {
                default:
                    case 1:
                    n.find(".step1").removeClass("hide");
                break;
                case 2:
                        n.find(".step2").removeClass("hide"),
                    "grab" === t ? n.find(".grab-video-button").removeClass("hide") : n.find(".upload-video-button").removeClass("hide");
                    break;
                case 3:
                        n.find(".step3").removeClass("hide")
            }
        }

        function l(e) {
            var n = t("#uploader-modal .step" + e);
            return n.length && !n.hasClass("hide")
        }

        function d() {
            var e = t("#uploader-modal");
            if (!e || !e.length) {
                e = t(i({
                    fileInputAccept: $.join(","),
                    loadingImageSrc: cdn + "/images/loading.gif",
                    maxDescLen: maxDescLen || 500
                })), t("body").append(e), e.on("hide.bs.modal", function(t) {
                    var n = e.data("currentUpload");
                    n && null !== n ? t.preventDefault() : e.data("currentUpload", null)
                }), e.on("hidden.bs.modal", function() {
                    require(["jquery-fileupload"], function() {
                        try {
                            e.find("form").fileupload("destroy")
                        } catch (t) {}
                    }), e.remove()
                });
                var n = {
                    dataType: "json",
                    add: k,
                    done: C,
                    fail: j,
                    progressall: T,
                    maxNumberOfFiles: 1
                };
                f() && (n.maxChunkSize = 1e6, n.maxRetries = 20), g() ? n.dropZone = t(document) : e.find(".drag-and-drop").hide(), m() && m() <= 9 && (n.forceIframeTransport = !0, e.addClass("ie9orless")), require(["jquery-fileupload"], function() {
                    e.find("form").fileupload(n)
                }), b() || require(["jquery-placeholder"], function() {
                    var t = e.find(".step1 .grab :input");
                    t.placeholder()
                })
            }
            return e.find(".alert").addClass("hide"), e
        }

        function c() {
            if ("localStorage" in window) {
                var e = "upload-data-";
                for (var t in localStorage) "string" == typeof t && t.substr(0, e.length) === e && localStorage.removeItem(t)
            }
        }

        function u() {
            var e = t("#uploader-modal");
            return e && e.length ? e : null
        }

        function p(e) {
            try {
                return JSON.parse(localStorage.getItem("upload-data-" + e))
            } catch (t) {
                return !1
            }
        }

        function h(e, n) {
            var a = p(e);
            if (a) {
                var i = "/api/upload/status?upload=" + a.uploadId + "&code=" + a.video.url;
                t.getJSON(i).done(function(e) {
                    n(e)
                }).fail(function() {
                    n()
                })
            } else n()
        }

        function m() {
            function e() {
                var e = window.navigator.userAgent,
                    t = e.indexOf("MSIE "),
                    n = e.indexOf("Trident/");
                if (t > 0) return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
                if (n > 0) {
                    var a = e.indexOf("rv:");
                    return parseInt(e.substring(a + 3, e.indexOf(".", a)), 10)
                }
                return !1
            }
            var t;
            try {
                t = e()
            } catch (n) {
                t = !1
            }
            return t
        }

        function v() {
            var e = navigator.userAgent,
                t = -1 !== e.indexOf("Mozilla/5.0") && -1 !== e.indexOf("Android ") && -1 !== e.indexOf("AppleWebKit") && -1 === e.indexOf("Chrome");
            return t
        }

        function f() {
            var e = v(),
                t = !1;
            return !e && window.Blob && window.XMLHttpRequest && (t = !0), t
        }

        function g() {
            var e = !1;
            return "draggable" in document.createElement("span") && (e = !0), e
        }

        function b() {
            var e = !1;
            return "placeholder" in document.createElement("input") && (e = !0), e
        }

        function w(e) {
            var t = (e + "").split("/");
            if (2 !== t.length) return !0;
            switch (t[0]) {
                case "video":
                    return !0;
                case "image":
                    return "gif" === t[1];
                default:
                    return !1
            }
        }

        function y() {
            return this.each(function(e, n) {
                function a() {
                    i = void 0, o.trigger("draghoverend")
                }
                var i, o = t(n);
                o.on("dragover", function() {
                    i ? (clearTimeout(i), i = void 0) : o.trigger("draghoverstart"), i = setTimeout(a, 500)
                }), o.on("drop", function() {
                    o.trigger("draghoverend"), i && clearTimeout(i)
                })
            })
        }

        function _() {
            return this.each(function(e, n) {
                var a = t(),
                    i = t(n);
                i.on("dragenter", function(e) {
                    0 === a.length && i.trigger("draghoverstart"), a = a.add(e.target)
                }), i.on("dragleave", function(e) {
                    a = a.not(e.target), 0 === a.length && i.trigger("draghoverend")
                }), i.on("drop", function() {
                    a = t(), i.trigger("draghoverend")
                })
            })
        }

        function k(e, n) {
            J = !0;
            var a = this,
                i = d();
            i.data("currentUpload", n);
            try {
                ga("send", "event", "Videos", "uploadStart", "Started uploading video", 1), ga("send", "event", "Videos", "createStart", "Started creating video", 1), mixpanel.track("Video Upload Start", {
                    "Upload Source": "computer"
                })
            } catch (s) {}
            if (!w(n.files[0].type)) return i.modal("show"), i.find(".alert").text("Please select a video or a GIF file.").removeClass("hide"), void i.data("currentUpload", null);
            var l = n.files[0].size;
            if ("maxSize" in window && l > maxSize) return "Viewer" in window ? (i.find(".alert").text("Please select a file smaller than " + o(maxSize)).removeClass("hide"), mixpanel.track("Large Video Rejected", {
                "Signed-In": "True",
                Method: "Upload"
            })) : (i.find(".alert").html('Uploading big videos? <a class="sign-up-link">Create an account</a> to upload videos larger than ' + o(maxSize) + ".").removeClass("hide"), mixpanel.track("Large Video Rejected", {
                "Signed-In": "False",
                Method: "Upload"
            })), void i.data("currentUpload", null);
            try {
                if (n.files[0].name && t("body").hasClass("device-desktop")) {
                    var c = t.trim((n.files[0].name + "").replace(/[_ ]+|\.\w+$/g, " "));
                    if (!c.match(/^trim/) && !c.match(/^[\.\d]+$/) && !c.match(/^VID [ \d]+/)) {
                        var u = i.find('input[name="title"]').val();
                        i.find('input[name="title"]').val(u + (c || ""))
                    }
                }
                n.files[0].name ? i.find(".progress-filename").show().text(n.files[0].name) : i.find(".progress-filename").hide()
            } catch (s) {}
            f() ? h(n.files[0].name, function(t) {
                return t ? x(t, a, e) : void r(2)
            }) : r(2)
        }

        function x(e, n, a) {
            if (f()) {
                var i = d(),
                    o = i.data("currentUpload");
                o.uploadedBytes = e.upload.size_completed;
                var s = i.find("form");
                s.attr("action", "/api/upload/chunk?code=" + e.video.url + "&upload=" + e.upload.upload_id).attr("data-code", e.video.url).attr("data-upload", e.upload.upload_id).attr("data-name", o.files[0].name), t.blueimp.fileupload.prototype.options.add.call(n, a, o), r(3)
            }
        }

        function C(e, t) {
            var n = d();
            n.data("currentUpload", null), c();
            try {
                ga("send", "event", "Videos", "uploadComplete", "Finished uploading video", 1), ga("send", "event", "Videos", "createComplete", "Finished creating video", 1), mixpanel.track("Video Upload Complete", {
                    "Upload Source": "computer"
                })
            } catch (e) {}
            setTimeout(function() {
                window.location.href = "/" + t.result.video.url
            }, 500)
        }

        function j(e, n) {
            function a() {
                h(n.files[0].name, function(t) {
                    t ? (n.uploadedBytes = t.upload.size_completed, n.data = null, n.submit()) : o._trigger("fail", e, n)
                })
            }
            var i = this;
            if (f()) {
                var o = t(this).data("blueimp-fileupload") || t(this).data("fileupload"),
                    s = i.retries || 0;
                if ("abort" !== n.errorThrown && n.uploadedBytes < n.files[0].size && s < o.options.maxRetries) return s += 1, i.retries = s, void window.setTimeout(a, s * o.options.retryTimeout);
                if ("abort" === n.errorThrown) return;
                i.retries = 0
            }
            if ("abort" !== n.errorThrown) {
                var r, l = d();
                r = n.jqXHR.responseJSON && n.jqXHR.responseJSON.error ? n.jqXHR.responseJSON.error : "Oops! That was not supposed to happen... Please try again.", l.find(".alert").text(r).removeClass("hide"), l.data("currentUpload", null)
            }
        }

        function T(e, t) {
            var n = d(),
                a = parseInt(t.loaded / t.total * 100, 10);
            n.find(".spinner").addClass("hide"), n.find(".progress").show(), n.find(".progress .progress-bar").css("width", a + "%").attr("arial-valuenow", a), n.find(".completed-bytes").text(s(t.loaded)), n.find(".total-bytes").text(s(t.total)), n.find(".progress-bytes").show()
        }

        function S(e) {
            if (!e.status) return E({
                responseJSON: e
            });
            try {
                "accessToken" in e && localStorage.setItem("videoAccessToken" + e.video.video_id, JSON.stringify(e.accessToken)), ga("send", "event", "Videos", "grabComplete", "Finished grabbing video", 1), ga("send", "event", "Videos", "createComplete", "Finished creating video", 1), mixpanel.track("Video Grab Complete")
            } catch (t) {}
            setTimeout(function() {
                window.location.href = e.url
            }, 500)
        }

        function E(e) {
            var n = d(),
                a = n.find(".grab-video-button");
            a.prop("disabled", !1);
            var i = "Unexpected error.";
            if (e.responseText) {
                var o = t.parseJSON(e.responseText);
                i = o.error
            }
            n.find(".alert").text(i).removeClass("hide")
        }

        function I(e) {
            var t = e,
                n = d(),
                a = n.find("form");
            if (e.error) return P({
                responseJSON: t
            });
            B && clearTimeout(B), n.data("currentGrab", t);
            var i = t.title || "",
                o = t.description || "";
            i.length > 150 && (i = i.substr(0, 149) + "â€¦"), o.length > (maxDescLen || 500) && (o = o.substr(0, maxDescLen || 500) + "â€¦");
            var s = a.find(':input[name="title"]').val();
            a.find(':input[name="title"]').val(s + i), a.find(':input[name="description"]').val(o), r(2, "grab")
        }

        function P(e) {
            var t, n = d(),
                a = "Unexpected error.";
            e.responseJSON && (a = e.responseJSON.error, t = e.responseJSON.code), "invalid_grab_size" === t ? "Viewer" in window ? (n.find(".alert").text(a).removeClass("hide"), mixpanel.track("Large Video Rejected", {
                "Signed-In": "True",
                Method: "Grab"
            })) : (n.find(".alert").html('Uploading big videos? <a class="sign-up-link">Create an account</a> to upload videos larger than ' + o(maxSize) + ".").removeClass("hide"), mixpanel.track("Large Video Rejected", {
                "Signed-In": "False",
                Method: "Grab"
            })) : n.find(".alert").text(a).removeClass("hide")
        }

        function U(e) {
            var t = d(),
                n = t.find("form"),
                a = t.data("currentUpload"),
                i = a.files[0].name,
                o = e.uploadId,
                s = e.video.url;
            try {
                "accessToken" in e && localStorage.setItem("videoAccessToken" + e.video.video_id, JSON.stringify(e.accessToken)), localStorage.setItem("upload-data-" + i, JSON.stringify(e))
            } catch (l) {}
            n.attr("action", "/api/upload/chunk?code=" + s + "&upload=" + o).attr("data-code", s).attr("data-upload", o).attr("data-name", i), a.submit(), r(3)
        }

        function M(e) {
            e && e.preventDefault();
            var n = d(),
                a = n.find(".grab input"),
                i = t.trim(a.val()),
                o = n.find(".grab-preview-button");
            if (i) {
                -1 === i.indexOf("http") && (i = "http://" + i);
                try {
                    ga("send", "event", "Videos", "grabStart", "Started grabbing video", 1), ga("send", "event", "Videos", "createStart", "Started creating video", 1), mixpanel.track("Video Grab Start")
                } catch (s) {}
                o.prop("disabled", !0), o.find(".text").text("Grabbing video info..."), o.find(".fa-spinner").removeClass("hide"), t.ajax({
                    url: "/api/grab/preview",
                    data: {
                        url: i
                    },
                    dataType: "json",
                    success: I,
                    error: P,
                    complete: function() {
                        o.prop("disabled", !1), o.find(".text").text("Continue"), o.find(".fa-spinner").addClass("hide")
                    }
                })
            }
        }

        function D(n) {
            n && n.preventDefault();
            var i = d(),
                o = i.find("form"),
                s = i.data("currentGrab"),
                r = i.find(".grab-video-button");
            if (s && null !== s) {
                r.prop("disabled", !0);
                var l = {};
                e.each(o.serializeArray(), function(e) {
                    l[e.name] = e.value
                }), l.url = s.url, l["public"] = o.find("[name=public]").prop("checked") ? 1 : 0, l.__vm_fp = a.fp, l["public"] || delete l.channel, t.ajax("/api/grab", {
                    type: "POST",
                    dataType: "json",
                    data: l,
                    success: S,
                    error: E
                })
            }
        }

        function O(e) {
            var n = d(),
                a = t(e.target),
                i = t.trim(a.val()),
                o = n.find(".grab-preview-button");
            return i.length <= 0 ? o.fadeOut() : -1 === i.indexOf(".") && -1 === i.indexOf("/") ? o.fadeOut() : 13 === e.keyCode ? M(e) : (B && clearTimeout(B), void(B = setTimeout(function() {
                B = void 0, o.removeClass("hide"), o.fadeIn(), o.css("display", "inline-block")
            }, 250)))
        }

        function V() {
            var n = d(),
                i = n.find("form"),
                o = n.data("currentUpload");
            if (o)
                if (n.find(".upload-video-button").text("Uploading...").addClass("disabled").show(), f()) {
                    var s = {};
                    e.each(i.serializeArray(), function(e) {
                        s[e.name] = e.value
                    }), s.mode = "chunked", s.filename = o.files[0].name, s.size = o.files[0].size, s["public"] = i.find("[name=public]").prop("checked") ? 1 : 0, s.__vm_fp = a.fp, s["public"] || delete s.channel, t.ajax({
                        url: "/api/video/request",
                        type: "POST",
                        data: s,
                        success: U,
                        error: function() {
                            n.find(".upload-video-button").text("Upload video").removeClass("disabled").show()
                        }
                    })
                } else o.submit(), r(3), n.find(".spinner.hide").removeClass("hide"), n.find(".progress").hide()
        }

        function N() {
            var e = d(),
                n = e.find("form"),
                a = e.data("currentUpload"),
                i = !1,
                o = n.attr("data-upload"),
                s = n.attr("data-code");
            if (a && (a.abort(), e.data("currentUpload", null), i = !0), f()) {
                o && s && t.ajax({
                    url: "/api/upload/cancel",
                    type: "POST",
                    dataType: "json",
                    data: {
                        upload: o,
                        code: s
                    }
                });
                var r = n.attr("data-name");
                localStorage.removeItem("upload-data-" + r)
            }
            if (e.modal("hide"), i && (s || o)) try {
                ga("send", "event", "Videos", "uploadCancel", "Cancelled uploading video mid-upload", 1), ga("send", "event", "Videos", "createCancel", "Cancelled creating video mid-upload", 1), mixpanel.track("Video upload cancelled mid-upload", {
                    "Upload Source": "computer",
                    "Video Code": s,
                    'Upload ID"': o
                })
            } catch (l) {}
        }

        function A(e) {
            var n = t(e.target),
                a = d();
            a.modal("show");
            var i, o = n.attr("data-default-title");
            if (!o && (i = (window.location + "").match(/\/t\/([^?#\/]+)/)) && (o = "#" + i[1] + " "), o && a.find('input[name="title"]').val(o), "undefined" == typeof window.Viewer) {
                var s = parseInt(n.attr("data-channel"));
                !isNaN(s) && s && t.getJSON("/api/channel/" + s, function(e) {
                    a.find(".js-channel-suggest").trigger("suggestSelection", [e.channel.channel_id, e.channel.title])
                })
            }
        }

        function L(e) {
            var t = u();
            if (t) {
                var n = t.data("currentUpload");
                n && null !== n && (e.returnValue = "If you refresh or leave this page, your upload will be cancelled.")
            }
        }

        function R(e) {
            t("body").hasClass("alt-drop-zone") || (e && K.push(e), W && (clearTimeout(W), W = void 0), W = setTimeout(function() {
                if (!(K.length <= 0)) {
                    var e = K[K.length - 1];
                    K = [];
                    var n;
                    "draghoverstart" === e ? (J = !1, n = d(), n.hasClass("in") || (Y = !0, A({
                        target: t(".js-uploader-link").last()
                    })), t(".drag-and-drop").addClass("in"), t(".drag-and-drop > span").text("Drop the file anywhere!"), t("body").addClass("draggin-n-droppin")) : (Y && (n = t("#uploader-modal")).length && !J && (n.modal("hide"), Y = !1), t(".drag-and-drop").removeClass("in"), t(".drag-and-drop > span").text("Drop a video file here"), t("body").removeClass("draggin-n-droppin"))
                }
            }, 100))
        }

        function F() {
            R("draghoverend")
        }

        function q() {
            t("#uploader-modal .video-public > input").is(":checked") ? (t("#uploader-modal .video-channel-label").show(), t("#uploader-modal .video-channel-field").show()) : (t("#uploader-modal .video-channel-label").hide(), t("#uploader-modal .video-channel-field").hide())
        }

        function H(e) {
            e.preventDefault()
        }

        function z() {
            var e = t(document);
            e.on("click", "#uploader-modal .grab-preview-button", M), e.on("click", "#uploader-modal .grab-video-button", D), e.on("click", "#uploader-modal .upload-video-button", V), e.on("click", "#uploader-modal .btn-cancel", N), e.on("click", '#uploader-modal [data-dismiss="modal"]', N), e.on("click", "#uploader-modal .drag-and-drop-overlay", F), e.on("click", "#uploader-modal #video-public", q), e.on("click", ".js-uploader-link", A), e.on("keyup paste touchend change input propertychange", "#uploader-modal .grab input", function(e) {
                setTimeout(function() {
                    O(e)
                }, 10)
            }), e.on("dragover drop", H), window.addEventListener("beforeunload", L), g() && t(window).draghover().on("draghoverstart", function() {
                l(2) || l(3) || R("draghoverstart")
            }).on("draghoverend", function() {
                R("draghoverend")
            })
        }
        var B, $ = ["image/gif", "video/animaflex", "video/x-ms-asf", "video/x-ms-asf-plugin", "video/avi", "video/msvideo", "video/x-msvideo", "video/avs-video", "video/x-dv", "video/dl", "video/x-dl", "video/x-dv", "video/fli", "video/x-fli", "video/x-atomic3d-feature", "video/gl", "video/x-gl", "video/x-isvideo", "video/mpeg", "video/x-motion-jpeg", "video/quicktime", "video/x-sgi-movie", "video/mpeg", "video/x-mpeg", "video/x-mpeq2a", "video/mpeg", "video/x-mpeg", "video/mpeg", "video/x-sgi-movie", "video/quicktime", "video/x-qtc", "video/vnd.rn-realvideo", "video/x-scm", "video/vdo", "video/vivo", "video/vnd.vivo", "video/vivo", "video/vnd.vivo", "video/vosaic", "video/x-amt-demorun", "video/x-amt-showrun", "video/mp4", "video/*", ".3gp", ".avi", ".divx", ".flv", ".gif", ".mov", ".mp4", ".mpeg", ".mpg", ".mts", ".mkv", ".qt", ".ts", ".wmv"];
        t.fn.draghover = m() ? y : _;
        var J, W, K = [],
            Y = !1;
        t(z)
    }), define("hbs!views/user-cover-upload", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div id="user-cover-upload-modal" class="modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n        <h4 class="modal-title">Upload a cover photo</h4>\n      </div>\n      <div class="modal-body">\n        <div class="message hide">\n          <div class="alert alert-danger"></div>\n        </div>\n        \n        <form action="javascript:void(0)" method="POST" enctype="multipart/form-data">\n          <div id="usercoverdropzone" class="cta draganddrop visible-desktop">\n            <span class="choose">\n              Choose a photo\n              <input type="file" name="filedata" accept="image/*">\n            </span>\n            <span class="or">or</span>\n            <span class="drop">\n              drop it here\n            </span>\n          </div>\n          <div class="draganddrop visible-phone visible-tablet">\n            <a class="choose btn btn-info">\n              <i class="fa fa-upload"></i>\n              Choose a photo\n              <input type="file" name="filedata" accept="image/*">\n            </a>\n          </div>\n        </form>\n        \n        <div class="progress progress-striped hide">\n          <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">\n            <span class="sr-only">0% Complete</span>\n          </div>\n        </div>\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default btn-cancel pull-left" data-dismiss="modal">Cancel</button>\n        <button type="button" class="btn btn-danger js-user-cover-photo-remove pull-right">Remove photo</button>\n      </div>\n    </div>\n  </div>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/user-cover-upload", n), n
    }), define("site/user-cover-upload", ["jquery", "hbs!views/user-cover-upload"], function(e, t) {
        "use strict";

        function n() {
            if (e("#user-cover-upload-modal").length <= 0) {
                var n = e(t({}));
                return n.on("show.bs.modal", function() {
                    e("body").addClass("alt-drop-zone")
                }).on("hide.bs.modal", function() {
                    e("body").removeClass("alt-drop-zone")
                }), e("body").append(n), n
            }
            return e("#user-cover-upload-modal")
        }

        function a(e, t) {
            if (!("FileReader" in window)) return void(t && t("FileReader not available"));
            var n = new FileReader;
            n.onload = function() {
                var e = new Image;
                e.onload = function() {
                    t && t(null, {
                        width: e.width,
                        height: e.height
                    })
                }, e.onerror = function(e) {
                    t && t(e)
                }, e.src = n.result
            }, n.readAsDataURL(e)
        }

        function i(t, i) {
            function o() {
                e(".js-user-cover-photo-remove").hide(), s.find("form").attr("action", "/api/user/" + Viewer.user_id + "/cover/update"), s.find(".message").hide(), s.find(".pre-upload").show(), s.find("form").hide(), s.find(".remove-cover-button").hide(), s.find(".modal-title").html("Uploading cover photo..."), i.submit()
            }
            var s = n(),
                r = i.files[0].size;
            return r > 15e6 ? void s.find(".message").removeClass("hide").show().find(".alert").text("The image you selected is too big. Please choose a smaller one.") : void a(i.files[0], function(e, t) {
                null !== e ? o() : t.width < 800 || t.height < 400 ? s.find(".message").removeClass("hide").show().find(".alert").text("Please upload an image that is 800x400 or larger.") : o()
            })
        }

        function o() {
            window.location.reload()
        }

        function s(t, a) {
            var i, o = n();
            i = "undefined" != typeof a.jqXHR.responseText && null !== e.parseJSON(a.jqXHR.responseText) ? e.parseJSON(a.jqXHR.responseText).error : "Oops! That was not supposed to happen... Please try again.", o.find(".message").removeClass("hide").show().find(".alert").text(i), o.find("form").show(), o.find(".progress").hide(), o.find(".progress .progress-bar").css("width", "0%").attr("arial-valuenow", 0), e(".js-user-cover-photo-remove").show()
        }

        function r(e, t) {
            var a = n(),
                i = parseInt(t.loaded / t.total * 100, 10);
            a.find(".progress").removeClass("hide").show(), a.find(".progress .progress-bar").css("width", i + "%").attr("arial-valuenow", i)
        }

        function l(t) {
            var a = "true" === e(t.target).attr("data-has-cover");
            require(["jquery-fileupload"], function() {
                var t = n();
                a ? e(".js-user-cover-photo-remove").show() : e(".js-user-cover-photo-remove").hide(), t.find("form").fileupload({
                    dataType: "json",
                    dropZone: t.find("#usercoverdropzone"),
                    autoUpload: !0,
                    add: i,
                    done: o,
                    fail: s,
                    progressall: r
                }), t.modal("show")
            })
        }

        function d() {
            var t = n();
            t.find(".message").hide(), e.ajax({
                type: "POST",
                url: "/api/user/" + Viewer.user_id + "/cover/remove",
                dataType: "json"
            }).done(function() {
                window.location.reload()
            }).fail(function(e) {
                var n = e.responseJSON && e.responseJSON.error || "An unknown error has occurred.";
                t.find(".message").show().find(".alert").text(n)
            })
        }

        function c() {
            var t = e(document);
            t.on("click", ".js-user-cover-photo-change", l), t.on("click", ".js-user-cover-photo-remove", d)
        }
        e(c)
    }), define("hbs!views/user-delete", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="modal" id="user-delete-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Delete Account</h4>\n      </div>\n      <form role="form" class="user-delete-form" data-action="/api/user/delete">\n        <div class="modal-body">\n          <p>\n            Are you really sure you want to delete your Vidme account?\n          </p>\n          <p>\n            If something isn&#039;t working for you, or there\'s anything we can \n            do to make Vidme better, <a href="/feedback">please tell us</a>. We \n            don\'t want to lose you!\n          </p>\n          <p>\n            If you\'re absolutely sure you want to delete your account, please enter your password below for verification. \n            All your videos will be immediately and irrecoverably deleted once you click the button below.\n          </p>\n          <div class="form-group">\n            <label for="password">Password</label>\n            <input type="password" name="password" class="form-control" \n                   id="password" />\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-danger">\n            Delete account <i class="fa fa-spinner fa-spin hide"></i>\n          </button>\n          <span class="form-alternative">\n            <a data-dismiss="modal">\n              No, do not delete my account!\n            </a>\n          </span>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/user-delete", n), n
    }), define("site/user-delete", ["jquery", "hbs!views/user-delete"], function(e, t) {
        "use strict";

        function n() {
            var n = e("#user-delete-modal");
            return n.length <= 0 && (n = e(t({})), n.one("hidden.bs.modal", function() {
                n.remove()
            }), e("body").append(n)), n
        }

        function a() {
            var t = n();
            t.find(".alert").remove(), t.find(".modal-body").prepend(e("<div>").addClass("alert").addClass("alert-success").attr("style", "font-size: 1.2em;").html("Goodbye &#9785;"));
            try {
                mixpanel.track("User Deleted Account")
            } catch (a) {}
            setTimeout(function() {
                t.modal("hide"), window.location = "/"
            }, 750)
        }

        function i(t, a, i) {
            var o = i;
            t.responseJSON && t.responseJSON.error && (o = t.responseJSON.error);
            var s = n();
            s.find('button[type="submit"]').prop("disabled", !1), s.find('button[type="submit"] > i').addClass("hide"), s.find(".alert").remove(), s.find(".modal-body").prepend(e("<div>").addClass("alert").addClass("alert-warning").text(o))
        }

        function o(t) {
            t.preventDefault();
            var o = n();
            o.find('button[type="submit"]').prop("disabled", !0), o.find('button[type="submit"] > i').removeClass("hide"), setTimeout(function() {
                if (!(e("#user-delete-modal").length <= 0)) {
                    var t = e.ajax({
                        url: "/api/user/" + Viewer.user_id + "/delete",
                        type: "POST",
                        data: {
                            password: o.find('input[type="password"]').val()
                        }
                    });
                    t.done(a), t.fail(i)
                }
            }, 2e3)
        }

        function s(t) {
            var a = e(t.target);
            a.hasClass("js-user-password-link") || (a = a.parent());
            var i = n();
            "true" === a.attr("data-nopass") && (i.find(':input[name="password"]').parent().remove(), i.attr("data-nopass", "true")), i.modal("show")
        }

        function r() {
            var t = e(document);
            t.on("click", ".js-user-delete-link", s), t.on("submit", ".user-delete-form", o)
        }
        e(r)
    }), define("hbs!views/user-password", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function() {
                return '\n<div class="modal" id="user-password-modal">\n  <div class="modal-dialog">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>\n        <h4 class="modal-title">Change password</h4>\n      </div>\n      <form role="form" class="user-password-form" data-action="/api/user/edit">\n        <div class="modal-body">\n          <div class="alert alert-warning in hide">\n            <div>\n              <strong>Holy guacamole!</strong>\n              Best check yo self, you\'re not looking too good.\n            </div>\n          </div>\n          <div class="alert alert-success in hide">\n            Your password has been changed.\n          </div>\n          <div class="form-group">\n            <label for="passwordCurrent">Current Password</label>\n            <input type="password" name="passwordCurrent" class="form-control" \n                   id="passwordCurrent" />\n          </div>\n          <div class="form-group">\n            <label for="password">New Password</label>\n            <input type="password" name="password" class="form-control" \n                   id="password" />\n          </div>\n          <div class="form-group">\n            <label for="passwordConfirm">Confirm Password</label>\n            <input type="password" name="passwordConfirm" class="form-control" \n                   id="passwordConfirm" />\n          </div>\n        </div>\n        <div class="modal-footer">\n          <button type="submit" class="btn btn-success">\n            Save changes <i class="fa fa-spinner fa-spin hide"></i>\n          </button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>'
            },
            useData: !0
        });
        return t.registerPartial("views/user-password", n), n
    }), define("site/user-password", ["jquery", "hbs!views/user-password"], function(e, t) {
        "use strict";

        function n() {
            var n = e("#user-password-modal");
            return n.length <= 0 && (n = e(t({})), n.one("hidden.bs.modal", function() {
                n.remove()
            }), e("body").append(n)), n
        }

        function a(e) {
            if (e.error) return i({
                responseJSON: e
            });
            var t = n();
            t.find(".alert-success").removeClass("hide"), t.find(".form-group").hide(), t.find(".modal-footer").hide()
        }

        function i(e) {
            var t, a = n();
            t = e.responseJSON && e.responseJSON.error ? e.responseJSON.error : "Oops! That was not supposed to happen... Please try again.", a.find(".alert-warning").text(t).removeClass("hide")
        }

        function o(t) {
            t.preventDefault();
            var o = n(),
                s = o.find("form"),
                r = "true" === o.attr("data-nopass");
            o.find(".alert").addClass("hide");
            var l = {},
                d = s.serializeArray();
            for (var c in d) d.hasOwnProperty(c) && (l[d[c].name] = d[c].value);
            return (l.passwordCurrent || r) && l.password && l.passwordConfirm ? l.password !== l.passwordConfirm ? void o.find(".alert-warning").text("Please make sure the new password matches the confirm password field.").removeClass("hide") : void e.ajax({
                type: "POST",
                dataType: "json",
                url: "/api/user/" + Viewer.user_id + "/edit",
                data: l,
                success: a,
                error: i
            }) : void o.find(".alert-warning").text("Please fill in all of the fields.").removeClass("hide")
        }

        function s(t) {
            var a = e(t.target);
            a.hasClass("js-user-password-link") || (a = a.parent());
            var i = n();
            "true" === a.attr("data-nopass") && (i.find(':input[name="passwordCurrent"]').parent().remove(), i.find(".modal-title").text("Create a password"), i.attr("data-nopass", "true")), i.modal("show")
        }

        function r() {
            var t = e(document);
            t.on("click", ".js-user-password-link", s), t.on("click", '.user-password-form button[type="submit"]', o)
        }
        e(r)
    }), define("hbs!views/video-thumbnail-editor", ["hbs", "handlebars"], function(e, t) {
        var n = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e) {
                var t, n = this.lambda,
                    a = this.escapeExpression;
                return '\n<video id="thumbnail-editor-video" loop autoplay muted preload="auto" class="video-js vjs-default-skin">\n    <source type="video/mp4" src="' + a(n(null != (t = null != e ? e.video : e) ? t.complete_url : t, e)) + '">\n</video>\n<input type="slider" class="hide" />\n<div class="options">\n    <a class="btn thumbnail-selector">Select this frame</a>\n    <br /><br />\n    <a class="thumbnail-container btn-upload">\n        Upload an image\n        <input type="file" accept="image/jpeg, image/gif, image/png">\n    </a>\n</div>\n'
            },
            useData: !0
        });
        return t.registerPartial("views/video-thumbnail-editor", n), n
    }), define("site/video-thumbnail-editor", ["underscore", "jquery", "videojs", "helpers/secondsToHms", "hbs!views/video-thumbnail-editor", "bootstrap-slider"], function(e, t, n, a, i) {
        function o(e) {
            var n = e.attr("data-video");
            t.getJSON("/api/video/" + n).done(function(t) {
                e.empty(), s(e, t)
            }).fail(function() {})
        }

        function s(e, t) {
            e.empty().append(i(t)), n("thumbnail-editor-video").one("loadedmetadata", function() {
                r(e, this, t)
            }).one("playing", function() {
                this.pause()
            })
        }

        function r(e, t) {
            {
                var n = e.find('input[type="slider"]'),
                    i = t.duration();
                n.slider({
                    min: 0,
                    max: i,
                    step: .1,
                    formatter: function(e) {
                        return a(e)
                    }
                })
            }
            n.on("change", function(e) {
                t.currentTime(e.value.newValue)
            }), t.on("timeupdate", function() {
                var e = t.currentTime();
                n.slider("setValue", e)
            })
        }

        function l(e) {
            var n = t(e.target),
                a = n.parents(".js-video-thumbnail-edit"),
                i = a.attr("data-video"),
                o = a.find('input[type="slider"]'),
                s = o.val();
            a.find(".options a").addClass("disabled").prop("disabled", !0), t.ajax({
                url: "/api/video/" + i + "/edit",
                type: "POST",
                dataType: "json",
                data: {
                    thumbnail: parseFloat(s)
                },
                success: function(e) {
                    window.location = e.video.full_url + "#ribbon=" + encodeURIComponent("Your new thumbnail has been set for this video."), mixpanel.track("Thumbnail edited", {
                        Source: "frame"
                    })
                },
                error: function() {
                    a.find(".options a").removeClass("disabled").prop("disabled", !1)
                }
            })
        }

        function d(e) {
            if ("FormData" in window && e.target.files.length) {
                var n = t(e.target),
                    a = n.parents(".js-video-thumbnail-edit"),
                    i = a.attr("data-video"),
                    o = new FormData;
                o.append("thumbnail", e.target.files[0]), a.find(".options a").addClass("disabled").prop("disabled", !0), t.ajax({
                    url: "/api/video/" + i + "/edit",
                    type: "POST",
                    dataType: "json",
                    data: o,
                    cache: !1,
                    processData: !1,
                    contentType: !1,
                    success: function(e) {
                        window.location = e.video.full_url + "#ribbon=" + encodeURIComponent("Your new thumbnail has been set for this video."), mixpanel.track("Thumbnail edited", {
                            Source: "upload"
                        })
                    },
                    error: function() {
                        a.find(".options a").removeClass("disabled").prop("disabled", !1)
                    }
                })
            }
        }

        function c() {
            var e = t(".js-video-thumbnail-edit");
            e.length && o(e);
            var n = t(document);
            n.on("click", ".js-video-thumbnail-edit a.thumbnail-selector", l), n.on("change", '.js-video-thumbnail-edit input[type="file"]', d)
        }
        t(c)
    }), require(["jquery", "bootstrap", "fingerprint", "lib/jquery.auto-link", "lib/jquery.auto-mention", "lib/jquery.auto-tag", "feed", "home", "player", "settings", "sign-in", "sign-up", "follow", "avatar", "comments", "embed", "video-edit", "search", "tag", "mention", "vote", "suggest-channel", "site/albums", "site/application-create", "site/channel-follow", "site/clipper", "site/forgot", "site/moderate", "site/oauth", "site/report", "site/share", "site/user-feed", "site/watchers", "site/uploader", "site/user-cover-upload", "site/user-delete", "site/user-password", "site/video-menu", "site/video-thumbnail-editor"], function(e) {
        "use strict";

        function t() {
            e("#bs-example-navbar-collapse-1").hasClass("in") && e(window).width() > 768 && e(".navbar-toggle").trigger("click")
        }

        function n() {
            if (!window.scrollEventPause) {
                var t = -200,
                    n = window.innerHeight ? window.innerHeight : e(window).height(),
                    a = n + e(window).scrollTop(),
                    i = e(document).height() + t;
                i > a || e(window).trigger("scrollToBottom")
            }
        }

        function a(t) {
            27 === t.keyCode && e(".modal-open .modal").each(function(t, n) {
                e(n).modal("hide")
            })
        }

        function i(t) {
            var n = e(".modal.in");
            if (n.length && n[0] !== t.target) {
                t && t.preventDefault();
                var a = e(t.target);
                n.one("hidden.bs.modal", function() {
                    a.modal("show")
                }).modal("hide")
            }
        }

        function o() {
            var t = e(window).scrollTop();
            if(e(".header").attr("id")!="opaque"){
             t > 100 ? e(".header").addClass("opaque") : e(".header").removeClass("opaque")

            }
        }

        function s() {
            return "ontouchstart" in window ? !0 : "undefined" != typeof window.DocumentTouch && document instanceof window.DocumentTouch ? !0 : !1
        }

        function r(t) {
            if (!("localhost:3000" == window.location.hostname && Math.round(100 * Math.random()) > 10)) {
                var n = e(t.target);
                mixpanel.track("App install button on video page clicked (10%)", {
                    position: n.attr("data-position"),
                    label: n.attr("data-label")
                })
            }
        }

        function l() {
            window.Viewer && e.getJSON("/api/notifications/unread").done(function(t) {
                var n = parseInt(t.unreadCount);
                n && e(".label-notifications").each(function(t, a) {
                    e(a).text(n).removeClass("hide")
                })
            })
        }

        function d() {
            var d = e(document);
            d.on("keydown", ".modal-open", a), d.on("show.bs.modal", i), d.on("contextmenu", ".disable-context-menu video", function(e) {
                e.preventDefault()
            }), d.on("click", ".video_apps a", r);
            var c = e(window);
            c.on("resize", t), c.on("scroll", n), e(".pg-index .header, .pg-user-view .header, .pg-channel .header").length && (o(), e(window).on("scroll", o)), "#_=_" === window.location.hash && window.history && window.history.replaceState && window.history.replaceState("", "", (window.location + "").replace(/#.+$/, "")), "#close" === window.location.hash && window.close(), s() === !1 && e(function() {
                e('[data-toggle="tooltip"]').tooltip()
            }), e(".auto-mention, .auto-tag, .auto-link").each(function(t, n) {
                n = e(n), n.hasClass("auto-link") && n.autoLink(), n.hasClass("auto-mention") && n.autoMention(), n.hasClass("auto-tag") && n.autoTag()
            }), l()
        }
        e(d)
    }), define("boot", function() {}), define("css!main-css", [], function() {}), define("css!bootstrap-slider-css", [], function() {});
//# sourceMappingURL=build-main.js
//# sourceMappingURL=build-main.js.map