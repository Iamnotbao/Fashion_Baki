export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: '/authentication',
  productRoot: '/product',
  profileRoot: '/user',
};

export default {
  signin: `${rootPaths.authRoot}/signIn`,
  signup: `${rootPaths.authRoot}/signUp`,
  verify: `${rootPaths.authRoot}/verify`,
  forgotPassword: `${rootPaths.authRoot}/forgot_password`,
  resetPassword: `${rootPaths.authRoot}/reset_password`,
  getall:`${rootPaths.productRoot}/all`,
  getproduct:`${rootPaths.productRoot}/:id`,
  getCartDetail:`${rootPaths.productRoot}/cart_detail`,
  getOrder:`${rootPaths.productRoot}/order`,
  getprofile:`${rootPaths.profileRoot}/info`,
  getCart:`${rootPaths.profileRoot}/cart`,
  getTracking:`${rootPaths.profileRoot}/tracking-order`,
 
};