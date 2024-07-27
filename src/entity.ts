import "reflect-metadata";

type FieldOptions = { type: any };

export function Entity(name: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata("entity:name", name, constructor);
  };
}

export function Field(options: FieldOptions) {
  return function (target: any, propertyKey: string) {
    const fields = Reflect.getMetadata("entity:fields", target.constructor) || {};
    fields[propertyKey] = options.type;
    Reflect.defineMetadata("entity:fields", fields, target.constructor);
  };
}

export function Id(type: any) {
  return Field({ type });
}

export function getEntityMetadata(entity: Function) {
  const name = Reflect.getMetadata("entity:name", entity);
  const fields = Reflect.getMetadata("entity:fields", entity) || {};
  return { name, fields };
}
