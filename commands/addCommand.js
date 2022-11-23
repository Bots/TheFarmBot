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
		.setName('addcommand')
		.setDescription('Adds a command to the database!')
		.addStringOption(option =>
			option.setName('name')
				.setDescription('The name of the command.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('content')
				.setDescription('The content of the command.')
				.setRequired(true)),
	async execute(interaction) {
		const commandName = interaction.options.getString('name');
		const commandContent = interaction.options.getString('content');

		try {
			const command = await Command.create({
				name: commandName.toLowerCase(),
				content: commandContent,
				username: interaction.user.username,
			});

			return interaction.reply(`Command ${command.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply('That command already exists.');
			}
			return interaction.reply('Something went wrong with adding a command.');
		}
	},
};