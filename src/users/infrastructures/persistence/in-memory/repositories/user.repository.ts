import { Injectable } from '@nestjs/common';
import {
  UserFieldName,
  UserRepository,
} from 'src/users/application/ports/user.repository';
import { User } from 'src/users/domain/user';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../entities/user-entity';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, UserEntity>();

  async findAll(): Promise<User[]> {
    const entites = Array.from(this.users.values());
    return entites.map((entity) => UserMapper.toDomain(entity));
  }

  async save(user: User): Promise<User> {
    const persistence = UserMapper.toPersistence(user);
    this.users.set(persistence.id, persistence);

    const newEntity = this.users.get(persistence.id);

    return UserMapper.toDomain(newEntity);
  }

  async findByEmail(email: string): Promise<User> {
    const entites = Array.from(this.users.values());
    return UserMapper.toDomain(
      entites.find((entity) => entity.email === email),
    );
  }

  async findById(userId: string): Promise<User> {
    const entites = Array.from(this.users.values());
    return UserMapper.toDomain(entites.find((entity) => entity.id === userId));
  }

  async findByUsername(username: string): Promise<User> {
    const entites = Array.from(this.users.values());
    return UserMapper.toDomain(
      entites.find((entity) => entity.username === username),
    );
  }

  async findOneBy(fieldName: Partial<UserFieldName>): Promise<User | null> {
    const entities = Array.from(this.users.values());
    const entries = Object.entries(fieldName);

    if (!entries.length) {
      throw new Error('No field provided for findOneBy');
    }

    const foundEntity = entities.find((entity) =>
      entries.every(([key, value]) => entity[key] === value),
    );

    return foundEntity ? UserMapper.toDomain(foundEntity) : null;
  }
}
