import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { SendEmailEventDto } from '@app/common';
import { Controller } from '@nestjs/common';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('send-email')
  sendEmail(@Payload() data: SendEmailEventDto) {
    return this.emailService.sendEmail(data);
  }
}
