const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    const guild = message.guild; // Gets guild from the Message object
    if(!guild.available) return; // Stops if unavailable
    await message.guild.members.fetch(message.guild.ownerID)
    
    let onlines = message.guild.members.cache.filter(member => member.presence.status == "offline").size;
    let bots = message.guild.members.cache.filter(member => member.user.bot).size;
    let total = message.guild.memberCount;
    onlines = total - onlines;
    let createdAt = message.guild.createdAt.toString().slice(0,21)
    let owner = guild.owner.user.tag;

    
    const embed = new Discord.MessageEmbed()
        .setTitle("Stats Serveur")
        .setColor("#F8E71C")
        .addField("Propriétaire", owner, true)
        .addField("Date de création", createdAt, true)
        .addField("\u200b", "\u200b" , true)
        .addField("Total des membres", total, true)
        .addField("Nombre de Bots", bots, true)
        .addField("Membres connectés", onlines, true)
        .setTimestamp();
    message.delete()
    message.channel.send(embed);
}

module.exports.help = {
    name:'stats',
    aliases:["stat","server","serveur"]
}