// ============================================================
// СУЩНОСТЬ 1: Выручка (revenue)
// Статусы: 'confirmed' | 'forecast' | 'at_risk'
// ============================================================
export const revenue = [
  { id: 'REV-2024-01', title: 'Январь 2024', description: 'Совокупная выручка по всем каналам за январь', status: 'confirmed', date: '2024-01-31', channel: 'online', amount: 1240000, currency: 'RUB', growthPercent: 4.2, breakdown: [{ channel: 'ecommerce', amount: 720000 }, { channel: 'retail', amount: 520000 }] },
  { id: 'REV-2024-02', title: 'Февраль 2024', description: 'Выручка с учётом сезонного спада', status: 'confirmed', date: '2024-02-29', channel: 'online', amount: 1180000, currency: 'RUB', growthPercent: -4.8, breakdown: [{ channel: 'ecommerce', amount: 680000 }, { channel: 'retail', amount: 500000 }] },
  { id: 'REV-2024-03', title: 'Март 2024', description: 'Рост за счёт мартовских промо-кампаний', status: 'confirmed', date: '2024-03-31', channel: 'online', amount: 1390000, currency: 'RUB', growthPercent: 17.8, breakdown: [{ channel: 'ecommerce', amount: 810000 }, { channel: 'retail', amount: 580000 }] },
  { id: 'REV-2024-04', title: 'Апрель 2024', description: 'Стабильный рост после промо', status: 'confirmed', date: '2024-04-30', channel: 'online', amount: 1425000, currency: 'RUB', growthPercent: 2.5, breakdown: [{ channel: 'ecommerce', amount: 830000 }, { channel: 'retail', amount: 595000 }] },
  { id: 'REV-2024-05', title: 'Май 2024', description: 'Пик продаж в сегменте B2C', status: 'confirmed', date: '2024-05-31', channel: 'online', amount: 1510000, currency: 'RUB', growthPercent: 6.0, breakdown: [{ channel: 'ecommerce', amount: 880000 }, { channel: 'retail', amount: 630000 }] },
  { id: 'REV-2024-06', title: 'Июнь 2024', description: 'Выручка с учётом летнего затишья', status: 'confirmed', date: '2024-06-30', channel: 'online', amount: 1370000, currency: 'RUB', growthPercent: -9.3, breakdown: [{ channel: 'ecommerce', amount: 790000 }, { channel: 'retail', amount: 580000 }] },
  { id: 'REV-2024-07', title: 'Июль 2024', description: 'Минимальный месяц квартала', status: 'confirmed', date: '2024-07-31', channel: 'online', amount: 1320000, currency: 'RUB', growthPercent: -3.6, breakdown: [{ channel: 'ecommerce', amount: 750000 }, { channel: 'retail', amount: 570000 }] },
  { id: 'REV-2024-08', title: 'Август 2024', description: 'Возврат к росту', status: 'confirmed', date: '2024-08-31', channel: 'online', amount: 1460000, currency: 'RUB', growthPercent: 10.6, breakdown: [{ channel: 'ecommerce', amount: 850000 }, { channel: 'retail', amount: 610000 }] },
  { id: 'REV-2024-09', title: 'Сентябрь 2024', description: 'Старт осеннего сезона', status: 'confirmed', date: '2024-09-30', channel: 'online', amount: 1580000, currency: 'RUB', growthPercent: 8.2, breakdown: [{ channel: 'ecommerce', amount: 920000 }, { channel: 'retail', amount: 660000 }] },
  { id: 'REV-2024-10', title: 'Октябрь 2024', description: 'Предновогодний рост', status: 'confirmed', date: '2024-10-31', channel: 'online', amount: 1640000, currency: 'RUB', growthPercent: 3.8, breakdown: [{ channel: 'ecommerce', amount: 960000 }, { channel: 'retail', amount: 680000 }] },
  { id: 'REV-2024-11', title: 'Ноябрь 2024', description: 'Black Friday — пиковый месяц', status: 'confirmed', date: '2024-11-30', channel: 'online', amount: 1920000, currency: 'RUB', growthPercent: 17.1, breakdown: [{ channel: 'ecommerce', amount: 1180000 }, { channel: 'retail', amount: 740000 }] },
  { id: 'REV-2024-12', title: 'Декабрь 2024', description: 'Новогодний спрос', status: 'confirmed', date: '2024-12-31', channel: 'online', amount: 2080000, currency: 'RUB', growthPercent: 8.3, breakdown: [{ channel: 'ecommerce', amount: 1290000 }, { channel: 'retail', amount: 790000 }] },
  { id: 'REV-2025-01', title: 'Январь 2025', description: 'Фактические данные ещё не закрыты', status: 'at_risk', date: '2025-01-31', channel: 'online', amount: 1150000, currency: 'RUB', growthPercent: -44.7, breakdown: [{ channel: 'ecommerce', amount: 670000 }, { channel: 'retail', amount: 480000 }] },
  { id: 'REV-2025-02', title: 'Февраль 2025', description: 'Прогноз на основе воронки', status: 'forecast', date: '2025-02-28', channel: 'online', amount: 1280000, currency: 'RUB', growthPercent: 11.3, breakdown: [{ channel: 'ecommerce', amount: 740000 }, { channel: 'retail', amount: 540000 }] },
  { id: 'REV-2025-03', title: 'Март 2025', description: 'Прогноз с учётом промо-плана', status: 'forecast', date: '2025-03-31', channel: 'online', amount: 1450000, currency: 'RUB', growthPercent: 13.3, breakdown: [{ channel: 'ecommerce', amount: 850000 }, { channel: 'retail', amount: 600000 }] }
];

