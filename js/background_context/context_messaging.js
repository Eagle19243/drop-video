function handle_request ( message, sender, sendResponse ) 
{
    const method    = message.method;
    const payload   = message.payload; 

    switch ( method ) 
    {
        case "FETCH_ITEM_CONTENT":
            fetch_items_contents ( payload.item_url, sendResponse );
        	break;
    };

    return true;
};

chrome.runtime.onMessage.addListener ( handle_request );