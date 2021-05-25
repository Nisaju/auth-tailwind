import { useMutation, Routes } from "@blitzjs/core";
import { Menu, Transition } from "@headlessui/react";
import logout from "app/auth/mutations/logout";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import Link from "next/link";
import { Fragment, Suspense } from "react";
import HomeCard from "./HomeCard";

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <Menu as="div" className="ml-3 relative">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${(
                      currentUser?.name ??
                      currentUser?.email?.split("@")?.[0] ??
                      "User"
                    ).toLowerCase()}&color=7F9CF5&background=EBF4FF`}
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link href={Routes.DashboardPage().pathname}>
                        <a
                          className={[
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700",
                          ].join(" ")}
                        >
                          Dashboard
                        </a>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={async () => await logoutMutation()}
                        className={[
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700 w-full text-left",
                        ].join(" ")}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </>
    );
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="mx-4 block text-base bg-gray-400 py-2 px-4 text-[#F4F4F4] text-center hover:bg-gray-500 rounded-md">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="block text-base bg-[#6700EB] py-2 px-4 text-[#F4F4F4] text-center hover:bg-[#45009D] rounded-md">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    );
  }
};

export default function Home() {
  return (
    <>
      <nav className="w-full bg-gray-100 flex justify-end items-center px-6 py-4">
        <a
          href="https://blitzjs.com/docs/getting-started?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#6700eb]"
        >
          Documentation
        </a>
        {/*  */}
        <a
          href="https://github.com/blitz-js/blitz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 20 20"
            focusable="false"
            className="mx-4 w-5 h-5 block leading-4 flex-shrink-0 transition-colors duration-200 fill-[##a0aec0] hover:text-gray-400"
          >
            <path
              fill="currentColor"
              d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
            ></path>
          </svg>
        </a>
        {/*  */}
        <a
          href="https://discord.blitzjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            viewBox="0 0 146 146"
            focusable="false"
            className="mx-4 w-5 h-5 block leading-4 flex-shrink-0 transition-colors duration-200 fill-[##a0aec0] hover:text-gray-400"
          >
            <path
              fill="currentColor"
              d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
              fill-rule="nonzero"
            ></path>
          </svg>
        </a>
        <Suspense fallback={null}>
          <UserInfo />
        </Suspense>
      </nav>
      <HomeCard />
      <footer className="w-full h-[60px] border-t border-[#EAEAEA] flex justify-center items-center bg-[#45009D]">
        <a
          href="https://blitzjs.com?utm_source=blitz-new&utm_medium=app-template&utm_campaign=blitz-new"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center text-[#F4F4F4] no-underline"
        >
          Powered by Blitz.js
        </a>
      </footer>
    </>
  );
}
