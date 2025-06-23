# 🧪 Email/Password Authentication Test Guide

## ✅ **What Was Fixed**

### **1. Database Sessions + Credentials Compatibility**
- **Problem**: Credentials provider doesn't create Account records automatically
- **Solution**: Added manual Account creation in signIn callback

### **2. NEXT_REDIRECT Error Handling**
- **Problem**: NextAuth redirects were caught as errors
- **Solution**: Proper error handling that re-throws NEXT_REDIRECT

### **3. Simplified Auth Actions**
- **Problem**: Complex error handling and validation logic
- **Solution**: Cleaner validation and error flow

## 🚀 **Testing Steps**

### **Step 1: Clear Browser Data**
```javascript
// Run in browser console
document.cookie.split(";").forEach(cookie => {
  const name = cookie.split("=")[0].trim();
  if (name.includes("next-auth")) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
});
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### **Step 2: Restart Development Server**
```bash
npm run dev
```

### **Step 3: Test Sign Up**
1. Go to `http://localhost:8000/auth/signup`
2. Fill form:
   - **Email**: `test-final@example.com`
   - **Password**: `password123`
   - **Name**: `Test User`
3. Submit form
4. **Expected**: Redirect to home page with user info

### **Step 4: Test Sign Out**
1. Click "Sign Out" button
2. **Expected**: Redirect to sign-in page

### **Step 5: Test Sign In**
1. Go to `http://localhost:8000/auth/signin`
2. Enter same credentials
3. **Expected**: Redirect to home page

### **Step 6: Verify Database**
```bash
npx prisma studio
```
**Expected Records:**
- `users` table: User with hashed password
- `accounts` table: Account with provider="credentials"
- `sessions` table: Active session record

## 🎯 **Expected Behavior**

### **Sign Up Flow:**
1. ✅ User created in database with hashed password
2. ✅ Account record created with provider="credentials"
3. ✅ User automatically signed in
4. ✅ Session created in database
5. ✅ Redirect to home page

### **Sign In Flow:**
1. ✅ Credentials validated against database
2. ✅ Session created/updated
3. ✅ Redirect to home page

### **OAuth Still Works:**
1. ✅ GitHub/Google sign-in unchanged
2. ✅ Creates separate account records
3. ✅ Uses same session system

## 🔧 **If Issues Persist**

### **Debug Mode:**
Add this to see what's happening:
```javascript
// In browser console
localStorage.setItem('debug', 'next-auth*')
```

### **Check Database:**
```sql
-- Check users
SELECT id, email, name, password IS NOT NULL as has_password FROM users;

-- Check accounts
SELECT userId, provider, type FROM accounts;

-- Check sessions
SELECT userId, expires FROM sessions WHERE expires > NOW();
```

## ✅ **Success Indicators**
- No JWT decryption errors
- Users can sign up and sign in
- Database records created correctly
- OAuth providers still work
- Clean error messages for invalid credentials
