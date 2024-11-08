import { ApiProperty } from '@nestjs/swagger';

export class ReportCommentDto {
  @ApiProperty()
  name : string;
}