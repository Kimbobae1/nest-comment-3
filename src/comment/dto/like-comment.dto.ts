import { ApiProperty } from '@nestjs/swagger';

export class LikeCommentDto {
  @ApiProperty()
  name : string;
}