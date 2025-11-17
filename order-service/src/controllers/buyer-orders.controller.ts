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
import { sql } from "drizzle-orm";

const buyerOrders = async (req: Request, res: Response) => {
  const { buyerId } = req.params;

  if (!buyerId) throw new BadRequestError("Order id not found");

  const [orderError, orders] = await catchError(
    db
      .select()
      .from(OrdersTable)
      .where(sql`${OrdersTable.buyer} ->> 'id' = ${buyerId}`)
  );

  if (orderError) throw new ConnectionError("Error fetching buyer orders!");

  return res.json(orders);
};

export default buyerOrders;
