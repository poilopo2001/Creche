import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface ArticleBlog {
  id: number;
  titre: string;
  extrait: string;
  date: string;
  auteur: string;
  image: string;
}

const PageBlog: React.FC = () => {
  const [articlesBlog, setArticlesBlog] = useState<ArticleBlog[]>([]);
  const [page, setPage] = useState(1);
  const [chargement, setChargement] = useState(false);
  const [plusDArticles, setPlusDArticles] = useState(true);

  const recupererArticles = useCallback(async () => {
    if (chargement || !plusDArticles) return;
    setChargement(true);
    try {
      // Simulation d'un appel API avec un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      const nouveauxArticles = genererArticlesFictifs(page, 6);
      if (nouveauxArticles.length === 0) {
        setPlusDArticles(false);
      } else {
        setArticlesBlog(articlesPrec => [...articlesPrec, ...nouveauxArticles]);
        setPage(pagePrec => pagePrec + 1);
      }
    } catch (erreur) {
      console.error('Erreur lors de la récupération des articles de blog:', erreur);
    } finally {
      setChargement(false);
    }
  }, [page, chargement, plusDArticles]);

  useEffect(() => {
    recupererArticles();
  }, []);

  useEffect(() => {
    const gererDefilement = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        recupererArticles();
      }
    };

    window.addEventListener('scroll', gererDefilement);
    return () => window.removeEventListener('scroll', gererDefilement);
  }, [recupererArticles]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Blog DayCareConnect</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesBlog.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={article.image} alt={article.titre} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{article.titre}</h2>
                <p className="text-gray-600 mb-4">{article.extrait}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>Par {article.auteur}</span>
                </div>
                <Link to={`/blog/${article.id}`} className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                  Lire la suite
                </Link>
              </div>
            </div>
          ))}
        </div>
        {chargement && (
          <div className="text-center mt-8">
            <ChevronDown className="animate-bounce mx-auto text-indigo-600" size={32} />
            <p className="text-gray-600">Chargement d'autres articles...</p>
          </div>
        )}
        {!plusDArticles && (
          <p className="text-center mt-8 text-gray-600">Plus d'articles à charger.</p>
        )}
      </div>
    </div>
  );
};

// Fonction auxiliaire pour générer des articles de blog fictifs
function genererArticlesFictifs(page: number, parPage: number): ArticleBlog[] {
  const idDebut = (page - 1) * parPage + 1;
  const idFin = idDebut + parPage;
  const articles: ArticleBlog[] = [];

  for (let id = idDebut; id < idFin; id++) {
    articles.push({
      id,
      titre: `Article de blog ${id}`,
      extrait: `Ceci est un résumé de l'article de blog ${id}. Cliquez pour en savoir plus sur ce sujet intéressant.`,
      date: new Date(Date.now() - id * 86400000).toLocaleDateString(),
      auteur: `Auteur ${id % 5 + 1}`,
      image: `https://source.unsplash.com/random/800x600?sig=${id}`
    });
  }

  return articles;
}

export default PageBlog;