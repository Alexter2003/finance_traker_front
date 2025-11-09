import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;

