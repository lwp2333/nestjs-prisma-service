import { Module } from '@nestjs/common';
import { TraslateService } from './traslate.service';
import { TraslateController } from './traslate.controller';

@Module({
  controllers: [TraslateController],
  providers: [TraslateService],
})
export class TraslateModule {}
