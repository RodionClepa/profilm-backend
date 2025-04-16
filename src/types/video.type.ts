export interface RawVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: Date;
  id: string;
}

export interface RawMovieVideos {
  id: number;
  results: RawVideo[];
}

export interface RawTVVideos {
  results: RawVideo[];
}

export interface VideoResponse {
  id: string;
  name: string;
  official: boolean;
  link: string;
}
