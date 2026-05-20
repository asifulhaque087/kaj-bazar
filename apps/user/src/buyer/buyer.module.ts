import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';

@Module({
  // imports: [DrizzleModule],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
