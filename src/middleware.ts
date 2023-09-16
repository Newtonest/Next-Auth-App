export { default } from 'next-auth/middleware'; 
export const config = {
    matcher : ['/dashboard/:path*']  //asi protegemos todas las rutas internas de dashboard
}