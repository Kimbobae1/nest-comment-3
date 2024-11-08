import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '이름' })
  title : string;
  @ApiProperty({ description: '이름' })
  content : string;
  @ApiProperty({ description: '이름' })
  createdAt : Date;
}
