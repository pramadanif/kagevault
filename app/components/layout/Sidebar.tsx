'use client';

// KAGE VAULT — Sidebar | Match landing page design system
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Lock, FolderOpenDot, GitFork } from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { label: 'Vault', href: '/app/vault', icon: Lock },
  { label: 'Portfolio', href: '/app/portfolio', icon: FolderOpenDot },
  { label: 'Bridge', href: '/app/bridge', icon: GitFork },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-28 rounded-2xl border border-navy-border bg-navy-surface p-3">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-brand-blue-gray hover:text-white hover:bg-navy-border transition-colors"
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