// ============================================================
// СУЩНОСТЬ 2: Сделки воронки (deals)
// Статусы: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
// ============================================================
export const deals = [
  { id: 'DEAL-1001', title: 'Внедрение CRM для «Альфа-Ритейл»', description: 'Комплексная автоматизация отдела продаж', status: 'won', date: '2024-11-12', amount: 480000, currency: 'RUB', owner: 'И. Петров', stage: 'Закрыта успешно', contacts: [{ name: 'А. Смирнов', role: 'CTO' }, { name: 'Е. Ковалёва', role: 'CFO' }] },
  { id: 'DEAL-1002', title: 'BI-дашборд для «Бета-Логистик»', description: 'Построение отчётности по KPI логистики', status: 'negotiation', date: '2025-01-20', amount: 320000, currency: 'RUB', owner: 'М. Иванова', stage: 'Согласование условий', contacts: [{ name: 'Д. Орлов', role: 'Директор по развитию' }] },
  { id: 'DEAL-1003', title: 'Аудит данных для «Гамма-Банк»', description: 'Оценка качества мастер-данных', status: 'proposal', date: '2025-01-28', amount: 260000, currency: 'RUB', owner: 'С. Кузнецов', stage: 'Отправлено КП', contacts: [{ name: 'Н. Белова', role: 'Руководитель данных' }] },
  { id: 'DEAL-1004', title: 'Интеграция с 1С для «Дельта-Трейд»', description: 'Синхронизация продаж и склада', status: 'qualified', date: '2025-02-03', amount: 190000, currency: 'RUB', owner: 'И. Петров', stage: 'Квалификация лида', contacts: [{ name: 'О. Зайцев', role: 'ИТ-директор' }] },
  { id: 'DEAL-1005', title: 'Прогнозная аналитика для «Эпсилон»', description: 'ML-модель прогноза выручки', status: 'lead', date: '2025-02-10', amount: 540000, currency: 'RUB', owner: 'М. Иванова', stage: 'Новый лид', contacts: [{ name: 'П. Гусев', role: 'CEO' }] },
  { id: 'DEAL-1006', title: 'Мобильный отчёт для «Зета-Фарм»', description: 'Дашборд для топ-менеджмента', status: 'lost', date: '2024-12-05', amount: 210000, currency: 'RUB', owner: 'С. Кузнецов', stage: 'Проиграна (цена)', contacts: [{ name: 'Л. Титова', role: 'Коммерческий директор' }] },
  { id: 'DEAL-1007', title: 'Финансовый контроль для «Эта-Энерго»', description: 'Консолидация отчётности холдинга', status: 'negotiation', date: '2025-01-15', amount: 720000, currency: 'RUB', owner: 'И. Петров', stage: 'Финальные переговоры', contacts: [{ name: 'В. Морозов', role: 'Финансовый директор' }, { name: 'К. Лебедева', role: 'Руководитель проектов' }] },
  { id: 'DEAL-1008', title: 'Воронка продаж для «Тета-Медиа»', description: 'Анализ конверсии каналов', status: 'won', date: '2024-10-22', amount: 150000, currency: 'RUB', owner: 'М. Иванова', stage: 'Закрыта успешно', contacts: [{ name: 'Р. Соколов', role: 'Маркетинг-директор' }] },
  { id: 'DEAL-1009', title: 'Сегментация клиентов для «Йота-Сервис»', description: 'RFM-анализ базы', status: 'proposal', date: '2025-02-14', amount: 230000, currency: 'RUB', owner: 'С. Кузнецов', stage: 'Отправлено КП', contacts: [{ name: 'Т. Никитина', role: 'CRM-менеджер' }] },
  { id: 'DEAL-1010', title: 'Отчётность для «Каппа-Строй»', description: 'Дашборд по проектам и сметам', status: 'qualified', date: '2025-02-18', amount: 310000, currency: 'RUB', owner: 'И. Петров', stage: 'Квалификация лида', contacts: [{ name: 'Г. Фёдоров', role: 'Директор по стройке' }] },
  { id: 'DEAL-1011', title: 'KPI-панель для «Лямбда-Образование»', description: 'Мониторинг учебных метрик', status: 'lead', date: '2025-02-20', amount: 98000, currency: 'RUB', owner: 'М. Иванова', stage: 'Новый лид', contacts: [{ name: 'Ю. Павлова', role: 'Ректор' }] },
  { id: 'DEAL-1012', title: 'Аналитика маржи для «Мю-Логистик»', description: 'Расчёт маржинальности маршрутов', status: 'won', date: '2024-09-18', amount: 275000, currency: 'RUB', owner: 'С. Кузнецов', stage: 'Закрыта успешно', contacts: [{ name: 'Ф. Егоров', role: 'Операционный директор' }] },
  { id: 'DEAL-1013', title: 'Интеграция платежей для «Ню-Маркет»', description: 'Сводный отчёт по эквайрингу', status: 'lost', date: '2025-01-08', amount: 180000, currency: 'RUB', owner: 'И. Петров', stage: 'Проиграна (сроки)', contacts: [{ name: 'С. Воробьёв', role: 'Финансовый менеджер' }] },
  { id: 'DEAL-1014', title: 'Дашборд для «Кси-Агро»', description: 'Сезонная аналитика урожайности', status: 'negotiation', date: '2025-02-01', amount: 405000, currency: 'RUB', owner: 'М. Иванова', stage: 'Согласование ТЗ', contacts: [{ name: 'А. Тарасов', role: 'Агроном-аналитик' }] },
  { id: 'DEAL-1015', title: 'Отчёт по каналам для «Омикрон-Ритейл»', description: 'Сравнение онлайн и офлайн продаж', status: 'qualified', date: '2025-02-22', amount: 165000, currency: 'RUB', owner: 'С. Кузнецов', stage: 'Квалификация лида', contacts: [{ name: 'И. Макаров', role: 'Категорийный менеджер' }] }
];

