var k = false,l = false,m = false;
const Server_URL = 'https://drop-video.herokuapp.com';
// const Server_URL = 'http://127.0.0.1:3000';

init();

async function init() {
    if(isSearchPage()){
        const urlParams = new URLSearchParams(window.location.search);
        const searchText = urlParams.get('SearchText');
        loadJSPanel();
        initEvents();
        loadYoutubeVideos(searchText);
        loadVimeoVideos(searchText);
        loadPinterestVideos(searchText);
        await loadFacebookVideos(searchText);
        await loadInstagramVideos(searchText);
        // insertSheetAndProcess();
    }
}

// $(window).resize(function () {
//     setTimeout(() => {
//         if(isSearchPage()){
//             insertSheetAndProcess();
//         }
//     }, 1000);
// });

// $(window).on("scroll", function () {
//     $(".list-item").each(function (b) {
//         var product_card = $(this).find(".product-card");
//         var epacket_indicator = product_card.find(".epacket-indicator").length;
//         var data_product_id = product_card.attr("data-product-id");
//         var product_url = "https://www.aliexpress.com/item/" + data_product_id + ".html";
//         if(epacket_indicator == 0){
//             setTimeout(() => processProduct(product_url, product_card), 1000);
//         }
//     });
// })

function processProduct(product_url, product_item) {
    if (!$(product_item).prop("video-indicate-check")) {
        $(product_item).prop("video-indicate-check", true);
        
        if(typeof product_url == 'string'){
            var product_id =  product_url.match(/([0-9]+)\.html/i);
        }
        
        if(locationMatch(/aliexpress\.com\/af/) && !product_id){
            product_url = $("a.order-num-a", $(product_item)).attr("href");
        }

        if($(product_item).find(".sa-bar").length == 0){
            if($(product_item).find(".image-box")[0] || $(product_item).find(".item-image")[0] || $(product_item).find(".img-wrap")[0]){
                prependMarkup($(product_item).find(".image-box, .item-image, .img-wrap"));
            } 
            else{
                if($(product_item).find(".sa-bar").length == 0){
                    if($(product_item).find(".picRind, .pic-rind").parents(".img")[0]){
                        prependMarkup($(product_item).find(".picRind, .pic-rind").parents(".img"));
                    }
                    else{
                        if($(product_item).find(".sa-bar").length == 0 && $(product_item).find(".product-img, .lazyload-placeholder")){
                            prependMarkup($(product_item).find(".product-img, .lazyload-placeholder").parents(".product-card"));
                            $(product_item).find(".sa-bar").addClass("new-app-style");
                        }
                    }
                }
            }
        }

        var indicator_active_html = $('<span class="epacket-indicator active"><span class="epacket">Video</span></span>');
        $(product_item).find(".sa-bar").prepend(indicator_active_html);

        var j = $(product_item).find(".picRind, .pic-rind, div.image-box a, .item-image, .img-wrap, .product-img a, .lazyload-placeholder ");
        var k = $(product_item).find(".sa-bar .epacket-indicator");

        if(k.find(".video-indicator").length == 0){
            $.ajax({
                url: getQueryVariable("ulp", product_url) || product_url,
                type: "GET",
                success: function (response) {
                    var video_id_found = false;
                    if (isNewProductPage(response)) {
                        var params_json = parseAliexpressParams(response);
                        video_id_found = params_json.imageModule.videoId;
                    }
                    else {
                        var video_container = $(response).find("div.product-video-main,div.video-container");
                        if(video_container.length > 0){
                            video_id_found = true;
                        }
                    }
                    if (video_id_found) {
                        // console.log(`Video found on this product: ${product_url}`);
                        indicator_active_html.addClass("active");
                        j.removeClass("error").parents(".image-box, .img, .product-img").removeClass("error");
                        $(product_item).find(".product-card").removeClass("error");

                        var video_indicator_html = '<span class="video-indicator" title="Product includes a video"><img src="' 
                                                    + chrome.extension.getURL("img/video-camera.png") + '"/></span>';

                        if(k.find(".video-indicator").length == 0){
                            k.prepend($(video_indicator_html));
                        }
                    }
                    else{
                        indicator_active_html.removeClass("active");
                    }

                    j.addClass("error").parents(".image-box, .img, .product-img, .lazyload-placeholder ").addClass("error");
                    $(product_item).find(".product-card").addClass("error");
                    $(product_item).prop("video_detected", video_id_found);

                    if(m && !video_id_found){
                        $(product_item).css("opacity", "0.1");
                    }
                    else{
                        $(product_item).css("opacity", "1");
                    }

                    var o = null;

                    $(product_item)
                    .mouseenter(function (event) {
                        $(this).animate({opacity: "1.0"}, 50, function () {});
                        if($(this).data("timer")){
                            clearTimeout($(this).data("timer"));
                            $(this).data("timer", null);
                        }
                    })
                    .mouseleave(function (event) {
                        if (m && !$(this).prop("video_detected") && !flashDeals() && !bestSelling() && !sale()) {
                            var f = this;
                            var timer = setTimeout(function () {
                                        $(f).animate({opacity: "0.1"}, 100, function () {
                                            o = null;
                                        });
                                }, 100);
                            $(this).data("timer", timer);
                        }
                    })
                }
            })
        }
        
    }
}

