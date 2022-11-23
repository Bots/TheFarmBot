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
		.setName('deletecommand')
		.setDescription('Deletes a command from the database!')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the command to delete.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('name');

		const rowCount = await Command.destroy({ where: { name: commandName } });

		if (!rowCount) return interaction.reply('That command did not exist.');

		return interaction.reply('Command deleted.');
	},
};