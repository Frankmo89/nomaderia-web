import React, { useState } from 'react';

// Tipos para los destinos
export interface Destination {
  id: string;
  name: string;
  country: string;
  difficulty_tier: number;
  gear_list: string[];
  base_cost: number;
  estimated_flight_cost: number;
  physical_reqs: string;
  surcharge_fee: number;
  season_start: string;
  season_end: string;
}

// Props: lista de destinos
interface SmartQuoterProps {
  destinations: Destination[];
}

const difficultyLabels = [
  '1 - Principiante',
  '2 - Intermedio',
  '3 - Trekking Intenso',
  '4 - Técnico/Alta Montaña',
];

export const SmartQuoter: React.FC<SmartQuoterProps> = ({ destinations }) => {
  const [budget, setBudget] = useState(1000);
  const [difficulty, setDifficulty] = useState(1);

  const filtered = destinations.filter(dest =>
    dest.difficulty_tier === difficulty &&
    (dest.base_cost + dest.estimated_flight_cost + (dest.surcharge_fee || 0)) <= budget
  );

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Cotizador de Aventuras</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Presupuesto (USD): {budget}</label>
        <input
          type="range"
          min={100}
          max={5000}
          step={50}
          value={budget}
          onChange={e => setBudget(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Dificultad</label>
        <select
          value={difficulty}
          onChange={e => setDifficulty(Number(e.target.value))}
          className="w-full border rounded px-2 py-1"
        >
          {difficultyLabels.map((label, idx) => (
            <option key={idx + 1} value={idx + 1}>{label}</option>
          ))}
        </select>
      </div>
      <div>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No hay destinos que coincidan con tus criterios.</p>
        ) : (
          <div className="grid gap-4">
            {filtered.map(dest => (
              <div key={dest.id} className="border rounded p-3 bg-gray-50">
                <h3 className="font-semibold text-lg">{dest.name} ({dest.country})</h3>
                <p>Dificultad: {dest.difficulty_tier}</p>
                <p>Costo base: ${dest.base_cost} + Vuelo: ${dest.estimated_flight_cost} {dest.surcharge_fee ? `+ Fee: $${dest.surcharge_fee}` : ''}</p>
                <p>Temporada: {dest.season_start} a {dest.season_end}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartQuoter;
