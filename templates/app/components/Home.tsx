import HomeCard from "./HomeCard"
import Navbar from "./Navbar"

export default function Home() {
  return (
    <>
      <Navbar />
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
  )
}
