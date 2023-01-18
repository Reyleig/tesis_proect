import { ApiProperty } from '@nestjs/swagger';

export class GenericDto {
    @ApiProperty()
    status: number;
    @ApiProperty()
    recomendation: string;
    @ApiProperty()
    payload: any;
}
