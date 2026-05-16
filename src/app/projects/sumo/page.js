import Link from "next/link";

export default function ProjectDetailPage() {
  return (
    <main className="project-detail">
      <section className="project-detail-hero">
        <div className="project-detail-hero-copy">
          <span className="section-tag">Web Application</span>
          <h1>SuMo : Summarecon Mobility App</h1>
          <p>
            Sebuah Web Application yang dibuat untuk melakukan tracking jadwal bus universitas dan angkutan kawasan.
          </p>
          <div className="project-detail-meta">
            <div>
              <h4>Technologies Used</h4>
              <ul>
                <li>Python</li>
                <li>Vue</li>
              </ul>
            </div>
            <div>
              <h4>Key Features</h4>
              <ul>
                <li>Real-Time Shuttle & Transport Status Tracking</li>
                <li>Admin Mode</li>
                <li>Simple & Intuitive Design</li>
              </ul>
            </div>
          </div>
          <Link href="/" className="button secondary project-detail-backlink">
            Back to Home
          </Link>
        </div>

        <div className="project-detail-hero-image">
          <img src="/assets/sumo-app.svg" alt="SuMo Summarecon Mobility App preview" />
        </div>
      </section>

      <section className="project-detail-content">
        <div className="project-detail-section">
          <h2>Overview</h2>
          <p>
            SuMo is designed as a mobility dashboard for Summarecon, helping students and campus visitors track shuttle bus and area transport
            schedules in real time. The web application centralizes route updates, status indicators, and schedules with a clean interface.
          </p>
        </div>

        <div className="project-detail-section">
          <h2>Why SuMo?</h2>
          <ul>
            <li>Provides immediate visibility into shuttle availability and active routes.</li>
            <li>Empowers administrators to update schedules and transport status quickly.</li>
            <li>Delivers a simple, intuitive layout for fast access on desktop and mobile browsers.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
