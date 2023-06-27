import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { SendController } from './send.controller';

@Module({
  controllers: [SendController],
  providers: [SendService]
})
export class SendModule {}
