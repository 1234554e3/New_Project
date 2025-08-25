export interface MCQ {
  q: string;
  options: string[];
  answer: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface ExternalResource {
    type: string;
    title: string;
    link: string;
}

export interface StudyMaterial {
  summary: {
    ultra_short: string;
    medium: string[];
    detailed: string;
  };
  visualization: {
    ideas: string[];
    mermaid?: string;
  };
  quiz: {
    mcq: MCQ[];
    short_answer: string[];
    flashcards: Flashcard[];
    critical_thinking: string[];
  };
  simplified: {
    beginner_friendly: string;
    hindi?: string;
  };
  resources: ExternalResource[];
}