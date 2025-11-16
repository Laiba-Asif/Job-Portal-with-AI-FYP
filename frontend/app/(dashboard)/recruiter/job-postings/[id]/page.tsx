"use client";

import { useRouter } from "next/navigation";
import { useJobs } from "@/hooks/useJobs";
import JobForm from "../components/JobForm";

interface PageProps {
  params: { id: string };
}

const JobDetailPage = ({ params }: PageProps) => {
  const { useJob, updateJob, deleteJob } = useJobs();
  const { data: job, isLoading } = useJob(params.id);
  const router = useRouter();

  if (isLoading || !job) return <div>Loading...</div>;

  const handleUpdate = (data: any) => {
    updateJob.mutate({ id: params.id, job: data });
  };

  const handleDelete = () => {
    deleteJob.mutate(params.id, { onSuccess: () => router.push("/jobs") });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Update Job</h1>
      <JobForm job={job} onSubmit={handleUpdate} />
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Job
      </button>
    </div>
  );
};

export default JobDetailPage;
