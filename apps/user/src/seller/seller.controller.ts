import { Controller, UseGuards } from '@nestjs/common';
import { SellerService } from './seller.service';
import {
  SellerResponse,
  SellerServiceController,
  SellerServiceControllerMethods,
} from '@app/common/generated/user';
import { Payload } from '@nestjs/microservices';
import {
  type AuthGrpcRequest,
  CreateSellerRequestDto,
  GrpcGuard,
  SellerByIdRequestDto,
  SellerByNameRequestDto,
  UpdateSellerRequestDto,
} from '@app/common';

@Controller()
@SellerServiceControllerMethods()
export class SellerController implements SellerServiceController {
  constructor(private readonly sellerService: SellerService) {}

  async findById(@Payload() data: SellerByIdRequestDto) {
    return this.sellerService.findById(data) as unknown as SellerResponse;
  }

  async findByName(@Payload() data: SellerByNameRequestDto) {
    return this.sellerService.findByName(data) as unknown as SellerResponse;
  }

  @UseGuards(GrpcGuard)
  async currentSeller(@Payload() data: AuthGrpcRequest) {
    return this.sellerService.currentSeller(data) as unknown as SellerResponse;
  }

  @UseGuards(GrpcGuard)
  async create(@Payload() data: CreateSellerRequestDto) {
    return this.sellerService.create(data);
  }

  @UseGuards(GrpcGuard)
  async update(@Payload() data: UpdateSellerRequestDto) {
    return this.sellerService.update(data) as unknown as SellerResponse;
  }
}
