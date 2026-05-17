import { Module } from '@nestjs/common';
import { BuyerController } from './buyer/buyer.controller';
import { BuyerModule } from './buyer/buyer.module';

@Module({
  imports: [BuyerModule],
  controllers: [BuyerController],
  providers: [],
})
export class UserModule {}
