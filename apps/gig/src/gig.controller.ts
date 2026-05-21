import { Controller } from '@nestjs/common';
import { GigService } from './gig.service';
import {
  Gig,
  GigResponseList,
  GigServiceController,
  GigServiceControllerMethods,
  SearchGigResponse,
  SeedGigsResponse,
  SellerGigsResponse,
} from '@app/common/generated/gig';
import { Payload } from '@nestjs/microservices';
import {
  CreateGigDto,
  GigByIdDto,
  SearchGigDto,
  SeedGigsDto,
  SellerGigsDto,
  UpdateGigDto,
} from '@app/common';

@Controller()
@GigServiceControllerMethods()
export class GigController implements GigServiceController {
  constructor(private readonly gigService: GigService) {}

  async findById(@Payload() data: GigByIdDto) {
    return this.gigService.findById(data) as unknown as Gig;
  }

  async search(@Payload() data: SearchGigDto) {
    return this.gigService.search(data) as unknown as SearchGigResponse;
  }

  async sellerGigs(@Payload() data: SellerGigsDto) {
    return this.gigService.sellerGigs(data) as unknown as SellerGigsResponse;
  }

  async create(@Payload() data: CreateGigDto) {
    return this.gigService.create(data) as unknown as GigResponseList;
  }

  async update(@Payload() data: UpdateGigDto) {
    return this.gigService.update(data) as unknown as GigResponseList;
  }

  async seedGigs(@Payload() data: SeedGigsDto) {
    return this.gigService.seedGigs(data) as unknown as SeedGigsResponse;
  }
}
