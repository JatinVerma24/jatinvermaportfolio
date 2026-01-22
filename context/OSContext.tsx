"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface WindowState {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
}

interface OSContextType {
  windows: WindowState[];
  openWindow: (id: string, title: string, content: React.ReactNode, icon?: React.ReactNode) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

export const OSProvider = ({ children }: { children: ReactNode }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [maxZIndex, setMaxZIndex] = useState(10);

  const openWindow = (id: string, title: string, content: React.ReactNode, icon?: React.ReactNode) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        if (existing.isMinimized) {
           // Restore if minimized
           return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w);
        }
        // Just focus
        return prev.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w);
      }
      return [
        ...prev,
        { id, title, content, icon, isOpen: true, isMinimized: false, zIndex: maxZIndex + 1 },
      ];
    });
    setMaxZIndex((prev) => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  };

  const restoreWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w))
    );
     setMaxZIndex((prev) => prev + 1);
  };

  const focusWindow = (id: string) => {
    setWindows((prev) => {
        const target = prev.find(w => w.id === id);
        if (!target || target.zIndex === maxZIndex) return prev; // Already on top
        return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w));
    });
     setMaxZIndex((prev) => prev + 1);
  };

  return (
    <OSContext.Provider
      value={{ windows, openWindow, closeWindow, minimizeWindow, focusWindow, restoreWindow }}
    >
      {children}
    </OSContext.Provider>
  );
};

export const useOS = () => {
  const context = useContext(OSContext);
  if (context === undefined) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
};
