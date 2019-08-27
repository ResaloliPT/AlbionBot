import fs = require("fs");
import path = require("path");
import SequelizeModule = require("sequelize");
const dbData = require("root/dbData.json")
const sequelize = new SequelizeModule.Sequelize(dbData.database, dbData.username, dbData.password, dbData.config);

export class Sequelize {
	private constructor(){
		this.prepare();
	}

	public static Instance = new Sequelize();

	//Models
	public database: SequelizeModule.Sequelize;

	//Sequelize Module
	public Sequelize = SequelizeModule;

	prepare(): void {
		fs
		.readdirSync(__dirname)
		.filter(function (file) {
			return (file.indexOf("." ) !== 0 && (file.toLowerCase() !== "index.js"))
		})
		.forEach(function(file) {
			var model = sequelize.import(path.join(__dirname, file));
			this.database[model.name] = model;
		});

		Object.keys(this.database).forEach(function(modelName) {
		if ("associate" in this.database[modelName]) {
			this.database[modelName].associate(this.database);
		}
		});

		this.database = sequelize;
	}
}