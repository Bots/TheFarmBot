const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('strawpoll')
		.setDescription('Create a straw poll!')
		.addStringOption(option =>
			option.setName('title')
				.setDescription('The title of the straw poll.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('option1')
				.setDescription('The first option for the poll.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('option2')
				.setDescription('The second option for the poll.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('option3')
				.setDescription('The third option for the poll.')
				.setRequired(false)),
	async execute(interaction) {
		const title = interaction.options.getString('title');
		const option1 = interaction.options.getString('option1');
		const option2 = interaction.options.getString('option2');
		const option3 = interaction.options.getString('option3');

		try {
			const rawResponse = await fetch('https://strawpoll.com/api/poll', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					poll: { title, answers: [option1, option2, option3] },
				}),
			});

			const content = await rawResponse.json();

			interaction.reply(`https://strawpoll.com/${content.content_id}`);
		}
		catch (error) {
			console.error(error);
		}
	},
};