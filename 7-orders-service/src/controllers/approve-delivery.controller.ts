import type { Request, Response } from "express";
import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import { OrdersTable } from "@src/schemas";
import { eq } from "drizzle-orm";
import type { ApproveDeliveryInput } from "@src/validations/order.validation";

const approveDelivery = async (req: Request, res: Response) => {
  const { id } = req.body as ApproveDeliveryInput;

  const [order] = await handleAsync(
    db
      .update(OrdersTable)
      .set({
        accepted: true,
        acceptedAt: new Date(),
      })
      .where(eq(OrdersTable.id, id!))
      .returning()
  );

  return res.json(order);
};

export default approveDelivery;
