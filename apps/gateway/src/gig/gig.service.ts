import {
  CreateGigRequestDto,
  GigByIdRequestDto,
  SearchGigRequestDto,
  SellerGigsRequestDto,
  UpdateGigRequestDto,
} from '@app/common';
import { GIG_SERVICE_NAME, GigServiceClient } from '@app/common/generated/gig';
import { Inject, Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GigService {
  private gigGrpcService!: GigServiceClient;

  constructor(@Inject('GIG_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.gigGrpcService =
      this.client.getService<GigServiceClient>(GIG_SERVICE_NAME);
  }

  async search(data: SearchGigRequestDto) {
    return firstValueFrom(this.gigGrpcService.search(data));
  }

  async create(data: CreateGigRequestDto) {
    return firstValueFrom(this.gigGrpcService.create(data));
  }

  async update(data: UpdateGigRequestDto) {
    return firstValueFrom(this.gigGrpcService.update(data));
  }

  async sellerGigs(data: SellerGigsRequestDto) {
    return firstValueFrom(this.gigGrpcService.sellerGigs(data));
  }

  async findById(data: GigByIdRequestDto) {
    return firstValueFrom(this.gigGrpcService.findById(data));
  }
}
