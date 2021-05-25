import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { AuthTailwind } from "config/AuthTailwind.config"
import Page404 from "app/pages/404"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  if (!AuthTailwind.authRoute) return <Page404 />

  const onSuccess = () => {
    const next = router.query.next
      ? decodeURIComponent(router.query.next as string)
      : AuthTailwind.redirectAuthenticatedTo
    router.push(next)
  }

  return <LoginForm onSuccess={onSuccess} />
}

LoginPage.redirectAuthenticatedTo = AuthTailwind.redirectAuthenticatedTo
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
