var k = false,l = false,m = false;

// if(isSearchPage()){
//     insertSheetAndProcess();
// }

const urlParams = new URLSearchParams(window.location.search);
const searchText = urlParams.get('SearchText');
loadJSPanel();
loadYoutubeVideos(searchText);
// insertSheetAndProcess();
loadVimeoVideos(searchText);
loadPinterestVideos(searchText);

// insertSheetAndProcess();

// $(window).resize(function () {
//     setTimeout(() => {
//         if(isSearchPage()){
//             insertSheetAndProcess();
//         }
//     }, 1000);
// });

// $(window).on("scroll", function () {
//     $(".list-no-v2-outter").each(function (index, item) {
//         var epacket_indicator = $(this).find(".epacket-indicator").length;
//         if(epacket_indicator == 0){
//             setTimeout(() => processProduct($(this)), 1000);
//         }
//     });
// })

function processProduct(product_item) {
    if (!$(product_item).prop("video-indicate-check")) {
        $(product_item).prop("video-indicate-check", true);

        if($(product_item).find(".sa-bar").length == 0){
            prependMarkup($(product_item));
        }

        var indicator_active_html = $('<span class="epacket-indicator active"><span class="epacket">Video</span></span>');
        $(product_item).find(".sa-bar").prepend(indicator_active_html);

        var k = $(product_item).find(".sa-bar .epacket-indicator");

        if(k.find(".video-indicator").length == 0){
            var icon_video = $(".seb-img-switcher__icon-video", $(product_item));
            if(icon_video.length > 0){
                indicator_active_html.addClass("active");
                var video_indicator_html = '<span class="video-indicator" title="Product includes a video"><img src="' 
                                                    + chrome.extension.getURL("img/video-camera.png") + '"/></span>';
                if(k.find(".video-indicator").length == 0){
                    k.prepend($(video_indicator_html));
                }
            }
            else{
                indicator_active_html.removeClass("active");
            }
            $(product_item).prop("video_detected", icon_video.length > 0);
        }
    }
}


function prependMarkup(element) {
    element.prepend($('<div class="sa-bar"></div>'));
}

function insertSheetAndProcess() {
    appendStyleSheet();
    $(".list-no-v2-outter").waypoint({
        offset: "150%",
        handler: function (direction) {
            var product_item = this.element;
            if (!$(product_item).prop("video-indicator-equipped")) {
                // processProduct(product_item);
            }
        }
    });
}

function appendStyleSheet() {
    var link = document.createElement("link");
    link.href = chrome.extension.getURL("css/alibaba.css");
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