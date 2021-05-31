const Discord = require("discord.js")
module.exports.run = async (bot,message,args, disbut) => {

    let btn = new disbut.MessageButton()
        .setLabel('Suivant')
        .setStyle('blurple')
        .setID('nextCmd0');
    let embed = new Discord.MessageEmbed()
        .setColor("#F8E71C")
        .setAuthor("Liste de mes commandes :")
        .setDescription("Mon préfix est '$' sur ce serveur\n*Les [] sont obligatoires et les () sont facultatives*")
        .addField("Pour les Admins et Modos: ","\`\`\`\n-------------------------------------------------------------\n$down        :  affiche un message dans #🤖état disant que le bot est hors-ligne\n-------------------------------------------------------------\n$clearid     :  efface l'id de tous les messages créés avec la commande $idee\n-------------------------------------------------------------\n$serverup    : envoie un message dans <#828302257694048297> indiquant que le serveur Minecraft est connecté\n-------------------------------------------------------------\n$serverdown  :  envoie un message dans <#828302257694048297> indiquant que le serveur Minecrat est indisponible\`\`\`");
    message.channel.send({button:btn,embed:embed});
    message.delete();
}   

module.exports.help = {
    name:"commande",
    aliases:["command","commands","commandes"]
}