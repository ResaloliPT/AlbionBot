import { Column, HasMany, Model, Scopes, Table } from 'sequelize-typescript';

@Scopes(() => ({
  mods: {
    where: {
      memberType: 1,
    },
  },
}))

@Table
export default class Member extends Model<Member> {
  @Column
  public memberID: string;

  @Column
  public memberType: number;
}
