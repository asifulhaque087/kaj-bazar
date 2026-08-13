import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateMessageRequest,
  ConversationRequest,
  StreamMessagesRequest,
  Offer as IOffer,
} from '@app/common/generated/chat';

export class OfferRequestDto implements IOffer {
  @IsString()
  gigTitle!: string;

  @IsString()
  gigId!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(1)
  deliveryInDays!: number;

  @IsString()
  @IsOptional()
  oldDeliveryDate?: string;

  @IsString()
  @IsOptional()
  newDeliveryDate?: string;

  @IsBoolean()
  @IsOptional()
  accepted?: boolean;

  @IsBoolean()
  @IsOptional()
  cancelled?: boolean;
}

export class CreateMessageRequestDto implements CreateMessageRequest {
  @IsUUID('4', { message: 'conversationId must be a valid UUID v4' })
  conversationId!: string;

  @IsString()
  senderUsername!: string;

  @IsString()
  receiverUsername!: string;

  @IsString()
  senderPicture!: string;

  @IsString()
  receiverPicture!: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsBoolean()
  @IsOptional()
  hasOffer?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => OfferRequestDto)
  offer?: OfferRequestDto;
}

export class FindOrCreateConversationRequestDto implements ConversationRequest {
  @IsString()
  senderUsername!: string;

  @IsString()
  receiverUsername!: string;

  @IsString()
  senderProfilePhoto!: string;

  @IsString()
  receiverProfilePhoto!: string;
}

export class StreamMessagesRequestDto implements StreamMessagesRequest {
  @IsString()
  username!: string;
}
