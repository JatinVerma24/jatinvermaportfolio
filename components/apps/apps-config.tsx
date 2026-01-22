"use client";

import React from "react";
import { Folder, Terminal, Mail, User, Cpu } from "lucide-react";
import { Portfolio, Skills, Contact, Resume } from "./Apps";

export interface AppConfig {
    id: string;
    title: string;
    icon: React.ReactNode;
    component: React.ReactNode;
}

export const apps: AppConfig[] = [
    {
        id: "portfolio",
        title: "Portfolio",
        icon: <Folder size={32} fill="#0d8bf2" stroke="#0d8bf2" />,
        component: <Portfolio />,
    },
    {
        id: "skills",
        title: "Skills",
        icon: <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"><Terminal size={20} className="text-white" /></div>,
        component: <Skills />,
    },
    {
        id: "about",
        title: "About Me",
        icon: <User size={32} className="text-blue-500" />,
        component: <div className="p-8 text-white text-center">
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                Hi, I'm <span className="text-blue-400 font-bold">Jatin Verma</span>.
                I'm a Full Stack Developer passionate about building robust and scalable web applications.
                I love exploring new technologies and solving complex problems.
            </p>
        </div>,
    },
    {
        id: "contact",
        title: "Contact",
        icon: <Mail size={32} className="text-blue-400" />,
        component: <Contact />,
    },
    {
        id: "resume",
        title: "Resume",
        icon: <User size={32} className="text-red-500 bg-white rounded-sm" />,
        component: <Resume />,
    },
];
