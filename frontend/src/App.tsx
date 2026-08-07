import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-800 p-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-eco-300">EcoSort AI</h1>
              <p className="text-slate-400">Smart waste segregation, collection, and rewards.</p>
            </div>
            <nav className="flex gap-4 text-slate-200">
              <Link to="/" className="hover:text-white">Home</Link>
              <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link to="/scan" className="hover:text-white">Scan</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<Scan />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl shadow-slate-950/40">
        <h2 className="text-4xl font-bold text-eco-200">EcoSort AI</h2>
        <p className="mt-4 max-w-2xl text-slate-300">
          A modern waste management platform for classification, collection requests, and rewards that runs in demo mode with in-memory fallbacks.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card title="Smart Scan" description="Upload waste images and get instant classification, bin guidance, and eco points." />
          <Card title="Collection Requests" description="Schedule pickups and let collectors handle waste responsibly." />
          <Card title="Rewards" description="Redeem earned points for sustainable rewards and eco perks." />
          <Card title="Community" description="Track top contributors on the leaderboard and join the green movement." />
        </div>
      </div>
    </section>
  );
}

function Dashboard() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-3xl font-semibold text-eco-200">Dashboard</h2>
        <p className="mt-2 text-slate-400">View your points, recent activity, and waste scan history.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel label="Points" value="1280" />
        <Panel label="Waste Scans" value="24" />
        <Panel label="Collected Requests" value="7" />
      </div>
    </section>
  );
}

function Scan() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h2 className="text-3xl font-semibold text-eco-200">Scan Waste</h2>
        <p className="mt-2 text-slate-400">Upload an image to classify and earn points.</p>
        <div className="mt-8 rounded-3xl border border-dashed border-slate-700 bg-slate-950 p-12 text-center text-slate-500">
          Drag & drop images here or click to upload.
        </div>
      </div>
    </section>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl shadow-slate-950/40">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-slate-400">{description}</p>
    </div>
  );
}

function Panel({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-bold text-white">{value}</p>
    </div>
  );
}

export default App;
