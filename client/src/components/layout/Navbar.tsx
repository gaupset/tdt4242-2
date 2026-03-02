import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-blue-600">
              AI Guidebook
            </Link>
            {user && (
              <div className="hidden sm:flex gap-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Dashboard
                </Link>
                <Link
                  to="/projects"
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Projects
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="hidden sm:block text-sm text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="sm:hidden p-2 text-gray-600 hover:text-gray-900"
                  aria-label="Toggle menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {user && menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm font-medium py-1">
            Dashboard
          </Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)} className="text-gray-700 text-sm font-medium py-1">
            Projects
          </Link>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500">{user.name}</span>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
