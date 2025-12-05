import { MarketPlaceDataSource } from "../data-source";
import { Favorite } from "../entities/Favorite";
import { IFavoriteRepository } from "../../../../../domain/favorite/interface/favorite-repository.interface";

export class FavoriteRepository implements IFavoriteRepository {
  private repository = MarketPlaceDataSource.getRepository(Favorite);

  async create(userId: number, productId: number): Promise<Favorite> {
    const favorite = this.repository.create({
      userId,
      productId,
    });

    return this.repository.save(favorite);
  }

  async delete(userId: number, productId: number): Promise<void> {
    await this.repository.delete({
      userId,
      productId,
    });
  }

  async findByUserAndProduct(
    userId: number,
    productId: number
  ): Promise<Favorite | null> {
    return this.repository.findOne({
      where: {
        userId,
        productId,
      },
    });
  }

  async findByProductId(productId: number): Promise<Favorite[]> {
    return this.repository.find({
      where: {
        productId,
      },
      relations: ["user"],
    });
  }

  async findByUserId(userId: number): Promise<Favorite[]> {
    return this.repository.find({
      where: {
        userId,
      },
      relations: ["product"],
    });
  }
}
