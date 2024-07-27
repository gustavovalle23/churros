import "reflect-metadata";
type FieldOptions = {
    type: any;
};
export declare function Entity(name: string): (constructor: Function) => void;
export declare function Field(options: FieldOptions): (target: any, propertyKey: string) => void;
export declare function Id(type: any): (target: any, propertyKey: string) => void;
export declare function getEntityMetadata(entity: Function): {
    name: any;
    fields: any;
};
export {};
