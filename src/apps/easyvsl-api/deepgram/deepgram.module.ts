import { HttpModule } from '@modules/secondary/api/http/http.module';
import { Module } from '@nestjs/common';
import { DeepGramService } from './deepgram.service';

@Module({
  imports: [
    HttpModule.register({
      baseUrl: '',
      timeout: 5000,
      keepAlive: false
    })
  ],
  providers: [DeepGramService],
  exports: [DeepGramService]
})
export class DeepGramModule {}
