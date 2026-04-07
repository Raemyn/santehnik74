import { motion } from 'motion/react';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Контакты</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Мы работаем в Челябинске и пригороде с 10:00 до 19:00.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-bold">Телефон</h3>
              </div>
              <p className="text-slate-600 text-lg">8 (908) 049-31-34</p>
              <p className="text-slate-600 text-lg">235-00-67</p>
              <p className="text-slate-400 text-sm mt-2">Ежедневно с 10:00 до 19:00</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <MapPin size={24} />
                </div>
                <h3 className="text-xl font-bold">Адрес</h3>
              </div>
              <p className="text-slate-600 text-lg">г. Челябинск и пригород</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-xl text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M13.162 18.994c.609 0 .858-.406.858-.915c0-.995-.013-2.434-.013-2.907c0-.703.302-.946.709-.946c.407 0 1.087.013 1.087.013s.608-.02 1.087.535c.479.555 1.244 1.485 1.612 1.919c.368.433.9 1.301 1.498 1.301c.598 0 2.501-.013 2.501-.013s1.209-.06.674-.902c-.535-.842-2.454-3.18-2.454-3.18s-.238-.326-.027-.738c.211-.412 1.901-2.594 2.091-3.477c.19-.883.141-1.277-.124-1.277c-.265 0-2.21.013-2.21.013s-.475.013-.826.326c-.35.313-.757.826-.757.826s-1.203 1.646-1.728 2.21c-.525.565-.753.63-.94.63c-.188 0-.414-.21-.414-.604c0-.394.013-2.394.013-2.394s.01-.652-.273-.938c-.283-.286-.818-.339-.818-.339s-1.523-.016-2.107.012c-.584.028-.826.166-.826.166s-.414.19-.249.665c.165.475.753.587.753.587s.389.048.502.261c.113.213.113.689.113.689s0 1.629-.013 2.369c0 .74-.451.872-.451.872s-.615.051-1.269-.872c-.654-.923-1.889-3.231-1.889-3.231s-.153-.339-.433-.521c-.279-.181-.672-.235-.672-.235s-2.027.013-2.541.013c-.514 0-.663.235-.663.235s-.051.451.529 1.382c.58 1.382 2.399 4.638 4.603 6.921c2.203 2.283 4.717 2.283 4.717 2.283z"/></svg>
                </div>
                <h3 className="text-xl font-bold">ВКонтакте</h3>
              </div>
              <a href="https://vk.com/public101886759" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-lg hover:text-blue-600 transition-colors">vk.com/public101886759</a>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-bold mb-8">Напишите нам</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Ваше имя"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <input 
                  type="tel" 
                  placeholder="Ваш телефон"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <textarea 
                rows={6}
                placeholder="Ваше сообщение..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              ></textarea>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
