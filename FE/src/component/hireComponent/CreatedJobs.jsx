import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJob } from "../../features/jobs/jobSlice";
import { toast } from "react-toastify";

export const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "akash",
    description: "test test test test test test test test",
    skills: "python, js",
    location: "Surat",
    salaryMin: "50000",
    salaryMax: "80000",
    company: "Ascendum KPS",
    jobType: "Full-time",
    status: "Open",
    resumeUrl: "https://example.com/resume.pdf",
  });
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.jobs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(postJob(formData)).unwrap();
      toast.success(result.message);
    } catch (error) {
      toast.error(error.message || "Posting Job Failed");
    } finally {
      setFormData({
        title: "",
        description: "",
        skills: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        company: "",
        jobType: "",
        status: "",
        resumeUrl: "",
      });
    }
  };

  return (
    <form className="hire-mainSection--container" onSubmit={handleSubmit}>
      <h2>Create New Job</h2>
      <div className="form-group-inline">
        <div className="form-group">
          <label>Position / Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Frontend Developer"
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ahmedabad"
            required
          />
        </div>
        <div className="form-group-inline">
          <div>
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="OpenAI"
          required
        />
      </div>
      <div className="form-group">
        <label>Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the role and responsibilities..."
          rows="4"
          required
        ></textarea>
      </div>

      <div className="form-group-inline">
        <div className="form-group">
          <label>Required Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, JavaScript, CSS"
            required
          />
        </div>

        <div className="form-group-inline">
          <div>
            <label>Salary Min</label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="30000"
            />
          </div>
          <div>
            <label>Salary Max</label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="60000"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="submit-btn">
        Post Job
      </button>
    </form>
  );
};
