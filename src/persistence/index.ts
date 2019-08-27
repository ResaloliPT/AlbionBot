import fs = require('fs');
import path = require('path');
import SequelizeModule = require('sequelize');
import { Model } from 'sequelize-typescript';
import dbData = require('../dbData.js');
import IModel from './IModel';

let sequelize: SequelizeModule.Sequelize;
export class Sequelize {
  public static Instance: Sequelize = null;

  // Models
  public database: SequelizeModule.Sequelize = sequelize;

  // Sequelize Module
  public models: Model[];

  public constructor(options: SequelizeModule.Options) {
    if (Sequelize.Instance != null)
      throw new Error('Instance already Built, access instance property to get the current instance');

    sequelize = new SequelizeModule.Sequelize(dbData.database, dbData.username, dbData.password, {
      ...dbData.config,
      ...options,
    });
    this.prepare();

    Sequelize.Instance = this;
  }

  private prepare(): void {
    fs.readdirSync(__dirname)
      .filter((file) => {
        return file.endsWith('.model.js');
      })
      .forEach((file) => {
        const model = require(path.resolve(__dirname, file)).default;
        sequelize[model.name] = model.init(sequelize, SequelizeModule);
      });

    // Run `.associate` if it exists,
    // ie create relationships in the ORM
    Object.values(sequelize)
      .filter((model) => typeof model.associate === 'function')
      .forEach((model) => model.associate(sequelize));

    this.database = sequelize;
  }
}
