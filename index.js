const Discord = require('discord.js');
const bot =  new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const activities_list = [
    "Administrer le serveur",
    "essaye /info",
    "essaye /projet",
    "être programmé",
    "GacBot | v0.1"
];

bot.commands = new Discord.Collection();
if (process.env.BOT_TOKEN)

    fs.readdir("./commands/", (err, files) => {

        if (err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js");
        if (jsfile.length <= 0) {
            console.log("Aucune commande trouvé.");
            return;
        }

        jsfile.forEach((f, i) => {
            let props = require(`./commands/${f}`);
            console.log(`${f} chargé!`);
            bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () => {
    console.log(bot.user.username+" est connecté")
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index], {type:"STREAMING"});
    }, 10000);
})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.startsWith('$idea')){
        if (!message.member.roles.cache.find(r => {r.name === "Projet Roblox 1 (sans nom)"})) {
            message.delete()
            return message.channel.send(":x: Il faut participer au projet pour utiliser cette commande").then(msg =>{msg.delete({timeout:6000})});
        }

        let args = message.content.split(" ").slice(1);

        if (!args[0]){
            message.delete()
            return message.channel.send(":x: J'ai besoin que tu me donnes ton idée").then(msg =>{msg.delete({timeout:6000})});
        }

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Idée de @${message.author.username}`, `${message.author.avatarURL()}`)
            .setColor("#F8E71C")
            .setDescription(`${args.join(" ")}`)
            .setFooter("$help")
            .setTimestamp()
        await message.channel.send({embed}).then(embedMsg =>{
            embedMsg.react('⬆️');
            embedMsg.react('⬇️');
        })
        message.delete()
    }

    // let content = message.content.split(" ");       //[ '$hello', 'blabla', 'blo' ]
    // let command = content[0];                       //$hello 
    // let args = content.slice(1);                    //[ 'blabla', 'blo' ]
    // let prefix = config.prefix;                     //$

    // let commandfile = bot.commands.get(command.slice(prefix.length));
    // if (commandfile) commandfile.run(bot, message, args);
})

bot.login(config.token);