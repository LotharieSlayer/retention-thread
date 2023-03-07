/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
*
*/


/*      IMPORTS      */
const { upsertRetention, getRetention } = require("../utils/mongoUtils")
const tutorials = require("../files/tutorial")

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function skipTutorialButton(interaction, client){
    const collection = client.mongo.commons.collection("retention")
    await upsertRetention(collection, interaction.member.id, "finalized", true)
    return interaction.reply({content: tutorials.TUTORIAL_SKIPPED, ephemeral: true})
    // update skip button to disabled
}

module.exports = {
    skipTutorialButton
}