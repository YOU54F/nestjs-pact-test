import { Module } from '@nestjs/common';
import { PactV2ConsumerModule } from 'nestjs-pact';
import { PactV2ConsumerConfigOptionsService } from './pact-consumer-config-options.service';
import { AppModule } from '../../src/app.module';

@Module({
  imports: [
    PactV2ConsumerModule.registerAsync({
      imports: [AppModule],
      useClass: PactV2ConsumerConfigOptionsService,
    }),
  ],
})
export class PactModule {}