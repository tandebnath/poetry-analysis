# Unbiased AI for Poetry Analysis
---

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![React](https://img.shields.io/badge/React-19.0.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)  
[![Next.js](https://img.shields.io/badge/Next.js-15.1.5-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)  
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)  
[![Payload CMS](https://img.shields.io/badge/Payload_CMS-latest-000000?style=flat&logo=payloadcms&logoColor=white)](https://payloadcms.com/)  
[![SQLite](https://img.shields.io/badge/SQLite-5.1.7-07405E?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html)  
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-222222?style=flat&logo=github&logoColor=white)](https://pages.github.com/)

## Overview

This website showcases progress from the *Unbiased AI for Poetry Analysis* project led by Dr. Kahyun Choi. It includes project updates, annotated research materials, publications, and outreach content.

## Getting Started - Editing & Local Development

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/tandebnath/poetry-analysis.git
cd poetry-analysis
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Local Development Server
```bash
npm run dev
```

### 4. Access the Website & Admin Panel
- Open **[http://localhost:3000](http://localhost:3000)** to view the site.
- Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** to access the **Content Management System (CMS)**.


### 5️. Login to the CMS
- **Email:** `admin@illinois.edu`
- **Password:** `12345`
- Alternatively, create a new user from the admin panel.


### 6. Editing Content

Once logged into the CMS, you can edit the following **collections**:

| Collection            | Purpose                                                | Key Fields & Notes                                                                                     |
|------------------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **Website Settings**   | Website name and logo                                  | `siteName` (text), `logo` (media upload)                                                                 |
| **Page Settings**      | Titles for each page                                   | `page` (select: home, about, blog, contact, publications, team), `title` (text)                          |
| **Home**               | Homepage content and recent updates                    | `content` (rich text), `maxUpdates` (number of updates to display)                                       |
| **About**              | Project description page                               | `content` (rich text)                                                                                     |
| **Blog**               | Blog posts for updates and commentary                  | `title`, `author`, `slug`, `datePosted`, `shortDescription`, `longDescription`, `readTime`, `keywords`   |
| **Team**               | Profiles of team members                               | `name`, `title`, `email`, `description`, `image`, `linkedin`, `website`, `sortOrder`                     |
| **Publications**       | Project-related papers and conference entries          | `title`, `authors[]`, `venue`, `year`, `location`, `proceedings`, `link`                                 |


## After Editing - Deployment

Once you're ready to deploy your changes:

```bash
git add .
git commit -m "Updated content"
git push origin main
```