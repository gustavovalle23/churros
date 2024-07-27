"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = Entity;
exports.Field = Field;
exports.Id = Id;
exports.getEntityMetadata = getEntityMetadata;
require("reflect-metadata");
function Entity(name) {
    return function (constructor) {
        Reflect.defineMetadata("entity:name", name, constructor);
    };
}
function Field(options) {
    return function (target, propertyKey) {
        const fields = Reflect.getMetadata("entity:fields", target.constructor) || {};
        fields[propertyKey] = options.type;
        Reflect.defineMetadata("entity:fields", fields, target.constructor);
    };
}
function Id(type) {
    return Field({ type });
}
function getEntityMetadata(entity) {
    const name = Reflect.getMetadata("entity:name", entity);
    const fields = Reflect.getMetadata("entity:fields", entity) || {};
    return { name, fields };
}
