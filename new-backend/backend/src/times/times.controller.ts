import { Body, Controller, Post } from '@nestjs/common';
import { CreateTimesDeportistaDto } from './dto/create-times-deportistas.dto';
import { TimesService } from './times.service';

@Controller('times')
export class TimesController {
    constructor(private readonly timesService: TimesService) {}


    @Post()
    create(@Body() createSwimmerDto: CreateTimesDeportistaDto) {
      return  this.timesService.create(createSwimmerDto);
    } 
    

}
