import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { addOutgoing } from '../../Services/OutgoingServices';

const AddDepartureOutgoing = () => {

      const [selectOutgoingType, setSelectOutgoingType] = useState('');
      const [selectHostelType, setSelectHostelType] = useState('');
      const[departureDate,setDepartureDate]=useState('')
      const[tgNumber, setTgNumber]=useState('')
      const[roomNumber,setRoomNumber]=useState('')
      const[fullName,setFullName]=useState('')
      const[departureTime,setDepartureTime]=useState('')
      const[leavingPlace,setLeavingPlace]=useState('')
      const [formErrors, setFormErrors] = useState({}); // State for form errors

 
     const handleSelectOutgoingType = (e) => 
        setSelectOutgoingType(e.target.value);
      
        
      const handleSelectHostelType = (e) => 
        setSelectHostelType(e.target.value);
      

      const handleDepartureDate = () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setDepartureDate(formattedDate);
      };

      const handleTgNumber=(e)=>
        setTgNumber(e.target.value);
      

      const handleRoomNumber=(e)=>
        setRoomNumber(e.target.value);
      

      const handleFullName=(e)=>
        setFullName(e.target.value);
      

      const handleDepartureTime = () => {
        const currentDate = new Date();
        const timestamp = currentDate.toLocaleTimeString(); // Get current time in HH:mm:ss format
        setDepartureTime(timestamp);
      };
      
      const handleLeavingPlace=(e)=>setLeavingPlace(e.target.value);

      const validateForm = () => {
        const errors = {};
        if (!selectOutgoingType) {
            errors.selectOutgoingType = 'Outgoing Type is required';
        }
        if (!selectHostelType) {
            errors.selectHostelType = 'Hostel Id is required';
        }
        if (!departureDate) {
            errors.departureDate = 'Departure Date is required';
        }
        if (!tgNumber) {
            errors.tgNumber = 'TG Number is required';
        } else if (!/^TG-\d{4}-\d{3}$/.test(tgNumber)) {
            errors.tgNumber = 'Invalid TG Number format. Format should be TG-YYYY-NNN';
        }
        if (!roomNumber) {
            errors.roomNumber = 'Room Number is required';
        }
        if (!fullName) {
            errors.fullName = 'Full Name is required';
        } else if (/\d/.test(fullName)) {
            errors.fullName = 'Full Name cannot contain numbers';
        }
        if (!departureTime) {
            errors.departureTime = 'Departure Time is required';
        }
        if (!leavingPlace) {
            errors.leavingPlace = 'Leaving Place is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const saveOutgoing = (e) => {
        e.preventDefault();

        const isValid = validateForm();

      if (isValid) {
        const outgoing = {
          selectOutgoingType,
          selectHostelType,
          departureDate,
          tgNumber,
          roomNumber,
          fullName,
          departureTime,
          leavingPlace,
        };
      
        addOutgoing(outgoing)
          .then((response) => {
            console.log(response.data);
            alert('Outgoing information saved successfully!');
            // Optionally reset form fields or perform other actions upon successful save
          })
          .catch((error) => {
            console.error('Error saving outgoing:', error);
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
              alert(`Failed to save outgoing information: ${error.response.data.message}`);
            } else if (error.request) {
              // The request was made but no response was received
              console.log(error.request);
              alert('No response received from server. Please try again.');
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error', error.message);
              alert('An error occurred while saving outgoing information. Please try again.');
            }
          });
        }else {
            const firstErrorKey = Object.keys(formErrors)[0]; // Get the first error key
            if (firstErrorKey) {
                alert(formErrors[firstErrorKey]); // Display the specific error message
            } else {
                alert('Please fill in all required fields correctly.'); // Fallback if no specific error message found
            }
        }
    };

  return (
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add Checkout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>    
                    <Form.Group className="mb-3" controlId="formOutgoingType">
                    <Form.Label>Outgoing Type</Form.Label>
                    <Form.Select aria-label="SelectOutgoingType" name='selectOutgoingType' value={selectOutgoingType} onChange={handleSelectOutgoingType} isInvalid={!!formErrors.selectOutgoingType}>
                    <option>Select Outgoing Type</option>
                    <option value="General">General Outgoing</option>
                    <option value="Temporary">Temporary Outgoing</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formHostelId">
                    <Form.Label>Hostel Id</Form.Label>
                    <Form.Select aria-label="Select Hostel Id" name='selectHostelType' value={selectHostelType} onChange={handleSelectHostelType} isInvalid={!!formErrors.selectHostelType}>
                    <option>Select Hostel</option>
                    <option value="GID">Girls</option>
                    <option value="BID">Boys</option>
                    </Form.Select>
                    </Form.Group>

      
    <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Departure_Date</Form.Label>
        <Form.Control type="text" placeholder="Enter Departure Date" name='departureDate' value={departureDate} onChange={handleDepartureDate} isInvalid={!!formErrors.departureDate}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formTGnumber">
      <Form.Label>TG Number</Form.Label>
      <Form.Control type="text" placeholder="Please enter your TG number in the format TG-YYYY-NNN" name='tgNumber' value={tgNumber} onChange={handleTgNumber} isInvalid={!!formErrors.tgNumber}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formRoomNum">
      <Form.Label>Room Number</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Room Number" name='roomNumber' value={roomNumber} onChange={handleRoomNumber} isInvalid={!!formErrors.roomNumber}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formName">
      <Form.Label>Full Name</Form.Label>
      <Form.Control type="text" placeholder="Enter Your Full Name"  name='fullName' value={fullName} onChange={handleFullName} isInvalid={!!formErrors.fullName}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formDtime">
      <Form.Label >Departure Time</Form.Label>
      <Form.Control type="text" placeholder="Enter Departure Time" name="departureTime" value={departureTime} onChange={handleDepartureTime} isInvalid={!!formErrors.departureTime}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formPlace">
      <Form.Label>Leaving Place</Form.Label>
      <Form.Control type="text" placeholder="Enter Leaving Place" name='leavingPlace' value={leavingPlace} onChange={handleLeavingPlace} isInvalid={!!formErrors.leavingPlace}/> 
    </Form.Group>
  </Form>
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Clear</Button>
          <Button variant="primary" className='btn btn-success'onClick={saveOutgoing}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
      

    </div>
  )
}

export default AddDepartureOutgoing