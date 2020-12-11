function message_to_background ( method, payload, callback ) 
{
    const com = 
    {
        method  : method,
        payload : payload
    };

    function print_response ( response ) 
    {
        console.log( response );
    };

    callback = !callback || callback == null
        ? print_response
        : callback;

    chrome.runtime.sendMessage ( com, callback );
};