/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
*
*/


/*      IMPORTS      */
const { getSetupData, setupRetention, retentionLikes, retentionLevels, retentionMissions, retentionFinalized } = require("../utils/enmapUtils")
const { ChannelType, ThreadAutoArchiveDuration, EmbedBuilder } = require("discord.js")
const tutorials = require("../files/tutorial")
const { upsertRetention, getRetention } = require("../utils/mongoUtils")
// const axios = require('axios');

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function retention(member, client){
    const RETENTION_ID = await getSetupData(member.guild.id, "retention")
    if(RETENTION_ID == undefined || RETENTION_ID == null) return;
    const collection = client.mongo.commons.collection("retention")

    collection.deleteMany({})

    let isAlreadyDone = await getRetention(collection, member.id, "finalized")
    if(isAlreadyDone === true) return;
    const retentionChannel = await client.channels.fetch(RETENTION_ID)
    const thread = await retentionChannel.threads.create({
        name: `Bienvenue ${member.user.username}, clique ici !`,
        autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        type: ChannelType.PrivateThread,
        reason: `Thread de retention créé pour ${member.user.username}`
    })
    console.log(tutorials.TUTORIAL.length)
    thread.send("<@"+member.id+">").then(async (msg) => {
        await new Promise(r => setTimeout(r, 6000))
        await msg.delete()
    })
    const changeStream = collection.watch()
    for (let i = 0; i < tutorials.TUTORIAL.length - 2; i++) {
        await thread.sendTyping()
        await new Promise(r => setTimeout(r, 6000)); // remettre à 6000
        let embed = await processLine(tutorials.TUTORIAL[i], member, thread, collection, changeStream)
        await thread.send({embeds: [embed]})
    }
    upsertRetention(collection, member.id, "finalized", true)
}

async function processLine(message, member, thread, collection, changeStream){
    
    const embed = new EmbedBuilder()
        .setColor(0x303135)
        
        let line = ""
        if(message.search("%member") !== -1){
            line = message.replace("%member", `<@${member.id}>`)
        } else line = message
        
        if(message.search("%like") !== -1){
            await upsertRetention(collection, member.id, "likes", true)
            // let requete = await axios.post('http://localhost:9009/rt-likes', {"memberId":member.id})
            let isDone = (await getRetention(collection, member.id, "likes"))
            console.log(isDone)
            let cancelled = false
            changeStream.once('change', (next) => {
                if(next._id === member.id && 
                    next.updateDescription.updatedFields.likes){
                        isDone = true
                    }
                })
                let timeout1 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_LIKE_FAILED)
                    thread.send({embeds:[embed]})
                }, 60000); // remettre à 60000
                let timeout2 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_LIKE_SKIPPED)
                    thread.send({embeds:[embed]})
                    cancelled = true
                }, 120000); // remettre à 120000
                
                while(isDone != true && cancelled != true){
                    await new Promise(r => setTimeout(r, 2000));
                }
                
                clearTimeout(timeout1)
                clearTimeout(timeout2)
                embed.setDescription(tutorials.TUTORIAL_LIKE_SUCCESS)
                return embed
            }
            if(message.search("%level") !== -1){
                await upsertRetention(collection, member.id, "levels", true)
                // let requete = await axios.post('http://localhost:9009/rt-levels', {"memberId":member.id})
                let isDone = (await getRetention(collection, member.id, "levels"))
                console.log(isDone)
                let cancelled = false
                changeStream.once('change', (next) => {
                    if(next._id === member.id && 
                        next.updateDescription.updatedFields.levels){
                            isDone = true
                        }
                    })
                let timeout1 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_LEVEL_FAILED)
                    thread.send({embeds:[embed]})
                }, 60000); // remettre à 60000
                let timeout2 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_LEVEL_SKIPPED)
                    thread.send({embeds:[embed]})
                    cancelled = true
                }, 120000); // remettre à 120000
                while(isDone != true && cancelled != true){
                    await new Promise(r => setTimeout(r, 2000));
                }
                clearTimeout(timeout1)
                clearTimeout(timeout2)
                embed.setDescription(tutorials.TUTORIAL_LEVEL_SUCCESS)
                return embed
            }
            if(message.search("%missions") !== -1){
                await upsertRetention(collection, member.id, "missions", true)
                // let requete = await axios.post('http://localhost:9009/rt-missions', {"memberId":member.id})
                let isDone = (await getRetention(collection, member.id, "missions"))
                console.log(isDone)
                let cancelled = false
                changeStream.once('change', (next) => {
                    if(next._id === member.id && 
                        next.updateDescription.updatedFields.missions){
                            isDone = true
                        }
                    })
                let timeout1 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_MISSIONS_FAILED)
                    thread.send({embeds:[embed]})
                }, 60000); // remettre à 60000
                let timeout2 = setTimeout(() => {
                    embed.setDescription(tutorials.TUTORIAL_MISSIONS_SKIPPED)
                    thread.send({embeds:[embed]})
                    cancelled = true
                }, 120000); // remettre à 120000
                while(isDone != true && cancelled != true){
                    await new Promise(r => setTimeout(r, 2000));
                }
                clearTimeout(timeout1)
                clearTimeout(timeout2)
                embed.setDescription(tutorials.TUTORIAL_MISSIONS_SUCCESS)
                return embed
            }
            embed.setDescription(line)
            return embed
        }
        
        module.exports = {
            retention
        }