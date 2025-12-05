import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateProductPriceUseCase } from "../../../../domain/product/use-case/update-product-price";

interface UpdateProductPriceParams {
  productId: string;
}

interface UpdateProductPriceBody {
  price: number;
}

export class UpdateProductPriceController {
  async execute(
    request: FastifyRequest<{
      Params: UpdateProductPriceParams;
      Body: UpdateProductPriceBody;
    }>,
    reply: FastifyReply
  ) {
    const { productId } = request.params;
    const { price } = request.body;

    const updateProductPriceUseCase = new UpdateProductPriceUseCase();

    const result = await updateProductPriceUseCase.execute({
      productId: Number(productId),
      newPrice: price,
    });

    return reply.status(200).send({
      message: "Preço atualizado com sucesso",
      product: result.product,
      notificationsSent: result.notificationsSent,
    });
  }
}
