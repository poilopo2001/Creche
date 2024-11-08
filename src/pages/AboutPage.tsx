import React from 'react';
import { Users, Shield, Heart, Award, Zap, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Découvrez DayCareConnect</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-indigo-600">Notre Histoire</h2>
          <p className="text-lg mb-6">
            Née de l'expérience de parents frustrés par la difficulté de trouver la crèche idéale, DayCareConnect a vu le jour en 2023 avec une mission claire : révolutionner la façon dont les familles trouvent et choisissent leurs services de garde d'enfants.
          </p>
          <p className="text-lg mb-6">
            En seulement un an, nous sommes devenus la référence au Luxembourg pour les parents à la recherche d'environnements sûrs, stimulants et adaptés à leurs tout-petits. Notre plateforme innovante allie technologie de pointe et touche humaine pour offrir une expérience personnalisée à chaque famille.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">Nos Valeurs Fondamentales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Shield className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Sécurité Avant Tout</h3>
            <p>Nous vérifions rigoureusement chaque crèche pour garantir les plus hauts standards de sécurité et de bien-être.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Heart className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Amour et Bienveillance</h3>
            <p>Nous croyons en l'importance d'un environnement chaleureux et attentionné pour l'épanouissement de chaque enfant.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Award className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Excellence Éducative</h3>
            <p>Nous mettons en avant des programmes pédagogiques innovants pour stimuler le développement et l'apprentissage.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Users className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Communauté Solidaire</h3>
            <p>Nous créons des liens forts entre parents, enfants et éducateurs pour un soutien mutuel.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Zap className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Innovation Continue</h3>
            <p>Nous intégrons les dernières avancées en matière de petite enfance pour toujours mieux servir nos familles.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <Globe className="mx-auto mb-4 text-indigo-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Diversité Célébrée</h3>
            <p>Nous embrassons la richesse culturelle du Luxembourg en proposant des crèches multiculturelles et multilingues.</p>
          </div>
        </div>

        <div className="bg-indigo-600 text-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Notre Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p>Familles Connectées</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">300+</p>
              <p>Crèches Partenaires</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">98%</p>
              <p>Taux de Satisfaction</p>
            </div>
          </div>
          <p className="text-lg">
            Chaque jour, nous contribuons à créer des sourires, à rassurer des parents et à offrir aux enfants les meilleures opportunités pour grandir et s'épanouir.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-indigo-600">Rejoignez l'Aventure DayCareConnect</h2>
          <p className="text-lg mb-6">
            Que vous soyez un parent à la recherche de la crèche parfaite ou un professionnel de la petite enfance souhaitant rejoindre notre réseau d'excellence, DayCareConnect est là pour vous. Ensemble, construisons un avenir radieux pour nos enfants.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-primary">Trouvez Votre Crèche Idéale</button>
            <button className="btn btn-secondary">Devenez Partenaire</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;