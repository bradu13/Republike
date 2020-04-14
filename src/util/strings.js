module.exports = {
  register: {
    noData: 'Please pass username and password.'
  },
  login: {
    notFound: 'Authentication failed. User not found.',
    wrongPassword: 'Authentication failed. Wrong password.'
  },
  email: {
    newUser: '[Republike] Please verify your account.'
  },
  activate: {
    success: 'The user was activated.'
  },
  errors: {
    addUser: 'Error while creating user.',
    duplicateUser: 'There is another user with this email.',
    getUser: 'Error while getting the user.',
    noToken: 'No token was provided.',
    failToken: 'Failed to authenticate token.',
    noUser: 'No user was found.',
    isActive: 'This user is already active.'
  }
};
