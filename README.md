# AI Powered Mock Interview Platform

A job interview preparation platform powered by Vapi AI Voice agents. It is built with Next.js for the UI and backend logic, Firebase for authentication and data storage, styled with TailwindCSS and using Vapi's voice agents.

## Tech Stack

- Next.js
- Firebase
- Vapi AI
- shadcn/ui
- Google Gemini
- Zod
- Tailwind CSS

## Main Features

- **Authentication**: Sign Up and Sign In using password/email authentication handled by Firebase.

- **Create Interviews**: Easily generate job interviews with help of Vapi voice assistants and Google Gemini.

- **Get feedback from AI**: Take the interview with AI voice agent, and receive instant feedback based on your conversation.

- **Modern UI/UX**: A sleek and user-friendly interface designed for a great experience.

- **Dashboard**: Manage and track all your interviews with easy navigation.

- **Responsiveness**: Fully responsive design that works seamlessly across devices.

## Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**<br />
Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en)

**Clone the Repository**

```
git clone https://github.com/maryam-nasir/interview-prep.git
cd interview-prep
```

**Installation**<br />
Install the project dependencies using npm:

```
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Replace the placeholder values with your actual Firebase and Vapi credentials.

**Running the Project**<br />
Run:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in the browser to view the project.

## Access the Deployed version on Vercel

The app is deployed on Vercel and can be accessed here: [Interview Prep Platform](https://interview-prep-eight-ashen.vercel.app/).

## Acknowledgements

I have developed this project by following the JavaScript Mastery tutorial on [YouTube](https://www.youtube.com/watch?v=8GK8R77Bd7g).