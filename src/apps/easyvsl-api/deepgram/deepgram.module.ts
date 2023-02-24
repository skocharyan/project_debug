import { HttpModule } from '@modules/secondary/api/http/http.module';
import { Module } from '@nestjs/common';
import { DeepGramService } from './deepgram.service';

@Module({
  imports: [HttpModule],
  providers: [DeepGramService],
  exports: [DeepGramService]
})
export class DeepGramModule {}
