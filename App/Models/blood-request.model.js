module.exports = (sequelize, Sequelize) => {
	const blood_requests = sequelize.define('blood_requests', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
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
		age: {
			type: Sequelize.STRING,
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
		area: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		hospital_address: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		message: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		number_of_units: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		illness: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		requested_on: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW,
		},
	});

	return blood_requests;
};
