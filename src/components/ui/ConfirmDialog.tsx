import { useEffect, useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { buttonClasses } from './buttonStyles';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  tone?: 'primary' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => confirmRef.current?.focus(), 10);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCancel();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[#251B33]/55 p-4 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="w-full max-w-md rounded-[24px] border border-border bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(30,20,45,0.7)] sm:p-7"
      >
        <h2 id={titleId} className="text-2xl text-ink">
          {title}
        </h2>
        <div id={descriptionId} className="mt-3 text-[15px] leading-relaxed text-ink-muted">
          {children}
        </div>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={buttonClasses('secondary', 'md', 'w-full sm:w-auto')}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className={buttonClasses(tone === 'danger' ? 'danger' : 'primary', 'md', 'w-full sm:w-auto')}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
