import Link from 'next/link'

export default function NotFound() {
  return <div>
    <div className=" w-screen bg-gray-50 flex items-center">
      <div className=" flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-designColor font-dark font-extrabold mb-8"> 404</div>
          <p className=" xs:text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldn not find the page you are looking for
          </p>
          <a href="/" className="px-3 md:px-5 inline py-2 md:py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-designColor active:bg-orange-500 hover:bg-orange-500">back to homepage</a>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg" className="" alt="Page not found" />
        </div>

      </div>
    </div>
  </div>
}