import { Controller, UseGuards } from '@nestjs/common';
import { BuyerService } from './buyer.service';
import {
  BuyerResponse,
  BuyerServiceController,
  BuyerServiceControllerMethods,
} from '@app/common/generated/user';
import { EventPattern, Payload } from '@nestjs/microservices';
import {
  type AuthGrpcRequest,
  BuyerByIdDto,
  BuyerByNameDto,
  GrpcGuard,
  RegisterBuyerDto,
} from '@app/common';

@Controller()
@BuyerServiceControllerMethods()
export class BuyerController implements BuyerServiceController {
  constructor(private readonly buyerService: BuyerService) {}

  async findById(@Payload() data: BuyerByIdDto) {
    return this.buyerService.findById(data) as unknown as BuyerResponse;
  }

  async findByName(@Payload() data: BuyerByNameDto) {
    return this.buyerService.findByName(data) as unknown as BuyerResponse;
  }

  @UseGuards(GrpcGuard)
  async currentBuyer(@Payload() data: AuthGrpcRequest) {
    return this.buyerService.currentBuyer(data) as unknown as BuyerResponse;
  }

  // async currentBuyer(@Payload() data: AuthGrpcRequest) {
  //   return this.buyerService.currentBuyer(data) as unknown as BuyerResponse;
  // }

  @EventPattern('user-created')
  async registerBuyer(@Payload() data: RegisterBuyerDto) {
    await this.buyerService.create(data);
  }
}
