const Discord = require('discord.js')
const fs = require('fs')
const config = require('../config.json')

module.exports.run = async (bot,message,args) => {
if (message.author.bot) return;
    if (!message.member.roles.cache.has('813477336250449970')) {
        message.delete()
        return message.channel.send("❌ Il faut participer au projet pour utiliser cette commande").then(msg =>{msg.delete({timeout:6000})});
    }
        
    if (!args[0]){
        message.delete()
        return message.channel.send("❌ J'ai besoin que tu me donnes ton idée").then(msg =>{msg.delete({timeout:6000})});
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Idée de @${message.author.username}`, `${message.author.avatarURL()}`)
        .setColor("#F8E71C")
        .setDescription(`${args.join(" ")}`)
        .setFooter("$help")
        .setTimestamp()
    await message.channel.send({embed}).then(async embedMsg =>{
        await embedMsg.react('⬆️');
        await embedMsg.react('❌');
        config.idea_embeds[embedMsg.id] = 0;
        fs.writeFileSync('./config.json', JSON.stringify(config));
    })
    message.delete()
}

module.exports.help = {
    name:"idea"
}