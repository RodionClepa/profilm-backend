import { config, PROFILE_SIZES } from "../config.js";
import { CastResponse, RawCast } from "../types/credits.type.js";

export const mapCast = (rawMovieCast: RawCast): CastResponse => ({
  adult: rawMovieCast.adult,
  gender: rawMovieCast.gender,
  id: rawMovieCast.id,
  name: rawMovieCast.name,
  character: rawMovieCast.character,
  profilePath: rawMovieCast.profile_path ? config.FILM_IMAGE_API_URL + PROFILE_SIZES.medium + rawMovieCast.profile_path : null,
  order: rawMovieCast.order
})