import { FavoriteRepository } from "../../../infra/database/typeorm/market-place/repositories/favorite.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";

interface RemoveFavoriteRequest {
  userId: number;
  productId: number;
}

export class RemoveFavoriteUseCase {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  async execute({ userId, productId }: RemoveFavoriteRequest) {
    const existingFavorite = await this.favoriteRepository.findByUserAndProduct(
      userId,
      productId
    );

    if (!existingFavorite) {
      throw new NotFoundError("Favorito não encontrado");
    }

    await this.favoriteRepository.delete(userId, productId);
  }
}
