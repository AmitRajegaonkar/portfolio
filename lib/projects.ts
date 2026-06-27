export interface Project {
  slug: string;
  title: string;
  outcome: string;
  description: string;
  problem: string;
  whatIBuilt: string;
  whatILearned: string;
  stack: string[];
  status: string;
  timeline: string;
  role: string;
  images: string[];
  /** Optional YouTube/Vimeo demo URLs — shown on the project detail page. */
  videos?: string[];
  /** Optional GitHub repo URL — shown as an icon link on the project card. */
  github?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "macropad",
    title: "BLOKY — Your Workflow Partner",
    outcome: "22+ orders fulfilled, active revenue",
    description:
      "A creator-focused workflow device with 9 mechanical keys, 3 knobs, and dynamic per-app layer switching — plus a companion app. Designed, manufactured, and sold to paying customers.",
    problem:
      "Creative work shouldn't require hundreds of repetitive clicks and constant context switching. Most macropads only map shortcuts — they don't help you stay in flow or switch between completely different work contexts. I wanted one device that understood what you were working on and adapted to it automatically.",
    whatIBuilt:
      "Bloky is a creator-focused workflow device with 9 programmable mechanical keys, 3 rotary knobs, and dynamic layer switching that automatically changes the entire keymap based on your active application. Not just a shortcut pad — a complete productivity ecosystem.\n\nThe companion app extends the hardware: dynamic layers switch automatically per application, a workflow launcher lets you open your entire toolset with one button press, and an OSD overlay shows exactly what each key does in real time so there's no memorising layouts.\n\nBuilt end-to-end: RP2040 firmware in C, custom PCB in KiCad, enclosure designed in Fusion 360 and 3D printed in-house, companion app built alongside the firmware. 22+ units shipped to paying customers.",
    whatILearned:
      "The first PCB had a trace routing mistake I didn't catch until 10 boards were already printed. Scrapped all of them.\n\nLayer switching worked perfectly on my desk. First customer reported it wasn't registering half the time. Turned out to be a debounce timing issue that only appeared under real usage patterns I never tested.\n\nThe enclosure fit perfectly in Fusion 360. In real PLA it was 0.3mm too tight and the PCB wouldn't seat. Third revision fixed it.\n\nI underestimated how much time packaging and shipping takes. First 5 orders took me an entire day. Now I've systemised it to under 2 hours for 10 orders.\n\nThe rotary knobs felt great in my hands. Three customers said they felt loose. Same hardware — completely different perception. That taught me more about user testing than any course.\n\nThe companion app introduced a new failure mode I didn't expect — the layer switching logic that worked perfectly in firmware broke when the app tried to override it simultaneously. Two systems controlling the same state is always a synchronisation problem waiting to happen.\n\nFirmware is the easy part. Manufacturing consistency, customer expectations, software-hardware state synchronisation, and actually getting the product to someone's desk without damage — that's where hardware gets hard.",
    stack: ["RP2040", "C", "Fusion 360", "3D Printing", "KiCad", "Companion App"],
    status: "Active Business",
    timeline: "2025 — ongoing",
    role: "Sole Builder — firmware, hardware, manufacturing, sales",
    images: [
      "/imgs/BLOKY/1.jpg",
      "/imgs/BLOKY/2.jpeg",
      "/imgs/BLOKY/3.jpg",
      "/imgs/BLOKY/4.jpg",
      "/imgs/BLOKY/5.jpg",
    ],
    videos: [
      "https://www.youtube.com/watch?v=LwpTli61jWA",
      "https://www.youtube.com/watch?v=6WICJG6bfh4",
    ],
    github: "https://www.amarklab.in", // paste GitHub repo link here
    featured: true,
  },
  {
    slug: "mp-police",
    title: "Face Recognition System — MP Police",
    outcome: "Production-ready prototype validated by MP Police stakeholders",
    description:
      "An automated identity verification system built on a Raspberry Pi, validated directly with MP Police stakeholders.",
    problem:
      "Manual criminal identity verification is slow, inconsistent, and dependent on individual officer memory. MP Police needed an automated face recognition system that could run on affordable deployable hardware — not cloud GPUs — and slot into workflows already in use without requiring infrastructure overhaul.",
    whatIBuilt:
      "A Raspberry Pi-based face recognition pipeline using OpenCV and dlib — enrollment, live detection, confidence-scored matching against a stored database, and a verification interface designed around how the department actually works. Built to run entirely on-device with no internet dependency, so it could operate in environments where cloud connectivity isn't guaranteed. Presented and validated in a live demonstration to MP Police officials.",
    whatILearned:
      "Lab accuracy is a lie. In a clean room with good lighting my matching was near-perfect. In real corridor conditions — bad angles, people walking past, inconsistent lighting — false negatives spiked immediately. I had to add face-alignment preprocessing and retune the confidence threshold against real footage, not test images. That gap between lab performance and field performance was the most important thing I learned.\n\nThe second lesson was specific to government stakeholders — the demo matters as much as the model. Showing a clear honest accuracy number under bad conditions earned more trust than a polished number that fell apart on camera. I stopped optimising for best-case accuracy and started optimising for consistent explainable performance. That shift changed how I think about building for real deployment versus building for a demo.",
    stack: ["Raspberry Pi", "Python", "OpenCV", "dlib", "face-recognition", "NumPy"],
    status: "Production-ready Prototype",
    timeline: "2024 - 2025",
    role: "Hardware design, Prototyping and Deployment",
    images: [
      "/imgs/MP PILICE/1.png",
      "/imgs/MP PILICE/2.jpg",
      "/imgs/MP PILICE/3.png",
    ],
    videos: [
      "https://www.youtube.com/watch?v=f65qSEVRlbc",
      "https://www.youtube.com/watch?v=3kfNwn2S5Nk",
    ],
    github: "https://github.com/AmitRajegaonkar/SIH", // paste GitHub repo link here
    featured: true,
  },
  {
    slug: "rfid-system",
    title: "RFID College Management System",
    outcome: "Live system used daily by college staff",
    description:
      "An ESP32 + RFID attendance and tracking system running live at Vishwaniketan Institute, used by staff every day.",
    problem:
      "Manual tracking at Vishwaniketan Institute was slow and error-prone — attendance, library, fees, and student records all managed separately with no unified system. Students had no single place to access college-related information. I noticed the gap and built the infrastructure to close it.",
    whatIBuilt:
      "A battery-powered ESP32 RFID reader at each entry point communicating over MQTT to a Node.js backend with records stored in SQL and a real-time dashboard for staff. Tap a card — it's logged, looked up, and surfaced instantly. Deployed and running daily for attendance, library management, and fee tracking through a single unified platform accessible with one tap. It's been running long enough that the staff stopped thinking about it — which is exactly what good infrastructure should do.",
    whatILearned:
      "Reliability beats features when something runs every day. My first version dropped reads whenever campus WiFi hiccupped — and a dropped tap means an angry person standing at a door. I added a local queue on the ESP32 so events buffer on-device and re-sync automatically when connection returns. That single change is the difference between a demo and something people actually trust.\n\nI also underestimated power. A cheap USB adapter was browning out one reader intermittently — which looked exactly like a software bug for two full days before I thought to measure the voltage rail. Hardware always finds a new way to humble you.",
    stack: ["ESP32", "RFID", "MQTT", "Node.js", "SQL", "REST APIs"],
    status: "Deployed",
    timeline: "2023 — 2024",
    role: "Sole Developer",
    images: [
      "/imgs/INSTITUTE MANGAGEMENT/1.png",
      "/imgs/INSTITUTE MANGAGEMENT/2.jpeg",
      "/imgs/INSTITUTE MANGAGEMENT/3.jpg",
      "/imgs/INSTITUTE MANGAGEMENT/4.jpg",
    ],
    videos: ["https://www.youtube.com/watch?v=yXRm09KZ-aM"],
    github: "https://github.com/AmitRajegaonkar/sarvalink", // paste GitHub repo link here
    featured: true,
  },
  {
    slug: "mall-assistant",
    title: "Smart Mall Navigation Assistant",
    outcome: "End-to-end hardware + software prototype",
    description:
      "A hardware navigation assistant that helps shoppers find products in large malls, combining ESP32 hardware with an LLM-powered query layer.",
    problem:
      "Shoppers in large malls waste time finding products and staff can't answer every query. Existing navigation solutions are either expensive digital signage or paper maps that go out of date. No affordable intelligent hardware solution existed at the store level.",
    whatIBuilt:
      "A Raspberry Pi-based handheld and kiosk unit running a local LLM pipeline at the edge. OpenAI Whisper captures the user's voice query, converts it to text, and passes it to a constrained Gemini-powered intent parser that extracts what the user wants. The actual product location, recommendations, and information are served from a local structured database — not from the LLM directly. The hardware stays cheap and deployable. The intelligence lives inside.",
    whatILearned:
      "An LLM is great at language and terrible at being a source of truth. Early on I let Gemini answer location questions directly — it confidently invented aisles that didn't exist. The fix was constraint: the LLM parses intent only, then I look the actual location up in my own verified data store. Never trust a language model to remember where the cereal is.\n\nLatency is a UX feature. A two second round-trip feels broken on a kiosk where someone is standing and waiting. I added local caching for common queries which cut response time dramatically for the 20% of questions that cover 80% of real usage.\n\nGood hardware UX is mostly about hiding complexity. The user sees a device that listens and answers. They don't see the Whisper transcription, intent parsing, database lookup, and response formatting happening in under a second. Making all of that invisible is the actual engineering challenge.",
    stack: ["Raspberry Pi", "OpenAI Whisper", "Gemini API", "Python", "Node.js", "ESP32"],
    status: "Prototype",
    timeline: "2024 - 2025",
    role: "Sole Builder",
    images: [
      "/imgs/MALLBOT/1.jpg",
      "/imgs/MALLBOT/2.jpg",
    ],
    videos: ["https://youtube.com/shorts/jWcWz5S0oS0?feature=share"],
    github: "https://github.com/AmitRajegaonkar/bazaarbot", // paste GitHub repo link here
    featured: false,
  },
  {
    slug: "3d-printer",
    title: "DIY FDM 3D Printer",
    outcome: "Still printing Amarklab product parts today",
    description:
      "A from-scratch FDM 3D printer, fully tuned for my own use, that still produces production parts for my hardware business.",
    problem:
      "Manufacturing costs for hardware prototypes were too high. I needed a printer I could tune completely for my use case.",
    whatIBuilt:
      "A complete FDM printer built around RAMPS 1.4 and Marlin, with a frame and several printed components I modeled in Fusion 360. I tuned the firmware end to end — steps/mm, acceleration, PID for the hotend, and the slicer profiles — for the specific parts my business needs. It is not pretty, but it earns its keep.",
    whatILearned:
      "Building the machine taught me more than any course. First-layer adhesion humbled me for a week until I learned to trust a measured nozzle gap over feel. PID-tuning the hotend by hand made thermal control real instead of theoretical. And I learned the unglamorous truth of hardware: 80% of 'printing problems' are mechanical — a loose belt, a worn nozzle, a slightly skewed gantry — not code. Now when a print fails I check the physical world first.",
    stack: ["RAMPS 1.4", "Marlin", "Fusion 360", "C"],
    status: "Active",
    timeline: "2025 — ongoing",
    role: "Sole Builder",
    images: [
      "/imgs/3D PRINTER/1.png",
      "/imgs/3D PRINTER/2.jpeg",
    ],
    videos: [
      "https://www.youtube.com/watch?v=4C1tLUDOt28",
      "https://www.youtube.com/watch?v=92R1-NDQa0o",
    ],
    github: "", // paste GitHub repo link here
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const idx = projects.findIndex((p) => p.slug === slug);
  return projects[(idx + 1) % projects.length];
}
