const ProgressCard = ({ data }) => {
    const getProgressColor = (progress) => {
      if (progress < 50) return 'bg-red-500'
      if (progress <= 75) return 'bg-blue-500'
      return 'bg-green-500'
    }
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm w-full transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-[#151C2D] font-semibold text-base">{data.name}</h2>
            <p className="text-sm text-[#6B7280]">{data.program}</p>
          </div>
          <div className="bg-gray-100 text-xs px-2 py-1 rounded-full text-[#6B7280] font-medium">
            {data.progress}%
          </div>
        </div>
        <p className="text-sm text-[#4B5563] mb-3">{data.currentTask}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getProgressColor(data.progress)}`}
            style={{ width: `${data.progress}%` }}
          />
        </div>
      </div>
    )
  }
  
  export default ProgressCard
  