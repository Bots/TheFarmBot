const { Events } = require('discord.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Command = require('../models/Command')(sequelize);

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		Command.sync();
		console.log(`Logged in as ${client.user.tag}!`);
	},
};