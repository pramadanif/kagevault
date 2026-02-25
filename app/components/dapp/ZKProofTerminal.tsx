'use client';

// KAGE VAULT — ZKProofTerminal | Match landing page design system
import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ZKProofTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LOGS = [
  'Initializing Tongo ElGamal circuit...',
  'Loading Stark curve parameters...',
  'Generating range proof for balance validity...',
  'Compiling Cairo constraints...',
  'Proof generated: 0x4a3f...d91c ✓',
];

export const ZKProofTerminal: React.FC<ZKProofTerminalProps> = ({ isOpen, onClose }) => {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [verified, setVerified] = useState(false);
  const progressWidths = ['w-0', 'w-1/5', 'w-2/5', 'w-3/5', 'w-4/5', 'w-full'];

  useEffect(() => {
    if (!isOpen) {
      setVisibleLogs([]);
      setCurrentIndex(0);
      setVerified(false);
      return;
    }

    if (currentIndex >= LOGS.length) {
      setVerified(true);
      const timeout = setTimeout(onClose, 1000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setVisibleLogs((prev) => [...prev, LOGS[currentIndex]]);
      setCurrentIndex((prev) => prev + 1);
    }, 650);

    return () => clearTimeout(timeout);
  }, [currentIndex, isOpen, onClose]);

  const progressClass = useMemo(() => progressWidths[visibleLogs.length], [progressWidths, visibleLogs.length]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm p-4 sm:p-8">
      <div className="mx-auto h-full max-w-4xl rounded-2xl border border-green-500/40 bg-black flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-green-500/30 flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-green-400">ZK Prover Terminal</span>
          {verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              Proof Verified
            </span>
          )}
        </div>

        <div className="flex-1 p-4 sm:p-6 font-mono text-sm text-green-400 space-y-2 overflow-y-auto">
          {visibleLogs.map((line, index) => (
            <p key={`${line}-${index}`} className="leading-relaxed">&gt; {line}</p>
          ))}
          {!verified && <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />}
        </div>

        <div className="p-4 border-t border-green-500/30">
          <div className="h-2 rounded-full bg-green-950/80 overflow-hidden">
            <div className={`h-full bg-green-400 transition-all duration-500 ${progressClass}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZKProofTerminal;
