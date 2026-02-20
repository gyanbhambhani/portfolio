export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  why: string;
  learned: string;
  tech: string[];
  url?: string;
  year: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Research {
  title: string;
  period: string;
  description: string;
  problem: string;
  approach: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: 'evercurrent',
    title: 'EverCurrent',
    tagline: 'AI workflows for hardware teams',
    description: 'Agentic AI workflow management for hardware manufacturing. Part of a16z Speedrun.',
    why: `Hardware teams drown in context switching between Slack, Jira, Confluence, and CAD tools. 
      I wanted to build something that could actually understand the full picture and help teams 
      move faster without losing information.`,
    learned: `Building for enterprise is different. You need to think about integrations, 
      permissions, and audit trails from day one. Also learned a lot about vector search 
      and semantic memory pipelines.`,
    tech: ['FastAPI', 'GraphQL', 'PostgreSQL', 'TypeScript', 'OpenAI', 'FAISS', 'Weaviate'],
    year: '2025',
  },
  {
    slug: 'rltr',
    title: 'Mano',
    tagline: 'AI for real estate agents',
    description: 'AI-native transaction platform that automates property search, paperwork, and compliance.',
    why: `I got my real estate license and saw how much time agents waste on paperwork and 
      manual searches. The industry is stuck in the 90s. Built this to fix that.`,
    learned: `Talked to 25+ agents and brokers before writing code. Discovery interviews 
      completely changed what we built. Also learned that compliance is actually the 
      hardest part of real estate tech.`,
    tech: ['React', 'TypeScript', 'Supabase', 'MCP'],
    url: 'https://mano.network',
    year: '2025',
  },
  {
    slug: 'tickeriq',
    title: 'TickerIQ',
    tagline: 'AI equity signal engine',
    description: 'Equity selection model combining financials, sentiment, and risk rules.',
    why: `Wanted to see if I could build something that actually works with real money. 
      Not paper trading, not backtesting - real capital.`,
    learned: `Achieved 12-15% alpha over 6-9 months with Sharpe above 1.4. The hardest part 
      wasn't the model - it was the discipline to follow it when it felt wrong.`,
    tech: ['OpenAI Agent SDK', 'Firecrawl', 'React', 'Python'],
    year: '2025',
  },
  {
    slug: 'studybase',
    title: 'StudyBase',
    tagline: 'AI study platform',
    description: 'Collaborative study platform with shared course materials and AI assistance.',
    why: `Every semester, students waste hours hunting for past exams and study guides. 
      Built this to create a shared knowledge layer for students.`,
    learned: `Served 2,000+ students. Learned that distribution matters as much as product. 
      Also learned about vector embeddings and how to make search actually useful.`,
    tech: ['OpenAI SDK', 'Firestore', 'Vector Embeddings', 'React'],
    url: 'https://cal-study-base.vercel.app',
    year: '2025',
  },
  {
    slug: 'entrelink',
    title: 'Entrelink',
    tagline: 'Tinder for founders and investors',
    description: 'Algorithmic fundraising platform matching founders with relevant investors.',
    why: `Fundraising is broken. Founders spend months on cold outreach when the right 
      investor might be two intros away. Built this to fix the matching problem.`,
    learned: `Powered 10,000+ matches with verifiable fundraising outcomes (~$500k raised). 
      Learned that data quality matters more than model sophistication.`,
    tech: ['Firebase', 'TypeScript', 'React', 'FastAPI', 'OpenAI'],
    url: 'https://entrelink.us',
    year: '2024',
  },
  {
    slug: 'fundless',
    title: 'Fundless',
    tagline: 'VC without capital',
    description: 'Investment memos on people, not companies.',
    why: `What if you could invest in people before they start companies? 
      Writing public memos on talent I believe in.`,
    learned: `Still building. Learning about reputation systems and how to 
      create value without capital.`,
    tech: ['Next.js', 'Vercel'],
    year: '2025',
  },
  {
    slug: 'podcast',
    title: 'The Entrepreneurship Insights Podcast',
    tagline: '1.5M+ views',
    description: 'Podcast featuring 8-figure founders and industry leaders.',
    why: `Started in high school because I wanted to learn from people who had 
      actually built things. Turned into something bigger than I expected.`,
    learned: `Built an audience of 1.5M+ views. Learned that consistency beats 
      perfection, and that asking good questions is a skill.`,
    tech: ['Content', 'Community'],
    url: 'https://www.youtube.com/@entrepreneurshipinsights',
    year: '2021',
  },
];

export const workExperiences: WorkExperience[] = [
  {
    company: 'EverCurrent',
    role: 'Founding Engineer',
    period: 'June 2025 - Present',
    description: 'Building AI agents for hardware manufacturing workflows. Part of a16z Speedrun 005.',
    highlights: [
      'Developed AI agents for internal ops and knowledge transfer',
      'Built integrations for Slack, Jira, Confluence, and Onshape',
      'Integrated OpenAI and vector search for semantic memory pipelines',
    ],
  },
  {
    company: 'RLTR',
    role: 'Lead Engineer',
    period: 'August 2025 - Present',
    description: 'AI-native transaction platform for real estate agents.',
    highlights: [
      'Designed core product flows for client onboarding and contract drafting',
      'Conducted 25+ discovery interviews with agents and brokers',
      'Launching pilot with Berkshire Hathaway HomeServices (700+ agents)',
    ],
  },
  {
    company: 'Intero Real Estate',
    role: 'Real Estate Agent',
    period: 'May 2024 - Present',
    description: 'Licensed agent in the Bay Area.',
    highlights: [
      'Youngest realtor in the Bay Area',
      'California DRE License: 02240627',
    ],
  },
];

export const research: Research = {
  title: 'Quantum Semantic Drift',
  period: 'May 2025 - August 2025',
  description: 'Physics-inspired Large Meaning Model for semantic search.',
  problem: `Traditional search engines match keywords, not meaning. 
    I wanted to build something that could understand semantic relationships 
    the way physics understands forces.`,
  approach: `Invented a model simulating semantic gravity, narrative curvature, 
    and drift across 10^9 search points. Built optimized retrieval pipelines 
    using vector similarity and custom ranking.`,
  outcome: `Outperformed Google Search on targeted queries with higher semantic 
    precision and lower latency. Still exploring applications.`,
};

export const about = {
  intro: `I'm Gyan. I build things.`,
  story: `I'm at Berkeley studying Business and Data Science at Haas. 
    But honestly, most of what I've learned has been from building.
    
    Started a podcast in high school that hit 1.5M views. Got my real estate 
    license and became the youngest agent in the Bay. Built a fundraising 
    platform that's helped founders raise ~$500k. Now I'm working on AI 
    tools for hardware teams and real estate agents.
    
    I don't wait for permission. When I see something that should exist, 
    I build it.`,
  interests: [
    'Play 6 instruments across 3 styles',
    'Train MMA',
    'Speak Hindi (native) and French (intermediate)',
    'Into cars and card magic',
  ],
  education: {
    school: 'UC Berkeley, Haas School of Business',
    degree: 'BS Global Management + Data Science',
    graduation: '2027',
  },
};
