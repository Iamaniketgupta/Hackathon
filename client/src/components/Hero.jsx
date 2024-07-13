import { Link } from "react-router-dom";

export default function Example() {

  return (
    <div className="p-5 md:p-32 sm:py-48 lg:py-56 mt-20 md:mt-0">
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
      Clean  Your Place with Ease: Let RagPickers Handle the Mess 🧹
      </h1>
      <p className="mt-6 text-lg leading-8 text-white">
      Welcome to RagPickers, your ultimate solution for maintaining a clean and organized living space.     
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/book"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </Link>
        <a href="#steps" className="text-sm font-semibold leading-6 text-white">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
  )
}
