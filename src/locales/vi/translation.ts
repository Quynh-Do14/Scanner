const resources = {
  /** common */
  login: 'Login',
  signUp: 'Sign up',
  email: 'Email',
  password: 'Password',
  confirmPassword: 'Confirm password',
  forgotPassword: 'Forgot password',
  submit: 'Submit',
  confirm: 'Confirm',
  fullname: 'Fullname',
  enterFullname: 'Enter your fullname',
  enterEmail: 'Enter your email',
  enterPassword: 'Create password',
  enterConfirmPassword: 'Confirm password',
  loading: 'loading',

  /** validate */
  invalidEmail: 'invalid email format',
  emailRequired: 'email is required',
  invalidPassword: 'password at least {{characters}} characters',
  passwordRequired: 'password required',

  loginScreen: {
    noAccount: "Don't have an account?",
    signUp: 'Sign up',
  },

  resetPasswordScreen: {
    title: 'Reset password',
    subtitle: `No worries, we'll send your reset instructions.`,
    checkEmail:
      'Please check your inbox and follow the instructions to complete your password reset setup',
  },

  signUpScreen: {
    title: 'Sign up',
    subtitle: 'Please enter your credentials to proceed.',
    signUpSuccess: 'Sign up success',
  },

  editProfileScreen: {
    updatedSuccess: 'Updated success',
  },

  changePasswordScreen: {
    oldPassword: 'Old password',
    newPassword: 'New password',
    enterPassword: 'Enter password',
    changePasswordSuccess: 'Changed password success',
  },

  tabBar: {
    home: 'Home',
    profile: 'Profile',
  },
} as const;

export default resources;
