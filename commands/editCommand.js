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
		.setName('editcommand')
		.setDescription('Edits a command in the database!')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the command to edit.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('content')
				.setDescription('The new content of the command.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('name');
		const commandContent = interaction.options.getString('content');

		try {
			const affectedRows = await Command.update({ content: commandContent }, { where: { name: commandName } });

			if (affectedRows > 0) {
				return interaction.reply(`Command ${commandName} was edited.`);
			}
		}
		catch (error) {
			console.log(error);
			return interaction.reply('Something went wrong with editing the command.');
		}

		return interaction.reply(`Could not find a command with name ${commandName}.`);
	},
};