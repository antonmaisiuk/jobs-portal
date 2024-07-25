import { Job } from '@/types/types';
import { fetchJobs } from '@/lib/dataFetcher';
import { notFound } from 'next/navigation';
import Link from "next/link";
import JobCard from "@/components/JobCard";

interface JobDetailProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobDetailProps) {
  const jobs: Job[] = await fetchJobs();
  const job = jobs.find(job => job.id === parseInt(params.id));

  if (!job) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Link href='/' className="px-4 py-2 bg-blue-500 text-white rounded-md">Back</Link>
      <br/>
      <br/>
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text font-semibold">{job.contactName}</p>
      <br/>
      <hr/>
      <br/>
      {job.salary ? <>
      <h2 className="font-bold text-center">{job.salary}</h2>
        <br/>
        <hr/>
        <br/>
      </> : ''}

      {/*<ul>*/}
        {job.attrs.map((el, idx) => (
          <div className="flex grid-cols-2 gap-1" key={idx}><div className="font-bold" >{el.name}:</div><div>{el.value}</div></div>
        ))}
      {/*</ul>*/}
      <br/>
      <hr/>
      <br/>
      <div>
        <h3 className="font-bold">Opis:</h3>
        {job.description ? <p className="mt-4" dangerouslySetInnerHTML={{ __html: job.description}}></p> : <p>Brak</p>}
      </div>
      <br/>
      <hr/>
      <br/>
      <Link target="_blank" href={job.url} className="px-10 py-2 bg-blue-500 text-white rounded-md">Przejdź na OLX</Link>
    </div>
  );
}

export async function generateStaticParams() {
  const jobs: Job[] = await fetchJobs();
  return jobs.map(job => ({ id: job.id.toString() }));
}
