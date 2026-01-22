"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useOS } from "@/context/OSContext";
import { AppConfig } from "@/components/apps/apps-config";

interface DockProps {
    apps: AppConfig[];
}

const Dock: React.FC<DockProps> = ({ apps }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 pb-2 pt-2 h-[75px] bg-white/20 backdrop-blur-xl border border-white/10 rounded-2xl flex items-end gap-3 z-50 shadow-2xl">
            {apps.map((app) => (
                <DockIcon key={app.id} app={app} mouseX={mouseX} />
            ))}
        </div>
    );
};

const DockIcon = ({ app, mouseX }: { app: AppConfig; mouseX: any }) => {
    const { openWindow, windows, minimizeWindow, restoreWindow, focusWindow } = useOS();
    const ref = React.useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    // Check if window exists and its state
    const windowState = windows.find((w) => w.id === app.id);
    const isOpen = !!windowState;
    const isMinimized = windowState?.isMinimized;
    // Check if it's the top-most window
    const isActive = windowState && windowState.zIndex === Math.max(...windows.map(w => w.zIndex));

    const handleClick = () => {
        if (!isOpen) {
            openWindow(app.id, app.title, app.component, app.icon);
        } else if (isMinimized) {
            restoreWindow(app.id);
        } else if (isActive) {
            minimizeWindow(app.id);
        } else {
            focusWindow(app.id);
        }
    };

    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="flex flex-col items-center gap-1 group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    className="absolute -top-12 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md border border-white/10 whitespace-nowrap z-50 pointer-events-none"
                >
                    {app.title}
                </motion.div>
            )}

            <motion.div
                ref={ref}
                style={{ width, height: width }}
                className="rounded-xl bg-gray-600/50 shadow-lg cursor-pointer relative flex items-center justify-center overflow-hidden hover:bg-white/10 transition-colors"
                onClick={handleClick}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
            >
                {/* Fallback Icon if no image */}
                <div className="text-white text-2xl flex items-center justify-center w-full h-full p-2">
                    {app.icon}
                </div>
            </motion.div>
            <div className={`w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    );
};

export default Dock;
