"use client";

import { registerComponent } from "@plasmicapp/host";

// Importar componentes existentes
import Header from "@/components/Header";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectsGrid from "@/components/ProjectsGrid";
import TestimonialList from "@/components/TestimonialList";
import ValueStats from "@/components/ValueStats";
import CTASection from "@/components/CTASection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import FeaturedSection from "@/components/FeaturedSection";

// Registrar Header
registerComponent(Header, {
  name: "Header",
  props: {},
  importPath: "@/components/Header"
});

// Registrar ServicesGrid
registerComponent(ServicesGrid, {
  name: "ServicesGrid",
  props: {},
  importPath: "@/components/ServicesGrid"
});

// Registrar ProcessSteps
registerComponent(ProcessSteps, {
  name: "ProcessSteps",
  props: {},
  importPath: "@/components/ProcessSteps"
});

// Registrar ProjectsGrid
registerComponent(ProjectsGrid, {
  name: "ProjectsGrid",
  props: {
    featured: {
      type: "boolean",
      defaultValue: false
    },
    limit: {
      type: "number",
      defaultValue: 3
    }
  },
  importPath: "@/components/ProjectsGrid"
});

// Registrar TestimonialList
registerComponent(TestimonialList, {
  name: "TestimonialList",
  props: {},
  importPath: "@/components/TestimonialList"
});

// Registrar ValueStats
registerComponent(ValueStats, {
  name: "ValueStats",
  props: {},
  importPath: "@/components/ValueStats"
});

// Registrar CTASection
registerComponent(CTASection, {
  name: "CTASection",
  props: {},
  importPath: "@/components/CTASection"
});

// Registrar ContactForm
registerComponent(ContactForm, {
  name: "ContactForm",
  props: {},
  importPath: "@/components/ContactForm"
});

// Registrar FeaturedSection
registerComponent(FeaturedSection, {
  name: "FeaturedSection",
  props: {},
  importPath: "@/components/FeaturedSection"
});

// Registrar Footer
registerComponent(Footer, {
  name: "Footer",
  props: {},
  importPath: "@/components/Footer"
});