// ============================================================
// СУЩНОСТЬ 3: Сегменты клиентов (segments)
// Статусы: 'active' | 'growing' | 'declining' | 'churn_risk'
// ============================================================
export const segments = [
  { id: 'SEG-01', title: 'Enterprise B2B', description: 'Крупные корпоративные клиенты с годовым контрактом', status: 'active', date: '2024-12-31', clientsCount: 42, revenueShare: 38, averageCheck: 980000, growthPercent: 12.5, channels: ['direct', 'partners'] },
  { id: 'SEG-02', title: 'Mid-Market B2B', description: 'Средний бизнес с циклом сделки 2–3 месяца', status: 'growing', date: '2024-12-31', clientsCount: 156, revenueShare: 27, averageCheck: 320000, growthPercent: 21.4, channels: ['direct', 'online'] },
  { id: 'SEG-03', title: 'SMB B2B', description: 'Малый бизнес, высокая частота сделок', status: 'active', date: '2024-12-31', clientsCount: 540, revenueShare: 18, averageCheck: 64000, growthPercent: 6.8, channels: ['online', 'self-service'] },
  { id: 'SEG-04', title: 'B2C Premium', description: 'Премиальные розничные клиенты', status: 'growing', date: '2024-12-31', clientsCount: 230, revenueShare: 9, averageCheck: 128000, growthPercent: 15.2, channels: ['retail', 'online'] },
  { id: 'SEG-05', title: 'B2C Mass', description: 'Массовый розничный сегмент', status: 'declining', date: '2024-12-31', clientsCount: 2100, revenueShare: 6, averageCheck: 18000, growthPercent: -8.4, channels: ['retail'] },
  { id: 'SEG-06', title: 'Партнёрский канал', description: 'Клиенты, пришедшие через партнёров', status: 'active', date: '2024-12-31', clientsCount: 88, revenueShare: 2, averageCheck: 210000, growthPercent: 4.1, channels: ['partners'] },
  { id: 'SEG-07', title: 'Госсектор', description: 'Государственные и муниципальные заказчики', status: 'churn_risk', date: '2024-12-31', clientsCount: 12, revenueShare: 1, averageCheck: 1450000, growthPercent: -22.6, channels: ['tenders'] },
  { id: 'SEG-08', title: 'Стартапы', description: 'Молодые компании с быстрым ростом', status: 'growing', date: '2024-12-31', clientsCount: 74, revenueShare: 1, averageCheck: 45000, growthPercent: 34.7, channels: ['online', 'self-service'] },
  { id: 'SEG-09', title: 'Франшизы', description: 'Сетевые партнёры по модели франшизы', status: 'active', date: '2024-12-31', clientsCount: 26, revenueShare: 1, averageCheck: 380000, growthPercent: 9.3, channels: ['partners', 'direct'] },
  { id: 'SEG-10', title: 'Долгосрочные контракты', description: 'Клиенты с контрактом от 3 лет', status: 'active', date: '2024-12-31', clientsCount: 95, revenueShare: 1, averageCheck: 640000, growthPercent: 3.2, channels: ['direct'] },
  { id: 'SEG-11', title: 'Сезонные клиенты', description: 'Покупки привязаны к сезону', status: 'declining', date: '2024-12-31', clientsCount: 310, revenueShare: 0.6, averageCheck: 22000, growthPercent: -12.1, channels: ['retail', 'online'] },
  { id: 'SEG-12', title: 'VIP-клиенты', description: 'Топ-1% по объёму выручки', status: 'active', date: '2024-12-31', clientsCount: 8, revenueShare: 0.4, averageCheck: 4200000, growthPercent: 18.9, channels: ['direct'] },
  { id: 'SEG-13', title: 'Пробные пользователи', description: 'Клиенты на trial-периоде', status: 'growing', date: '2024-12-31', clientsCount: 640, revenueShare: 0.2, averageCheck: 8500, growthPercent: 42.3, channels: ['self-service'] },
  { id: 'SEG-14', title: 'Возвратные клиенты', description: 'Клиенты, вернувшиеся после паузы', status: 'declining', date: '2024-12-31', clientsCount: 120, revenueShare: 0.1, averageCheck: 31000, growthPercent: -5.7, channels: ['online', 'retail'] },
  { id: 'SEG-15', title: 'Корпоративный университет', description: 'B2B-обучение сотрудников клиентов', status: 'active', date: '2024-12-31', clientsCount: 18, revenueShare: 0.1, averageCheck: 540000, growthPercent: 7.6, channels: ['direct', 'partners'] }
];

// Сводные KPI для шапки дашборда
export const kpiSummary = {
  totalRevenue: 20675000,
  growth: 12.4,
  activeDeals: 15,
  conversionRate: 26.7
};