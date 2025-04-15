export const config = {
  FILM_API_URL: 'https://api.themoviedb.org/3',
  PORT: 3000,
  defaultLanguage: 'en-US',
  FILM_IMAGE_API_URL: 'https://image.tmdb.org/t/p/',
  YOUTUBE_VIDEOS: 'https://www.youtube.com/watch?v='
};

export const LOGO_SIZES = {
  medium: 'w154',
} as const;

export const PROFILE_SIZES = {
  small: 'w45',
  medium: 'w185'
} as const;

export const POSTER_SIZE = {
  medium: 'w342',
  big: 'w500'
} as const;

export const BACKDROP_SIZES = {
  big: 'w1280'
} as const;

export const JOB_TITLE = {
  DIRECTOR: "Director",
  PRODUCER: "Producer"
}