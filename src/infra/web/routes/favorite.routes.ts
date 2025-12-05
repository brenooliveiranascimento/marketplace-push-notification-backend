import { FastifyInstance } from "fastify";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { AddFavoriteController } from "../controllers/favorite/add-favorite.controller";
import { RemoveFavoriteController } from "../controllers/favorite/remove-favorite.controller";
import { GetUserFavoritesController } from "../controllers/favorite/get-user-favorites.controller";
import {
  addFavoriteSchema,
  removeFavoriteSchema,
  getUserFavoritesSchema,
} from "./schemas/favorite/favorite.schemas";

export const configure = (fastify: FastifyInstance) => {
  const checkAuthenticated = new CheckAuthtenticationMiddleware();
  const addFavoriteController = new AddFavoriteController();
  const removeFavoriteController = new RemoveFavoriteController();
  const getUserFavoritesController = new GetUserFavoritesController();

  fastify.route({
    url: "/favorites",
    method: "get",
    handler: getUserFavoritesController.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getUserFavoritesSchema,
  });

  fastify.route({
    url: "/favorites",
    method: "post",
    handler: addFavoriteController.execute,
    preHandler: [checkAuthenticated.execute],
    schema: addFavoriteSchema,
  });

  fastify.route({
    url: "/favorites/:productId",
    method: "delete",
    handler: removeFavoriteController.execute,
    preHandler: [checkAuthenticated.execute],
    schema: removeFavoriteSchema,
  });
};
