/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track member who entered.
 */


const { retention } = require("../modules/retention");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberAdd' is emitted.
 * @param {GuildMember} member The new member object.
 */
async function execute( member, client ) {
	retention(member, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberAdd",
	execute
}
