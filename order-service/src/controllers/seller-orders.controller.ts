// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import {
  BadRequestError,
  catchError,
  ConnectionError,
} from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrdersTable } from "@src/schemas";
import { and, eq, sql } from "drizzle-orm";

type OrderStatus = "incomplete" | "progress" | "complete";

const sellerOrders = async (req: Request, res: Response) => {
  const { sellerId } = req.params;

  if (!sellerId) throw new BadRequestError("Order id not found");

  let { status } = req.query;

  const filters = [sql`${OrdersTable.seller} ->> 'id' = ${sellerId}`];

  if (status) filters.push(eq(OrdersTable.orderStatus, status as OrderStatus));

  const conditions = and(...filters);

  const [orderError, orders] = await catchError(
    db.query.OrdersTable.findMany({
      where: conditions,
    })
  );

  if (orderError) throw new ConnectionError("Error fetching seller orders!");

  return res.json(orders);
};

export default sellerOrders;
