export const AUTH_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
} as const;

export const DB_COLLECTIONS = {
  USERS: "users",
  INTERVIEWS: "interviews",
} as const;

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];

export const generator = {
  name: "Prepwise_workflow",
  nodes: [
    {
      name: "Greet & Gather",
      type: "conversation",
      isStart: true,
      metadata: {
        position: {
          x: -397.7562160847768,
          y: -176.2886531175899,
        },
      },
      prompt: "Greet the user and help them create a new AI Interviewer.",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      variableExtractionPlan: {
        output: [
          {
            enum: [],
            type: "string",
            title: "level",
            description: "The job experience level.",
          },
          {
            enum: [],
            type: "number",
            title: "amount",
            description: "How many questions would you like to generate?",
          },
          {
            enum: [],
            type: "string",
            title: "techstack",
            description:
              "A list of technologies to cover during the job interview. For example, React, Next.js, Express.js, Node and so on…",
          },
          {
            enum: [],
            type: "string",
            title: "role",
            description: "What role should would you like to train for?",
          },
          {
            enum: ["technical", "behavioral", "mixed"],
            type: "string",
            title: "type",
            description: "What type of the interview should it be?",
          },
        ],
      },
      messagePlan: {
        firstMessage: "Hey there!",
      },
    },
    {
      name: "conversation_1748695284629",
      type: "conversation",
      metadata: {
        position: {
          x: -398.9579855439915,
          y: 164.588202384118,
        },
      },
      prompt: "Say that the Interview will be generated shortly.",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      messagePlan: {
        firstMessage: "",
      },
    },
    {
      name: "API Request",
      type: "tool",
      metadata: {
        position: {
          x: -398.9579855439915,
          y: 414.588202384118,
        },
      },
      tool: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
        body: {
          type: "object",
          required: ["role", "level", "amount", "techstack", "type", "userid"],
          properties: {
            role: {
              type: "string",
              value: "{{ role }}",
              description: "",
            },
            type: {
              type: "string",
              value: "{{ type }}",
              description: "",
            },
            level: {
              type: "string",
              value: "{{ level }}",
              description: "",
            },
            amount: {
              type: "number",
              value: "{{ amount }}",
              description: "",
            },
            userid: {
              type: "string",
              value: "{{ userid }}",
              description: "",
            },
            techstack: {
              type: "string",
              value: "{{ techstack }}",
              description: "",
            },
          },
        },
        name: "sendInterviewData",
        type: "apiRequest",
        method: "POST",
        function: {
          name: "untitled_tool",
          parameters: {
            type: "object",
            required: [],
            properties: {},
          },
        },
      },
    },
    {
      name: "conversation_1748695911331",
      type: "conversation",
      metadata: {
        position: {
          x: -398.9579855439915,
          y: 664.588202384118,
        },
      },
      prompt:
        "Thank the user for the conversation and inform them that the interview has been generated successfully.",
      model: {
        model: "gpt-4o",
        provider: "openai",
        maxTokens: 1000,
        temperature: 0.7,
      },
      messagePlan: {
        firstMessage: "",
      },
    },
    {
      name: "hangup_1748696049138",
      type: "tool",
      metadata: {
        position: {
          x: -398.95019556049704,
          y: 918.8471009959933,
        },
      },
      tool: {
        type: "endCall",
      },
    },
  ],
  edges: [
    {
      from: "Greet & Gather",
      to: "conversation_1748695284629",
      condition: {
        type: "ai",
        prompt: "If user provided all the required variables.",
      },
    },
    {
      from: "conversation_1748695284629",
      to: "API Request",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "API Request",
      to: "conversation_1748695911331",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "conversation_1748695911331",
      to: "hangup_1748696049138",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
  ],
  globalPrompt:
    "You are a voice assistant helping with creating new AI interviewers. Your task is to collect data from the user. Remember that this is a voice conversation - do not use any special characters.",
};
