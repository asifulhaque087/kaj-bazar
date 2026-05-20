import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { DrizzleModule } from '@app/common';

@Module({
  // imports: [DrizzleModule],
  // imports: [],
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
