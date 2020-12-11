function create_download_button_for_item ( video_url ) 
{
    const tag_name = "download-vid";
    const html     = 
    `
    <!--<${ tag_name }>-->
        <btn> Download video </btn>
    <!--</${ tag_name }>-->
    `;
    const download_btn = document.createElement ( tag_name ); download_btn.innerHTML = html;
    const button = download_btn.getElementsByTagName ( "btn" )[ 0 ];

    button.addEventListener
    (
        "click", 
        ( event ) => 
        {
            loading_bar.set_text ( "Downloading video... " );
            loading_bar.show ();

            download_video ( video_url, loading_bar.hide );

            event.stopPropagation ();
        }
    );

    return download_btn;
};