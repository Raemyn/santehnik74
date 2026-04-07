import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_LINKS = [
  { name: 'Главная', path: '/' },
  { name: 'Услуги', path: '/services' },
  { name: 'О нас', path: '/about' },
  { name: 'Контакты', path: '/contact' },
];

const PHONE_NUMBER = '8 (908) 049-31-34';
const PHONE_HREF = 'tel:+79080493134';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isDarkHeader = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const headerClassName = isDarkHeader
    ? 'bg-transparent py-5'
    : 'bg-white/95 backdrop-blur-md shadow-md py-3';

  const textClassName = isDarkHeader ? 'text-white' : 'text-slate-900';
  const linkClassName = isDarkHeader
    ? 'text-white/90 hover:text-blue-300'
    : 'text-slate-600 hover:text-blue-600';

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerClassName}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-600 p-2">
            <Droplets className="h-6 w-6 text-white" />
          </div>

          <span className={`text-xl font-bold tracking-tight ${textClassName}`}>
            Сантехника <span className="text-blue-500">Челябинск</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${linkClassName}`}
            >
              {link.name}
            </Link>
          ))}

          <a
            href={PHONE_HREF}
            className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-200 transition-colors hover:bg-blue-700"
          >
            <Phone size={18} />
            {PHONE_NUMBER}
          </a>
        </div>

        <button
          type="button"
          className={`md:hidden ${textClassName}`}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-full w-full border-t border-slate-100 bg-white p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-left text-lg font-medium text-slate-700 transition-colors hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}

              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition-colors hover:bg-blue-700"
              >
                <Phone size={20} />
                {PHONE_NUMBER}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}