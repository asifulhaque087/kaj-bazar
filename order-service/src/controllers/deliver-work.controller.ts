import type { Request, Response } from "express";
import { handleAsync, uploads } from "@fvoid/shared-lib";
import { db } from "@src/db";
import type { DeliverWorkInput } from "@src/validations/order.validation";
import { OrdersTable } from "@src/schemas";
import { eq } from "drizzle-orm";

const deliverWork = async (req: Request, res: Response) => {
  const { id, file, message } = req.body as DeliverWorkInput;

  const io = req.io!;

  // Retrieve the existing order to get the current deliveredWorks array
  const [existingOrder] = await handleAsync(
    db
      .select({ deliveredWorks: OrdersTable.deliveredWorks })
      .from(OrdersTable)
      .where(eq(OrdersTable.id, id))
  );

  if (!existingOrder) {
    return res.status(404).json({ error: "Order not found" });
  }

  const uploadResult = await uploads(file);

  // Create the new delivered work object
  const newDeliveredWork = {
    file: uploadResult?.secure_url,
    ...(message && { message }),
  };

  // Construct the updated deliveredWorks array
  const updatedDeliveredWorks = existingOrder.deliveredWorks
    ? [...existingOrder.deliveredWorks, newDeliveredWork]
    : [newDeliveredWork];

  // Update the order in the database with the new deliveredWorks and timestamp
  const [order] = await handleAsync(
    db
      .update(OrdersTable)
      .set({
        deliveredWorks: updatedDeliveredWorks,
        orderDeliveredAt: new Date(),
      })
      .where(eq(OrdersTable.id, id))
      .returning()
  );

  io.emit("order notification", "deliver order", order);

  return res.json(order);
};

export default deliverWork;
