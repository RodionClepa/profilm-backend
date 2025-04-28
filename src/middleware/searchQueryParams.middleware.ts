import { Response, NextFunction } from 'express';
import { SearchQueryParams, TypeSearch } from '../types/query.type.js';
import { CustomRequest } from '../types/express/index.js';

export const searchQueryParams = (req: CustomRequest<SearchQueryParams>, res: Response, next: NextFunction): void => {
  const page = parseInt(req.query.page as string) || 1;
  const imageSize = parseInt(req.query.imageSize as string) || 500;
  const includeAdult = req.query.includeAdult === 'true';
  const searchName = req.query.searchName as string || "";
  const selectedType = req.query.selectedType as string || "";

  const enumSelectedType = Object.values(TypeSearch).includes(selectedType as TypeSearch) ? (selectedType as TypeSearch) : undefined;

  if (!enumSelectedType) {
    res.status(400).json({ error: 'Invalid type specified' });
    return;
  }

  if (page < 1 || page > 500) {
    res.status(400).json({ message: "Pages should start at 1 and max at 500" });
    return;
  }

  req.validatedQuery = { searchName, page, includeAdult, selectedType, imageSize };
  next();
};