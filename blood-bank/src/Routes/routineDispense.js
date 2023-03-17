import React, { useState } from "react";

const RoutineDispense = () => {
    const [bloodType, setBloodType] = useState("");
    const [units, setUnits] = useState(0);
    const [room, setRoom] = useState("");
    const [bloodAction, setBloodAction] = useState("");
    const validBloodTypes = ['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-'];
    const roomOptions = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];
    const getBloodTypesToReceive = (bloodType) => {
        const canReceiveFrom = {
            'A+': ['A+', 'A-', 'O+', 'O-'],
            'O+': ['O+', 'O-'],
            'B+': ['B+', 'B-', 'O+', 'O-'],
            'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            'A-': ['A-', 'O-'],
            'O-': ['O-'],
            'B-': ['B-', 'O-'],
            'AB-': ['AB-', 'A-', 'B-', 'O-']
        };

        if (!validBloodTypes.includes(bloodType)) {
            return [];
        }

        return canReceiveFrom[bloodType];
    };
    const getBloodTypesToDonate = (bloodType) => {
        const canDonateTo = {
            'A+': ['A+', 'AB+'],
            'O+': ['O+', 'A+', 'B+', 'AB+'],
            'B+': ['B+', 'AB+'],
            'AB+': ['AB+'],
            'A-': ['A+', 'A-', 'AB+', 'AB-'],
            'O-': ['A+', 'B+', 'AB+', 'A-', 'B-', 'AB-', 'O+', 'O-'],
            'B-': ['B+', 'B-', 'AB+', 'AB-'],
            'AB-': ['AB+', 'AB-', 'A+', 'B+']
        };

        if (!validBloodTypes.includes(bloodType)) {
            return [];
        }

        return canDonateTo[bloodType];
    };


    const handleBloodTypeChange = (event) => {
        setBloodType(event.target.value);
    };

    const handleUnitsChange = (event) => {
        setUnits(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };

    const handleActionChange = (event) => {
        setBloodAction(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validBloodTypes.includes(bloodType)) {
            alert("Invalid blood type selected");
            return;
        }
        // code to submit data to the backend API
        console.log("Blood type:", bloodType);
        console.log("Blood Action:", bloodAction);
        console.log("Units:", units);
        console.log("Room:", room);
        // reset form values
        setBloodType("");
        setBloodAction("");
        setUnits(0);
        setRoom("");
    };
    return (
        <div>
            <h2>Dispense Blood</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Blood Type:
                    <select value={bloodType} onChange={handleBloodTypeChange}>
                        <option value="">Select Blood Type</option>
                        {validBloodTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        type="radio"
                        value="donate"
                        checked={bloodAction === "donate"}
                        onChange={(e) => setBloodAction(e.target.value)}
                        disabled={!bloodType}
                    />
                    Donate Blood
                </label>
                <label>
                    <input
                        type="radio"
                        value="receive"
                        checked={bloodAction === "receive"}
                        onChange={(e) => setBloodAction(e.target.value)}
                        disabled={!bloodType}
                    />
                    Receive Blood
                </label>
                <label>
                    Blood Types to {bloodAction === "receive" ? "Receive" : "Donate"}:
                    <select>
                        {bloodAction === "receive"
                            ? getBloodTypesToReceive(bloodType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))
                            : getBloodTypesToDonate(bloodType).map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                    </select>
                </label>

                <br />
                <label>
                    Units:
                    <input
                        type="number"
                        min="1"
                        value={units}
                        onChange={handleUnitsChange}
                    />
                </label>
                <br />
                <label>
                    Room:
                    <select value={room} onChange={handleRoomChange}>
                        <option value="">Select Room</option>
                        {roomOptions.map((room) => (
                            <option key={room} value={room}>
                                {room}
                            </option>
                        ))}
                    </select>
                </label>

                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );

};

export default RoutineDispense;
