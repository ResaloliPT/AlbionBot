import { Column, DataType, HasMany, Model, Scopes, Table } from 'sequelize-typescript';
import IModel from './IModel';

export default class Member extends Model<Member> {
  public static init(sequelize, DataTypes) {
    return super.init(
      {
        MemberId: DataTypes.STRING,
      },
      { sequelize },
    );
  }
}
