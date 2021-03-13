const Discord = require("discord.js")
module.exports.run = async (bot,message,args) => {
    embed = new Discord.MessageEmbed()
        .setColor("#F8E71C")
        .setAuthor("Liste de mes commandes :")
        .setDescription("Mon préfix est '$' sur ce serveur\n*Les [] sont obligatoires et les () sont facultatives*")
        .addField("Admins et Modos: ","\`\`\`\n-------------------------------------------------------------\n$down     :  affiche un message dans #🤖état disant que le bot est hors-ligne\n-------------------------------------------------------------\n$clearid  :  efface l'id de tous les messages créés avec la commande $idee\n-------------------------------------------------------------\`\`\`")
        .addField("Participants d'un ou plusieurs projets :","\`\`\`\n-------------------------------------------------------------\n$idee (ton_idée) :  créer de manière interactive un embed contenant votre idée et avec un système de vote par réaction\n\n  - si vous ajoutez votre idée juste après la commande, le bot vous demandera juste quelle type d'idée c'est.\n\n  - si vous ne mettez rien, il vous demandera quelle type d'idée c'est, puis votre idée\n-------------------------------------------------------------\`\`\`")
        .addField("Tout le monde :","\`\`\`\n-------------------------------------------------------------\n$em [emoji] :  renvoie l' [emoji] en version unicode\n-------------------------------------------------------------\n$info       :  renvoie des infos pratiques sur le serveur et le bot\n-------------------------------------------------------------\n$projet     :  renvoie une liste de tous les projets GAC en cours ou finis\n-------------------------------------------------------------\n$commande   :  renvoie une liste de toutes les commandes de @GacBot\n-------------------------------------------------------------\`\`\`")
    message.channel.send(embed)
    message.delete()
}   

module.exports.help = {
    name:"commande"
}