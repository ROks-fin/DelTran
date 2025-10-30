# Настройка Google Search Console для DelTran

## 🎯 ПОЧЕМУ САЙТ НЕ В GOOGLE?

Google не знает о вашем сайте! Нужно ему "сказать".

---

## 📝 ШАГ 1: Регистрация в Google Search Console

### 1. Откройте:
```
https://search.google.com/search-console
```

### 2. Нажмите "Add Property" (Добавить ресурс)

### 3. Выберите тип "URL prefix" и введите:
```
https://deltran.ai
```

---

## 🔐 ШАГ 2: Верификация домена

Google предложит несколько способов. **Рекомендую HTML tag** (самый простой):

### Вариант A: HTML meta-тег (РЕКОМЕНДУЕТСЯ)

1. Google даст вам код вида:
```html
<meta name="google-site-verification" content="ABC123..." />
```

2. Скопируйте значение `ABC123...`

3. Добавьте в `.env.local`:
```bash
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=ABC123...
```

4. Задеплойте:
```bash
git add .env.local
git commit -m "Add Google Search Console verification"
git push
```

5. Подождите 2-3 минуты (Vercel задеплоит)

6. В Google Search Console нажмите "Verify"

### Вариант B: HTML файл

1. Google даст файл `google*.html`
2. Положите его в папку `public/`
3. Задеплойте
4. Нажмите "Verify"

### Вариант C: DNS запись (если управляете DNS)

1. Добавьте TXT запись в DNS
2. Подождите 24-48 часов
3. Нажмите "Verify"

---

## 📤 ШАГ 3: Отправка Sitemap

После верификации:

1. В левом меню выберите **"Sitemaps"**

2. Введите URL sitemap:
```
https://deltran.ai/sitemap.xml
```

3. Нажмите **"Submit"**

4. Google начнет сканировать ваш сайт!

---

## ⏱️ ШАГ 4: Запрос индексации (ускорение)

Для быстрой индексации главной страницы:

1. В Search Console выберите **"URL Inspection"**

2. Введите:
```
https://deltran.ai/en
```

3. Нажмите **"Request Indexing"**

4. Повторите для важных страниц:
   - https://deltran.ai/en/platform
   - https://deltran.ai/en/investors
   - https://deltran.ai/en/contact

---

## 📊 СРОКИ ИНДЕКСАЦИИ

После отправки sitemap:

| Действие | Срок |
|----------|------|
| Google узнал о сайте | ✅ Сразу |
| Первое сканирование | 1-3 дня |
| Появление в поиске | 3-7 дней |
| Полная индексация | 7-30 дней |

---

## 🎯 ЧТО ДЕЛАТЬ ПОКА ЖДЕТЕ?

### 1. Создайте og-image.png

```
Размер: 1200x630px
Формат: PNG или JPG
Положите в: public/og-image.png
```

Сейчас у вас `/og-image.png` указан, но файла нет!

### 2. Проверьте robots.txt

✅ Уже работает: https://deltran.ai/robots.txt

### 3. Проверьте sitemap.xml

✅ Уже работает: https://deltran.ai/sitemap.xml

### 4. Настройте аналитику

В `.env.local` добавьте:
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Получите ID на: https://analytics.google.com

---

## 🔍 ПРОВЕРКА ИНДЕКСАЦИИ

### Команда в Google:
```
site:deltran.ai
```

### Ожидаемый результат (через 3-7 дней):
```
About 17 results (...)
https://deltran.ai/en
https://deltran.ai/en/platform
https://deltran.ai/en/investors
...
```

---

## 🚀 УСКОРЕНИЕ ИНДЕКСАЦИИ

### 1. Получите обратные ссылки:
- Разместите сайт в каталогах
- Опубликуйте в социальных сетях
- Создайте профили компании

### 2. Создайте контент:
- Блог
- Новости
- Case studies

### 3. Используйте социальные сети:
- Twitter/X: поделитесь ссылкой
- LinkedIn: пост о запуске
- Facebook: страница компании

### 4. Внешние упоминания:
- Форумы финтех индустрии
- Бизнес-каталоги
- Отраслевые платформы

---

## ❓ ЧАСТЫЕ ВОПРОСЫ

**Q: Сколько ждать появления в поиске?**
A: 3-30 дней с момента добавления в Search Console

**Q: Можно ли ускорить?**
A: Да, через "Request Indexing" для каждой страницы

**Q: Почему не появляется по запросу "DelTran"?**
A: Нужно время + конкуренция. Начнете появляться через 1-2 недели

**Q: Что делать, если через месяц не появился?**
A: Проверить:
- robots.txt не блокирует Google
- sitemap отправлен
- нет ошибок в Search Console
- сайт доступен (не требует логина)

---

## 📞 ПОДДЕРЖКА

Если нужна помощь:
1. Search Console Help: https://support.google.com/webmasters
2. Проверьте раздел "Coverage" в Search Console
3. Посмотрите на ошибки в разделе "Issues"

---

**Текущий статус SEO:** ✅ Технически готов
**Следующий шаг:** 🎯 Добавить в Google Search Console
**Ожидаемое время:** ⏱️ 3-7 дней до появления в поиске

---

**Дата:** 2025-10-27
**Версия:** 1.0.0
