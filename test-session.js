// Test session creation manually
// Run this with: node test-session.js

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testSessionCreation() {
  try {
    console.log('🔍 Testing session creation...')
    
    // Find a user
    const user = await prisma.user.findFirst({
      where: {
        email: 'jxjwilliam@2925.com'
      }
    })
    
    if (!user) {
      console.log('❌ User not found')
      return
    }
    
    console.log('✅ User found:', { id: user.id, email: user.email })
    
    // Check if account exists
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        provider: 'credentials'
      }
    })
    
    console.log('Account exists:', !!account)
    
    // Try to create a session manually
    const sessionToken = 'test-session-' + Date.now()
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    
    const session = await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires
      }
    })
    
    console.log('✅ Session created:', session)
    
    // Clean up test session
    await prisma.session.delete({
      where: { id: session.id }
    })
    
    console.log('✅ Test session cleaned up')
    
  } catch (error) {
    console.error('💥 Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testSessionCreation()
