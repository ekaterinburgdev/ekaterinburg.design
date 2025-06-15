var EasyAutocomplete = function(t) {
    return t.main = function(e, n) {
        var i,
            a = new t.Constants,
            o = new t.Configuration(n),
            r = new t.Logger,
            s = new t.Template(n.template),
            c = new t.ListBuilderService(o, t.proccess),
            u = o.equals,
            l = e,
            f = "",
            d = [],
            g = -1;
        function m() {
            var t;
            function e(t, e) {
                return o.get("highlightPhrase") && "" !== e ? function(t, e) {
                    var n = (i = e, i.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"));
                    var i;
                    return (t + "").replace(new RegExp("(" + n + ")", "gi"), "<b>$1</b>")
                }(t, e) : t
            }
            l.parent().hasClass(a.getValue("WRAPPER_CSS_CLASS")) && (l.next("." + a.getValue("CONTAINER_CLASS")).remove(), l.unwrap()), function() {
                var t = $("<div>"),
                    e = a.getValue("WRAPPER_CSS_CLASS");
                o.get("theme") && "" !== o.get("theme") && (e += " eac-" + o.get("theme"));
                o.get("cssClasses") && "" !== o.get("cssClasses") && (e += " " + o.get("cssClasses"));
                "" !== s.getTemplateClass() && (e += " " + s.getTemplateClass());
                t.addClass(e), l.wrap(t)
            }(), (t = $("<div>").addClass(a.getValue("CONTAINER_CLASS"))).attr("id", p()).prepend($("<ul>")), t.on("show.eac", function() {
                if (l.is(":focus")) {
                    switch (o.get("list").showAnimation.type) {
                    case "slide":
                        var e = o.get("list").showAnimation.time,
                            n = o.get("list").showAnimation.callback;
                        t.find("ul").slideDown(e, n);
                        break;
                    case "fade":
                        var e = o.get("list").showAnimation.time,
                            n = o.get("list").showAnimation.callback;
                        t.find("ul").fadeIn(e);
                        break;
                    default:
                        t.find("ul").show()
                    }
                    o.get("list").onShowListEvent()
                }
            }).on("hide.eac", function() {
                switch (o.get("list").hideAnimation.type) {
                case "slide":
                    var e = o.get("list").hideAnimation.time,
                        n = o.get("list").hideAnimation.callback;
                    t.find("ul").slideUp(e, n);
                    break;
                case "fade":
                    var e = o.get("list").hideAnimation.time,
                        n = o.get("list").hideAnimation.callback;
                    t.find("ul").fadeOut(e, n);
                    break;
                default:
                    t.find("ul").hide()
                }
                o.get("list").onHideListEvent()
            }).on("selectElement.eac", function() {
                t.find("ul li").removeClass("selected"), t.find("ul li").eq(g).addClass("selected"), o.get("list").onSelectItemEvent()
            }).on("loadElements.eac", function(n, i, a) {
                var r = "",
                    c = t.find("ul");
                c.empty().detach(), d = [];
                for (var u = 0, f = 0, m = i.length; f < m; f += 1) {
                    var p = i[f].data;
                    if (0 !== p.length) {
                        void 0 !== i[f].header && i[f].header.length > 0 && c.append("<div class='eac-category' >" + i[f].header + "</div>");
                        for (var h = 0, v = p.length; h < v && u < i[f].maxListSize; h += 1)
                            r = $("<li><div class='eac-item'></div></li>"), function() {
                                var t = h,
                                    n = u,
                                    c = i[f].getValue(p[t]);
                                r.find(" > div").on("click", function() {
                                    l.val(c).trigger("change"), g = n, y(n), o.get("list").onClickEvent(), o.get("list").onChooseEvent()
                                }).mouseover(function() {
                                    g = n, y(n), o.get("list").onMouseOverEvent()
                                }).mouseout(function() {
                                    o.get("list").onMouseOutEvent()
                                }).html(s.build(e(c, a), p[t]))
                            }(), c.append(r), d.push(p[h]), u += 1
                    }
                }
                t.append(c), o.get("list").onLoadEvent()
            }), l.after(t), f = $("#" + p()), o.get("placeholder") && l.attr("placeholder", o.get("placeholder"))
        }
        function p() {
            var t = l.attr("id");
            return t = a.getValue("CONTAINER_ID") + t
        }
        function h() {
            f.trigger("show.eac")
        }
        function v() {
            f.trigger("hide.eac")
        }
        function y(t) {
            f.trigger("selectElement.eac", t)
        }
        function E(t, e) {
            f.trigger("loadElements.eac", [t, e])
        }
        t.consts = a, this.getConstants = function() {
            return a
        }, this.getConfiguration = function() {
            return o
        }, this.getContainer = function() {
            return f
        }, this.getSelectedItemIndex = function() {
            return g
        }, this.getItems = function() {
            return d
        }, this.getItemData = function(t) {
            return d.length < t || void 0 === d[t] ? -1 : d[t]
        }, this.getSelectedItemData = function() {
            return this.getItemData(g)
        }, this.build = function() {
            m()
        }, this.init = function() {
            !function() {
                if (0 === l.length)
                    return void r.error("Input field doesn't exist.");
                if (!o.checkDataUrlProperties())
                    return void r.error("One of options variables 'data' or 'url' must be defined.");
                if (!o.checkRequiredProperties())
                    return void r.error("Will not work without mentioned properties.");
                m(), function() {
                    function t() {
                        l.off("keyup").keyup(function(t) {
                            switch (t.keyCode) {
                            case 27:
                                v(), l.trigger("blur");
                                break;
                            case 38:
                                t.preventDefault(), d.length > 0 && g > 0 && (g -= 1, l.val(o.get("getValue")(d[g])), y(g));
                                break;
                            case 40:
                                t.preventDefault(), d.length > 0 && g < d.length - 1 && (g += 1, l.val(o.get("getValue")(d[g])), y(g));
                                break;
                            default:
                                if (t.keyCode > 40 || 8 === t.keyCode || 0 === t.keyCode) {
                                    var e = l.val();
                                    !0 !== o.get("list").hideOnEmptyPhrase || 8 !== t.keyCode || "" !== e ? o.get("requestDelay") > 0 ? (void 0 !== i && clearTimeout(i), i = setTimeout(function() {
                                        n(e)
                                    }, o.get("requestDelay"))) : n(e) : v()
                                }
                            }
                            function n(t) {
                                if (!(t.length < o.get("minCharNumber"))) {
                                    if ("list-required" !== o.get("data")) {
                                        var e = o.get("data"),
                                            n = c.init(e);
                                        n = c.updateCategories(n, e), E(n = c.processData(n, t), t), l.parent().find("li").length > 0 ? h() : v()
                                    }
                                    var i = function() {
                                        var t = {},
                                            e = o.get("ajaxSettings") || {};
                                        for (var n in e)
                                            t[n] = e[n];
                                        return t
                                    }();
                                    void 0 !== i.url && "" !== i.url || (i.url = o.get("url")), void 0 !== i.dataType && "" !== i.dataType || (i.dataType = o.get("dataType")), void 0 !== i.url && "list-required" !== i.url && (i.url = i.url(t), i.data = o.get("preparePostData")(i.data, t), $.ajax(i).done(function(e) {
                                        var n = c.init(e);
                                        n = c.updateCategories(n, e), n = c.convertXml(n), function(t, e) {
                                            return !1 === o.get("matchResponseProperty") || ("string" == typeof o.get("matchResponseProperty") ? e[o.get("matchResponseProperty")] === t : "function" != typeof o.get("matchResponseProperty") || o.get("matchResponseProperty")(e) === t)
                                        }(t, e) && E(n = c.processData(n, t), t), c.checkIfDataExists(n) && l.parent().find("li").length > 0 ? h() : v(), o.get("ajaxCallback")()
                                    }).fail(function() {
                                        r.warning("Fail to load response data")
                                    }).always(function() {}))
                                }
                            }
                        })
                    }
                    !function() {
                        u("autocompleteOff", !0) && l.attr("autocomplete", "off");
                        l.focusout(function() {
                            var t,
                                e = l.val();
                            o.get("list").match.caseSensitive || (e = e.toLowerCase());
                            for (var n = 0, i = d.length; n < i; n += 1)
                                if (t = o.get("getValue")(d[n]), o.get("list").match.caseSensitive || (t = t.toLowerCase()), t === e)
                                    return void y(g = n)
                        }), t(), l.on("keydown", function(t) {
                            var e = (t = t || window.event).keyCode;
                            if (38 === e)
                                return suppressKeypress = !0, !1
                        }).keydown(function(t) {
                            13 === t.keyCode && g > -1 && (l.val(o.get("getValue")(d[g])), o.get("list").onKeyEnterEvent(), o.get("list").onChooseEvent(), g = -1, v(), t.preventDefault())
                        }), l.off("keypress"), l.focus(function() {
                            "" !== l.val() && d.length > 0 && (g = -1, h())
                        }), l.blur(function() {
                            setTimeout(function() {
                                g = -1, v()
                            }, 250)
                        })
                    }()
                }()
            }()
        }
    }, t.eacHandles = [], t.getHandle = function(e) {
        return t.eacHandles[e]
    }, t.inputHasId = function(t) {
        return void 0 !== $(t).attr("id") && $(t).attr("id").length > 0
    }, t.assignRandomId = function(e) {
        var n = "";
        do {
            n = "eac-" + Math.floor(1e4 * Math.random())
        } while (0 !== $("#" + n).length);
        elementId = t.consts.getValue("CONTAINER_ID") + n, $(e).attr("id", n)
    }, t.setHandle = function(e, n) {
        t.eacHandles[n] = e
    }, t
}((EasyAutocomplete = function(t) {
    return t.Template = function(t) {
        var e = {
            basic: {
                type: "basic",
                method: function(t) {
                    return t
                },
                cssClass: ""
            },
            description: {
                type: "description",
                fields: {
                    description: "description"
                },
                method: function(t) {
                    return t + " - description"
                },
                cssClass: "eac-description"
            },
            iconLeft: {
                type: "iconLeft",
                fields: {
                    icon: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: "eac-icon-left"
            },
            iconRight: {
                type: "iconRight",
                fields: {
                    iconSrc: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: "eac-icon-right"
            },
            links: {
                type: "links",
                fields: {
                    link: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: ""
            },
            custom: {
                type: "custom",
                method: function() {},
                cssClass: ""
            }
        };
        this.getTemplateClass = function(t) {
            var n,
                i = function() {
                    return ""
                };
            return t && t.type && t.type && e[t.type] ? (n = e[t.type].cssClass, function() {
                return n
            }) : i
        }(t), this.build = function(t) {
            return t && t.type && t.type && e[t.type] ? (a = (n = t).fields, "description" === n.type ? (i = e.description.method, "string" == typeof a.description ? i = function(t, e) {
                return t + " - <span>" + e[a.description] + "</span>"
            } : "function" == typeof a.description && (i = function(t, e) {
                return t + " - <span>" + a.description(e) + "</span>"
            }), i) : "iconRight" === n.type ? ("string" == typeof a.iconSrc ? i = function(t, e) {
                return t + "<img class='eac-icon' src='" + e[a.iconSrc] + "' />"
            } : "function" == typeof a.iconSrc && (i = function(t, e) {
                return t + "<img class='eac-icon' src='" + a.iconSrc(e) + "' />"
            }), i) : "iconLeft" === n.type ? ("string" == typeof a.iconSrc ? i = function(t, e) {
                return "<img class='eac-icon' src='" + e[a.iconSrc] + "' />" + t
            } : "function" == typeof a.iconSrc && (i = function(t, e) {
                return "<img class='eac-icon' src='" + a.iconSrc(e) + "' />" + t
            }), i) : "links" === n.type ? ("string" == typeof a.link ? i = function(t, e) {
                return "<a href='" + e[a.link] + "' >" + t + "</a>"
            } : "function" == typeof a.link && (i = function(t, e) {
                return "<a href='" + a.link(e) + "' >" + t + "</a>"
            }), i) : "custom" === n.type ? n.method : e.basic.method) : e.basic.method;
            var n,
                i,
                a
        }(t)
    }, t
}((EasyAutocomplete = function(t) {
    return t.proccess = function(e, n, i) {
        t.proccess.match = o;
        var a = n.data;
        return a = function(t) {
            e.get("list").sort.enabled && t.sort(e.get("list").sort.method);
            return t
        }(a = function(t) {
            void 0 !== n.maxNumberOfElements && t.length > n.maxNumberOfElements && (t = t.slice(0, n.maxNumberOfElements));
            return t
        }(a = function(t, n) {
            var i = [];
            if (e.get("list").match.enabled)
                for (var a = 0, r = t.length; a < r; a += 1)
                    o(e.get("getValue")(t[a]), n) && i.push(t[a]);
            else
                i = t;
            return i
        }(a, i)));
        function o(t, n) {
            return e.get("list").match.caseSensitive || ("string" == typeof t && (t = t.toLowerCase()), n = n.toLowerCase()), e.get("list").match.method(t, n)
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.ListBuilderService = function(t, e) {
        function n(e, n) {
            var i = {};
            if (i = "XML" === t.get("dataType").toUpperCase() ? function() {
                var i,
                    a = {};
                void 0 !== e.xmlElementName && (a.xmlElementName = e.xmlElementName);
                void 0 !== e.listLocation ? i = e.listLocation : void 0 !== t.get("listLocation") && (i = t.get("listLocation"));
                void 0 !== i ? "string" == typeof i ? a.data = $(n).find(i) : "function" == typeof i && (a.data = i(n)) : a.data = n;
                return a
            }() : function() {
                var t = {};
                void 0 !== e.listLocation ? "string" == typeof e.listLocation ? t.data = n[e.listLocation] : "function" == typeof e.listLocation && (t.data = e.listLocation(n)) : t.data = n;
                return t
            }(), void 0 !== e.header && (i.header = e.header), void 0 !== e.maxNumberOfElements && (i.maxNumberOfElements = e.maxNumberOfElements), void 0 !== t.get("list").maxNumberOfElements && (i.maxListSize = t.get("list").maxNumberOfElements), void 0 !== e.getValue)
                if ("string" == typeof e.getValue) {
                    var a = e.getValue;
                    i.getValue = function(t) {
                        return t[a]
                    }
                } else
                    "function" == typeof e.getValue && (i.getValue = e.getValue);
            else
                i.getValue = t.get("getValue");
            return i
        }
        function i(e) {
            var n = [];
            return void 0 === e.xmlElementName && (e.xmlElementName = t.get("xmlElementName")), $(e.data).find(e.xmlElementName).each(function() {
                n.push(this)
            }), n
        }
        this.init = function(e) {
            var n = [],
                i = {};
            return i.data = t.get("listLocation")(e), i.getValue = t.get("getValue"), i.maxListSize = t.get("list").maxNumberOfElements, n.push(i), n
        }, this.updateCategories = function(e, i) {
            if (t.get("categoriesAssigned")) {
                e = [];
                for (var a = 0; a < t.get("categories").length; a += 1) {
                    var o = n(t.get("categories")[a], i);
                    e.push(o)
                }
            }
            return e
        }, this.convertXml = function(e) {
            if ("XML" === t.get("dataType").toUpperCase())
                for (var n = 0; n < e.length; n += 1)
                    e[n].data = i(e[n]);
            return e
        }, this.processData = function(n, i) {
            for (var a = 0, o = n.length; a < o; a += 1)
                n[a].data = e(t, n[a], i);
            return n
        }, this.checkIfDataExists = function(t) {
            for (var e = 0, n = t.length; e < n; e += 1)
                if (void 0 !== t[e].data && t[e].data instanceof Array && t[e].data.length > 0)
                    return !0;
            return !1
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Constants = function() {
        var t = {
            CONTAINER_CLASS: "easy-autocomplete-container",
            CONTAINER_ID: "eac-container-",
            WRAPPER_CSS_CLASS: "easy-autocomplete"
        };
        this.getValue = function(e) {
            return t[e]
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Logger = function() {
        this.error = function(t) {
            console.log("ERROR: " + t)
        }, this.warning = function(t) {
            console.log("WARNING: " + t)
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Configuration = function(t) {
        var e = {
                data: "list-required",
                url: "list-required",
                dataType: "json",
                listLocation: function(t) {
                    return t
                },
                xmlElementName: "",
                getValue: function(t) {
                    return t
                },
                autocompleteOff: !0,
                placeholder: !1,
                ajaxCallback: function() {},
                matchResponseProperty: !1,
                list: {
                    sort: {
                        enabled: !1,
                        method: function(t, n) {
                            return (t = e.getValue(t)) < (n = e.getValue(n)) ? -1 : t > n ? 1 : 0
                        }
                    },
                    maxNumberOfElements: 6,
                    hideOnEmptyPhrase: !0,
                    match: {
                        enabled: !1,
                        caseSensitive: !1,
                        method: function(t, e) {
                            return t.search(e) > -1
                        }
                    },
                    showAnimation: {
                        type: "normal",
                        time: 400,
                        callback: function() {}
                    },
                    hideAnimation: {
                        type: "normal",
                        time: 400,
                        callback: function() {}
                    },
                    onClickEvent: function() {},
                    onSelectItemEvent: function() {},
                    onLoadEvent: function() {},
                    onChooseEvent: function() {},
                    onKeyEnterEvent: function() {},
                    onMouseOverEvent: function() {},
                    onMouseOutEvent: function() {},
                    onShowListEvent: function() {},
                    onHideListEvent: function() {}
                },
                highlightPhrase: !0,
                theme: "",
                cssClasses: "",
                minCharNumber: 0,
                requestDelay: 0,
                ajaxSettings: {},
                preparePostData: function(t, e) {
                    return t
                },
                loggerEnabled: !0,
                template: "",
                categoriesAssigned: !1,
                categories: [{
                    maxNumberOfElements: 4
                }]
            },
            n = ["ajaxSettings", "template"];
        function i(t, i) {
            !function e(i, a) {
                for (var o in a)
                    void 0 === i[o] && t.log("Property '" + o + "' does not exist in EasyAutocomplete options API."), "object" == typeof i[o] && -1 === $.inArray(o, n) && e(i[o], a[o])
            }(e, i)
        }
        this.get = function(t) {
            return e[t]
        }, this.equals = function(t, n) {
            return !(!function(t) {
                return void 0 !== e[t] && null !== e[t]
            }(t) || e[t] !== n)
        }, this.checkDataUrlProperties = function() {
            return !("list-required" === e.url && "list-required" === e.data)
        }, this.checkRequiredProperties = function() {
            for (var t in e)
                if ("required" === e[t])
                    return logger.error("Option " + t + " must be defined"), !1;
            return !0
        }, this.printPropertiesThatDoesntExist = function(t, e) {
            i(t, e)
        }, function() {
            "xml" === t.dataType && (t.getValue || (t.getValue = function(t) {
                return $(t).text()
            }), t.list || (t.list = {}), t.list.sort || (t.list.sort = {}), t.list.sort.method = function(e, n) {
                return e = t.getValue(e), n = t.getValue(n), e < n ? -1 : e > n ? 1 : 0
            }, t.list.match || (t.list.match = {}), t.list.match.method = function(t, e) {
                return t.search(e) > -1
            });
            if (void 0 !== t.categories && t.categories instanceof Array) {
                for (var n = [], i = 0, a = t.categories.length; i < a; i += 1) {
                    var o = t.categories[i];
                    for (var r in e.categories[0])
                        void 0 === o[r] && (o[r] = e.categories[0][r]);
                    n.push(o)
                }
                t.categories = n
            }
        }(), function() {
            e = function t(e, n) {
                var i = e || {};
                for (var a in e)
                    void 0 !== n[a] && null !== n[a] && ("object" != typeof n[a] || n[a] instanceof Array ? i[a] = n[a] : t(e[a], n[a]));
                void 0 !== n.data && null !== n.data && "object" == typeof n.data && (i.data = n.data);
                return i
            }(e, t)
        }(), !0 === e.loggerEnabled && i(console, t), void 0 !== t.ajaxSettings && "object" == typeof t.ajaxSettings ? e.ajaxSettings = t.ajaxSettings : e.ajaxSettings = {}, function() {
            if ("list-required" !== e.url && "function" != typeof e.url) {
                var n = e.url;
                e.url = function() {
                    return n
                }
            }
            if (void 0 !== e.ajaxSettings.url && "function" != typeof e.ajaxSettings.url) {
                var n = e.ajaxSettings.url;
                e.ajaxSettings.url = function() {
                    return n
                }
            }
            if ("string" == typeof e.listLocation) {
                var i = e.listLocation;
                "XML" === e.dataType.toUpperCase() ? e.listLocation = function(t) {
                    return $(t).find(i)
                } : e.listLocation = function(t) {
                    return t[i]
                }
            }
            if ("string" == typeof e.getValue) {
                var a = e.getValue;
                e.getValue = function(t) {
                    return t[a]
                }
            }
            void 0 !== t.categories && (e.categoriesAssigned = !0)
        }()
    }, t
}(EasyAutocomplete || {})) || {})) || {})) || {})) || {})) || {})) || {});
!function(t) {
    t.fn.easyAutocomplete = function(e) {
        return this.each(function() {
            var n = t(this),
                i = new EasyAutocomplete.main(n, e);
            EasyAutocomplete.inputHasId(n) || EasyAutocomplete.assignRandomId(n), i.init(), EasyAutocomplete.setHandle(i, n.attr("id"))
        })
    }, t.fn.getSelectedItemIndex = function() {
        var e = t(this).attr("id");
        return void 0 !== e ? EasyAutocomplete.getHandle(e).getSelectedItemIndex() : -1
    }, t.fn.getItems = function() {
        var e = t(this).attr("id");
        return void 0 !== e ? EasyAutocomplete.getHandle(e).getItems() : -1
    }, t.fn.getItemData = function(e) {
        var n = t(this).attr("id");
        return void 0 !== n && e > -1 ? EasyAutocomplete.getHandle(n).getItemData(e) : -1
    }, t.fn.getSelectedItemData = function() {
        var e = t(this).attr("id");
        return void 0 !== e ? EasyAutocomplete.getHandle(e).getSelectedItemData() : -1
    }
}(jQuery);
