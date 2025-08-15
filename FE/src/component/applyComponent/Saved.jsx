import { useSelector } from "react-redux";

const Card = ({ info }) => {
  return (
    <div className="card job-card">
      <h3 className="job-company">{info.company}</h3>
      <h4 className="job-title">{info.title}</h4>
      <p className="job-location">📍 {info.location}</p>

      <p className="job-description">{info.description}</p>

      <div className="job-meta">
        <span className="job-type">Type: {info.jobType}</span>
        <span className="job-status">Status: {info.status}</span>
      </div>

      <div className="posted-by">
        <small>
          Posted by: {info.createdBy.name} ({info.createdBy.email})
        </small>
      </div>
    </div>
  );
};

export const Saved = () => {
  const { jobs } = useSelector((state) => state.jobs);
  return (
    <div className="hire-mainSection--container grid grid_Col_Four">
      {jobs.map((job) => (
        <Card key={job._id} info={job} />
      ))}
    </div>
  );
};
