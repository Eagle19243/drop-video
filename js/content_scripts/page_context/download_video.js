function download_video ( video_url, callback ) 
{
	if ( video_url.split ( "https" ).length <= 1 ) 
	{
		video_url = video_url.split ( "http" ).join( "https" );
	};
	
	download_file ( video_url, Date.now (), "mp4", callback );
};