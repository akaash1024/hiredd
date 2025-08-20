import { useDispatch } from "react-redux";
import { getListedJobs, updateJobStatus } from "../../features/jobs/jobSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { AppliedCandidatesList } from "./AppliedCandidatesList";

export const ListedJobs = () => {
  const dispatch = useDispatch();
  const [listedJobs, setListedJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await dispatch(getListedJobs()).unwrap();
        setListedJobs(result);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      // Call thunk to update in backend
      await dispatch(
        updateJobStatus({ id: jobId, status: newStatus })
      ).unwrap();

      // Update local state immediately
      setListedJobs((prev) =>
        prev.map((job) =>
          job._id === jobId ? { ...job, status: newStatus } : job
        )
      );

      toast.success("Job status updated!");
    } catch (err) {
      toast.error("Failed to update job status");
      console.error(err);
    }
  };

  const handleShowModal = (jobId) => {
    setShowModal(true);
    setCurrentJobId(jobId);
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Company
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Title
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Location
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Type</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {listedJobs.map((job) => (
              <tr key={job._id}>
                <td
                  style={{ padding: "8px", border: "1px solid #ddd" }}
                  onClick={() => handleShowModal(job._id)}
                >
                  {job.company}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {job.title}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {job.location}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {job.jobType}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <select
                    value={job.status}
                    onChange={(e) =>
                      handleStatusChange(job._id, e.target.value)
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AppliedCandidatesList
          onClose={() => setShowModal(false)}
          id={currentJobId}
        />
      )}
    </>
  );
};
