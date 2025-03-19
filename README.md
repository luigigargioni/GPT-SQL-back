# GPT-SQL-Back

GPT-SQL-Back is a backend designed to provide an interface for extracting data from PostgreSQL databases using natural language requests. This project uses OpenAI GPT to interpret user requests and generate appropriate SQL queries.

## Project Structure

The repository is organized as follows:
- **`app.ts`**: Configures the Express application with middleware such as `cors`, `helmet`, and `compression`.
- **`server.ts`**: Starts the server and connects to the PostgreSQL database.
- **`routes/`**: Contains API route definitions.
    - **`routes/chat/`**: Handles chat-related requests.
- **`controllers/`**: Contains logic to handle requests.
    - **`controllers/chat/`**: Includes utilities and configurations for interacting with OpenAI.
- **`config/`**: Configuration files for authentication, database, and SQL dumps.
- **`utils/`**: Contains enumerations and utility functions.
- **`response/`**: Manages standardized API responses.
- **`config/db_dump_antares/`** and **`config/db_dump_beretta/`**: Contain SQL scripts to create and populate sample tables.

## Requirements

- Node.js >= 16
- PostgreSQL
- OpenAI API Key

## Installation

1. Clone the repository:
     ```bash
     git clone https://github.com/your-username/GPT-SQL-back.git
     cd GPT-SQL-back
     ```

2. Install dependencies:
     ```bash
     npm install
     ```

3. Configure the `.env` file:
     Copy the `.env.example` file and rename it to `.env`. Configure the environment variables as required:
     ```env
     PORT=8000
     DB_HOST=localhost
     DB_NAME=gpt-sql
     DB_USER=gpt-sql
     DB_PASSWORD=gpt-sql
     OPENAI_ORGANIZATION_KEY=your-organization-key
     OPENAI_API_KEY=your-api-key
     ```

4. Start the server:
     ```bash
     npm run start
     ```

## Available Scripts

- **`npm run start`**: Starts the server in development mode.
- **`npm run start-prod`**: Starts the server in production mode.
- **`npm run lint`**: Runs ESLint to check the code.
- **`npm run lintfix`**: Automatically fixes linting errors.
- **`npm run pretty`**: Formats the code using Prettier.

## Features

- **Data Extraction**: Interprets natural language requests and generates SQL queries.
- **Multi-Profile Support**: Adapts responses based on user profiles (Basic, Intermediate, Advanced).
- **Graphical Representations**: Suggests graphical representations such as tables, bar charts, line charts, etc.
- **Sample Databases**: Includes SQL scripts to create and populate sample tables.

## Technologies Used

- **Node.js** with **Express** for the backend.
- **Sequelize** for database management.
- **OpenAI GPT** for natural language processing.
- **TypeScript** for robust and typed code.

## Contributions

Contributions are welcome! Feel free to open issues or pull requests to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contact

For any questions or inquiries, feel free to contact me at [luigi.gargioni@unibs.it](mailto:luigi.gargioni@unibs.it).
