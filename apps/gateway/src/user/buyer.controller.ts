import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
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

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    if (!id) throw new BadRequestException('id not defined');

    return this.buyerService.findById({ id });
  }

  @Get('username/:name')
  async findByName(@Param('name') username: string) {
    if (!username) throw new BadRequestException('username not defined');

    return this.buyerService.findByName({ username });
  }
}
