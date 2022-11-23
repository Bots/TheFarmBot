const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random-user')
		.setDescription('Returns a random user from the server!'),
	async execute(interaction) {
		const members = interaction.guild.members.cache;
		const randomMember = members.random();
		await interaction.reply(`The random user is ${randomMember.user.username}!`);
	},
};
