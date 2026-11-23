import type { ReactNode } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import type { PromptEvaluation } from '../lib/evaluation';
import { cn } from '../lib/cn';

interface AnswerFeedbackProps {
  evaluation: PromptEvaluation | null;
  action?: ReactNode;
  className?: string;
}

export function AnswerFeedback({ evaluation, action, className }: AnswerFeedbackProps) {
  if (!evaluation) {
    return null;
  }

  const correct = evaluation.correct;

  return (
    <div
      className={cn(
        'rounded-2xl border p-4 sm:p-5',
        correct ? 'border-success/30 bg-success-soft' : 'border-danger/30 bg-danger-soft',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 flex size-9 flex-none items-center justify-center rounded-full text-[#FFFEFC]',
            correct ? 'bg-success' : 'bg-danger',
          )}
        >
          {correct ? (
            <CheckCircle2 size={20} strokeWidth={2.2} />
          ) : (
            <X size={20} strokeWidth={2.6} />
          )}
        </span>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              'font-display text-lg font-extrabold leading-tight',
              correct ? 'text-[#335B45]' : 'text-[#7A3838]',
            )}
          >
            {correct ? 'Saktë! E gjete.' : 'Jo tamam. Shiko përgjigjen dhe provo ta mbash mend.'}
          </p>

          {!correct && evaluation.answer ? (
            <p className="mt-1.5 text-sm leading-relaxed text-[#7A3838]">
              Zgjidhe <strong className="font-semibold">“{evaluation.answer}”</strong>.
            </p>
          ) : null}

          <p
            className={cn(
              'mt-1.5 text-sm leading-relaxed',
              correct ? 'text-[#335B45]' : 'text-[#7A3838]',
            )}
          >
            {!correct ? (
              <>
                Përgjigjja e saktë është{' '}
                <strong className="font-bold">“{evaluation.correctAnswer}”</strong>.{' '}
              </>
            ) : null}
            {evaluation.explanation}
          </p>
        </div>
      </div>

      {action ? <div className="mt-4 flex justify-stretch sm:justify-end">{action}</div> : null}
    </div>
  );
}
