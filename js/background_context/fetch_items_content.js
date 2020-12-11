function fetch_items_contents ( item_url, item_content_handler )   
{
	make_xhr 
	(
		{
			method : "GET",
			url : item_url,
			callback : ( xhr ) => 
			{
				item_content_handler && item_content_handler != null 
				? item_content_handler ( xhr.response )
				: null;
			}
		}
	);
};

function handle_items_contents ( xhr ) 
{
	//console.log ( "\n\n ITEM CONTENYT:" )
	//console.log ( xhr.response );
};