import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin } from 'lucide-react';

type LeadFormState = {
  name: string;
  phone: string;
  message: string;
};

const API_URL = 'http://localhost:3001/api/lead';

export default function Contact() {
  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Не удалось отправить заявку');
        return;
      }

      setSuccess('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
      setForm({ name: '', phone: '', message: '' });
    } catch {
      setError('Ошибка сети. Проверьте сервер.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold text-slate-900 md:text-6xl">
            Контакты
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-600">
            Мы работаем в Челябинске и пригороде с 10:00 до 19:00.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-1">
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold">Телефон</h3>
              </div>
              <p className="text-lg text-slate-600">8 (908) 049-31-34</p>
              <p className="text-lg text-slate-600">235-00-67</p>
              <p className="mt-2 text-sm text-slate-400">
                Ежедневно с 10:00 до 19:00
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold">Адрес</h3>
              </div>
              <p className="text-lg text-slate-600">г. Челябинск и пригород</p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-xl bg-blue-600 p-3 text-white">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M13.162 18.994c.609 0 .858-.406.858-.915c0-.995-.013-2.434-.013-2.907c0-.703.302-.946.709-.946c.407 0 1.087.013 1.087.013s.608-.02 1.087.535c.479.555 1.244 1.485 1.612 1.919c.368.433.9 1.301 1.498 1.301c.598 0 2.501-.013 2.501-.013s1.209-.06.674-.902c-.535-.842-2.454-3.18-2.454-3.18s-.238-.326-.027-.738c.211-.412 1.901-2.594 2.091-3.477c.19-.883.141-1.277-.124-1.277c-.265 0-2.21.013-2.21.013s-.475.013-.826.326c-.35.313-.757.826-.757.826s-1.203 1.646-1.728 2.21c-.525.565-.753.63-.94.63c-.188 0-.414-.21-.414-.604c0-.394.013-2.394.013-2.394s.01-.652-.273-.938c-.283-.286-.818-.339-.818-.339s-1.523-.016-2.107.012c-.584.028-.826.166-.826.166s-.414.19-.249.665c.165.475.753.587.753.587s.389.048.502.261c.113.213.113.689.113.689s0 1.629-.013 2.369c0 .74-.451.872-.451.872s-.615.051-1.269-.872c-.654-.923-1.889-3.231-1.889-3.231s-.153-.339-.433-.521c-.279-.181-.672-.235-.672-.235s-2.027.013-2.541.013c-.514 0-.663.235-.663.235s-.051.451.529 1.382c.58 1.382 2.399 4.638 4.603 6.921c2.203 2.283 4.717 2.283 4.717 2.283z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">ВКонтакте</h3>
              </div>
              <a
                href="https://vk.com/public101886759"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-slate-600 transition-colors hover:text-blue-600"
              >
                vk.com/public101886759
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-xl lg:col-span-2">
            <h3 className="mb-8 text-2xl font-bold">Напишите нам</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="tel"
                  placeholder="Ваш телефон"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                rows={6}
                placeholder="Ваше сообщение..."
                value={form.message}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              {success ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-5 text-lg font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Отправка...' : 'Отправить сообщение'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}