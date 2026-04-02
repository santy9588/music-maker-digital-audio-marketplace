# Resume Builder

## Current State
App.tsx is a blank white div. No resume builder UI exists in this workspace.

## Requested Changes (Diff)

### Add
- Full Resume Builder app with 6 templates (3 Technical, 3 Non-Technical)
- Live split-screen editor: form inputs on left, real-time resume preview on right
- Shareable link feature: encode resume data as base64 URL param so users can share a URL that loads their resume
- DOCX export using a client-side approach (generate a .doc file using HTML blob with Word-compatible content type)
- PDF export via browser print
- Color themes (Professional, Creative, Minimal, Fresh)
- Font customization
- Save/load multiple resumes via localStorage
- Profile photo upload (stored as base64)
- Pre-written content suggestions per section/role

### Modify
- App.tsx: replace blank div with the full Resume Builder app

### Remove
- Nothing

## Implementation Plan
1. Create Resume Builder in App.tsx with all sections and templates
2. Implement shareable link: JSON.stringify resume data → btoa → append as `?resume=` URL param; load on page init from URL param
3. Implement DOCX export: build HTML string of resume → create Blob with application/msword content type → trigger download as .doc
4. Implement PDF export via window.print() with print CSS
5. All state in localStorage + URL sharing
