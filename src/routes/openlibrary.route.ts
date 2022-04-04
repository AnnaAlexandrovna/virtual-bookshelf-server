import { Router } from 'express';
import { getOpenLibraryData } from '../controllers/openLibrary/getOpenLibraryData';

export const openlibraryRouter: Router = Router();
openlibraryRouter.get('/*', getOpenLibraryData);
