# 📚 ConnectingDots ERP - Intern Project Documentation

---

## **Table of Contents**

1.  [Project Overview](#1-project-overview)
    1.1. [About ConnectingDots ERP](#11-about-connectingdots-erp)
    1.2. [Target Audience](#12-target-audience)
    1.3. [Business Model](#13-business-model)
2.  [Getting Started](#2-getting-started)
    2.1. [System Requirements](#21-system-requirements)
    2.2. [Development Environment Setup](#22-development-environment-setup)
    2.3. [Environment Variables (.env.local)](#23-environment-variables-envlocal)
    2.4. [Development Workflow & Best Practices](#24-development-workflow--best-practices)
3.  [Architecture & Tech Stack](#3-architecture--tech-stack)
    3.1. [Frontend Framework](#31-frontend-framework)
    3.2. [Styling & UI Libraries](#32-styling--ui-libraries)
    3.3. [State Management](#33-state-management)
    3.4. [Database & Backend](#34-database--backend)
    3.5. [Authentication & Authorization](#35-authentication--authorization)
    3.6. [Performance & SEO Optimizations](#36-performance--seo-optimizations)
4.  [File & Folder Structure](#4-file--folder-structure)
5.  [Key Features & Functionalities](#5-key-features--functionalities)
    5.1. [Course Management & Enrollment](#51-course-management--enrollment)
    5.2. [City-Based Content System](#52-city-based-content-system)
    5.3. [Blog System](#53-blog-system)
    5.4. [Admin Dashboard System (`src/app/(routes)/dashboard/page.js`)](#54-admin-dashboard-system-srcapproutesdashboardpagejs)
    5.5. [Quiz System](#55-quiz-system)
    5.6. [Homepage Components](#56-homepage-components)
6.  [Development Workflow (Detailed)](#6-development-workflow-detailed)
    6.1. [Git Workflow](#61-git-workflow)
    6.2. [Code Quality Standards](#62-code-quality-standards)
    6.3. [Testing Strategy](#63-testing-strategy)
    6.4. [Deployment Process](#64-deployment-process)
7.  [API Reference](#7-api-reference)
    7.1. [Internal Next.js API Routes (`src/app/api/`)](#71-internal-nextjs-api-routes-srcappapi)
    7.2. [External Backend APIs](#72-external-backend-apis)
8.  [Common Tasks & Examples](#8-common-tasks--examples)
    8.1. [Setting up Your Development Environment](#81-setting-up-your-development-environment)
    8.2. [How to Add a New Course](#82-how-to-add-a-new-course)
    8.3. [How to Update Existing Course Content](#83-how-to-update-existing-course-content)
    8.4. [How to Add a New City for SEO Content](#84-how-to-add-a-new-city-for-seo-content)
    8.5. [How to Create a New Blog Post](#85-how-to-create-a-new-blog-post)
    8.6. [How to Add a New Quiz Topic](#86-how-to-add-a-new-quiz-topic)
    8.7. [Managing Admin Users & Permissions](#87-managing-admin-users--permissions)
    8.8. [Handling Contact Form Submissions](#88-handling-contact-form-submissions)
9.  [Troubleshooting Guide](#9-troubleshooting-guide)
10. [MongoDB Schema Overview](#10-mongodb-schema-overview)

---

## **1. Project Overview**

### **1.1 About ConnectingDots ERP**

ConnectingDots ERP is an EdTech company specializing in professional training courses with a primary focus on **SAP (Systems, Applications & Products)**. The platform offers comprehensive courses in various domains including:

-   **SAP S/4 HANA** (Functional & Technical modules like FICO, MM, SD, ABAP, etc.)
-   **IT Courses** (Masters in Data Science, Data Analytics, Business Analytics, Full Stack Development, Java, Python, MERN Stack, UI/UX, Salesforce, ChatGPT & AI)
-   **Data Visualization** (Tableau, Power BI, SQL)
-   **Digital Marketing** (Advance Digital Marketing, PPC, SEO, Social Media Marketing, Google Analytics)
-   **HR Courses** (HR Training, Core HR, HR Payroll, HR Management, HR Generalist, HR Analytics)

### **1.2 Target Audience**

The platform targets a broad audience, including:

-   Students seeking career transitions
-   Working professionals looking to upskill or reskill
-   Corporations providing training to their employees
-   Job seekers requiring strong placement support

### **1.3 Business Model**

ConnectingDots ERP operates on a model primarily focused on:

-   Course enrollment and training fees.
-   Strategic partnerships for corporate training.
-   Providing placement assistance services to students.
-   Offering certification programs for course completion.