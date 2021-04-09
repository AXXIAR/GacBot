const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    await message.delete()
    embed = new Discord.MessageEmbed()
        .setAuthor("Infos Minecraft :")
        .setColor("#F8E71C")
        .addField("Description","GAC studios possède son propre serveur Minecraft.\n Il est entièrement développé par <@615283813723144194>")
        .addField("Status","Le serveur est encore en plein développement, vous serez informés quand il sera finit")
        .addField("News", "A chaque fois que le serveur ouvre ou ferme, un message sera envoyé dans <#828302257694048297> pour vous prévenir");

    message.channel.send(embed)
}

module.exports.help = {
    name:"minecraft"
}