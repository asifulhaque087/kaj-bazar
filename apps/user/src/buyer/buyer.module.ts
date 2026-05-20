import { Module } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { BuyerController } from './buyer.controller';
import { DrizzleModule } from '@app/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  // imports: [DrizzleModule],
  controllers: [BuyerController],
  providers: [BuyerService],
})
export class BuyerModule {}
