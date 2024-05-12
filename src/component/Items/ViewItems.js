import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Base64Image from './Base64Image'; // Import the Base64Image component
import { useNavigate } from 'react-router-dom';

const ViewItems = () => {
    const [items, setItem] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigator = useNavigate();
    
    function handleUpdateStatus(itemId) {
        navigator(`/update-ItemDetails/${itemId}`)
    }


    const handleDeleteItem = async (itemId) => {
        try {
            // Send a DELETE request to the backend API to delete the item
            const response = await axios.delete(`http://localhost:8080/api/item/${itemId}`);

            console.log('Delete Response:', response.data);

            // If delete is successful, update the local state by filtering out the deleted item
            const updatedItems = items.filter(item => item.itemId !== itemId);

            setItem(updatedItems);
        } catch (error) {
            console.error('Error deleting Item:', error);
            setError('Error deleting item. Please try again.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/item');
                console.log('API Response:', response.data); // Log the response data
                setItem(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            }
        };
    
        fetchData();
    }, []); 
    
    function addItem(){
        navigator(`/add-ItemDetails`)
    }

    return (
        <div>
            <button className='btn btn-info' onClick={(addItem)}>Add Item Details </button>
            <h1>All Item Details</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Item ID</th>
                            <th>Item Name</th>
                            <th>Item Description</th>
                            <th>Starting Price $</th>
                            <th>Category</th>
                            <th>Start Date and Time</th>
                            <th>End Date and Time</th>
                            <th>Image</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.itemId}>
                                <td>{item.itemId}</td>
                                <td>{item.itemName}</td>
                                <td>{item.description}</td>
                                <td>{item.starting_price}</td>
                                <td>{item.category}</td>
                                <td>{item.startDateTime}</td>
                                <td>{item.endDateTime}</td>
                                <td>
                                    {/* Render the Base64Image component with imageUrl */}
                                    <Base64Image base64String={item.imageUrl} />
                                </td>
                                <td>
                                    <button
                                        className='btn btn-info'
                                        onClick={() => handleUpdateStatus(item.itemId)}>
                                        Update
                                    </button>
                                    </td>
                                    <td>
                                    <button className='btn btn-info' onClick={() => handleDeleteItem(item.itemId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewItems;