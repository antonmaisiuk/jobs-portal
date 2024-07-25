import fs from 'fs';
import path from 'path';
import { Job } from '@/types/types';

const jobsFilePath = path.join(process.cwd(), 'data', 'jobs.json');

export async function fetchJobs(): Promise<Job[]> {
  const fileContents = fs.readFileSync(jobsFilePath, 'utf-8');
  return JSON.parse(fileContents);
}
