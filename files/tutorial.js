exports.TUTORIAL = [
    `Bienvenue %member, vous voilà désormais sur :frMeme1:frMeme2: FRANCE MEMES !`,

    // Afficher un URL vidéo de présentation

    `Je serai votre guide pour toute la durée d'apprentissage du serveur. Si tu penses ne pas avoir besoin de tutoriel, tu peux simplement cliquer sur ce bouton « Skip » qui te termina le tutoriel. Tu peux le redémarrer n'importe quand en utilisant </tutoriel:0> ! %skip`,

    // Afficher TUTORIAL_SKIPPED

    `Tout d'abord nous te recommandons de garder tes MP ouverts pour que les robots puissent t'envoyer des messages et les notifications du serveur !`,

    `Maintenant, pour comprendre comment marche le serveur c'est assez simple… OwO`,

    `Vous avez en 1er lieu le #feed, c'est ici que tu verras tous les memes les plus aimés sur le serveur. Tu peux cliquer sur #feed pour y aller !`,

    `Car ouais ! On peut liker des memes en pressant simplement le bouton :fmLove: se trouvant sous les memes, c'est fou non ?`,

    `Va dans #images ou #videos, et like ton meme préféré !`,

    // ATTENDS DE RECEVOIR UN :fmLove: depuis le membre avec l'event message reaction add
    `%like`,

    `Le serveur contient pas mal d'automatisation, ce qui peut dérouter les utilisateurs néophytes, mais une fois qu'on a compris c'est assez simple ! 🤖`,

    `Plus tu as de :fmLove: sous ton meme, plus tu auras de chance d'avoir ton meme dans le #feed mais aussi d'XP ! *(olala mais c'est quoi l'xp TwT)*`,

    `L'XP c'est ce truc, ça te monter de rang dans le serveur ! Plus tu as un rang haut, plus tu as de récompenses chaque mois ! Pour connaître ton nombre d'XP, tapes /level ici !`,

    // Afficher TUTORIAL_LEVEL_SUCCESS et TUTORIAL_LEVEL_FAILED
    `%level`,

    `Tu peux obtenir de l'XP en recevant des likes mais aussi via les missions dans tes messages privés ! Tu peux voir toutes les missions disponibles en tapant /missions ! Vas y fais le ici ! ☺️`,

    `%missions`,

    `Normalement quand tu as liké ton meme préféré dans #images tout à l'heure, tu as déjà du recevoir un message de @FRANCE BOT dans tes messages privés.`,

    `C'est lui qui t'indiques l'état des missions que tu démarreras !`,

    `Voilà tu sais désormais à peu près tout de FRANCE MEMES, tu peux aller consulter la documentation du serveur sur https://docs.francememes.com et tu peux maintenant aller discuter avec les membres dans #discussion !`,

    `Bon memes ! :AYAYA:`,

    //Post fin du tuto ou skip du tuto :
    //Au bout d'une semaine :
    `Re, petit tip %member : Pour gérer les notifications qui ont lieu dans tes messages, vas avec @FRANCE BOT en message privé et tu peux faire un /notification dans ses messages directement.`,

    //Au bout de deux semaines :
    `Si jamais tu aimes le contenu et tu souhaites nous soutenir, tu peux t'abonner pour la modique somme d'1€ par mois sur notre Patreon ! Le don est notre première source de financement elle nous aide énormément pour maintenir les serveurs, créer des évenements et continuer de développer des fonctionnalités.
    https://patreon.com/francememes`,

]


//::Si skip alors send « 
// Sinon, ::stop le tuto
exports.TUTORIAL_SKIPPED = `Ok je vois que tu n'a pas de difficultés, profites bien du serveur !`

// SUCCESS OR FAILED VARIABLES
exports.TUTORIAL_LIKE_SUCCESS = `Trop fort, t'es vriament trop fort c'est trop fort !`
exports.TUTORIAL_LIKE_FAILED = `Pour continuer le tutoriel il faudra mettre ce petit like !` // Message au bout de 30 secondes
exports.TUTORIAL_LIKE_SKIPPED = `Ok bon c'est pas grave on passe à la suite tu réessayeras plus tard avec </tutoriel:1> !` // Message au bout de 30 secondes

exports.TUTORIAL_LEVEL_SUCCESS = `Wow super, tu te débrouilles super bien, c'est très impressionnant ! 😳`
exports.TUTORIAL_LEVEL_FAILED = `Mmh réessaye /level encore une fois ! (fais-le bien ici hein)` // Message au bout de 30 secondes
exports.TUTORIAL_LEVEL_SKIPPED = `Ok bon c'est pas grave on passe à la suite tu réessayeras plus tard avec </tutoriel:1> aaaaa !` // Message au bout de 30 secondes

exports.TUTORIAL_MISSIONS_SUCCESS = `:emoji gasm: **WAAAAAAAAAAA, t'es trop trop fort(e)!!!!!!!!!!!!!!!!!!!!!!** :emoji qui crie animé de fm:` // Message au bout de 30 secondes
exports.TUTORIAL_MISSIONS_FAILED = `euuuh fais-le ici hein ! je veux bien que tu réessaye car je n'ai rien eu… >w< essaye /missions !` // Message au bout de 30 secondes
exports.TUTORIAL_MISSIONS_SKIPPED = `Ok bon c'est pas grave on passe à la suite tu réessayeras plus tard avec </tutoriel:1> !` // Message au bout de 30 secondes

exports.TUTORIAL_IDLE = `bébouuu ?? tu es où ? :( \nréponds stp... 🥺`