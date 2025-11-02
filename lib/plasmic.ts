import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_PROJECT_ID || "placeholder",
      token: process.env.PLASMIC_PROJECT_API_TOKEN || "placeholder",
    },
  ],
  preview: process.env.NODE_ENV !== "production",
});

