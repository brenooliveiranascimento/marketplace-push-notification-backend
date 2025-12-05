import { FastifyReply, FastifyRequest } from "fastify";
import { AddFavoriteUseCase } from "../../../../domain/favorite/use-case/add-favorite";

interface AddFavoriteBody {
  productId: number;
}

export class AddFavoriteController {
  async execute(
    request: FastifyRequest<{ Body: AddFavoriteBody }>,
    reply: FastifyReply
  ) {
    const { productId } = request.body;
    const userId = request.user.id;

    const addFavoriteUseCase = new AddFavoriteUseCase();

    const favorite = await addFavoriteUseCase.execute({
      userId,
      productId,
    });

    return reply.status(201).send(favorite);
  }
}
