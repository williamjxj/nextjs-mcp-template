"use server"

import bcryptjs from "bcryptjs"
import { prisma } from "./prisma.ts"

/**
 * Create a new user with hashed password
 * @param {Object} userData - User data
 * @param {string} userData.email - User email
 * @param {string} userData.password - Plain text password
 * @param {string} userData.name - User name (optional)
 * @returns {Promise<Object>} Created user (without password)
 */
export async function createUser({ email, password, name }) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcryptjs.hash(password, saltRounds)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
        // Exclude password from return value
      },
    })

    return user
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

/**
 * Get user by email (without password)
 * @param {string} email - User email
 * @returns {Promise<Object|null>} User object or null
 */
export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
        // Exclude password from return value
      },
    })

    return user
  } catch (error) {
    console.error("Error getting user by email:", error)
    return null
  }
}

/**
 * Verify user password
 * @param {string} email - User email
 * @param {string} password - Plain text password
 * @returns {Promise<Object|null>} User object if valid, null otherwise
 */
export async function verifyUserPassword(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !user.password) {
      return null
    }

    const isValidPassword = await bcryptjs.compare(password, user.password)

    if (!isValidPassword) {
      return null
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Error verifying user password:", error)
    return null
  }
}

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object>} Updated user
 */
export async function updateUser(userId, updateData) {
  try {
    // Don't allow password updates through this function
    const { password, ...safeUpdateData } = updateData

    const user = await prisma.user.update({
      where: { id: userId },
      data: safeUpdateData,
      select: {
        id: true,
        email: true,
        name: true,
        emailVerified: true,
        image: true,
      },
    })

    return user
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} currentPassword - Current password
 * @param {string} newPassword - New password
 * @returns {Promise<boolean>} Success status
 */
export async function changeUserPassword(userId, currentPassword, newPassword) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user || !user.password) {
      throw new Error("User not found or no password set")
    }

    // Verify current password
    const isValidPassword = await bcryptjs.compare(
      currentPassword,
      user.password
    )

    if (!isValidPassword) {
      throw new Error("Current password is incorrect")
    }

    // Hash new password
    const saltRounds = 12
    const hashedNewPassword = await bcryptjs.hash(newPassword, saltRounds)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    })

    return true
  } catch (error) {
    console.error("Error changing user password:", error)
    throw error
  }
}
