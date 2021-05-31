const Discord = require('discord.js')

module.exports.run = async(bot,message,args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        message.delete()
        return message.channel.send(":x: Tu n'as pas les permissions requises pour faire cette commande").then( msg => {
            msg.delete({timeout:6000});})
    }
    if (!args[0]) {
        message.delete()
        return message.channel.send(":x: J'ai besoin d'un nombre de message *(exemple :* `$clear 3`*)*").then( msg => {
            msg.delete({timeout:6000});})}
    
    if (args[0] != "all" && isNaN(args[0])) {
        message.delete()
        return message.channel.send(":x: J'ai besoin d'un __nombre__ *(exemple :* `$clear 3`*)*").then( msg => {
            msg.delete({timeout:6000});})}
    
    if (args[0]<2) {
        message.delete()
        return message.channel.send(":x: Le minimum est 2 messages").then( msg => {
            msg.delete({timeout:6000});})
    }

    if (args[0]>99) {
        message.delete()
        return message.channel.send(":x: Le maximum est 99 messages").then( msg => {
            msg.delete({timeout:6000});})
    }

    if (args[0] === "all") {
        await message.delete()
        try {
            message.channel.bulkDelete(99)
            return await message.channel.send("J'ai bien supprimé : `99 messages`").then( msg => {
                msg.delete({timeout:2000});})
        } catch (err) {
            return await message.channel.send(":x: Je ne peux pas supprimer les messages de plus de 14 jours");
        }
        
    }

    else {
        await message.delete()
        try {
            message.channel.bulkDelete(args[0])
            return await message.channel.send(`J'ai bien supprimé : \`${args[0]} messages\``).then( msg => {
                msg.delete({timeout:2000});})
        } catch (err) {
            return await message.channel.send(":x: Je ne peux pas supprimer les messages de plus de 14 jours");
        }
    }
}



module.exports.help = {
    name:"clear",
    aliases:["delete"]
}