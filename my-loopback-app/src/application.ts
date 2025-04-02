import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, Context} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MyCustomSequence} from './sequence';
import {BookCreatorProvider} from './providers/book-creator.provider';
import {LogInterceptor} from './interceptors/log.interceptor';

export {ApplicationConfig};

export class MyLoopbackAppApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.bind('message').to('🚀 Hello from LoopBack Context in application.ts !'); // ✅ Bind a value

    const ctx = new Context();
    ctx.bind('app.name').to('My LoopBack App'); // ✅ Another context binding

    console.log('Context in application.ts, ',ctx.getSync('app.name')); // Output: My LoopBack App
     // Replace default sequence with our custom one
     this.sequence(MyCustomSequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.bind('providers.BookCreatorProvider').toProvider(BookCreatorProvider);

    this.interceptor(LogInterceptor); // ✅ Apply globally

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
