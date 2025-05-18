import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, NotNull, AutoIncrement, PrimaryKey, Unique } from '@sequelize/core/decorators-legacy';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @Unique
  declare external_id: string | null;

  @Attribute(DataTypes.STRING)
  @Unique
  @NotNull
  declare email: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare username: string;

  @Attribute(DataTypes.STRING)
  declare img_url: string;

  // Foreign key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare register_id: number;
}