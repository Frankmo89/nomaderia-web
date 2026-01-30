import React from 'react';

export function SurchargeBadge() {
  return (
    <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-2 animate-pulse">
      ⚠️ $100 Non-Res Fee
    </span>
  );
}

export function FreeTaxBadge() {
  return (
    <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full ml-2 animate-bounce">
      ⭐ Libre de Impuesto
    </span>
  );
}
