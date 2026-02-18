import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function WritingPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
          <header className="mb-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-3">
              Writing
            </h1>
            <p className="font-body text-stone-500">
              Thoughts, ideas, and things I'm figuring out.
            </p>
          </header>

          <div className="py-16 text-center">
            <p className="font-body text-stone-400">
              Coming soon.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
