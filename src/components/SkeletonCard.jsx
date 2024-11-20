export function SkeletonCard() {
  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="flex flex-wrap justify-center gap-6 mx-4 my-4 p-4"
          key={index}
        >
          <div className="skeleton h-32 w-full p-2"></div>
          <div className="skeleton h-4 w-28 p-2"></div>
          <div className="skeleton h-4 w-full p-2 "></div>
          <div className="skeleton h-4 w-full p-2"></div>
        </div>
      ))}
    </div>
  )
}
