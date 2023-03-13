/**
 * @author Lothaire Guée
 * @description
 * 		The file contains the functions to gain retention from members in the discussion channel.
*
*/


/*      IMPORTS      */
const { getSetupData } = require("../utils/enmapUtils")
const { ChannelType, ThreadAutoArchiveDuration, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const tutorials = require("../files/tutorial")
const { upsertRetention, getRetention, getMembersToNotify } = require("../utils/mongoUtils")
let isDone;

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

async function retention(member, client){
    const RETENTION_ID = await getSetupData(member.guild.id, "retention")
    if(RETENTION_ID == undefined || RETENTION_ID == null) return;
    const collection = client.mongo.commons.collection("retention")

    // Est ce déjà fait ?
    let isAlreadyDone = await getRetention(collection, member.id, "finalized")
    if(isAlreadyDone === true) return;

    // Membre entrant, on crée le thread
    const retentionChannel = await client.channels.fetch(RETENTION_ID)
    const thread = await retentionChannel.threads.create({
        name: `Bienvenue ${member.user.username}, clique ici !`,
        autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        type: ChannelType.PrivateThread,
        reason: `Thread de retention créé pour ${member.user.username}`
    })
    console.log(tutorials.TUTORIAL.length)
    thread.send("<@"+member.id+">, attends un instant ton tutoriel va commencer.").then(async (msg) => {
        await new Promise(r => setTimeout(r, 1000))
        await msg.delete()
    })

    await upsertRetention(collection, member.id, "thread", thread.id)
    await upsertRetention(collection, member.id, "datetime", Date.now())
    await upsertRetention(collection, member.id, "closed", false)

    // Pipeline pour le changement de valeur de finalized
    const pipeline = [ { $match: { finalized: true } } ];
    const changeStream = collection.watch(pipeline)
    
    changeStream.on('change', (next) => {
        if(next.documentKey._id === member.id && 
            next.updateDescription.updatedFields.finalized){
                isDone = true
        }
    })

    // Envoi des messages
    for (let i = 0; i < tutorials.TUTORIAL.length - 2; i++) {
        let message = await processLine(tutorials.TUTORIAL[i], member, thread, collection, changeStream)
        await thread.send(message)
        await new Promise(r => setTimeout(r, 1000));
        await thread.sendTyping()
        await new Promise(r => setTimeout(r, 5000));
        if(isDone === true) break
    }
    await upsertRetention(collection, member.id, "finalized", true)
}

async function processLine(message, member, thread, collection, changeStream){
    const embed = new EmbedBuilder()
        .setColor(0x303135)

    let components = []
        
    let line = message

    // ------- VARIABLES ------- //

    // %skip pour stopper le tutoriel
    if(line.search("%skip") !== -1){
        line = line.replace("%skip", "")
        embed.setDescription(line)
        // add button on message "Stop emoji, Stopper le tutoriel"
        components = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("skip_tutorial")
                .setEmoji("🛑")
                .setLabel("Stopper le tutoriel")
                .setStyle(ButtonStyle.Danger)
        );        
    }
    
    // %member pour remplacer par le membre
    if(line.search("%member") !== -1){
        line = line.replace("%member", `<@${member.id}>`)
    }
    
    // %like pour remplacer par l'intéraction avec un like
    if(line.search("%like") !== -1){
        // Update du coté de FRANCE BOT
        // await upsertRetention(collection, member.id, "likes", true)
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
            cancelled = true
        }, 120000); // remettre à 120000
        
        while(isDone != true && cancelled != true){
            await new Promise(r => setTimeout(r, 2000));
        }
        
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        if(!cancelled)
        embed.setDescription(tutorials.TUTORIAL_LIKE_SUCCESS)
    }

    // %level pour remplacer par l'intéraction avec le /level
    if(line.search("%level") !== -1){
        // Update du coté de FRANCE BOT
        // await upsertRetention(collection, member.id, "levels", true)
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
            cancelled = true
        }, 120000); // remettre à 120000
        while(isDone != true && cancelled != true){
            await new Promise(r => setTimeout(r, 2000));
        }
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        if(!cancelled)
        embed.setDescription(tutorials.TUTORIAL_LEVEL_SUCCESS)
    }

    // %missions pour remplacer par l'intéraction avec le /missions
    if(line.search("%missions") !== -1){
        // Update du coté de FRANCE BOT
        // await upsertRetention(collection, member.id, "missions", true)
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
            cancelled = true
        }, 120000); // remettre à 120000
        while(isDone != true && cancelled != true){
            await new Promise(r => setTimeout(r, 2000));
        }
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        if(!cancelled)
        embed.setDescription(tutorials.TUTORIAL_MISSIONS_SUCCESS)
    }

    if(line.search("%") === -1){
        embed.setDescription(line)
    }

    if(components.length === 0)
        return {embeds:[embed]}
    else
        return {embeds:[embed], components:[components]}
}

async function verifyEachWeek(client){
    setInterval( async () => {
        const collection = await client.mongo.commons.collection("retention")
        const members = await getMembersToNotify(collection)
        members.forEach( async (member) => {
            // On récupère le channel de retention
            const channel = await client.channels.fetch(member.thread)
            // On envoie le message
            channel.send("<@"+member._id+"> " + tutorials.TUTORIAL_WEEKLY_REMINDER)
        })
        const day = 86400000
        const week = 604800000
        collection.updateMany({$and: [ {datetime: { $lt: Date.now() - week - day }}, {closed: false} ]}, {$set: {closed: true}})
    }, 1000);
}
    
module.exports = {
    retention,
    verifyEachWeek
}