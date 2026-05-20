import {
  BUYER_SERVICE_NAME,
  BuyerServiceClient,
} from '@app/common/generated/user';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { ClientGrpc } from '@nestjs/microservices';
import { createAuthMetadata } from 'apps/gateway/src/utils/create-auth-metadata.util';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BuyerService {
  private buyerGrpcService!: BuyerServiceClient;
  constructor(
    private configService: ConfigService,
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.buyerGrpcService =
      this.client.getService<BuyerServiceClient>(BUYER_SERVICE_NAME);
  }

  async currentBuyer(authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return firstValueFrom(this.buyerGrpcService.currentBuyer({}, metadata));
  }
}
