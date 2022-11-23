const { SlashCommandBuilder } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Command = require('../models/Command')(sequelize);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commandinfo')
		.setDescription('Displays info about a command!')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the command to query for info.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('name');

		const command = await Command.findOne({ where: { name: commandName } });

		if (command) {
			return interaction.reply(`Command ${commandName} was created by ${command.username} at ${command.createdAt} and has been used ${command.usage_count} times.`);
		}
		return interaction.reply(`Could not find command: ${commandName}`);
	},
};