export type ExerciseId = string;
export type PromptId = string;

export interface AnswerOption {
  id: string;
  label: string;
  image?: string;
  color?: string;
}

export interface BasePrompt {
  id: PromptId;
  /** The main question, prompt, or phrase shown to the player. */
  question: string;
  /** Optional Albanian context for sentence-building prompts. */
  translation?: string;
  /** Optional conversational context, e.g. who is speaking. */
  context?: string;
  /** Speaker label for dialogue prompts. */
  speaker?: string;
  hint?: string;
  explanation: string;
}

export interface OptionPrompt extends BasePrompt {
  kind:
    | 'choice'
    | 'number'
    | 'article'
    | 'fill-blank'
    | 'dialogue'
    | 'cafe'
    | 'correct-sentence';
  options: AnswerOption[];
  correctOptionId: string;
}

export interface PicturePrompt extends BasePrompt {
  kind: 'picture';
  options: AnswerOption[];
  correctOptionId: string;
}

export interface ColorPrompt extends BasePrompt {
  kind: 'color';
  options: AnswerOption[];
  correctOptionId: string;
}

export interface SentencePrompt extends BasePrompt {
  kind: 'sentence';
  chips: string[];
  correctSentence: string;
}

export interface MatchingPrompt extends BasePrompt {
  kind: 'matching';
  left: string;
  right: string;
}

export type Prompt = OptionPrompt | PicturePrompt | ColorPrompt | SentencePrompt | MatchingPrompt;

export type ExerciseType =
  | 'matching'
  | 'picture'
  | 'number'
  | 'color'
  | 'fill-blank'
  | 'article'
  | 'sentence-builder'
  | 'verb'
  | 'daily-routine'
  | 'dialogue'
  | 'cafe'
  | 'directions'
  | 'perfekt'
  | 'detective'
  | 'mixed';

export interface Exercise {
  id: ExerciseId;
  chapterId: string;
  number: number;
  title: string;
  type: ExerciseType;
  instructions: string;
  hint?: string;
  prompts: Prompt[];
}

export type ChapterAccent = 'purple' | 'amber' | 'mint';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  difficulty: string;
  description: string;
  illustration: string;
  illustrationAlt: string;
  accent: ChapterAccent;
  exerciseIds: ExerciseId[];
}
