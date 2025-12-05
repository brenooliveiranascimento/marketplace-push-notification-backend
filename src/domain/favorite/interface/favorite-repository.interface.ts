import { Favorite } from "../../../infra/database/typeorm/market-place/entities/Favorite";

export interface IFavoriteRepository {
  create(userId: number, productId: number): Promise<Favorite>;
  delete(userId: number, productId: number): Promise<void>;
  findByUserAndProduct(userId: number, productId: number): Promise<Favorite | null>;
  findByProductId(productId: number): Promise<Favorite[]>;
  findByUserId(userId: number): Promise<Favorite[]>;
}
