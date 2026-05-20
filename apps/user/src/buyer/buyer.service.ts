import {
  AuthGrpcRequest,
  BuyerByIdDto,
  DRIZZLE,
  RegisterBuyerDto,
  throwGrpcError,
  tryit,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from 'apps/user/drizzle/drizzle';
import { BuyersTable } from 'apps/user/src/schemas';
import { eq, SQL } from 'drizzle-orm';

@Injectable()
export class BuyerService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findById(data: BuyerByIdDto) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.id, data.id),
      }),
    );

    if (buyerErr) throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
    // return {
    //   ...buyer,
    //   country: buyer?.country ?? undefined,
    // };
  }

  async findByName(data: any) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.username, data.username),
      }),
    );

    if (buyerErr) throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
  }

  async currentBuyer(data: AuthGrpcRequest) {
    const [buyer, buyerErr] = await tryit(
      this.db.query.BuyersTable.findFirst({
        where: eq(BuyersTable.email, data.user.email),
      }),
    );

    if (buyerErr) throwGrpcError('INTERNAL', buyerErr.message);
    if (!buyer) throwGrpcError('INVALID_ARGUMENT', 'Invalid Credentials');

    return buyer;
  }

  async create(data: RegisterBuyerDto) {
    const [buyer, err] = await tryit(
      this.db
        .insert(BuyersTable)
        .values({
          ...data,
          profilePublicId: 'this',
        })
        .returning()
        .then((res) => res[0]),
    );

    if (err) throwGrpcError('INTERNAL', err.message);

    return buyer;
  }
}
