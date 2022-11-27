const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcome')
		.setDescription('Welcomes a new user!')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to welcome')
			.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');

		interaction.reply(`Hello ${user}! Welcome to The Farm! You can go to the #❗roles channel and pick which games you play to unlock the channels for that game, and also don't forget to select if you are a content creator so that the rest of us get alerts when you go live. Take a look at #👀rules and if you don't mind you can leave a short introduction in #👋🏻introductions. Thank you for being here!`);
	},
};