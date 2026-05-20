import { Controller, Get, UseGuards } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import { AccessTokenGuard } from 'apps/gateway/src/guards/access-token.guard';
import { BearerToken } from 'apps/gateway/src/decorators/bearer-token.decorator';

@Controller('buyer')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}

  // @UseGuards(AccessTokenGuard)
  // @Get('current-buyer')
  // async currentBuyer(@BearerToken() token: string) {
  //   console.log('gateway controller 1');
  //   return this.buyerService.currentBuyer(token);
  // }

  @UseGuards(AccessTokenGuard)
  @Get('current-buyer')
  async currentBuyer(@BearerToken() token: string) {
    console.log('gateway controller 1');
    return this.buyerService.currentBuyer(token);
  }
}
