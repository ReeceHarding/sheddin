export interface ProcessStep {
  id: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  deliverables: string[];
  customerDeliverables: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: "1",
    title: "Design Your Studio",
    duration: "15-30 minutes",
    description: "Use our 3D Design Center to create your perfect Troo Solutions. Choose your model, size, and customize with colors and options.",
    image: "/images/process/design.jpg",
    deliverables: ["3D Design", "Price Quote"],
    customerDeliverables: []
  },
  {
    id: "2",
    title: "Project Planning",
    duration: "1-2 weeks",
    description: "Schedule a consultation with our team to review your design, site requirements, and project timeline.",
    image: "/images/process/planning.jpg",
    deliverables: ["Site Plan", "Project Timeline"],
    customerDeliverables: ["Property Survey", "Site Photos"]
  },
  {
    id: "3",
    title: "Permitting",
    duration: "2-8 weeks",
    description: "Our team will help navigate the permitting process with your local jurisdiction.",
    image: "/images/process/permit.jpg",
    deliverables: ["Permit Documents", "Engineering Plans"],
    customerDeliverables: ["Signed Documents"]
  },
  {
    id: "4",
    title: "Site Preparation",
    duration: "1-2 weeks",
    description: "Prepare your site with a proper foundation and utilities according to your approved plans.",
    image: "/images/process/preparation.jpg",
    deliverables: ["Foundation Guidelines"],
    customerDeliverables: ["Site Preparation"]
  },
  {
    id: "5",
    title: "Installation",
    duration: "3-5 days",
    description: "Our certified installation team will assemble your Troo Solutions on site.",
    image: "/images/process/installation.jpg",
    deliverables: ["Completed Studio", "Final Inspection"],
    customerDeliverables: ["Site Access"]
  }
];