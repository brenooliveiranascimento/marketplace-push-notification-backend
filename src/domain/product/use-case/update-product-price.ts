import { ProductRepository } from "../../../infra/database/typeorm/market-place/repositories/product.repository";
import { FavoriteRepository } from "../../../infra/database/typeorm/market-place/repositories/favorite.repository";
import { OneSignalService } from "../../../shared/services/onesignal.service";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { MarketPlaceDataSource } from "../../../infra/database/typeorm/market-place/data-source";
import { Product } from "../../../infra/database/typeorm/market-place/entities/Product";

interface UpdateProductPriceRequest {
  productId: number;
  newPrice: number;
}

interface UpdateProductPriceResponse {
  product: Product;
  notificationsSent: number;
}

export class UpdateProductPriceUseCase {
  private productRepository: ProductRepository;
  private favoriteRepository: FavoriteRepository;
  private oneSignalService: OneSignalService;

  constructor() {
    this.productRepository = new ProductRepository();
    this.favoriteRepository = new FavoriteRepository();
    this.oneSignalService = new OneSignalService();
  }

  async execute({
    productId,
    newPrice,
  }: UpdateProductPriceRequest): Promise<UpdateProductPriceResponse> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    const oldPrice = Number(product.value);
    const priceDropped = newPrice < oldPrice;

    const productRepo = MarketPlaceDataSource.getRepository(Product);
    await productRepo.update(productId, { value: String(newPrice) });

    const updatedProduct = await this.productRepository.findById(productId);

    let notificationsSent = 0;

    if (priceDropped) {
      const favorites = await this.favoriteRepository.findByProductId(productId);

      const playerIds = favorites
        .filter((fav) => fav.user?.notificationToken)
        .map((fav) => fav.user!.notificationToken!);

      if (playerIds.length > 0) {
        const result = await this.oneSignalService.sendPriceDropNotification({
          playerIds,
          productName: product.name,
          oldPrice,
          newPrice,
          productId,
        });

        notificationsSent = result?.recipients || 0;
      }
    }

    return {
      product: updatedProduct,
      notificationsSent,
    };
  }
}
