const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    await message.delete()
    embed = new Discord.MessageEmbed()
        .setAuthor("Infos :")
        .setColor("#F8E71C")
        .addField("Description","GacBot est le bot officiel du serveur GAC Studios. Il est codé en JavaScript à l'aide de la librairie discord.js")
        .addField("Status","GacBot est en cours de développement.\nIl n'est pas encore hébergé en ligne et n'est donc pas connecté en permanence.")
        .addField("Participer", "Si vous souhaitez participer à son développement, faites une demande ici :\n<#814466198904242226>")
        .addField("Code Source", "Lien GitHub vers du code source du bot : https://github.com/AXXIAR/GacBot");

    embed2 = new Discord.MessageEmbed()
        .setAuthor("Commandes de bases :")
        .setColor("#F8E71C")
        .setDescription("Mon préfix est '$' sur ce serveur", inline=true)
        .addField("'$info'","Quelques infos pratiques sur moi", inline=true)
        .addField("'$projet'","Liste de tous les projets finis ou en cours", inline=true)
        .addField("\u200b","\u200b")
        .addField("À venir :", "- *'$commandes'* (lise complète des commandes)\n- *'$clear [nombre]'* (nettoyer [nombre] de messages dans un salon)\n- Hébérgement en ligne du bot")
        .setTimestamp();
    message.channel.send(embed)
    message.channel.send(embed2)
}

module.exports.help = {
    name:"info"
}