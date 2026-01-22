"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize2 } from "lucide-react";
import { useOS } from "@/context/OSContext";

interface WindowProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isActive: boolean;
    isMinimized: boolean;
    zIndex: number;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    children,
    isActive,
    isMinimized,
    zIndex,
}) => {
    const { closeWindow, minimizeWindow, focusWindow } = useOS();
    const constraintsRef = useRef(null);

    if (isMinimized) return null;

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onMouseDown={() => focusWindow(id)}
            style={{ zIndex, position: "absolute", top: 100, left: 100 }}
            className={`rounded-xl overflow-hidden shadow-2xl bg-[#1c1c1e] border border-[#3e3e3e] w-[800px] h-[500px] flex flex-col ${isActive ? "shadow-2xl ring-1 ring-[#5c5c5e]" : "shadow-lg"
                }`}
        >
            {/* Title Bar */}
            <div
                className="h-10 bg-[#28282b] flex items-center justify-between px-4 select-none cursor-default"
                onDoubleClick={() => { }}
            >
                <div className="flex gap-2 group">
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f57] flex items-center justify-center text-black/50"
                    >
                        <X size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                        className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2f] flex items-center justify-center text-black/50"
                    >
                        <Minus size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                    <button
                        className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#28c940] flex items-center justify-center text-black/50"
                    >
                        <Maximize2 size={8} className="opacity-0 group-hover:opacity-100" />
                    </button>
                </div>
                <div className="text-gray-400 text-sm font-medium">{title}</div>
                <div className="w-14" /> {/* Spacer for centering */}
            </div>

            {/* Content */}
            <div className="flex-1 bg-[#1e1e1e]/95 text-white overflow-auto relative cursor-default">
                {/* Capture clicks to prevent drag from content area if needed, but framer motion drag is on parent */}
                {children}
            </div>
        </motion.div>
    );
};

export default Window;
