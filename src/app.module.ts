import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { SendModule } from './modules/send/send.module';

@Module({
  imports: [ SendModule ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
