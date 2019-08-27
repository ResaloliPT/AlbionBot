import fs = require("fs");
import path = require("path");
import SequelizeModule = require("sequelize");
const dbData = require("../dbData.json")

let sequelize: SequelizeModule.Sequelize;
export class Sequelize {
	public constructor(options: SequelizeModule.Options){
		if(Sequelize.Instance != null){
			throw new Error("Instance already Built, access instance property to get the current instance");
		}

		sequelize = new SequelizeModule.Sequelize(dbData.database, dbData.username, dbData.password, {
			...dbData.config,
			...options
		});
		this.prepare();

		Sequelize.Instance = this;
	}

	public static Instance:Sequelize = null;

	//Models
	public database: SequelizeModule.Sequelize = sequelize;

	//Sequelize Module
	public Sequelize = SequelizeModule;

	prepare(): void {
		fs
		.readdirSync(__dirname)
		.filter(function (file) {
			return (file.indexOf("." ) !== 0 && (file.toLowerCase() !== 'index.js') && (file.endsWith('.js')))
		})
		.forEach(function(file) {
			var model = sequelize.import(path.join(__dirname, file));
			sequelize[model.name] = model;
		});

		Object.keys(sequelize).forEach(function(modelName) {
			if ("associate" in sequelize[modelName]) {
				sequelize[modelName].associate(sequelize);
			}
		});

		this.database = sequelize;
	}
}