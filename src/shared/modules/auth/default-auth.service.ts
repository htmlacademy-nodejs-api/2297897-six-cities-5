import {createSecretKey} from 'node:crypto';

import {inject, injectable} from 'inversify';
import {SignJWT} from 'jose';

import {Config, RestSchema} from '../../libs/config/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Components} from '../../types/index.js';
import {LoginUserDto} from '../user/dto/login-user.dto.js';
import {UserEntity, UserService} from '../user/index.js';
import {JWT_CONFIG} from './auth.constant.js';
import {AuthService} from './auth-service.interface.js';
import {UserNotFoundException, UserPasswordIncorrectException} from './errors/index.js';
import {TokenPayload} from './types/token-payload.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Components.Logger) private readonly logger: Logger,
    @inject(Components.UserService) private readonly userService: UserService,
    @inject(Components.Config) private readonly config: Config<RestSchema>
  ) {
  }

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id,
    };

    this.logger.info(`Create token for «${user.email}»...`);

    return new SignJWT(tokenPayload)
      .setProtectedHeader({alg: JWT_CONFIG.ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(JWT_CONFIG.EXPIRATION)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if(!user) {
      this.logger.warn(`User with email «${dto.email}» not found`);
      throw new UserNotFoundException();
    }

    if(!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for «${dto.email}»`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
