import { Entity, Field, Id } from '../src/entity';

@Entity('User')
export class User {
  @Id(String)
  id!: string;

  @Field({ type: String })
  name!: string;

  static fromJSON(json: any): User {
    const list = new User();
    list.id = json.id;
    list.name = json.name;
    return list;
  }

  isValid() {
    return this.name.length > 0;
  }


}