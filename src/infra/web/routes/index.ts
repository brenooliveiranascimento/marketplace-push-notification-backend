import { FastifyInstance } from "fastify";
import * as AuthRoutes from "./user.routes";
import * as Product from "./product.routes";
import * as CreditCard from "./credit-card.routes";
import * as Order from "./order.routes";
import * as Favorite from "./favorite.routes";

export const register = (fasify: FastifyInstance) => {
  fasify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    Product.configure(instance);
    CreditCard.configure(instance);
    Order.configure(instance);
    Favorite.configure(instance);
    done();
  });
};
