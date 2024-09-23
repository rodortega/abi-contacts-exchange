import React, { useState } from "react";
import "./App.css";
import master from "./data/master.json";

function App() {
    const [equipmentInput, setEquipmentInput] = useState("");
    const [requirementInput, setRequirementInput] = useState("");
    const [results, setResults] = useState([]);

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
            .filter((equipmentItem) =>
                equipmentItem.equipment.toLowerCase().includes(lowerInput)
            )
            .map((equipmentItem) => ({
                equipment: equipmentItem.equipment,
                contacts: equipmentItem.contacts,
            }));

        setResults(result);
    };

    return (
        <div
            className={`min-h-screen bg-gray-800 text-white py-10`}
        >
            <h1 className="text-3xl font-bold text-center mb-8">
                Equipment & Item Search
            </h1>

            <div className="container mx-auto flex flex-col lg:flex-row gap-8 justify-center items-start">
                {/* Left side: Search by equipment */}
                <div className="w-full lg:w-1/2 bg-white bg-gray-700 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Search for Items Needed for Equipment
                    </h2>
                    <input
                        type="text"
                        value={equipmentInput}
                        onChange={(e) => setEquipmentInput(e.target.value)}
                        placeholder="Enter equipment (e.g., Ammo)"
                        className="w-full p-3 border rounded mb-4 bg-white bg-gray-600 text-black text-white"
                    />
                    <button
                        onClick={handleEquipmentSearch}
                        className="w-full bg-blue-500 bg-blue-800 text-white py-2 rounded hover:bg-blue-600 hover:bg-blue-700 transition duration-300"
                    >
                        Search Equipment
                    </button>
                </div>

                {/* Right side: Search by requirement */}
                <div className="w-full lg:w-1/2 bg-white bg-gray-700 p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">
                        Search for Equipment Needing this Item
                    </h2>
                    <input
                        type="text"
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        placeholder="Enter item (e.g., battery)"
                        className="w-full p-3 border rounded mb-4 bg-white bg-gray-600 text-black text-white"
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
                            className="bg-white bg-gray-700 p-6 shadow-md rounded-lg"
                        >
                            <h3 className="text-xl font-bold text-black text-white">
                                {result.equipment}
                            </h3>
                            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {result.contacts.map((contact, idx) => (
                                    <div key={idx} className="p-4 rounded-lg text-white">
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
                                                            className="text-white"
                                                        >
                                                            {req.item}:{" "}
                                                            {req.quantity}
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
