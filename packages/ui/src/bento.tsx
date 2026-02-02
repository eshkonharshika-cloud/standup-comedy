import React from "react";

export type BentoCard = {
  id: string;
  label?: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  colSpan?: number;
  rowSpan?: number;
  roundedVariant?: "none" | "sm" | "md" | "lg" | "full";
};

export type BentoSectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  cards: BentoCard[];
};

export const BentoSection: React.FC<BentoSectionProps> = ({
  eyebrow,
  title,
  description,
  cards,
}) => {
  return (
    <section className="py-16 px-6">
      {eyebrow && <p className="text-sm font-semibold text-orange-500 mb-1">{eyebrow}</p>}
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-6">{description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`group relative overflow-hidden shadow-md p-4 rounded-${card.roundedVariant || "md"} cursor-pointer`}
            style={{
              gridColumnEnd: `span ${card.colSpan || 1}`,
              gridRowEnd: `span ${card.rowSpan || 1}`,
            }}
          >
            {card.label && (
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {card.label}
              </span>
            )}
            <img
              src={card.imageUrl}
              alt={card.imageAlt || card.title}
              className="w-full h-48 object-cover mb-3 rounded"
            />
            <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
            {card.description && <p className="text-gray-500 text-sm">{card.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BentoSection;
