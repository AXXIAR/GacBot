const down_list = [
    "Je m'en vais, à bientôt",
    "Je me déconnecte",
    "💤 AFK 💤",
    "Je vais faire un tour 👋",
    "🛏️ Je suis parti dormir"
]
const Discord = require('discord.js')

var now = new Date();
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();

let debut = Date.now()

module.exports.run = async (bot,message,args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")){
        return;
    }
    
    message.delete()
    let fin = Date.now()
    let duree = fin - debut
    var renow = new Date();
    duh = duree/3600000
    dumin = duree/60000
    if (duh>1) {
        let channel = await bot.channels.fetch('819290754957836299')
        let stateMsg = await channel.messages.fetch('819328473528401940')
        let index = Math.floor(Math.random() * (down_list.length - 1) + 1);
        const newEmbed = new Discord.MessageEmbed(stateMsg)
            .setAuthor(`${down_list[index]}`)
            .setColor("#DB2339")
            .setFooter(heure+":"+minute+" -> "+renow.getHours()+":"+renow.getMinutes()+"   [~"+Math.round(duh)+"h"+Math.round(dumin)+" d'activité]")
            .setTimestamp();
        stateMsg.edit(newEmbed)

    }
    else{
        let channel = await bot.channels.fetch('819290754957836299')
        let stateMsg = await channel.messages.fetch('819328473528401940')
        let index = Math.floor(Math.random() * (down_list.length - 1) + 1);
        const newEmbed = new Discord.MessageEmbed(stateMsg)
            .setAuthor(`${down_list[index]}`)
            .setColor("#DB2339")
            .setFooter(heure+":"+minute+" -> "+renow.getHours()+":"+renow.getMinutes()+"   [~"+Math.round(dumin)+"min d'activité]")
            .setTimestamp();
        stateMsg.edit(newEmbed)
    }

}

module.exports.help = {
    name:"down",
    aliases:[]
}