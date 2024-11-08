import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  content : string;
  @ApiProperty()
  createdAt : Date;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  parentId: number | null;
}
