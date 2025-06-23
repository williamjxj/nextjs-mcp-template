# 🔍 Debug Login Issues

## 🚨 **Current Problem**
- Existing users can't login even though accounts table has records
- Need to identify where the authentication flow is failing

## 🧪 **Debug Steps**

### **Step 1: Clear Everything and Restart**
```bash
# Stop the development server (Ctrl+C)

# Clear browser data (run in browser console)
document.cookie.split(";").forEach(cookie => {
  const name = cookie.split("=")[0].trim();
  if (name.includes("next-auth")) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
});
localStorage.clear();
sessionStorage.clear();
location.reload();

# Restart server
npm run dev
```

### **Step 2: Test Login with Debug Logs**
1. **Open browser console** (F12 → Console tab)
2. **Go to signin page**: `http://localhost:8000/auth/signin`
3. **Try to login** with existing user credentials
4. **Watch the console logs** - you should see:

```
🔍 AUTHORIZE: Starting authentication for: your-email@example.com
🔍 AUTHORIZE: Querying database for user: your-email@example.com
✅ AUTHORIZE: User found, verifying password...
✅ AUTHORIZE: Password verified, returning user object
🔍 SIGNIN CALLBACK: Called with: {user: {id: "...", email: "..."}, account: {provider: "credentials", type: "credentials"}}
🔍 SIGNIN CALLBACK: Processing credentials provider
✅ SIGNIN CALLBACK: Account already exists (or Account created successfully)
✅ SIGNIN CALLBACK: Returning true
🔍 SESSION CALLBACK: Called with: {session: {...}, user: {...}}
✅ SESSION CALLBACK: Added user ID to session
✅ SESSION CALLBACK: Returning session: {...}
```

### **Step 3: Identify Where It Fails**

**If you see:**
- `❌ AUTHORIZE: User not found in database` → User doesn't exist
- `❌ AUTHORIZE: User exists but has no password` → Password is null
- `❌ AUTHORIZE: Password verification failed` → Wrong password or hash issue
- `💥 AUTHORIZE: Database error` → Database connection issue
- `💥 SIGNIN CALLBACK: Error with account` → Account creation failed

### **Step 4: Check Database State**
```bash
npx prisma studio
```

**Verify:**
1. **Users table**: Your email exists with a password hash
2. **Accounts table**: Has record with provider="credentials" for your user
3. **Sessions table**: Should have active session after successful login

## 🔧 **Common Issues & Solutions**

### **Issue 1: Password Hash Mismatch**
If you see "Password verification failed" but you're sure the password is correct:

```sql
-- Check if password is properly hashed
SELECT email, password FROM users WHERE email = 'your-email@example.com';
```

**Solution**: The password might not be properly hashed. Recreate the user:
```bash
# Delete the user and try signup again
```

### **Issue 2: Missing Account Record**
If signin callback fails to find/create account:

```sql
-- Check accounts table
SELECT userId, provider, type FROM accounts WHERE provider = 'credentials';
```

### **Issue 3: Database Connection Issues**
If you see database errors:
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env files
- Test connection: `npx prisma db pull`

## 🎯 **Expected Success Flow**

When login works correctly, you should see:
1. ✅ All debug logs show success
2. ✅ Redirect to home page
3. ✅ User info displayed on home page
4. ✅ New session record in database

## 📋 **Report Back**

After testing, please share:
1. **Console logs** from the login attempt
2. **Any error messages** you see
3. **Database state** (users/accounts/sessions tables)
4. **What happens** when you try to login (stays on signin page, redirects, shows error, etc.)

This will help identify exactly where the authentication is failing!
