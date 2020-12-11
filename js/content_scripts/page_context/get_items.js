function get_items () 
{
	const items_selector_keys = 
	{
		taobao 		: [ "" ],
		aliexpress 	: [ "list-item" ],
		alibaba 	: [ "J-offer-wrapper" ]
	};
	
	for ( keys in items_selector_keys ) 
	{
		const selectors = items_selector_keys [ keys ];

		for ( let i = 0; i < selectors.length; i ++ ) 
		{
			const items_in_page 	= document.body.getElementsByClassName ( selectors[ i ] );
			const is_target_website = location.host.split ( keys ).length > 1; 
			let items 			    = [];

			//filter items already caught:
			for ( item of items_in_page ) 
			{
				const is_already_labelled = item.parentElement.getAttribute ( "has_video" ) ? true : false; 

				if ( is_already_labelled == false ) 
				{
					items.push ( item );
				}
				else 
				{
					console.log ( `Item already caught.` );
				};
			};

			if ( items.length > 0 && is_target_website == true ) 
			{
				console.log ( `target website selectors: ${ keys }` );
				console.log ( `${ selectors.length } items selectors. ` );

				return items;
				break;
			};
		};
	};
};