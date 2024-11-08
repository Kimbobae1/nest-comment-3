import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from "../../comment/entities/comment.entity"

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column()
  title : string;

  @Column()
  content : string;

  @Column()
  createdAt : Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
