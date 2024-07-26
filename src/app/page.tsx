// app/page.tsx
import JobList from '../components/JobList';
import { Job } from '@/types/types';
import jobsData from '../../data/jobs.json';

export default function HomePage() {
  const jobs: Job[] = jobsData.sort((a, b) => {
    const dateA = new Date(a?.updatedAt.split('.').reverse().join('-')).getTime();
    const dateB = new Date(b?.updatedAt.split('.').reverse().join('-')).getTime();
    return dateB - dateA;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Listings ({jobs.length} offers)</h1>
      <JobList jobs={jobs} />
    </div>
  );
}
