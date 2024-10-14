// components/JobList.tsx

'use client'; // Позволяет использовать клиентский код в компоненте
import {useEffect, useState} from 'react';
import JobCard from './JobCard';
import { Job } from '@/types/types';
import {Pagination} from "@nextui-org/pagination";
import moment from "moment";
import _ from "lodash";

// import { useRouter } from 'next/navigation';

const JOBS_PER_PAGE = 15;

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      // Извлекаем номер страницы из localStorage при первой загрузке компонента
      const savedPage = localStorage.getItem('currentPage');
      return savedPage ? Number(savedPage) : 1;
    }
    return 1;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Сохраняем текущий номер страницы в localStorage при его изменении
      localStorage.setItem('currentPage', String(currentPage));
      // Скроллим страницу вверх при изменении номера страницы
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // Извлекаем номер страницы из localStorage при первой загрузке компонента
      const savedSearchTerm = localStorage.getItem('searchTerm');
      return savedSearchTerm ? savedSearchTerm : '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchTerm', searchTerm);
    }
  }, [searchTerm]);

  const [sourceFilter, setSourceFilter] = useState<string>('');

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;

  const filteredJobs = jobs.filter(job => {
    const titleMatch = searchTerm === '' ? true : job.title?.toLowerCase().includes(searchTerm.toLowerCase())
        || job.description?.toLowerCase().includes(searchTerm.toLowerCase())
        || false;
    const sourceMatch = sourceFilter === '' ? true : job.source?.toLowerCase().includes(sourceFilter.toLowerCase()) || false;

    return titleMatch && sourceMatch;
  });

  const currentJobs = filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Сброс страницы при новом поиске
  };

  const handleSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSourceFilter(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };
  const handleFirst = () => {
    setCurrentPage(1);
  };
  const handleLast = () => {
    setCurrentPage(_.ceil(jobs.length / JOBS_PER_PAGE));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, Math.ceil(jobs.length / JOBS_PER_PAGE)));
  };

  const getPagination = () => (
    <div className="flex justify-between">
      <div>
        <button
          onClick={handleFirst}
          // disabled={currentPage === 1}
          // disabled={!!currentPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          1
        </button>
        <button
          onClick={handlePrevious}
          // disabled={currentPage === 1}
          // disabled={!!currentPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
      </div>
      <span>Page {currentPage}</span>
      <div>
        <button
          onClick={handleNext}
          // disabled={currentPage === Math.ceil(jobs.length / JOBS_PER_PAGE)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
        <button
          onClick={handleLast}
          // disabled={currentPage === 1}
          // disabled={!!currentPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          {_.ceil(filteredJobs.length / JOBS_PER_PAGE)}
        </button>
      </div>
    </div>
  )

  return (
      <>
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <input
              type="text"
              placeholder="Поиск"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded p-2 mr-2"
          />
          <select
              value={sourceFilter}
              onChange={handleSourceChange}
              className="border border-gray-300 rounded p-2 mr-2"
          >
            <option key={'olx'} value={''}>All sources</option>
            <option key={'olx'} value={'olx.pl'}>Olx</option>
            <option key={'jooble'} value={'jooble.pl'}>Jooble</option>
            <option key={'bialystokonline'} value='bialystokonline.pl'>Białystok Online</option>
          </select>
        </div>

        {getPagination()}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 mt-4 mb-4">
          {currentJobs.map(job => (
              <JobCard key={job.id} job={job}/>
          ))}
        </div>
        {/*<Pagination isCompact showControls total={currentJobs.length} initialPage={1} />*/}

        {getPagination()}
      </>
  );
}
