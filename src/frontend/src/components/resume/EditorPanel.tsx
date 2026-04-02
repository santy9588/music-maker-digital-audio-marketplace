import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import {
  COLOR_THEMES,
  type CertEntry,
  type EducationEntry,
  type ExperienceEntry,
  FONT_OPTIONS,
  type ProjectEntry,
  type ResumeData,
  type ResumeSettings,
  SUGGESTIONS,
  TEMPLATES,
} from "./types";

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  onDataChange: (data: ResumeData) => void;
  onSettingsChange: (settings: ResumeSettings) => void;
}

function SectionHeader({
  title,
  checked,
  onToggle,
}: {
  title: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500">Show</span>
        <Checkbox
          checked={checked}
          onCheckedChange={onToggle}
          data-ocid={`section.${title.toLowerCase()}.toggle`}
        />
      </div>
    </div>
  );
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

export default function EditorPanel({
  data,
  settings,
  onDataChange,
  onSettingsChange,
}: Props) {
  const photoRef = useRef<HTMLInputElement>(null);

  const updatePersonal = (key: string, value: string) =>
    onDataChange({
      ...data,
      personalInfo: { ...data.personalInfo, [key]: value },
    });

  const updateSection = (key: keyof typeof data.sections) =>
    onDataChange({
      ...data,
      sections: { ...data.sections, [key]: !data.sections[key] },
    });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updatePersonal("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  // Experience
  const addExperience = () =>
    onDataChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: uid(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          bullets: [""],
        },
      ],
    });
  const removeExperience = (id: string) =>
    onDataChange({
      ...data,
      experience: data.experience.filter((e) => e.id !== id),
    });
  const updateExperience = (
    id: string,
    field: keyof ExperienceEntry,
    value: string | string[],
  ) =>
    onDataChange({
      ...data,
      experience: data.experience.map((e) =>
        e.id === id ? { ...e, [field]: value } : e,
      ),
    });
  const updateBullet = (expId: string, idx: number, val: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    const bullets = [...exp.bullets];
    bullets[idx] = val;
    updateExperience(expId, "bullets", bullets);
  };
  const addBullet = (expId: string) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, "bullets", [...exp.bullets, ""]);
  };
  const removeBullet = (expId: string, idx: number) => {
    const exp = data.experience.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(
      expId,
      "bullets",
      exp.bullets.filter((_, i) => i !== idx),
    );
  };

  // Education
  const addEducation = () =>
    onDataChange({
      ...data,
      education: [
        ...data.education,
        { id: uid(), institution: "", degree: "", startDate: "", endDate: "" },
      ],
    });
  const removeEducation = (id: string) =>
    onDataChange({
      ...data,
      education: data.education.filter((e) => e.id !== id),
    });
  const updateEducation = (
    id: string,
    field: keyof EducationEntry,
    value: string,
  ) =>
    onDataChange({
      ...data,
      education: data.education.map((e) =>
        e.id === id ? { ...e, [field]: value } : e,
      ),
    });

  // Projects
  const addProject = () =>
    onDataChange({
      ...data,
      projects: [
        ...data.projects,
        { id: uid(), name: "", description: "", link: "" },
      ],
    });
  const removeProject = (id: string) =>
    onDataChange({
      ...data,
      projects: data.projects.filter((p) => p.id !== id),
    });
  const updateProject = (
    id: string,
    field: keyof ProjectEntry,
    value: string,
  ) =>
    onDataChange({
      ...data,
      projects: data.projects.map((p) =>
        p.id === id ? { ...p, [field]: value } : p,
      ),
    });

  // Certifications
  const addCert = () =>
    onDataChange({
      ...data,
      certifications: [
        ...data.certifications,
        { id: uid(), name: "", issuer: "", date: "" },
      ],
    });
  const removeCert = (id: string) =>
    onDataChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  const updateCert = (id: string, field: keyof CertEntry, value: string) =>
    onDataChange({
      ...data,
      certifications: data.certifications.map((c) =>
        c.id === id ? { ...c, [field]: value } : c,
      ),
    });

  const theme = COLOR_THEMES[settings.colorTheme] ?? COLOR_THEMES.professional;

  return (
    <div className="space-y-5 p-4 pb-10 select-text">
      {/* Design Controls */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <h3 className="text-sm font-semibold text-gray-800">Design</h3>
        <div>
          <Label className="text-xs text-gray-500 mb-1.5 block">Template</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() =>
                  onSettingsChange({ ...settings, template: t.id })
                }
                data-ocid={`template.${t.id}.button`}
                className={`text-xs px-2 py-1.5 rounded-lg border text-left transition-all ${
                  settings.template === t.id
                    ? "border-2 font-semibold"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                style={
                  settings.template === t.id
                    ? {
                        borderColor: theme.accent,
                        color: theme.primary,
                        backgroundColor: theme.light,
                      }
                    : {}
                }
              >
                <span className="block">{t.label}</span>
                <span className="text-gray-400">{t.category}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label className="text-xs text-gray-500 mb-1.5 block">
            Color Theme
          </Label>
          <div className="flex gap-2">
            {Object.entries(COLOR_THEMES).map(([key, val]) => (
              <button
                type="button"
                key={key}
                onClick={() =>
                  onSettingsChange({ ...settings, colorTheme: key })
                }
                data-ocid={`theme.${key}.button`}
                title={val.label}
                className={`w-8 h-8 rounded-full transition-all ${settings.colorTheme === key ? "ring-2 ring-offset-2 scale-110" : "opacity-70 hover:opacity-100"}`}
                style={{ backgroundColor: val.primary }}
              />
            ))}
          </div>
        </div>
        <div>
          <Label className="text-xs text-gray-500 mb-1.5 block">Font</Label>
          <div className="flex flex-wrap gap-1.5">
            {FONT_OPTIONS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => onSettingsChange({ ...settings, font: f })}
                data-ocid={`font.${f.toLowerCase().replace(" ", "-")}.button`}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${settings.font === f ? "text-white font-semibold" : "border-gray-200 bg-white hover:border-gray-300"}`}
                style={{
                  fontFamily: `'${f}', serif`,
                  ...(settings.font === f
                    ? {
                        backgroundColor: theme.primary,
                        borderColor: theme.primary,
                      }
                    : {}),
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          Personal Info
        </h3>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Full Name</Label>
              <Input
                value={data.personalInfo.name}
                onChange={(e) => updatePersonal("name", e.target.value)}
                placeholder="Your Name"
                className="h-8 text-xs mt-1"
                data-ocid="personal.name.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Job Title</Label>
              <Input
                value={data.personalInfo.jobTitle}
                onChange={(e) => updatePersonal("jobTitle", e.target.value)}
                placeholder="Software Engineer"
                className="h-8 text-xs mt-1"
                data-ocid="personal.job_title.input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Email</Label>
              <Input
                value={data.personalInfo.email}
                onChange={(e) => updatePersonal("email", e.target.value)}
                placeholder="email@example.com"
                className="h-8 text-xs mt-1"
                data-ocid="personal.email.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Phone</Label>
              <Input
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonal("phone", e.target.value)}
                placeholder="+1 555 000 0000"
                className="h-8 text-xs mt-1"
                data-ocid="personal.phone.input"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Location</Label>
              <Input
                value={data.personalInfo.location}
                onChange={(e) => updatePersonal("location", e.target.value)}
                placeholder="City, State"
                className="h-8 text-xs mt-1"
                data-ocid="personal.location.input"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">LinkedIn</Label>
              <Input
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                placeholder="linkedin.com/in/you"
                className="h-8 text-xs mt-1"
                data-ocid="personal.linkedin.input"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-500">Website</Label>
            <Input
              value={data.personalInfo.website}
              onChange={(e) => updatePersonal("website", e.target.value)}
              placeholder="yourwebsite.com"
              className="h-8 text-xs mt-1"
              data-ocid="personal.website.input"
            />
          </div>
          <div>
            <Label className="text-xs text-gray-500">Profile Photo</Label>
            <div className="flex items-center gap-2 mt-1">
              {data.personalInfo.photo && (
                <img
                  src={data.personalInfo.photo}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border"
                />
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => photoRef.current?.click()}
                className="text-xs h-8"
                data-ocid="personal.photo.upload_button"
              >
                {data.personalInfo.photo ? "Change Photo" : "Upload Photo"}
              </Button>
              {data.personalInfo.photo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => updatePersonal("photo", "")}
                  className="text-xs h-8 text-red-500"
                >
                  Remove
                </Button>
              )}
            </div>
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Summary"
          checked={data.sections.summary}
          onToggle={() => updateSection("summary")}
        />
        <div className="flex items-center gap-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 gap-1"
                data-ocid="summary.suggestions.button"
              >
                Suggestions <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80">
              {SUGGESTIONS.summary.map((s, i) => (
                <DropdownMenuItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  onClick={() => onDataChange({ ...data, summary: s })}
                  className="text-xs whitespace-normal py-2"
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Textarea
          value={data.summary}
          onChange={(e) => onDataChange({ ...data, summary: e.target.value })}
          placeholder="Write a compelling professional summary..."
          className="text-xs min-h-[80px] resize-y"
          data-ocid="summary.textarea"
        />
      </div>

      {/* Skills */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Skills"
          checked={data.sections.skills}
          onToggle={() => updateSection("skills")}
        />
        <div className="flex items-center gap-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 gap-1"
                data-ocid="skills.suggestions.button"
              >
                Suggestions <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72">
              {SUGGESTIONS.skills.map((s, i) => (
                <DropdownMenuItem
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  onClick={() =>
                    onDataChange({
                      ...data,
                      skills: s.split(", ").map((x) => x.trim()),
                    })
                  }
                  className="text-xs whitespace-normal py-2"
                >
                  {s}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Input
          value={data.skills.join(", ")}
          onChange={(e) =>
            onDataChange({
              ...data,
              skills: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          placeholder="TypeScript, React, Node.js..."
          className="text-xs h-8"
          data-ocid="skills.input"
        />
        <p className="text-xs text-gray-400 mt-1">Comma-separated</p>
      </div>

      {/* Experience */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Experience"
          checked={data.sections.experience}
          onToggle={() => updateSection("experience")}
        />
        <div className="space-y-4">
          {data.experience.map((exp, expIdx) => (
            <div
              key={exp.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
              data-ocid={`experience.item.${expIdx + 1}`}
            >
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-600">
                  Entry {expIdx + 1}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(exp.id)}
                  className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                  data-ocid={`experience.delete_button.${expIdx + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                    placeholder="Company Name"
                    className="h-7 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Role</Label>
                  <Input
                    value={exp.role}
                    onChange={(e) =>
                      updateExperience(exp.id, "role", e.target.value)
                    }
                    placeholder="Job Title"
                    className="h-7 text-xs mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">Start</Label>
                  <Input
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                    placeholder="Jan 2020"
                    className="h-7 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">End</Label>
                  <Input
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    placeholder="Present"
                    className="h-7 text-xs mt-1"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label className="text-xs text-gray-500">Bullet Points</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 gap-1"
                        data-ocid={`experience.suggestions.button.${expIdx + 1}`}
                      >
                        + Suggestion <ChevronDown className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72">
                      {SUGGESTIONS.experience.map((s, i) => (
                        <DropdownMenuItem
                          // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                          key={i}
                          onClick={() =>
                            updateExperience(exp.id, "bullets", [
                              ...exp.bullets,
                              s,
                            ])
                          }
                          className="text-xs whitespace-normal py-2"
                        >
                          {s}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {exp.bullets.map((b, bIdx) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  <div key={bIdx} className="flex gap-1 mb-1">
                    <Input
                      value={b}
                      onChange={(e) =>
                        updateBullet(exp.id, bIdx, e.target.value)
                      }
                      placeholder="Achievement or responsibility..."
                      className="h-7 text-xs"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeBullet(exp.id, bIdx)}
                      className="h-7 w-7 p-0 text-red-400 shrink-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addBullet(exp.id)}
                  className="text-xs h-7 gap-1 text-gray-500"
                >
                  <Plus className="w-3 h-3" /> Add bullet
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addExperience}
            className="w-full text-xs gap-1"
            data-ocid="experience.add_button"
          >
            <Plus className="w-3 h-3" /> Add Experience
          </Button>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Education"
          checked={data.sections.education}
          onToggle={() => updateSection("education")}
        />
        <div className="space-y-3">
          {data.education.map((edu, eduIdx) => (
            <div
              key={edu.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
              data-ocid={`education.item.${eduIdx + 1}`}
            >
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-gray-600">
                  Entry {eduIdx + 1}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                  className="h-6 w-6 p-0 text-red-400"
                  data-ocid={`education.delete_button.${eduIdx + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(edu.id, "institution", e.target.value)
                  }
                  placeholder="University Name"
                  className="h-7 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, "degree", e.target.value)
                  }
                  placeholder="B.S. Computer Science"
                  className="h-7 text-xs mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">Start</Label>
                  <Input
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "startDate", e.target.value)
                    }
                    placeholder="2018"
                    className="h-7 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">End</Label>
                  <Input
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "endDate", e.target.value)
                    }
                    placeholder="2022"
                    className="h-7 text-xs mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addEducation}
            className="w-full text-xs gap-1"
            data-ocid="education.add_button"
          >
            <Plus className="w-3 h-3" /> Add Education
          </Button>
        </div>
      </div>

      {/* Projects */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Projects"
          checked={data.sections.projects}
          onToggle={() => updateSection("projects")}
        />
        <div className="space-y-3">
          {data.projects.map((proj, projIdx) => (
            <div
              key={proj.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
              data-ocid={`projects.item.${projIdx + 1}`}
            >
              <div className="flex justify-between">
                <p className="text-xs font-semibold text-gray-600">
                  Project {projIdx + 1}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(proj.id)}
                  className="h-6 w-6 p-0 text-red-400"
                  data-ocid={`projects.delete_button.${projIdx + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Project Name</Label>
                <Input
                  value={proj.name}
                  onChange={(e) =>
                    updateProject(proj.id, "name", e.target.value)
                  }
                  placeholder="Project Name"
                  className="h-7 text-xs mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Description</Label>
                <Textarea
                  value={proj.description}
                  onChange={(e) =>
                    updateProject(proj.id, "description", e.target.value)
                  }
                  placeholder="What did this project do?"
                  className="text-xs min-h-[56px] mt-1"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Link</Label>
                <Input
                  value={proj.link}
                  onChange={(e) =>
                    updateProject(proj.id, "link", e.target.value)
                  }
                  placeholder="github.com/user/project"
                  className="h-7 text-xs mt-1"
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addProject}
            className="w-full text-xs gap-1"
            data-ocid="projects.add_button"
          >
            <Plus className="w-3 h-3" /> Add Project
          </Button>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
        <SectionHeader
          title="Certifications"
          checked={data.sections.certifications}
          onToggle={() => updateSection("certifications")}
        />
        <div className="space-y-3">
          {data.certifications.map((cert, certIdx) => (
            <div
              key={cert.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
              data-ocid={`certifications.item.${certIdx + 1}`}
            >
              <div className="flex justify-between">
                <p className="text-xs font-semibold text-gray-600">
                  Cert {certIdx + 1}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCert(cert.id)}
                  className="h-6 w-6 p-0 text-red-400"
                  data-ocid={`certifications.delete_button.${certIdx + 1}`}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Name</Label>
                <Input
                  value={cert.name}
                  onChange={(e) => updateCert(cert.id, "name", e.target.value)}
                  placeholder="AWS Solutions Architect"
                  className="h-7 text-xs mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-gray-500">Issuer</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) =>
                      updateCert(cert.id, "issuer", e.target.value)
                    }
                    placeholder="Amazon"
                    className="h-7 text-xs mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Date</Label>
                  <Input
                    value={cert.date}
                    onChange={(e) =>
                      updateCert(cert.id, "date", e.target.value)
                    }
                    placeholder="Mar 2023"
                    className="h-7 text-xs mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addCert}
            className="w-full text-xs gap-1"
            data-ocid="certifications.add_button"
          >
            <Plus className="w-3 h-3" /> Add Certification
          </Button>
        </div>
      </div>
    </div>
  );
}
