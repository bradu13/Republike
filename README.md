# Republike Project   
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-semistandard-brightgreen.svg)](https://standardjs.com) 
[![Docs](https://img.shields.io/badge/docs-postman-orange.svg)](https://documenter.getpostman.com/view/11004527/Szf3YUqN) 


****
 
 
    Error Structure:
    {
        "status": "0",
        "error": "[message]"
    }
    
    Resource Structure:
    {
        "status": "1",
        "data": [data]
    }

    Endpoints
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
        •	GET /search/
        •	PUT /usersettings/
        •	
        •   POST /users/
        •   GET /users/{id}/
        •	PUT /users/{id}/
        •	DELETE /users/{id}/
        •	GET /users/{id}/friends/
        •	GET /users/{id}/favorites/
        •   POST /users/{id}/friends/
        •   POST /users/{id}/friendrequests/
        •   POST /users/{id}/favorites/
        •	DELETE /users/{id}/friends/
        •	DELETE /users/{id}/friendsrequests/
        •	DELETE /users/{id}/favorites/
    
