import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function AddUser () {
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        email: '',
        address: '',
        mobileNo: '',
        role: '',
        password: '',
    });


    const handleSubmit = async (e) => {
        try{
        e.preventDefault();
         await axios.post('http://localhost:8080/api/users',formData);
         alert('User Added Successfully');
    }catch(error){
        console.error('Error in creating user:',error);
    }
};
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleClear = () => {
        setFormData({
            userId: '',
            userName: '',
            email: '',
            address: '',
            mobileNo: '',
            role: '',
            password: '',
        });
    }

    return (
        <div>
           <div className="modal show"
           style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)',position: 'fixed',top: '0',left: '0',width: '100%',height: '100%',overflow: 'auto',}}>
            <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="userId">
                            <Form.Label>User Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Id" value={formData.userId} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name" value={formData.userName} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Enter Address" value={formData.address} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="mobileNo">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mobile Number" value={formData.mobileNo} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select aria-label="Role" name="role" value={formData.role} onChange={handleInputChange}>
           
                            <option value="Seller">Seller</option>
                            <option value="Buyers">Buyer</option>
                            <option value="Admin">Admin</option>


                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={formData.password} onChange={handleInputChange} />
                        </Form.Group>

                    </Form>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={handleClear}>
                            Clear
                        </Button>
                    </Modal.Footer>
                        
                </Modal.Body>
            </Modal.Dialog>
            
        </div>

        </div>
    );
}export default AddUser;