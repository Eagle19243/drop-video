function make_xhr ( request ) 
{
	const xhr = new XMLHttpRequest ();

	xhr.open ( request.method, request.url );
	xhr.withCredentials = request.include_credentials ? request.include_credentials : false;

	if ( request.response_type && request.response_type != null ) 
	{
		xhr.responseType = request.response_type;
	};

	if ( request.onerror && request.onerror != null ) 
	{
		xhr.onerror = request.onerror;
	};

	xhr.onload = () => 	
	{
		if ( !request.has_failed_request_callback || request.has_failed_request_callback == false ) 
		{
			if ( xhr.status == 200 && xhr.readyState == 4 ) 
			{
				request.callback && request.callback != null
					? request.callback ( xhr )
					: null;
			}
		}
		else if ( request.has_failed_request_callback && request.has_failed_request_callback == true ) 
		{
			request.callback && request.callback != null
				? request.callback ( xhr )
				: null;
		}
		else 
		{
			console.log ( `XHR ERROR` );
			console.log ( `STATUS : ${ xhr.status }` );
		};
	};

	if ( request.headers_arr && request.headers_arr != null ) 
	{
		for ( let i = 0; i < request.headers_arr.length; i++ ) 
		{
			const header = request.headers_arr[ i ];

			xhr.setRequestHeader( header.key, header.value );
		};
	};

	if ( request.method != "GET" || request.method != "get" ) 
	{
		xhr.send (  request.payload  );
	}
	else 
	{
		xhr.send ();
	};
};