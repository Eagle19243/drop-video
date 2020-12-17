const Server_URL = 'https://drop-video.herokuapp.com';
// const Server_URL = 'http://127.0.0.1:3000';

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if(request.action == 'get_vimeo_videos'){
        getVimeoVideos(request.search_query)
        .then(response_videos => {
            sendResponse({ videosFound: true, videos: response_videos });
        })
        .catch(error => {
            sendResponse({ videosFound: false});
        });
    }
    else if(request.action == 'get_youtube_videos'){
        getYoutubeVideos(request.search_query)
        .then(response_videos => {
            sendResponse({ videosFound: true, videos: response_videos });
        })
        .catch(error => {
            sendResponse({ videosFound: false});
        });
    }
    else if(request.action == 'get_pinterest_videos'){
        getPinterestVideos(request.search_query)
        .then(response_videos => {
            sendResponse({ videosFound: true, videos: response_videos });
        })
        .catch(error => {
            sendResponse({ videosFound: false });
        });
    }
    else if(request.action == 'get_facebook_videos'){
        getFacebookVideos(request.search_query)
        .then(videos => {
            console.log('get_facebook_videos:', videos);
            sendResponse({ videosFound: true, videos: videos });
        })
        .catch(error => {
            sendResponse({ videosFound: false });
        });
    }
    else if(request.action == 'get_instagram_videos'){
        getInstagramVideos(request.search_query)
        .then(videos => {
            console.log('get_instagram_videos', videos);
            sendResponse({ videosFound: true, videos: videos });
        })
        .catch(error => {
            sendResponse({ videosFound: false });
        });
    }
    else if (request.action === 'download_video') {
        const url = request.url;
        const website = request.website;
        const downloadUrl = await getDownloadUrl(url, website);

        sendResponse();

        if (downloadUrl) {
            chrome.tabs.create({url: downloadUrl});
        }
    }
    return true;
});

function getPinterestVideos(title){
    return new Promise((resolve, reject) => {
        let url = `https://www.pinterest.com/resource/BaseSearchResource/get/`;
            url += `?source_urhttps://www.pinterest.com/resource/BaseSearchResource/get/`;
            url += `?source_url=/search/videos/?q=${title}&rs=filter`;
            url += `&data={"options":{"article":null,"query":"${title}","rs":"filter","scope":"videos"}}`;

        fetch(url)
        .then(response => response.json())
        .then(json => {
            let videos = json['resource_response']['data']['results'];
            let response_videos = [];

            for (const video of videos) {
                let video_item = {};
                video_item['thumbnail'] = video['videos']['video_list']['V_HLSV3_WEB']['thumbnail'];
                video_item['title'] = video['title'];
                video_item['url'] = `https://www.pinterest.com/pin/${video['id']}`;
                response_videos.push(video_item);
            }
            if(response_videos.length > 0){
                resolve(response_videos);
            }   
            else{
                reject('No videos');
            }
        })
        .catch(error => {
            reject('No videos');
        });
    });
}

function getVimeoVideos(title){
    return new Promise((resolve, reject) => {
        fetch(`https://api.vimeo.com/videos?query=${title}&per_page=100`,{
            headers: {
                "Authorization": "bearer b99b8cbf68fc04cc4977b99ea95aeb93"
            }
        })
        .then(resp => resp.json())
        .then(data=>{
            let videos = data.data.map(item=>{
                return {
                    thumbnail: item.pictures.sizes[3].link,
                    title: item.name,
                    url: item.link
                }
            })
            console.log(videos)
            resolve(videos)
        })

    });
}


function getYoutubeVideos(title){
    return new Promise((resolve, reject) => {
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&order=relevance&key=AIzaSyD6Q0keD3k2PY4cbYWVJd4kYtkZ3nLXSZU&q=${title}`)
        .then(resp => resp.json())
        .then(data=>{
            let videos = data.items.map(item=>{
                return {
                    thumbnail: item.snippet.thumbnails.medium.url,
                    title: item.snippet.title,
                    url: `https://www.youtube.com/watch?v=${item.id.videoId}`
                }
            })

            console.log(videos)
            resolve(videos)
        })
      
    });
}

async function getFacebookVideos(query){
    const response = await fetch(`${Server_URL}/video/get`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            website: 'facebook',
        })
    });
    const data = await response.json();
    return data.data;
}

async function getDownloadUrl(url, website){
    if (website === 'instagram') {
        const response = await fetch(url, {
            method: 'GET',
        });
        const content = await response.text();
        const el = document.createElement('div');
        el.innerHTML = content;
        const meta = el.querySelector("meta[property='og:video']");
        console.log('meta', meta);
        if (meta) {
            return meta.getAttribute('content');
        }
        return null;
    } else {
        const response = await fetch(`${Server_URL}/video/download`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, website })
        });
        const data = await response.json();
        return data.data;
    }
}

async function getInstagramVideos(query){
    const response = await fetch(`${Server_URL}/video/get`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            website: 'instagram',
        })
    });
    const data = await response.json();
    return data.data;
}