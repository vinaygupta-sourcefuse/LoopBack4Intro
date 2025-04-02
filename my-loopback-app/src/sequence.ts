import {
   
    MiddlewareSequence,
    RequestContext,
    RestBindings,
  } from '@loopback/rest';
  import {inject} from '@loopback/core';
  
  export class MyCustomSequence extends MiddlewareSequence {
    async handle(context: RequestContext) {
      console.log('🚀 Custom Sequence: Handling request');
  
      try {
        // Proceed with default middleware execution
        await super.handle(context);
        
        console.log('✅ Custom Sequence: Request handled successfully');
      } catch (err) {
        console.error('❌ Custom Sequence: Error occurred', err);
        const errorResponse = {
          message: 'An unexpected error occurred',
          error: err.message,
        };
        context.response.status(500).send(errorResponse);
      }
    }
  }
  