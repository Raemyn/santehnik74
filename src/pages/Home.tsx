import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplets,
  Wrench,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Star,
  CheckCircle2,
  Hammer,
  Thermometer,
  Phone,
} from 'lucide-react';

import backgroundImage from '../assets/main-hero-background.webp';
import projectImage1 from '../assets/water-meters-hero.webp';
import projectImage2 from '../assets/toilet-installation-hero.webp';
import projectImage3 from '../assets/underfloor-heating-installation-hero.webp';
import aboutImage from '../assets/plumber-hero.webp';

const projects = [
  {
    image: projectImage1,
    title: 'Замена и монтаж водосчётчиков',
    location: 'ул. Ленина, д. 45',
    description:
      'Замена старых водосчётчиков на новые с последующей пломбировкой.',
    duration: '1 час',
    materials: 'Счётчики + фитинги',
  },
  {
    image: projectImage2,
    title: 'Монтаж инсталляции',
    location: 'ул. Новороссиская, д. 146',
    description:
      'Установка унитаза с инсталляцией и скрытым люком для доступа к коммуникациям.',
    duration: '1 день',
    materials: 'Рама инсталляции',
  },
  {
    image: projectImage3,
    title: 'Тёплый пол',
    location: 'СНТ Трубопроводчик',
    description:
      'Монтаж котельной и системы тёплого пола на площади 250 кв.м.',
    duration: '20 дней',
    materials: 'Обговаривался с заказчиком',
  },
];

const services = [
  {
    icon: Droplets,
    title: 'Замена водосчётчиков',
    description:
      'Профессиональная установка и замена счетчиков воды. Стоимость счетчиков от 1000 ₽.',
    price: 'от 600 ₽',
  },
  {
    icon: Wrench,
    title: 'Установка унитаза',
    description:
      'Замена и установка унитаза, биде или инсталляции под ключ.',
    price: 'от 2500 ₽',
  },
  {
    icon: Thermometer,
    title: 'Отопление',
    description:
      'Монтаж и демонтаж радиаторов, разводка труб отопления в квартирах и домах.',
    price: 'от 3000 ₽',
  },
  {
    icon: Hammer,
    title: 'Установка ванны',
    description: 'Качественный монтаж ванн любого типа и сложности.',
    price: 'от 2000 ₽',
  },
];

const testimonials = [
  {
    name: 'Александр Петров',
    text: 'Созвонились, быстро договорились о встрече. Мастер приехал вовремя, аккуратно заменил счётчики — кстати, у них счётчики оказались даже дешевле, чем в магазинах. Всё сделали качественно, остался полностью доволен. Теперь при любых проблемах обращаюсь только к ним.',
    rating: 5,
  },
  {
    name: 'Елена Иванова',
    text: 'Нужно было заменить ванну — созвонились, быстро договорились о времени. Мастер приехал вовремя, всё сделал аккуратно и без лишнего шума. Работу выполнил качественно, за собой всё убрал. Цена полностью соответствовала заявленной. Осталась довольна, рекомендую!',
    rating: 5,
  },
  {
    name: 'Дмитрий С.',
    text: 'Заказывал разводку труб в новостройке — быстро вышли на связь, проконсультировали и помогли с выбором материалов. Мастер приехал вовремя, всё сделал аккуратно и качественно. Работой полностью доволен, рекомендую!',
    rating: 4,
  },
];

const stats = [
  { label: 'Лет опыта', value: '10+' },
  { label: 'Довольных клиентов', value: '5000+' },
  { label: 'Гарантия на работы', value: '1 год' },
];

const features = [
  {
    icon: Clock,
    title: 'Выезд по записи',
    desc: 'Выезд в удобное для вас время по предварительной договорённости',
  },
  {
    icon: ShieldCheck,
    title: 'Гарантия качества',
    desc: 'Даём гарантию на все выполненные работы сроком 1 год',
  },
  {
    icon: CheckCircle2,
    title: 'Прозрачные цены',
    desc: 'Стоимость работ фиксируется до начала ремонта',
  },
];

