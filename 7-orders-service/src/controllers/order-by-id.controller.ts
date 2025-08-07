// ** Third Party Imports
import type { Request, Response } from "express";

// ** Local Imports
import { BadRequestError, handleAsync } from "@fvoid/shared-lib";
import { db } from "@src/drizzle/db";
import { OrdersTable } from "@src/drizzle/schemas";
import { eq } from "drizzle-orm";

const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("the id is $$$$$$$$$$$$$$$  ", id);

  if (!id) throw new BadRequestError("Id is not defined");

  const order = await handleAsync(
    db.query.OrdersTable.findFirst({
      where: eq(OrdersTable.id, id),
    })
  );

  return res.json(order);
};

export default getOrderById;
