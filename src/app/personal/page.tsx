'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/loading';

export default function PersonalPage() {
  const [sequence, setSequence] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);

  const checkSequence = (value: string) => {
    if (value === '8648') {
      setIsAuthorized(true);
      setError(false);
    } else if (value.length === 4) {
      setError(true);
      setSequence('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkSequence(sequence);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setSequence(value);
    if (error) setError(false);
    
    if (value.length === 4) {
      checkSequence(value);
    }
  };

  if (isAuthorized) {
    return (
      <PageTransition>
        <div className="max-w-2xl mx-auto px-6 py-16 font-sans antialiased min-h-screen flex flex-col">
          <header className="mb-12 border-b pb-6">
            <h1 className="text-3xl font-bold tracking-tight">personal archive 🤫</h1>
            <p className="text-muted-foreground mt-2">Private space for personal thoughts and updates.</p>
          </header>
          
          <main className="space-y-12 flex-grow">
            <section>
              <h2 className="text-xl font-semibold mb-4 text-primary">Access Granted</h2>
              <div className="p-6 bg-muted/30 rounded-xl border border-border">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  You have successfully accessed the protected area. This section is intentionally disconnected from the main navigation to maintain privacy.
                </p>
              </div>
            </section>

            <section className="grid gap-6 md:grid-cols-2">
              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Personal Notes</h3>
                <p className="text-sm text-muted-foreground">Private logs and ongoing research notes.</p>
              </div>
              <div className="p-6 border rounded-xl hover:shadow-md transition-shadow">
                <h3 className="font-medium mb-2">Private Gallery</h3>
                <p className="text-sm text-muted-foreground">Photos and media from personal travels and events.</p>
              </div>
            </section>
          </main>

          <footer className="mt-24 pt-8 border-t text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsAuthorized(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Lock Session
            </Button>
          </footer>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 selection:bg-primary/10">
        <div className="w-full max-w-[280px] space-y-12">
          <div className="space-y-1">
            <h1 className="text-lg font-medium tracking-tight italic">entry</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
              personal archive
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="relative">
              <input
                type="text"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={4}
                value={sequence}
                onChange={handleInputChange}
                className={`w-full text-left text-2xl tracking-[0.4em] py-2 bg-transparent border-b focus:outline-none transition-all font-mono ${
                  error 
                    ? 'border-destructive text-destructive' 
                    : 'border-foreground/20 focus:border-foreground/60'
                }`}
                placeholder="••••"
                autoFocus
                required
              />
              {error && (
                <div className="absolute -bottom-6 left-0">
                  <p className="text-destructive text-[10px] uppercase tracking-widest font-medium">
                    incorrect
                  </p>
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="text-[11px] uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors flex items-center gap-2"
            >
              Continue <span>—&gt;</span>
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
