"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
// src/repository.ts
class Repository {
    toEntity(data) {
        // @ts-ignore
        return Object.assign(new this.entity(), data);
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.knex(this.table).where({ id, deleted_at: null }).first();
            return result ? this.toEntity(result) : null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.knex(this.table).where({ deleted_at: null });
            return results.map((result) => this.toEntity(result));
        });
    }
    insert(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex(this.table).insert(entity);
            return entity;
        });
    }
    update(id, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex(this.table).where({ id }).update(entity);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.knex(this.table).where({ id }).update({ deleted_at: new Date() });
        });
    }
}
exports.Repository = Repository;
