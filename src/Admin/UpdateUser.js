import axios from "axios";
import { Modal } from "bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams } from "react-router";

 export default function UpdateUser() {
    const { userId } = useParams();
    const[formData, setFormData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${userId}`)
        .then(response => {
            setFormData(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    , [userId]);

    const handleSubmit = () => {
        axios.put(`http://localhost:8080/api/user/${userId}`,formData)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleClear = () => {
        setFormData({
            userName:'',
            email:'',
            address:'',
            mobileNo:'',
            password:''
        });
    }

  return (
    <div className="modal show"
        style={{display:'block',position:'initial'}}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name" value={formData.userName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={formData.email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={formData.address} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile No" value={formData.mobileNo} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={formData.password} />
                        </Form.Group>
                       
                    </Form>
                    </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleSubmit}>Update</Button>
                            <Button variant="secondary" onClick={handleClear}>Close</Button>
                        </Modal.Footer>

                    
            </Modal.Dialog>
    </div>
  );
}
