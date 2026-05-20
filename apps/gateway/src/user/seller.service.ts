import { CreateSellerDto, UpdateSellerDto } from '@app/common';
import {
  FindByIdRequest,
  FindByNameRequest,
  SELLER_SERVICE_NAME,
  SellerServiceClient,
} from '@app/common/generated/user';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { ClientGrpc } from '@nestjs/microservices';
import { createAuthMetadata } from 'apps/gateway/src/utils/create-auth-metadata.util';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SellerService {
  private sellerGrpcService!: SellerServiceClient;
  constructor(
    private configService: ConfigService,
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.sellerGrpcService =
      this.client.getService<SellerServiceClient>(SELLER_SERVICE_NAME);
  }

  async currentSeller(authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return firstValueFrom(this.sellerGrpcService.currentSeller({}, metadata));
  }

  async findById(data: FindByIdRequest) {
    return firstValueFrom(this.sellerGrpcService.findById(data));
  }

  async findByName(data: FindByNameRequest) {
    return firstValueFrom(this.sellerGrpcService.findByName(data));
  }

  async create(data: CreateSellerDto, authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return firstValueFrom(this.sellerGrpcService.create(data, metadata));
  }

  async update(data: UpdateSellerDto, authHeader: string) {
    const metadata = createAuthMetadata(authHeader);
    return firstValueFrom(this.sellerGrpcService.update(data, metadata));
  }
}
