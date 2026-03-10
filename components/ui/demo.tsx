import SchemaCard from "@/components/ui/schema-card-with-animated-wave-visualizer";
import { Database } from "lucide-react";

const DemoOne = () => {
  return (
    <SchemaCard
      badge="Database"
      title="Schema Management"
      description="Design, optimize and maintain your database structure with powerful schema tools."
      href="#"
      meta="Visualizer"
      tags={["Schemas", "Queries", "Relations"]}
      accentColor="#7c3aed"
      imageUrl="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
      icon={Database}
      ctaLabel="Manage"
      statusLabel="Live"
    />
  );
};

export { DemoOne };
