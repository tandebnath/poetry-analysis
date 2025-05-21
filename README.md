### Social Media for Humanists Website
---

[![TypeScript 5.7.3](https://img.shields.io/badge/TypeScript-5.7.3-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![React 19.0.0](https://img.shields.io/badge/React-19.0.0-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![Next.js 15.1.5](https://img.shields.io/badge/Next.js-15.1.5-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/) [![TailwindCSS 3.4.3](https://img.shields.io/badge/TailwindCSS-3.4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-✔️-222222?style=flat&logo=github&logoColor=white)](https://pages.github.com/) [![Payload CMS](https://img.shields.io/badge/Payload_CMS-latest-000000?style=flat&logo=payloadcms&logoColor=white)](https://payloadcms.com/) [![SQLite 5.1.7](https://img.shields.io/badge/SQLite-5.1.7-07405E?style=flat&logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html) 

## Overview

This website presents tutorials, blog posts, and research tools related to the Social Media for Humanists project.

## Getting Started - Editing & Local Development

Follow these steps to set up and run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/tandebnath/social-media-for-humanists.git
cd social-media-for-humanists
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

| Collection              | Purpose                                               | Key Fields & Notes                                                                                   |
|--------------------------|-------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **Website Settings**     | Website name and logo                                 | `siteName` (text), `logo` (image upload via Media)                                                    |
| **Page Settings**        | Titles for each page                                  | `page` (select from: home, about, contact, blog, tutorialOverview, listOfTutorials), `title` (text)   |
| **Home**                 | Homepage content and latest updates                   | `content` (rich text), `maxUpdates` (number of recent updates to show)                                |
| **About**                | Content for the About page                            | `content` (rich text)                                                                                  |
| **Blog**                 | Blog post entries                                     | `title`, `author`, `slug`, `datePosted`, `shortDescription`, `longDescription`, `readTime`, `keywords`|
| **Contact**              | Contact details and text blocks                       | `type` (text-block/contact), `sortOrder`, `body` (text), `contact` group (name, position, email, etc) |
| **Tutorials**            | Series of tutorials with content or links             | `seriesName`, `seriesSlug`, `sortOrder`, `tutorials[]`: `title`, `slug`, `description`, `contentType`, `content` or `linkContent` |
| **Tutorials Overview**   | Overview and introduction to tutorial sections        | `content` (rich text)                                                                                  |


## After Editing - Deployment

Once you're ready to deploy your changes:

```bash
git add .
git commit -m "Updated content"
git push origin main
```