function getQueryVariable(a, product_url) {
    var c = "";
    if (!product_url) {
        c = window.location.search.substring(1);
        if (c == "" && window.location.href.indexOf("#") != -1) {
            var d = window.location.href.split("#");
            if(d.length == 2){
                c = d[1];
            }
        }
    } 
    else {
        c = product_url.split("?");
    }

    if(c.length == 2){
        c = c[1];
    }
    else{
        c = product_url.split("#");
        if(c.length == 2){
            c = c[1];
        }
        else{
            c = product_url;
        }
    }
    for (var e = c.split("&"), f = 0; f < e.length; f++){
        try {
            var g = e[f].split("=");
            if (decodeURIComponent(g[0]) == a)
                return decodeURIComponent(g[1]);
        }
        catch (h) {
            return null;
        }
    }
    return window.hasOwnProperty(a) ? window[a] : null;
}

function isNewProductPage(html) {
    if(!html)
        html = document;
    var selector = 'script:not([src]):contains("window.runParams"):contains(\'"actionModule"\')';
    return $(html).find(selector).length || $(html).filter(selector).length;
}

function prependMarkup(element) {
    element.prepend($('<div class="sa-bar"></div>'));
}

function insertSheetAndProcess() {
    appendStyleSheet();
    $(".list-item, .items-list .item, .item[productid]").waypoint({
        offset: "150%",
        handler: function (direction) {
            var product_item = this.element;
            if (!$(product_item).prop("video-indicator-equipped")) {
                var product_url = $("a.product", $(product_item)).attr("href") || $("h3 a", $(product_item)).attr("href") || $("a.item-title", $(product_item)).attr("href");
                if(product_url){
                    // processProduct(product_url, product_item);
                }
                return;
            }
        }
    });
}

function parseAliexpressParams(html){
    let response;
    const selector = 'script:not([src]):contains("window.runParams")';
    let target_script = $(html).filter(selector);
    if(!target_script.length){
        target_script = $(html).find(selector);
    }
    target_script.each(function(index, item){
        var json_text = $(item).text().match(/data\s*:\s*(.*),/);
        response = JSON.parse(json_text[1]);
    });
    return response;
}

function appendStyleSheet() {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("css/video_indicator.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function isSearchPage() {
    var is_product = locationMatch("/item/") || locationMatch("/store/product/");
    return locationMatch(/aliexpress.com/) 
            && 
            (locationMatch("/wholesale") && !is_product || locationMatch("/category") || locationMatch("/af/") || 
            (locationMatch("SearchText") || locationMatch("/shopping-guide/"))
            && !is_product || locationMatch(/sale.aliexpress.com/) || locationMatch(/flashdeals.aliexpress.com/) || 
            locationMatch(/bestselling.aliexpress.com/) || isVendorProductsPage())
}

function locationMatch(pattern, URL) {
    if(!URL){
        URL = window.location.href;
    }
    return URL.match(pattern);
}

function isVendorProductsPage() {
    return locationMatch(/\/store\/(all-wholesale-products|sale-items|top-rated-products|group|new-arrivals)/);
}

function flashDeals() {
    return locationMatch(/flashdeals.aliexpress.com/);
}

function bestSelling() {
    return locationMatch(/bestselling.aliexpress.com/);
}

function sale() {
    return locationMatch(/sale.aliexpress.com/)
}