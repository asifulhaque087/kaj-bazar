// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import type { CreteOrderInput } from "@src/validations/order.validation";
import { OrdersTable } from "@src/drizzle/schemas";

const createOrder = async (req: Request, res: Response) => {
  const {
    buyer,
    gig,
    messageId,
    price,
    seller,
    deliveryInDays,
    paymentIntent,
  } = req.body as CreteOrderInput;

  // . Get future date
  const today = new Date();
  const calculatedDeliveryDate = new Date(today);
  calculatedDeliveryDate.setDate(today.getDate() + deliveryInDays);
  // Prepare auth data
  const orderData = {
    buyer,
    gig,
    messageId,
    price,
    seller,
    deliveryInDays,
    // deliveryDueDate,
    deliveryDueDate: calculatedDeliveryDate,
    paymentIntent,
  };

  // Create auth user in database
  const order = await handleAsync(
    db
      .insert(OrdersTable)
      .values(orderData)
      .returning()
      .then((res) => res[0])
  );

  return res.json(order);
};

export default createOrder;
