/**
 * Express router paths go here.
*/


export default {
  Auth: {
    Base: '/auth',
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
  },

  User: {
    Base: '/user',
    Info: '/info',
    UpdateProfile: '/updateProfile',
    UpdateEmail: '/updateEmail',
    VerifyEmail: '/verifyEmail',
    UpdatePassword: '/updatePassword',
    ResetPassWithEmail: '/resetPassWithEmail'
  },
  
} as const;
