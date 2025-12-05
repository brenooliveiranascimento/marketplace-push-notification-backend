import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveFavoriteUseCase } from "../../../../domain/favorite/use-case/remove-favorite";

interface RemoveFavoriteParams {
  productId: string;
}

export class RemoveFavoriteController {
  async execute(
    request: FastifyRequest<{ Params: RemoveFavoriteParams }>,
    reply: FastifyReply
  ) {
    const { productId } = request.params;
    const userId = request.user.id;

    const removeFavoriteUseCase = new RemoveFavoriteUseCase();

    await removeFavoriteUseCase.execute({
      userId,
      productId: Number(productId),
    });

    return reply.status(204).send();
  }
}
