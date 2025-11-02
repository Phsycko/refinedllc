/* eslint-disable @next/next/no-html-link-for-pages */
import { PlasmicCanvasHost } from "@plasmicapp/host";

export const metadata = {
  robots: "noindex, nofollow"
};

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}

