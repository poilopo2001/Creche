import React, { useState } from 'react';
import { Calculator, Calendar, Book, Activity, Heart, Brain } from 'lucide-react';

const ParentingTipsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [babyWeight, setBabyWeight] = useState<number>(0);
  const [babyAge, setBabyAge] = useState<number>(0);

  const categories = [
    { name: "Soins du nourrisson", icon: <Heart size={24} /> },
    { name: "Développement du tout-petit", icon: <Activity size={24} /> },
    { name: "Préparation à la maternelle", icon: <Book size={24} /> },
    { name: "Discipline positive", icon: <Brain size={24} /> },
  ];

  const calculateMilkNeeds = (weight: number): number => {
    return weight * 150; // 150ml par kg de poids corporel
  };

  const calculateNextVaccine = (age: number): string => {
    if (age < 2) return "2 mois";
    if (age < 4) return "4 mois";
    if (age < 11) return "11 mois";
    return "Consultez votre pédiatre pour le calendrier vaccinal complet";
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Conseils aux Parents</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`p-6 rounded-lg shadow-md flex flex-col items-center justify-center transition-all ${
                selectedCategory === category.name ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-indigo-100'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon}
              <span className="mt-2 text-lg font-semibold">{category.name}</span>
            </button>
          ))}
        </div>

        {selectedCategory === "Soins du nourrisson" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Calculateur de besoins en lait</h2>
            <div className="flex items-center mb-4">
              <input
                type="number"
                placeholder="Poids du bébé (kg)"
                className="border rounded p-2 mr-4"
                value={babyWeight || ''}
                onChange={(e) => setBabyWeight(Number(e.target.value))}
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => alert(`Besoins quotidiens en lait : ${calculateMilkNeeds(babyWeight)} ml`)}
              >
                Calculer
              </button>
            </div>
          </div>
        )}

        {selectedCategory === "Développement du tout-petit" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Calendrier vaccinal</h2>
            <div className="flex items-center mb-4">
              <input
                type="number"
                placeholder="Âge de l'enfant (mois)"
                className="border rounded p-2 mr-4"
                value={babyAge || ''}
                onChange={(e) => setBabyAge(Number(e.target.value))}
              />
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                onClick={() => alert(`Prochain vaccin recommandé : ${calculateNextVaccine(babyAge)}`)}
              >
                Vérifier
              </button>
            </div>
          </div>
        )}

        {selectedCategory === "Préparation à la maternelle" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Liste de compétences pour la maternelle</h2>
            <ul className="list-disc pl-6">
              <li>Reconnaître les lettres de l'alphabet</li>
              <li>Compter jusqu'à 20</li>
              <li>Connaître les formes de base</li>
              <li>Savoir s'habiller seul</li>
              <li>Être capable de suivre des instructions simples</li>
            </ul>
          </div>
        )}

        {selectedCategory === "Discipline positive" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Techniques de discipline positive</h2>
            <ul className="list-disc pl-6">
              <li>Établir des règles claires et cohérentes</li>
              <li>Utiliser le renforcement positif</li>
              <li>Pratiquer l'écoute active</li>
              <li>Offrir des choix limités</li>
              <li>Utiliser le time-out de manière appropriée</li>
            </ul>
          </div>
        )}

        <div className="bg-indigo-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Conseil du jour</h2>
          <p className="text-lg">
            La cohérence est la clé d'une parentalité efficace. Établissez des routines et des règles claires, 
            et assurez-vous que tous les adultes qui s'occupent de l'enfant les suivent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentingTipsPage;