function create_label_display ( label_text ) 
{
	const tag_name = "videos-checker-extension";
	const html 	   = 
	`
	<!--<${ tag_name }>-->
		<display-label>
			<text> ${ label_text } </text>
		</display-label>
	<!--</${ tag_name }>-->
	`;
	const label_display = document.createElement ( tag_name ); label_display.innerHTML = html;

	return label_display;
};
function set_label_to_item ( item ) 
{
	const label 			  = "has_video";
	const is_already_labelled = item.getAttribute ( "has_video" ) ? true : false; 

	if ( is_already_labelled == false ) 
	{
		//item.prepend ( create_label_display ( "Contents video" ) );
		item.setAttribute ( label, "true" );
	};
};