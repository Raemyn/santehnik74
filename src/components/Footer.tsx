import { Droplets, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const phone = '8 (908) 049-31-34';
const phoneHref = 'tel:+79080493134';
const vkHref = 'https://vk.com/public101886759';

const navLinks = [
  { to: '/services', label: 'Услуги' },
  { to: '/about', label: 'О нас' },
  { to: '/contact', label: 'Контакты' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="mb-12 flex flex-col items-center justify-between gap-8 border-b border-white/10 pb-12 md:flex-row">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-2">
              <Droplets className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Сантехника <span className="text-blue-500">Челябинск</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Contacts */}
          <div className="flex gap-4">
            <a
              href={phoneHref}
              title={phone}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-blue-600"
            >
              <Phone size={18} />
            </a>

            <a
              href={vkHref}
              target="_blank"
              rel="noopener noreferrer"
              title="ВКонтакте"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-blue-600"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M13.162 18.994c.609 0 .858-.406.858-.915c0-.995-.013-2.434-.013-2.907c0-.703.302-.946.709-.946c.407 0 1.087.013 1.087.013s.608-.02 1.087.535c.479.555 1.244 1.485 1.612 1.919c.368.433.9 1.301 1.498 1.301c.598 0 2.501-.013 2.501-.013s1.209-.06.674-.902c-.535-.842-2.454-3.18-2.454-3.18s-.238-.326-.027-.738c.211-.412 1.901-2.594 2.091-3.477c.19-.883.141-1.277-.124-1.277c-.265 0-2.21.013-2.21.013s-.475.013-.826.326c-.35.313-.757.826-.757.826s-1.203 1.646-1.728 2.21c-.525.565-.753.63-.94.63c-.188 0-.414-.21-.414-.604c0-.394.013-2.394.013-2.394s.01-.652-.273-.938c-.283-.286-.818-.339-.818-.339s-1.523-.016-2.107.012c-.584.028-.826.166-.826.166s-.414.19-.249.665c.165.475.753.587.753.587s.389.048.502.261c.113.213.113.689.113.689s0 1.629-.013 2.369c0 .74-.451.872-.451.872s-.615.051-1.269-.872c-.654-.923-1.889-3.231-1.889-3.231s-.153-.339-.433-.521c-.279-.181-.672-.235-.672-.235s-2.027.013-2.541.013c-.514 0-.663.235-.663.235s-.051.451.529 1.382c.58 1.382 2.399 4.638 4.603 6.921c2.203 2.283 4.717 2.283 4.717 2.283z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <p>
            © 2026 Сантехник Челябинск. Все права защищены. Работаем в Челябинске и пригороде!
          </p>

          <div className="flex gap-6">
            <Link to="#" className="transition-colors hover:text-white">
              Политика конфиденциальности
            </Link>
            <Link to="#" className="transition-colors hover:text-white">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}