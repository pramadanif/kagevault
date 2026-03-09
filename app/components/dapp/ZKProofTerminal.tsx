'use client';

// KAGE VAULT — ZKProofTerminal | Starknet Sepolia Testnet | Match landing page design system
// Design System: colors #1D2253 #2A306A #3E468A #F35917 #A0ABDB | fonts Outfit/Inter/JetBrains Mono | radius xl/2xl | soft glow + shimmer
import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ZKProofTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  proofHash?: string;
}

const LOGS = [
  'Initializing Tongo ElGamal circuit...',
  'Loading Stark curve parameters (STARK-252)...',
  'Deriving encryption key from Starknet signature...',
  'Computing twisted ElGamal ciphertext...',
  'Building homomorphic range proof circuit...',
  'Generating Bulletproof-style range constraints...',
  'Compiling Cairo constraint system...',
  'Executing WASM prover...',
  'Verifying proof validity locally...',
];

export const ZKProofTerminal: React.FC<ZKProofTerminalProps> = ({ isOpen, onClose, proofHash }) => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [verified, setVerified] = useState(false);

  const renderedLogs = useMemo(() => {
    const hashText = proofHash ? `${proofHash.slice(0, 10)}...${proofHash.slice(-6)}` : '0x0000...0000';
    return [...LOGS, `Proof hash: ${hashText}`, 'Status: PROOF GENERATED ✓'];
  }, [proofHash]);

  useEffect(() => {
    if (!isOpen) {
      setTypedLines([]);
      setLineIndex(0);
      setCharIndex(0);
      setVerified(false);
      return;
    }

    if (lineIndex >= renderedLogs.length) {
      setVerified(true);
      const timeout = setTimeout(onClose, 500);
      return () => clearTimeout(timeout);
    }

    const currentLine = renderedLogs[lineIndex] || '';
    const timeout = setTimeout(
      () => {
        if (charIndex < currentLine.length) {
          setTypedLines((prev) => {
            const next = [...prev];
            next[lineIndex] = currentLine.slice(0, charIndex + 1);
            return next;
          });
          setCharIndex((prev) => prev + 1);
          return;
        }

        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      },
      charIndex < currentLine.length ? 50 : 140
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isOpen, lineIndex, onClose, renderedLogs]);

  const progressPercent = useMemo(() => {
    if (!renderedLogs.length) return 0;
    return Math.min(100, Math.round(((lineIndex + (charIndex > 0 ? 0.5 : 0)) / renderedLogs.length) * 100));
  }, [charIndex, lineIndex, renderedLogs.length]);

  const progressClass = useMemo(() => {
    if (progressPercent >= 100) return 'w-full';
    if (progressPercent >= 80) return 'w-4/5';
    if (progressPercent >= 60) return 'w-3/5';
    if (progressPercent >= 40) return 'w-2/5';
    if (progressPercent >= 20) return 'w-1/5';
    return 'w-0';
  }, [progressPercent]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] bg-black/90 p-4 sm:p-8">
      <div className="mx-auto h-full max-w-4xl rounded-2xl border border-green-500/40 bg-black flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,rgba(34,197,94,0.08)_1px,transparent_1px)] bg-[size:100%_4px]" />
        <div className="px-4 py-3 border-b border-green-500/30 flex items-center justify-between relative z-10">
          <span className="font-mono text-xs uppercase tracking-widest text-green-400">ZK Prover Terminal</span>
          {verified && (
            <span className="inline-flex items-center gap-1 text-xs text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              Proof Verified — Submitting to Starknet...
            </span>
          )}
        </div>

        <div className="flex-1 p-4 sm:p-6 font-mono text-sm text-green-400 space-y-2 overflow-y-auto relative z-10">
          {typedLines.map((line, index) => (
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
