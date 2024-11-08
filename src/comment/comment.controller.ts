import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';
import { ReportCommentDto } from './dto/report-comment.dto';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("댓글")
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({status: 201})
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    await this.commentService.create(createCommentDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '잘 만들어졌따',
    }
  }

  @ApiResponse({status: 200, type: ResponseCommentDto})
  @Get()
  async findAll() {
    const comments = await this.commentService.findAll()
    const responseCommentDtos : ResponseCommentDto[] = [];
    comments.forEach(comment => {
      const dto = new ResponseCommentDto();
      dto.id = comment.id;
      dto.content = comment.content;
      dto.postId = comment.postId;
      dto.parentId = comment.parentId;
      dto.createdAt = comment.createdAt;
      dto.likeCount = comment.like ? comment.like.length : 0;
      dto.reportCount = comment.report ? comment.report.length : 0;
      responseCommentDtos.push(dto);
    });
    return responseCommentDtos;
  }

  @ApiResponse({status: 200, type: ResponseCommentDto})
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const comment = await this.commentService.findOne(+id);
    const responseCommentDto = new ResponseCommentDto();
    responseCommentDto.id = comment.id;
    responseCommentDto.content = comment.content;
    responseCommentDto.postId = comment.postId;
    responseCommentDto.parentId = comment.postId;
    responseCommentDto.createdAt = comment.createdAt;
    if(comment.like) {
      responseCommentDto.likeCount = comment.like.length;
    }
    if (comment.report) {
      responseCommentDto.reportCount = comment.report.length;
    }
    return responseCommentDto;
  }

  @ApiResponse({status: 200})
  @Patch(':id/like')
  like(@Param('id') id: string, @Body() likeCommentDto : LikeCommentDto) {
    this.commentService.like(+id, likeCommentDto);
    return {
      statusCode: HttpStatus.OK,
      message: '좋아용',
    };
  }

  @ApiResponse({status: 200})
  @Patch(':id/report')
  report(@Param('id') id: string, @Body() reportCommentDto : ReportCommentDto) {
    this.commentService.report(+id, reportCommentDto)
    return {
      statusCode: HttpStatus.OK,
      message: '신고용',
    };
  }

  @ApiResponse({status: 200})
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.commentService.remove(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '삭제용',
    };
  }
}
