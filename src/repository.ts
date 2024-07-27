// src/repository.ts
export abstract class Repository<Entity> {
  abstract table: string;
  abstract knex: any;
  abstract entity: { new(): Entity };

  async findById(id: string): Promise<Entity | null> {
    const result = await this.knex(this.table).where({ id, deleted_at: null }).first();
    return result ? Object.assign(new this.entity(), result) : null;
  }

  async findAll(): Promise<Entity[]> {
    const results = await this.knex(this.table).where({ deleted_at: null });
    return results.map((result: any) => Object.assign(new this.entity(), result));
  }

  async insert(entity: Entity): Promise<Entity> {
    await this.knex(this.table).insert(entity);
    return entity;
  }

  async update(id: string, entity: Partial<Entity>): Promise<void> {
    await this.knex(this.table).where({ id }).update(entity);
  }

  async delete(id: string): Promise<void> {
    await this.knex(this.table).where({ id }).update({ deleted_at: new Date() });
  }
}
