import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    dateofbirth: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/backend/get_student_profile.php");
      console.log(response.data);
      setProfile({
        firstname: response.data.FirstName,
        lastname: response.data.LastName,
        dateofbirth: response.data.DateOfBirth,
        gender: response.data.Gender,
        email: response.data.Email,
        phone: response.data.Phone,
        address: response.data.Address,
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to log in", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post("/backend/update_student_profile.php", profile);
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1>Profile</h1>
      <Form>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={profile.firstname}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateofbirth"
                value={profile.dateofbirth}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                readOnly={!isEditing}
              />
            </Form.Group>
            {isEditing ? (
              <>
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                disabled={loading}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </Form>
    </Container>
  );
};

export default Profile;
