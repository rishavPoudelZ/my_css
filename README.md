# Project Documentation: My CSS

## Overview
"my CSS" is a platform designed for users to upload and showcase their projects built with HTML, CSS, and JavaScript. The primary goal is to provide a space for users to present their mini-projects online, making it easy to share with others or revisit their work in the future. The application is developed using the PERN stack (PostgreSQL, Express.js, React.js, and Node.js) and is hosted on Render. You can view the live application. [My CSS](https://my-css.onrender.com/) (It might take 50 sec to load the server after it has been inactive for a while according to render.com)

The project is structured into two main parts: the client side and the server side. The client side is built using React and styled with Tailwind CSS, initiated with Vite. The server side is constructed with Node.js and Express.js, incorporating JWT authentication for authenticating users.

## Preview Video
Here is an overview video of the project:
<iframe src="https://github.com/user-attachments/assets/175dca98-00be-40cb-ae26-524b65142b43" width="640" height="360" frameborder="0" allowfullscreen></iframe>

## Client Side

### Overview
The client side of the application is designed to offer an interactive and minimalistic user interface. It manages API calls to interact with the server and handles JSON data to present it in a user-friendly manner. The application supports various features such as user registration, login and project management.
### Styling
The styling of the client side is managed using Tailwind CSS, with additional customizations provided through a Tailwind configuration file and custom CSS for specific preferences. I also leveraged the DaisyUI component library to streamline the styling process.

## Structure
The main 'index.html' file is in the root directory. All the neccessary componenets are inside 'client/src/component'. The utils folder inside the src folder is for any helper functions such as functions that get users info. All secret keys and private or sensitive information is kept in .env file that is accessed by dotenv package. The app.jsx file in root has all the neccessary routing for this SPA application to work.

## Server Side

### Overview
The server side is set up using Node.js and Express.js. It handles API requests, manages the PostgreSQL database, and implements JWT authentication for secure user management. The server is also responsible for processing user actions such as registration, login, product management, and order handling.

### Project Structure
The server side includes various routes and controllers to manage different API endpoints. Here are some of the key functionalities implemented:

- **User Registration and Authentication**: Utilizes bcrypt for password hashing and JWT for authentication.
- **Project Management**: Allows users to upload and delete projects.

### Key Technologies and Packages
- **Express.js**: A web framework for building the server and handling routing.
- **PostgreSQL**: The relational database used to store application data.
- **JWT**: For secure user authentication.
- **Bcrypt**: For hashing and verifying user passwords.
- **Multer**: For handling file uploads.
- **Cors**: To handle cross-origin requests.

## Learning Outcomes
This project has been instrumental in solidifying my understanding of full-stack development and the technologies involved in building a comprehensive web application. Key learnings include:

- **Database Management**: Designing and managing a relational database, including creating tables and writing efficient queries.
- **User Authentication**: Implementing secure user authentication using JWT and bcrypt.
- **API Development**: Building a robust API with Express.js to handle various client requests.
- **State Management**: Utilizing React's state management and hooks to create dynamic and responsive components.
- **Styling**: Applying Tailwind CSS and custom styles to create a visually appealing user interface.
- **Version Control**: Using Git and GitHub for version control, facilitating collaboration and code management.

## Conclusion
This application serves as a . If you can any queries , feel free to [pdl.rishav88@gmail.com](mailto:pdl.rishav88@gmail.com) or [Message me on linkedIn](https://www.linkedin.com/in/poudelrishavz/).

## Learning Outcomes
This project has provided significant insights into full-stack development, including:

- **Handling File Uploads**: Managing file uploads and deletions on the server.
- **User Authentication**: Implementing secure authentication with JWT.
- **Database Management**: Using PostgreSQL to handle relational data.
- **API Development**: Building RESTful APIs with Express.js.
- **Frontend Development**: Creating responsive user interfaces with React and Tailwind CSS.

## Conclusion
The "my CSS" platform demonstrates proficiency in building full-stack applications using the PERN stack. It showcases the ability to handle user authentication, file management, and responsive design. This project contributes to a solid understanding of modern web development practices and provides a foundation for future enhancements.

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details.

Feel free to fork this repository, make modifications, and submit pull requests. Contributions are welcome!

For more information on the license, please refer to the [MIT License](https://opensource.org/licenses/MIT).

If you have any questions or feedback, feel free to contact me at [pdl.rishav88@gmail.com](mailto:pdl.rishav88@gmail.com) or [Message me on linkedIn](https://www.linkedin.com/in/poudelrishavz/).
