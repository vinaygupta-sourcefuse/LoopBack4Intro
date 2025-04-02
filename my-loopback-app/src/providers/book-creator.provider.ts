import {Provider, inject} from '@loopback/core';
import {BookRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Book} from '../models';

export interface BookCreatorFn {
  (bookData: Omit<Book, 'id'>): Promise<Book>;
}

export class BookCreatorProvider implements Provider<BookCreatorFn> {
  constructor(
    @repository(BookRepository) private bookRepository: BookRepository,
  ) {}

  value(): BookCreatorFn {
    return async (bookData: Omit<Book, 'id'>) => {
      // Custom logic (e.g., additional validation)
      console.log('🚀 Creating book:', bookData);
      
      // Save to database
      return this.bookRepository.create(bookData);
    };
  }
}
