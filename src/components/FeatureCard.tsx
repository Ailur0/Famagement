import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: "hero" | "accent";
}

export const FeatureCard = ({ icon: Icon, title, description, gradient = "hero" }: FeatureCardProps) => {
  const gradientClass = gradient === "hero" ? "bg-gradient-hero" : "bg-gradient-accent";
  
  return (
    <Card className="border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 group">
      <CardContent className="p-6 space-y-4">
        <div className={`w-12 h-12 rounded-lg ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};
