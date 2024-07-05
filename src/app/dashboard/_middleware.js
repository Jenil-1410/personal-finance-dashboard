// import { auth } from '@/firebaseAdmin';
// import { NextResponse } from 'next/server';

// const protectedRoutes = ['/dashboard'];

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   if (protectedRoutes.includes(pathname)) {
//     const token = req.cookies.get('token');
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     try {
//       const decodedToken = await auth.verifyIdToken(token);
//       req.user = decodedToken;
//       return NextResponse.next();
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next();
// }