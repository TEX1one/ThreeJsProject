var CookieManager = function() {
    function t() {
        var r = Utils.CookieManager.ReadCookie("Segmentation"), i, n, t, u;
        if (r == null)
            return !1;
        for (i = r.split("&"),
        n = 0; n < i.length; n++)
            if (t = i[n].split("="),
            t.length == 2 && t[0] == "dt" && (u = new Date(t[1]),
            u > new Date))
                return !0;
        return !1
    }
    function i() {
        var i, r, u;
        n.EnableSegmentationCookie && (i = n.CustomerNumber,
        r = Utils.CookieManager.ReadCookie("Segmentation"),
        i != null && (r == null || n.InitSegmentationCookie && !t()) && (u = JSON.stringify({
            request: {
                CustomerNumber: i
            }
        }),
        $.ajax({
            url: "/servicemyaccountnosession/getmarketingprofile",
            async: !0,
            cache: !1,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: u,
            success: function(n) {
                var r = "", u, t, f;
                if (n.d && (n = n.d),
                n.Classifications != null && n.Classifications && n.Classifications.length > 0) {
                    for (tc_vars.user_classification = n.Classifications,
                    r = "CI=" + i,
                    u = 0; u < n.Classifications.length; u++)
                        t = n.Classifications[u],
                        r += "&" + t.Key + "=" + t.Value,
                        t.Key == "clusterNum" && (tc_vars.user_clusterNum = t.Value);
                    f = new Date((new Date).setHours((new Date).getHours() + 1));
                    r += "&dt=" + f.toUTCString();
                    Utils.CookieManager.CreateCookie("Segmentation", r, 365, !0)
                }
            }
        })))
    }
    function r() {
        var n = new Date
          , t = n.getTimezoneOffset();
        Utils.CookieManager.CreateCookie("BROWSERCOLORDEPTH", screen.colorDepth, 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERJAVAENABLED", navigator.javaEnabled(), 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERLANGUAGE", navigator.language, 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERSCREENHEIGHT", screen.height, 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERSCREENWIDTH", screen.width, 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERTIMEZONE", t, 1, !0, !0);
        Utils.CookieManager.CreateCookie("BROWSERJAVASCRIPTENABLED", "true", 1, !0, !0)
    }
    var n = {
        InitSegmentationCookie: contextInfo != null && contextInfo.Configuration != null && contextInfo.Configuration.ConfigCookieManager != null ? contextInfo.Configuration.ConfigCookieManager.InitSegmentationCookie : !0,
        EnableSegmentationCookie: contextInfo != null && contextInfo.Configuration != null && contextInfo.Configuration.ConfigCookieManager != null ? contextInfo.Configuration.ConfigCookieManager.EnableSegmentationCookie : !1,
        CustomerNumber: contextInfo != null && contextInfo.Customer != null && typeof contextInfo.Customer.UserId != "undefined" && contextInfo.Customer.UserId != null ? contextInfo.Customer.UserId : null
    };
    return {
        Initialise: function() {
            contextInfo.Configuration.ConfigFlags.CreateBrowserCookiesOnPayment == !1 && r();
            i()
        }
    }
}(), siteSelector;
$(window).on("load", function() {
    CookieManager.Initialise()
});
(function(n, t) {
    "use strict";
    var i = n.LR_App
      , r = "HandlerMaster";
    i.events.page = {
        closedFromBottom: "pageScroll.closedFromBottom",
        resized: "page.size.change"
    };
    i.addComponent(r, function(r) {
        this._super(r);
        var s = r.Model, u = i.utils, f, e, h = u.getScreenSize(), o = i.events.page;
        t(n).on("scroll", function() {
            f && n.clearTimeout(f);
            f = n.setTimeout(function() {
                var i = t("body").height()
                  , r = t(n).height()
                  , u = t(this).scrollTop()
                  , f = i - (u + r);
                f < 1200 && s.$eventContainer.trigger(o.closedFromBottom)
            }, 100)
        });
        t(n).on("resize", function() {
            e && n.clearTimeout(e);
            e = n.setTimeout(function() {
                var n = u.getScreenSize();
                h !== n && (u.triggerCustomEvent(o.resized, {
                    size: n
                }),
                h = n)
            }, 200)
        });
        s.$eventContainer.one(o.closedFromBottom, function() {
            r.initiateUiComponent("footer", "UiFooter")
        })
    });
    i.utils.isAvailable(r)
}
)(window, window.jQuery);
siteSelector = function() {
    function n(n) {
        return "siteSelector-" + n
    }
    function i() {
        return document.referrer === "" || document.referrer.indexOf("google") >= 0 ? !1 : typeof siteSelectorConfig != "undefined"
    }
    function r() {
        return Utils.CookieManager.ReadCookie(n("layerShown")) == null ? !1 : !0
    }
    function u() {
        Utils.CookieManager.CreateCookie(n("layerShown"), 1, 0)
    }
    function f() {
        return siteSelectorConfig.VisitorCountryCode
    }
    function t() {
        var t = f();
        for (var n in siteSelectorConfig.Countries)
            if (siteSelectorConfig.Countries[n].CountryCode == t)
                return siteSelectorConfig.Countries[n];
        return null
    }
    function e() {
        var n = navigator.language || navigator.userLanguage, t, i;
        n = n.split("-")[0];
        t = "en";
        for (i in siteSelectorConfig.SupportedLanguages)
            n.toLowerCase() == siteSelectorConfig.SupportedLanguages[i] && (t = siteSelectorConfig.SupportedLanguages[i]);
        return t
    }
    function o() {
        var i = t(), n;
        return i == null ? null : (n = "nodelivery",
        i == null && (n = "nodelivery"),
        n = window.location.href.indexOf(i.SiteUrl) <= 0 ? i.LayerType : null,
        n == "nodelivery" && window.location.href.indexOf("redoute.com") > 0 && (n = null),
        n)
    }
    function s() {
        res = "";
        for (var n = window.location.host.split("."); n.length > 2; )
            res.length > 0 && (res = "." + res),
            res = n.pop() + res;
        return res
    }
    function h(n) {
        var f, r, i, u;
        if (n.d != null && (n = n.d),
        f = t(),
        f != null) {
            r = f.SiteUrl;
            r = r.replace(/http:\/\//g, "");
            r = r.replace(/https:\/\//g, "");
            r = r.replace(/-preview\./g, "");
            r = r.replace(/-preprod\./g, "");
            r = r.replace(/uat\./g, "");
            r = r.replace(/localhost\./g, "");
            n = n.replace(/\[SiteNameExternal\]/g, r);
            i = window.location.hostname;
            i = i.replace(/http:\/\//g, "");
            i = i.replace(/https:\/\//g, "");
            i = i.replace(/m-preview\./g, "");
            i = i.replace(/m-preprod\./g, "");
            i = i.replace(/localhost\./g, "");
            i = i.replace(/m\./g, "");
            i = i.replace(/uat\./g, "");
            n = n.replace(/\[SiteNameCurrent\]/g, i);
            u = $("<div>", {
                id: "siteSelectorContainer",
                "class": "popin",
                html: n
            }).appendTo("body");
            u.popin();
            u.find("#btn-close").on("click", u.data("popin").close);
            u.data("popin").open()
        }
    }
    function c(i) {
        var u, r, f, e;
        i.preventDefault();
        i.stopPropagation();
        u = t();
        r = u.SiteUrl;
        r.indexOf("https://") != 0 && (r = "https://" + r);
        f = siteSelectorConfig.RedirectPreferenceDuration;
        e = s();
        r = r + "?omniturecode=COR" + e + "LayerGEO&flag=1";
        Utils.CookieManager.CreateCookie(n("RedirectPreference"), btoa(r), f);
        window.location = r
    }
    function l(n, t) {
        var i = {
            layerType: n,
            layerLanguage: t
        };
        $.ajax({
            url: "/servicegeneric/loadsiteselector",
            type: "GET",
            contentType: "application/json; charset=utf-8",
            data: i,
            success: function(n) {
                h(n)
            }
        })
    }
    function a() {
        var i = Utils.CookieManager.ReadCookie(n("RedirectPreference"))
          , t = atob(i);
        return t != null && t.indexOf("http") == 0 && t.indexOf("https") == 0 ? (window.location = t,
        !0) : !1
    }
    function v() {
        var i = a(), n, t;
        if (!i && !r() && (n = o(),
        t = e(),
        n != null && n != "")) {
            u();
            Utils.OmnitureManager.addEvents("event101");
            $(document).on("click", "#btn-redirect", c);
            l(n, t)
        }
    }
    return {
        Initialise: function() {
            try {
                i() && pageType != PageTypeEnum.ProductPage && pageType != PageTypeEnum.MultiProductPage && v()
            } catch (n) {
                console.error(n.message)
            }
        }
    }
}();
$(function() {
    $("body").hasClass("cfao") || siteSelector.Initialise()
}),
function(n, t) {
    "use strict";
    const i = n.LR_App
      , r = "UiFooter";
    i.addComponent(r, function(n, i) {
        this._super(n, i);
        const o = 300
          , s = n.Model.pageType === "HomePage"
          , h = n.Model.pageType === "BasketPage";
        let c = !1;
        const w = document.createElement("li")
          , l = document.createElement("span")
          , b = document.createElement("a")
          , k = document.createElement("ul")
          , r = document.querySelector(".widgetLine__2")
          , u = document.getElementById("footerServicesToggleBtn")
          , a = document.getElementById("footerSwitchText");
        let f = null
          , e = null;
        r && (f = r.querySelectorAll(".footer-services-title"),
        e = r.querySelectorAll(".footer-services-block"));
        const d = (n,t)=>n.setAttribute("aria-expanded", t ? !1 : !0)
          , g = (n,i)=>i ? t(n).slideUp(o) : t(n).slideDown(o)
          , v = n=>n.length === 1 ? n : Array.from(n).map(n=>+n.dataset.widgetid)
          , nt = (n,i,r)=>{
            const u = document.querySelector("body").classList.contains("is-mobile") ? !0 : !1
              , f = u ? "iceberg" : "panel";
            t(n).modal({
                method: "open",
                type: f,
                url: n.dataset.url,
                id: "blockOfLinks_" + i + "_item_" + r,
                block: ".staticContent"
            })
        }
          , tt = ()=>{
            if (a) {
                const t = JSON.parse(a.innerText);
                let {toggleBtnShowText: n, toggleBtnHideText: i} = t;
                u.classList.toggle("footer-services-toggleBtn--isToggled");
                u.innerText = u.innerText == n ? i : n
            }
        }
          , it = (n,t,i)=>{
            const r = w.cloneNode();
            let u = null;
            return n.URL.length === 0 && r.classList.add("isNotLink"),
            n.IsListItem && r.classList.add("chevron-right"),
            n.IsPanel ? (u = l.cloneNode(),
            u.classList.add("footer-services-link--isPanel"),
            r.setAttribute("data-url", n.URL),
            r.addEventListener("click", ()=>nt(r, t, i))) : n.URL.length === 0 ? u = l.cloneNode() : (u = b.cloneNode(),
            u.setAttribute("href", n.URL),
            n.TargetBlank && u.setAttribute("target", "_blank")),
            u.innerText = n.Label,
            r.append(u),
            r.classList.add("footer-services-link"),
            r
        }
          , rt = n=>{
            f.forEach((t,i)=>{
                const r = k.cloneNode();
                let u = t.parentNode;
                const f = t.getAttribute("id");
                n.Widgets.forEach(n=>{
                    if (f === n.Name) {
                        const {WebRepeatables: t} = n.ComponentsContainer;
                        t.forEach((n,t)=>{
                            const f = it(n, i, t);
                            r.append(f);
                            r.setAttribute("aria-expanded", "true");
                            r.classList.add("footer-services-content");
                            u.append(r)
                        }
                        )
                    }
                }
                )
            }
            )
        }
        ;
        let y = n=>{
            var i = "";
            contextInfo.EnvironmentBaseDirectory != "" && (i = "/" + contextInfo.EnvironmentBaseDirectory);
            let t = new window.XMLHttpRequest;
            t.open("POST", i + "/ServiceWidgets/LoadWidgetsJson", !0);
            t.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            t.send(JSON.stringify({
                request: {
                    WidgetIds: n,
                    WidgetPageType: "Footer",
                    LoadBundles: !0
                }
            }));
            t.onreadystatechange = function() {
                if (t.readyState === 4 && t.status >= 200 && t.status < 300) {
                    const n = JSON.parse(t.responseText);
                    n.IsSuccess === !0 && rt(n)
                }
            }
        }
        ;
        const p = n=>{
            n.forEach(n=>{
                const t = n.querySelector(".footer-services-content");
                if (t) {
                    const i = t.getAttribute("aria-expanded") === "true";
                    d(t, i);
                    g(t, i)
                }
            }
            )
        }
        ;
        r && (n.isMobile ? ((s || h) && t("ul.footer-services-content").hide(),
        f.forEach(n=>{
            n.addEventListener("click", function({target: t}) {
                if (!h && !s && !n.dataset.populated) {
                    n.setAttribute("data-populated", !0);
                    const i = v([+t.parentNode.parentNode.dataset.widgetid]);
                    y(i)
                }
                p([n.parentNode])
            })
        }
        )) : [[u], f].forEach(n=>{
            n.forEach(n=>{
                n && n.addEventListener("click", ()=>{
                    if (!c) {
                        const n = v(e);
                        y(n);
                        c = !0
                    }
                    tt();
                    p(e)
                }
                )
            }
            )
        }
        ))
    });
    i.utils.isAvailable(r)
}(window, window.jQuery)
