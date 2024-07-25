// components/JobList.tsx

'use client'; // Позволяет использовать клиентский код в компоненте
import { useState } from 'react';
import JobCard from './JobCard';
import { Job } from '@/types/types';
import {Pagination} from "@nextui-org/pagination";
import moment from "moment";

// import { useRouter } from 'next/navigation';

const JOBS_PER_PAGE = 15;

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // const router = useRouter();

  // const currentPage = 1;
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  // const handleJobClick = (jobId: number) => {
  //   router.push(`/jobs/${jobId}`);
  // };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / JOBS_PER_PAGE)));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mb-4">
        {currentJobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {/*<Pagination isCompact showControls total={currentJobs.length} initialPage={1} />*/}

      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          // disabled={!!currentPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(jobs.length / JOBS_PER_PAGE)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </>
  );
}
