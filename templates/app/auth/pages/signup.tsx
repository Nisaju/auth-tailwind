import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { AuthTailwind } from "config/AuthTailwind.config"
import Page404 from "app/pages/404"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  if (!AuthTailwind.authRoute || !AuthTailwind.registerRoute) return <Page404 />

  return <SignupForm onSuccess={() => router.push(Routes.Home())} />
}

SignupPage.redirectAuthenticatedTo = AuthTailwind.redirectAuthenticatedTo
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
