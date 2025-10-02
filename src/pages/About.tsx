import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              About{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TruthMaps
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A transparent platform for evaluating places based on their digital footprint
              across multiple trusted sources.
            </p>
          </div>

          <Card className="glass-card p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">What We Do</h2>
              <p className="text-muted-foreground leading-relaxed">
                TruthMaps aggregates publicly available links from multiple platforms to help you
                understand how well-documented and verified a place is. We don't scrape reviews or
                collect personal data - we simply show you where information exists and help you
                access it.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Our Approach</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>No Review Scraping:</strong> We respect platform terms of service and
                    link directly to sources rather than copying content.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Transparent Scoring:</strong> Our Trust Score formula is completely open.
                    It's based on platform coverage and credibility, not hidden algorithms.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>
                    <strong>Privacy First:</strong> We don't require accounts, track users extensively,
                    or sell data. Your searches stay private.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">How the Trust Score Works</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Trust Score is a simple formula that rewards coverage and credibility:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                Trust Score = Base(40) + Coverage(×10) + Brand Weights - Red Flags
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Different platforms have different weights based on their reputation and verification
                standards. For example, Michelin Guide adds +20 points, while review platforms like
                TripAdvisor and Yelp add +5 points each.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-3">Roadmap</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-muted-foreground">○</span>
                  <span>Real-time link resolution via backend service</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground">○</span>
                  <span>Deep link support for opening platform apps directly</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground">○</span>
                  <span>User accounts and saved place collections</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground">○</span>
                  <span>Android app wrapper for mobile convenience</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-muted-foreground">○</span>
                  <span>Automated red flag detection for inconsistencies</span>
                </li>
              </ul>
            </div>
          </Card>

          <div className="text-center pt-4">
            <Button asChild size="lg">
              <Link to="/">Start Exploring Places</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
