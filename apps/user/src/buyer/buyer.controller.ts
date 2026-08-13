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
  BuyerByIdRequestDto,
  BuyerByNameRequestDto,
  GrpcGuard,
  RegisterBuyerRequestDto,
} from '@app/common';

@Controller()
@BuyerServiceControllerMethods()
export class BuyerController implements BuyerServiceController {
  constructor(private readonly buyerService: BuyerService) {}

  async findById(@Payload() data: BuyerByIdRequestDto) {
    return this.buyerService.findById(data) as unknown as BuyerResponse;
  }

  async findByName(@Payload() data: BuyerByNameRequestDto) {
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
  async registerBuyer(@Payload() data: RegisterBuyerRequestDto) {
    await this.buyerService.create(data);
  }
}
