import { FavoriteRepository } from "../../../infra/database/typeorm/market-place/repositories/favorite.repository";
import { ProductRepository } from "../../../infra/database/typeorm/market-place/repositories/product.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { BusinessError } from "../../../shared/errors/business.error";

interface AddFavoriteRequest {
  userId: number;
  productId: number;
}

export class AddFavoriteUseCase {
  private favoriteRepository: FavoriteRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
    this.productRepository = new ProductRepository();
  }

  async execute({ userId, productId }: AddFavoriteRequest) {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    const existingFavorite = await this.favoriteRepository.findByUserAndProduct(
      userId,
      productId
    );

    if (existingFavorite) {
      throw new BusinessError("Produto já está nos favoritos");
    }

    const favorite = await this.favoriteRepository.create(userId, productId);

    return {
      id: favorite.id,
      productId: favorite.productId,
      userId: favorite.userId,
      createdAt: favorite.createdAt,
    };
  }
}
