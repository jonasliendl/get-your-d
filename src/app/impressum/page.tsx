import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice (Impressum) of the website Get your D.',
  robots: { index: false, follow: false },
};

export default function ImpressumPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Legal Notice (Impressum)</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
        <p className="text-muted-foreground">[Vorname Nachname]</p>
        <p className="text-muted-foreground">[Straße Hausnummer]</p>
        <p className="text-muted-foreground">[PLZ Ort]</p>
        <p className="text-muted-foreground">[Land]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
        <p className="text-muted-foreground">E-Mail: [ihre@email.de]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Haftungsausschluss</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Die auf dieser Website bereitgestellten Informationen und Berechnungen dienen
          ausschließlich zu allgemeinen Informationszwecken und ersetzen keine medizinische
          Beratung, Diagnose oder Behandlung. Konsultieren Sie bei gesundheitlichen Fragen oder
          vor der Einnahme von Nahrungsergänzungsmitteln stets einen qualifizierten Arzt oder
          medizinischen Fachmann. Der Betreiber dieser Website übernimmt keine Haftung für
          Schäden, die aus der Verwendung der bereitgestellten Informationen entstehen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Urheberrecht</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
          unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>

      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
      >
        ← Back to calculator
      </Link>
    </main>
  );
}
