import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getOutgoing, updateOutgoing } from '../../Services/OutgoingServices';
import { useNavigate, useParams } from 'react-router-dom'; 

const AddArrivalOutgoing = () => {

    const [arrivalDate, setArrivalDate] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const { id } = useParams();
    const navigator = useNavigate();
    const [formErrors, setFormErrors] = useState({}); // State for form errors

      const handleArrivalDate = () => { 
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setArrivalDate(formattedDate);
        validateForm(formattedDate, arrivalTime);
      };

      const handleArrivalTime = () => {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleTimeString(); // Get current time in HH:mm:ss format
        setArrivalTime(timestamp);
        validateForm(arrivalDate, timestamp);
      };

      useEffect (()=>{
        if(id){
          getOutgoing(id).then((response)=>{
            setArrivalDate(response.data.arrivalDate);
            setArrivalTime(response.data.arrivalTime);
          }).catch(error =>{
            console.error(error);
          })
        }
      });

      const validateForm = () => {
        const errors = {};
        if (!arrivalDate.trim()) {
            errors.arrivalDate = 'Arrival Date is required';
        }
        if (!arrivalTime.trim()) {
            errors.arrivalTime = 'Arrival Time is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

      const UpdateOutgoing = (e) => {
        e.preventDefault();
          
        const isValid = validateForm();
    
            if (isValid && id) {
                const outgoing = {
                    arrivalDate,
                    arrivalTime,
            };

        updateOutgoing(id,outgoing)
          .then((response) => {
            console.log(response.data);
            alert('Arrival information saved successfully!');
            // Optionally reset form fields or perform other actions upon successful save
            navigator('/ViewAllOutgoing'); 
          })
          .catch((error) => {
            console.error('Error saving Arrival:', error);
            if (error.response) {
                alert(`Failed to save arrival information: ${error.response.data.message}`);
            } else if (error.request) {
                alert('No response received from server. Please try again.');
            } else {
                alert('An error occurred while saving arrival information. Please try again.');
            }
        });
            } else {
                  alert('Please fill in all required fields.');
            }
    };


  return (
    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add Checkin Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

        <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Arrival Date</Form.Label>
        <Form.Control type="text" placeholder="Enter Arrival Date" name='arrivalDate' value={arrivalDate} onChange={handleArrivalDate} isInvalid={!!formErrors.arrivalDate}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDtime">
        <Form.Label >Arrival Time</Form.Label>
        <Form.Control type="text" placeholder="Enter Arrival Time" name="arrivalTime" value={arrivalTime} onChange={handleArrivalTime} isInvalid={!!formErrors.arrivalTime}/>
        </Form.Group>

    </Form>
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Clear</Button>
          <Button variant="primary" className='btn btn-success'onClick={UpdateOutgoing}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
      

    </div>
  )
}

export default AddArrivalOutgoing