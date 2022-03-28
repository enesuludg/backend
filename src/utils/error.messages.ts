export const errorMessages = {
  AUTH_REQUIRED: {
    code: 10403,
    message: 'Authentication Required!',
  },
  WRONG_CREDENTIALS: {
    code: 10404,
    message: 'Your credentials are incorrect.',
  },
  PASSWORD_MATCH: {
    code: 10404,
    message: '  New password cannot be the same as your old password.',
  },
  TOKEN_EXPIRE: {
    code: 10404,
    message: 'TOKEN is expired!',
  },
  VALUE_ERROR: {
    code: 10500,
    message: 'Value error',
  },
  ACCOUNT: {
    NOT_FOUND: {
      code: 10404,
      message: 'Account User not found!',
    },
    EMAIL_VERIFY: { code: 10401, message: 'Email already verified' },
    EMAIL_EXISTS: { code: 10400, message: 'Email already exists' },
  },
  RESET_PASSWORD: { code: 10400, message: 'Invalid link or expired' },
  EMAIL_NOT_VERIFY: { code: 10401, message: 'This email is not verified' },
  CUSTOMER_EXISTS: { code: 10400, message: 'This customer already exists ' },
  PASSWORD_NOT_MATCH: {
    code: 10400,
    message: 'New password does not match with confirmed password!',
  },
  PASSWORD_NOT_MATCH2: {
    code: 10400,
    message: "You're password not matching!",
  },
  PASSWORD_REQ: {
    code: 10400,
    message: 'Password required!',
  },
  EMAIL_DOESNT_EXIST: { code: 10404, message: "This email doesn't exist!" },
};
