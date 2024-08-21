import {
  FilterQuery,
  Model,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class DAO<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(doc: Partial<T>, options?: SaveOptions) {
    const createdDoc = new this.model(doc);
    return createdDoc.save(options);
  }

  async find(filter: FilterQuery<T> = {}, options?: QueryOptions) {
    return this.model.find(filter, null, options).lean();
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions) {
    return this.model.findOne(filter, null, options).lean();
  }

  async findById(id: string, options?: QueryOptions) {
    return this.model.findById(id, null, options).lean();
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions,
  ) {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      ...options,
    });
  }

  async updateById(id: string, update: UpdateQuery<T>, options?: QueryOptions) {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      ...options,
    });
  }

  async deleteOne(filter: FilterQuery<T>, options?: QueryOptions) {
    return this.model.findOneAndDelete(filter, options);
  }

  async deleteById(id: string, options?: QueryOptions) {
    return this.model.findByIdAndDelete(id, options);
  }
}
