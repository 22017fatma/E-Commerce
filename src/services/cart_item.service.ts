import { db } from "../db/client";
import { cart_items, carts } from "../models/schema";
import { eq, and } from "drizzle-orm";
import { ROLES } from "../types";

export async function getAllCartItems(
  role: ROLES,
  cartId: number,
  userId: number
) {
  if (role === ROLES.ADMIN) {
    return await db.select().from(cart_items);
  }
  if (role === ROLES.USER) {
    await doesUserOwnCart(userId, cartId);

    return await db
      .select()
      .from(cart_items)
      .where(eq(cart_items.cart_id, cartId));
  }
}

export async function getCartItemById(id: number) {
  const result = await db
    .select()
    .from(cart_items)
    .where(eq(cart_items.id, id));
  if (result.length === 0) throw new Error("Cart item not found");
  return result[0];
}

export async function createCartItem(data: {
  product_id: number;
  cart_id: number;
  quantity: number;
}) {
  if (data.quantity <= 0) throw new Error("Quantity must be greater than 0");
  const result = await db.insert(cart_items).values(data);
  return result;
}

export async function deleteCartItem(
  id: number,
  cartId: number,
  userId: number
) {
  await doesUserOwnCart(userId, cartId);

  const result = await db
    .delete(cart_items)
    .where(and(eq(cart_items.id, id), eq(cart_items.cart_id, cartId)));
  if (!result) throw new Error("Cart item not found");
  return result;
}

export async function updateCartItem(
  id: number,
  cartId: number,
  userId: number,
  data: { cart_id?: number; product_id?: number; quantity?: number },
) {
  await doesUserOwnCart(userId, cartId);

  if (data.quantity !== undefined && data.quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
  const result = await db
    .update(cart_items)
    .set(data)
    .where(and(eq(cart_items.id, id), eq(cart_items.cart_id, cartId)));
  if (!result) throw new Error("Cart item not found");
  return result;
}



/**------------------------------------HELPERS----------------------------------------------------------------------- */
export const doesUserOwnCart = async (userId: number, cartId: number) => {
  const foundCart = await db.query.carts.findFirst({
    where: eq(carts.id, cartId),
    with: {
      user: {
        columns: {
          id: true,
        },
      },
    },
  });

  if (!foundCart || foundCart.user?.id !== userId)
    throw new Error("You don't have access to this cart");
};
