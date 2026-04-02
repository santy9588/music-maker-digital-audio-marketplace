import { COLOR_THEMES, type ResumeData, type ResumeSettings } from "./types";

interface Props {
  data: ResumeData;
  settings: ResumeSettings;
  previewRef: React.RefObject<HTMLDivElement>;
}

function ContactRow({ icon, value }: { icon: string; value: string }) {
  if (!value) return null;
  return (
    <span className="flex items-center gap-1 text-xs">
      <span>{icon}</span>
      <span>{value}</span>
    </span>
  );
}

export default function PreviewPanel({ data, settings, previewRef }: Props) {
  const theme = COLOR_THEMES[settings.colorTheme] ?? COLOR_THEMES.professional;
  const {
    personalInfo: p,
    summary,
    skills,
    experience,
    education,
    projects,
    certifications,
    sections,
  } = data;
  const fontStyle = { fontFamily: `'${settings.font}', serif` };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    if (settings.template === "minimal-clean") {
      return (
        <div className="mt-5 mb-2">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: theme.primary }}
          >
            {children}
          </p>
          <div
            className="h-px mt-1"
            style={{ backgroundColor: theme.accent }}
          />
        </div>
      );
    }
    if (settings.template === "creative-pro") {
      return (
        <div
          className="mt-5 mb-2 pl-2"
          style={{ borderLeft: `3px solid ${theme.accent}` }}
        >
          <p
            className="text-sm font-bold uppercase"
            style={{ color: theme.primary }}
          >
            {children}
          </p>
        </div>
      );
    }
    return (
      <div className="mt-5 mb-2">
        <p className="text-sm font-bold" style={{ color: theme.primary }}>
          {children}
        </p>
        <div className="h-0.5 mt-1" style={{ backgroundColor: theme.accent }} />
      </div>
    );
  };

  const renderModernTech = () => (
    <div className="flex min-h-full" style={fontStyle}>
      {/* Sidebar */}
      <div
        className="w-[32%] shrink-0 p-5"
        style={{ backgroundColor: theme.light }}
      >
        {p.photo && (
          <div className="mb-4 flex justify-center">
            <img
              src={p.photo}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: theme.accent }}
            />
          </div>
        )}
        <div className="mb-4">
          <p
            className="text-xs font-bold uppercase tracking-wider mb-2"
            style={{ color: theme.primary }}
          >
            Contact
          </p>
          <div className="flex flex-col gap-1.5">
            <ContactRow icon="✉" value={p.email} />
            <ContactRow icon="📱" value={p.phone} />
            <ContactRow icon="📍" value={p.location} />
            <ContactRow icon="🔗" value={p.linkedin} />
            <ContactRow icon="🌐" value={p.website} />
          </div>
        </div>
        {sections.skills && skills.length > 0 && (
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: theme.primary }}
            >
              Skills
            </p>
            <div className="flex flex-wrap gap-1">
              {skills.map((s, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  className="text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: theme.accent }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {sections.certifications && certifications.length > 0 && (
          <div className="mt-4">
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: theme.primary }}
            >
              Certifications
            </p>
            {certifications.map((c) => (
              <div key={c.id} className="mb-2">
                <p className="text-xs font-semibold">{c.name}</p>
                <p className="text-xs text-gray-500">
                  {c.issuer} · {c.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div className="flex-1 p-5">
        <div className="mb-4">
          <h1
            className="text-2xl font-bold leading-tight"
            style={{ color: theme.primary }}
          >
            {p.name || "Your Name"}
          </h1>
          <p
            className="text-sm font-medium mt-0.5"
            style={{ color: theme.accent }}
          >
            {p.jobTitle}
          </p>
        </div>
        {sections.summary && summary && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </>
        )}
        {sections.experience && experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold">{exp.role}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <p
                  className="text-xs font-medium"
                  style={{ color: theme.accent }}
                >
                  {exp.company}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                      key={i}
                      className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {sections.education && education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-500">
                    {edu.startDate} – {edu.endDate}
                  </p>
                </div>
                <p className="text-xs text-gray-600">{edu.institution}</p>
              </div>
            ))}
          </>
        )}
        {sections.projects && projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <p className="text-sm font-semibold">{proj.name}</p>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.link && (
                  <p className="text-xs" style={{ color: theme.accent }}>
                    {proj.link}
                  </p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderSoftwarePro = () => (
    <div style={fontStyle}>
      <div
        className="p-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
        }}
      >
        {p.photo && (
          <img
            src={p.photo}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-white mb-3"
          />
        )}
        <h1 className="text-2xl font-bold">{p.name || "Your Name"}</h1>
        <p className="text-sm opacity-90 mt-0.5">{p.jobTitle}</p>
        <div className="flex flex-wrap gap-3 mt-3">
          <ContactRow icon="✉" value={p.email} />
          <ContactRow icon="📱" value={p.phone} />
          <ContactRow icon="📍" value={p.location} />
          <ContactRow icon="🔗" value={p.linkedin} />
        </div>
      </div>
      <div className="p-5">
        {sections.summary && summary && (
          <>
            <SectionTitle>Summary</SectionTitle>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </>
        )}
        {sections.skills && skills.length > 0 && (
          <>
            <SectionTitle>Technical Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  className="text-xs px-2.5 py-1 rounded border font-medium"
                  style={{ borderColor: theme.accent, color: theme.primary }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {sections.experience && experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="mb-4 relative pl-4"
                style={{
                  borderLeft:
                    idx === 0
                      ? `2px solid ${theme.accent}`
                      : "2px solid #e5e7eb",
                }}
              >
                <div
                  className="absolute -left-1.5 top-0.5 w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: idx === 0 ? theme.accent : "#d1d5db",
                  }}
                />
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{exp.role}</p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: theme.accent }}
                >
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                      key={i}
                      className="text-xs text-gray-700 pl-3 relative before:content-['▸'] before:absolute before:left-0"
                      style={
                        {
                          "--tw-before-color": theme.accent,
                        } as React.CSSProperties
                      }
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {sections.education && education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <p className="text-sm font-semibold">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </>
        )}
        {sections.projects && projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <p className="text-sm font-semibold">
                  {proj.name}{" "}
                  {proj.link && (
                    <span
                      className="text-xs font-normal"
                      style={{ color: theme.accent }}
                    >
                      — {proj.link}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-700">{proj.description}</p>
              </div>
            ))}
          </>
        )}
        {sections.certifications && certifications.length > 0 && (
          <>
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map((c) => (
              <div key={c.id} className="mb-1 flex justify-between">
                <div>
                  <p className="text-xs font-semibold">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.issuer}</p>
                </div>
                <p className="text-xs text-gray-500">{c.date}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderDataAnalyst = () => (
    <div style={fontStyle}>
      <div className="p-5 border-b-4" style={{ borderColor: theme.accent }}>
        <div className="flex items-start justify-between">
          <div>
            {p.photo && (
              <img
                src={p.photo}
                alt="Profile"
                className="w-14 h-14 rounded object-cover mb-2"
              />
            )}
            <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>
              {p.name || "Your Name"}
            </h1>
            <p
              className="text-sm font-medium mt-0.5"
              style={{ color: theme.accent }}
            >
              {p.jobTitle}
            </p>
          </div>
          <div className="text-right flex flex-col gap-1">
            <ContactRow icon="✉" value={p.email} />
            <ContactRow icon="📱" value={p.phone} />
            <ContactRow icon="📍" value={p.location} />
            <ContactRow icon="🌐" value={p.website} />
          </div>
        </div>
      </div>
      <div className="p-5">
        {sections.summary && summary && (
          <>
            <SectionTitle>Profile</SectionTitle>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </>
        )}
        {sections.skills && skills.length > 0 && (
          <>
            <SectionTitle>Core Competencies</SectionTitle>
            <div className="grid grid-cols-2 gap-1">
              {skills.map((s, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span className="text-xs font-medium">{s}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {sections.experience && experience.length > 0 && (
          <>
            <SectionTitle>Work Experience</SectionTitle>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold">{exp.role}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-semibold mb-1 text-gray-600">
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                      key={i}
                      className="text-xs text-gray-700 pl-3 relative before:content-['→'] before:absolute before:left-0"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            {sections.education && education.length > 0 && (
              <>
                <SectionTitle>Education</SectionTitle>
                {education.map((edu) => (
                  <div key={edu.id} className="mb-2">
                    <p className="text-xs font-bold">{edu.degree}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
          <div>
            {sections.certifications && certifications.length > 0 && (
              <>
                <SectionTitle>Certifications</SectionTitle>
                {certifications.map((c) => (
                  <div key={c.id} className="mb-2">
                    <p className="text-xs font-bold">{c.name}</p>
                    <p className="text-xs text-gray-500">
                      {c.issuer} · {c.date}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {sections.projects && projects.length > 0 && (
          <>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((proj) => (
              <div key={proj.id} className="mb-2">
                <p className="text-sm font-semibold">{proj.name}</p>
                <p className="text-xs text-gray-700">{proj.description}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderExecutive = () => (
    <div style={fontStyle}>
      <div
        className="p-6 text-center border-b-2"
        style={{ borderColor: theme.primary }}
      >
        {p.photo && (
          <img
            src={p.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2"
            style={{ borderColor: theme.primary }}
          />
        )}
        <h1
          className="text-3xl font-bold tracking-wide"
          style={{ color: theme.primary }}
        >
          {p.name || "Your Name"}
        </h1>
        <p
          className="text-sm uppercase tracking-widest mt-1 font-medium"
          style={{ color: theme.accent }}
        >
          {p.jobTitle}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-3">
          <ContactRow icon="✉" value={p.email} />
          <ContactRow icon="📱" value={p.phone} />
          <ContactRow icon="📍" value={p.location} />
          <ContactRow icon="🔗" value={p.linkedin} />
        </div>
      </div>
      <div className="p-5">
        {sections.summary && summary && (
          <>
            <SectionTitle>Executive Summary</SectionTitle>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              {summary}
            </p>
          </>
        )}
        {sections.skills && skills.length > 0 && (
          <>
            <SectionTitle>Areas of Expertise</SectionTitle>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {skills.map((s, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  className="text-xs text-gray-700 before:content-['◆'] before:mr-1.5"
                  style={
                    { "--tw-before-color": theme.accent } as React.CSSProperties
                  }
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {sections.experience && experience.length > 0 && (
          <>
            <SectionTitle>Professional Experience</SectionTitle>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline border-b border-gray-200 pb-1 mb-1">
                  <p className="text-sm font-bold uppercase tracking-wide">
                    {exp.role}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: theme.primary }}
                >
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                      key={i}
                      className="text-xs text-gray-700 pl-3 relative before:content-['•'] before:absolute before:left-0"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {sections.education && education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2 flex justify-between">
                <div>
                  <p className="text-sm font-bold">{edu.degree}</p>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <p className="text-xs text-gray-500 italic">
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </>
        )}
        {sections.certifications && certifications.length > 0 && (
          <>
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map((c) => (
              <p key={c.id} className="text-xs text-gray-700 mb-1">
                <span className="font-semibold">{c.name}</span> — {c.issuer},{" "}
                {c.date}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderCreativePro = () => (
    <div style={fontStyle}>
      <div
        className="p-6 text-white"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex items-center gap-4">
          {p.photo && (
            <img
              src={p.photo}
              alt="Profile"
              className="w-20 h-20 rounded-xl object-cover border-2 border-white/30 shrink-0"
            />
          )}
          <div>
            <h1 className="text-3xl font-black">{p.name || "Your Name"}</h1>
            <p className="text-sm mt-1 opacity-80">{p.jobTitle}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-white/70">
              <ContactRow icon="✉" value={p.email} />
              <ContactRow icon="📱" value={p.phone} />
              <ContactRow icon="🌐" value={p.website} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        {sections.summary && summary && (
          <>
            <SectionTitle>About Me</SectionTitle>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </>
        )}
        {sections.skills && skills.length > 0 && (
          <>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                  key={i}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ backgroundColor: theme.light, color: theme.primary }}
                >
                  {s}
                </span>
              ))}
            </div>
          </>
        )}
        {sections.experience && experience.length > 0 && (
          <>
            <SectionTitle>Experience</SectionTitle>
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-3 p-3 rounded-lg"
                style={{ backgroundColor: theme.light }}
              >
                <div className="flex justify-between items-baseline">
                  <p
                    className="text-sm font-bold"
                    style={{ color: theme.primary }}
                  >
                    {exp.role}
                  </p>
                  <p className="text-xs text-gray-500">
                    {exp.startDate} – {exp.endDate}
                  </p>
                </div>
                <p className="text-xs font-semibold text-gray-600 mb-1">
                  {exp.company}
                </p>
                <ul className="space-y-0.5">
                  {exp.bullets.map((b, i) => (
                    <li
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                      key={i}
                      className="text-xs text-gray-700 pl-3 relative before:content-['★'] before:absolute before:left-0 before:text-xs"
                      style={{ color: theme.primary }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {sections.education && education.length > 0 && (
          <>
            <SectionTitle>Education</SectionTitle>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-gray-600">
                  {edu.institution} · {edu.startDate}–{edu.endDate}
                </p>
              </div>
            ))}
          </>
        )}
        {sections.projects && projects.length > 0 && (
          <>
            <SectionTitle>Portfolio</SectionTitle>
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="mb-2 p-2.5 rounded-lg border"
                style={{ borderColor: `${theme.accent}40` }}
              >
                <p
                  className="text-sm font-semibold"
                  style={{ color: theme.primary }}
                >
                  {proj.name}
                </p>
                <p className="text-xs text-gray-700">{proj.description}</p>
                {proj.link && (
                  <p className="text-xs mt-0.5" style={{ color: theme.accent }}>
                    {proj.link}
                  </p>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  const renderMinimalClean = () => (
    <div
      className="p-8"
      style={{
        ...fontStyle,
        fontFamily:
          settings.font === "Inter"
            ? "Georgia, serif"
            : `'${settings.font}', serif`,
      }}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {p.name || "Your Name"}
        </h1>
        <p className="text-base text-gray-500 mt-1">{p.jobTitle}</p>
        <div className="flex flex-wrap gap-3 mt-2 text-gray-400">
          <ContactRow icon="" value={p.email} />
          {p.email && p.phone && <span className="text-gray-300">·</span>}
          <ContactRow icon="" value={p.phone} />
          {p.phone && p.location && <span className="text-gray-300">·</span>}
          <ContactRow icon="" value={p.location} />
        </div>
      </div>
      {sections.summary && summary && (
        <>
          <SectionTitle>About</SectionTitle>
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        </>
      )}
      {sections.skills && skills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-sm text-gray-600">{skills.join("  ·  ")}</p>
        </>
      )}
      {sections.experience && experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {exp.role}
                  </p>
                  <p className="text-xs text-gray-500">{exp.company}</p>
                </div>
                <p className="text-xs text-gray-400">
                  {exp.startDate} – {exp.endDate}
                </p>
              </div>
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.map((b, i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: static render order
                    key={i}
                    className="text-sm text-gray-600 pl-3 relative before:content-['–'] before:absolute before:left-0"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
      {sections.education && education.length > 0 && (
        <>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {edu.degree}
                </p>
                <p className="text-xs text-gray-500">{edu.institution}</p>
              </div>
              <p className="text-xs text-gray-400">
                {edu.startDate} – {edu.endDate}
              </p>
            </div>
          ))}
        </>
      )}
      {sections.projects && projects.length > 0 && (
        <>
          <SectionTitle>Projects</SectionTitle>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-2">
              <p className="text-sm font-semibold text-gray-900">
                {proj.name}
                {proj.link && (
                  <span className="font-normal text-gray-400">
                    {" "}
                    — {proj.link}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600">{proj.description}</p>
            </div>
          ))}
        </>
      )}
      {sections.certifications && certifications.length > 0 && (
        <>
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((c) => (
            <p key={c.id} className="text-sm text-gray-700 mb-1">
              {c.name}{" "}
              <span className="text-gray-400">
                — {c.issuer}, {c.date}
              </span>
            </p>
          ))}
        </>
      )}
    </div>
  );

  const renderTemplate = () => {
    switch (settings.template) {
      case "software-pro":
        return renderSoftwarePro();
      case "data-analyst":
        return renderDataAnalyst();
      case "executive":
        return renderExecutive();
      case "creative-pro":
        return renderCreativePro();
      case "minimal-clean":
        return renderMinimalClean();
      default:
        return renderModernTech();
    }
  };

  return (
    <div
      ref={previewRef}
      className="bg-white shadow-xl rounded-md overflow-hidden"
      style={{
        minHeight: "297mm",
        width: "210mm",
        fontFamily: `'${settings.font}', sans-serif`,
      }}
    >
      {renderTemplate()}
    </div>
  );
}
