"use client";

import React from "react";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import { useOS } from "@/context/OSContext";
import { apps } from "@/components/apps/apps-config";
import { FinderContent, Resume } from "@/components/apps/Apps";
import { User, Folder } from "lucide-react";
import { motion } from "framer-motion";

const DesktopIcon = ({
    id,
    title,
    icon,
    onClick,
    initialPosition = { x: 0, y: 0 },
    onDragEnd
}: {
    id: string,
    title: string,
    icon: React.ReactNode,
    onClick: () => void,
    initialPosition?: { x: number, y: number },
    onDragEnd?: (pos: { x: number, y: number }) => void
}) => {
    const { windows, minimizeWindow, restoreWindow, focusWindow } = useOS();
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClick = () => {
        const windowState = windows.find((w) => w.id === id);
        const isOpen = !!windowState;
        const isMinimized = windowState?.isMinimized;
        const isActive = windowState && windowState.zIndex === Math.max(...windows.map(w => w.zIndex));

        if (!isOpen) {
            onClick(); // This calls openWindow
        } else if (isMinimized) {
            restoreWindow(id);
        } else if (isActive) {
            minimizeWindow(id);
        } else {
            focusWindow(id);
        }
    };

    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={initialPosition}
            animate={initialPosition}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
            onDragEnd={(_, info) => {
                if (onDragEnd) {
                    onDragEnd({
                        x: initialPosition.x + info.offset.x,
                        y: initialPosition.y + info.offset.y
                    });
                }
            }}
            className="flex flex-col items-center gap-1 group cursor-pointer w-24 relative"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip for Desktop Icon */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-2 top-1/2 -translate-y-1/2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md border border-white/10 whitespace-nowrap z-50 pointer-events-none"
                >
                    {title}
                </motion.div>
            )}

            <div className="w-16 h-16 flex items-center justify-center transition-transform hover:scale-105">
                {typeof icon !== 'string' ? icon : <span className="text-4xl">{icon}</span>}
            </div>
            <span className="text-white text-sm font-medium drop-shadow-md bg-black/20 px-2 rounded-md group-hover:bg-blue-500/50 transition-colors">
                {title}
            </span>
        </motion.div>
    );
}

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Desktop = () => {
    const { windows, openWindow } = useOS();
    const [iconPositions, setIconPositions] = React.useState<Record<string, { x: number; y: number }>>({});
    const [isLoaded, setIsLoaded] = React.useState(false);

    const containerRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLHeadingElement>(null);
    const buttonRef = React.useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out"
            }
        )
            .fromTo(buttonRef.current,
                { scale: 0.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }, "-=0.3");

    }, { scope: containerRef });

    const handleButtonHover = () => {
        gsap.to(buttonRef.current, {
            scale: 1.05,
            boxShadow: "0px 0px 20px rgba(255,255,255,0.4)",
            duration: 0.3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    };

    const handleButtonLeave = () => {
        gsap.to(buttonRef.current, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            overwrite: true
        });
    };

    const welcomeTextRef = React.useRef<HTMLSpanElement>(null);
    const nameTextRef = React.useRef<HTMLSpanElement>(null);
    const [isExpanded, setIsExpanded] = React.useState(false);

    const handleTitleClick = () => {
        const tl = gsap.timeline();

        if (!isExpanded) {
            // Shrink "Welcome to"
            tl.to(welcomeTextRef.current, {
                scale: 0.6,
                opacity: 0.6,
                duration: 0.5,
                ease: "power2.out"
            }, 0);

            // Enlarge "Jatin Verma's Portfolio" and add glow
            tl.to(nameTextRef.current, {
                scale: 1.4,
                textShadow: "0px 0px 30px rgba(192, 132, 252, 0.8), 0px 0px 60px rgba(192, 132, 252, 0.4)",
                duration: 0.5,
                ease: "back.out(1.4)"
            }, 0);
        } else {
            // Revert
            tl.to(welcomeTextRef.current, {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, 0);

            tl.to(nameTextRef.current, {
                scale: 1,
                textShadow: "none",
                duration: 0.5,
                ease: "back.out(1.4)"
            }, 0);
        }
        setIsExpanded(!isExpanded);
    };

    const handleTitleHover = () => {
        // Optional: Add subtle hover effect if not clicked, but keeping it simple for now to avoid conflict
        gsap.to(titleRef.current, {
            scale: 1.02,
            duration: 0.3
        });
    };

    const handleTitleLeave = () => {
        gsap.to(titleRef.current, {
            scale: 1,
            duration: 0.3
        });
    };

    React.useEffect(() => {
        const saved = localStorage.getItem('desktop-icon-positions');
        if (saved) {
            try {
                setIconPositions(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse icon positions", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const handleIconDragEnd = (id: string, newPos: { x: number, y: number }) => {
        const newPositions = { ...iconPositions, [id]: newPos };
        setIconPositions(newPositions);
        localStorage.setItem('desktop-icon-positions', JSON.stringify(newPositions));
    };

    if (!isLoaded) return null; // Prevent hydration mismatch or layout shift (optional, but cleaner)

    return (
        <div className="w-screen h-screen overflow-hidden relative font-sans" ref={containerRef}>
            {/* Menu Bar */}
            <MenuBar />

            {/* Welcome Widget */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 select-none">
                <h1
                    ref={titleRef}
                    onMouseEnter={handleTitleHover}
                    onMouseLeave={handleTitleLeave}
                    onClick={handleTitleClick}
                    className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl tracking-tight cursor-pointer flex flex-col items-center"
                >
                    <span ref={welcomeTextRef} className="block origin-bottom transition-transform">
                        Welcome to
                    </span>
                    <span ref={nameTextRef} className="block origin-top transition-transform mt-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Jatin Verma
                        </span>
                        's Portfolio
                    </span>
                </h1>
                <p
                    ref={buttonRef}
                    onMouseEnter={handleButtonHover}
                    onMouseLeave={handleButtonLeave}
                    className="text-xl md:text-2xl text-gray-200 font-light tracking-wide drop-shadow-md bg-black/30 px-6 py-2 rounded-full inline-block backdrop-blur-sm cursor-pointer"
                >
                    Explore my digital workspace
                </p>
            </div>

            {/* Desktop Icons Area */}
            <div className="absolute top-12 right-6 flex flex-col gap-8 z-10 items-end">
                <DesktopIcon
                    id="finder"
                    title="Jatin's Files"
                    icon={<Folder size={32} className="text-white fill-white/20" />}
                    onClick={() => openWindow("finder", "Jatin's Files", <FinderContent />, <Folder size={24} className="text-blue-500" />)}
                    initialPosition={iconPositions['finder']}
                    onDragEnd={(pos) => handleIconDragEnd('finder', pos)}
                />

                <DesktopIcon
                    id="resume"
                    title="Resume"
                    icon={
                        <div className="w-14 h-16 bg-white rounded-lg shadow-2xl flex items-center justify-center relative">
                            <div className="absolute top-0 right-0 p-1 bg-red-500 rounded-bl-lg rounded-tr-lg"></div>
                            <span className="text-gray-800 font-bold text-xs">PDF</span>
                        </div>
                    }
                    onClick={() => openWindow("resume", "Resume", <Resume />, <User size={24} className="text-red-500" />)}
                    initialPosition={iconPositions['resume']}
                    onDragEnd={(pos) => handleIconDragEnd('resume', pos)}
                />
            </div>

            {/* Windows Layer */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Render Windows */}
                {windows.map((window) => (
                    <div key={window.id} className="pointer-events-auto">
                        <Window
                            id={window.id}
                            title={window.title}
                            isActive={window.zIndex === Math.max(...windows.map(w => w.zIndex), 0)}
                            isMinimized={window.isMinimized}
                            zIndex={window.zIndex}
                        >
                            {window.content}
                        </Window>
                    </div>
                ))}
            </div>

            {/* Dock */}
            <Dock apps={apps} />
        </div>
    );
};

export default Desktop;
