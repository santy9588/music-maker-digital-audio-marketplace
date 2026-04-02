import { Toaster } from "@/components/ui/sonner";
import ResumeBuilder from "./components/resume/ResumeBuilder";

export default function App() {
  return (
    <>
      <ResumeBuilder />
      <Toaster richColors position="top-right" />
    </>
  );
}
