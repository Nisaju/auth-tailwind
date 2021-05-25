import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

import { AuthTailwind } from "config/AuthTailwind.config"
import ResetPassword from "app/auth/components/ResetPassword"
import Page404 from "app/pages/404"

const ResetPasswordPage: BlitzPage = () => {
  if (!AuthTailwind.authRoute) return <Page404 />
  return <ResetPassword />
}

ResetPasswordPage.redirectAuthenticatedTo = AuthTailwind.redirectAuthenticatedTo
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
