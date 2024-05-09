import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AddItemInfo } from '../Services/ItemServices';

const AddItemForm = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [starting_price, setStarting_price] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [formErrors, setFormErrors] = useState({}); // State for form errors

    const handleItemId = (e) => setItemId(e.target.value);
    const handleItemName = (e) => setItemName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleStarting_price = (e) => setStarting_price(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);


    const handleImageUrl = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };

    const validateForm = () => {
        const errors = {};
        if (!itemId) {
            errors.itemId = 'Item Id is required';
        } else if (/\d/.test(itemId)) {
            errors.itemId = 'Item Id cannot contain numbers';
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

    if (!imageUrl) {
        alert('Please select a file to upload.');
        return;
    }

    const isValid = validateForm();

        if (isValid) {

    // Prepare addItemDto object
    const itemDto = {
        itemId: itemId,
        itemName:itemName,
        description:description,
        starting_price:starting_price,
        category: category
    };

    // Create a FormData object
    const formData = new FormData();
    formData.append('itemDto', JSON.stringify(itemDto)); // Include itemDto parameter
    formData.append('imageUrl', imageUrl);
    
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
            setImageUrl(null); // Reset file input
        })
        .catch((error) => {
            console.error('Error saving item information:', error);
            alert('An error occurred while saving item information. Please try again.');
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
        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item Details</Modal.Title>
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
                            <Form.Control type="text" placeholder="Enter Item Description" value={description} onChange={handleDescription} isInvalid={!!formErrors.selectsubmitDescription}/>
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Starting Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Price" value={starting_price} onChange={handleStarting_price} isInvalid={!!formErrors.selectsubmitStarting_Price}/>
                        </Form.Group>
                        <Form.Group controlId="formCategory">
                            <Form.Label>category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Category" value={category} onChange={handleCategory} isInvalid={!!formErrors.selectsubmitCategoty}/>
                        </Form.Group>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>upload Image</Form.Label>
                            <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={handleImageUrl} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { /* Handle clear form fields */ }}>Clear</Button>
                    <Button variant="primary" className="btn btn-success" onClick={handleUpload}>Save Changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
};

export default AddItemForm;
