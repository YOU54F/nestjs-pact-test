import { DynamicModule, Module } from '@nestjs/common';
import { PactV3ConsumerModule } from 'nestjs-pact';
import { PactV3ConsumerConfigOptionsService } from './pact-consumer-config-options.service';
import { AppModule } from '../../src/app.module';

@Module({
  imports: [
    PactV3ConsumerModule.registerAsync({
      imports: [AppModule],
      useClass: PactV3ConsumerConfigOptionsService,
    }) as DynamicModule,
  ],
})
export class PactModule {}