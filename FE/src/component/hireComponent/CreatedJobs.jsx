import { useState } from "react";

export const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    company: "",
    jobType: "Full-time",
    status: "Open",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
      salaryRange: {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
      },
    };

    console.log("Job Data:", payload);
    // Call API here
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
