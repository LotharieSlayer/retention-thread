
// Collections


/**
 * Mettre à jour l'avancement du tutoriel de retention d'un membre
 * key est member.id
 * value est un booleen, true pour c'est passé sinon false
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

async function getRetention(collection, key, retention){
    const query = { _id: key };
    const options = {
        projection: {
            _id: 0,
            [retention]: 1
        }
    };
    return await collection.findOne(query, options);
}

module.exports = {
    upsertRetention,
    getRetention,
};