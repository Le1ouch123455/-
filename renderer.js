// ============================================================
// Чистые функции рендера: data → DOM-элемент.
// innerHTML НЕ используется.
// ============================================================

export function formatMoney(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency', currency: 'RUB', maximumFractionDigits: 0
  }).format(value);
}

export function formatPercent(value) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

export function formatDate(iso) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).format(new Date(iso));
}

export function createBadge(status) {
  const span = document.createElement('span');
  span.className = `badge badge--${status}`;
  span.textContent = status;
  return span;
}

export function createTime(iso, label) {
  const time = document.createElement('time');
  time.dateTime = iso;
  time.textContent = label || formatDate(iso);
  return time;
}

/* ---------- Анимированный счётчик (5.4) ---------- */
export function animateCounter(el, target, { duration = 900, format = formatMoney } = {}) {
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(from + (target - from) * eased);
    el.textContent = format(value);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------- KPI ---------- */
export function renderKpiCard({ label, value, trend, numericValue }) {
  const li = document.createElement('li');
  li.className = 'kpi-card';

  const h3 = document.createElement('h3');
  h3.textContent = label;

  const strong = document.createElement('strong');
  if (numericValue !== undefined) {
    strong.textContent = formatMoney(0);
    animateCounter(strong, numericValue);
  } else {
    strong.textContent = value;
  }

  const span = document.createElement('span');
  span.className = `trend ${trend >= 0 ? 'trend--up' : 'trend--down'}`;
  span.textContent = `${trend >= 0 ? '▲' : '▼'} ${formatPercent(trend)}`;

  li.append(h3, strong, span);
  return li;
}

export function renderKpiGrid(summary) {
  const ul = document.createElement('ul');
  ul.className = 'kpi-grid';

  const cards = [
    { label: 'Общая выручка', numericValue: summary.totalRevenue, trend: summary.growth },
    { label: 'Рост к прошлому году', value: formatPercent(summary.growth), trend: summary.growth },
    { label: 'Активных сделок', value: String(summary.activeDeals), trend: 8.3 },
    { label: 'Конверсия', value: `${summary.conversionRate}%`, trend: 2.1 }
  ];

  cards.forEach(card => ul.append(renderKpiCard(card)));
  return ul;
}

/* ---------- График ---------- */
export function renderRevenueBars(items) {
  const ul = document.createElement('ul');
  ul.className = 'revenue-bars';
  const maxAmount = Math.max(...items.map(i => i.amount));

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'revenue-bar';

    const bar = document.createElement('span');
    bar.className = `bar ${item.status === 'forecast' ? 'bar--forecast' : ''} ${item.status === 'at_risk' ? 'bar--at_risk' : ''}`;
    bar.style.height = `${Math.round((item.amount / maxAmount) * 100)}%`;
    bar.title = `${item.title}: ${formatMoney(item.amount)}`;

    const label = document.createElement('small');
    label.textContent = item.title.slice(0, 3);

    li.append(bar, label);
    ul.append(li);
  });
  return ul;
}

/* ---------- Таблица ---------- */
export function renderRevenueTableBody(items, onRowClick) {
  const tbody = document.createElement('tbody');

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.tabIndex = 0;

    const tdPeriod = document.createElement('td');
    tdPeriod.dataset.label = 'Период';
    tdPeriod.append(createTime(item.date, item.title));

    const tdStatus = document.createElement('td');
    tdStatus.dataset.label = 'Статус';
    tdStatus.append(createBadge(item.status));

    const tdChannel = document.createElement('td');
    tdChannel.dataset.label = 'Канал';
    tdChannel.textContent = item.channel;

    const tdAmount = document.createElement('td');
    tdAmount.dataset.label = 'Сумма';
    tdAmount.textContent = formatMoney(item.amount);

    const tdGrowth = document.createElement('td');
    tdGrowth.dataset.label = 'Рост';
    tdGrowth.textContent = formatPercent(item.growthPercent);
    tdGrowth.className = item.growthPercent >= 0 ? 'trend--up' : 'trend--down';

    tr.append(tdPeriod, tdStatus, tdChannel, tdAmount, tdGrowth);

    if (onRowClick) {
      tr.addEventListener('click', () => onRowClick(item));
      tr.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onRowClick(item);
        }
      });
    }
    tbody.append(tr);
  });
  return tbody;
}

