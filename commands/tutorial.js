/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'tutorial'.
 *      Réinitialise le tutoriel pour un membre.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { upsertRetention } = require("../utils/mongoUtils")
const { retention } = require("../modules/retention")

/* ----------------------------------------------- */
/* COMMAND BUILD                                   */
/* ----------------------------------------------- */
const slashCommand = new SlashCommandBuilder()
    .setName("tutoriel")
    .setDescription(
        "[tutorial] Recommencer le tutoriel de FRANCE MEMES."
    )
    .setDefaultPermission(false);

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'ping'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction, client) {
    const collection = client.mongo.commons.collection("retention")
    upsertRetention(collection, member.id, "finalized", false)
    retention(interaction.member, client)
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
