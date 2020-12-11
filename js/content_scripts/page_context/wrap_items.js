function wrap_item ( item ) 
{
	const item_wrapper 		 = document.createElement ( "item-wrapper" );
	const injection_target 	 = item.parentElement || item.parentNode;
	const is_already_wrapped = injection_target.tagName.toLowerCase () == "item-wrapper";
	const is_aliexpress_site = location.href.split ( "aliexpress." ).length > 1;
	const is_alibaba_site    = location.href.split ( "alibaba." ).length > 1;

	if ( is_aliexpress_site == true ) 
	{
		item.parentElement.setAttribute ( "style", "display: flex; flex-direction : row;" );
	};
	if ( is_alibaba_site == true ) 
	{
		item.parentElement.setAttribute ( "style", "display: flex; flex-direction : column;" );
	};

	if ( is_already_wrapped == false ) 
	{
		injection_target.insertBefore ( item_wrapper, item.nextElementSibling );
		item_wrapper.append ( item );

		set_label_to_item ( item_wrapper );
	};
};

function wrap_items () 
{
	const items = get_items ();

	for ( let i = 0; i < items.length; i++ ) 
	{
		wrap_item ( items[ i ] );
	};
};