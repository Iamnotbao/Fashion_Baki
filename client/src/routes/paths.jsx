export const rootPaths = {
  root: '/Fashion_Baki/',
  pagesRoot: 'pages',
  authRoot: '/Fashion_Baki/authentication',
  productRoot: '/Fashion_Baki/product',
  profileRoot: '/Fashion_Baki/user',
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