/**
 * @author Lothaire Guée
 * @description
 *		It manage the slash commands.
 */

const { InteractionType } = require("discord.js");
const { skipTutorialButton } = require("../modules/skip.js")

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * The handler for the event 'interactionCreate'.
 * It is called whenever an interaction is created.
 * It can be a button pressed, a slash command executed, etc.
 * @param {CommandInteraction} interaction The interaction that triggered the event.
 * @param {Client} client The client that created the interaction.
 */
function execute(interaction, client) {
    if (interaction.type === InteractionType.MessageComponent) {

        if (interaction.customId === "skip_tutorial") {
            skipTutorialButton(interaction, client);
        }
        
    }
    
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    name: "interactionCreate",
    execute,
};
