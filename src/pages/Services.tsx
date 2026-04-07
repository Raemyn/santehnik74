import { motion } from 'motion/react';
import { Droplets, Wrench, Thermometer, Hammer, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: <Droplets className="w-12 h-12" />,
    title: "Замена водосчётчиков",
    description: "Установка и замена счетчиков воды. 1 счётчик – от 600 ₽, 2 счётчика – от 1000 ₽, 3 счётчика – от 1500 ₽, 4 счётчика – от 1900 ₽. Стоимость самих счётчиков 1000 ₽.",
    price: "от 600 ₽"
  },
  {
    icon: <Wrench className="w-12 h-12" />,
    title: "Установка унитаза",
    description: "Замена и установка унитаза. Качественный монтаж с гарантией.",
    price: "от 2500 ₽"
  },
  {
    icon: <Thermometer className="w-12 h-12" />,
    title: "Отопление",
    description: "Монтаж и демонтаж радиаторов, разводка труб отопления.",
    price: "от 3000 ₽"
  },
  {
    icon: <Hammer className="w-12 h-12" />,
    title: "Установка ванны",
    description: "Профессиональная установка ванны любого типа.",
    price: "от 2000 ₽"
  },
  {
    icon: <Droplets className="w-12 h-12" />,
    title: "Смесители",
    description: "Установка смесителя в ванну (от 1500 ₽) или в раковину (от 2000 ₽).",
    price: "от 1500 ₽"
  },
  {
    icon: <Thermometer className="w-12 h-12" />,
    title: "Водонагреватели",
    description: "Установка и подключение накопительных и проточных водонагревателей.",
    price: "от 2500 ₽"
  },
  {
    icon: <Wrench className="w-12 h-12" />,
    title: "Разводка воды",
    description: "Монтаж разводки воды из полипропилена под ключ.",
    price: "от 8000 ₽"
  },
  {
    icon: <CheckCircle2 className="w-12 h-12" />,
    title: "Дополнительно",
    description: "Инсталляция (рама) от 2000 ₽, замена обвязок от 1000 ₽, минимальный выезд от 1000 ₽.",
    price: "от 1000 ₽"
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">Наши услуги</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Полный спектр сантехнических работ любой сложности с гарантией 1 год.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              <div className="bg-blue-50 p-6 rounded-2xl text-blue-600">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-6 text-lg">{service.description}</p>
                <span className="text-blue-600 font-extrabold text-xl">{service.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
