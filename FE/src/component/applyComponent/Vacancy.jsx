import { useSelector } from "react-redux";

const Card = ({ info }) => {
  return (
    <div className="card job-card">
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className="form-group">
          <h3 className="job-company">{info.company}</h3>
          <h4 className="job-title">{info.title}</h4>
          <p className="job-location">📍 {info.location}</p>
        </div>
        <div className="form-group">
          <span className="job-type">Type: {info.jobType}</span>
          <span className="job-status">Status: {info.status}</span>
          <div className="btn" style={{ height: ".1rem", width: ".5rem", }}>
            <button style={{ height: "100%", width: "100%", fontSize:"1rem", borderRadius:"10%"}}>Apply</button>
          </div>
        </div>
      </div>

      <p className="job-description">{info.description}</p>

      <div className="posted-by">
        <small>
          Posted by: {info.createdBy.name} ({info.createdBy.email})
        </small>
      </div>
    </div>
  );
};

export const Vacancy = () => {
  const { jobs } = useSelector((state) => state.jobs);
  return (
    <div className="hire-mainSection--container grid grid_Col_Four">
      {jobs.map((job) => (
        <Card key={job._id} info={job} />
      ))}
    </div>
  );
};
