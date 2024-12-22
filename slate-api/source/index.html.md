---
title: API pfdo-o65.site

language_tabs: # must be one of https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers
  - json
#  - shell
#  - ruby
#  - python
#  - javascript

toc_footers:
 # - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/slatedocs/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true

code_clipboard: true

meta:
  - name: description
    content: Документация для pfdo-o65.site API
---

# Введение
Настоящее руководство описывает API сайта [pfdo-o65.site](http://pfdo-o65.site/index.html). Данный API был разработан методом реверс-инжиниринга и предназначен для интеграции данных с сайта [pfdo.ru](https://65.pfdo.ru/) в сервис [Острова65](https://ostrova65.live/).

# Info

В данном разделе представлена информация о мотодах используемых для получения данных (таких как словари, списки и другие элементы), необходимых для формирования корректного поискового запроса.

## GET directory-program-activities

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 2,
            "direction_id": 2,
            "name": "Робототехника",
            "description": null,
            "status": 10,
            "federal_point_activity_id": null,
            "img_src": "https://directory.pfdo.ru/fileStorage/svg-program-activity/ZZwOYGZiauVq48ZiuLNh.svg",
            "img_transparent": "https://directory.pfdo.ru/fileStorage/svg-program-activity/Jblq39Npr7zCIIKDjUDHl8QaJ_2ofY6F.svg",
            "interest_name": "Роботы и автоматоны"
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос видов деятельности доступных для направлений образовательных программ.

### HTTP запрос

`GET https://apidir.pfdo.ru/v1/directory-program-activities`

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
per-page | - | Максимальное количество объектов в ответе
page | - | Номер страницы ответа
sort | - | Ключ, по которому будут отсортированы данные
fields | - | Ключи которые быдут присутствовать в ответе
search\[\<search_key\>\][0] | - | Поиск по ключу. Будут отображены только объекты значение которых совпвдает с искомым

### Ключи поиска

Значение| Описание
------- | ------- 
direction_id | ID направления образовательной программы

## GET directory-program-directions

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 2,
            "name": "Техническая",
            "federal_point_id": 6,
            "_links": {
                "self": {
                    "href": "http://apidir.pfdo.ru/v1/directory-program-directions/2"
                }
            }
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос доступных направлений образовательных программ.

### HTTP запрос

`GET https://apidir.pfdo.ru/v1/directory-program-directions`

## GET illnesses

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 1,
            "name": "глухие",
            "status": 1
        },
        {
            "id": 2,
            "name": "слабослышащие и позднооглохшие",
            "status": 1
        },
        {
            "id": 3,
            "name": "слепые",
            "status": 1
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос списка категорий ОВЗ.

### HTTP запрос

`GET https://apidir.pfdo.ru/v1/illnesses`

## GET muns

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 1344,
            "name": "Александровск-Сахалинский район"
        },
        {
            "id": 1345,
            "name": "Южно-Курильский район"
        },
        {
            "id": 1346,
            "name": "г. Южно-Сахалинск"
        },
        {
            "id": 1365,
            "name": "Холмский район"
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос доступных муниципальных образований для региона.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/muns/<Operator_ID>`

### Параметры URL

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
Operator_ID | 31 | ID региона

# Search

В данном разделе описаны методы используемые для поиска объектов по заданным параметрам

## GET events

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 35324,
            "name": "Мастер-класс \"Аппликация\"",
            "short_name": "Создаем аппликации",
            "image": "https://docs.pfdo.ru/uploads/events/WTDinp9grdbBF9UbVMJbm7l1q4.png",
            "address": {
                "id": 144634,
                "name": "Сахалинская обл, г Южно-Сахалинск, ул имени Космонавта Поповича, д 23, офис 302/1",
                "lat": "46.9540583",
                "lng": "142.750995"
            },
            "period": "6 января 2025, 10:30 - 12:00"
        },
        {
            "id": 35323,
            "name": "Мастер-класс \"Лепка фруктовой свечи\"",
            "short_name": "Лепим фруктовую свечу",
            "image": "https://docs.pfdo.ru/uploads/events/KOLxdanoMuRvwwaWXTO.png",
            "address": {
                "id": 144634,
                "name": "Сахалинская обл, г Южно-Сахалинск, ул имени Космонавта Поповича, д 23, офис 302/1",
                "lat": "46.9540583",
                "lng": "142.750995"
            },
            "period": "1 января 2025, 10:30 - 12:00"
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос списка всех доступных в регионе событий.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/search/events`

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
operator | 31 | ID региона
per-page | - | Максимальное количество объектов в ответе
page | - | Номер страницы ответа
sort | - | Ключ, по которому будут отсортированы данные
search\[\<search_key\>\][0] | - | Поиск по ключу. Будут отображены только объекты значение которых совпвдает с искомым

### Ключи поиска

Значение| Описание
------- | ------- 
min_end_time | Дата окончания мерроприятия 
min_start_time | Дата окончания мерроприятия
max_deadline_entry | Дата окончания приема заявок
mun | ID муниципального образования
direction_id | ID направления образовательной программы
section | ID раздела мероприятия
organization | ID организации
education_form | Форма проведения
disabled_access | Доступность для детей с ОВЗ 
name | Наименование мероприятия

## GET organizations

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 22987,
            "name": "ОАО \"РЖД\", ЮВОСТДЖД",
            "address": {
                "id": 121595,
                "name": "Воронежская обл, г Лиски, ул Трудовые Резервы, д 70/1",
                "lat": "50.994646",
                "lng": "39.483544"
            },
            "image_url": "https://docs.pfdo.ru/uploads/organization/_GXlOEMnSYEBO3To2IHLKAzD0GUZg47eXK3PlNwA.png",
            "image_color": "CCCCCC",
            "fio_contact": "Зотов Юрий Анатольевич",
            "site": "https://www.ювджд.рф",
            "director_name": "Зотов Юрий Анатольевич",
            "cant_use_certificate": 0,
            "organization_labels": []
        },
        {
            "id": 29892,
            "name": "ГАУ РЦОКОСО",
            "address": {
                "id": 144731,
                "name": "Сахалинская обл, г Южно-Сахалинск, пр-кт Мира, д 501 к 1",
                "lat": "46.8473464",
                "lng": "142.761603"
            },
            "image_url": "https://docs.pfdo.ru/uploads/organization/_c3svMpZKmLtUOh4uwmGEqdH.png",
            "image_color": "FFFFFF",
            "fio_contact": "Румянцева Алина Владиславовна, Лыткина Дарья Евгеньевна, Брикульская Анастасия Владимировна, Гармаева Алина Баировна, Гиндулина Елена Ивановна",
            "site": "http://itcube.rcoko65.ru",
            "director_name": "Пескова Наталья Анатольевна",
            "cant_use_certificate": 0,
            "organization_labels": []
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос списка всех доступных в регионе организаций.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/search/organizations`

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
operator | 31 | ID региона
per-page | - | Максимальное количество объектов в ответе
page | - | Номер страницы ответа
sort | - | Ключ, по которому будут отсортированы данные
expand | organization_labels,kind | Расширеные параметры 
search\[\<search_key\>\][0] | - | Поиск по ключу. Будут отображены только объекты значение которых совпвдает с искомым

### Ключи поиска

Значение| Описание
------- | ------- 
mun | ID муниципального образования
rating_min | Минимальный рейтинг организации
rating_max | Максимальный рейтинг организации
name | Наименование организации
address | Адресс организации

## GET programs

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": [
        {
            "id": 22987,
            "name": "ОАО \"РЖД\", ЮВОСТДЖД",
            "address": {
                "id": 121595,
                "name": "Воронежская обл, г Лиски, ул Трудовые Резервы, д 70/1",
                "lat": "50.994646",
                "lng": "39.483544"
            },
            "image_url": "https://docs.pfdo.ru/uploads/organization/_GXlOEMnSYEBO3To2IHLKAzD0GUZg47eXK3PlNwA.png",
            "image_color": "CCCCCC",
            "fio_contact": "Зотов Юрий Анатольевич",
            "site": "https://www.ювджд.рф",
            "director_name": "Зотов Юрий Анатольевич",
            "cant_use_certificate": 0,
            "organization_labels": []
        },
        {
            "id": 29892,
            "name": "ГАУ РЦОКОСО",
            "address": {
                "id": 144731,
                "name": "Сахалинская обл, г Южно-Сахалинск, пр-кт Мира, д 501 к 1",
                "lat": "46.8473464",
                "lng": "142.761603"
            },
            "image_url": "https://docs.pfdo.ru/uploads/organization/_c3svMpZKmLtUOh4uwmGEqdH.png",
            "image_color": "FFFFFF",
            "fio_contact": "Румянцева Алина Владиславовна, Лыткина Дарья Евгеньевна, Брикульская Анастасия Владимировна, Гармаева Алина Баировна, Гиндулина Елена Ивановна",
            "site": "http://itcube.rcoko65.ru",
            "director_name": "Пескова Наталья Анатольевна",
            "cant_use_certificate": 0,
            "organization_labels": []
        }
    ],
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос списка всех доступных в регионе образовательных программ.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/search/es-programs`

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
operator | 31 | ID региона
per-page | - | Максимальное количество объектов в ответе
page | - | Номер страницы ответа
sort | - | Ключ, по которому будут отсортированы данные
expand | program_nok_rating,duration_string,kind | Расширеные параметры 
search\[\<search_key\>\][0] | - | Поиск по ключу. Будут отображены только объекты значение которых совпвдает с искомым

### Ключи поиска

Значение| Описание
------- | ------- 
mun | ID муниципального образования
average_score_min | Минимальный рейтинг образовательной программы
average_score_max | Максимальный рейтинг организации образовательной программы
name | Наименование  образовательной программы
form | Форма обучения
enrollment | Набор в группу
zab | Категория ОВЗ
start_education_month_and_year | Дата начала обучения
distance_technology | Дистанционные программы
program_project_id | ID проекта в рамках которого реализуется
direction_id | ID направления образовательной программы
program_activity_id_list | ID вида деятельности

# Objects

## GET event


> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": {
        "id": 35323,
        "name": "Мастер-класс \"Лепка фруктовой свечи\"",
        "short_name": "Лепим фруктовую свечу",
        "image": "https://docs.pfdo.ru/uploads/events/KOLxdanoMuRvwwaWXTO.png",
        "address": {
            "id": 144634,
            "name": "Сахалинская обл, г Южно-Сахалинск, ул имени Космонавта Поповича, д 23, офис 302/1",
            "lat": "46.9540583",
            "lng": "142.750995"
        },
        "period": "1 января 2025, 10:30 - 12:00",
        "description": "Мастер-класс \"Лепка фруктовой свечи\"",
        "organization_name": "ИП Коробанова Ольга Мироновна",
        "status_entry": 1,
        "direction": {
            "id": 3,
            "name": "Художественная"
        },
        "events_type": [
            {
                "id": 35296,
                "type": "Все желающие",
                "events_id": 35323,
                "max_count": 10,
                "events_count": 0,
                "age_min": 5,
                "age_max": 10,
                "category": "Все желающие",
                "recommendations": "",
                "cost": 1000
            }
        ],
        "deadline_entry": "10.12.2024 14:00"
    },
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос данных по образовательной программе.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/search/events/<event_id>`

### Параметры URL

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
event_id | - | ID события


## GET organization

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": {
        "id": 22987,
        "name": "ОАО \"РЖД\", ЮВОСТДЖД",
        "address": {
            "id": 121595,
            "name": "Воронежская обл, г Лиски, ул Трудовые Резервы, д 70/1",
            "lat": "50.994646",
            "lng": "39.483544"
        },
        "image_url": "https://docs.pfdo.ru/uploads/organization/_GXlOEMnSYEBO3To2IHLKAzD0GUZg47eXK3PlNwA.png",
        "image_color": "CCCCCC",
        "fio_contact": "Зотов Юрий Анатольевич",
        "site": "https://www.ювджд.рф",
        "director_name": "Зотов Юрий Анатольевич",
        "cant_use_certificate": 0,
        "department": null,
        "level": "Частное",
        "phone": "+7(747)391-73-40",
        "license": "от 23.12.2014 №035790",
        "short_name": "Юго-Восточная детская железная дорога - структурное подразделение Юго-Восточной железной дороги — филиал ОАО «РЖД»",
        "about": "",
        "slogan": "Юго-Восточная детская железная дорога - центр профориентации на железнодорожные профессии",
        "organization_labels": []
    },
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос данных по образовательной программе.

### HTTP запрос

`GET https://api.pfdo.ru/v2/main-page/search/organizations/<org_id>`

