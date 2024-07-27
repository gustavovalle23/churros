export declare abstract class Repository<Entity> {
    abstract table: string;
    abstract knex: any;
    abstract entity: {
        new (): Entity;
    };
    private toEntity;
    findById(id: string): Promise<Entity | null>;
    findAll(): Promise<Entity[]>;
    insert(entity: Entity): Promise<Entity>;
    update(id: string, entity: Partial<Entity>): Promise<void>;
    delete(id: string): Promise<void>;
}
