"use client";

import React from "react";
import { Mail, Linkedin, Github, Folder, Terminal, User, FileText } from "lucide-react";
import { useOS } from "@/context/OSContext";
// We need to be careful with circular imports if we import apps-config here
// Instead of importing 'apps', we can define the navigation logic or pass it down
// For now, let's just hardcode the IDs we know exist

export const Portfolio = () => {
    return (
        <div className="p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <a href="https://jvresultchecker.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400">JV Result Checker</h3>
                            <p className="text-gray-400 mb-4">LPU Result Checker Platform</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            <span className="mr-2">Deployed</span> |
                            <span className="ml-2 hover:underline z-10 relative" onClick={(e) => { e.stopPropagation(); window.open("https://github.com/JatinVerma24/JVRESULTCHECKER-", "_blank") }}>GitHub</span>
                        </div>
                    </div>
                </a>

                <a href="https://grader.satwaraa.dev/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors border border-gray-700 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400">Grade Master</h3>
                            <p className="text-gray-400 mb-4">Automatic Assignment Grader</p>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            <span className="mr-2">Deployed</span> |
                            <span className="ml-2 hover:underline z-10 relative" onClick={(e) => { e.stopPropagation(); window.open("https://github.com/JatinVerma24/AUTOMATIC-ASSIGNMENT-GRADER", "_blank") }}>GitHub</span>
                        </div>
                    </div>
                </a>

            </div>
        </div>
    );
};

export const Skills = () => {
    return (
        <div className="p-4 font-mono text-green-400 bg-[#1e1e1e] h-full overflow-hidden text-sm md:text-base">
            <div className="flex items-center gap-2 mb-4 text-gray-400 border-b border-gray-700 pb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm ml-2">jatin@portfolio: ~</span>
            </div>
            <p>$ neofetch</p>
            <div className="mt-2 ml-4 mb-4">
                <p><span className="text-blue-400 font-bold">Jatin Verma</span></p>
                <p>-----------</p>
                <p><span className="text-yellow-400">Role</span>: Full Stack Developer</p>
                <p><span className="text-yellow-400">Languages</span>: JavaScript, TypeScript, Python</p>
                <p><span className="text-yellow-400">Frontend</span>: React.js, Next.js, Tailwind CSS</p>
                <p><span className="text-yellow-400">Backend</span>: Node.js, Express, MongoDB</p>
                <p><span className="text-yellow-400">Tools</span>: Git, GitHub, Vercel</p>
            </div>
            <p className="animate-pulse">$ _</p>
        </div>
    );
};

export const Contact = () => {
    return (
        <div className="p-8 text-center text-white h-full flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                JV
            </div>
            <h2 className="text-3xl font-bold mb-2">Jatin Verma</h2>
            <p className="mb-6 text-gray-400 max-w-md">
                Passionate Full Stack Developer. Open to collaborations and new opportunities.
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
                <a href="mailto:jv24buisness@gmail.com" className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors border border-gray-700">
                    <Mail size={20} />
                    <span>Email Me</span>
                </a>
                <a href="https://www.linkedin.com/in/jatinverma24/" target="_blank" rel="noopener noreferrer" className="bg-[#0077b5] hover:bg-[#006396] text-white px-4 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                </a>
                <a href="https://github.com/JatinVerma24" target="_blank" rel="noopener noreferrer" className="bg-[#333] hover:bg-[#24292e] text-white px-4 py-3 rounded-xl flex items-center justify-center gap-3 transition-colors">
                    <Github size={20} />
                    <span>GitHub</span>
                </a>
            </div>
        </div>
    );
};

