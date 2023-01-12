import { HttpStatus, Injectable } from '@nestjs/common';
import { GenericDto } from '../general/generic.dto';

@Injectable()
export class UtilityService {
    genericDto: GenericDto = new GenericDto();

    async serviceResponse(status?: number, payload?: any, recomendation?: string,) {
        this.genericDto.status = status;
        this.genericDto.recomendation = recomendation;
        this.genericDto.payload = payload;
        return this.genericDto;
    }
}
