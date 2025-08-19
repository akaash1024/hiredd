

export const JobPortalDashboard = () => {
  return (
    <main id="main">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          Right place to get <span className="highlight">placed.</span>
        </h1>
        <h4 className="hero-subtitle">
          Connect with top companies and kickstart your career
        </h4>

        <div style={{ maxWidthy: "140rem" }}>
          <img
            className="hero-image"
            src="https://raw.githubusercontent.com/piyush-eon/job-portal/refs/heads/master/public/banner.jpeg"
            alt="hero"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <h2 className="feature-text">
          Discover thousands of jobs, personalized recommendations, and career
          resources to help you grow.
        </h2>
        <div className="feature-images">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="feature"
          />
        </div>
      </section>

      {/* Multi-feature Cards */}
      <section className="cards-section">
        {[
          {
            src: "./jobsearch.jpg",
            title: "Search Jobs Easily",
          },
          {
            src: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=800&q=80",
            title: "Connect With Top Companies",
          },
          {
            src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
            title: "Get Career Guidance",
          },
          {
            src: "/interviewPrep.jpg",
            title: "Prepare for Interviews",
          },
        ].map((card, index) => (
          <div className="card" key={index}>
            <img src={card.src} alt={card.title} />
            <h3>{card.title}</h3>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="testimonial-section">
        <h2>What Our Users Are Saying</h2>
        <div className="testimonial-boxes">
          {[1, 2, 3].map((t) => (
            <div className="testimonial" key={t}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/616/616489.png"
                alt="rating"
                className="rating"
              />
              <p>
                “This job portal helped me land my dream role within weeks! The
                application process is smooth and the career resources are
                incredibly helpful. Highly recommend to anyone looking for their
                next opportunity.”
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
