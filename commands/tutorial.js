/**
 * @author Lothaire Guée
 * @description
 *      Contient la commande 'tutorial'.
 *      Réinitialise le tutoriel pour un membre.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { upsertRetention, getRetention } = require("../utils/mongoUtils")
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
    if(await getRetention(collection, interaction.member.id, "inProgress") + 60000 > Date.now())
        return interaction.reply({content: "Tu as déjà un tutoriel en cours, attends qu'il soit terminé.", ephemeral: true})
    await upsertRetention(collection, interaction.member.id, "inProgress", Date.now())
    await upsertRetention(collection, interaction.member.id, "finalized", false)
    await interaction.reply({content: "Le tutoriel va commencer, tu vas recevoir un ping !", ephemeral: true})
    await retention(interaction.member, client)
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
    data: slashCommand,
    execute,
};
