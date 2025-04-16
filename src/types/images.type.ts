
export interface RawDetailsImage {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface RawDetailsImages {
  backdrops: RawDetailsImage[];
}

export interface RawTVDetailsImages extends RawDetailsImages {
  logos: RawDetailsImage[];
  posters: RawDetailsImage[];
}

export interface ImageResponse {
  filePath: string
  voteAverage: number;
  voteCount: number;
}