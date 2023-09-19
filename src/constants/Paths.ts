/**
 * Express router paths go here.
*/


export default {
  Auth: {
    Base: '/auth',
    Register: '/register',
    Login: '/login',
    Logout: '/logout',
    VerifyEmail: '/verifyEmail',
    SendPasswordResetEmail: '/sendPasswordResetEmail',
    ResetPassWithCode: '/resetPassWithCode'
  },

  User: {
    Base: '/user',
    Info: '/info',
    UpdateProfile: '/updateProfile',
    UpdateEmail: '/updateEmail',
    UpdatePassword: '/updatePassword',
  },
  
} as const;
