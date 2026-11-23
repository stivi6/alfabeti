import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

interface PageLayoutProps {
  children: ReactNode;
  variant?: 'home' | 'compact';
  headerActions?: ReactNode;
  mainClassName?: string;
}

export function PageLayout({
  children,
  variant = 'compact',
  headerActions,
  mainClassName,
}: PageLayoutProps) {
  return (
    <div className="flex min-h-svh flex-col">
      <a className="skip-link" href="#main-content">
        Kalo te përmbajtja
      </a>
      <SiteHeader variant={variant}>{headerActions}</SiteHeader>
      <main id="main-content" className={cn('flex-1', mainClassName)}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
