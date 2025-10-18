// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/db";
import type { StartOrderInput } from "@src/validations/order.validation";
import { OrdersTable } from "@src/schemas";
import { eq } from "drizzle-orm";

const startOrder = async (req: Request, res: Response) => {
  const { id, requirement } = req.body as StartOrderInput;

  const [order] = await handleAsync(
    db
      .update(OrdersTable)
      .set({
        orderStartedAt: new Date(),
        orderStatus: "progress",
        requirement: requirement ? requirement : null,
        requirementAt: requirement ? new Date() : null,
      })
      .where(eq(OrdersTable.id, id))
      .returning()
  );

  return res.json(order);
};

export default startOrder;
