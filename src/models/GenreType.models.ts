import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, NotNull, AutoIncrement, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class GenreType extends Model<InferAttributes<GenreType>, InferCreationAttributes<GenreType>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare api_name: string;
}