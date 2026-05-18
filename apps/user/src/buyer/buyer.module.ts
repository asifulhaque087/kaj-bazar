import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { DrizzleModule } from '@app/common';

@Module({
  // imports: [DrizzleModule],
  imports: [],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
