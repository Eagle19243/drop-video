function get_item_url ( item ) 
{
	if ( item )
	{
		const urls_selector_keys = 
		{
			taobao 		: [ "" ],
			aliexpress 	: [ "item-title" ],
			alibaba 	: [ "elements-title-normal" ]
		};

		for ( keys in urls_selector_keys ) 
		{
			const selectors = urls_selector_keys [ keys ];

			for ( let i = 0; i < selectors.length; i ++ ) 
			{
				const urls 				= item.getElementsByClassName ( selectors[ i ] );
				const is_target_website = location.host.split ( keys ).length > 1; 

				if ( urls.length > 0 && is_target_website == true ) 
				{
					//console.log ( `target website selectors: ${ keys }` );
					//console.log ( `${ selectors.length } urls selectors. ` );

					return urls[ i ].href;
					break;
				};
			};
		};
	};
};