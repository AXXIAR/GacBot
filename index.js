const Discord = require('discord.js');
const bot =  new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const config = require('./config.json');
const fs = require('fs');
const activities_list = [
    "Administrer le serveur",
    "essaye /info",
    "essaye /projet",
    "être programmé",
    "GacBot | v0.1"
];
var compte = 0;

bot.commands = new Discord.Collection();
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
    
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;

    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
})

bot.on("messageReactionAdd", async (reaction, user) => {
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
    if (!config.idea_embeds) {return console.log('pas de messages en stock');}

    
    for(var i=0; i<config.idea_embeds.length; i++){
        if(config.idea_embeds[i] == reaction.message.id){
            compte += 1
            const embed = new Discord.MessageEmbed()
                .addField("Pour :", `${compte}`)
            reaction.message.edit(embed)
            break;
        }
     }
	//console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

bot.login(config.token);