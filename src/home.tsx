import { Link } from 'react-router-dom';
import {routes} from '@/routes';
import Header from "@/components/header.tsx";

function Home() {
  return (
      <>
        <Header/>
      <div className={"mt-10"}></div>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl">
          Bienvenue sur  <span className="text-blue-600">TiqPass 🎟️</span>
        </h1>
        <p className="mt-4 text-gray-600 sm:text-lg">
          Un système de billetterie simple et efficace pour gérer vos évènements, tickets en toute simplicité et clarté.</p>
        <div className="mt-6">
          <Link
            to={routes.dashboard}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Suivez voter billetterie</h2>
          <p className="mt-2 text-gray-600">
            Maitriser vos effectifs de vente à tout moment.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Collaborer facilement</h2>
          <p className="mt-2 text-gray-600">
            Gérer à plusieurs pour un meilleur suivi.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Mises à jour en temps réel</h2>
          <p className="mt-2 text-gray-600">
            Vos mises à jours sur vos billeterie sont appliquées instantanément
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Tableau de bord intuitif</h2>
          <p className="mt-2 text-gray-600">
            Accédez aux résumés et aux informations dans un tableau de bord bien organisé.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Vues personnalisables</h2>
          <p className="mt-2 text-gray-600">
            Vous décidez des champs et images disponibles sur vos billeterie
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800">Sûre et fiable</h2>
          <p className="mt-2 text-gray-600">
            Bénéficiez d'une solide intégrité des données grâce à un stockage sécurisé dans le cloud.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TiqkisPass. All rights reserved.
      </footer>
    </div>
      </>
  );
}

export default Home;