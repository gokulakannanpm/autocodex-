# AI Resume Builder (Frontend Only)

A modern, responsive resume builder that helps users draft, improve, tailor, preview, and download resumes. Built as a frontend-only app, ready for future AI API integration.

## Features

- Clean, professional light theme UI
- Input sections: Basic info, Summary, Experience, Education, Skills, Achievements
- Live preview in a polished resume layout
- "Improve with AI" buttons (placeholder now; demo enhancements enabled)
- Job-specific tailoring with a title/description input (placeholder logic now)
- Export to PDF (client-side using html2pdf.js)
- Fully responsive layout

## Getting Started

1. Open `index.html` in a browser.
2. Fill in your details on the left; the resume preview updates live on the right.
3. Use the AI buttons to see demo enhancements (or switch them off as below).
4. Click "Download as PDF" to export your resume.

## Demo AI vs. Real AI

- This project ships with a demo mode enabled by default to showcase behavior without a backend.
- To turn off demo AI and show placeholder messaging only, edit `index.html` and set:

```html
<script>
	window.USE_DEMO_AI = false;
</script>
```

- When integrating with a real AI API, replace calls inside `app.js` where `notify(...)` is used and the demo transformation functions are called.

## Tech Stack

- HTML, CSS, JavaScript (no build tools required)
- `html2pdf.js` (CDN) for client-side PDF export

## File Structure

- `index.html` — App layout and markup
- `styles.css` — Styling and responsive layout
- `app.js` — State management, live preview, and placeholder AI actions
- `README.md` — This file

## Notes

- Keep inputs minimal; users can add multiple experience and education entries.
- The app does not store data; refresh will reset to demo defaults.
- All AI features are placeholders and can be replaced with real API calls later.
