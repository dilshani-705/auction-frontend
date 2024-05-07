import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { updateOutgoing } from '../../Services/OutgoingServices';
import { useNavigate } from 'react-router-dom';


function ViewAllOutgoing() {
    const [outgoings, setOutgoings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        // Fetch data from the server
        axios.get('http://localhost:8080/api/outgoing')
            .then(response => {
                setOutgoings(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching outgoing data:', error);
                setError('Error fetching data. Please try again.');
                setLoading(false);
            });
    }, []);

    const handleDeleteOutgoing = async (outgoingId) => {
        try {
            // Send a DELETE request to the backend API to delete the outgoing
            const response = await axios.delete(`http://localhost:8080/api/outgoing/${outgoingId}`);
    
            console.log('Delete Response:', response.data);
    
            // If delete is successful, update the local state by filtering out the deleted outgoing
            const updatedOutgoing = outgoings.filter(outgoing => outgoing.outgoingId !== outgoingId);
    
            setOutgoings(updatedOutgoing);
        } catch (error) {
            console.error('Error deleting outgoing:', error);
            // Handle error state or show error message to user
        }
    };

    // function updateArrivalOutgoing(id){
    //     navigator(`/add-ArrivalOutgoing/${id}`)
    // }
    // function addDepartureOutgoing(){
    //     navigator(`/add-DepartureOutgoing`)
    // }

        function goStuOut(){
        navigator(`/add-StudentViewOutgoing`)
    }

    console.log(outgoings); // Check the structure of outgoings
    return (
        <div>
            {/* <button className='btn btn-info' onClick={(addDepartureOutgoing)}>Add Departure Outgoing</button> */}
            <h1>All Outgoing Details</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Outgoing Id</th>
                            <th>Outgoing Type</th>
                            <th>Hostel Type</th>
                            <th>Departure Date</th>
                            <th>Tg Number</th>
                            <th>Room Number</th>
                            <th>Full Name</th>
                            <th>Departure Time</th>
                            <th>Leaving Place</th>
                            <th>Arrival Date</th>
                            <th>Arrival Time</th>
                            {/* <th>Update</th> */}
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outgoings.map(outgoing => (
                            <tr key={outgoing.outgoingId}>
                                <td>{outgoing.outgoingId}</td>
                                <td>{outgoing.selectOutgoingType}</td>
                                <td>{outgoing.selectHostelType}</td>
                                <td>{outgoing.departureDate}</td>
                                <td>{outgoing.tgNumber}</td>
                                <td>{outgoing.roomNumber}</td>
                                <td>{outgoing.fullName}</td>
                                <td>{outgoing.departureTime}</td>
                                <td>{outgoing.leavingPlace}</td>
                                <td>{outgoing.arrivalDate}</td>
                                <td>{outgoing.arrivalTime}</td>
                                {/* <td><button className='btn btn-info' onClick={() => updateArrivalOutgoing(outgoing.outgoingId)}>Update</button></td> */}
                                <td>
                                    <button className='btn btn-info' onClick={() => handleDeleteOutgoing(outgoing.outgoingId)}>Delete</button> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className='btn btn-info' onClick={(goStuOut)}>Next</button>
        </div>
    );
}

export default ViewAllOutgoing;
