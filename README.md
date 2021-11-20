# Сайт проекта Дизайн-код Екатеринбурга

Работает на базе Create Next App и [Notion API](https://developers.notion.com/)

## Запуск

1. Установка зависимостей
```sh
npm i 
```

2. Добавить файл с переменными среды `.env.local` с [токенами Notion](https://www.notion.so/my-integrations)
```sh
NOTION_TOKEN=
NOTION_DATABASE_TEAM_NEW=
NOTION_DATABASE_TEAM_OLD=
NOTION_DATABASE_PARTNERS=
NOTION_DATABASE_CONTACTS=
NOTION_DATABASE_PROJECTS=
```

## Управление контентом

В Notion хранятся данные проекта:
- Проекты
- Партнеры
- Команда
- Контакты

## Разработка

### Запуск dev-сервера
```sh
npm run dev
```

### Сборка
```sh
npm run production
```

### Запуск production-версии
```sh
npm start
```
## Деплой

Проект развертывается на Vercel при `git push` с помощью GitHub Actions
