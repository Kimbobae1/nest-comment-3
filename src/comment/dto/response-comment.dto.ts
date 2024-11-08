import { ApiProperty } from '@nestjs/swagger';

export class ResponseCommentDto {
  @ApiProperty()
  id : number;
  @ApiProperty()
  content : string;
  @ApiProperty()
  createdAt : Date;
  @ApiProperty()
  postId: number;
  @ApiProperty()
  parentId: number | null;
  @ApiProperty()
  likeCount : number;
  @ApiProperty()
  reportCount : number;
}
