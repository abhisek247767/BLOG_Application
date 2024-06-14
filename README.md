# Discussion App

A Node.js application for managing users and discussions, providing functionalities for user management, posting discussions with text or images, commenting, liking posts and comments, following users, and searching discussions by hashtags and text.

## Functionalities

1. **User Authentication**
   - **POST /auth/signup**: Create a new user account.
   - **POST /auth/login**: Log in an existing user.

2. **User Management**
   - **GET /users**: Get a list of all users.
   - **GET /users/search?name=keyword**: Search users based on name.
   - **PUT /users/:id**: Update user details.
   - **DELETE /users/:id**: Delete a user account.

3. **User Relationships**
   - **POST /users/follow/:id**: Follow another user.
   - **POST /users/unfollow/:id**: Unfollow another user.

4. **Discussion Management**
   - **POST /discussions**: Create a new discussion.
   - **GET /discussions**: Get a list of all discussions.
   - **GET /discussions/:id**: Get details of a specific discussion.
   - **PUT /discussions/:id**: Update a discussion.
   - **DELETE /discussions/:id**: Delete a discussion.

5. **Post Interaction**
   - **POST /discussions/:id/like**: Like a discussion.
   - **POST /discussions/:id/unlike**: Unlike a discussion.
   - **POST /discussions/:id/comment**: Comment on a discussion.
   - **PUT /comments/:id**: Update a comment.
   - **DELETE /comments/:id**: Delete a comment.

6. **View Count**
   - **GET /discussions/:id/views**: Get the view count of a discussion.

7. **Hashtag Search**
   - **GET /discussions/tags/:tag**: Get discussions based on a specific hashtag.

## Environment Variables

Create a `.env` file in the root directory with the following variables:




## Setup and Installation

### Prerequisites

- Node.js
- MongoDB

### Installation

 Clone the repository:
   ```bash
   git clone https://github.com/your-username/discussion-app.git
   cd discussion-app
 ```

### Install dependencies:
```bash
npm install
 ```
### Start the application:

```bash
npm start
 ```
