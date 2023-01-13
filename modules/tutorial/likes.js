/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
 *
 */

const { retentionLikes } = require("../../utils/enmapUtils")
let allReactions = retentionLikes.fetchEverything();

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function likes(reaction, user, client){
    console.log(reaction)
    console.log(allReactions)
    if(reaction.emoji.name === "fmLove" && !allReactions.has(user.id)){
        allReactions.set(user.id, true)
        retentionLikes.set(user.id, true)
        console.log("j'ai set l'utilisateur")
    }
}

module.exports = {
    likes
}