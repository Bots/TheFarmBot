const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomfact')
		.setDescription('Returns a random fact!'),
	async execute(interaction) {
		try {
			const rawResponse = await fetch('https://webknox-trivia-knowledge-facts-v1.p.rapidapi.com/trivia/random', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
					'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
				},
			});

			const content = await rawResponse.json();

			interaction.reply(`${content.trivia}`);
		}
		catch (error) {
			console.error(error);
		}
	},
};