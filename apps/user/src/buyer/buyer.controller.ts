import { Controller } from '@nestjs/common';
import { BuyerService } from './buyer.service';

@Controller("buyers")
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {}
}
