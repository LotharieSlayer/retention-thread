/**
 * @author Lothaire Guée
 * @description
 *		Handler for the 'ready' event.
 */

const { verifyEachWeek } = require("../modules/retention");

 /* ----------------------------------------------- */
 /* FUNCTIONS                                       */
 /* ----------------------------------------------- */
 /**
  * Event called when the bot is ready after the connection to the api.
  * @param {Client} client The client that emitted the event.
 */
function execute( client ) {
    verifyEachWeek(client)
}
 
 
 /* ----------------------------------------------- */
 /* MODULE EXPORTS                                  */
 /* ----------------------------------------------- */
module.exports = {
    name: "ready",
    once : true,
    execute
}