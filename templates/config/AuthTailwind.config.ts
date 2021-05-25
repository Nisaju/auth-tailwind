import db, { Prisma } from "db"

import { Routes } from "blitz"

export class AuthTailwind {
  /**
   * Indicates if Auth Tailwind routes will be registered.
   */
  static registerRoute = true
  static authRoute = true

  static redirectAuthenticatedTo = Routes.DashboardPage().pathname

  /**
   * The user model that should be used by Auth Tailwind.
   */
  static userModel: Prisma.UserDelegate<unknown> = db.user

  /**
   * The roles that are available to assign to users.
   */
  static roles: string[] = []

  /**
   * Find the role with the given key.
   */
  static findRole(key: string): string | null {
    return this.roles[key] ?? null
  }

  /**
   * Find a user instance by the given ID.
   */
  static findUserByIdOrFail(id: number) {
    return this.userModel.findFirst({
      where: {
        id,
      },
    })
  }

  /**
   * Find a user instance by the given email address or fail.
   */
  static findUserByEmailOrFail(email: string) {
    return this.userModel.findFirst({ where: { email: email } })
  }
}
