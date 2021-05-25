import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import HomeCom from "app/components/Home"

const Home: BlitzPage = () => {
  return <HomeCom />
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
