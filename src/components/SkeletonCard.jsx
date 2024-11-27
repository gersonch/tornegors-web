export function SkeletonCard() {
  return (
    <>
      <div className="flex justify-center">
        <h2 className="skeleton h-8 w-36  "></h2>
      </div>
      <div className="max-w-5xl mx-auto">
        <p className="skeleton h-4 w-24 "></p>
      </div>

      <ul className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className=" w-full sm:w-1/2 lg:w-1/3 p-4 flex justify-center"
          >
            <div className="skeleton flex flex-col h-full w-full">
              <a
                to="mis-torneos/play"
                className="skeleton bg-cyan-950 px-8 py-4 rounded-xl flex flex-col gap-4 md:min-h-44 md:44"
              >
                <h5 className="skeleton text-xl font-bold h-auto w-auto"></h5>
                <p className="skeleton text-white/70"></p>
                <span className="skeleton text-sm font-medium px-1 py-0.5 rounded max-w-28 flex-nowrap flex text-center justify-center  "></span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
