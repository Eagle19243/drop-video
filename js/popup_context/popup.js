const on_off_btn 		   = document.getElementsByTagName ( "set-extension-state" )[ 0 ].getElementsByTagName ( "on-off-btn" )[ 0 ]
const set_arrange_checkbox = document.getElementsByTagName ( "set-rearrange-item" )[ 0 ].getElementsByTagName ( "input" )[ 0 ];

on_off_btn.addEventListener 
(
	"click",
	() => 	
	{
		if ( on_off_btn.getAttribute ( "active" ) == "true" ) 
		{
			unset_active_colors ()
		}
		else if ( on_off_btn.getAttribute ( "active" ) == "false" ) 
		{
			set_active_colors ();
		};

		set_extension_state ( window.close );
	}
);

set_arrange_checkbox.addEventListener 
(
	"click",
	() => 	
	{
		set_rearrange_item_option ();
	}
);

chrome.storage.local.get 
(
	[ "extension_state" ],
	( info ) => 	
	{
		const state = info.extension_state;

		if ( state == "on" ) 
		{
			set_active_colors ();
		}
		else 
		{
			unset_active_colors (); 
		};
	}
);

chrome.storage.local.get 
(
	[ "rearrange_item_option" ],
	( info ) => 	
	{
		const state = info.rearrange_item_option;

		if ( state == "active" ) 
		{
			set_arrange_checkbox.checked = true;
		}
		else 
		{
			set_arrange_checkbox.checked = false;
		};
	}
);

function set_active_colors () 
{
	on_off_btn.setAttribute( "active", "true" );
	on_off_btn.setAttribute( "class", "active" );
};

function unset_active_colors () 
{
	on_off_btn.setAttribute( "active", "false" );
	on_off_btn.setAttribute( "class", "unactive" );
};
	
function set_extension_state ( callback ) 
{
	const state = on_off_btn.getAttribute ( "active" ) == "true" ? "on" : "off"

	chrome.storage.local.set 
	(
		{ extension_state : state },
		() => {
		
			if ( state == "on" ) 
			{
				set_active_colors ();
			}
			else if ( state == "off" ) 
			{
				unset_active_colors ();
			};

			callback && callback != null 
				? callback ()
				: null;

			console.log ( state );
		}	
	);
};

function set_rearrange_item_option ( callback ) 
{
	const state = set_arrange_checkbox.checked == true ? "active" : "unactive"

	chrome.storage.local.set 
	(
		{ rearrange_item_option : state },
		() => 
		{
			callback && callback != null 
				? callback ()
				: null;

			console.log ( state );
		}	
	);
};

console.log ( "popup.js loaded." );