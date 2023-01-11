const { setupRetention } = require("../utils/enmapUtils");

async function addSetupCommand(slashCommand) {
    slashCommand.addSubcommand((subcommand) =>
    subcommand
        .setName("retention")
        .setDescription(
            "Définir/Supprimer le channel où sera fait la retention. (Il ne peut n'y en avoir qu'un)"
        )
    )
}

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */
/**
 * Fonction appelé quand la commande est 'setup'
 * @param {CommandInteraction} interaction L'interaction généré par l'exécution de la commande.
 */
async function execute(interaction) {
    switch (interaction.options._subcommand) {
        case "retention":
            if (setupRetention.get(interaction.guild.id) === undefined) {
                setupRetention.set(interaction.guild.id, interaction.channel.id);
                await interaction.reply({
                    content: `Channel pour la retention ajouté au serveur dans <#${interaction.channel.id}> !`,
                    ephemeral: true,
                });
            } else {
                setupRetention.delete(interaction.guild.id);
                await interaction.reply({
                    content: `Channel pour la retention supprimé du serveur !`,
                    ephemeral: true,
                });
            }
            break;
    }
}

module.exports = {
    addSetupCommand,
    execute,
};
