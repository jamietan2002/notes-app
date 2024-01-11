# Notes App

A collaborative note-taking app for efficient knowledge sharing.

### Features
- Shared notes: Create notes that can be shared with specific users.
- ChatGPT-powered summaries: Get concise summaries of notes for quick understanding.
- Home dashboard: View a personalized feed of notes shared with you.

### Tech Stack
- Frontend: React, Material UI (MUI), Vite
- Backend: Firebase (Firestore, Authentication, Hosting)
- Text summarization: ChatGPT
    

### Live site
[notes-app](https://notes-app-dsta.web.app/login)

## Developer Guide
Setting up the firebase backend (firestore, firebase hosting, firebase authentication)

### Installation
    
- Clone the repository
``` git clone https://github.com/jamietan2002/notes-app.git ```

 - Install dependencies
```npm install```

- Run development server
```npm run dev```

### Configuring Firebase
- Replace the firebaseConfig in the [firebase config file](/src/firebaseConfig.js)

### Code Structure
- The src directory contains three main folders: pages, functions, and components

#### Pages Folder
- The pages folder houses the different pages of the notes app. Each page typically corresponds to a specific route. For example:
    - [Home page](/src/pages/HomePage.jsx) : Home page of notes app.
    - [Login page](/src/pages/auth/LoginPage.jsx): Login page of notes app.
    - [Add Note page](/src/pages/AddNotePage.jsx): Page where users add note. 

#### Component Folder
- The component folder houses smaller, reusable components of pages. For example:
    - [Header](/src/components/nav/Header.jsx): Header component for consistent navigation.
    - [Note](/src/components/Note.jsx): Note component used in the home page.

#### Function Folder
- The functions folder contains utility functions and helper methods. For example:
    - [Create Note](/src/functions/createNote.jsx): Function to create a note 
