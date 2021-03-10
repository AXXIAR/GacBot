const Discord = require('discord.js')

module.exports.run = async (bot,message,args) => {
    if (!args[0]) {
        return message.channel.send("❌ J'ai besoin que tu me donnes un emoji");
    }
    
    message.channel.send(`\\${args}`)
}

module.exports.help = {
    name:"em"
}