# Discussion App

A microservice-based application that allows users to sign up, log in, create posts with text and images, follow/unfollow other users, comment on posts, and receive notifications. The architecture includes separate services for user management, post handling, commenting, notifications, and analytics, ensuring scalability and maintainability. Each service is developed independently, with Node.js and MongoDB as the primary technologies.

# Discussion App API Endpoints

## User Service

- **POST /auth/signup**: Create a new user account.
- **POST /auth/login**: Log in an existing user.
- **GET /users**: Get a list of all users.
- **GET /users/:id**: Get details of a specific user.
- **PUT /users/:id**: Update user details.
- **DELETE /users/:id**: Delete a user account.
- **POST /users/follow/:id**: Follow another user.
- **POST /users/unfollow/:id**: Unfollow another user.

## Post Service

- **POST /posts**: Create a new post.
- **GET /posts**: Get a list of all posts.
- **GET /posts/:id**: Get details of a specific post.
- **PUT /posts/:id**: Update a post.
- **DELETE /posts/:id**: Delete a post.
- **POST /posts/:postId/like**: Like a post.
- **POST /posts/:postId/unlike**: Unlike a post.

## Comment Service

- **POST /posts/:postId/comment**: Create a new comment on a post.
- **PUT /comments/:id**: Update a comment.

## Notification Service

- **GET /notifications**: Get all notifications.

## Analytics Service

- **GET /analytics/posts**: Get analytics data for posts.

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Installation

 Clone the repository:
   ```bash
   git clone https://github.com/your-username/discussion-app.git
   cd discussion-app

