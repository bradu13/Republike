Republike Project
--   
    Schemas
        •	User
        •	_id
        •	email (unique)
        •	password (min 8 chars)
        •	fbToken
        •	fullname
        •	gender (1= male, 2= female, 3=other)
        •	birthdate
        •	country
        •	biography
        •	aureusAmount = 0
        •	likeAmount = 100
        •	themeStatics[]
        •	themeId
        •	pointAmount = 0
        •	goldWins = 0
        •	silverWins = 0
        •	bronzeWins = 0
        •	interestedIn[]
        •	themeId
        •	favouritePosts[]
        •	battlePostId
        •	friends[]
        •	userId
        •	friendRequests[]
        •	userId
        •	isActive = true
        •	isDeleted = false
        •	createdAt
        •	updatedAt
        •	Battle
        •	_id
        •	name (required)
        •	description
        •	type = 1(text), 2(audio) ,3(image) ,4(video)
        •	themeId
        •	likeAmount (total amount for performance) = 0
        •	postAmount (total amount for performance) = 0
        •	shares[]
        •	userId
        •	views[]
        •	userId
        •	createdAt
        •	updatedAt
        •	isDeleted = false
        •	creatorId(User)
        •	BattlePost
        •	_id
        •	title (required)
        •	link
        •	mediaFilePath
        •	creatorId(User)
        •	likes[]
        •	userId
        •	shares[]
        •	userId
        •	views[]
        •	userId
        •	comments[]
        •	commentId
        •	reportedBy[]
        •	userId
        •	message
        •	createdAt
        •	updatedAt
        •	isDeleted
        •	battleId(Battle)
        •	Comment
        •	_id
        •	text
        •	createdAt
        •	userId
        •	Notification
        •	_id
        •	type (1=success 2=info, 3= warning, 4= danger)
        •	title
        •	description
        •	createdAt
        •	userId
        •	Theme
        •	_id
        •	name
        •	icon
        •	UserLevel
        •	_id
        •	name
        •	icon
        •	totalPoint
        •	UserSetting
        •	_id
        •	type (1=email, 2= notification)
        •	newFriendBattles = true
        •	newContentPosted = true
        •	friendRequest = true
        •	friendRequestAccepted = true
        •	shareInviteFriendsDiscoverBattle = true
        •	shareInviteFriendsDiscoverContent = true
        •	contentOvertaken = true
        •	grade = true
        •	suggestedBattles = true
        •	userId
    Scenario
        •	User becomes a member
        •	Activation is done by email
        •	The thing is; the user sets up a battle with a media type. Media types; text, audio, video, image. The screen about the installation already exists in the XD file. The user sets up and starts the war.
        •	Other users join the war and include their media in the war. Or they like or comment on the media available in battle.
        •	Gold, silver, bronze medals, which received the most likes.
        •	Users are granted 100 likes every day, if they log into the system. And spend 100 likes during the day by liking the battle posts.
        •	Apart from Like, users have aureus earnings, which is the in-game currency. This gain is earned according to the following rules.
        •	User creates a battle post and he gets 10 aureus every time he gets a like.
        •	That's it right now. There will be new rules in the future, but the only rule that concerns us is for now. Aureus comes only if someone likes user’s battle post. If he wishes, he can later convert the won aureus to Like on his profile page. Setup here => 1like = 10 aureus
        •	Comments have no profit, just comments.
        •	Users have levels in total, there are 12 levels for now. They write in the xD file at the bottom of the how it works page.
        •	User level is determined by the points the user gets. The rules for getting points are as follows
        •	If the user likes a post, he spends 1 like, but earns 1 point for the theme he created battle under. (User can't like his own post)
        •	If someone likes the user's post, user gets 10 aureus, and also gets 10 points for the theme he created the battle.
        •	When the Battle is over, the winner user wins 900, 2nd is 300, 3rd is 100 points for the theme.
        •	A battle ends when the total number of likes received by all posts in the battle is 500. If there are 1st, 2nd or 3rd Equal points, the battle continues until it is determined.
        •	We said that the user's level determines the score. The total score is determined as the sum of the points received in all themes. Level rules (total score required)
        •	Level 1 = 0
        •	Level 2 = 100
        •	Level 3 = 400
        •	Level 4 = 900
        •	Level 5 = 1800
        •	Level 6 = 3100
        •	Level 7 = 4800
        •	Level 8 = 6900
        •	Level 9 = 9400
        •	Level 10 = 12300
        •	Level 11 = 15600
        •	Level 12 = 19300
    
    
    Endpoints
        •	POST /auth/register
        •	POST /auth/login
        •	POST /auth/forgot
        •	POST /auth/reset
        •	POST /auth/activate
    
        •	POST /battles/ 
        •	GET /battles/ 
        •	PUT /battles/{id}
        •	DELETE /battles/{id}
        •	POST /battles/{id}/view
        •	POST /battles/{id}/share
        •	GET /battles/{id}/posts
    
        •	POST /battleposts/
        •	GET /battleposts/{id}
        •	PUT /battleposts/{id}
        •	DELETE /battleposts/{id}
        •	POST /battleposts/{id}/like
        •	POST /battleposts/{id}/dislike
        •	POST /battlepost/{id}/share
        •	POST /battlepost/{id}/view
        •	POST /battlepost/{id}/report
        •	
        •	POST /comments/
        •	GET /comments/{id}
        •	PUT /comments/{id}
        •	DELETE /comments/{id}
        •	
        •	GET /notifications/
        •	PUT /usersettings/
        •	
        •	PUT /user/
        •	DELETE /user/
        •	GET /user/friends
        •	POST /user/addtofriends
        •	DELETE /user/removefromfriends
        •	POST /user/friendrequest
        •	DELETE /user/removefriendrequest
        •	GET /user/famelist
        •	POST /user/addtofav
        •	DELETE /user/removefromfav
        •	
        •	GET /search
    
