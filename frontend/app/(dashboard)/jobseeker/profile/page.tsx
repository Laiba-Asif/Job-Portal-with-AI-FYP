"use client";

import { useJobSeeker } from "@/context/jobseekerContext";
import {
  GraduationCap,
  Award,
  Briefcase,
  Wrench,
  Tags,
  FolderKanban,
  Upload,
  Mail,
  Phone,
  Linkedin,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JobSeekerProfile() {
  const { resume, isLoading } = useJobSeeker();
  const parsedResume = resume?.parsed?.data;
  console.log("parsedResume ,   ", parsedResume);

  if (isLoading) {
    return <p className="text-center text-gray-500 py-10">Loading...</p>;
  }

  if (!resume) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <Upload className="h-12 w-12 text-gray-400" />
        <p className="text-lg font-medium text-gray-600">No Resume Found</p>
        <Button>Upload Resume</Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      {/* ===== Hero Profile Header ===== */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-3xl shadow-lg p-10 text-white flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white/20 rounded-full p-4">
          <User className="w-16 h-16" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            {parsedResume?.personal_info?.name ?? "Unnamed User"}
          </h1>
          <p className="text-lg font-medium">
            {parsedResume?.job_title ?? "Job Title not provided"}
          </p>
          <p className="text-sm opacity-90">
            {parsedResume?.seniority ?? "N/A"} •{" "}
            {parsedResume?.years_of_experience ?? 0} years experience
          </p>
          <div className="flex gap-6 mt-3 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4" />{" "}
              {parsedResume?.personal_info?.emails?.[0] ?? "No email"}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />{" "}
              {parsedResume?.personal_info?.phones?.[0] ?? "No phone"}
            </span>
            {parsedResume?.links?.linkedin?.[0] && (
              <a
                href={parsedResume.links.linkedin[0]}
                target="_blank"
                className="flex items-center gap-2 hover:underline"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ===== Grid Layout for Sections ===== */}
      <div className="grid md:grid-cols-2 gap-8">
        <Section title="Education" icon={<GraduationCap />}>
          {parsedResume?.education?.length ? (
            <ul className="space-y-2">
              {parsedResume.education.map((edu: string, i: number) => (
                <li key={i} className="bg-gray-50 p-3 rounded-xl shadow-sm">
                  {edu}
                </li>
              ))}
            </ul>
          ) : (
            <Empty text="No education details provided" />
          )}
        </Section>

        <Section title="Certifications" icon={<Award />}>
          {parsedResume?.certifications?.length ? (
            <ul className="space-y-2">
              {parsedResume.certifications.map((cert: string, i: number) => (
                <li key={i} className="bg-gray-50 p-3 rounded-xl shadow-sm">
                  {cert}
                </li>
              ))}
            </ul>
          ) : (
            <Empty text="No certifications provided" />
          )}
        </Section>

        <Section title="Skills" icon={<Wrench />}>
          {parsedResume?.skills?.length ? (
            <div className="flex flex-wrap gap-2">
              {parsedResume.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium shadow-sm hover:bg-indigo-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <Empty text="No skills provided" />
          )}
        </Section>

        <Section title="Keywords" icon={<Tags />}>
          {parsedResume?.keywords?.length ? (
            <div className="flex flex-wrap gap-2">
              {parsedResume.keywords.map((kw: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-gray-700 rounded-lg text-sm font-medium shadow-sm hover:from-purple-200 hover:to-pink-200"
                >
                  {kw}
                </span>
              ))}
            </div>
          ) : (
            <Empty text="No keywords provided" />
          )}
        </Section>
      </div>

      {/* ===== Full Width Sections ===== */}
      <Section title="Experience" icon={<Briefcase />}>
        {parsedResume?.experience?.length ? (
          <div className="space-y-4">
            {parsedResume.experience.map((exp: any, i: number) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl border shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-indigo-700">
                  {exp.role ?? "Unknown role"}
                </h3>
                <p className="text-sm text-gray-500">
                  {exp.company ?? "Unknown company"} •{" "}
                  {exp.start_date ?? "?"} - {exp.end_date ?? "?"}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  {exp.description ?? "No description"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <Empty text="No experience details provided" />
        )}
      </Section>

      <Section title="Projects" icon={<FolderKanban />}>
        {parsedResume?.projects?.length ? (
          <div className="grid md:grid-cols-2 gap-6">
            {parsedResume.projects.map((proj: any, i: number) => (
              <div
                key={i}
                className="rounded-xl bg-white border shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-4">
                  <h4 className="font-semibold text-indigo-700">
                    {proj.title}
                  </h4>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
                {proj.image && (
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                {proj.video && (
                  <div className="aspect-video">
                    <iframe
                      src={proj.video}
                      title={proj.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Empty text="No projects provided" />
        )}
      </Section>
    </div>
  );
}

/* ===== Reusable Components ===== */
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 rounded-2xl shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-indigo-600">{icon}</span>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </Card>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="text-gray-400 italic">{text}</p>;
}
