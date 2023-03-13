
// Collections


/**
 * Mettre à jour l'avancement du tutoriel de retention d'un membre
 * key est member.id
 * value est un booleen, true pour c'est passé sinon false
 * 
 * @param {*} collection 
 * @param {string} key 
 * @param {string} retention 
 * @param {*} value 
 */
async function upsertRetention(collection, key, retention, value){
    const filter = { _id: key };
    const options = { upsert: true };
    await collection.updateOne(filter, {
        $set: {
            [retention]: value
        }
    }, options)
}

/**
 * Récupérer l'avancement du tutoriel de retention d'un membre
 * @param {*} collection 
 * @param {string} key 
 * @param {string} retention *
 * @returns {boolean} true si c'est passé, false sinon
 */
async function getRetention(collection, key, retention){
    const query = { _id: key };
    const options = {
        projection: {
            _id: 0,
            [retention]: 1
        }
    };
    let result = await collection.findOne(query, options)
    if(result == null) return null
    return result[retention] ? result[retention] : null
}

/**
 * Récupérer les membres à notifier
 * @param {*} collection 
 * @returns {Array} liste des membres à notifier
 */
async function getMembersToNotify(collection){

    const day = 86400000
    const week = 604800000

    const query = { datetime: { $lt: Date.now() - week - day }, closed: false };
    const options = {
        projection: {
            _id: 1,
            thread: 1,
            closed: 1,
        }
    };
    return await collection.find(query, options).toArray();
}

module.exports = {
    upsertRetention,
    getRetention,
    getMembersToNotify
};