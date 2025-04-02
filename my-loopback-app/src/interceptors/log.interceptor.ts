import {
    Interceptor,
    InvocationContext,
    InvocationResult,
    Next,
    Provider,
  } from '@loopback/core';
  
  export class LogInterceptor implements Provider<Interceptor> {
    value(): Interceptor {
      return async (invocationCtx: InvocationContext, next: Next) => {
        console.log(`🚀 [BEFORE] Calling ${invocationCtx.methodName}`);
  
        const result: InvocationResult = await next(); // Proceed to the actual function
  
        console.log(`✅ [AFTER] Finished ${invocationCtx.methodName}`);
        return result;
      };
    }
  }
  