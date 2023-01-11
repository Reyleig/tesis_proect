import { Module } from '@nestjs/common';
import { SwimmersService } from './swimmers.service';
import { SwimmersController } from './swimmers.controller';
import { Swimmer } from './entities/swimmer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Swimmer]), ],
  controllers: [SwimmersController],
  providers: [SwimmersService]
})
export class SwimmersModule {}
