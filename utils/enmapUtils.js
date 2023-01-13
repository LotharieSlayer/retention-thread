/**
 * @author Lothaire Guée
 * @description
 *      Contains the function linked to the database.
 */


/* ----------------------------------------------- */
/* DATABASES INITILIZATION                         */
/* ----------------------------------------------- */
const Enmap = require("enmap");

// SETUP
const setupRetention = new Enmap({name: "setup_retention"});

const retentionLikes = new Enmap({name: "retention_tutorial_likes"});
const retentionLevels = new Enmap({name: "retention_tutorial_levels"});
const retentionMissions = new Enmap({name: "retention_tutorial_missions"});
const retentionFinalized = new Enmap({name: "retention_tutorial_finalized"});

retentionLikes.clear()
retentionLevels.clear()
retentionMissions.clear()

/* ----------------------------------------------- */
/* FUNCTIONS                                       */
/* ----------------------------------------------- */

/**
 * Commentaires
 * @returns {String} Channel ID by passing the Guild ID and the type of
 * the channel you want to search.
 * Example : getSetupData(GUILD_ID, "presentation") but it can be : "proposition" or "discussion"
 */
async function getSetupData(id, type){

    switch (type) {
        case "retention":
            // Here id is the guild
            return await getResultsValue(setupRetention, id)
        default:
            break;
    }

}

async function getResultsKey(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = key;
    })
    return result;
}

async function getResultsValue(db, id){
    let result;
    db.fetchEverything()?.forEach( async (value, key) => {
        if(key === id)
            result = value;
    })
    return result;
}

/* ----------------------------------------------- */
/* MODULE EXPORTS                                  */
/* ----------------------------------------------- */
module.exports = {
	getSetupData,
    setupRetention,
    retentionLikes,
    retentionLevels,
    retentionMissions,
    retentionFinalized
}