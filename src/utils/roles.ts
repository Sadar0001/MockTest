import { Roles } from '../types/globals';
import { auth } from '@clerk/nextjs/server'



interface CustomClaims {
  metadata?: {
    role?: Roles
  }
}

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()

  const claims = sessionClaims as CustomClaims

  return claims.metadata?.role === role
}