import { Fragment } from "react";
import { Link, useRouter, useMutation, Routes } from "blitz";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useCurrentUser } from "app/core/hooks/useCurrentUser";
import logout from "app/auth/mutations/logout";
import Logo from "app/core/components/Logo";
import HomeCard from "app/components/HomeCard";

const navigation = [
  { name: "Dashboard", link: Routes.DashboardPage().pathname },
];
const profile = [
  { name: "Your Profile", link: "/profile" },
  { name: "Settings", link: "/settings" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  const route = useRouter();

  !currentUser && route.push("/login");

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Logo className="fill-[#6700eb] w-[75px] h-[50px] mx-auto mb-4" />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, index) =>
                        item.link === route.pathname ? (
                          <Fragment key={index}>
                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                            <Link href={item.link}>
                              <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                {item.name}
                              </a>
                            </Link>
                          </Fragment>
                        ) : (
                          <Link key={index} href={item.link}>
                            <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                              {item.name}
                            </a>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
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
                              {profile.map((item, index) => (
                                <Menu.Item key={index}>
                                  {({ active }) => (
                                    <Link href={item.link}>
                                      <a
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    type="button"
                                    onClick={async () => await logoutMutation()}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                    )}
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
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, index) =>
                  item.link === route.pathname ? (
                    <Fragment key={index}>
                      <Link href={item.link}>
                        <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                          {item.name}
                        </a>
                      </Link>
                    </Fragment>
                  ) : (
                    <Link key={index} href={item.link}>
                      <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        {item.name}
                      </a>
                    </Link>
                  )
                )}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://ui-avatars.com/api/?name=${(
                        currentUser?.name ??
                        currentUser?.email?.split("@")?.[0] ??
                        "User"
                      ).toLowerCase()}&color=7F9CF5&background=EBF4FF`}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {currentUser?.name ?? currentUser?.email?.split("@")?.[0]}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {currentUser?.email}
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item, index) => (
                    <Link key={index} href={item.link}>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={async () => await logoutMutation()}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <HomeCard />
    </div>
  );
}
