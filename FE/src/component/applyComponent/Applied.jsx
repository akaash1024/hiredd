import { useDispatch, useSelector } from "react-redux";
import { fetchAppliedJobs } from "../../features/jobs/jobSlice";
import { useEffect } from "react";

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
          <div className="btn" style={{ height: ".1rem", width: "8rem" }}>
            <button
              style={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "10%",
                backgroundColor: "var(--error-color)",
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <p className="job-description">{info.description}</p>
    </div>
  );
};

export const Applied = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  if (status === "loading") {
    return <h2>Loading jobs...</h2>;
  }

  if (status === "failed") {
    return <h2>Error: {error}</h2>;
  }

  if (!jobs || jobs.length === 0) {
    return <h2>No jobs available</h2>;
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

  return null;
};
