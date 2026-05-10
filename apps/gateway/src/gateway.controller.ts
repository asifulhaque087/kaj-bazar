import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  async getHello() {
    // return "hello world from gateway"
    return this.gatewayService.register();
  }
}
