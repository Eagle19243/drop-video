const loading_bar = 
{
	create : () => 
	{
		const span = document.createElement ( "span" );

		span.setAttribute( "class", "loading_bar" );

		return span;
	},
	inject : () => 
	{
		const target 			  = document.body;
		const is_already_injected = target.getElementsByClassName ( "loading_bar" ).length > 0;

		if ( is_already_injected == false ) 
		{
			target.append (loading_bar.create () );
		};
	},
	show : () => 
	{
		const loading_bar = document.body.getElementsByClassName ( "loading_bar" )[ 0 ];

		if ( loading_bar ) 
		{
			loading_bar.setAttribute ( "style", "display: flex;" );
		};
	},
	hide : () => 
	{
		const loading_bar = document.body.getElementsByClassName ( "loading_bar" )[ 0 ];

		if ( loading_bar ) 
		{
			loading_bar.setAttribute ( "style", "display: none;" );
		};
	},
	set_text : ( text ) => 
	{
		const loading_bar = document.body.getElementsByClassName ( "loading_bar" )[ 0 ];

		if ( loading_bar ) 
		{
			loading_bar.innerText = text;
		};
	}
};