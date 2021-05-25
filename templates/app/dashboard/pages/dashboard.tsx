import { Suspense } from "react"
import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import Dashboard from "../components/Dashboard"

const DashboardPage: BlitzPage = () => {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  )
}

DashboardPage.authenticate = true
DashboardPage.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default DashboardPage
