const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('randomuser')
		.setDescription('Returns a random user from the server!'),
	async execute(interaction) {
		console.log('interaction: ', interaction);
		const members = await interaction.member.guild.members.fetch();
		console.log(members);
		const randomMember = members.random();
		console.log(randomMember);
		await interaction.reply(`The random user is ${randomMember}!`);
	},
};
