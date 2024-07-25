// 'use client'; // Директива для использования клиентских функций

import { Job } from '@/types/types';
import Link from "next/link";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link className="border p-4 rounded-md shadow-lg hover:bg-gray-100 cursor-pointer" href={`/jobs/${job.id}`}>

      <h2 className="text-xl font-bold">{job.title}</h2>
      <div className="flex justify-between items-end">
        <p className="font-bold">{job.salary}</p>
        <div className="flex-col text-right">
          <p className="text-gray-600">{job.contactName}</p>
          <p className="text-gray-600">{job.updatedAt}</p>
        </div>
      </div>
      {/*<div className="mt-2 text-gray-800" dangerouslySetInnerHTML={{ __html: job.description.substring(0, 100)}}></div>*/}
    </Link>
  );
}
