import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesController } from './times.controller';
import { TimesService } from './times.service';
import { TimeDeportista } from './entities/time_deportista.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TimeDeportista]), ],
  controllers: [TimesController],
  providers: [TimesService]
})
export class TimesModule {}
