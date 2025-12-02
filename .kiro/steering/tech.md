# Technology Stack

## Runtime & Framework

- Node.js 18.x (specified in engines)
- Express.js web framework
- Pug template engine for views

## Database & ORM

- MySQL database (required)
- Sequelize ORM for data modeling
- Redis for caching (optional, used for login throttling and update check caching)

## Key Dependencies

- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `helmet` - Security headers
- `log4js` - Logging
- `formidable` - File upload handling
- `diff-match-patch` - Differential patch generation
- `sequelize` - Database ORM
- Storage SDKs: `aws-sdk`, `aliyun-sdk`, `qiniu`, `upyun`, `cos-nodejs-sdk-v5`

## Testing

- Mocha test framework
- Supertest for API testing
- Istanbul for coverage reports
- Should.js for assertions

## Common Commands

```bash
# Development
npm run dev          # Start with supervisor (auto-reload)
npm start            # Production start

# Database
npm run init         # Initialize database
npm run upgrade      # Run database migrations

# Testing
npm test             # Run tests (uses Makefile on Unix)
npm run test-win     # Run tests on Windows
npm run coverage     # Generate coverage report

# CLI tools
code-push-server     # Main server binary
code-push-server-db  # Database management binary
```

## Configuration

- Environment-based config in `config/config.js`
- Supports `development` and `production` environments
- Config file path customizable via `CONFIG_FILE` env var
- Extensive environment variable support for deployment settings
