import { DRIZZLE, throwGrpcError, tryit } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from 'apps/user/drizzle/drizzle';
import { BuyersTable } from 'apps/user/src/schemas';
import { eq } from 'drizzle-orm';

@Injectable()
export class BuyerService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findById(data: any) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.id, data.id),
      }),
    );

    if (buyerErr) return throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
  }

  async findByName(data: any) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.username, data.username),
      }),
    );

    if (buyerErr) return throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
  }

  async currentBuyer(data: any) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.email, data.email),
      }),
    );

    if (buyerErr) return throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer)
      return throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
  }
}
