import React, { useState } from 'react';

const validBloodTypes = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'];

const EmergencyDispense = ({ bloodUnits, onDispense }) => {
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [selectedBloodUnit, setSelectedBloodUnit] = useState(null);
    const [recipientDetails, setRecipientDetails] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        bloodType: '',
        birthDate: '',
        contactNumber: '',
        email: '',
        address: ''
    });
    const [quantity, setQuantity] = useState(0);

    const handleBloodTypeChange = (event) => {
        setSelectedBloodType(event.target.value);
    };

    const handleBloodUnitChange = (event) => {
        setSelectedBloodUnit(event.target.value);
    };

    const handleRecipientDetailsChange = (event) => {
        const { name, value } = event.target;
        setRecipientDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleDispense = () => {
        if (selectedBloodUnit && recipientDetails.firstName && recipientDetails.lastName &&
            recipientDetails.gender && recipientDetails.bloodType && recipientDetails.birthDate &&
            recipientDetails.contactNumber && recipientDetails.email && recipientDetails.address &&
            quantity > 0 && validBloodTypes.includes(selectedBloodType)) {
            const dispense = {
                bloodUnitId: selectedBloodUnit,
                recipientDetails,
                quantity
            };
            onDispense(dispense);
            setSelectedBloodUnit(null);
            setRecipientDetails({
                firstName: '',
                lastName: '',
                gender: '',
                bloodType: '',
                birthDate: '',
                contactNumber: '',
                email: '',
                address: ''
            });
            setQuantity(0);
        }
    };

    return (
        <div>
            <h2>Emergency Dispense</h2>
            <label>
                Blood Type:
                <select value={selectedBloodType} onChange={handleBloodTypeChange}>
                    <option value="">Select Blood Type</option>
                    {validBloodTypes.map((bloodType) => (
                        <option key={bloodType} value={bloodType}>
                            {bloodType}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Blood Unit:
                <select value={selectedBloodUnit} onChange={handleBloodUnitChange}>
                    <option value={null}>Select a blood unit</option>
                    {bloodUnits?.filter(unit => unit.bloodType === selectedBloodType).map((bloodUnit) => (
                        <option key={bloodUnit._id} value={bloodUnit._id}>
                            {bloodUnit.bloodType} - {bloodUnit.donorId}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Recipient Details:
                <br />
                <label>
                    First Name:
                    <input type="text" name="firstName" value={recipientDetails.firstName} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={recipientDetails.lastName} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Gender:
                    <input type="text" name="gender" value={recipientDetails.gender} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Blood Type:
                    <input type="text" name="bloodType" value={recipientDetails.bloodType} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Birth Date:
                    <input type="date" name="birthDate" value={recipientDetails.birthDate} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Contact Number:
                    <input type="tel" name="contactNumber" value={recipientDetails.contactNumber} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={recipientDetails.email} onChange={handleRecipientDetailsChange} />
                </label>
                <br />
                <label>
                    Address:
                    <input type="text" name="address" value={recipientDetails.address} onChange={handleRecipientDetailsChange} />
                </label>
            </label>
            <br />
            <label>
                Quantity:
                <input type="number" name="quantity" min="1" max="10" value={quantity} onChange={handleQuantityChange} />
            </label>
            <br />
            <button onClick={handleDispense}>Dispense</button>
        </div>
    );
};
export default EmergencyDispense;
