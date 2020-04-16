module.exports = {
  register: {
    noData: 'Please pass username and password.'
  },
  login: {
    notFound: 'Authentication failed. User not found.',
    wrongPassword: 'Authentication failed. Wrong password.'
  },
  email: {
    newUser: '[Republike] Please verify your account.',
    forgotPassword: '[Republike] Change your password.'
  },
  activate: {
    success: 'The user was activated.'
  },
  reset: {
    success: 'The new password was set.'
  },
  forgot: {
    sent: 'The reset link was sent to your email address.'
  },
  delete: {
    success: 'The item was deleted.'
  },
  errors: {
    addUser: 'Error while creating user.',
    duplicateUser: 'There is another user with this email.',
    getUser: 'Error while getting the user.',
    noToken: 'No token was provided.',
    failToken: 'Failed to authenticate token.',
    noUser: 'No user was found.',
    noPassword: 'Please pass the new password.',
    isActive: 'This user is already active.',
    userIdRequired: 'The `id` of the user is required.',
    userEmailRequired: 'The `email` of the user is required.',
    updateUser: 'Error while updating user'
  }
};
