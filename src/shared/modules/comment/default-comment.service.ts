import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {inject, injectable} from 'inversify';
import {Components} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class DefaultCommentService implements CommentService{
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);

    this.logger.info(`New comment created: ${result.description.slice(0, 15)}...`);

    return result;
  }

  public async findById(commentId: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(commentId);
  }

  public async find(): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find();
  }
}