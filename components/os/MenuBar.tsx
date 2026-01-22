"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wifi, Battery, Folder, Mail, FileText } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { useOS } from "@/context/OSContext";
import { Portfolio, Contact, Resume } from "@/components/apps/Apps";

const MenuBar = () => {
    const [time, setTime] = useState(new Date());
    const { openWindow } = useOS();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const menuItems = [
        { label: "Projects", action: () => openWindow("portfolio", "Portfolio", <Portfolio />, <Folder size={24} className="text-blue-500" />) },
        { label: "Contact", action: () => openWindow("contact", "Contact", <Contact />, <Mail size={24} className="text-blue-400" />) },
        { label: "Resume", action: () => openWindow("resume", "Resume", <Resume />, <FileText size={24} className="text-red-500" />) },
    ];

    return (
        <div className="h-8 w-full bg-[#2b0e66]/90 backdrop-blur-md text-white flex items-center justify-between px-4 text-sm z-50 fixed top-0 select-none border-b border-white/10">
            <div className="flex items-center gap-4">
                <FaApple size={18} className="text-white" />
                <span className="font-bold">Jatin Verma Portfolio</span>

                <div className="flex items-center gap-1 ml-2">
                    {menuItems.map((item) => (
                        <span
                            key={item.label}
                            onClick={item.action}
                            className="hidden sm:inline opacity-90 hover:bg-white/20 px-3 py-1 rounded transition-colors cursor-pointer font-medium"
                        >
                            {item.label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <Battery size={20} className="opacity-90" />
                <Wifi size={18} className="opacity-90" />
                <span>{format(time, "EEE d MMM h:mm aa")}</span>
            </div>
        </div>
    );
};

export default MenuBar;
