import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AddItemForm = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [startingPrice, setStartingPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(null); // State to store selected image file

    const handleItemId = (e) => setItemId(e.target.value);
    const handleItemName = (e) => setItemName(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);
    const handleStartingPrice = (e) => setStartingPrice(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file

        // Validate file type if needed (e.g., image/jpeg, image/png)
        // For simplicity, we'll directly set the file to state
        setImageUrl(file); // Store the selected file in state
    };

    const addItems = () => {
        // Prepare data to be sent to server (including image file)
        const formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('itemName', itemName);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('startingPrice', startingPrice);
        formData.append('image', imageUrl); // Append the image file to form data
      

        // Perform API request to add item with image data
        // Example: axios.post('/api/items', formData)
        // Handle success and error responses accordingly
        console.log('Form Data:', formData);
    };

    return (   
    <div className="modal show"
    style={{ display: 'block', position: 'initial' }}>
        <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formItemId">
                            <Form.Label>Item ID</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item ID" value={itemId} onChange={handleItemId} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formItemName">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Name" value={itemName} onChange={handleItemName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Item Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Description" value={description} onChange={handleDescription} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Category" value={category} onChange={handleCategory} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formStartingPrice">
                            <Form.Label>Starting Price</Form.Label>
                            <Form.Control type="text" placeholder="Enter Starting Price" value={startingPrice} onChange={handleStartingPrice} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Choose Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} accept="image/*" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">Clear</Button>
                    <Button variant="primary" className="btn btn-success" onClick={addItems}>Add Item</Button>
                </Modal.Footer>
            </Modal.Dialog>
            </div>
    );
};

export default AddItemForm;
