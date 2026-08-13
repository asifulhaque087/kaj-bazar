import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { SendEmailEventRequestDto } from '@app/common';
import { Controller } from '@nestjs/common';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send-email')
  sendEmail(@Payload() data: SendEmailEventRequestDto) {
    return this.emailService.sendEmail(data);
  }
}