const phoneMain = '8 (908) 049-31-34';
const phoneSecondary = '235-00-67';
const vkHref = 'https://vk.com/public101886759';
const API_URL = 'https://santehnik74.onrender.com/api/lead';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function SectionTitle({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">
        {eyebrow}
      </h2>
      <h3 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl">
        {title}
      </h3>
      {description ? (
        <p className="mx-auto max-w-2xl text-lg text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

type LeadFormState = {
  name: string;
  phone: string;
  message: string;
};

export default function Home() {
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentProject, setCurrentProject] = useState(0);

  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const nextProject = useCallback(() => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = window.setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isAutoPlay]);

  const current = projects[currentProject];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

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
      setForm({
        name: '',
        phone: '',
        message: '',
      });
    } catch {
      setError('Ошибка сети. Проверьте сервер.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Plumbing work"
            className="h-full w-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 md:pb-48 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-12 max-w-2xl md:mt-0"
          >
            <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-7xl">
              Установка, замена, <br />
              <span className="text-blue-400">Ремонт</span>
            </h1>

            <p className="mb-10 text-xl leading-relaxed text-slate-200">
              Профессиональная установка и замена счетчиков воды. <br />
              <span className="font-bold text-blue-400">
                Стоимость счетчиков 1000 ₽.
              </span>{' '}
              У нас счётчики дешевле!
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:bg-blue-700"
              >
                Вызвать мастера
                <ChevronRight size={20} />
              </button>

              <a
                href={vkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
              >
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M13.162 18.994c.609 0 .858-.406.858-.915c0-.995-.013-2.434-.013-2.907c0-.703.302-.946.709-.946c.407 0 1.087.013 1.087.013s.608-.02 1.087.535c.479.555 1.244 1.485 1.612 1.919c.368.433.9 1.301 1.498 1.301c.598 0 2.501-.013 2.501-.013s1.209-.06.674-.902c-.535-.842-2.454-3.18-2.454-3.18s-.238-.326-.027-.738c.211-.412 1.901-2.594 2.091-3.477c.19-.883.141-1.277-.124-1.277c-.265 0-2.21.013-2.21.013s-.475.013-.826.326c-.35.313-.757.826-.757.826s-1.203 1.646-1.728 2.21c-.525.565-.753.63-.94.63c-.188 0-.414-.21-.414-.604c0-.394.013-2.394.013-2.394s.01-.652-.273-.938c-.283-.286-.818-.339-.818-.339s-1.523-.016-2.107.012c-.584.028-.826.166-.826.166s-.414.19-.249.665c.165.475.753.587.753.587s.389.048.502.261c.113.213.113.689.113.689s0 1.629-.013 2.369c0 .74-.451.872-.451.872s-.615.051-1.269-.872c-.654-.923-1.889-3.231-1.889-3.231s-.153-.339-.433-.521c-.279-.181-.672-.235-.672-.235s-2.027.013-2.541.013c-.514 0-.663.235-.663.235s-.051.451.529 1.382c.58 1.382 2.399 4.638 4.603 6.921c2.203 2.283 4.717 2.283 4.717 2.283z" />
                </svg>
                Группа ВК
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 hidden w-full bg-gradient-to-t from-black/50 to-transparent pb-10 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="border-l border-white/20 pl-6 text-white"
                >
                  <div className="mb-1 text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-blue-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <Icon className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle
              eyebrow="Наши услуги"
              title="Решим любую проблему"
              description="Мы выполняем полный спектр сантехнических работ — от мелкого ремонта до проектирования систем в частных домах."
              center
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="group flex flex-col rounded-3xl border border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:border-blue-200 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h4 className="mb-3 text-xl font-bold text-slate-900">
                    {service.title}
                  </h4>
                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-blue-600">{service.price}</span>
                    <button
                      type="button"
                      className="text-slate-400 transition-colors group-hover:text-blue-600"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="relative overflow-hidden bg-slate-900 py-24 text-white"
      >
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-full w-1/3 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Наш мастер за работой"
                className="h-[500px] w-full rounded-[3rem] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-400">
                О нашей компании
              </h2>
              <h3 className="mb-6 text-4xl font-extrabold md:text-5xl">
                Качество и гарантия в Челябинске
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                Санитарно-технические услуги, демонтаж монтаж радиаторов отопления,
                разводка воды из полипропилена, демонтаж монтаж санфаянса! <br />
                <span className="font-bold text-white">{phoneMain}</span> с 10:00 до
                19:00. <br />
                Качество и гарантию на работы даём, договора тоже имеются!
                Челябинск.
              </p>

              <ul className="mb-10 space-y-4">
                {[
                  'Разводка воды и отопления из полипропилена',
                  'Работаем по договору с гарантией',
                  'Принимаем оплату любым удобным способом',
                  'Выезд в любой район Челябинска и пригород',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-500" size={20} />
                    <span className="text-slate-300">{point}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('contact')}
                className="rounded-full bg-white px-8 py-4 font-bold text-slate-900 transition-all duration-300 hover:bg-blue-500 hover:text-white"
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
            <SectionTitle
              eyebrow="Наши работы"
              title="Примеры выполненных проектов"
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsAutoPlay(false);
                  prevProject();
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all hover:bg-white hover:shadow-lg"
                aria-label="Предыдущий проект"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsAutoPlay(false);
                  nextProject();
                }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
                aria-label="Следующий проект"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
              >
                <div className="relative aspect-video overflow-hidden rounded-[2rem] shadow-2xl">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-blue-600 backdrop-blur-sm">
                    <MapPin size={16} />
                    {current.location}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-3xl font-bold text-slate-900">
                    {current.title}
                  </h4>
                  <p className="text-lg leading-relaxed text-slate-600">
                    {current.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <div className="mb-1 font-bold text-blue-600">Срок</div>
                      <div className="text-slate-900">{current.duration}</div>
                    </div>
                    <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <div className="mb-1 font-bold text-blue-600">Материалы</div>
                      <div className="text-slate-900">{current.materials}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollToSection('contact')}
                    className="inline-flex items-center gap-2 font-bold text-blue-600 transition-all hover:gap-4"
                  >
                    Хочу такой же результат <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 flex justify-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsAutoPlay(false);
                    setCurrentProject(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    currentProject === i ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Открыть проект ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <SectionTitle
              eyebrow="Отзывы"
              title="Что говорят наши клиенты"
              center
            />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((review) => (
              <div
                key={review.name}
                className="relative rounded-3xl border border-slate-100 bg-slate-50 p-8"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={
                        j < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      }
                    />
                  ))}
                </div>
                <p className="mb-6 italic leading-relaxed text-slate-700">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-slate-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-blue-600 py-24">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-10">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full border-4 border-white" />
          <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full border-4 border-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[3rem] bg-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-slate-900 p-12 text-white lg:p-20">
                <h3 className="mb-8 text-4xl font-bold">Свяжитесь с нами</h3>
                <p className="mb-12 text-lg text-slate-400">
                  Оставьте заявку, и наш специалист перезвонит вам
                  для консультации.
                </p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
                      <Phone size={24} />
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wider text-slate-400">
                        Телефон
                      </div>
                      <div className="text-xl font-bold">{phoneMain}</div>
                      <div className="text-xl font-bold">{phoneSecondary}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wider text-slate-400">
                        Адрес
                      </div>
                      <div className="text-xl font-bold">г. Челябинск и пригород</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="rounded-2xl bg-blue-600/20 p-4 text-blue-400">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M13.162 18.994c.609 0 .858-.406.858-.915c0-.995-.013-2.434-.013-2.907c0-.703.302-.946.709-.946c.407 0 1.087.013 1.087.013s.608-.02 1.087.535c.479.555 1.244 1.485 1.612 1.919c.368.433.9 1.301 1.498 1.301c.598 0 2.501-.013 2.501-.013s1.209-.06.674-.902c-.535-.842-2.454-3.18-2.454-3.18s-.238-.326-.027-.738c.211-.412 1.901-2.594 2.091-3.477c.19-.883.141-1.277-.124-1.277c-.265 0-2.21.013-2.21.013s-.475.013-.826.326c-.35.313-.757.826-.757.826s-1.203 1.646-1.728 2.21c-.525.565-.753.63-.94.63c-.188 0-.414-.21-.414-.604c0-.394.013-2.394.013-2.394s.01-.652-.273-.938c-.283-.286-.818-.339-.818-.339s-1.523-.016-2.107.012c-.584.028-.826.166-.826.166s-.414.19-.249.665c.165.475.753.587.753.587s.389.048.502.261c.113.213.113.689.113.689s0 1.629-.013 2.369c0 .74-.451.872-.451.872s-.615.051-1.269-.872c-.654-.923-1.889-3.231-1.889-3.231s-.153-.339-.433-.521c-.279-.181-.672-.235-.672-.235s-2.027.013-2.541.013c-.514 0-.663.235-.663.235s-.051.451.529 1.382c.58 1.382 2.399 4.638 4.603 6.921c2.203 2.283 4.717 2.283 4.717 2.283z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm uppercase tracking-wider text-slate-400">
                        ВКонтакте
                      </div>
                      <a
                        href={vkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold transition-colors hover:text-blue-400"
                      >
                        vk.com/public101886759
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        value={form.name}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-slate-700">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Что нужно сделать?
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Опишите вашу проблему..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

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
                    className="w-full rounded-2xl bg-blue-600 py-5 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? 'Отправка...' : 'Отправить заявку'}
                  </button>

                  <p className="text-center text-sm text-slate-400">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}