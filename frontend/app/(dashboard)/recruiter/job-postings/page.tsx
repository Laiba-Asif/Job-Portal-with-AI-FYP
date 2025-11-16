"use client";

import { useRef, useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import JobFormModal, { JobFormModalHandle } from "./components/JobForm";

const JobPostings = () => {
  const { jobsQuery, createJob, updateJob, deleteJob } = useJobs();
  const modalRef = useRef<JobFormModalHandle>(null);

  const [selectedJob, setSelectedJob] = useState(null);

  const openCreate = () => {
    setSelectedJob(null);
    modalRef.current?.open();
  };

  const openEdit = (job) => {
    setSelectedJob(job);
    modalRef.current?.open();
  };

  if (jobsQuery.isLoading)
    return (
      <div className="container mx-auto p-4">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl ml-4 font-semibold text-blue-700">
          Job Postings
        </h1>
        <button
          onClick={openCreate}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white px-4 py-2 rounded hover:shadow"
        >
          Create Job
        </button>
      </div>

      {/* Empty state */}
      {jobsQuery.data?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No jobs yet.</p>
          <button
            onClick={openCreate}
            className="mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400 text-white px-4 py-2 rounded hover:shadow"
          >
            Create Job
          </button>
        </div>
      )}

      {/* Job List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobsQuery.data?.map((job) => (
          <div
            key={job._id}
            className="border rounded p-4 bg-white shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.role}</p>
            <p className="mt-1 text-gray-700">
              {job.description.slice(0, 80)}...
            </p>

            <div className="mt-3 flex justify-between items-center">
              <button
                onClick={() => openEdit(job)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteJob.mutate(job._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <JobFormModal
        ref={modalRef}
        job={selectedJob}
        onSubmit={(data) => {
          if (selectedJob) {
            updateJob.mutate(
              { id: selectedJob._id, job: data },
              {
                onSuccess: () => {
                  modalRef.current?.close();
                  setSelectedJob(null);
                },
              }
            );
          } else {
            createJob.mutate(data, {
              onSuccess: () => modalRef.current?.close(),
            });
          }
        }}
      />
    </div>
  );
};

export default JobPostings;
