import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router";

 export default function UpdateUser() {
    const { userId } = useParams();
    const[formData, setFormData] = useState({
        userName:'',
        email:'',
        address:'',
        mobileNo:'',
        password:'',
    });

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/${userId}`,formData)
        .then(response => {
            const data = response.data;
            setFormData({
                userName:data.userName || '',
                email:data.email || '',
                address:data.address || '',
                mobileNo:data.mobileNo || '',
                password:data.password  || '',
            });
        })
        .catch(error => {
            console.error(error);
        });
    }
    , [userId]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = () => {
        axios.put(`http://localhost:8080/api/user/${userId}`,formData)
        .then(response => {
            console.log(response);
            alert('User Updated Successfully');
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleClear = () => {
        setFormData({
            userName:'',
            email:'',
            address:'',
            mobileNo:'',
            password:''
        });
    };

  return (
    <div className="modal show"
        style={{display:'block',position:'initial'}}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        
                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" name="userName" placeholder="Enter User Name" value={formData.userName} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mobileNo">
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" name="mobileNo" placeholder="Enter Mobile No" value={formData.mobileNo} onChange={handleInputChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange} />
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
