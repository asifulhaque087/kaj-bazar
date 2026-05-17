import { Module } from '@nestjs/common';
import { BuyerController } from './buyer/buyer.controller';
import { BuyerModule } from './buyer/buyer.module';
import { SellerModule } from './seller/seller.module';

@Module({
  imports: [BuyerModule, SellerModule],
  controllers: [BuyerController],
  providers: [],
})
export class UserModule {}
