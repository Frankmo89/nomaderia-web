import React from 'react';
import type { Destination } from './SmartQuoter';

interface TripDetailProps {
  destination: Destination;
  onClose: () => void;
}

const difficultyMap = {
  1: 'Principiante',
  2: 'Intermedio',
  3: 'Trekking Intenso',
  4: 'Técnico/Alta Montaña',
};

const TripDetail: React.FC<TripDetailProps> = ({ destination, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">✕</button>
        <h2 className="text-2xl font-bold mb-2">{destination.name} ({destination.country})</h2>
        <p className="mb-2"><span className="font-semibold">Nivel Técnico:</span> {destination.difficulty_tier} - {difficultyMap[destination.difficulty_tier as 1|2|3|4]}</p>
        <div className="mb-2">
          <span className="font-semibold">Lista de Equipo Necesario:</span>
          <ul className="list-disc ml-6 mt-1">
            {destination.gear_list.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Requisitos Físicos:</span>
          <p>{destination.physical_reqs}</p>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Costo Base:</span> ${destination.base_cost} USD
        </div>
        <div className="mb-2">
          <span className="font-semibold">Costo Estimado Vuelo:</span> ${destination.estimated_flight_cost} USD
        </div>
        {destination.surcharge_fee > 0 && (
          <div className="mb-2">
            <span className="font-semibold">Recargo/fee:</span> ${destination.surcharge_fee} USD
          </div>
        )}
        <div className="mb-2">
          <span className="font-semibold">Temporada:</span> {destination.season_start} a {destination.season_end}
        </div>
      </div>
    </div>
  );
};

export default TripDetail;
