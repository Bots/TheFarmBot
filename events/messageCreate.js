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
	name: Events.MessageCreate,
	async execute(message) {

		if (message.content.startsWith('!')) {
			const args = message.content.slice(1).trim().split(/ +/g);

			const command = args.shift().toLowerCase();

			try {
				const cmd = await Command.findOne({ name: command });

				if (cmd === null) {
					message.channel.send('Command not found.');
					return;
				}

				if (command === cmd.name) {
					message.channel.send(cmd.content);
					return;
				}
			}
			catch (error) {
				console.log(error);
			}
		}
	},
};