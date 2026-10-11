import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-4xl font-bold mb-4">Pagina niet gevonden</h1>
        <p className="text-muted-foreground mb-8">Deze pagina bestaat niet (meer).</p>
        <Button asChild>
          <Link href="/">Terug naar de homepage</Link>
        </Button>
      </div>
    </PageLayout>
  );
}
