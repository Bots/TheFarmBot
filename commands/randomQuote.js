const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomquote')
		.setDescription('Returns a random quote!'),
	async execute(interaction) {
		try {
			const rawResponse = await fetch('https://zenquotes.io/api/random', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const content = await rawResponse.json();

			interaction.reply(`${content[0].q} - ${content[0].a}`);
		}
		catch (error) {
			console.error(error);
		}
	},
};