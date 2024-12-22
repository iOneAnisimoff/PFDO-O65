<template>
    <div class="app bg-gray-100 min-h-screen flex justify-center py-8">
      <div class="max-w-7xl w-full px-6">
  
        <!-- Заголовок -->
        <h1 class="text-center text-4xl font-bold mb-6">Навигатор в мире дополнительного образования</h1>
  
        <!-- Фильтры -->
        <div class="flex justify-between items-center mb-6">
          <div class="flex items-center w-full relative">
            <input
              type="text"
              v-model="searchQuery"
              @input="onSearch"
              placeholder="Поиск"
              class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              class="absolute right-12 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-2 py-1 rounded-full hover:bg-gray-400 transition"
            >
              ✕
            </button>
          </div>
          <button
            @click="toggleFilters"
            class="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
  
        <!-- Меню фильтров -->
        <div v-if="filtersVisible" class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Форма обучения -->
            <div>
              <h3 class="font-semibold mb-2">Форма обучения</h3>
              <div>
                <label class="block mb-1">
                  <input type="radio" name="educationForm" value="Очная" class="mr-2"> Очная
                </label>
                <label class="block mb-1">
                  <input type="radio" name="educationForm" value="Очно-заочная" class="mr-2"> Очно-заочная
                </label>
                <label class="block mb-1">
                  <input type="radio" name="educationForm" value="Заочная" class="mr-2"> Заочная
                </label>
              </div>
            </div>
            
            <!-- Набор в группу -->
            <div>
              <h3 class="font-semibold mb-2">Набор в группу</h3>
              <div>
                <label class="block mb-1">
                  <input type="radio" name="groupEnrollment" value="Модуль" class="mr-2"> Открыт на 1 модуль
                </label>
                <label class="block mb-1">
                  <input type="radio" name="groupEnrollment" value="Открыт" class="mr-2"> Открыт
                </label>
              </div>
            </div>
  
            <!-- Прочие фильтры -->
            <div>
              <h3 class="font-semibold mb-2">Прочее</h3>
              <div>
                <label class="block mb-1">
                  <input type="checkbox" class="mr-2"> Адаптация для детей с ОВЗ
                </label>
                <label class="block mb-1">
                  <input type="checkbox" class="mr-2"> Дистанционные программы
                </label>
              </div>
            </div>
  
            <!-- Возраст -->
            <div>
              <h3 class="font-semibold mb-2">Возраст</h3>
              <select class="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Все возрасты</option>
                <option>5-7 лет</option>
                <option>8-12 лет</option>
                <option>13-17 лет</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- Сообщение, если ничего не найдено -->
        <div v-if="programs.length === 0 && searchQuery" class="text-center text-gray-500 mb-6">
          Ничего не найдено...
        </div>
  
        <!-- Карточки -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" v-if="programs.length > 0">
          <div
            v-for="program in visiblePrograms"
            :key="program.id"
            @click="navigateToProgram(program.id)"
            :class="getBackgroundColor(program.directory_id, program.direction?.id)"
            class="relative rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 p-6 cursor-pointer text-white"
            style="min-height: 280px;"
          >
            <!-- Верхний блок: возраст и продолжительность -->
            <div class="absolute top-2 left-2 bg-white text-black text-xs font-bold rounded-full px-3 py-1 flex items-center">
              <span class="mr-1">🙂</span>
              <span v-if="program.age_min === program.age_max">
                {{ program.age_min / 12 }} лет
              </span>
              <span v-else>
                {{ program.age_min / 12 }} - {{ program.age_max / 12 }} лет
              </span>
            </div>
            <div class="absolute top-2 right-2 bg-white text-black text-xs font-semibold rounded-full px-3 py-1">
              {{ program.duration_string }}
            </div>
  
            <!-- Краткое название и организация -->
            <div class="mt-10">
              <h2 class="text-left text-lg font-semibold">
                {{ program.short_name }}
              </h2>
              <p class="text-left text-sm mt-2">
                {{ program.organization_name }}
              </p>
            </div>
  
            <!-- Статус записи с иконкой -->
            <div class="absolute bottom-2 right-2 flex flex-col items-center">
              <img
                v-if="program.img_transparent"
                :src="program.img_transparent"
                alt="Program Icon"
                class="w-16 h-16 object-contain mb-2"
              />
              <button
                v-if="program.groups.length > 0"
                @click.stop="navigateToGroup(program.id)"
                class="bg-blue-500 text-white text-xs rounded-full px-4 py-2 shadow hover:bg-blue-600 transition-all"
              >
                Записаться
              </button>
              <button
                v-else
                class="bg-gray-300 text-gray-500 text-xs rounded-full px-4 py-2 shadow cursor-not-allowed"
              >
                ЗАПИСИ НЕТ
              </button>
            </div>
          </div>
        </div>
  
        <!-- Кнопка "Показать ещё" -->
        <div class="flex justify-center mt-8" >
          <button
            v-if="hasMore"
            @click="loadMore"
            class="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Показать ещё
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        programs: [], // Все загруженные данные
        visiblePrograms: [], // Видимые данные
        perPage: 24, // Количество записей на страницу
        currentPage: 1, // Текущая страница
        filtersVisible: false, // Состояние видимости фильтров
        searchQuery: "", // Поле для ввода текста
        searchDebounceTimeout: null, // Таймер для дебаунса поиска
      };
    },
    computed: {
      hasMore() {
        return this.programs.length >= this.currentPage * this.perPage; // Проверяем, что есть ещё данные для загрузки
      },
    },
    methods: {
      buildQueryParams() {
        const params = new URLSearchParams();
  
        if (this.searchQuery) {
          params.append("search[name]", this.searchQuery);
        }
  
        return params.toString();
      },
      async fetchPrograms() {
        const apiUrl = `https://api.pfdo.ru/v2/main-page/search/es-programs?${this.buildQueryParams()}&sort=&per-page=${this.perPage}&page=${this.currentPage}&operator=31&expand=program_nok_rating,duration_string,kind`;
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            this.programs = [...data.data]; // Заменяем существующие данные новыми
            this.visiblePrograms = this.programs; // Обновляем видимый массив
          } else {
            this.programs = []; // Очищаем, если данных нет
          }
        } catch (error) {
          console.error("Ошибка загрузки данных:", error);
          this.programs = [];
        }
      },
      navigateToProgram(id) {
        const programUrl = `https://65.pfdo.ru/app/?program=${id}`;
        window.open(programUrl, "_blank");
      },
      navigateToGroup(id) {
        const groupUrl = `https://65.pfdo.ru/app/groups/${id}`;
        window.open(groupUrl, "_blank");
      },
      loadMore() {
        this.currentPage += 1; // Увеличиваем номер страницы
        this.fetchPrograms(); // Загружаем новые данные
      },
      toggleFilters() {
        this.filtersVisible = !this.filtersVisible;
      },
      clearSearch() {
        this.searchQuery = "";
        this.currentPage = 1;
        this.programs = [];
        this.fetchPrograms();
      },
      onSearch() {
        clearTimeout(this.searchDebounceTimeout);
  
        if (this.searchQuery.length >= 2 || this.searchQuery.length === 0) {
          this.searchDebounceTimeout = setTimeout(() => {
            this.currentPage = 1;
            this.programs = [];
            this.fetchPrograms();
          }, 300); // Задержка в 300 мс
        }
      },
      getBackgroundColor(directoryId, directionId) {
        const colors = {
          5: "bg-[#75ccff]",
          3: "bg-[#ff6f6a]",
          4: "bg-[#df323b]",
          6: "bg-[#FF69B4]",
          7: "bg-[#9370DB]",
          2: "bg-[#483D8B]",
        };
        if (directionId === 2) return colors[2];
        return colors[directoryId] || "bg-gray-200";
      },
    },
    mounted() {
      this.fetchPrograms();
    },
  };
  </script>
  
  <style>
  /* Tailwind CSS будет работать по уже подключенной конфигурации */
  </style>