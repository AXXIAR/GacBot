const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    await message.delete()
    embed = new Discord.MessageEmbed()
        .setAuthor("Liste des projets GAC :")
        .setColor("#F8E71C")
        .addField("Projet Roblox","Un petit jeu d'évasion dans une ambiance semi-horreur.", inline=true )
        .addField("\u200b","\u200b",inline=true)
        .addField("Travellers", "Jeu de cartes (irl) d'aventure.",inline=true)
        .addField("GacBot", "Bot discord du serveur (moi!) codé en javascript\nCode source : https://github.com/AXXIAR/GacBot", inline=true)
        .addField("\u200b","`Pour plus de détails rendez vous ici :` <#813389330629394468>")
        .setTimestamp();
    message.channel.send(embed)
}
module.exports.help = {
    name:"projet",
    aliases:["projets","project","projects"]
}