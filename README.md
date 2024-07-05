## Getting Started

1. **Installation**

   - Clone the repository:

     ```bash
     git clone <repository-url>
     cd <project-folder>
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

2. **Development**

   - Start the development server:

     ```bash
     npm run dev
     ```

   - Open `http://localhost:3000` in your browser to view the application.

3. **Build**

   - Build the production-ready files:

     ```bash
     npm run build
     ```

   - The optimized build will be available in the `dist` directory.

### Configuration

1. Create a `.env` file in the root directory.

2. Add your MongoDB Atlas connection URI to the `.env` file:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/mydatabase?retryWrites=true&w=majority
   ```

### Testing

- Use tools like Postman to test your API endpoints.
- Example API endpoint for creating a user:
  - **POST** `http://localhost:3001/users`
  - Request body (JSON):
    ```json
    {
      "name": "some user",
      "email": "someuser@example.com"
    }
    ```

- Verify data in your MongoDB Atlas cluster using MongoDB Compass or CLI tools.