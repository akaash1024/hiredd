import { useDispatch } from "react-redux";
import {
  getReceivedApplicatList,
  updateApplicationStatus,
} from "../../features/jobs/jobSlice";
import { useEffect, useState } from "react";

export const AppliedCandidatesList = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const [applications, setApplications] = useState([]);
  const [showListForm, setShowListForm] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const result = await dispatch(getReceivedApplicatList(id)).unwrap();
        setApplications(result.applications || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
    fetchJobDetails();
  }, [dispatch, id]);

  // Handle status change
  const handleStatusChange = async (appId, newStatus) => {
    console.log("Changing status for:", appId, "to:", newStatus);

    try {
      const result = await dispatch(
        updateApplicationStatus({ id: appId, applicationStatus: newStatus })
      ).unwrap();
      console.log("Update result:", result);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const statusOptions = [
    "Applied",
    "Viewed",
    "Shortlisted",
    "Interview",
    "On Hold",
    "Not Cleared",
    "Cleared",
    "Placed",
    "Rejected",
  ];

  return (
    <div className="form-overlay--appliedCandidatesection">
      <div className="appliedCandidateList--container">
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          onClick={onClose}
        >
          <img src="/x-circle.svg" alt="" />
        </div>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Email
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Resume
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {app.applicant?.name || "N/A"}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {app.applicant?.email || "N/A"}
                </td>
                <td
                  style={{ padding: "8px", border: "1px solid #ddd" }}
                  downloaded
                >
                  {app.resumeUrl ? (
                    <a
                      href={app.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      <img src="/paperclip.svg" alt="download resume" />
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <select
                    value={app.status || "Applied"}
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
