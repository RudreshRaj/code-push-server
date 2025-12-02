# Project Structure

## Core Directories

- `app.js` - Express application entry point with middleware setup
- `bin/` - Executable scripts (www server, db management)
- `config/` - Environment-based configuration files
- `core/` - Core business logic and utilities
  - `app-error.js` - Custom error classes
  - `config.js` - Config loader with environment detection
  - `const.js` - Application constants
  - `middleware.js` - Custom Express middleware
  - `services/` - Business logic services
  - `utils/` - Utility functions
- `models/` - Sequelize database models (auto-loaded by `models/index.js`)
- `routes/` - Express route handlers organized by resource
- `views/` - Pug templates for web interface
- `public/` - Static assets (JS, CSS)
- `sql/` - Database schema and migration scripts
- `test/` - Test suites
  - `api/` - API integration tests
  - `unit/` - Unit tests
- `docker/` - Docker deployment configuration
- `docs/` - Documentation

## Architecture Patterns

### Configuration Loading
- Config loaded via `core/config.js` based on `NODE_ENV`
- Supports custom config file via `CONFIG_FILE` environment variable
- Uses lodash `_.get()` for safe property access

### Database Models
- Models auto-discovered and loaded in `models/index.js`
- Sequelize associations defined in model `associate()` methods
- All models exported from single index file

### Routing
- Routes organized by resource (users, apps, auth, etc.)
- Mounted in `app.js` with appropriate prefixes
- API versioning via path prefix (e.g., `/v0.1/public/codepush`)

### Error Handling
- Custom `AppError` classes in `core/app-error.js`
- Environment-specific error handlers (development shows stack traces)
- Centralized error handling middleware

### Storage Abstraction
- Multiple storage backends supported via `common.storageType` config
- Storage-specific configuration sections (local, qiniu, s3, oss, tencentcloud)
- Local storage served via Express static middleware when enabled

## Code Style

- CommonJS modules (`require`/`module.exports`)
- Lodash for utility operations
- Log4js for structured logging with categories
- Async operations use Promises/Bluebird
