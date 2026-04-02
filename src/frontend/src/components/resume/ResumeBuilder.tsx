import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Download,
  FileDown,
  FileText,
  FolderOpen,
  Printer,
  Save,
  Share2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import EditorPanel from "./EditorPanel";
import PreviewPanel from "./PreviewPanel";
import {
  COLOR_THEMES,
  DEFAULT_RESUME_DATA,
  DEFAULT_SETTINGS,
  type ResumeData,
  type ResumeSettings,
  type SavedResume,
} from "./types";

const LS_CURRENT = "resumeBuilder_current";
const LS_SAVES = "resumeBuilder_saves";

function loadFromLocalStorage(): {
  data: ResumeData;
  settings: ResumeSettings;
} | null {
  try {
    const raw = localStorage.getItem(LS_CURRENT);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function loadSaves(): SavedResume[] {
  try {
    const raw = localStorage.getItem(LS_SAVES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function decodeFromURL(): {
  data: ResumeData;
  settings: ResumeSettings;
} | null {
  try {
    const param = new URLSearchParams(window.location.search).get("resume");
    if (param) return JSON.parse(atob(decodeURIComponent(param)));
  } catch {}
  return null;
}

export default function ResumeBuilder() {
  const urlState = decodeFromURL();
  const lsState = !urlState ? loadFromLocalStorage() : null;

  const [resumeData, setResumeData] = useState<ResumeData>(
    urlState?.data ?? lsState?.data ?? DEFAULT_RESUME_DATA,
  );
  const [settings, setSettings] = useState<ResumeSettings>(
    urlState?.settings ?? lsState?.settings ?? DEFAULT_SETTINGS,
  );
  const [saves, setSaves] = useState<SavedResume[]>(loadSaves);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [myResumesOpen, setMyResumesOpen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null!);

  // Auto-save on change
  useEffect(() => {
    const payload = JSON.stringify({ data: resumeData, settings });
    localStorage.setItem(LS_CURRENT, payload);
  }, [resumeData, settings]);

  const theme = COLOR_THEMES[settings.colorTheme] ?? COLOR_THEMES.professional;

  const handleShare = async () => {
    try {
      const encoded = encodeURIComponent(
        btoa(JSON.stringify({ data: resumeData, settings })),
      );
      const url = `${window.location.origin}${window.location.pathname}?resume=${encoded}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const handleExportDOCX = () => {
    const {
      personalInfo: p,
      summary,
      skills,
      experience,
      education,
      projects,
      certifications,
      sections,
    } = resumeData;
    const tc = theme.primary;
    const html = `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${p.name} - Resume</title>
<style>
body{font-family:${settings.font},sans-serif;color:#333;margin:50px;line-height:1.5}
h1{color:${tc};font-size:26px;margin:0 0 4px}
h2{color:${tc};font-size:13px;border-bottom:2px solid ${tc};padding-bottom:4px;margin-top:18px;text-transform:uppercase;letter-spacing:1px}
h3{font-size:13px;margin:8px 0 2px;color:#111}
p,li{font-size:12px;margin:3px 0}ul{margin:4px 0 8px;padding-left:16px}
.sub{color:#666;font-size:13px}.contact{color:#555;font-size:11px;margin-top:4px}
.dates{float:right;color:#888;font-size:11px}
</style></head><body>
<h1>${p.name || "Name"}</h1>
<p class='sub'>${p.jobTitle}</p>
<p class='contact'>${[p.email, p.phone, p.location, p.linkedin].filter(Boolean).join("  |  ")}</p>
${sections.summary && summary ? `<h2>Summary</h2><p>${summary}</p>` : ""}
${sections.skills && skills.length > 0 ? `<h2>Skills</h2><p>${skills.join(", ")}</p>` : ""}
${sections.experience && experience.length > 0 ? `<h2>Experience</h2>${experience.map((e) => `<h3>${e.role}<span class='dates'>${e.startDate} – ${e.endDate}</span></h3><p style='color:#555'>${e.company}</p><ul>${e.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`).join("")}` : ""}
${sections.education && education.length > 0 ? `<h2>Education</h2>${education.map((e) => `<h3>${e.degree}<span class='dates'>${e.startDate} – ${e.endDate}</span></h3><p style='color:#555'>${e.institution}</p>`).join("")}` : ""}
${sections.projects && projects.length > 0 ? `<h2>Projects</h2>${projects.map((pr) => `<h3>${pr.name}${pr.link ? ` <span style='font-weight:normal;color:#888'>— ${pr.link}</span>` : ""}</h3><p>${pr.description}</p>`).join("")}` : ""}
${sections.certifications && certifications.length > 0 ? `<h2>Certifications</h2>${certifications.map((c) => `<h3>${c.name}</h3><p style='color:#555'>${c.issuer} · ${c.date}</p>`).join("")}` : ""}
</body></html>`;
    const blob = new Blob(["\ufeff", html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(p.name || "Resume").replace(/\s+/g, "_")}_Resume.doc`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("DOCX exported!");
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleSave = () => {
    if (!saveName.trim()) return;
    const entry: SavedResume = {
      name: saveName.trim(),
      data: resumeData,
      settings,
      savedAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...saves.filter((s) => s.name !== saveName.trim())];
    setSaves(updated);
    localStorage.setItem(LS_SAVES, JSON.stringify(updated));
    setSaveDialogOpen(false);
    setSaveName("");
    toast.success(`Resume "${entry.name}" saved!`);
  };

  const handleLoad = (saved: SavedResume) => {
    setResumeData(saved.data);
    setSettings(saved.settings);
    setMyResumesOpen(false);
    toast.success(`Loaded "${saved.name}"`);
  };

  const handleDeleteSave = (name: string) => {
    const updated = saves.filter((s) => s.name !== name);
    setSaves(updated);
    localStorage.setItem(LS_SAVES, JSON.stringify(updated));
    toast.success("Resume deleted");
  };

  return (
    <div
      className="flex flex-col h-screen bg-gray-50 select-text"
      style={{ userSelect: "text" }}
    >
      {/* Navbar */}
      <header className="no-print bg-white border-b border-gray-200 px-4 py-2.5 flex items-center gap-3 shadow-sm z-10">
        <div className="flex items-center gap-2 mr-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.primary }}
          >
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm hidden sm:block">
            Resume Builder
          </span>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* My Resumes */}
          <Sheet open={myResumesOpen} onOpenChange={setMyResumesOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs gap-1 h-8"
                data-ocid="toolbar.my_resumes.button"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">My Resumes</span>
                {saves.length > 0 && (
                  <span className="ml-0.5 bg-gray-200 text-gray-700 rounded-full px-1.5 py-0 text-xs">
                    {saves.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80"
              data-ocid="my_resumes.sheet"
            >
              <SheetHeader>
                <SheetTitle>My Resumes</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-2">
                {saves.length === 0 ? (
                  <p
                    className="text-sm text-gray-500 text-center py-8"
                    data-ocid="my_resumes.empty_state"
                  >
                    No saved resumes yet.
                  </p>
                ) : (
                  saves.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div>
                        <p className="text-sm font-semibold">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.savedAt}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLoad(s)}
                          className="h-7 text-xs"
                          data-ocid="my_resumes.load.button"
                        >
                          Load
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteSave(s.name)}
                          className="h-7 w-7 p-0 text-red-400 hover:text-red-600"
                          data-ocid="my_resumes.delete_button"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Save */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1 h-8"
            onClick={() => {
              setSaveName(`${resumeData.personalInfo.name}'s Resume`);
              setSaveDialogOpen(true);
            }}
            data-ocid="toolbar.save.button"
          >
            <Save className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save</span>
          </Button>

          {/* Share */}
          <Button
            size="sm"
            className="text-xs gap-1 h-8 text-white"
            onClick={handleShare}
            style={{ backgroundColor: theme.primary }}
            data-ocid="toolbar.share.button"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          {/* Export PDF */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1 h-8"
            onClick={handleExportPDF}
            data-ocid="toolbar.pdf.button"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </Button>

          {/* Export DOCX */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs gap-1 h-8"
            onClick={handleExportDOCX}
            data-ocid="toolbar.docx.button"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DOCX</span>
          </Button>

          {/* Download icon shortcut */}
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 h-8 sm:hidden"
            onClick={handleExportDOCX}
          >
            <Download className="w-3.5 h-3.5" />
          </Button>
        </div>
      </header>

      {/* Main split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <aside className="no-print w-[380px] shrink-0 overflow-y-auto border-r border-gray-200 bg-gray-50">
          <EditorPanel
            data={resumeData}
            settings={settings}
            onDataChange={setResumeData}
            onSettingsChange={setSettings}
          />
        </aside>

        {/* Preview Panel */}
        <main className="print-full flex-1 overflow-y-auto bg-gray-200 flex justify-center p-8">
          <PreviewPanel
            data={resumeData}
            settings={settings}
            previewRef={previewRef}
          />
        </main>
      </div>

      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="max-w-sm" data-ocid="save_resume.dialog">
          <DialogHeader>
            <DialogTitle>Save Resume</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Label className="text-sm text-gray-600">Resume Name</Label>
            <Input
              className="mt-1"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder="My Tech Resume"
              autoFocus
              data-ocid="save_resume.name.input"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDialogOpen(false)}
              data-ocid="save_resume.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              style={{ backgroundColor: theme.primary }}
              className="text-white"
              data-ocid="save_resume.confirm_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-gray-100 py-2 px-4 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
