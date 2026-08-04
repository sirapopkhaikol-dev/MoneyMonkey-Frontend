import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Archive.css'
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Archive() {
    const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    
  return (
    <Col>
    <Card className="text-center">
      <Card.Header><Card.Title>Result</Card.Title></Card.Header>
      <Card.Body>
        <Card.Text>
        <p>จำนวนเงินที่คุณกรอกคือ Money_input บาท</p>
        </Card.Text>
        <Card.Text>
          <p>จำนวนปีที่คุณกรอกคือ Year_input ปี</p>
        </Card.Text>
        <Card.Text>
         <p>จำนวนเงินที่คุณกรอกจะเปลี่ยนเป็น Result บาท</p>
        </Card.Text>
        <Card.Text>
          <p>เปลี่ยนแปลงเป็นเงินเฟ้อ Percentage %</p>
        </Card.Text>
        <>
      <Button variant="danger" onClick={handleShow}>
        ลบข้อมูล
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ลบข้อมูล</Modal.Title>
        </Modal.Header>
        <Modal.Body>ยืนยันที่จะลบข้อมูลนี้</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="danger" onClick={handleClose}>
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
    </Col>    
  );

}

export default Archive;