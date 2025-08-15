// CandidateCard.jsx
const CandidateCard = ({ info }) => {
  return (
    <div className="card candidate-card">
      <h3 className="candidate-name">{info.name}</h3>
      <h4 className="candidate-headline">{info.profile.headline}</h4>

      <div className="skills">
        {info.profile.skills.map((skill, idx) => (
          <span key={idx} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>

      <p className="candidate-location">📍 {info.profile.location}</p>
    </div>
  );
};

export const Candidates = () => {
  const candidates = [
    {
      name: "John Doe",
      profile: {
        headline: "React Developer",
        skills: ["React", "Node.js", "MongoDB"],
        location: "Ahmedabad",
      },
    },
    {
      name: "Jane Smith",
      profile: {
        headline: "Full Stack Developer",
        skills: ["JavaScript", "Express", "MySQL"],
        location: "Mumbai",
      },
    },
    {
      name: "Jane Smith",
      profile: {
        headline: "Full Stack Developer",
        skills: ["JavaScript", "Express", "MySQL"],
        location: "Mumbai",
      },
    },
    {
      name: "Jane Smith",
      profile: {
        headline: "Full Stack Developer",
        skills: ["JavaScript", "Express", "MySQL"],
        location: "Mumbai",
      },
    },
  ];

  return (
    <div className="hire-mainSection--container grid grid_Col_Four">
      {candidates.map((c, idx) => (
        <CandidateCard key={idx} info={c} />
      ))}
    </div>
  );
};
