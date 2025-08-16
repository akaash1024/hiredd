import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedJobs } from "../../features/jobs/jobSlice";

const Card = ({ info }) => {
  if (!info) return null;

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
          <div className="btn" style={{ height: ".1rem", width: ".5rem" }}>
            <button
              style={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "10%",
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <p className="job-description">{info.description}</p>
    </div>
  );
};

export const Saved = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchSavedJobs());
  }, [dispatch]);

  if (status === "loading") {
    return <h2>Loading saved jobs...</h2>;
  }

  if (status === "failed") {
    return <h2>Error: {error}</h2>;
  }

  if (!jobs || jobs.length === 0) {
    return <h2>No saved jobs found</h2>;
  }

  if (status === "succeeded") {
    return (
      <div className="hire-mainSection--container grid grid_Col_Four">
        {jobs.map((job) => (
          <Card key={job._id} info={job.jobId ?? job} />
        ))}
      </div>
    );
  }
};
