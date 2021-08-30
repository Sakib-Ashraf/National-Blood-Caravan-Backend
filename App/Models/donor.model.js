module.exports = (sequelize, Sequelize) => {
	const donor = sequelize.define('donors', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		username: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		mobile: {
			type: Sequelize.STRING,
			allowNull: false,
			foreignKey: true,
		},
		email: {
			type: Sequelize.TEXT,
			allowNull: false,
			foreignKey: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		age: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		birth_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		blood_group: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		gender: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		donated: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		area: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		last_donate_date: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		joined_date: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		activation_date: {
			type: Sequelize.DATE,
		},
		disabler_value: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
	});

	return donor;
};
