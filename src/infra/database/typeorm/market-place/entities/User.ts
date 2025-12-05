import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Rating } from "./Rating";
import { Comment } from "./Comment";
import { UserAvatar } from "./UserAvatar";
import { CreditCard } from "./CreditCard";
import { Favorite } from "./Favorite";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "phone", type: "varchar", nullable: true })
  phone?: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "notification_token", type: "varchar", nullable: true })
  notificationToken?: string;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false,
  })
  createdAt: Date;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings?: Rating[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @OneToMany(() => CreditCard, (creditCard) => creditCard.user)
  creditCards?: CreditCard[];

  @OneToOne(() => UserAvatar, (userAvatar) => userAvatar.user)
  avatar?: UserAvatar;

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites?: Favorite[];
}
