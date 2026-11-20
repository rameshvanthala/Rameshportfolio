# 🌟 Ramesh Vanthala - Personal Portfolio

A sleek, responsive, and modern personal portfolio website built with **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## 🚀 Live Demo & Structure

- **`index.html`**: Semantic, accessible markup structured into Hero, About Me, Skills, Projects, Experience & Education, Contact, and Footer.
- **`style.css`**: Modern CSS layout utilizing CSS custom properties (variables), Dark/Light theme modes, Flexbox, CSS Grid, glassmorphism cards, and responsive media queries.
- **`script.js`**: Interactive features including:
  - 🌓 Dark / Light Theme toggle with `localStorage` memory and OS preference detection.
  - 📱 Mobile hamburger menu with smooth slide-down animation and backdrop click handling.
  - ✍️ Dynamic typewriter typing animation in the Hero section.
  - 🎯 Project category filtering (All, Full Stack, Frontend, JavaScript/Tools).
  - 📈 Animated statistics counter triggered on scroll.
  - 🧭 Sticky navbar with blur and ScrollSpy (highlights the active section).
  - ✉️ Interactive contact form with real-time field validation and toast notifications.
  - ⬆️ Floating "Back to Top" smooth scrolling button.

---

## 🛠️ How to Customize

1. **Personal Information**:
   - Open `index.html` and search for `Ramesh Vanthala` or `ramesh.vanthala@example.com` to update your email, phone number, and location.
   - Update social profile links (GitHub, LinkedIn, Twitter/X) in both the Hero and Footer sections.

2. **Resume**:
   - Place your resume PDF in this directory (e.g., `resume.pdf`).
   - In `index.html`, locate the Hero section's resume button and update:
     ```html
     <a href="resume.pdf" download class="btn btn-ghost" title="Download Resume">
     ```

3. **Projects**:
   - In `index.html`, look for `<section class="projects">`.
   - Update project titles, descriptions, tech stack pills, and GitHub/Demo URLs to match your own work.

4. **Colors & Styling**:
   - Open `style.css` and check the `:root` variables at the top to customize accent colors, typography, or spacing.

---

## 🌐 How to Deploy for Free

### Option 1: GitHub Pages
1. Push this directory to a GitHub repository (e.g. `ramesh-vanthala-portfolio`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Vercel / Netlify
1. Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from your GitHub repository on [Vercel](https://vercel.com).
2. It deploys automatically in seconds!