### Параметры URL

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
org_id | - | ID организации

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | -------
expand | organization_labels | Расширеные параметры 



## GET program

> При выполнении данного запроса, будет получена структура на подобии этой:  

``` json
{
    "data": {
        "program": {
            "id": 1067001,
            "full_name": "Дополнительная общеразвивающая программа \"Мой выбор\"",
            "short_name": "Мой выбор",
            "kind": 2,
            "direction_id": 5,
            "activity_ids": [
                63
            ],
            "edu_form": 1,
            "duration_year": 1,
            "duration_month": 0,
            "mun": 1346,
            "annotation": "<p>Анализ ситуации на рынке труда показал важность формирования индивидуальных траекторий жизненного и профессионального самоопределения и построения карьеры для молодых людей с учетом их интересов, способностей, личностных особенностей и требований рынка труда. Потенциальные работодатели стремятся отобрать лучших работников, способных успешно и максимально эффективно выполнять свои обязанности. В связи с этим вопрос профессионального самоопределения молодежи становится чрезвычайно важными.</p>\n\n<p>&nbsp;</p>\n",
            "task": "<p><strong>&nbsp;</strong><strong>Цель программы: </strong>развитие индивидуальных способностей, самореализация личности обучающегося на основе формирования интереса к выбору профессиональной деятельности.</p>\n\n<p><strong>Задачи:</strong></p>\n\n<p><strong>Предметные:</strong></p>\n\n<ul>\n\t<li>формировать представление о мире профессий;</li>\n\t<li>формировать у учащихся знания о востребованных профессиях Сахалинской области;</li>\n</ul>\n\n<p><strong>Метапредметные:</strong></p>\n\n<ul>\n\t<li>развивать современное экономическое мышление в выборе профессии</li>\n\t<li>способствовать расширению кругозора учащихся в мире профессий</li>\n\t<li>содействовать развитию творческих способностей;</li>\n\t<li>развивать коммуникативные умения и навыки;</li>\n\t<li>развивать у учащихся стремление к участию в общественной деятельности.</li>\n</ul>\n\n<p><strong>Личностные:</strong></p>\n\n<ul>\n\t<li>воспитывать нравственное отношение к окружающему миру;</li>\n\t<li>формировать ответственное отношение к социуму, толерантность;</li>\n\t<li>воспитывать активную жизненную гражданскую позицию, стремление к личному участию в практической деятельности;</li>\n\t<li>определить вместе с подростком пути дальнейшей реализации выбора его профессии</li>\n</ul>\n",
            "age_group_min": 132,
            "age_group_max": 192,
            "ovz": 0,
            "zab": [],
            "need_medical_certificate": 0,
            "directory_program_document_id": 1,
            "status": 1,
            "modules_count": "1",
            "directory_level_id": 1,
            "directory_project_ids": [
                10
            ],
            "video_link": null
        }
    },
    "result_code": "FLSCS",
    "result_message": "Полный успех"
}
```

