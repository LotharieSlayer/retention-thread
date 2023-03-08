/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
*
*/


/*      IMPORTS      */
const { upsertRetention, getRetention } = require("../utils/mongoUtils")
const tutorials = require("../files/tutorial")
const { ButtonStyle } = require("discord.js");

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function skipTutorialButton(interaction, client){
    const collection = client.mongo.commons.collection("retention")
    await upsertRetention(collection, interaction.member.id, "finalized", true)
    // update skip button to disabled
    interaction.channel.send({content: tutorials.TUTORIAL_SKIPPED})
    return interaction.update({
        components: [
            {
                components: [
                    {
                        type: 2,
                        style: ButtonStyle.Danger,
                        emoji: "🛑",
                        label: `Tutoriel stoppé`,
                        custom_id: "skip_tutorial",
                        disabled: true,
                    }
                ],
            },
        ],
    });
}

module.exports = {
    skipTutorialButton
}