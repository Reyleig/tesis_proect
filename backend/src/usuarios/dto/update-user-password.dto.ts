import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    newPassword: string;
    @ApiProperty()
    actualPassword: string;
}
