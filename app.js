(function () {
	const $ = (id) => document.getElementById(id);

	// Elements
	const nameInput = $("name");
	const titleInput = $("title");
	const emailInput = $("email");
	const phoneInput = $("phone");
	const locationInput = $("location");
	const summaryInput = $("summary");
	const skillsInput = $("skills");
	const achievementsInput = $("achievements");
	const expList = $("experienceList");
	const eduList = $("educationList");

	const pvName = $("pv-name");
	const pvTitle = $("pv-title");
	const pvContact = $("pv-contact");
	const pvSummary = $("pv-summary");
	const pvExperience = $("pv-experience");
	const pvEducation = $("pv-education");
	const pvSkills = $("pv-skills");
	const pvAchievements = $("pv-achievements");

	// State
	const state = {
		name: "Jane Doe",
		title: "Software Engineer",
		email: "jane@example.com",
		phone: "(+1) 555-123-4567",
		location: "San Francisco, CA",
		summary: "Results-driven engineer with a passion for building delightful user experiences.",
		experience: [
			{ role: "Frontend Engineer", company: "Acme Inc.", period: "2022 – Present", bullets: [
				"Led migration to React and TypeScript, improving DX and reliability.",
				"Delivered UI components with accessibility and performance best practices.",
			] },
		],
		education: [
			{ degree: "B.Tech, Computer Science", school: "State University", year: "2021" },
		],
		skills: ["React", "TypeScript", "Node.js", "CSS"],
		achievements: ["Top 5% performer 2023", "Speaker at JSConf Local"],
		targetTitle: "",
		jobDescription: "",
	};

	function render() {
		pvName.textContent = state.name || "";
		pvTitle.textContent = state.title || "";
		pvContact.textContent = [state.email, state.phone, state.location].filter(Boolean).join(" · ");
		pvSummary.textContent = state.summary || "";

		pvExperience.innerHTML = "";
		state.experience.forEach((exp) => {
			const item = document.createElement("li");
			item.innerHTML = `<strong>${escapeHtml(exp.role)}</strong> — ${escapeHtml(exp.company)} (${escapeHtml(exp.period)})<br>${exp.bullets.map(b => `• ${escapeHtml(b)}`).join("<br>")}`;
			pvExperience.appendChild(item);
		});

		pvEducation.innerHTML = "";
		state.education.forEach((edu) => {
			const item = document.createElement("li");
			item.textContent = `${edu.degree} — ${edu.school} (${edu.year})`;
			pvEducation.appendChild(item);
		});

		pvSkills.innerHTML = "";
		state.skills.forEach((s) => {
			const li = document.createElement("li");
			li.textContent = s;
			pvSkills.appendChild(li);
		});

		pvAchievements.innerHTML = "";
		state.achievements.forEach((a) => {
			const li = document.createElement("li");
			li.textContent = a;
			pvAchievements.appendChild(li);
		});
	}

	function escapeHtml(s) {
		return String(s)
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;");
	}

	function bindInputs() {
		nameInput.addEventListener("input", (e) => { state.name = e.target.value; render(); });
		titleInput.addEventListener("input", (e) => { state.title = e.target.value; render(); });
		emailInput.addEventListener("input", (e) => { state.email = e.target.value; render(); });
		phoneInput.addEventListener("input", (e) => { state.phone = e.target.value; render(); });
		locationInput.addEventListener("input", (e) => { state.location = e.target.value; render(); });
		summaryInput.addEventListener("input", (e) => { state.summary = e.target.value; render(); });
		skillsInput.addEventListener("input", (e) => { state.skills = e.target.value.split(",").map(s => s.trim()).filter(Boolean); render(); });
		achievementsInput.addEventListener("input", (e) => { state.achievements = e.target.value.split("\n").map(s => s.trim()).filter(Boolean); render(); });
	}

	function createExperienceCard(exp, idx) {
		const wrapper = document.createElement("div");
		wrapper.className = "exp-card";
		wrapper.innerHTML = `
			<div class="inline-grid">
				<label class="field"><span>Role</span><input type="text" value="${escapeHtml(exp.role)}"></label>
				<label class="field"><span>Company</span><input type="text" value="${escapeHtml(exp.company)}"></label>
			</div>
			<div class="inline-grid">
				<label class="field"><span>Period</span><input type="text" value="${escapeHtml(exp.period)}"></label>
				<label class="field"><span>Bullets (one per line)</span><textarea rows="3">${escapeHtml(exp.bullets.join("\n"))}</textarea></label>
			</div>
			<div class="row-actions">
				<button data-action="remove" class="btn btn-ghost">Remove</button>
			</div>
		`;
		const [roleInput, companyInput] = wrapper.querySelectorAll("input");
		const periodInput = wrapper.querySelectorAll("input")[2];
		const bulletsInput = wrapper.querySelector("textarea");
		roleInput.addEventListener("input", (e) => { state.experience[idx].role = e.target.value; render(); });
		companyInput.addEventListener("input", (e) => { state.experience[idx].company = e.target.value; render(); });
		periodInput.addEventListener("input", (e) => { state.experience[idx].period = e.target.value; render(); });
		bulletsInput.addEventListener("input", (e) => { state.experience[idx].bullets = e.target.value.split("\n").map(s => s.trim()).filter(Boolean); render(); });
		wrapper.querySelector('[data-action="remove"]').addEventListener("click", () => {
			state.experience.splice(idx, 1);
			mountExperience();
			render();
		});
		return wrapper;
	}

	function mountExperience() {
		expList.innerHTML = "";
		state.experience.forEach((exp, idx) => expList.appendChild(createExperienceCard(exp, idx)));
	}

	function createEducationCard(edu, idx) {
		const wrapper = document.createElement("div");
		wrapper.className = "edu-card";
		wrapper.innerHTML = `
			<div class="inline-grid">
				<label class="field"><span>Degree</span><input type="text" value="${escapeHtml(edu.degree)}"></label>
				<label class="field"><span>School</span><input type="text" value="${escapeHtml(edu.school)}"></label>
			</div>
			<div class="inline-grid">
				<label class="field"><span>Year</span><input type="text" value="${escapeHtml(edu.year)}"></label>
			</div>
			<div class="row-actions">
				<button data-action="remove" class="btn btn-ghost">Remove</button>
			</div>
		`;
		const [degreeInput, schoolInput] = wrapper.querySelectorAll("input");
		const yearInput = wrapper.querySelectorAll("input")[2];
		degreeInput.addEventListener("input", (e) => { state.education[idx].degree = e.target.value; render(); });
		schoolInput.addEventListener("input", (e) => { state.education[idx].school = e.target.value; render(); });
		yearInput.addEventListener("input", (e) => { state.education[idx].year = e.target.value; render(); });
		wrapper.querySelector('[data-action="remove"]').addEventListener("click", () => {
			state.education.splice(idx, 1);
			mountEducation();
			render();
		});
		return wrapper;
	}

	function mountEducation() {
		eduList.innerHTML = "";
		state.education.forEach((edu, idx) => eduList.appendChild(createEducationCard(edu, idx)));
	}

	// Demo AI helpers (placeholder behaviour)
	function improveTextWithDemoAI(text, { keywords = [] } = {}) {
		if (!window.USE_DEMO_AI) return text;
		let out = text.trim();
		if (!out) return out;
		// Simple phrasing tweaks
		out = out
			.replaceAll(/\b(responsible for)\b/gi, "led")
			.replaceAll(/\b(worked on)\b/gi, "delivered")
			.replaceAll(/\b(helped\b)/gi, "contributed to")
			.replaceAll(/\b(very|really)\b/gi, "highly");
		// Add keywords if missing
		keywords.forEach(k => {
			if (!new RegExp(`\\b${k}\\b`, "i").test(out)) {
				out += (out.endsWith('.') ? '' : '.') + ` ${k}`;
			}
		});
		return out;
	}

	function notify(msg) {
		alert(msg); // Simple placeholder; can be replaced with toast UI
	}

	// Buttons
	$("addExperienceBtn").addEventListener("click", () => {
		state.experience.push({ role: "", company: "", period: "", bullets: [] });
		mountExperience();
		render();
	});
	$("addEducationBtn").addEventListener("click", () => {
		state.education.push({ degree: "", school: "", year: "" });
		mountEducation();
		render();
	});

	$("improveSummaryBtn").addEventListener("click", () => {
		if (!window.USE_DEMO_AI) return notify("AI integration coming soon.");
		summaryInput.value = improveTextWithDemoAI(summaryInput.value || state.summary, { keywords: [state.title].filter(Boolean) });
		state.summary = summaryInput.value;
		render();
	});
	$("improveSkillsBtn").addEventListener("click", () => {
		if (!window.USE_DEMO_AI) return notify("AI integration coming soon.");
		const unique = Array.from(new Set([...(skillsInput.value || state.skills.join(", ")).split(",").map(s => s.trim()).filter(Boolean)]));
		skillsInput.value = unique.join(", ");
		state.skills = unique;
		render();
	});
	$("improveExperienceBtn").addEventListener("click", () => {
		if (!window.USE_DEMO_AI) return notify("AI integration coming soon.");
		state.experience = state.experience.map((exp) => ({
			...exp,
			bullets: exp.bullets.map(b => improveTextWithDemoAI(b, { keywords: [] }))
		}));
		mountExperience();
		render();
	});

	$("tailorBtn").addEventListener("click", () => {
		const targetTitle = $("targetTitle").value.trim();
		const jobDesc = $("jobDescription").value.trim();
		if (!window.USE_DEMO_AI) return notify("AI integration coming soon.");
		if (!targetTitle && !jobDesc) return notify("Enter a target job title or description.");
		// Simple tailoring: align title, add keywords to summary, nudge bullets
		if (targetTitle) {
			state.title = targetTitle;
			if (titleInput) titleInput.value = targetTitle;
		}
		const keywords = extractKeywordsFromText(targetTitle + " " + jobDesc).slice(0, 6);
		state.summary = improveTextWithDemoAI(state.summary, { keywords });
		state.experience = state.experience.map((exp) => ({
			...exp,
			bullets: exp.bullets.map(b => improveTextWithDemoAI(b, { keywords }))
		}));
		summaryInput.value = state.summary;
		mountExperience();
		render();
	});

	function extractKeywordsFromText(text) {
		const common = new Set(["and","or","the","a","to","for","with","of","in","on","by","an","as","is","are","be","from","at","this","that"]);
		return Array.from(new Set(text
			.toLowerCase()
			.replace(/[^a-z0-9\s]/g, " ")
			.split(/\s+/)
			.filter(w => w.length > 2 && !common.has(w))));
	}

	// PDF
	$("downloadPdfBtn").addEventListener("click", () => {
		const resume = document.getElementById("resume");
		const opt = {
			margin:       0.5,
			filename:     `${(state.name || "resume").toLowerCase().replace(/\s+/g, "_")}.pdf`,
			image:        { type: 'jpeg', quality: 0.98 },
			html2canvas:  { scale: 2 },
			jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
		};
		html2pdf().from(resume).set(opt).save();
	});

	// Mount initial UI
	function initFormValues() {
		nameInput.value = state.name;
		titleInput.value = state.title;
		emailInput.value = state.email;
		phoneInput.value = state.phone;
		locationInput.value = state.location;
		summaryInput.value = state.summary;
		skillsInput.value = state.skills.join(", ");
		achievementsInput.value = state.achievements.join("\n");
	}

	bindInputs();
	mountExperience();
	mountEducation();
	initFormValues();
	render();
})();
