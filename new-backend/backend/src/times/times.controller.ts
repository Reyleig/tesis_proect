import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateTimesDeportistaDto } from './dto/create-times-deportistas.dto';
import { TimesService } from './times.service';

@Controller('times')
export class TimesController {
    constructor(private readonly timesService: TimesService) {}


    @Post("/create")
    create(@Res() response,@Body() createSwimmerDto: CreateTimesDeportistaDto) {
      return  this.timesService.create(createSwimmerDto,response);
    } 
    

}
