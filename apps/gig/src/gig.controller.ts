import { Controller } from '@nestjs/common';
import { GigService } from './gig.service';
import {
  Gig,
  GigServiceController,
  GigServiceControllerMethods,
  SearchGigResponse,
  SeedGigsResponse,
  SellerGigsResponse,
} from '@app/common/generated/gig';
import { Payload } from '@nestjs/microservices';
import {
  CreateGigRequestDto,
  GigByIdRequestDto,
  SearchGigRequestDto,
  SeedGigsRequestDto,
  SellerGigsRequestDto,
  UpdateGigRequestDto,
} from '@app/common';

@Controller()
@GigServiceControllerMethods()
export class GigController implements GigServiceController {
  constructor(private readonly gigService: GigService) {}

  async findById(@Payload() data: GigByIdRequestDto) {
    return this.gigService.findById(data) as unknown as Gig;
  }

  async search(@Payload() data: SearchGigRequestDto) {
    return this.gigService.search(data) as unknown as SearchGigResponse;
  }

  async sellerGigs(@Payload() data: SellerGigsRequestDto) {
    return this.gigService.sellerGigs(data) as unknown as SellerGigsResponse;
  }

  async create(@Payload() data: CreateGigRequestDto) {
    return this.gigService.create(data) as unknown as Gig;
  }

  async update(@Payload() data: UpdateGigRequestDto) {
    return this.gigService.update(data) as unknown as Gig;
  }

  async seedGigs(@Payload() data: SeedGigsRequestDto) {
    return this.gigService.seedGigs(data) as unknown as SeedGigsResponse;
  }
}
