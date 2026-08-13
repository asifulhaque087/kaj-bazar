import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GigService } from './gig.service';
import {
  CreateGigRequestDto,
  GigByIdRequestDto,
  SearchGigRequestDto,
  SellerGigsRequestDto,
  UpdateGigRequestDto,
} from '@app/common';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Post()
  async create(@Body() data: CreateGigRequestDto) {
    // try {
    //   const result = await this.gigService.create(data);
    //   return result
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }
    return this.gigService.create(data);
  }

  async update(@Body() data: UpdateGigRequestDto) {
    return this.gigService.update(data);
  }

  @Get('search')
  async searchGig(@Query() query: SearchGigRequestDto) {
    return this.gigService.search(query);
  }

  @Get('seller/:sellerId')
  async sellerGigs(
    @Param('sellerId') sellerId: string,
    @Query('activeGigs') activeGigs?: string,
  ) {
    const payload: SellerGigsRequestDto = {
      sellerId,
      activeGigs,
    };

    return this.gigService.sellerGigs(payload);
  }

  @Get(':id')
  async findById(@Param() params: GigByIdRequestDto) {
    return this.gigService.findById(params);
  }
}
