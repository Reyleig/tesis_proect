import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SwimmersService } from './swimmers.service';
import { CreateSwimmerDto } from './dto/create-swimmer.dto';
import { UpdateSwimmerDto } from './dto/update-swimmer.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('swimmers')
export class SwimmersController {
  constructor(private readonly swimmersService: SwimmersService) {}

  @Post()
  create(@Body() createSwimmerDto: CreateSwimmerDto) {
    return this.swimmersService.create(createSwimmerDto);
  }
  
 
  @Get()
  findAll() {
    return this.swimmersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.swimmersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwimmerDto: UpdateSwimmerDto) {
    return this.swimmersService.update(+id, updateSwimmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.swimmersService.remove(+id);
  }
}
