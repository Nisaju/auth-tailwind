import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

import { AuthTailwind } from "config/AuthTailwind.config"
import ForgotPassword from "app/auth/components/ForgotPassword"
import Page404 from "app/pages/404"

const ForgotPasswordPage: BlitzPage = () => {
  if (!AuthTailwind.authRoute) return <Page404 />
  return <ForgotPassword />
}

ForgotPasswordPage.redirectAuthenticatedTo = AuthTailwind.redirectAuthenticatedTo
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
