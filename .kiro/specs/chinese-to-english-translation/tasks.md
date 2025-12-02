# Implementation Plan

- [x] 1. Translate service layer error messages

  - [x] 1.1 Update error messages in account-manager.js


    - Replace all Chinese error messages with English equivalents in `core/services/account-manager.js`
    - Update login validation messages
    - Update registration validation messages
    - Update password change validation messages
    - Update verification code validation messages

    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_



- [ ] 2. Translate route handler messages and comments
  - [x] 2.1 Update error messages in routes/users.js


    - Replace Chinese error messages with English in password validation
    - Replace Chinese error messages with English in email validation

    - Translate code comment "//修改密码" to "// Change password"


    - _Requirements: 2.1, 2.2, 5.3_
  - [ ] 2.2 Update comments in routes/index.js
    - Translate comment "//灰度检测" to "// Canary detection"
    - Update page title for tokens route from "获取token" to "Get Token"
    - _Requirements: 5.4_



- [ ] 3. Translate view template UI text
  - [ ] 3.1 Update login page (views/auth/login.pug)
    - Replace "请登录" with "Please Login"
    - Replace "邮箱地址／用户名" with "Email Address / Username"
    - Replace "密码" with "Password"


    - Replace "记住我" with "Remember Me"
    - Replace "登录" button text with "Login"


    - _Requirements: 1.1, 1.2_
  - [ ] 3.2 Update password change page (views/auth/password.pug)
    - Replace "邮箱地址／用户名" with "Email Address / Username"


    - Replace "获取token" with "Get Token"


    - Replace "原密码" with "Old Password"
    - Replace "新密码" with "New Password"
    - Replace "修改密码" button with "Change Password"
    - Replace alert "修改成功" with "Successfully changed"
    - _Requirements: 1.3, 1.4_
  - [ ] 3.3 Update tokens page (views/tokens.pug)
    - Replace "获取token" button with "Get Token"


    - Replace alert "请重新登录!" with "Please login again!"
    - _Requirements: 1.4_
  - [ ] 3.4 Update homepage (views/index.pug)
    - Replace "react naitve 热更新服务器" with "React Native Hot Update Server" (fix typo)
    - Replace "登录" button with "Login"
    - Replace "修改密码" button with "Change Password"
    - _Requirements: 1.5_

- [ ] 4. Update test assertions to match English messages
  - [ ] 4.1 Update user tests (test/api/users/users.test.js)
    - Update assertion for "请您输入邮箱地址" to "Please enter your email address"
    - Update assertion for email already registered message
    - Update assertion for verification code expired message
    - Update assertion for incorrect verification code message
    - Update assertion for password length validation message
    - Update assertion for old password incorrect message
    - Update assertion for new password length validation message
    - _Requirements: 4.1, 4.3, 4.4, 4.5_
  - [ ] 4.2 Update auth tests (test/api/auth/auth.test.js)
    - Update assertion for "请您输入邮箱地址" to "Please enter your email address"
    - Update assertion for "您输入的邮箱或密码有误" to "The email or password you entered is incorrect"
    - _Requirements: 4.2, 4.5_
  - [ ]* 4.3 Run full test suite to verify all tests pass
    - Execute `npm test` or `npm run test-win` on Windows
    - Verify all test cases pass with English error messages
    - _Requirements: 4.5_
