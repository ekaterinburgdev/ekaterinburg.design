import { getNotionDB } from "../notion";

export default async function getTeam() {
    const team = await getNotionDB(process.env.NOTION_DATABASE_TEAM);

    const sortBySurname = (a, b) => {
        const getSurname = (item) => item['имя'].split(' ').pop();
        const surnameA = getSurname(a);
        const surnameB = getSurname(b);

        if (surnameA < surnameB) { return -1; }
        if (surnameA > surnameB) { return 1; }
        return 0;
    }

    return team
        ?.filter(x => (
            x['показать на сайте'] &&
            x['проект'].includes('Дизайн-код Екатеринбурга')
        ))
        .sort(sortBySurname)
        .map(x => ({
            name: x['имя'],
            photo: x['фото на сайте'],
            link: x['ссылка на сайте'],
            role: x['должность на сайте']
        }));
}
