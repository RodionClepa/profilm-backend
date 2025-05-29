import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, NotNull, AutoIncrement, PrimaryKey, Unique, BeforeCreate, BeforeUpdate } from '@sequelize/core/decorators-legacy';
import bcrypt from "bcrypt";

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

  @Attribute(DataTypes.STRING)
  declare password: string | null;

  // Foreign key
  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare register_id: number;

  @BeforeCreate
  static async hashPassword(instance: User) {
    if (instance.password) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @BeforeUpdate
  static async hashPasswordOnUpdate(instance: User) {
    if (instance.changed('password') && instance.password) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(plainPassword, this.password);
  }
}