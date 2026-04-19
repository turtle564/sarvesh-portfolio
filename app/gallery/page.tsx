import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery — Sarvesh Sajan Pottangadi",
  description: "On-track moments from the UAE RMC Championship and Abu Dhabi Sports Council DD2 series.",
};

export default function GalleryPage() {
  return <GalleryClient />;
}
