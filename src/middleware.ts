import { NextResponse } from 'next/server'
// import { setSessionConfig } from './app/(cookies)/(auth)/cookies';
// import { errorHandler } from './app/api/handler';

 
// This function can be marked `async` if using `await` inside
export async function middleware() {
  // try{
  //   await setSessionConfig();
  // }catch(e){
  //   return errorHandler(e)
  // }
    
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/:path*',
  }