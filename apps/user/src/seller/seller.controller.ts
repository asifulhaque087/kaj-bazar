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
  CreateSellerDto,
  GrpcGuard,
  SellerByIdDto,
  SellerByNameDto,
  UpdateSellerDto,
} from '@app/common';

@Controller()
@SellerServiceControllerMethods()
export class SellerController implements SellerServiceController {
  constructor(private readonly sellerService: SellerService) {}

  async findById(@Payload() data: SellerByIdDto) {
    return this.sellerService.findById(data) as unknown as SellerResponse;
  }

  async findByName(@Payload() data: SellerByNameDto) {
    return this.sellerService.findByName(data) as unknown as SellerResponse;
  }

  @UseGuards(GrpcGuard)
  async currentSeller(@Payload() data: AuthGrpcRequest) {
    return this.sellerService.currentSeller(data) as unknown as SellerResponse;
  }

  @UseGuards(GrpcGuard)
  async create(@Payload() data: CreateSellerDto) {
    return this.sellerService.create(data);
  }

  @UseGuards(GrpcGuard)
  async update(@Payload() data: UpdateSellerDto) {
    return this.sellerService.update(data) as unknown as SellerResponse;
  }
}
