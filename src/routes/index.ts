import { Router } from 'express';
import { authGithubRouter } from './auth.github.route';
import { favoritesRouter } from './users.favorites.route';
import { commentsRouter } from './books.route';
import { openlibraryRouter } from './openlibrary.route';
import { tokensRouter } from './token.route';
import { onError } from '../middleware/onError';

export const router: Router = Router();

const defaultRoutes = [
  {
    path: '/auth/github',
    route: authGithubRouter,
  },
  {
    path: '/users/favorites',
    route: favoritesRouter,
  },
  {
    path: '/books',
    route: commentsRouter,
  },
  {
    path: '/openlibrary',
    route: openlibraryRouter,
  },
  {
    path: '/token',
    route: tokensRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
router.use(onError);