"use client"
import React, { useRef, useState } from 'react';

const categories = ['Musikk', 'Norge Rundt', 'Viralt på nett', 'Rått & Roti', 'Filmer & Serier'];
const points = [200, 400, 600, 800, 1000];

const questions = {
  0: 'Hvem sang låtene "Thriller" og "Smooth Crimial"?',
  1: 'Hva er norges tredje største by?',
  2: 'Hvilket kjent mobilspill skapte problemer blant annet i trafikken i 2016?',
  3: 'Er jeg (Magnus) venstre- eller høyrehendt?',
  4: 'Hva er agentkoden til James Bond?',
  5: '"Ja, vi elsker" synges hver 17. Mai, nevn en annen nasjonalsang som ofte synges den dagen.',
  6: 'Hvor lang tar det å kjøre fra Lindesnes gjennom Narvik til Lindesnes? Godkjent +/- 3 timer',
  7: 'I dag har X/Twitter 280 karakterer per tweet, hvor mye var det original?',
  8: 'Finnes det drager i norske eventyr?',
  9: '"Squid Game" er en av netflix`s mest sette serier, hvilket land kommer serien ifra?',
  10: 'Det er ei kjent låt som sier "Its 5 o clock somewhere, hvor omtrentlig er kl 17:00 nå?',
  11: 'Roald Amundsen og Fridtjof Nansen var kjente norske utforskere, hve mer kjent for å komme seg til Sørpolen?',
  12: 'Hvilken sak støttet den kjente trenden "Ice bucket challenge"?',
  13: 'Hva kalles drinken med 60ml vodka, 1 tbsp dry vermouth. olive or lemon peel, to garnish.',
  14: 'Hva heter Gorillaen i filmen Flåklypa?',
  15: 'Emma Steinbakken ble kjent med en cover av låta "jeg glemmer deg aldri", hvem hadde den originale låta?',
  16: 'Folk fra Øyer er kjent for å være blå, eller blåværinger. Hva betyr det å være blå? Hint: Samme myte gjelder sunnmøringer.',
  17: 'Fidget Spinnere var en stor trend, men for hvem ble egt fidget spinnere laget for?',
  18: 'Hvilken statue har vært kjent "kidnappet" fra vigelandsparken?',
  19: 'Hvilken farge på lightsaber har karakteren til Samual L Jackson, Mace Windu?',
  20: 'Hva var Elvis sitt egt yrke før han ble musiker?',
  21: 'I hvilket årt startet byggingen av slottet?',
  22: 'Per dags dato, hvem har det mest likte bilde på Instagram?',
  23: 'Hvem er kjent som grunnleggeren av Internettet?',
  24: 'Hvor mange sesonger hadde serien Hotel Cæsar? Riktig svar +/- 3.',
};


const MainPage: React.FC = () => {
  const dialogRef = useRef(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [teamNames, setTeamNames] = useState(['Team 1', 'Team 2', 'Team 3']);
  const [teamPoints, setTeamPoints] = useState([0, 0, 0]);
  const [availableCards, setAvailableCards] = useState([...points]);

  const handleClick = (cardIndex) => {
    if (!selectedCards.includes(cardIndex)) {
      // Only add the card to selectedCards if it's not already selected
      setSelectedCards([...selectedCards, cardIndex]);
    }

    const dialog = dialogRef.current;

    if (dialog) {
      dialog.showModal();
    }
  };

  const handleClose = () => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.close();
    }
  };

  // Add a CSS class to selected cards
  const getCardClassName = (rowIndex, colIndex) => {
    const cardIndex = rowIndex * 5 + colIndex;
    if (selectedCards.includes(cardIndex)) {
      return "text-teal-50 bg-red-500 p-8 rounded-lg text-center cursor-pointer text-xl";
    } else {
      return "text-teal-50 bg-cyan-900 p-8 rounded-lg text-center cursor-pointer text-xl hover:bg-cyan-600";
    }
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
              className={getCardClassName(rowIndex, colIndex)}
              onClick={() => handleClick(rowIndex * 5 + colIndex)}
            >
              {point}
            </div>
          ))}
        </div>
      ))}

      {/* Dialog */}
      <dialog ref={dialogRef} className="dialog bg-white rounded-lg p-4 max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold mb-2">{selectedCards.length > 0 ? questions[selectedCards[selectedCards.length - 1]] : ''}</h2>
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