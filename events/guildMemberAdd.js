/**
 * @author Lothaire Guée
 * @description
 *      This event is used to track member who entered.
 */


const { retention } = require("../modules/retention");
const { getRetention, upsertRetention } = require("../utils/mongoUtils");


/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Function called when the event 'guildMemberAdd' is emitted.
 * @param {GuildMember} member The new member object.
 */
async function execute( member, client ) {
	const collection = client.mongo.commons.collection("retention")
	// Si le membre n'existe pas on met closed à false pour lui notifier 1 semaine plus tard
	if(await getRetention(collection, member.id, "_id")){
		await upsertRetention(collection, member.id, "closed", false)
	}
	retention(member, client)
}


/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	name: "guildMemberAdd",
	execute
}
