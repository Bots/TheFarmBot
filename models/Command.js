const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	const Command = sequelize.define('command', {
		name: {
			type: Sequelize.STRING,
			unique: true,
		},
		content: Sequelize.TEXT,
		username: Sequelize.STRING,
		usage_count: {
			type: Sequelize.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	},
	{
		timestamps: true,
	});
	return Command;
};