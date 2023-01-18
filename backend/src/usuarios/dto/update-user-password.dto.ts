import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    newPassword: string;
    @ApiProperty()
    actualPassword: string;
}
