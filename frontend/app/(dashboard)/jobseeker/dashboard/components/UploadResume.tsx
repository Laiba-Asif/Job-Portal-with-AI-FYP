"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Loader, Upload } from "lucide-react";
import { use, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ParseResume } from "@/app/api/jobseeker/api";
import { useRouter } from "next/navigation";
import { useJobSeeker } from "@/context/jobseekerContext";


// API call to upload file


export default function UploadResume() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const { user, resume, isLoading ,refetchResume } = useJobSeeker()
  


  const { mutate, isPending } = useMutation({
    mutationFn: ParseResume,
   
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validation: only pdf/docx, max 5MB
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(selectedFile.type)
    ) {
      alert("Only PDF or DOC/DOCX files allowed.");
      return;
    }
    if (selectedFile.size > 7 * 1024 * 1024) {
      alert("File size must be under 7MB.");
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    mutate(file,{
       onSuccess: async() => {
         setFile(null);
         setOpen(false);
         await refetchResume(); 
         router.push("/jobseeker/profile");

    },
    onError: () => {
      alert("Upload failed! please try again.");
    },
    });
  };

  return (
    <>
      {/* Upload Resume Action */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-lg border cursor-pointer transition-all"
      >
        <div className="flex items-center space-x-3">
          <Upload className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-green-700">{user?.resumeParsed?"Update Your Resume":"Upload Your Resume"}</p>
            <p className="text-sm text-green-600">Get AI-powered ATS analysis</p>
          </div>
        </div>
        <Button
          size="sm"
          className="w-24 bg-green-600 hover:bg-green-700 text-white"
          onClick={() => {setOpen(true); setFile(null)}}
        >
          {user?.resumeParsed?"Update ":"Upload "}
        </Button>
      </motion.div>

      {/* Upload Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border border-indigo-100">
          <DialogHeader className="space-y-2 text-center">
            <DialogTitle className="text-2xl font-semibold text-indigo-700">
              Upload Your Resume
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Please upload your resume in{" "}
              <span className="font-semibold text-blue-600">PDF</span> or{" "}
              <span className="font-semibold text-cyan-600">DOC/DOCX</span> format. <br />
              <span className="text-gray-600">Maximum size: 5MB</span>
            </DialogDescription>
          </DialogHeader>

          {/* File Input */}
          <div className="flex flex-col items-center gap-4 py-4">
            <label className="flex flex-col items-center px-6 py-5 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer bg-gradient-to-br from-blue-50 via-white to-indigo-50 hover:from-indigo-50 hover:to-blue-50 transition-all w-full text-center">
              <Upload className="w-6 h-6 text-indigo-500 mb-2" />
              <span className="text-sm text-indigo-600 font-medium">
                Click to choose file
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <p className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                Selected: <span className="font-medium">{file.name}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <DialogFooter className="flex justify-between gap-2 sm:gap-4">
            <Button
              variant="outline"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              onClick={() => {  setFile(null); setOpen(false);}}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || isPending}
              className="bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 hover:opacity-90 text-white shadow-md"
            >
              {isPending && <Loader className="animate-spin " />}
              Upload
              
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
