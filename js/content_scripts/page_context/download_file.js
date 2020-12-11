function file_to_blob ( blob, filename, extension ) 
{
    const link = document.createElement ( 'a' );

    link.download = `${ filename }.${ extension }`;
    link.href     = URL.createObjectURL ( blob );
    link.click ();

    URL.revokeObjectURL ( link.href );
};

function fetch_file ( url_, file_stream_handler ) {
    make_xhr 
    (
        {
            response_type : "blob",
            method : "GET",
            url : url_,
            callback : ( xhr ) => 
            {
                const file_stream = xhr.response;

                file_stream_handler ( file_stream );
            }
        }
    );
};

function download_file ( url, filename, extension, completed_loaded_callback )  
{       
    fetch_file 
    ( 
        url,  
        ( file_blob_data_stream ) => 
        {
            file_to_blob ( file_blob_data_stream, filename, extension );

            completed_loaded_callback && completed_loaded_callback != null 
                ? completed_loaded_callback ()
                : null;
        }
    );
};