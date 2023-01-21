import { ApiProperty } from "@nestjs/swagger";

export class UpdatePasswordDto{
    @ApiProperty()
    id: number;
    @ApiProperty()
    newPassword: string;
}
