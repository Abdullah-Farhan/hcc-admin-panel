import EventScheduler from "@/components/calenders/EventScheduler";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="px-8 py-5">
      <h1 className="text-3xl font-light">Dashboard</h1>
      <div className="flex w-full space-x-2 mt-4">
        <div className="h-full bg-white rounded-lg w-1/2 p-6">
          <EventScheduler />
        </div>
        <div className="h-full w-1/2">
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between">
              <p className="text-xl font-light">Member Progress</p>
              <Link
                href={"/member-progress"}
                className="flex items-center cursor-pointer text-sm font-semibold"
              >
                View All <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </div>
              <div className="w-full flex space-x-2 rounded bg-gray-300">
                <button>90 Day</button>
                <button>Graduation</button>
                <button>Kitchen Use</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
