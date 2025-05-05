import React from 'react'

const ProgressCard = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-md">
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
          className="bg-[#2E90FA] h-2 rounded-full"
          style={{ width: `${data.progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressCard
