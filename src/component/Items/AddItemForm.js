import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AddItemInfo, getItem, updateItem } from '../Services/ItemServices';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddItemForm = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [starting_price, setStarting_price] = useState('');
    const [category, setCategory] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);    
    const [imageUrl, setImageUrl] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigator = useNavigate();
    const { id } = useParams();

    const handleItemId = (e) => setItemId(e.target.value);
    const handleItemName = (e) => setItemName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleStarting_price = (e) => setStarting_price(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);

    useEffect(() => {
        if (id) {
            getItem(id).then((response) => {
                setItemId(response.data.itemId);
                setItemName(response.data.itemName);
                setDescription(response.data.description);
                setStarting_price(response.data.starting_price);
                setCategory(response.data.category);
            }).catch((error) => {
                console.error(error);
               
            })
        }
    }, [id]);

    const clearForm = () => {
        // Reset all form state variables
        setItemId('');
        setItemName('');
        setDescription('');
        setStarting_price('');
        setCategory('');
        setStartTime(null);
        setEndTime(null);
        setImageUrl(null);
        setFormErrors({});
    };      

    const handleStartTimeChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setStartTime(date); // Update state directly with the Date object
        } else {
            console.error('Invalid date received:', date);
        }
    };
    
    const handleEndTimeChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setEndTime(date); // Update state directly with the Date object
        } else {
            console.error('Invalid date received:', date);
        }
    };
    
    const handleImageUrl = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };

    const validateForm = () => {
        const errors = {};
        if (!itemId) {
            errors.itemId = 'Item Id is required';
        } else if (!/^[a-zA-Z0-9]+$/.test(itemId)) {
            errors.itemId = 'Item Id must contain only letters and digits';
        }        
        if (!itemName) {
            errors.itemName = 'Item Name is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }
        if (!starting_price) {
            errors.starting_price = 'Starting Price is required';
        }
        if (!category) {
            errors.category = 'Category is required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const handleUpload = (e) => {
    e.preventDefault();

    const isValid = validateForm();

        if (isValid) {

    // Prepare addItemDto object
    const itemDto = {
        itemId: itemId,
        itemName:itemName,
        description:description,
        starting_price:starting_price,
        category: category,
        startDateTime: startTime.toISOString(), // Convert Date object to ISO 8601 string
        endDateTime: endTime.toISOString(),     // Convert Date object to ISO 8601 string
    };

    // Create a FormData object
    const formData = new FormData();
    formData.append('itemDto', JSON.stringify(itemDto)); // Include itemDto parameter
    formData.append('imageUrl', imageUrl);

    if (!imageUrl) {
        alert('Please select a file to upload.');
        return;
    }

    if (id) {
        updateItem(id, formData)
            .then((response) => {
                console.log(response.data);
                alert('Item information updated successfully!');
                navigator('/items');
            })
            .catch((error) => {
                console.error('Error updating item information:', error);
                alert('An error occurred while updating item information. Please try again.');
            });
        return;
    }else{
    
    // Send POST request to backend
    AddItemInfo(formData)
        .then((response) => {
            console.log(response.data);
            alert('Item information saved successfully!');
            // Reset form fields upon successful save
            setItemId('');
            setItemName('');
            setDescription('');
            setStarting_price('');
            setCategory('');
            setStartTime(null);
            setEndTime(null);
            setImageUrl(null); // Reset file input
        })
        .catch((error) => {
            console.error('Error saving item information:', error);
            alert('An error occurred while saving item information. Please try again.');
        });
        }}else {
            const firstErrorKey = Object.keys(formErrors)[0]; // Get the first error key 
            if (firstErrorKey) {
                alert(formErrors[firstErrorKey]); // Display the specific error message
            } else {
                alert('Please fill in all required fields correctly.'); // Fallback if no specific error message found
            }
        }
    };

    function pageRedirect() {
        if(id){
            return <h2 className='text-center'>Update Item Details</h2>
        }else{
            return <h2 className='text-center'>Add Item Details</h2>   
        }
    }

    return (
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>{pageRedirect()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formId">
                            <Form.Label>Item Id</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Id" value={itemId} onChange={handleItemId} isInvalid={!!formErrors.selectItemId}/>
                        </Form.Group>
                        <Form.Group controlId="formItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Name" value={itemName} onChange={handleItemName} isInvalid={!!formErrors.selectItemName}/>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter Item Description" value={description} onChange={handleDescription} />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Starting Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Price" value={starting_price} onChange={handleStarting_price} isInvalid={!!formErrors.selectsubmitStarting_Price}/>
                        </Form.Group>
                        {/* <Form.Group controlId="formCategory">
                            <Form.Label>category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Category" value={category} onChange={handleCategory} isInvalid={!!formErrors.selectsubmitCategoty}/>
                        </Form.Group> */}
                        <Form.Group controlId="formCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={category} onChange={handleCategory}>
                            <option value="">Select a category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Homeware">Homeware</option>
                            <option value="Jewellery & Watches">Jewellery & Watches</option>
                            <option value="Fitness">Fitness</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formStartTime">
                        <Form.Label>Start Time</Form.Label>
                        <br />
                        <DatePicker
                            selected={startTime}
                            onChange={handleStartTimeChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select start time"
                            className="form-control"
                        />
                        </Form.Group>
                        <Form.Group controlId="formEndTime">
                        <Form.Label>End Time</Form.Label>
                        <br />
                        <DatePicker
                            selected={endTime}
                            onChange={handleEndTimeChange}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select end time"
                            className="form-control"
                        />
                        </Form.Group> 
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>upload Image</Form.Label>
                            <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUrl} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={}>Back</Button> */}
                    <Button variant="secondary" onClick={clearForm}>Clear</Button>
                    <Button variant="primary" className="btn btn-success" onClick={handleUpload}>Save Changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default AddItemForm;
