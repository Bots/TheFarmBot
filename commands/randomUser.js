const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomuser')
		.setDescription('Returns a random user from the server!'),
	async execute(interaction) {
		console.log(interaction);
		const members = interaction.guild.members;
		console.log(members);
		const randomMember = members.cache.random().user;
		console.log(randomMember);
		await interaction.reply(`The random user is ${randomMember.username}!`);
	},
};