Запрос данных по образовательной программе.

### HTTP запрос

`GET https://api.pfdo.ru/v2/public/programs/<prog_id>`

### Параметры URL

Параметр | Значение по умолчанию | Описание
--------- | ------- | ------- 
prog_id | - | ID образовательной программы

### Параметры запроса

Параметр | Значение по умолчанию | Описание
--------- | ------- | -------
expand | address,program_image,registry,reestrs,direction,activity,is_open,available_groups,program_text,distance_technology,organization,images,interest,modules,rating,program_reviews,region,img_transparent,program_icons,program_nok_rating,average_score,phone | Расширеные параметры 


# Перечисления

## search[enrollment]

Набор в группу

ID | Описание
------- | ------- 
1 | Открыт на 1 модуль
2 | Открыт

## search[section]	

Раздел мероприятия	

ID |	Discription
------- | -------
1 | Конкурсные
2 | Досуговые
3 | Образовательные
4 | Профориентационные
5 | Для проффессионального сообщества
6 | Другие
  
## search[form]

Форма обучения	

ID | Discription
------- | -------
1 | Очная
2 | Очно-заочная
3 | Заочная

## search[program_project_id]	

Реализуется в рамках проекта	

ID | Discription
------- | -------
10 | Нет проекта
1 | Кванториум
2 | ІT-куб
3 | Точка роста
4 | Центр выявления, поддержки и развития способностей и талантов у детей и молодежи
5 | Дом научной коллаборации
6 | Новые места в доп образовании
7 | Мобильный технопарк Кванториум
8 | Школьный кванториум
11 | Инженерно-технические классы
102 | Школьный спортивный клуб
103 | Школьный музей
104 | Школьный театр
105 | Кружковое движение НТО


