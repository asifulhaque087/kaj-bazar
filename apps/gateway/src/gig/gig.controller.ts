import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GigService } from './gig.service';
import {
  CreateGigDto,
  GigByIdDto,
  SearchGigDto,
  SellerGigsDto,
  UpdateGigDto,
} from '@app/common';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Post()
  async create(@Body() data: CreateGigDto) {
    // try {
    //   const result = await this.gigService.create(data);
    //   return result
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
    return this.gigService.create(data);
  }

  async update(@Body() data: UpdateGigDto) {
    return this.gigService.update(data);
  }

  @Get('search')
  async searchGig(@Query() query: SearchGigDto) {
    return this.gigService.search(query);
  }

  @Get('seller/:sellerId')
  async sellerGigs(
    @Param('sellerId') sellerId: string,
    @Query('activeGigs') activeGigs?: string,
  ) {
    const payload: SellerGigsDto = {
      sellerId,
      activeGigs,
    };

    return this.gigService.sellerGigs(payload);
  }

  @Get(':id')
  async findById(@Param() params: GigByIdDto) {
    return this.gigService.findById(params);
  }
}
