function initEvents() {
    $('body').on('click', 'button.btn-download', onDownloadButtonClicked);
}

async function loadYoutubeVideos(query){
    const data = await sendMessage({action: 'get_youtube_videos', search_query: query});
    
    if (!data['videosFound']) {
        return;
    }

    for (const video of data['videos']) {
        const content = `
        <tr>
            <td><img src="${video['thumbnail']}" class="img-thumbnail"></td>
            <td class="video-title">
                <a href="${video['url']}" target="_blank">${video['title']}</a>
            </td>
            <td>
                <a href="${video['url']}" target="_blank" class="btn btn-danger text-white" title="Watch on Youtube">
                    <i class="fa fa-youtube-play"></i> 
                    Watch
                </a>
                <a href="${Server_URL}/video/download?website=youtube&url=${encodeURIComponent(video['url'])}"
                    class="btn btn-primary btn-download"
                    target="_blank"
                    title="Download"
                >
                    <i class="fa fa-download"></i> 
                    Download
                </a>
            </td>
        </tr>`;

        $("#youtube_fragment tbody").append(content);
    }
    hideProgress('#youtube_fragment');
}

async function loadVimeoVideos(query){
    const data = await sendMessage({action: 'get_vimeo_videos', search_query: query});

    if(!data['videosFound']){
        return;
    }

    for (const video of data['videos']) {
        const content = `
        <tr>
            <td><img src="${video['thumbnail']}" class="img-thumbnail"></td>
            <td class="video-title">
                <a href="${video['url']}" target="_blank">${video['title']}</a>
            </td>
            <td>
                <a href="${video['url']}" target="_blank" class="btn btn-primary" title="Watch on Vimeo">
                    <i class="fa fa-vimeo"></i> Watch
                </a>
                <button type="button" 
                    class="btn btn-primary btn-download ladda-button" 
                    title="Download"
                    data-url="${video['url']}" 
                    data-website="vimeo"
                    data-style="slide-right"
                >
                    <i class="fa fa-download"></i> 
                    Download
                </button>
            </td>
        </tr>`;
        $("#vimeo_fragment tbody").append(content);
    }
    hideProgress('#vimeo_fragment');
}

async function loadPinterestVideos(query){
    const data = await sendMessage({action: 'get_pinterest_videos', search_query: query});
    
    if(!data['videosFound']){
        return;
    }

    for (const video of data['videos']) {
        const content = `
        <tr>
            <td><img src="${video['thumbnail']}" class="img-thumbnail" width="200"></td>
            <td class="video-title">
                <a href="${video['url']}" target="_blank">${video['title']}</a>
            </td>
            <td>
                <a href="${video['url']}" target="_blank" class="btn btn-danger" title="Watch on Pinterest">
                    <i class="fa fa-pinterest"></i> Watch
                </a>
                <button type="button" 
                    class="btn btn-primary btn-download ladda-button" 
                    title="Download"
                    data-url="${video['url']}" 
                    data-website="pinterest"
                    data-style="slide-right"
                >
                    <i class="fa fa-download"></i> 
                    Download
                </button>
            </td>
        </tr>`;
        $("#pinterest_fragment tbody").append(content);
    }
    hideProgress('#pinterest_fragment');
}

async function loadFacebookVideos(query) {
    const data = await sendMessage({action: 'get_facebook_videos', search_query: query});
    
    if (!data['videosFound']) {
        return;
    }
    
    for (const video of data.videos) {
        const content = `
            <tr>
                <td><img src="${video['thumbnail']}" class="img-thumbnail"></td>
                <td class="video-title">
                    <a href="${video['url']}" target="_blank">${video['title']}</a>
                </td>
                <td>
                    <a href="${video['url']}" target="_blank" class="btn btn-primary" title="Watch on Vimeo">
                        <i class="fa fa-facebook"></i> 
                        Watch
                    </a>
                    <button type="button" 
                        class="btn btn-primary btn-download ladda-button" 
                        title="Download"
                        data-url="${video['url']}" 
                        data-website="facebook"
                        data-style="slide-right"
                    >
                        <i class="fa fa-download"></i> 
                        Download
                    </button>
                </td>
            </tr>`;
        $("#facebook_fragment tbody").append(content);
    }
    hideProgress('#facebook_fragment');
}

async function loadInstagramVideos(query) {
    const data = await sendMessage({action: 'get_instagram_videos', search_query: query});
    
    if (!data['videosFound']) {
        return;
    }
    
    for (const video of data.videos) {
        const content = `
            <tr>
                <td><img src="${video['thumbnail']}" class="img-thumbnail"></td>
                <td class="video-title">
                    <a href="${video['url']}" target="_blank">${video['title']}</a>
                </td>
                <td>
                    <a href="${video['url']}" target="_blank" class="btn btn-primary" title="Watch on Vimeo">
                        <i class="fa fa-instagram"></i> 
                        Watch
                    </a>
                    <button type="button" 
                        class="btn btn-primary btn-download ladda-button" 
                        title="Download"
                        data-url="${video['url']}" 
                        data-website="instagram"
                        data-style="slide-right"
                    >
                        <i class="fa fa-download"></i> 
                        Download
                    </button>
                </td>
            </tr>`;
        $("#instagram_fragment tbody").append(content);
    }
    hideProgress('#instagram_fragment');
}

function sendMessage(message){
    return new Promise((resolve,  reject) => {
        chrome.runtime.sendMessage(message, response => resolve(response));
    });
}

function loadJSPanel(){
    jsPanel.create({
        contentFetch: {
            resource: `${chrome.extension.getURL("panel_template.html")}`,
            done: function (response, panel) {
                panel.contentRemove();
                $(panel.content).css({'padding': '5px', 'background': 'white'});
                panel.content.append(jsPanel.strToHtml(response));
                $(".vf_ext_panel_tablinks").click(openVideosPanel);
                $(".vf_ext_panel_tablinks").first().click();
            }
        },
        contentSize: { width: 685, height: 400 },
        theme: 'royalblue filledlight',
        borderRadius: '.5rem',
        headerTitle: 'Videos found for this Query'
    });
}

function openVideosPanel(event){
    const id = "#" + $(event.target).data('fragment');
    $(".vf_ext_panel_tabcontent").each((index, tabcontent) => $(tabcontent).hide());
    $(id).show();
    $(".vf_ext_panel_tablinks").each((index, tablink) => $(tablink).removeClass("active"));
    $(event.target).addClass("active");
}

async function onDownloadButtonClicked() {
    Ladda.create(this).start();
    await sendMessage({
        action: 'download_video', 
        url: $(this).data('url'),
        website: $(this).data('website'),
    });
    Ladda.create(this).stop();
}

function hideProgress(selector) {
    $(`${selector} .ispinner-container`).remove();
}