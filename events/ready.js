/**
 * @author Lothaire Guée
 * @description
 *		Handler for the 'ready' event.
 */

const { getMembersToNotify } = require("../utils/mongoUtils");

 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Event called when the bot is ready after the connection to the api.
  * @param {Client} client The client that emitted the event.
 */
function execute( client ) {
    setInterval( async () => {
        const collection = client.mongo.commons.collection("retention")
        console.log( await getMembersToNotify(collection))
            // fetch channel dans l'objet, on envoie le message
        // met closed à true dans mongo pour tous les gens d'un coup afin de ne pas les notifier à nouveau
        collection.updateMany({}, {$set: {closed: true}})
    }, 1000);
}
 
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
 module.exports = {
     name: "ready",
     once : true,
     execute
 }