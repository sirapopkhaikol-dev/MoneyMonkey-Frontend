import React, { useState, useEffect } from "react"; // **modified**
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export const IncomeExpense = () => {
    const [expenses, setExpenses] = useState([]); // Store added expenses
    const [showAddModal, setShowAddModal] = useState(false); // Toggle add modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // Toggle delete modal
    const [newExpense, setNewExpense] = useState({ date: "", item: "", amount: "" });
    const [deleteIndex, setDeleteIndex] = useState(null); // Store index of expense to delete
    const userEmail = localStorage.getItem("useremail");  // **added** Get logged-in user's email
    const [deleteId, setDeleteId] = useState(null);  // Correctly define the state for deleteId
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const handleShow = (id) => {
        setDeleteId(id); // Store the id of the item to delete
        setShowDeleteModal(true);
    };


    // Handle Input Changes
    const handleChange = (e) => {
        setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
    };

    // Add new expense and send to server
    const handleAddExpense = async () => {
        if (!newExpense.date || !newExpense.item || !newExpense.amount) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วน!"); // Alert if fields are empty
            return;
        }

        if (!userEmail) {
            alert("กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล!"); // Alert if user is not logged in
            return;
        }

        // Include the email in the expense data
        const expenseData = {
            ...newExpense,
            email: userEmail, // **added** Attach email to the expense data
        };

        try {
            const response = await fetch('http://localhost:5000/app/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });
            setShowAddModal(false); // Close modal
            
            // if (response.ok) {
            //     const savedExpense = await response.json(); // Assuming the server returns the saved data
            //     setExpenses((prevExpenses) => [...prevExpenses, savedExpense]);
            //      // Reset input fields
                
            // } else {
            //     throw new Error('Failed to add expense');
            // }
            window.location.reload();
        } catch (error) {
            alert('เกิดข้อผิดพลาดในการเพิ่มรายการ: ' + error.message); // Error message
        }
    };

    // Open delete confirmation modal
    const confirmDeleteExpense = (index) => {
        setDeleteIndex(index);
        
    };

    // Delete expense
    const handleDeleteExpense = () => {
        console.log("Delete ID:", deleteId);
        if (deleteId) {
            // Make API call to delete the result
            fetch(`http://localhost:5000/app/deleteExpenses/${deleteId}`, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message === "Result deleted successfully") {
                        // Filter out the deleted result from the state
                        setResults(expenses.filter(expenses => expenses._id !== deleteId));
                    }
                    setShowDeleteModal(false); // Close the modal
                })
                .catch((error) => {
                    console.error("Error deleting result:", error);
                });
        }
        
        setDeleteIndex(null); // Reset delete index
        window.location.reload();

    };

    // Calculate daily summaries
    const getDailySummary = () => {
        const summary = {};
        expenses.forEach(expense => {
            if (!summary[expense.date]) {
                summary[expense.date] = 0;
            }
            summary[expense.date] += parseFloat(expense.amount);
        });

        // Sort daily summary by date (newest to oldest)
        const sortedSummary = Object.entries(summary).sort((a, b) => new Date(b[0]) - new Date(a[0]));
        return sortedSummary;
    };

    // Function to conditionally style amount based on its value
    const getAmountStyle = (amount) => {
        return {
            color: parseFloat(amount) > 1 ? "green" : "red",
        };
    };

    // Function to conditionally style daily summary based on the total amount
    const getSummaryStyle = (total) => {
        return {
            color: total > 1 ? "green" : "red",
        };
    };

    // Sort expenses by date (newest to oldest)
    const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    
    
    
    useEffect(() => {
        
        const fetchExpenses = async () => {
            const userEmail = localStorage.getItem("useremail"); // Get logged-in user's email
            if (!userEmail) return;
    
            try {
                const response = await fetch(`http://localhost:5000/app/getexpenses?email=${userEmail}`);
                const data = await response.json();
                if(data && data.length > 0){
                    setExpenses(data);

                }
                 //setExpenses(data||defaultExpenseData); // Set the fetched expenses in state
            } catch (error) {
                
                setExpenses([]);
                console.error("Error fetching expenses:", error);
            } finally {
                setLoading(false); // Set loading to false once data is fetched or if an error occurs
            }
        };
    
         fetchExpenses();
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">บัญชีรายรับรายจ่าย ของ {userEmail}</h3>

            <div className="d-flex justify-content-center mt-3">
                <Button variant="success" onClick={() => setShowAddModal(true)}>
                    + เพิ่มรายการ
                </Button>
            </div>
            <br></br>

            

            {/* Daily Summary */}
            <h3 className="mt-4">สรุปยอดรายวัน</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>ยอดรวม (บาท)</th>
                    </tr>
                </thead>
                <tbody>
                    {getDailySummary().map(([date, total]) => (
                        <tr key={date}>
                            <td>{date}</td>
                            <td style={getSummaryStyle(total)}>
                                {total.toFixed(2)} บาท
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            {/* Expense Table */}
            <h3 className="mt-4">รายการ</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>รายการ</th>
                        <th>จำนวนเงิน</th>
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedExpenses.length > 0 ? (
                        sortedExpenses.map((expense, index) => (
                            <tr key={index}>
                                <td>{expense.date}</td>
                                <td>{expense.item}</td>
                                <td style={getAmountStyle(expense.amount)}>
                                    {expense.amount} บาท
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleShow(expense._id)}>
                                        ลบ
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                ไม่มีข้อมูลรายจ่าย
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

        
            {/* Add Expense Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มรายการรายจ่าย</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>วันที่</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={newExpense.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>รายการ</Form.Label>
                            <Form.Control
                                type="text"
                                name="item"
                                placeholder="เช่น ค่าอาหาร, ค่าเดินทาง"
                                value={newExpense.item}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>จำนวนเงิน (บาท)</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                placeholder="ระบุจำนวนเงิน"
                                value={newExpense.amount}
                                onChange={handleChange}
                                min="1"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={handleAddExpense}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>ยืนยันการลบ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?</p>
                </Modal.Body>
		<Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="danger" onClick={handleDeleteExpense}>
                        ลบ
                    </Button>
                </Modal.Footer>
            </Modal>
            <br></br>
        </div>
        
    );
};