/* ---------- Карточки ---------- */
export function renderRevenueCard(item, onClick) {
  const li = document.createElement('li');
  li.className = 'data-card';
  li.dataset.id = item.id;
  li.tabIndex = 0;
  li.setAttribute('role', 'button');

  const header = document.createElement('div');
  header.className = 'card-header';

  const titleBlock = document.createElement('div');
  titleBlock.style.flex = '1';
  const idEl = document.createElement('span');
  idEl.className = 'card-id';
  idEl.textContent = item.id;
  const h3 = document.createElement('h3');
  h3.textContent = item.title;
  titleBlock.append(idEl, h3);

  const badge = createBadge(item.status);
  header.append(titleBlock, badge);

  const body = document.createElement('div');
  body.className = 'card-body';

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = item.description;

  const dl = document.createElement('dl');
  [['Канал', item.channel], ['Сумма', formatMoney(item.amount)], ['Рост', formatPercent(item.growthPercent)]]
    .forEach(([t, v]) => {
      const dt = document.createElement('dt'); dt.textContent = t;
      const dd = document.createElement('dd'); dd.textContent = v;
      dl.append(dt, dd);
    });

  body.append(desc, dl);

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.append(createTime(item.date));

  const tags = document.createElement('div');
  tags.className = 'card-tags';
  if (item.breakdown) {
    item.breakdown.forEach(b => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = b.channel;
      tags.append(tag);
    });
  }
  meta.append(tags);

  li.append(header, body, meta);

  if (onClick) {
    li.addEventListener('click', () => onClick(item));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(item);
      }
    });
  }
  return li;
}

export function renderRevenueCards(items, onClick) {
  const ul = document.createElement('ul');
  ul.className = 'data-cards';
  items.forEach(item => ul.append(renderRevenueCard(item, onClick)));
  return ul;
}

/* ---------- Воронка ---------- */
export function renderFunnelItem(deal, onClick) {
  const li = document.createElement('li');
  li.dataset.id = deal.id;
  li.tabIndex = 0;
  li.setAttribute('role', 'button');

  const stage = document.createElement('span');
  stage.className = 'stage';
  stage.textContent = deal.stage;

  const title = document.createElement('span');
  title.className = 'title';
  title.textContent = deal.title;
  const small = document.createElement('small');
  small.append(createTime(deal.date), document.createTextNode(` · ${deal.owner}`));
  title.append(small);

  const amount = document.createElement('span');
  amount.className = 'amount';
  amount.textContent = formatMoney(deal.amount);

  li.append(stage, title, amount);

  if (onClick) {
    li.addEventListener('click', () => onClick(deal));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(deal);
      }
    });
  }
  return li;
}

export function renderFunnelList(items, onClick) {
  const ol = document.createElement('ol');
  ol.className = 'funnel';
  items.forEach(item => ol.append(renderFunnelItem(item, onClick)));
  return ol;
}

