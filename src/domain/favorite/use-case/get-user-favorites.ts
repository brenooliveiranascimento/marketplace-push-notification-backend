import { FavoriteRepository } from "../../../infra/database/typeorm/market-place/repositories/favorite.repository";

interface GetUserFavoritesRequest {
  userId: number;
}

export class GetUserFavoritesUseCase {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  async execute({ userId }: GetUserFavoritesRequest) {
    const favorites = await this.favoriteRepository.findByUserId(userId);

    return favorites.map((favorite) => ({
      id: favorite.id,
      productId: favorite.productId,
      product: favorite.product,
      createdAt: favorite.createdAt,
    }));
  }
}
