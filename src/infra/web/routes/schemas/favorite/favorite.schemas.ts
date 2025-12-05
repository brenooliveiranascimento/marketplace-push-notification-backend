import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const addFavoriteBodySchema = z.object({
  productId: z.number().int().positive(),
});

const removeFavoriteParamsSchema = z.object({
  productId: z.string(),
});

export const addFavoriteSchema = {
  tags: ["Favorites"],
  summary: "Add product to favorites for price notifications",
  body: zodToJsonSchema(addFavoriteBodySchema),
  response: {
    201: zodToJsonSchema(
      z.object({
        id: z.number(),
        productId: z.number(),
        userId: z.number(),
        createdAt: z.string(),
      })
    ),
  },
};

export const removeFavoriteSchema = {
  tags: ["Favorites"],
  summary: "Remove product from favorites",
  params: zodToJsonSchema(removeFavoriteParamsSchema),
  response: {
    204: {
      type: "null",
      description: "No content",
    },
  },
};

export const getUserFavoritesSchema = {
  tags: ["Favorites"],
  summary: "Get user favorites",
  response: {
    200: zodToJsonSchema(
      z.array(
        z.object({
          id: z.number(),
          productId: z.number(),
          product: z.any().optional(),
          createdAt: z.string(),
        })
      )
    ),
  },
};
