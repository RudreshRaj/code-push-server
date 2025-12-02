# Design Document

## Overview

This design outlines the approach for converting all Chinese text in the CodePush Server project to English. The translation effort spans four main areas: view templates, route handlers, service layer, and test files. The design ensures that all user-facing text, error messages, comments, and test assertions are converted while maintaining existing functionality and test coverage.

## Architecture

### Translation Scope

The translation work is organized into four distinct layers:

1. **Presentation Layer** (View Templates)
   - Pug template files in `views/` directory
   - UI labels, buttons, form placeholders, and page titles

2. **API Layer** (Route Handlers)
   - Express route files in `routes/` directory
   - Error messages returned to API clients
   - Code comments

3. **Business Logic Layer** (Services)
   - Service files in `core/services/` directory
   - Error messages thrown by business logic
   - Validation messages

4. **Test Layer** (Test Files)
   - Test files in `test/api/` directory
   - Test assertions that validate error messages
   - Test descriptions and comments

### Translation Strategy

The translation will follow a bottom-up approach:
1. Start with service layer (business logic) to establish core error messages
2. Update route handlers to use translated service messages
3. Update view templates for UI text
4. Update test assertions to match new English messages

This approach ensures that when we update tests, the underlying code already has the correct English messages.

## Components and Interfaces

### 1. View Templates Translation

**Files to modify:**
- `views/index.pug` - Homepage with login/password change buttons
- `views/auth/login.pug` - Login page with form
- `views/auth/password.pug` - Password change page
- `views/tokens.pug` - Token generation page

**Translation mapping:**

| Chinese Text | English Translation | Context |
|--------------|-------------------|---------|
| 请登录 | Please Login | Login page heading |
| 邮箱地址／用户名 | Email Address / Username | Form input label/placeholder |
| 密码 | Password | Password input label/placeholder |
| 记住我 | Remember Me | Checkbox label |
| 登录 | Login | Login button |
| 原密码 | Old Password | Password change form |
| 新密码 | New Password | Password change form |
| 修改密码 | Change Password | Button and page title |
| 获取token | Get Token | Button text |
| 修改成功 | Successfully changed | Success alert |
| 请重新登录! | Please login again! | Error alert |
| react naitve 热更新服务器 | React Native Hot Update Server | Homepage description |

### 2. Service Layer Translation

**File to modify:**
- `core/services/account-manager.js`

**Error messages to translate:**

| Chinese Error Message | English Translation |
|----------------------|-------------------|
| 请您输入邮箱地址 | Please enter your email address |
| 请您输入密码 | Please enter your password |
| 您输入的邮箱或密码有误 | The email or password you entered is incorrect |
| 您输入密码错误次数超过限制，帐户已经锁定 | Your account has been locked due to too many failed login attempts |
| 已经注册过，请更换邮箱注册 | already registered, please use a different email |
| 验证码已经失效，请您重新获取 | Verification code has expired, please request a new one |
| 您输入的验证码不正确，请重新输入 | The verification code you entered is incorrect, please try again |
| 请您输入6～20位长度的新密码 | Please enter a new password between 6-20 characters |
| 未找到用户信息 | User not found |
| 您输入的旧密码不正确，请重新输入 | Your old password is incorrect, please try again |

### 3. Route Handlers Translation

**Files to modify:**
- `routes/users.js`
- `routes/index.js`

**Changes:**
- Error message: "请您输入6～20位长度的密码" → "Please enter a password between 6-20 characters"
- Error message: "请您输入邮箱地址" → "Please enter your email address"
- Comment: "//修改密码" → "// Change password"
- Comment: "//灰度检测" → "// Canary detection"

### 4. Test Files Translation

**Files to modify:**
- `test/api/users/users.test.js`
- `test/api/auth/auth.test.js`

**Test assertions to update:**

All test assertions that check for Chinese error messages need to be updated to match the new English messages. For example:

```javascript
// Before
JSON.parse(res.text).should.containEql({status:"ERROR", message: "请您输入邮箱地址"});

// After
JSON.parse(res.text).should.containEql({status:"ERROR", message: "Please enter your email address"});
```

## Data Models

No data model changes are required. This is purely a text translation effort that does not affect database schemas or data structures.

## Error Handling

The error handling mechanism remains unchanged. All `AppError.AppError` instances will continue to work the same way, only the error message strings will be in English instead of Chinese.

### Error Message Consistency

To ensure consistency across the application:
1. Service layer defines the canonical error messages
2. Route handlers pass through service layer errors without modification
3. Tests validate against the exact error messages from the service layer

## Testing Strategy

### Test Update Approach

1. **Update service layer first** - Change error messages in `account-manager.js`
2. **Update route handlers** - Change error messages and comments in route files
3. **Update test assertions** - Modify test files to expect English error messages
4. **Run full test suite** - Verify all tests pass with new English messages

### Test Validation

After translation, the following test suites must pass:
- `test/api/users/users.test.js` - User registration and password change tests
- `test/api/auth/auth.test.js` - Authentication tests

### Manual Testing

After automated tests pass, manually verify:
1. Login page displays in English
2. Password change page displays in English
3. Token generation page displays in English
4. Error messages appear in English when validation fails
5. Success messages appear in English

## Implementation Notes

### Character Encoding

All files are UTF-8 encoded and will remain so. The translation simply replaces Chinese characters with English text.

### Typo Correction

Note that "react naitve" in the homepage should be corrected to "React Native" during translation.

### Comment Translation

Code comments in Chinese should be translated to English for better code maintainability:
- `//修改密码` → `// Change password`
- `//灰度检测` → `// Canary detection`

### Alert Messages

JavaScript alert messages in view templates should also be translated:
- `alert('请重新登录!')` → `alert('Please login again!')`
- `alert("修改成功")` → `alert("Successfully changed")`

## Rollback Plan

If issues arise after translation:
1. All changes are text-only and can be easily reverted
2. Git version control allows rollback to previous Chinese version
3. No database migrations or schema changes are involved
4. No API contract changes (only message content changes)
