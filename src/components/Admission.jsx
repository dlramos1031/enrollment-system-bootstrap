import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Admission() {
  const [admissionInfo, setAdmissionInfo] = useState({
    department: '',
    degreeProgram: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdmissionInfo({ ...admissionInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Handle form submission
    setLoading(true);
    try {
      // Simulate submission
      setTimeout(() => {
        setLoading(false);
        alert('Application submitted successfully!');
      }, 2000);
    } catch (error) {
      console.error('Failed to submit application', error);
      setLoading(false);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <Container>
      <h1>Admission</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Select
            name="department"
            value={admissionInfo.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            <option value="ict">Department of Information and Communications Technology</option>
            {/* Add more options as needed */}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Degree Program</Form.Label>
          <Form.Select
            name="degreeProgram"
            value={admissionInfo.degreeProgram}
            onChange={handleChange}
          >
            <option value="">Select Degree Program</option>
            <option value="it">Information Technology</option>
            <option value="cs">Computer Science</option>
            <option value="ds">Data Science</option>
            <option value="tcm">Technology Communication Management</option>
            {/* Add more options as needed */}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Apply'}
        </Button>
      </Form>
    </Container>
  );
}

export default Admission;
