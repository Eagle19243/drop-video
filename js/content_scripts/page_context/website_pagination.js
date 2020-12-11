function convert_dinamic_anchors_to_static_anchors () //makes the numeration buttons refresh the page to the next page instead of load it dinamically.
{
	const navigations = 
	{
		alibaba 	: document.body.querySelectorAll ( '[class="seb-pagination"]' )[ 0 ],
		aliexpress 	: document.body.querySelectorAll ( '[class="list-pagination"]' )[ 0 ]
	};

	for ( let navigation in navigations ) 
	{
		if ( navigations[ navigation ] ) 
		{
			let number_buttons = [];

			switch ( navigation ) 
			{
				case "alibaba":
					number_buttons = navigations[ navigation ].querySelectorAll ( '[class="seb-pagination__pages"]' )[ 0 ]
										? navigations[ navigation ].querySelectorAll ( '[class="seb-pagination__pages"]' )[ 0 ].children
										: [];
					break;
				case "aliexpress":
					number_buttons = navigations[ navigation ].querySelectorAll ( '[class="next-pagination-list"]' )[ 0 ] 
										? navigations[ navigation ].getElementsByClassName ( "next-pagination-item" )
										: [];
					break;
			};

			for ( let i = 0; i < number_buttons.length; i++ ) 
			{
				const button = number_buttons[ i ];

				button.addEventListener
				(
					"click",
					( event ) => 
					{
						event.stopPropagation ();

						console.log ( button.innerText );


						if ( isNaN ( button.innerText ) == false ) 
						{
							go_to_page ( button.innerText );
						}
						else 
						{
							go_to_page ( (get_current_page () + 1) );
						}
					}
				);
			};
		};
	};
};

function get_current_page () 
{
	const has_page_search = location.href.split ( "page=" ).length > 1;
	let page = 0;

	if ( has_page_search == true ) 
	{
		page = location.href.split ( "page=" )[ 1 ];

		return parseInt ( page );
	}
	else 
	{
		return 1;
	};
};

function go_to_page ( page_number ) 
{
	const current_url 	  = location.href;
	const has_page_search = current_url.split ( "&page=" ).length > 1 || current_url.split ( "page=" ).length > 1;

	if ( has_page_search == true ) 
	{
		const new_url = current_url.split ( "page=" )[ 0 ] + `&page=${ page_number }` ;

		location.href = new_url;
	}
	else 
	{
		location.href = location.href + `&page=${ page_number }`;
	};
};

function observe_navigation_bar ( node ) 
{
	const node_html = node.outerHTML;
	const matching_keywords = 
	[
		`next-pagination-item`,
		`seb-pagination__pages-link`
	];

	for ( matching_key of matching_keywords ) 
	{
		if ( node_html && node_html.split ( matching_key ).length > 1 ) 
		{
			console.log ( "pagination bar found." );

			convert_dinamic_anchors_to_static_anchors ();

			break;
		};
	};
};