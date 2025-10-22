import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { Wallet, ListTodo, MapPin, Sparkles, Shield, Code } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FamilyHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex">Features</Button>
            <Button variant="ghost" className="hidden md:inline-flex">Privacy</Button>
            <Button variant="ghost" className="hidden md:inline-flex">Open Source</Button>
            <Button variant="hero" size="lg">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Privacy-First & Open Source</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Your Family's
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Digital Home</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Centralize finances, tasks, location safety, and essential information in one privacy-respecting platform. Enhanced by AI that understands your family's unique needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl">
                Start Free
              </Button>
              <Button variant="outline" size="xl">
                View Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">100% Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Self-Hostable</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full"></div>
            <img 
              src={heroImage} 
              alt="Family using FamilyHub together at home" 
              className="relative rounded-2xl shadow-strong w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything Your Family Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four powerful modules working together to simplify family life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={Wallet}
            title="Smart Finances"
            description="Track expenses, manage budgets, and teach kids financial literacy with built-in allowance tracking."
            gradient="hero"
          />
          <FeatureCard
            icon={ListTodo}
            title="Task Management"
            description="Assign chores, track completion, and reward family members with a gamified task system."
            gradient="accent"
          />
          <FeatureCard
            icon={MapPin}
            title="Location Safety"
            description="Privacy-first location sharing with geofencing, safe zones, and emergency alerts."
            gradient="hero"
          />
          <FeatureCard
            icon={Sparkles}
            title="AI Co-Pilot"
            description="Family-aware AI assistant that helps with budgeting, scheduling, and daily decisions."
            gradient="accent"
          />
        </div>
      </section>

      {/* Privacy Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-card rounded-3xl shadow-medium p-12 md:p-16 border border-border/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Privacy Guaranteed</span>
              </div>
              
              <h2 className="text-4xl font-bold">
                Your Data, Your Control
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Built on open-source technology with self-hosting options. Your family's data never leaves your control. No tracking, no ads, no third-party access.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">End-to-End Encryption</h4>
                    <p className="text-muted-foreground">All sensitive data encrypted at rest and in transit</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Code className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">100% Open Source</h4>
                    <p className="text-muted-foreground">Transparent code you can audit and customize</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Self-Hosted Option</h4>
                    <p className="text-muted-foreground">Run on your own servers for complete control</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
                  <span className="font-medium">Data Ownership</span>
                  <span className="text-primary font-bold">100%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
                  <span className="font-medium">Third-Party Access</span>
                  <span className="text-destructive font-bold">0%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
                  <span className="font-medium">Open Source</span>
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
                  <span className="font-medium">Self-Hostable</span>
                  <span className="text-primary font-bold">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-hero rounded-3xl p-12 md:p-16 text-center shadow-strong">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Simplify Family Life?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of families managing their lives with privacy and ease
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl">
              Get Started Free
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-xl font-bold">FamilyHub</span>
              </div>
              <p className="text-muted-foreground">
                Privacy-first family management platform
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 FamilyHub. Built with privacy and love.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
