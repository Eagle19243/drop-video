/*
	SET ACTIVE STATE FOR EXTENSION RUN:
*/
chrome.storage.local.get 
(
	[ "extension_state" ],
	( info ) => 	
	{
		const state = info.extension_state;

		if ( !state || state == null ) 
		{
			chrome.storage.local.set 
			(
				{ extension_state : "on" },
				() => 	
				{
					console.log ( "Extension is on." );
				} 
			);
		};
	}
);

chrome.storage.local.set 
(
	{ rearrange_item_option : "active" }
);

chrome.storage.onChanged.addListener 
(
	( keys ) => 
	{
		chrome.tabs.query 
		(
			{ active : true },
			( tab_arr ) => 
			{
				const tab = tab_arr[ 0 ];

				if ( tab.url && tab.url.split ( "https" ).length > 1 || tab.url && tab.url.split ( "http" ).length > 1 ) 
				{
					//Reload website when user turn on or off extension:
					chrome.tabs.executeScript 
					( 
						tab.id, 
						{ code : "location.reload ();" }
					);
				};
			}
		);
	}
);