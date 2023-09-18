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
    UpdateProfile: '/updateprofile'
  },
  
} as const;
