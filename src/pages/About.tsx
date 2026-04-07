import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Более 10 лет в Челябинске</h1>
         
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img 
            src="/src/assets/map.png" 
            alt="Наш мастер за работой" 
            className="rounded-[3rem] w-full h-[500px] object-cover shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-6 text-slate-700 text-lg">
            <p>
              Мы работаем в Челябинске и пригороде с 10:00 до 19:00. Выезд мастера осуществляется по предварительной записи — как договоритесь.
            </p>
            <p>
              Работаем официально по договору и предоставляем гарантию 1 год на все виды услуг. Принимаем оплату любым удобным способом.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
