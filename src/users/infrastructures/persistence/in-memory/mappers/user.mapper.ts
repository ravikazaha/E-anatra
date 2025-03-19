import { User } from 'src/users/domain/user';
import { UserEntity } from '../entities/user-entity';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.id,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.username,
      userEntity.email,
      userEntity.password,
    );
  }

  static toPersistence(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.firstName = user.firstName;
    entity.lastName = user.lastName;
    entity.username = user.username;
    entity.email = user.email;
    entity.password = user.password;

    return entity;
  }
}
