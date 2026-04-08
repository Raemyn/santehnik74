import { motion } from 'motion/react';
import mapImage from '../assets/chelyabinsk-map-about.webp';

export default function About() {
  return (
    <div className="pb-24 pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <h1 className="mb-6 text-4xl font-extrabold text-slate-900 md:text-6xl">
            Более 10 лет в Челябинске
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <img
            src={mapImage}
            alt="Карта района обслуживания"
            className="h-[500px] w-full rounded-[3rem] object-cover shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-6 text-lg text-slate-700">
            <p>
              Мы работаем в Челябинске и пригороде с 10:00 до 19:00. Выезд мастера
              осуществляется по предварительной записи — как договоритесь.
            </p>
            <p>
              Работаем официально по договору и предоставляем гарантию 1 год на все
              виды услуг. Принимаем оплату любым удобным способом.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}