/* ---------- Сегменты ---------- */
export function renderSegmentCard(segment, onClick) {
  const li = document.createElement('li');
  li.className = 'segment-card';
  li.dataset.id = segment.id;
  li.tabIndex = 0;
  li.setAttribute('role', 'button');

  const h3 = document.createElement('h3');
  h3.textContent = segment.title;

  const desc = document.createElement('p');
  desc.className = 'card-desc';
  desc.textContent = segment.description;

  const badge = createBadge(segment.status);

  const dl = document.createElement('dl');
  [
    ['Клиентов', String(segment.clientsCount)],
    ['Доля выручки', `${segment.revenueShare}%`],
    ['Средний чек', formatMoney(segment.averageCheck)],
    ['Рост', formatPercent(segment.growthPercent)]
  ].forEach(([t, v]) => {
    const dt = document.createElement('dt'); dt.textContent = t;
    const dd = document.createElement('dd'); dd.textContent = v;
    dl.append(dt, dd);
  });

  const meta = document.createElement('div');
  meta.className = 'card-meta';
  meta.append(createTime(segment.date));
  const tags = document.createElement('div');
  tags.className = 'card-tags';
  segment.channels.forEach(ch => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = ch;
    tags.append(tag);
  });
  meta.append(tags);

  li.append(h3, desc, badge, dl, meta);

  if (onClick) {
    li.addEventListener('click', () => onClick(segment));
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(segment);
      }
    });
  }
  return li;
}

export function renderSegmentsGrid(items, onClick) {
  const ul = document.createElement('ul');
  ul.className = 'segments-grid';
  items.forEach(item => ul.append(renderSegmentCard(item, onClick)));
  return ul;
}

/* ---------- Модальное окно ---------- */
export function renderModalContent(item) {
  const fragment = document.createDocumentFragment();

  const h = document.createElement('h3');
  h.textContent = item.title || 'Детали';
  fragment.append(h);

  const dl = document.createElement('dl');
  const skip = new Set(['id', 'title', 'description', 'breakdown', 'contacts', 'channels']);
  const labels = {
    status: 'Статус', date: 'Дата', amount: 'Сумма', currency: 'Валюта',
    channel: 'Канал', growthPercent: 'Рост, %', owner: 'Ответственный',
    stage: 'Стадия', clientsCount: 'Клиентов', revenueShare: 'Доля выручки, %',
    averageCheck: 'Средний чек'
  };

  const dtId = document.createElement('dt'); dtId.textContent = 'ID';
  const ddId = document.createElement('dd'); ddId.textContent = item.id;
  dl.append(dtId, ddId);

  if (item.description) {
    const dt = document.createElement('dt'); dt.textContent = 'Описание';
    const dd = document.createElement('dd'); dd.textContent = item.description;
    dl.append(dt, dd);
  }

  Object.entries(item).forEach(([key, value]) => {
    if (skip.has(key)) return;
    const dt = document.createElement('dt');
    dt.textContent = labels[key] || key;
    const dd = document.createElement('dd');
    if (key === 'status') dd.append(createBadge(value));
    else if (key === 'date') dd.append(createTime(value));
    else if (key === 'amount') dd.textContent = formatMoney(value);
    else if (key === 'growthPercent') dd.textContent = formatPercent(value);
    else dd.textContent = String(value);
    dl.append(dt, dd);
  });
  fragment.append(dl);

  if (Array.isArray(item.breakdown)) {
    const h4 = document.createElement('h4'); h4.textContent = 'Разбивка по каналам';
    const ul = document.createElement('ul');
    item.breakdown.forEach(b => {
      const li = document.createElement('li');
      li.textContent = `${b.channel}: ${formatMoney(b.amount)}`;
      ul.append(li);
    });
    fragment.append(h4, ul);
  }
  if (Array.isArray(item.contacts)) {
    const h4 = document.createElement('h4'); h4.textContent = 'Контакты';
    const ul = document.createElement('ul');
    item.contacts.forEach(c => {
      const li = document.createElement('li');
      li.textContent = `${c.name} — ${c.role}`;
      ul.append(li);
    });
    fragment.append(h4, ul);
  }
  if (Array.isArray(item.channels)) {
    const h4 = document.createElement('h4'); h4.textContent = 'Каналы';
    const ul = document.createElement('ul');
    item.channels.forEach(ch => {
      const li = document.createElement('li');
      li.textContent = ch;
      ul.append(li);
    });
    fragment.append(h4, ul);
  }
  return fragment;
}