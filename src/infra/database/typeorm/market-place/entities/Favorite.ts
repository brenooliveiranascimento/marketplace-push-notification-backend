import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: "user_id", type: "int", nullable: false })
  userId: number;

  @Column({ name: "product_id", type: "int", nullable: false })
  productId: number;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false,
  })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @ManyToOne(() => Product, (product) => product.favorites)
  @JoinColumn({ name: "product_id", referencedColumnName: "id" })
  product?: Product;
}
