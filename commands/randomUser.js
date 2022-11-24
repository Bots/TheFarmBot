const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomuser')
		.setDescription('Returns a random user from the server!'),
	async execute(interaction) {
		const members = interaction.guild.members.cache;
		const randomMember = members.random().user;
		await interaction.reply(`The random user is ${randomMember.username}!`);
	},
};
