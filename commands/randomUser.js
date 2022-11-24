const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomuser')
		.setDescription('Returns a random user from the server!'),
	async execute(interaction) {
		console.log('interaction: ', interaction);
		const members = await interaction.member.guild.members.cache;
		console.log(members);
		// const randomMember = members.user;
		// console.log(randomMember);
		// await interaction.reply(`The random user is ${randomMember}!`);
	},
};
