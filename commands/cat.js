const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Returns a random cat pic!'),
	async execute(interaction) {
		try {
			const rawResponse = await fetch('https://api.thecatapi.com/v1/images/search', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const content = await rawResponse.json();

			interaction.reply(`${content[0].url}`);
		}
		catch (error) {
			console.error(error);
		}
	},
};