"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Job } from "@/hooks/useJobs";
import { EXPERIENCE_LEVELS, JOB_TYPES } from "./constants/jobOptions";

// Zod schema
const jobSchema = z.object({
  title: z.string().min(3),
  role: z.string().min(2),
  jobType: z.enum(JOB_TYPES),
  experienceLevel: z.enum(EXPERIENCE_LEVELS),
  location: z.string().min(2),
  requiredSkills: z.array(z.string().min(1)),
  description: z.string().min(5),
});

export type JobFormInputs = z.infer<typeof jobSchema>;

interface JobFormModalProps {
  onSubmit: (data: JobFormInputs) => void;
  job?: Job | null;
}

export interface JobFormModalHandle {
  open: () => void;
  close: () => void;
}

const JobFormModal = forwardRef<JobFormModalHandle, JobFormModalProps>(
  ({ onSubmit, job }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<JobFormInputs>({
      resolver: zodResolver(jobSchema),
      defaultValues: {
        title: "",
        role: "",
        jobType: "" as any,
        experienceLevel: "" as any,
        location: "",
        requiredSkills: [],
        description: "",
      },
    });

    // Sync form values when editing
    useEffect(() => {
      if (isOpen) {
        if (job) {
          reset({
            title: job.title,
            role: job.role,
            jobType: job.jobType as
              | "Full-time"
              | "Part-time"
              | "Internship"
              | "Contract"
              | "Remote"
              | "Hybrid",
            experienceLevel: job.experienceLevel,
            location: job.location,
            requiredSkills: job.requiredSkills || [],
            description: job.description,
          });
        } else {
          reset();
        }
      }
    }, [job, isOpen, reset]);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false);
        reset();
      },
    }));

    if (!isOpen) return null;

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
          <button
            className="absolute top-3 right-3 text-gray-600"
            onClick={() => {
              setIsOpen(false);
              reset();
            }}
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-4">
            {job ? "Update Job" : "Create Job"}
          </h2>

          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="space-y-4"
          >
            {/* Title */}
            <div>
              <label className="block text-sm">Title</label>
              <input
                {...register("title")}
                className="w-full border rounded p-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm">Role</label>
              <input
                {...register("role")}
                className="w-full border rounded p-2"
              />
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Job Type and Experience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm">Job Type</label>
                <select
                  {...register("jobType")}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select</option>
                  {JOB_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm">Experience Level</label>
                <select
                  {...register("experienceLevel")}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select</option>
                  {EXPERIENCE_LEVELS.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm">Location</label>
              <input
                {...register("location")}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm">
                Required Skills (comma separated)
              </label>
              <input
                className="w-full border rounded p-2"
                defaultValue={job?.requiredSkills.join(",") || ""}
                {...register("requiredSkills", {
                  setValueAs: (v) =>
                    typeof v === "string"
                      ? v.split(",").map((s) => s.trim())
                      : v,
                })}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm">Description</label>
              <textarea
                {...register("description")}
                className="w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-400  text-white py-2 rounded"
            >
              {job ? "Update Job" : "Create Job"}
            </button>
          </form>
        </div>
      </div>,
      document.body
    );
  }
);

JobFormModal.displayName = "JobFormModal";

export default JobFormModal;
