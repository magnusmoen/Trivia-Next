"use client"
import React, { useRef, useState } from 'react';

const categories = ['Musikk', 'Norge Rundt', 'Viralt på nett', 'Rått & Roti', 'Category 5'];
const points = [200, 400, 600, 800, 1000];

const questions = {
  0: 'What is the question for 200 points in Category 1?',
  1: 'What is the question for 400 points in Category 1?',
  2: 'What is the question for 600 points in Category 1?',
  3: 'What is the question for 800 points in Category 1?',
  4: 'What is the question for 1000 points in Category 1?',
  5: 'What is the question for 200 points in Category 2?',
  6: 'What is the question for 400 points in Category 2?',
  7: 'What is the question for 600 points in Category 2?',
  8: 'What is the question for 800 points in Category 2?',
  9: 'What is the question for 1000 points in Category 2?',
  10: 'What is the question for 200 points in Category 3?',
  11: 'What is the question for 400 points in Category 3?',
  12: 'What is the question for 600 points in Category 3?',
  13: 'What is the question for 800 points in Category 3?',
  14: 'What is the question for 1000 points in Category 3?',
  15: 'What is the question for 200 points in Category 4?',
  16: 'What is the question for 400 points in Category 4?',
  17: 'What is the question for 600 points in Category 4?',
  18: 'What is the question for 800 points in Category 4?',
  19: 'What is the question for 1000 points in Category 4?',
  20: 'What is the question for 200 points in Category 5?',
  21: 'What is the question for 400 points in Category 5?',
  22: 'What is the question for 600 points in Category 5?',
  23: 'What is the question for 800 points in Category 5?',
  24: 'What is the question for 1000 points in Category 5?',
};


const MainPage: React.FC = () => {
  const dialogRef = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3']);
  const [teamPoints, setTeamPoints] = useState([0, 0, 0]);


  const handleClick = (cardIndex) => {
    setSelectedCard(cardIndex);
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.showModal();
    }
  };

  const handleClose = () => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.close();
      setSelectedCard(null); // Clear the selected card when the dialog is closed
    }
  };

  const handleTeamNameChange = (index, newName) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = newName;
    setTeamNames(newTeamNames);
  };

  const handleTeamPointsChange = (index, newPoints) => {
    const newTeamPoints = [...teamPoints];
    newTeamPoints[index] = newPoints;
    setTeamPoints(newTeamPoints);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">Trivia Game</h1>
      
    {/* Render teams */}
    <div className="grid grid-cols-3 gap-4 mb-4">
        {teamNames.map((teamName, index) => (
          <div key={index} className="bg-green-400 p-4 text-purple-900 rounded-lg text-center text-xl">
            <input
              type="text"
              value={teamName}
              onChange={(e) => handleTeamNameChange(index, e.target.value)}
              className="text-green-900 bg-transparent border-b border-purple-900 focus:outline-none"
            />
            <div className="mt-2">
              Points:{" "}
              <input
                type="number"
                value={teamPoints[index]}
                onChange={(e) => handleTeamPointsChange(index, parseInt(e.target.value))}
                className="text-green-900 bg-transparent border-b border-purple-900 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Render categories */}
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-cyan-400 p-4 text-cyan-900 rounded-lg text-center text-xl">
            {category}
          </div>
        ))}
      </div>
      
      {/* Render points */}
      {points.map((point, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 mt-4">
          {Array(5).fill(0).map((_, colIndex) => (
            <div
              key={colIndex}
              className="text-teal-50 bg-cyan-900 p-8 rounded-lg text-center cursor-pointer text-xl hover:bg-cyan-600"
              onClick={() => handleClick(rowIndex * 5 + colIndex)}
            >
              {point}
            </div>
          ))}
        </div>
      ))}


      {/* Dialog */}
      <dialog ref={dialogRef} className="dialog bg-white rounded-lg p-4 max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-2">{selectedCard !== null ? questions[selectedCard] : ''}</h2>
        <button
          className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600 focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
      </dialog>
    </div>
  );
};

export default MainPage;
