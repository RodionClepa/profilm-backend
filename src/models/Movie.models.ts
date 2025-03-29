import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, NotNull, Unique, AutoIncrement, PrimaryKey, Default } from '@sequelize/core/decorators-legacy';

export class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    @Unique
    declare external_id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare original_language: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare original_title: string;

    @Attribute(DataTypes.STRING)
    declare overview: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare popularity: string;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare poster_path: number;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare vote_average: number;

    @Attribute(DataTypes.FLOAT)
    @NotNull
    declare vote_count: number;

    @Attribute(DataTypes.DATEONLY)
    @NotNull
    declare release_date: string;
}