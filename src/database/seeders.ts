import { ConfigRegisterType } from '../config.js';
import { GenreType } from '../models/GenreType.models.js';
import { RegisterType } from '../models/RegisterType.models.js';

async function initializeGenres() {
  try {
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

async function initializeRegisterTypes() {
  try {
    const typesCount = await RegisterType.count();
    if (typesCount === 0) {
      console.log('Populating initial register types');
      const initialRegisterTypes = [
        { id: ConfigRegisterType.GOOGLE_AUTH, type: 'GOOGLE_AUTH' },
        { id: ConfigRegisterType.FORM_AUTH, type: 'FORM_AUTH' },
      ];
      await RegisterType.bulkCreate(initialRegisterTypes);
      console.log('Register Types populated.');
    } else {
      console.log('RegisterType table already has data. Skipping population.');
    }
  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  }
}

export { initializeGenres, initializeRegisterTypes };