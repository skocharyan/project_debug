import { Module } from '@nestjs/common';
import { PostmarkService } from '@modules/secondary/mail/postmark.service';

@Module({
  providers: [PostmarkService],
  exports: [PostmarkService]
})
export class PostmarkModule {}
