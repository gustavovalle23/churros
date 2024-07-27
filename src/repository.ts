// src/repository.ts
export abstract class Repository<Entity> {
  abstract table: string;
  abstract knex: any;
  abstract entity: { new(): Entity };

  private toEntity(data: any): Entity {
    // @ts-ignore
    return Object.assign(new this.entity(), data);
  }

  async findById(id: string): Promise<Entity | null> {
    const result = await this.knex(this.table).where({ id, deleted_at: null }).first();
    return result ? this.toEntity(result) : null;
  }

  async findAll(): Promise<Entity[]> {
    const results = await this.knex(this.table).where({ deleted_at: null });
    return results.map((result: any) => this.toEntity(result));
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
