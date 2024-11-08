import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from "../../post/entities/post.entity"

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id : number;

  @Column({length : 1000})
  content : string;

  @Column()
  createdAt : Date;

  @Column('json', { nullable: true, default: []})
  like : string[]

  @Column('json', { nullable: true , default: []})
  report : string[]

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column()
  postId: number;

  @Column({ nullable: true })
  parentId: number | null;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];
}