export const Resume = () => {
    return (
        <div className="h-full bg-white text-black p-8 overflow-y-auto font-serif">
            <div className="max-w-3xl mx-auto shadow-xl p-8 bg-white min-h-[1000px]">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-blue-900 mb-2">Jatin Verma</h1>
                        <div className="text-sm text-gray-700 space-y-1">
                            <p><span className="font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/jatinverma24/" className="text-blue-700 hover:underline">/in/jatinverma24</a></p>
                            <p><span className="font-semibold">GitHub:</span> <a href="https://github.com/JatinVerma24" className="text-blue-700 hover:underline">/JatinVerma24</a></p>
                        </div>
                    </div>
                    <div className="text-right text-sm text-gray-700 space-y-1">
                        <p className="font-semibold">Email: <a href="mailto:jv24buisness@gmail.com" className="text-blue-700">jv24buisness@gmail.com</a></p>
                        <p className="font-semibold">Mobile: 7710429424</p>
                    </div>
                </div>

                {/* Skills */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 uppercase tracking-wider">Skills</h2>
                    <div className="grid grid-cols-[150px_1fr] gap-y-2 text-sm">
                        <div className="font-semibold text-gray-700">Languages:</div>
                        <div>C++, Python, Java, JavaScript</div>

                        <div className="font-semibold text-gray-700">Frameworks:</div>
                        <div>HTML, Tailwind CSS, Node.js, React.js</div>

                        <div className="font-semibold text-gray-700">Tools/Platforms:</div>
                        <div>MongoDB, GitHub, MySQL</div>

                        <div className="font-semibold text-gray-700">Soft Skills:</div>
                        <div>Problem-Solving, Team Player, Project Management, Adaptability</div>
                    </div>
                </section>

                {/* Internship */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 uppercase tracking-wider">Internship</h2>
                    <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">Event Eye (Event startup at LPU)</h3>
                            <span className="text-sm italic text-gray-600">Jun '2025 – Jul '2025</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mb-2">Marketing Intern</div>
                        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                            <li>Result-driven brand visibility and event reach by creating high-engagement content and managing social media channels that reached 10,000+ users.</li>
                            <li>Assisted in executing digital campaigns, conducting market research on 5+ target segments.</li>
                            <li>Collaborated with the team to improve marketing performance and boost event visibility by 20-30% through data-driven strategies using Meta and Google Ads.</li>
                            <li><strong>Platform Promoted:</strong> Instagram, LinkedIn, SEO optimization.</li>
                        </ul>
                    </div>
                </section>

                {/* Projects */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 uppercase tracking-wider">Projects</h2>

                    <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">Trip Tales - Tourism Explore Site</h3>
                            <span className="text-sm italic text-gray-600">Sept '2025</span>
                        </div>
                        <div className="text-sm text-blue-700 mb-1">Django | Python NLP</div>
                        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                            <li>Developed a responsive tourism web platform that helps users explore destinations, discover events, and plan tours through a clean and intuitive UI.</li>
                            <li>Built a Python backend with NLP for multilingual tourist queries, using real-time location and climate data to deliver personalized travel recommendations.</li>
                            <li>Achieved 30% improvement in planning decision accuracy for pilot users.</li>
                        </ul>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">Real Time Land Usage Monitoring Tool</h3>
                            <span className="text-sm italic text-gray-600">Apr '2025</span>
                        </div>
                        <div className="text-sm text-blue-700 mb-1">JavaScript | CNN</div>
                        <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                            <li>Built a responsive food monitoring tool which tracks food intake of particular users.</li>
                            <li>Enabled 95% accuracy about user health ratios and provides data for proper diet.</li>
                        </ul>
                    </div>
                </section>

                {/* Achievements */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 uppercase tracking-wider">Achievements</h2>
                    <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                        <li><strong>Earned 2nd Runner-Up</strong> in the Mock Drive Placement Competition conducted by CPE, showcasing strong problem-solving and interview performance.</li>
                        <li><strong>Won 2nd Position in HACKMANTHON</strong>, a high-scale hackathon with 500+ participants, demonstrating innovation, teamwork, and technical excellence.</li>
                        <li>Held <strong>2nd Position in Startup Pitching Competition</strong> on National Space Day.</li>
                    </ul>
                </section>

                {/* Education */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 mb-3 uppercase tracking-wider">Education</h2>
                    <div className="mb-2">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-gray-900">Lovely Professional University</h3>
                            <span className="text-sm italic text-gray-600">Aug '2023 – Present</span>
                        </div>
                        <div className="text-sm text-gray-700">Bachelor of Technology in Computer Science and Engineering; CGPA: 6.4</div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export const FinderContent = () => {
    const { openWindow } = useOS();

    // We'll manually list items we want in the "All Files" folder
    // We reuse the components we already have
    const files = [
        { id: "portfolio", label: "Projects", icon: <Folder size={48} className="text-blue-500 fill-blue-500/20" />, type: "component", component: <Portfolio /> },
        { id: "skills", label: "Skills.txt", icon: <Terminal size={48} className="text-gray-400 bg-gray-800 rounded p-1" />, type: "component", component: <Skills /> },
        { id: "contact", label: "Contact.vcf", icon: <Mail size={48} className="text-blue-400" />, type: "component", component: <Contact /> },
        { id: "about", label: "About Me", icon: <User size={48} className="text-purple-400" />, type: "component", component: <div className="p-8 text-white text-center"><h1 className="text-4xl font-bold mb-4">About Me</h1><p className="text-lg text-gray-300">Hi, I'm Jatin Verma. Full Stack Developer.</p></div> },
        { id: "resume", label: "Resume.pdf", icon: <FileText size={48} className="text-red-500" />, type: "component", component: <Resume /> },
    ];

    return (
        <div className="p-6 text-white h-full bg-[#1e1e1e]">
            <h2 className="text-2xl font-bold mb-6 text-gray-200 border-b border-gray-700 pb-2">Jatin's Files</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {files.map((file) => (
                    <div
                        key={file.id}
                        className="flex flex-col items-center gap-3 group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-colors"
                        onClick={() => {
                            openWindow(file.id, file.label, file.component, file.icon);
                        }}
                    >
                        <div className="w-20 h-20 flex items-center justify-center transition-transform group-hover:scale-105">
                            {file.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{file.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
