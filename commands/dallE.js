const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dalle')
		.setDescription('Generates an image from text!')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The description of the image you want to generate.')
				.setRequired(true)),
	async execute(interaction) {
		interaction.reply('Generating image...');

		const query = interaction.options.getString('query');

		try {
			const rawResponse = await fetch('https://api.openai.com/v1/images/generations', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${process.env.DALLE_API_TOKEN}`,
				},
				body: JSON.stringify({
					'prompt': query,
					'n': 1,
					'size': '1024x1024',
				}),
			});

			const content = await rawResponse.json();

			interaction.editReply(content.data[0].url);
		}
		catch (error) {
			console.error(error);
		}
	},
};