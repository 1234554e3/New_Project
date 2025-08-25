import { GoogleGenAI, Type } from "@google/genai";
import type { StudyMaterial } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.OBJECT,
      properties: {
        ultra_short: { type: Type.STRING, description: "An ultra-short, tweet-length (1-2 lines) summary." },
        medium: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A medium-length summary as bullet points." },
        detailed: { type: Type.STRING, description: "A detailed paragraph-style summary with examples." }
      },
      required: ["ultra_short", "medium", "detailed"]
    },
    visualization: {
      type: Type.OBJECT,
      properties: {
        ideas: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Ideas for visualizing concepts (flowcharts, mind maps)." },
        mermaid: { type: Type.STRING, description: "Optional Mermaid.js code for a diagram." }
      },
      required: ["ideas"]
    },
    quiz: {
      type: Type.OBJECT,
      properties: {
        mcq: {
          type: Type.ARRAY,
          description: "Multiple Choice Questions.",
          items: {
            type: Type.OBJECT,
            properties: {
              q: { type: Type.STRING, description: "The question text." },
              options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of options." },
              answer: { type: Type.STRING, description: "The correct answer." }
            },
            required: ["q", "options", "answer"]
          }
        },
        short_answer: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Short answer questions." },
        flashcards: {
          type: Type.ARRAY,
          description: "Flashcards with a front (question) and back (answer).",
          items: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING },
              back: { type: Type.STRING }
            },
            required: ["front", "back"]
          }
        },
        critical_thinking: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Critical thinking questions." }
      },
      required: ["mcq", "short_answer", "flashcards", "critical_thinking"]
    },
    simplified: {
      type: Type.OBJECT,
      properties: {
        beginner_friendly: { type: Type.STRING, description: "A simple explanation for beginners." },
        hindi: { type: Type.STRING, description: "A simple explanation in Hindi. Only provide if English is the primary language." }
      },
      required: ["beginner_friendly"]
    },
    resources: {
      type: Type.ARRAY,
      description: "External resources for deeper learning.",
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "Type of resource (e.g., 'book', 'video', 'article')." },
          title: { type: Type.STRING },
          link: { type: Type.STRING, description: "URL to the resource." }
        },
        required: ["type", "title", "link"]
      }
    }
  },
  required: ["summary", "visualization", "quiz", "simplified", "resources"]
};


export const generateStudyMaterial = async (lectureText: string, language: 'English' | 'Hindi'): Promise<StudyMaterial> => {

  const simplifiedExplanationPrompt = language === 'English'
    ? `- \`beginner_friendly\`: A simple explanation in English.
   - \`hindi\`: A simple explanation in Hindi.`
    : `- \`beginner_friendly\`: A simple explanation in Hindi. (Important: Do NOT generate a separate 'hindi' field in this case).`;

  const prompt = `
    You are an AI Lecture Companion and Study Guide Generator. Your output must be a single JSON object that conforms to the provided schema.

    Lecture Content:
    ---
    ${lectureText}
    ---

    Based on the lecture content, generate a comprehensive study guide.
    With the exception of the 'simplified.hindi' field which must always be in Hindi, all other textual output MUST be in ${language}.

    Generate the following structured data:

    1.  **summary**: An object with three levels of summary.
        - \`ultra_short\`: A 1-2 line, tweet-length summary.
        - \`medium\`: A list of key bullet points.
        - \`detailed\`: A detailed paragraph explanation, including examples.

    2.  **visualization**: An object for concept visualization.
        - \`ideas\`: Textual ideas for diagrams like flowcharts or mind maps.
        - \`mermaid\`: Optional Mermaid.js code for a diagram.

    3.  **quiz**: An object containing various question types.
        - \`mcq\`: A list of multiple-choice questions, each with a 'q', 'options' array, and 'answer'.
        - \`short_answer\`: A list of short answer question strings.
        - \`flashcards\`: A list of flashcards, each with a 'front' and 'back'.
        - \`critical_thinking\`: A list of open-ended critical thinking questions.

    4.  **simplified**: An object with simplified explanations.
        ${simplifiedExplanationPrompt}

    5.  **resources**: A list of 2-3 external learning resources.
        - Each resource should have a 'type' (e.g., book, video), 'title', and 'link' (URL).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    // A simple check to see if the response is likely JSON before parsing
    if (!jsonText.startsWith('{') && !jsonText.startsWith('[')) {
        console.error("Received non-JSON response:", jsonText);
        throw new Error("The AI returned an invalid format. Please try again.");
    }
    return JSON.parse(jsonText) as StudyMaterial;

  } catch (error) {
    console.error("Error generating study material:", error);
    if (error instanceof Error) {
        // Check for specific API errors if possible, otherwise, a generic message
        if (error.message.includes("JSON")) {
             throw new Error("The AI response was not in the expected format. Please adjust your input and try again.");
        }
        throw new Error(`Failed to generate study material: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating study material.");
  }
};