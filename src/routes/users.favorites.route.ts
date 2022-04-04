import express, { Router } from 'express';
import { validateToken } from '../controllers/auth/validateToken';
import { addFavorite } from '../controllers/favorites/addFavorite';
import { getFavorites } from '../controllers/favorites/getFavorites';
import { deleteFavorite } from '../controllers/favorites/deleteFavorite';

export const favoritesRouter: Router = express.Router();
favoritesRouter.get('/', validateToken, getFavorites);
favoritesRouter.post('/', validateToken, express.json(), addFavorite);
favoritesRouter.delete('/', validateToken, express.json(), deleteFavorite);