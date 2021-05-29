const Discord = require('discord.js')
const fs = require('fs')
const config = require('../config.json')

module.exports.run = async (bot,message,args) => {
if (message.author.bot) return;
    if (!message.member.roles.cache.has('813477336250449970')) {
        message.delete()
        return message.channel.send("❌ Il faut participer au projet pour utiliser cette commande").then(msg =>{msg.delete({timeout:6000})});
    }


    const filter = m => m.author.id === message.author.id;
    await message.delete()
    if (!args[0]){
        message.channel.send("Sur quoi porte ton idée (nom du jeu, méchaniques, ...) ?")

        await message.channel.awaitMessages(filter, {
        max: 1, 
        time: 10000,}).then(async(collected) => {                                //   temps d'attente en millisecondes
            titre = collected.first().content
            message.channel.send("Quelle est ton idée ?")

            await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 30000,}).then(async(collected) => {                                //   temps d'attente en millisecondes
                idee = collected.first().content
                message.channel.bulkDelete(4)
                const embed = new Discord.MessageEmbed()
                    .setTitle(`[ ${titre} ]`)
                    .setAuthor(`Idée de @${message.author.username}`, `${message.author.avatarURL()}`)
                    .setColor("#F8E71C")
                    .setDescription(`${idee}`)
                    .setFooter("$info")
                    .setTimestamp()
                await message.channel.send({embed}).then(async embedMsg =>{
                    await embedMsg.react('⬆️');
                    await embedMsg.react('❌');
                    config.idea_embeds[embedMsg.id] = 0;
                    fs.writeFileSync('./config.json', JSON.stringify(config));
                })
                
            }).catch(() => {
                return message.channel.send("❌Tu as mis trop de temps à répondre").then( msg => {
                    msg.delete({timeout:6000});
                })
            })
        }).catch(() => {
            return message.channel.send("❌Tu as mis trop de temps à répondre").then( msg => {
                msg.delete({timeout:6000});
            })
        })
    }
    else {

        message.channel.send("Sur quoi porte ton idée (nom du jeu, méchaniques, ...) ?")
        await message.channel.awaitMessages(filter, {
        max: 1, 
        time: 30000,}).then(async(collected) => {                                //   temps d'attente en millisecondes
            titre = collected.first().content
            message.channel.bulkDelete(2)
                const embed = new Discord.MessageEmbed()
                    .setTitle(`[ ${titre} ]`)
                    .setAuthor(`Idée de @${message.author.username}`, `${message.author.avatarURL()}`)
                    .setColor("#F8E71C")
                    .setDescription(`${args.join(" ")}`)
                    .setFooter("$info")
                    .setTimestamp();
                await message.channel.send({embed}).then(async embedMsg =>{
                    await embedMsg.react('⬆️');
                    await embedMsg.react('❌');
                    config.idea_embeds[embedMsg.id] = 0;
                    fs.writeFileSync('./config.json', JSON.stringify(config));})
        }).catch(() => {
            return message.channel.send("❌Tu as mis trop de temps à répondre").then( msg => {
                msg.delete({timeout:6000})
                })
            })
    }
}

module.exports.help = {
    name:"idee"
}