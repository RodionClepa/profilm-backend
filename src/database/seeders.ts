import sequelize from './init.js';
import { GenreType } from '../models/GenreType.models.js';

async function initializeGenres() {
  try {
    // Populate genres if empty
    const genreCount = await GenreType.count();
    if (genreCount === 0) {
      console.log('Populating initial genres');
      const initialGenres = [
        { name: 'Movie', api_name: "movie" },
        { name: 'TV', api_name: "tv" },
      ];
      await GenreType.bulkCreate(initialGenres);
      console.log('Genres populated.');
    } else {
      console.log('GenreType table already has data. Skipping population.');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  }
}

export { initializeGenres };