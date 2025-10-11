// Context extraction utility for website content
export interface WebsiteContext {
  pages: {
    [key: string]: {
      title: string;
      content: string;
      url: string;
    };
  };
  metadata: {
    siteName: string;
    description: string;
    author: string;
  };
}

// Static content data - in a real implementation, you might want to fetch this dynamically
export const getWebsiteContext = (): WebsiteContext => {
  return {
    metadata: {
      siteName: "Devin Gupta",
      description: "Stanford Undergrad '26",
      author: "Devin Gupta"
    },
    pages: {
      home: {
        title: "Devin Gupta - Home",
        url: "/",
        content: `
Hey! I'm Devin 🙋🏽‍♂️

I'm an undergrad at Stanford University where I'm studying physics and computer science. But I'm also fascinated by social mobility economics, generalized robotics and journalism tech.

Academically, I'm interested in understanding and modeling human behavior through algorithmic and machine learning methods, often within networks. I've found my interests often lie across fields, hence I find myself interested in topics from finance (like semiconductor supply chains), robotics (multi-agent negotiation problems), political theory (backtesting IRV systems), and physics (quantum information).

At Stanford, I participate in the Undergraduate Physics Society, Stanford Student Robotics and Stanford EA. You might also find me at the RAIN seminar or the d.school working on physics problems. I sometimes hike at Castle Rock, visit friends at Berkeley, and boulder at Stanford's climbing gym.

My most favorite way to spend time is to meet new people, please don't hesitate to reach out. Send me an email here!
        `
      },
      work: {
        title: "Work Experience",
        url: "/work",
        content: `
Work experience and professional background. This page contains information about Devin's professional experience, internships, and career development.
        `
      },
      research: {
        title: "Research",
        url: "/research", 
        content: `
Research interests and projects. Devin is interested in:
- Understanding and modeling human behavior through algorithmic and machine learning methods
- Social mobility economics
- Generalized robotics
- Journalism tech
- Finance (semiconductor supply chains)
- Robotics (multi-agent negotiation problems)
- Political theory (backtesting IRV systems)
- Physics (quantum information)

He participates in the Undergraduate Physics Society, Stanford Student Robotics, and Stanford EA at Stanford University.
        `
      },
      education: {
        title: "Education",
        url: "/edu",
        content: `
Education background:
- Stanford University, Undergrad '26
- Studying Physics and Computer Science
- Participates in Undergraduate Physics Society, Stanford Student Robotics, and Stanford EA
- Attends RAIN seminar and d.school for physics problems
        `
      },
      courses: {
        title: "Courses",
        url: "/courses",
        content: `
Academic courses and coursework information. Devin is studying physics and computer science at Stanford University.
        `
      },
      journalism: {
        title: "Journalism",
        url: "/journalism",
        content: `
Journalism tech interests and related work. Devin is fascinated by journalism tech as part of his broader interests in technology and social impact.
        `
      }
    }
  };
};

export const buildContextPrompt = (userMessage: string, conversationHistory: any[] = []): string => {
  const context = getWebsiteContext();
  
  let contextString = `You are Devin Gupta's AI assistant. You have access to information about Devin's personal website and background. Here's the context:

SITE METADATA:
- Site Name: ${context.metadata.siteName}
- Description: ${context.metadata.description}
- Author: ${context.metadata.author}

WEBSITE CONTENT:
`;

  // Add content from all pages
  Object.values(context.pages).forEach(page => {
    contextString += `\n--- ${page.title} (${page.url}) ---\n${page.content}\n`;
  });

  contextString += `

INSTRUCTIONS:
- You are helping visitors learn about Devin Gupta
- Be friendly, helpful, and conversational
- Use the website content to answer questions about Devin's background, interests, research, education, and work
- If you don't know something specific, say so politely
- Keep responses concise but informative
- Maintain a professional yet approachable tone
- You can mention specific details from the website content

CONVERSATION HISTORY:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

USER'S CURRENT MESSAGE: ${userMessage}

Please respond as Devin's AI assistant:`;

  return contextString;
};