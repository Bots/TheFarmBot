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
		.setName('showcommands')
		.setDescription('Shows a list of all commands in the database!'),
	async execute(interaction) {
		const commandList = await Command.findAll({ attributes: ['name'] });
		const commandString = commandList.map(t => t.name).join(', ') || 'No tags set.';

		return interaction.reply(`List of commands: ${commandString}`);
	},
};