import { useDispatch, useSelector } from "react-redux";
import { applyJob, fetchJobs } from "../../features/jobs/jobSlice";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Card = ({ info }) => {
  const dispatch = useDispatch();

  const handleJobApply = async (jobId) => {
    try {
      const result = await dispatch(applyJob(jobId)).unwrap();
      console.log("vacany jsx", result);
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message || "Job Applying failed");
    }
  };

  

  const handleJobSave = (e) => {
    try {
    } catch (error) {}
  };
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
          <div
            className="btn"
            style={{
              height: ".1rem",
              width: ".5rem",
              display: "flex",
              gap: ".2rem",
            }}
          >
            <button
              style={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "10%",
                backgroundColor: "var(--accent-color)",
              }}
              onClick={() => handleJobApply(info._id)}
            >
              Apply
            </button>
            <button
              style={{
                height: "100%",
                width: "100%",
                fontSize: "1rem",
                borderRadius: "10%",
              }}
              onClick={() => handleJobSave(info._id)}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <p className="job-description">{info.description}</p>
    </div>
  );
};

export const Vacancy = () => {
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.jobs);
  const { currentVacantJobs } = useAuth();

  useEffect(() => {
    dispatch(fetchJobs());
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

  return (
    <div className="hire-mainSection--container grid grid_Col_Four">
      {currentVacantJobs.map((job) => (
        <Card key={job._id} info={job} />
      ))}
    </div>
  );
};
