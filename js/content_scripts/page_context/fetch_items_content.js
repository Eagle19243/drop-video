function fetch_items_contents ( item_url_, item_content_handler )   
{
	message_to_background ( "FETCH_ITEM_CONTENT", { item_url : item_url_ }, item_content_handler );
};