import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/application/ports/user.repository';
import { UserEntity } from '../entities/user-entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/domain/user';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const entites = await this.userRepository.find();

    return entites.map((entity) => UserMapper.toDomain(entity));
  }

  async save(user: User): Promise<User> {
    const entity = await this.userRepository.save(
      UserMapper.toPersistence(user),
    );

    return UserMapper.toDomain(entity);
  }
}
