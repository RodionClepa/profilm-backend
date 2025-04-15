import { BACKDROP_SIZES, config } from "../config.js";
import { ImageResponse, RawDetailsImage } from "../types/images.type.js";

export const mapImagesDetails = (rawImage: RawDetailsImage): ImageResponse => (
  {
    filePath: config.FILM_IMAGE_API_URL + BACKDROP_SIZES.big + rawImage.file_path,
    voteAverage: rawImage.vote_average,
    voteCount: rawImage.vote_count
  }
)