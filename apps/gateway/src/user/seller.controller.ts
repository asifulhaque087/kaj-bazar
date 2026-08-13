import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from '../guards/access-token.guard';
import { BearerToken } from '../decorators/bearer-token.decorator';
import { SellerService } from './seller.service';
import { CreateSellerRequestDto, UpdateSellerRequestDto } from '@app/common';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @UseGuards(AccessTokenGuard)
  @Get('current-seller')
  async currentSellr(@BearerToken() token: string) {
    return this.sellerService.currentSeller(token);
  }

  @UseGuards(AccessTokenGuard)
  @Post('create')
  async create(@Body() body: CreateSellerRequestDto, @BearerToken() token: string) {
    return this.sellerService.create(body, token);
  }

  @UseGuards(AccessTokenGuard)
  @Put('update')
  async update(@Body() body: UpdateSellerRequestDto, @BearerToken() token: string) {
    return this.sellerService.update(body, token);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    if (!id) throw new BadRequestException('id not defined');

    return this.sellerService.findById({ id });
  }

  @Get('username/:name')
  async findByName(@Param('name') username: string) {
    if (!username) throw new BadRequestException('username not defined');
    return this.sellerService.findByName({ username });
  }
}
