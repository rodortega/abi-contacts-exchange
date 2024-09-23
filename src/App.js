import React, { useState } from "react";
import "./App.css";
import master from "./data/master.json";

const typeColors = {
    "Ammo L2": "#FF8A00",  // Darker shade of orange
    "Ammo L3": "#E65100",  // Darker orange
    "Armored Rig L3": "#388E3C",  // Dark green
    "Armored Rig L4": "#1B5E20",  // Even darker green
    "Assault Rifle": "#1976D2",  // Darker blue
    "Attachment": "#283593",  // Dark indigo
    "Backpack": "#6A1B9A",  // Dark purple
    "Barrel": "#8E24AA",  // Slightly darker purple
    "Body Armor L3": "#FFA000",  // Darker yellow-orange
    "Body Armor L4": "#FF6F00",  // Dark orange
    "Body Armor L5": "#D84315",  // Darker red-orange
    "Bolt-Action Rifle": "#C2185B",  // Dark pink
    "Building Materials": "#757575",  // Medium gray
    "Carbine": "#00838F",  // Darker cyan
    "Computer Parts": "#00695C",  // Dark teal
    "Electronics": "#00796B",  // Darker teal
    "Flammables": "#D32F2F",  // Darker red
    "Grip": "#8E24AA",  // Darker purple
    "Handguard": "#3949AB",  // Dark indigo
    "Headset": "#303F9F",  // Darker blue
    "Helmet L4": "#FFA726",  // Dark orange
    "Helmet L5": "#F57C00",  // Dark orange
    "Laser": "#FBC02D",  // Darker yellow
    "Light Machine Gun": "#5D4037",  // Dark brown
    "Magazine": "#D84315",  // Darker orange
    "Marksman Rifle": "#4E342E",  // Darker brown
    "Medical Items": "#388E3C",  // Darker green
    "Medicine": "#2E7D32",  // Even darker green
    "Medkit": "#66BB6A",  // Slightly darker green
    "Micro SMG": "#AD1457",  // Darker pink
    "Muzzle": "#00897B",  // Darker teal
    "Pistol": "#D81B60",  // Darker pink
    "Rail": "#0288D1",  // Darker blue
    "Receiver": "#1976D2",  // Dark blue
    "Shotgun": "#1E88E5",  // Darker blue
    "Sights": "#1565C0",  // Even darker blue
    "Stimulants": "#FFA000",  // Darker orange-yellow
    "Stock": "#558B2F",  // Darker green
    "The Farm Keys": "#D32F2F",  // Dark red
    "Thermal Imaging": "#00796B",  // Dark teal
    "Tools": "#616161",  // Darker gray
    "Treatment": "#FFB300",  // Darker yellow
    "Unarmored Chest Rig": "#0288D1",  // Darker blue
};

function App() {
    const [equipmentInput, setEquipmentInput] = useState("");
    const [requirementInput, setRequirementInput] = useState("");
    const [results, setResults] = useState([]);

    const handleKeyPressEquipment = (event) => {
        setRequirementInput("");
        if (event.key === "Enter") {
            handleEquipmentSearch();
        }
    };

    const handleKeyPressRequirement = (event) => {
        setEquipmentInput("");
        if (event.key === "Enter") {
            handleRequirementSearch();
        }
    };

    // Search for equipment based on the item requirement
    const handleRequirementSearch = () => {
        const lowerInput = requirementInput.toLowerCase();
        setEquipmentInput("");

        const result = master
            .filter((equipmentItem) =>
                equipmentItem.contacts.some((contact) =>
                    contact.requirements.some((req) =>
                        req.item.toLowerCase().includes(lowerInput)
                    )
                )
            )
            .map((equipmentItem) => ({
                equipment: equipmentItem.equipment,
                type: equipmentItem.type,
                contacts: equipmentItem.contacts.filter((contact) =>
                    contact.requirements.some((req) =>
                        req.item.toLowerCase().includes(lowerInput)
                    )
                ),
            }));

        setResults(result);
    };

    // Search for contacts based on the equipment name
    const handleEquipmentSearch = () => {
        const lowerInput = equipmentInput.toLowerCase();
        setRequirementInput("");

        const result = master
            .filter(
                (equipmentItem) =>
                    equipmentItem.equipment
                        .toLowerCase()
                        .includes(lowerInput) ||
                    equipmentItem.type.toLowerCase().includes(lowerInput)
            )
            .map((equipmentItem) => ({
                equipment: equipmentItem.equipment,
                type: equipmentItem.type,
                contacts: equipmentItem.contacts,
            }));

        setResults(result);
    };

    return (
        <div className={`min-h-screen bg-gray-800 text-white py-10`}>
            <h1 className="text-3xl font-bold text-center mb-8">
                Equipment & Item Search
            </h1>

            <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-center items-start">
                {/* Left side: Search by equipment */}
                <div className="w-full lg:w-1/2 bg-gray-700 p-6 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Search for Items Needed for Equipment
                    </h2>
                    <input
                        type="text"
                        value={equipmentInput}
                        onChange={(e) => setEquipmentInput(e.target.value)}
                        placeholder="Enter equipment (e.g., Ammo)"
                        onKeyDown={handleKeyPressEquipment}
                        className="w-full p-3 border rounded mb-4 bg-gray-600 text-white"
                    />
                    <button
                        onClick={handleEquipmentSearch}
                        className="w-full bg-blue-500 bg-blue-800 text-white py-2 rounded hover:bg-blue-600 hover:bg-blue-700 transition duration-300"
                    >
                        Search Equipment
                    </button>
                </div>

                {/* Right side: Search by requirement */}
                <div className="w-full lg:w-1/2 bg-gray-700 p-6 shadow-md rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Search for Equipment Needing this Item
                    </h2>
                    <input
                        type="text"
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        onKeyDown={handleKeyPressRequirement}
                        placeholder="Enter item (e.g., battery)"
                        className="w-full p-3 border rounded mb-4 bg-gray-600 text-white"
                    />
                    <button
                        onClick={handleRequirementSearch}
                        className="w-full bg-green-500 bg-green-800 text-white py-2 rounded hover:bg-green-600 hover:bg-green-700 transition duration-300"
                    >
                        Search Item
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="container mx-auto mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {results.length > 0 ? (
                    results.map((result, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 p-6 shadow-md rounded-md"
                        >
                            <h3 className="text-xl font-bold text-black text-white mb-1">
                                {result.equipment}
                            </h3>
                            <span
                                className={`px-2 py-1 rounded-md text-xs font-semibold text-white`}
                                style={{
                                    backgroundColor: typeColors[result.type],
                                }}
                            >
                                {result.type}
                            </span>

                            <div className="mt-4 grid grid-cols-1 gap-6">
                                {result.contacts.map((contact, idx) => (
                                    <div
                                        key={idx}
                                        className="rounded-md text-white"
                                    >
                                        <p className="font-semibold">
                                            Contact: {contact.name}
                                        </p>
                                        <p className="font-semibold mt-2 text-white">
                                            Gives: {contact.quantity}
                                        </p>
                                        <p className="font-semibold mt-2 text-white">
                                            Requirements:
                                        </p>
                                        <ul className="list-disc list-inside pl-4 mt-2">
                                            {contact.requirements &&
                                                contact.requirements.map(
                                                    (req, reqIdx) => (
                                                        <li
                                                            key={reqIdx}
                                                            className="text-white list-none mb-2"
                                                        >
                                                            <b>
                                                                {req.quantity}{" "}
                                                            </b>{" "}
                                                            x {req.item}
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-gray-300 col-span-3">
                        No results found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default App;
