// message.channel.send(guild.member(sOwner) ? sOwner.toString() : guild.owner.user.tag);   

var now = new Date();
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();


const Discord = require('discord.js');
const bot =  new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const disbut = require('discord-buttons')(bot);
const config = require('./config.json');
require('dotenv').config();
if (!process.env.BOT_TOKEN) {return console.log("Il me manque le token du bot")}

const fs = require('fs');
const prefix = config.prefix;
const activities_list = [
    "Administrer le serveur",
    "$info",
    "$projet",
    "être programmé",
    "GacBot | v0.4"
];
const connected_list = [
    "Je suis connecté :)",
    "Je suis en ligne",
    "A vos ordres :D",
    "Yo ! Je suis là !",
    "GacBot au rapport",
    "Prêt à l'utilisation 😎",
    "Online ^^",
    "Hehe, devinez qui vient de se connecter ?\n C'est moiii !"
]

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Aucune commande trouvé.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`[- ${f} -] chargé!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias =>{
            bot.aliases.set(alias, props.help.name)
        })
    });

});

bot.on("ready", async () => {
    console.log("\n"+bot.user.username+" est connecté")
    setInterval(() => {
        let index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index], {type:"PLAYING"});
    }, 10000);
    try { 
        let channel = await bot.channels.fetch('819290754957836299')
        let stateMsg = await channel.messages.fetch('819328473528401940')
        let index = Math.floor(Math.random() * (connected_list.length - 1) + 1);
        const newEmbed = new Discord.MessageEmbed(stateMsg)
            .setAuthor(`${connected_list[index]}`)
            .setColor("#50E3C2")
            .setTimestamp();
        stateMsg.edit(newEmbed)
    } catch (err) {
        console.log(activities_list[4])
    }

})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);

    let commandfile = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
    if (commandfile) commandfile.run(bot, message, args, disbut);
})

bot.on('clickButton', async (button) => {
    if (button.id == "nextCmd0") {
        let btn = new disbut.MessageButton()
            .setLabel("Suivant")
            .setID('nextCmd1')
            .setStyle("blurple");
        let embed = new Discord.MessageEmbed()
            .setColor("#F8E71C")
            .setDescription("*Les [] sont obligatoires et les () sont facultatives*")
            .addField("Pour les participants d'un ou plusieurs projets :","\`\`\`\n-------------------------------------------------------------\n$idee (ton_idée) :  créer de manière interactive un embed contenant votre idée et avec un système de vote par réaction\n\n  - si vous ajoutez votre idée juste après la commande, le bot vous demandera juste quelle type d'idée c'est.\n\n  - si vous ne mettez rien, il vous demandera quelle type d'idée c'est, puis votre idée\n-------------------------------------------------------------\`\`\`");
        await button.defer();
        await button.message.edit({button:btn,embed:embed});
    }

    if (button.id == "nextCmd1") {
        let btn = new disbut.MessageButton()
            .setLabel("Menu")
            .setStyle("green")
            .setID("nextCmd2")
        let embed = new Discord.MessageEmbed()
            .setColor("#F8E71C")
            .setDescription("*Les [] sont obligatoires et les () sont facultatives*")
            .addField("Pour tout le monde :","\`\`\`\n-------------------------------------------------------------\n$minecraft  :  affiche les infos sur le serveur Minecraft de GAC Studios\n-------------------------------------------------------------\n$em [emoji] :  renvoie l' [emoji] en version unicode\n-------------------------------------------------------------\n$info       :  renvoie des infos pratiques sur le serveur et le bot\n-------------------------------------------------------------\n$projet     :  renvoie une liste de tous les projets GAC en cours ou finis\n-------------------------------------------------------------\n$commande   :  renvoie une liste de toutes les commandes de @GacBot\n-------------------------------------------------------------\`\`\`");
        await button.defer();
        await button.message.edit({button:btn,embed:embed});
    }

    if (button.id == "nextCmd2") {
        let btn = new disbut.MessageButton()
            .setLabel('Suivant')
            .setStyle('blurple')
            .setID('nextCmd0');
        let embed = new Discord.MessageEmbed()
            .setColor("#F8E71C")
            .setAuthor("Liste de mes commandes :")
            .setDescription("Mon préfix est '$' sur ce serveur\n*Les [] sont obligatoires et les () sont facultatives*")
            .addField("Pour les Admins et Modos: ","\`\`\`\n-------------------------------------------------------------\n$down        :  affiche un message dans #🤖état disant que le bot est hors-ligne\n-------------------------------------------------------------\n$clearid     :  efface l'id de tous les messages créés avec la commande $idee\n-------------------------------------------------------------\n$serverup    : envoie un message dans <#828302257694048297> indiquant que le serveur Minecraft est connecté\n-------------------------------------------------------------\n$serverdown  :  envoie un message dans <#828302257694048297> indiquant que le serveur Minecrat est indisponible\`\`\`");
        await button.defer();
        await button.message.edit({button:btn,embed:embed});
    }
});

bot.on("messageReactionAdd", async (reaction, user) => {
    if (user.bot) {
        return;
    }
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}   
    for (x in config.idea_embeds) {
        if (x == reaction.message.id) {
            if (reaction.emoji.name === '❌'){
                reaction.message.delete()
                delete config.idea_embeds[reaction.message.id]
                fs.writeFileSync('./config.json', JSON.stringify(config));
            }

            if (reaction.emoji.name === '⬆️'){
                config.idea_embeds[reaction.message.id] ++
                fs.writeFileSync('./config.json', JSON.stringify(config));
                const receivedEmbed = reaction.message.embeds[0];
                const embed = new Discord.MessageEmbed(receivedEmbed).setFooter(`Votes : ${config.idea_embeds[reaction.message.id]}s`);
                await reaction.message.edit(embed)
                return;
            }
        }
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (user.bot) {
        return;
    }
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}   
    for (x in config.idea_embeds) {
        if (reaction.emoji.name === '⬆️') {
            config.idea_embeds[reaction.message.id] --
            fs.writeFileSync('./config.json', JSON.stringify(config));
            const receivedEmbed = reaction.message.embeds[0];
            const embed = new Discord.MessageEmbed(receivedEmbed).setFooter(`Votes : ${config.idea_embeds[reaction.message.id]}`);   
            await reaction.message.edit(embed)
            return;
        }
    }
});

bot.login(process.env.BOT_TOKEN);