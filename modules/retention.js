/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
 *
 */


/*      IMPORTS      */
const { getSetupData, setupRetention, retentionLikes, retentionLevels, retentionMissions, retentionFinalized } = require("../utils/enmapUtils")
const { ChannelType, ThreadAutoArchiveDuration } = require("discord.js")
const tutorials = require("../files/tutorial")

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
    console.log(tutorials.TUTORIAL.length)
    if(retentionFinalized.get(member.id) === true && retentionFinalized.get(member.id) != undefined)
    for (let i = 0; i < tutorials.TUTORIAL.length - 2; i++) {
        await thread.sendTyping()        
        await new Promise(r => setTimeout(r, 6000));
        let message = await processLine(tutorials.TUTORIAL[i], member, thread)
        await thread.send(message)
    }
    retentionFinalized.set(member.id, true)

}

async function processLine(message, member, thread){
    
    let line = ""
    if(message.search("%member") !== -1){
        line = message.replace("%member", `<@${member.id}>`)
    } else line = message
    
    if(message.search("%like") !== -1){

        let likeBoolVerification = false
        while(likeBoolVerification != true){
            if(retentionLikes.get(member.id) === true && retentionLikes.get(member.id) != undefined){
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                return tutorials.TUTORIAL_LIKE_SUCCESS
                likeBoolVerification = true
            }
            await new Promise(r => setTimeout(r, 2000));
        }
        var timeout1 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_LIKE_FAILED)
        }, 60000));
        var timeout2 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_LIKE_SKIPPED)
            clearInterval(interval);
        }, 120000));
    }
    if(message.search("%level") !== -1){

        let levelBoolVerification = false
        while(levelBoolVerification != true){
            if(retentionLevels.get(member.id) === true && retentionLevels.get(member.id) != undefined){
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                return tutorials.TUTORIAL_LEVEL_SUCCESS
                levelBoolVerification = true
            }
            await new Promise(r => setTimeout(r, 2000));
        }
        var timeout1 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_LEVEL_FAILED)
        }, 60000));
        var timeout2 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_LEVEL_SKIPPED)
            clearInterval(interval);
        }, 120000));
    }
    if(message.search("%missions") !== -1){
        
        let missionsBoolVerification = false
        while(missionsBoolVerification != true){
            if(retentionMissions.get(member.id) === true && retentionMissions.get(member.id) != undefined){
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                return tutorials.TUTORIAL_MISSIONS_SUCCESS
                missionsBoolVerification = true
            }
            await new Promise(r => setTimeout(r, 2000));
        }
        var timeout1 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_MISSIONS_FAILED)
        }, 60000));
        var timeout2 = await new Promise(r => setTimeout(() => {
            thread.send(tutorials.TUTORIAL_MISSIONS_SKIPPED)
            clearInterval(interval);
        }, 120000));
    }
    return line
}

module.exports = {
    retention
}