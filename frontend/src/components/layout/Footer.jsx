import Container from "../common/Container";

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-16">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            EcoVision AI
          </h2>

          <p className="mt-4 text-slate-400">
            Smart Waste Segregation & Smart Recycling Assistant
          </p>

          <p className="mt-8 text-sm text-slate-500">
            © 2026 EcoVision AI. Built for the NxtWave Idea2Impact AI Hackathon.
          </p>
        </div>
      </Container>
    </footer>
  );
}
