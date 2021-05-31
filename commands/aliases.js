const Discord = require("discord.js")
module.exports.run = async (bot,message,args) => {

    let embed = new Discord.MessageEmbed()
        .setColor("#F8E71C")
        .setAuthor("Liste des alias :")
        .setDescription("Mon préfix est '$' sur ce serveur")
        .addField("aliases","```alias```")
        .addField("clearidea","```clearid\nclid```")
        .addField("clear","```delete```")
        .addField("command","```commands\ncommande\ncommandes```")
        .addField("down","\u200B")
        .addField("emojify","```em\nuni```")
        .addField("help","```info\ninfos```")
        .addField("idea","```ideas\nidee\nidees```")
        .addField("minecraft","```mc```")
        .addField("project","```projects\nprojet\nprojets```")
        .addField("serverdown","```sd```")
        .addField("serverup","```sup```")
        .addField("stats","```stat\nserver\nserveur```")
        .setFooter("faites $command pour + de détail")
    await message.channel.send(embed);
    await message.delete();
}   

module.exports.help = {
    name:"alias",
    aliases:["aliases"]
}