import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Book extends Entity {
  @property({
    type: 'number',
    default: 0,
  })
  phone_no?: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  isbn: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Book>) {
    super(data);
  }
}

export interface BookRelations {
  // describe navigational properties here
}

export type BookWithRelations = Book & BookRelations;
