import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikeCommentDto } from './dto/like-comment.dto';
import { ReportCommentDto } from './dto/report-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  create(createCommentDto: CreateCommentDto) {
    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.createdAt = createCommentDto.createdAt;
    comment.parentId = createCommentDto.parentId;
    comment.postId = createCommentDto.postId;
    return comment.save();
  }

  async findAll() {
    const comment = await Comment.find();
    return comment.filter(comment => !comment.report || comment.report.length < 10);
  }

  async findOne(id: number) {
    return await Comment.findOne({where : {id : id}});
  }

  async like(id: number, likeCommentDto : LikeCommentDto) {
    const comment = await Comment.findOne({where : {id : id}});
    if(!comment.like.includes(likeCommentDto.name)) {
      comment.like.push(likeCommentDto.name);
    }
    return comment.save();
  }

  async report(id: number, reportCommentDto : ReportCommentDto) {
    const comment = await Comment.findOne({where : {id : id}});
    if(!comment.report.includes(reportCommentDto.name)) {
      comment.report.push(reportCommentDto.name);
    }
    return comment.save();
  }

  async remove(id: number) {
    const comment = await Comment.findOne({where:{id:id}});
    return comment.remove();
  }
}
