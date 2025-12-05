import { FastifyReply, FastifyRequest } from "fastify";
import { GetUserFavoritesUseCase } from "../../../../domain/favorite/use-case/get-user-favorites";

export class GetUserFavoritesController {
  async execute(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const getUserFavoritesUseCase = new GetUserFavoritesUseCase();

    const favorites = await getUserFavoritesUseCase.execute({ userId });

    return reply.status(200).send(favorites);
  }
}
