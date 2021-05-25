import Logo from "app/core/components/Logo"
import Link from "next/link"

export default function HomeCard() {
  return (
    <main className="my-8 flex justify-center items-center px-4 md:px-0 xl:h-screen xl:min-h-screen xl:max-h-screen">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg md:w-2/3 lg:w-1/2">
        <div className="px-4 py-5 sm:px-6 bg-gray-100">
          <Logo className="fill-[#6700eb] w-[100px] h-[50px] lg:w-[150px] lg:h-[75px] mx-auto mb-4" />
        </div>
        <div className="border-t px-6 py-4 text-center">
          <h1 className="text-xl">
            <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
          </h1>

          <p className="text-lg text-gray-800 mt-6">
            <strong>
              To add a new model to your app, <br />
              run the following in your terminal:
            </strong>
          </p>

          <pre className="p-3 overflow-x-auto">
            <code className="inline-block font-mono text-sm p-1 rounded-sm bg-[#EDF2F7] text-[#1A202C]">
              blitz generate all project name:string
            </code>
          </pre>

          <div className="mb-4">(And select Yes to run prisma migrate)</div>

          <p>
            Then <strong>restart the server</strong>
          </p>

          <pre className="p-3">
            <code className="inline-block font-mono text-sm p-1 rounded-sm bg-[#EDF2F7] text-[#1A202C]">
              Ctrl + c
            </code>
          </pre>
          <pre className="p-3">
            <code className="inline-block font-mono text-sm p-1 rounded-sm bg-[#EDF2F7] text-[#1A202C]">
              blitz dev
            </code>
          </pre>

          <p className="text-lg text-gray-800 mt-6">
            and go to{" "}
            <Link href="/projects">
              <a>/projects</a>
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
