const target 	= document.body; 								 // selecciona el nodo target
const observer 	= new MutationObserver ( log_mutation_details ); // Crea una instancia de observer
const config 	= 												 // Configura el observer:
{ 
	/*attributes 		: true,*/
	childList 			: true,
	subtree				: true
	/*characterData 	: true*/ 
};
 
observer.observe( target, config ); // pasa al observer el nodo y la configuracion
//observer.disconnect (); 			// Posteriormente, puede detener la observacion

function log_mutation_details ( mutation_record ) 
{
	for ( let record of mutation_record ) 
	{
		const added_nodes 	= record.addedNodes;
		const removed_nodes = record.removedNodes;

		for ( let node of added_nodes ) 
		{
			if ( node ) 
			{
				//node handlers here:
				observe_navigation_bar ( node );
				observe_search_items ( node );
				break;
			};
		};
		for ( let node of removed_nodes ) 
		{
			if ( node ) 
			{
				//node handlers here:
				observe_navigation_bar ( node );
				observe_search_items ( node );
				break;
			};
		};
	};
};