/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
 *
 */


/*      IMPORTS      */
const { getSetupData } = require("../utils/enmapUtils")
const { ChannelType, ThreadAutoArchiveDuration } = require("discord.js")
const { TUTORIAL } = require("../files/tutorial")

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function retention(member, client){
    const RETENTION_ID = await getSetupData(member.guild.id, "retention")
    if(RETENTION_ID == undefined || RETENTION_ID == null) return;

    const retentionChannel = await client.channels.fetch(RETENTION_ID)
    const thread = await retentionChannel.threads.create({
        name: `Bienvenue ${member.user.username}, clique ici !`,
        autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        type: ChannelType.PrivateThread,
        reason: `Thread de retention créé pour ${member.user.username}`
    })
    console.log(TUTORIAL.length)
    for (let i = 0; i < TUTORIAL.length - 2; i++) {
        await thread.sendTyping()        
        await new Promise(r => setTimeout(r, 6000));
        let message = await processLine(TUTORIAL[i], member, client)
        await thread.send(message)
    }

}

async function processLine(message, member, client){
    
    let line = "";
    line = message.replace("%member", `<@${member.id}>`)
    
    if(message.search("%like") !== -1){
        console.log("like")
    }
    if(message.search("%levels") !== -1){
        console.log("levels")
    }
    if(message.search("%missions") !== -1){
        console.log("missions")
    }

    return line
}

module.exports = {
    retention
}