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

  async findByEmail(email: string): Promise<User> {
    try {
      const entity = await this.userRepository.findOneBy({ email });
      return UserMapper.toDomain(entity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(userId: string): Promise<User> {
    try {
      const entity = await this.userRepository.findOneBy({ id: userId });
      return UserMapper.toDomain(entity);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      const entity = await this.userRepository.findOneBy({ username });
      return UserMapper.toDomain(entity);
    } catch (error) {
      throw new Error(error);
    }
  }
}
