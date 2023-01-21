import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserPasswordDto {
    token: string;
    @ApiProperty()
    newPassword: string;
    @ApiProperty()
    actualPassword: string;
}
