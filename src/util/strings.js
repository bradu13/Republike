module.exports = {
  register: {
    noData: 'Please pass username and password.'
  },
  login: {
    notFound: 'Authentication failed. User not found.',
    wrongPassword: 'Authentication failed. Wrong password.',
    notActive: 'Authentication failed. Email is not confirmed.',
    deleted: 'Authentication failed. This account was disabled.'
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
  friends: {
    created: 'The users are now friends.',
    createdRequest: 'The friend request was sent.',
    removedRequest: 'The friend request was removed.',
    removed: 'The friend was removed.',
    acceptedRequest: 'The friend request was accepted.'
  },
  errors: {
    addUser: 'Error while creating user.',
    addBattle: 'Error while creating a battle.',
    addBattlePost: 'Error while creating a battle post.',
    addImage: 'Error while creating the image record.',
    duplicateUser: 'There is another user with this email.',
    getUser: 'Error while getting the user.',
    getBattle: 'Error while getting the battle.',
    getBattlePost: 'Error while getting the battle post.',
    getUserSetting: 'Error while getting the user settings.',
    noToken: 'No token was provided.',
    failToken: 'Failed to authenticate token.',
    noUser: 'No user was found.',
    noFile: 'No file was found.',
    noBattle: 'No battle was found.',
    noBattlePost: 'No battle post was found.',
    noBattleEditPermission: 'You don\'t have enough permissions to edit this battle',
    noBattlePostEditPermission: 'You don\'t have enough permissions to edit this post battle',
    noBattlePostDeletePermission: 'You don\'t have enough permissions to delete this post battle',
    noUserSetting: 'No user setting was found.',
    noPassword: 'Please pass the new password.',
    isActive: 'This user is already active.',
    userIdRequired: 'The `id` of the user is required.',
    userEmailRequired: 'The `email` of the user is required.',
    updateUser: 'Error while updating user',
    updateUserSetting: 'Error while updating settings.',
    updateBattlePost: 'Error while updating battle post.',
    deleteBattlePost: 'Error while deleting battle post.',
    deletedUser: 'This user was deleted.',
    inactiveFriend: 'The user needs to confirm his email address before making friends.',
    deletedFriend: 'This user was deleted.',
    deletedBattlePost: 'This battle post was deleted.',
    alreadyFriends: 'They are already friends.',
    noFriends: 'This user has no friends.',
    noFriendRequests: 'This user has no friend requests.',
    friendNotFound: 'This user is not his friend.',
    friendRequestNotFound: 'There is no such friend request from this user.',
    friendRequestAlreadySent: 'There is another friend request pending.',
    notificationCreateError: 'Error when creating new notification.',
    notificationGet: 'Error when getting the notifications.'
  },
  notifications: {
    friendRequest: {
      title: 'New friend request',
      description: 'You have a new friend request pending.'
    },
    friendRequestAccepted: {
      title: 'Friend request accepted',
      description: 'You\'re friend request was accepted.'
    }
  }
};
