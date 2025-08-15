import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);

  if (!currentUser) {
    return <h2>Loading user info...</h2>;
  }

  const { name, avatar, role, profile } = currentUser;
  const { headline, bio, skills, location } = profile || {};

  return (
    <div className="user-info" style={{ display: "flex" }}>
      <img
        src={avatar}
        alt={name}
        style={{
          width: "7rem",
          height: "7rem",
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: "0.5rem",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        <h2> {name}</h2>
        {headline && <p>{headline}</p>}
      </div>
      {bio && (
        <p>
          <strong>Bio:</strong> {bio}
        </p>
      )}
      {role && (
        <p>
          <strong>Role:</strong> {role}
        </p>
      )}
      {location && (
        <p>
          <strong>Location:</strong> {location}
        </p>
      )}
      {skills?.length > 0 && (
        <p>
          <strong>Skills:</strong> {skills.join(", ")}
        </p>
      )}
    </div>
  );
};
