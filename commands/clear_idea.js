const Discord = require('discord.js')
const fs = require('fs')
const config = require('../config.json')

module.exports.run = async (bot,message,args) => {
    if (!message.member.hasPermission('MODERATOR')) {
        message.delete()
        return message.channel.send("❌ Tu n'a pas les permissions requises pour faire cette commande").then(msg => {msg.delete({timeout:6000});}) 
    }

    for (x in config.idea_embeds) {
    delete config.idea_embeds[x]
    }
    fs.writeFileSync('./config.json', JSON.stringify(config));
    
    message.channel.send('✅ idea_embeds remis à zéro !')
    message.delete()
}

module.exports.help = {
    name:"clearid"
}