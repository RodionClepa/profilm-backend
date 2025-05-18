import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute } from "@sequelize/core";
import { Attribute, AutoIncrement, HasOne, PrimaryKey, Unique } from '@sequelize/core/decorators-legacy';
import { User } from "./User.models.js";

export class RegisterType extends Model<InferAttributes<RegisterType>, InferCreationAttributes<RegisterType>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Unique
  declare type: string;

  @HasOne(() => User, 'register_id')
  declare register_id?: NonAttribute<User>;
}