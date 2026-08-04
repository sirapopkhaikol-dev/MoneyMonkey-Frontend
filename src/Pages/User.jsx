import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Archive.css";

export const User = () => {
    const [show, setShow] = useState(false);
    const [results, setResults] = useState([]);  // State to store fetched results
    const [loading, setLoading] = useState(true);  // Loading state
    const [deleteId, setDeleteId] = useState(null);  // Correctly define the state for deleteId

    // Show the modal
    const handleShow = (id) => {
        setDeleteId(id); // Store the id of the item to delete
        setShow(true);
    };

    // Close the modal
    const handleClose = () => setShow(false);

    // Delete the result from database and frontend
    const handleDelete = () => {
        console.log("Delete ID:", deleteId);
        if (deleteId) {
            // Make API call to delete the result
            fetch(`http://localhost:5000/app/results/${deleteId}`, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Result deleted successfully") {
                        // Filter out the deleted result from the state
                        setResults(results.filter(result => result._id !== deleteId));
                    }
                    setShow(false); // Close the modal
                })
                .catch((error) => {
                    console.error("Error deleting result:", error);
                });
        }
    };

    useEffect(() => {
        // Get email from localStorage
        const userEmail = localStorage.getItem("useremail");

        if (userEmail) {
            // Fetch the results from the backend API
            fetch(`http://localhost:5000/app/results?email=${userEmail}`)
                .then((response) => response.json())
                .then((data) => {
                    setResults(data);  // Set the results in state
                    setLoading(false);  // Set loading to false once data is fetched
                })
                .catch((error) => {
                    console.error("Error fetching results:", error);
                    setLoading(false);  // Set loading to false if error occurs
                });
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Show loading text while data is being fetched
    }

    return (
        
        <div style={{ padding: "20px", display: "block", justifyContent: "center", alignItems: "center", height: "100vh", marginTop: "80px" }}>
            <Container>
                <Row xs={1} sm={2} md={2} lg={3} className="g-4 justify-content-center">
                    {/* Map through results and display them in cards */}
                    {results.map((result, index) => (
                        <Col key={index} className="d-flex justify-content-center">
                            <Card className="text-center" style={{ maxWidth: "300px" ,maxHeight: "500px", margin: "10px" }}>
                                <Card.Header>
                                    <Card.Title>Result</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        จำนวนเงินที่คุณกรอกคือ {result.Money_input} บาท
                                    </Card.Text>
                                    <Card.Text>
                                        จำนวนปีที่คุณกรอกคือ {result.Year_input} ปี
                                    </Card.Text>
                                    <Card.Text>
                                       จำนวนเงินที่คุณกรอกจะเปลี่ยนเป็น {result.Result} บาท
                                    </Card.Text>
                                    <Card.Text>
                                        เปลี่ยนแปลงเป็นเงินเฟ้อ {result.Percentage} %
                                    </Card.Text>

                                    {/* Button to trigger modal */}
                                    <Button variant="danger" onClick={() => handleShow(result._id)}>
                                        ลบข้อมูล
                                    </Button>
                                </Card.Body>
                                <Card.Footer className="text-muted">{result.date}</Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Modal to confirm data deletion */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ลบข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>ยืนยันที่จะลบข้อมูลนี้</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        ยืนยัน
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default User;
