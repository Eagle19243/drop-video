function check_videos_in_item ( parsed_html ) 
{
	const video = 
	{
		taobao 		: undefined,
		aliexpress 	: parsed_html.innerHTML.split ( '"videoId":' ).length > 1 && parsed_html.innerHTML.split ( '"videoUid":"' ).length > 1
						? 
						(
							`https://cloud.video.taobao.com/play/u/${ parsed_html.innerHTML.split ( '"videoUid":"' )[1].split ( '"' )[ 0 ] }/p/1/e/6/t/10301/${ parsed_html.innerHTML.split ( '"videoId":' )[1].split ( ',' )[ 0 ] }.mp4`
						)
						: undefined,
		alibaba 	: parsed_html.innerHTML.split ( `"productVideoUrl":{"sd":{"video_url":"` ).length > 1
						? ( parsed_html.innerHTML.split ( `"productVideoUrl":{"sd":{"video_url":"` )[ 1 ].split ( `"` )[ 0 ] ).split ( "\\" ).join ( "" )
						: undefined
	};

	if ( video.taobao || video.aliexpress || video.alibaba ) 
	{
		return video.taobao || video.aliexpress || video.alibaba;
	}
	else 
	{
		return undefined;
	};
};

function fetch_item_video_url ( item, handle_video_url ) 
{
	const item_url = get_item_url ( item );
	
	if ( item_url ) 
	{
		fetch_items_contents 
		( 
			item_url, 
			( xhr_response ) => 
			{
				const parsed_html = document.createElement ( "html" ); parsed_html.innerHTML = xhr_response;
				const video_url   = check_videos_in_item ( parsed_html );
				const has_videos  = video_url && video_url != null;

				if ( has_videos == true ) 
				{
					console.log ( "Has video : true" );
					console.log ( video_url );

					handle_video_url && handle_video_url != null
					? handle_video_url ( video_url )
					: null;
				}
				else 
				{
					console.log ( "Has video : false" );
				};
			} 
		);
	};
};

function fetch_items_video_urls ( item_with_video_handler ) 
{
	const items = get_items ();

	if ( items ) 
	{
		for ( let i = 0; i < items.length; i++ ) 
		{
			setTimeout 
			(
				() => 
				{
					//items[ i ].scrollIntoView ( true );

					fetch_item_video_url 
					( 
						items[ i ], 
						( video_url_ ) => 
						{
							if ( video_url_ ) 
							{
								//console.log ( "\n\n Video found." );
								//console.log ( video_url_ );
								//console.log ( items[ i ] );

								const item_with_video = { item : items[ i ], video_url : video_url_ };

								item_with_video_handler && item_with_video_handler != null
								? item_with_video_handler ( item_with_video )
								: null;
							};
						}
					);
				}, 
				800 * i
			);
		};
	};
};