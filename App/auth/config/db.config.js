module.exports = {
	HOST: '127.0.0.1',
	USER: 'postgres',
	PASSWORD: 'postgreSQL',
	DB: 'nbc',
	dialect: 'postgres',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};