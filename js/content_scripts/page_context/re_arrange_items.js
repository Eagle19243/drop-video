function re_arrange_item_with_video_at_top ( item_with_video ) 
{
	const parent_container = item_with_video.parentElement;

	chrome.storage.local.get 
	(
		[ "rearrange_item_option" ],
		( info ) => 
		{
			const state = info.rearrange_item_option;

			if ( state == "active" ) 
			{
				item_with_video.remove ();
				parent_container.prepend ( item_with_video );
			};
		}
	);
};