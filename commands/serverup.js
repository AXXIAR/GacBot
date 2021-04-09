const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {
    if (!message.member.roles.cache.has('830016587813093437')) return;
    message.delete()
    if (args[0]) {var texte = args.join(" ")}
    else {var texte = 'Le serveur ouvre !'}
    const newEmbed = new Discord.MessageEmbed()
            .setAuthor(texte)
            .setColor("#50E3C2")
            .setFooter('GAC_studios.aternos.me')
            .setTimestamp();
    bot.channels.cache.get('828302257694048297').send(newEmbed)
}
module.exports.help ={
    name:"serverup"
}