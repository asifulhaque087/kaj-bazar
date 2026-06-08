import { Module } from '@nestjs/common';
import { GigService } from './gig.service';
import { GigController } from './gig.controller';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GIG_PACKAGE_NAME } from '@app/common/generated/gig';
import { getProtoPath } from '@app/common';
import { createModuleAuthInterceptor } from '../grpc.interceptor';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'GIG_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: GIG_PACKAGE_NAME,
            protoPath: getProtoPath('gig.proto'),
            url: 'gig:50051',
            channelOptions: {
              interceptors: [
                createModuleAuthInterceptor(
                  'gig',
                  configService.getOrThrow('GIG_GATEWAY_SECRET'),
                ),
              ],
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [GigController],
  providers: [GigService],
})
export class GigModule {}
