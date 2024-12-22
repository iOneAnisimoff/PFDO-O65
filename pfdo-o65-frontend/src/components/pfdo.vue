<template>
  <!-- 
    Основная обёртка приложения:
    - `bg-gray-100 min-h-screen flex justify-center py-8`: Tailwind-классы для светло-серого фона, минимальной высоты экрана, выравнивания по центру и отступов сверху/снизу.
  -->
  <div class="app bg-gray-100 min-h-screen flex justify-center py-8">

    <!-- 
      Контейнер с шириной max-w-7xl, отступами (px-6).
      Здесь располагается весь контент (заголовок, фильтры, карточки).
    -->
    <div class="max-w-7xl w-full px-6">

      <!-- Заголовок страницы -->
      <h1 class="text-center text-4xl font-bold mb-6">
        Секции и кружки
      </h1>

      <!-- Фильтры + поиск -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center w-full relative">
          <!-- Поле поиска: привязывается к searchQuery, при вводе вызывается onSearch() -->
          <input
            type="text"
            v-model="searchQuery"
            @input="onSearch"
            placeholder="Поиск"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <!-- Кнопка "Очистить поиск", появляется только если searchQuery не пустая -->
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-12 top-1/2 transform -translate-y-1/2 bg-gray-300 text-black px-2 py-1 rounded-full hover:bg-gray-400 transition"
          >
            ✕
          </button>
        </div>
        <!-- Кнопка "Развернуть/Свернуть" фильтры -->
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

      <!-- Панель фильтров (отображается, когда filtersVisible = true) -->
      <div v-if="filtersVisible" class="bg-white rounded-lg shadow-md p-6 mb-6">

        <!-- Первый ряд фильтров (сетка из 4 колонок на больших экранах) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Блок 1: "Форма обучения" (radio) -->
          <div class="border p-4 rounded">
            <h3 class="font-semibold mb-2">Форма обучения</h3>
            <label class="block mb-1">
              <input
                type="radio"
                name="educationForm"
                value="1"
                class="mr-2"
                v-model="formValue"
              /> Очная
            </label>
            <label class="block mb-1">
              <input
                type="radio"
                name="educationForm"
                value="2"
                class="mr-2"
                v-model="formValue"
              /> Очно-заочная
            </label>
            <label class="block mb-1">
              <input
                type="radio"
                name="educationForm"
                value="3"
                class="mr-2"
                v-model="formValue"
              /> Заочная
            </label>
          </div>
          
          <!-- Блок 2: "Набор в группу" (radio) -->
          <div class="border p-4 rounded">
            <h3 class="font-semibold mb-2">Набор в группу</h3>
            <label class="block mb-1">
              <input
                type="radio"
                name="groupEnrollment"
                value="1"
                class="mr-2"
                v-model="enrollmentValue"
              /> Открыт на 1 модуль
            </label>
            <label class="block mb-1">
              <input
                type="radio"
                name="groupEnrollment"
                value="2"
                class="mr-2"
                v-model="enrollmentValue"
              /> Открыт
            </label>
          </div>

          <!-- Блок 3: "Доп. параметры" (адаптация, муниципалитет, проект) -->
          <div class="border p-4 rounded">
            <h3 class="font-semibold mb-2">Доп. параметры</h3>

            <!-- Адаптация (select) -->
            <label class="block mb-2">
              <span class="block text-sm font-semibold">Адаптация для детей с ОВЗ</span>
              <select
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
                v-model="adaptationValue"
              >
                <option value="">Без адаптации</option>
                <option
                  v-for="item in adaptationOptions"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </label>

            <!-- Муниципалитет (select) -->
            <label class="block mb-2">
              <span class="block text-sm font-semibold">Муниципалитет</span>
              <select
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
                v-model="municipalityValue"
              >
                <option value="">Все муниципалитеты</option>
                <option
                  v-for="mun in municipalityList"
                  :key="mun.id"
                  :value="mun.id"
                >
                  {{ mun.name }}
                </option>
              </select>
            </label>

            <!-- Проект (select) -->
            <label class="block mb-2">
              <span class="block text-sm font-semibold">
                Реализуются в рамках проекта
              </span>
              <select
                class="w-full border border-gray-300 rounded-lg px-3 py-2"
                v-model="programProjectIdValue"
              >
                <option value="">Все</option>
                <option
                  v-for="projectItem in programProjectOptions"
                  :key="projectItem.value"
                  :value="projectItem.value"
                >
                  {{ projectItem.label }}
                </option>
              </select>
            </label>
          </div>

          <!-- Блок 4: Возраст (мультичек) и Месяц начала обучения (мультичек) -->
          <div class="border p-4 rounded">
            <!-- Выбор возраста (checkbox в выпадающем списке) -->
            <h3 class="font-semibold mb-2">Возраст</h3>
            <div class="relative mb-4">
              <div
                @click="toggleAgeDropdown"
                class="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex items-center justify-between"
              >
                <span class="text-sm">
                  {{ selectedAges.length > 0 ? selectedAges.join(", ") : "Все возрасты" }}
                </span>
                <!-- Стрелка, которая анимируется при раскрытии -->
                <svg
                  :class="{'rotate-180': ageDropdownOpen}"
                  class="h-5 w-5 ml-2 transform transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <!-- Выпадающий список с чекбоксами по возрастам (5..18) -->
              <div
                v-if="ageDropdownOpen"
                class="absolute z-10 bg-white border border-gray-200 rounded shadow mt-1 w-full p-2 max-h-48 overflow-y-auto"
              >
                <!-- 3 колонки (grid-cols-3) -->
                <div class="grid grid-cols-3 gap-2">
                  <label
                    v-for="age in availableAges"
                    :key="age"
                    class="flex items-center text-sm"
                  >
                    <input
                      type="checkbox"
                      class="mr-2"
                      :value="age"
                      v-model="selectedAges"
                    />
                    {{ age }}
                  </label>
                </div>
              </div>
            </div>

            <!-- Месяц начала обучения (мультичек) -->
            <h3 class="font-semibold mb-2">Месяц начала обучения</h3>
            <div class="relative">
              <div
                @click="toggleStartMonthDropdown"
                class="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex items-center justify-between"
              >
                <span class="text-sm">
                  {{ selectedStartMonths.length > 0
                     ? selectedStartMonths.map(m => monthLabelByValue(m)).join(", ")
                     : "Все месяцы"
                  }}
                </span>
                <svg
                  :class="{'rotate-180': startMonthDropdownOpen}"
                  class="h-5 w-5 ml-2 transform transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <!-- Выпадающий список месяцев (одна колонка) -->
              <div
                v-if="startMonthDropdownOpen"
                class="absolute z-10 bg-white border border-gray-200 rounded shadow mt-1 w-full p-2 max-h-48 overflow-y-auto"
              >
                <div class="grid grid-cols-1 gap-2">
                  <label
                    v-for="item in startMonthsList"
                    :key="item.value"
                    class="flex items-center text-sm"
                  >
                    <input
                      type="checkbox"
                      class="mr-2"
                      :value="item.value"
                      v-model="selectedStartMonths"
                    />
                    {{ item.label }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Блок переключателей (дистанционное, лучший рейтинг) -->
        <div class="flex flex-col gap-2 mt-4">
          <!-- Показать дистанционные программы -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-semibold whitespace-nowrap">
              Показать дистанционные программы
            </label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="distanceTechnology"
              />
              <!-- "Toggle"-переключатель -->
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-2 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"
              ></div>
            </label>
          </div>

          <!-- Лучшие по рейтингу АСМА -->
          <div class="flex items-center gap-2">
            <label class="text-sm font-semibold whitespace-nowrap">
              Лучшие по рейтингу АСМА
            </label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                class="sr-only peer"
                v-model="sortByAsma"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-400 peer-focus:ring-offset-2 rounded-full peer-checked:bg-blue-600 peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all"
              ></div>
            </label>
          </div>
        </div>

        <!-- Кнопки направлений (2..7) -->
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <!-- Каждая кнопка в цикле, клик => toggleDirection(dir.id) -->
          <div
            v-for="dir in directionButtons"
            :key="dir.id"
            @click="toggleDirection(dir.id)"
            class="px-3 py-1 text-sm rounded-full border-2 cursor-pointer flex items-center"
            :class="directionButtonClass(dir.id)"
          >
            <!-- «Точка» слева от названия направления -->
            <span
              class="inline-block w-2 h-2 rounded-full mr-2"
              :class="directionDotClass(dir.id)"
            ></span>
            {{ dir.label }}
          </div>
        </div>

        <!-- Выпадающий список «Виды деятельности» -->
        <!-- Появляется только если есть хотя бы одно выбранное направление -->
        <div v-if="selectedDirections.length > 0" class="relative mt-4 w-full">
          <div
            @click="toggleActivityDropdown"
            class="border border-gray-300 rounded-lg px-3 py-2 cursor-pointer flex items-center justify-between"
          >
            <span class="text-sm">
              Виды деятельности ({{ selectedActivities.length }})
            </span>
            <svg
              :class="{'rotate-180': activityDropdownOpen}"
              class="h-5 w-5 ml-2 transform transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          <!-- Содержимое выпадающего списка видов деятельности -->
          <div
            v-if="activityDropdownOpen"
            class="absolute z-10 bg-white border border-gray-200 rounded shadow mt-1 w-full p-2 max-h-48 overflow-y-auto"
          >
            <div class="grid grid-cols-1 gap-2">
              <label
                v-for="act in programActivities"
                :key="act.id"
                class="flex items-center text-sm"
              >
                <input
                  type="checkbox"
                  class="mr-2"
                  :value="act.id"
                  v-model="selectedActivities"
                />
                {{ act.name }}
              </label>
            </div>
          </div>
        </div>

        <!-- Кнопка "Применить" (вызывает applyFilters) -->
        <div class="mt-4 flex justify-end">
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            @click="applyFilters"
          >
            Применить
          </button>
        </div>
      </div>

      <!-- Блок "Ничего не найдено" -->
      <div v-if="programs.length === 0" class="text-center text-gray-500 mb-6">
        Ничего не найдено...
      </div>

      <!-- Сетка карточек программ (только если programs.length > 0) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" v-if="programs.length > 0">
        <!-- Каждая карточка: переход к программе, отображение возраста, иконки, статуса записи -->
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
              {{ Math.floor(program.age_min / 12) }} лет
            </span>
            <span v-else>
              {{ Math.floor(program.age_min / 12) }} - {{ Math.floor(program.age_max / 12) }} лет
            </span>
          </div>
          <div class="absolute top-2 right-2 bg-white text-black text-xs font-semibold rounded-full px-3 py-1">
            {{ program.duration_string }}
          </div>

          <!-- Контент карточки: короткое название, организация -->
          <div class="mt-10">
            <h2 class="text-left text-lg font-semibold">
              {{ program.short_name }}
            </h2>
            <p class="text-left text-sm mt-2">
              {{ program.organization_name }}
            </p>
          </div>

          <!-- Нижний блок: иконка программы, кнопка "Записаться" -->
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

      <!-- Кнопка "Показать ещё" (если есть, что грузить) -->
      <div class="flex justify-center mt-8 ">
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
      // ============ Данные о программах и их отображении ============
      programs: [],         // Все загруженные программы (массив)
      visiblePrograms: [],   // Программы, которые сейчас отображаем (можно фильтровать, но в данном случае они совпадают с programs)

      // ============ Пагинация ============
      perPage: 24,          // Сколько программ загружать за раз
      currentPage: 1,       // Текущая страница

      // ============ Переменные для фильтров и поиска ============
      filtersVisible: false, // Показываем / скрываем блок фильтров
      searchQuery: "",       // Текст поискового запроса

      // Форма обучения (radio): значения "1" / "2" / "3"
      formValue: "",
      // Набор в группу (radio): "1" / "2"
      enrollmentValue: "",
      // Адаптация для детей с ОВЗ (select)
      adaptationValue: "",
      // Список муниципалитетов, получаем с сервера
      municipalityList: [],
      // Выбранный муниципалитет (select)
      municipalityValue: "",
      // Проект (select)
      programProjectIdValue: "",

      // Возраст (мультичек) 5..18
      ageDropdownOpen: false,  // Открытие/закрытие дропдауна
      selectedAges: [],        // Список выбранных возрастов
      availableAges: [5,6,7,8,9,10,11,12,13,14,15,16,17,18],

      // Месяц начала обучения (мультичек)
      startMonthDropdownOpen: false,
      selectedStartMonths: [],
      startMonthsList: [
        { value: "9.2024",  label: "Сентябрь-2024" },
        { value: "10.2024", label: "Октябрь-2024" },
        { value: "11.2024", label: "Ноябрь-2024" },
        { value: "12.2024", label: "Декабрь-2024" },
        { value: "1.2025",  label: "Январь-2025" },
        { value: "2.2025",  label: "Февраль-2025" },
        { value: "3.2025",  label: "Март-2025" },
        { value: "4.2025",  label: "Апрель-2025" },
        { value: "5.2025",  label: "Май-2025" },
        { value: "6.2025",  label: "Июнь-2025" },
        { value: "7.2025",  label: "Июль-2025" },
        { value: "8.2025",  label: "Август-2025" },
      ],

      // Дистанционные программы (checkbox)
      distanceTechnology: false,
      // Лучшие по рейтингу АСМА (checkbox)
      sortByAsma: false,

      // Дебаунс для поиска
      searchDebounceTimeout: null,

      // Справочник адаптаций (select)
      adaptationOptions: [
        { value: 1,  label: "Глухие" },
        { value: 2,  label: "Слабослышащие и позднооглохшие" },
        { value: 3,  label: "Слепые" },
        { value: 4,  label: "Слабовидящие" },
        { value: 5,  label: "Нарушение речи" },
        { value: 6,  label: "Фонетико-фонематическое нарушение речи" },
        { value: 7,  label: "Нарушение опорно-двигательного аппарата" },
        { value: 8,  label: "Задержка психического развития" },
        { value: 9,  label: "Расстройство аутистического спектра" },
        { value: 10, label: "Нарушение интеллекта" },
        { value: 12, label: "Нарушение эндокринной системы" },
      ],

      // Справочник проектов (program_project_id)
      programProjectOptions: [
        { label: "Нет проекта", value: 10 },
        { label: "Кванториум", value: 1 },
        { label: "IT-Куб", value: 2 },
        { label: "Точка роста", value: 3 },
        { label: "Центр выявления, поддержки и развития способностей", value: 4 },
        { label: "Дом научной коллаборации", value: 5 },
        { label: "Новые места в доп.образование", value: 6 },
        { label: "Мобильный технопарк Кванториум", value: 7 },
        { label: "Школьный кванториум", value: 8 },
        { label: "Инженерно-технические классы", value: 11 },
        { label: "Школьный спортивный клуб", value: 10 },
        { label: "Школьный музей", value: 103 },
        { label: "Школьный театр", value: 104 },
      ],

      // Направления (2..7)
      directionButtons: [
        { id: 2, label: "Техническая" },
        { id: 3, label: "Художественная" },
        { id: 4, label: "Естественнонаучная" },
        { id: 5, label: "Социально-гуманитарная" },
        { id: 6, label: "Туристско-краеведческая" },
        { id: 7, label: "Физкультурно-спортивная" },
      ],
      // Какие направления выбраны (массив ID)
      selectedDirections: [],
      // Список всех возможных видов деятельности (загружаем для выбранных направлений)
      programActivities: [],
      // Какие виды деятельности выбраны (массив ID)
      selectedActivities: [],

      // Выпадающий список «Виды деятельности»
      activityDropdownOpen: false,
    };
  },

  computed: {
    /**
     * Говорит, остались ли ещё программы, чтобы показать "Показать ещё".
     * Проверяем, достаточно ли программ в массиве: если общее число программ
     * больше либо равно (currentPage * perPage), значит есть следующая страница.
     */
    hasMore() {
      return this.programs.length >= this.currentPage * this.perPage;
    },
  },

  methods: {
    /**
     * Нажатие на кнопку направления.
     * Если направление уже выбрано => убираем из массива.
     * Если не выбрано => добавляем в массив.
     * После этого загружаем виды деятельности для выбранных направлений.
     */
    toggleDirection(dirId) {
      if (this.selectedDirections.includes(dirId)) {
        this.selectedDirections = this.selectedDirections.filter(d => d !== dirId);
      } else {
        this.selectedDirections.push(dirId);
      }
      // Обновляем общий список видов деятельности
      this.fetchAllActivitiesForDirections();
    },

    /**
     * Возвращает классы кнопки направления (цвет фона и текста)
     * в зависимости от того, выбрано направление или нет.
     */
    directionButtonClass(dirId) {
      const colors = {
        5: "bg-[#75ccff] border-[#75ccff]",
        3: "bg-[#ff6f6a] border-[#ff6f6a]",
        4: "bg-[#df323b] border-[#df323b]",
        6: "bg-[#FF69B4] border-[#FF69B4]",
        7: "bg-[#9370DB] border-[#9370DB]",
        2: "bg-[#483D8B] border-[#483D8B]",
      };
      const active = this.selectedDirections.includes(dirId);

      // Если активно => используем основной цвет, белый текст
      if (active) {
        return [colors[dirId], "text-white"];
      } else {
        // Иначе => белый фон, цветная рамка, чёрный текст
        return ["bg-white", "text-black", "border", colors[dirId]];
      }
    },

    /**
     * Точка слева: если активна => делаем её белой,
     * иначе — в цвете направления.
     */
    directionDotClass(dirId) {
      const colors = {
        5: "bg-[#75ccff]",
        3: "bg-[#ff6f6a]",
        4: "bg-[#df323b]",
        6: "bg-[#FF69B4]",
        7: "bg-[#9370DB]",
        2: "bg-[#483D8B]",
      };
      const active = this.selectedDirections.includes(dirId);
      return active ? "bg-white" : colors[dirId];
    },

    /**
     * Загружаем все виды деятельности для выбранных направлений (selectedDirections).
     * Делаем несколько запросов (по каждому направлению),
     * объединяем результаты, убираем дубликаты.
     */
    async fetchAllActivitiesForDirections() {
      // Если ничего не выбрано => очищаем список
      if (this.selectedDirections.length === 0) {
        this.programActivities = [];
        this.selectedActivities = [];
        return;
      }

      let combined = [];
      try {
        for (const dId of this.selectedDirections) {
          const url = `https://apidir.pfdo.ru/v1/directory-program-activities?search[direction_id]=${dId}&per-page=-1&fields=id,direction_id,name`;
          const res = await fetch(url);
          const data = await res.json();
          if (data && data.data && Array.isArray(data.data)) {
            combined = combined.concat(data.data);
          }
        }
        // Убираем дубликаты по id
        const map = {};
        combined.forEach(item => {
          map[item.id] = item;
        });
        const newActivities = Object.values(map);

        // Удаляем из выбранных виды деятельности, которых больше нет
        const newIds = newActivities.map(a => a.id);
        this.selectedActivities = this.selectedActivities.filter(id => newIds.includes(id));

        // Сохраняем итоговый список
        this.programActivities = newActivities;
      } catch (err) {
        console.error("Ошибка при загрузке видов деятельности:", err);
        this.programActivities = [];
        this.selectedActivities = [];
      }
    },

    /**
     * Формируем query-параметры на основе выбранных фильтров.
     * Далее будем добавлять их к URL для запроса программ.
     */
    buildQueryParams() {
      const params = new URLSearchParams();

      // Поиск
      if (this.searchQuery) {
        params.append("search[name]", this.searchQuery);
      }

      // Форма обучения
      if (this.formValue) {
        params.append("search[form]", this.formValue);
      }

      // Набор в группу
      if (this.enrollmentValue) {
        params.append("search[enrollment]", this.enrollmentValue);
      }

      // Адаптация
      if (this.adaptationValue) {
        params.append("search[zab]", this.adaptationValue);
      }

      // Муниципалитет
      if (this.municipalityValue) {
        params.append("search[mun]", this.municipalityValue);
      }

      // Проект
      if (this.programProjectIdValue) {
        params.append("search[program_project_id]", this.programProjectIdValue);
      }

      // Возрасты (массив)
      this.selectedAges.forEach((age, i) => {
        params.append(`search[ages][${i}]`, age);
      });

      // Месяц начала обучения (массив)
      this.selectedStartMonths.forEach(val => {
        params.append("search[start_education_month_and_year][]", val);
      });

      // Дистанционные
      if (this.distanceTechnology) {
        params.append("search[distance_technology]", "1");
      }

      // Сортировка (Лучшие по рейтингу АСМА) => sort=-program_nok_rating
      if (this.sortByAsma) {
        params.append("sort", "-program_nok_rating");
      } else {
        // По умолчанию можно передавать пустую строку или другую сортировку
        params.append("sort", "");
      }

      // Направления (массив)
      this.selectedDirections.forEach(dId => {
        params.append("search[direction_id][]", dId);
      });

      // Виды деятельности
      if (this.selectedActivities.length > 0) {
        params.append("search[program_activity_id_list]", this.selectedActivities.join(","));
      }

      return params.toString();
    },

    /**
     * Загружаем список программ с учётом выбранных фильтров.
     * Запрос отправляется на сервер, данные парсим в JSON,
     * сохраняем в programs и visiblePrograms.
     */
    async fetchPrograms() {
      const baseUrl = "https://api.pfdo.ru/v2/main-page/search/es-programs";
      const query = this.buildQueryParams();
      // Добавляем в запрос perPage, page, operator=31 (пример) и нужные expand-параметры
      const apiUrl = `${baseUrl}?${query}&per-page=${this.perPage}&page=${this.currentPage}&operator=31&expand=program_nok_rating,duration_string,kind`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          // Если первая страница => перезаписываем массив, иначе — дополняем
          if (this.currentPage === 1) {
            this.programs = [...data.data];
          } else {
            this.programs = [...this.programs, ...data.data];
          }
          // visiblePrograms — тот же массив (без дополнительной фильтрации)
          this.visiblePrograms = this.programs;
        } else {
          // Если первая страница вернулась пустой => обнуляем
          if (this.currentPage === 1) {
            this.programs = [];
          }
          this.visiblePrograms = this.programs;
        }
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        this.programs = [];
        this.visiblePrograms = [];
      }
    },

    /**
     * Загружаем список муниципалитетов (operator=31) — Курганская область, к примеру.
     * Сохраняем в municipalityList.
     */
    async fetchMunicipalities() {
      try {
        const response = await fetch("https://api.pfdo.ru/v2/main-page/muns/31");
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          this.municipalityList = data.data;
        } else {
          this.municipalityList = [];
        }
      } catch (error) {
        console.error("Ошибка при загрузке муниципалитетов:", error);
        this.municipalityList = [];
      }
    },

    /**
     * "Показать ещё": увеличиваем currentPage и подгружаем ещё данных.
     */
    loadMore() {
      this.currentPage += 1;
      this.fetchPrograms();
    },

    /**
     * Переход на страницу/сайт/приложение программы:
     * можно открывать в новой вкладке (window.open).
     */
    navigateToProgram(id) {
      const programUrl = `https://65.pfdo.ru/app/?program=${id}`;
      window.open(programUrl, "_blank");
    },

    /**
     * Переход к записи в группу.
     * В зависимости от того, как настроено приложение, 
     * мы можем открыть другую страницу или модальное окно.
     */
    navigateToGroup(id) {
      const groupUrl = `https://65.pfdo.ru/app/groups/${id}`;
      window.open(groupUrl, "_blank");
    },

    /**
     * Показать/скрыть блок фильтров.
     */
    toggleFilters() {
      this.filtersVisible = !this.filtersVisible;
    },

    /**
     * Очистить поле поиска, сбросить страницу, перезагрузить программы.
     */
    clearSearch() {
      this.searchQuery = "";
      this.currentPage = 1;
      this.programs = [];
      this.visiblePrograms = [];
      this.fetchPrograms();
    },

    /**
     * Дебаунс-поиск: при каждом вводе "обнуляем" предыдущий таймер,
     * если текст >= 2 символов или равен 0 — делаем запрос через 300мс.
     */
    onSearch() {
      clearTimeout(this.searchDebounceTimeout);
      if (this.searchQuery.length >= 2 || this.searchQuery.length === 0) {
        this.searchDebounceTimeout = setTimeout(() => {
          this.currentPage = 1;
          this.programs = [];
          this.visiblePrograms = [];
          this.fetchPrograms();
        }, 300);
      }
    },

    /**
     * "Применить" — обновляем текущую страницу и заново загружаем программы.
     */
    applyFilters() {
      this.currentPage = 1;
      this.programs = [];
      this.visiblePrograms = [];
      this.fetchPrograms();
    },

    /**
     * Тоггл списка возрастов.
     */
    toggleAgeDropdown() {
      this.ageDropdownOpen = !this.ageDropdownOpen;
    },

    /**
     * Тоггл списка месяцев начала обучения.
     */
    toggleStartMonthDropdown() {
      this.startMonthDropdownOpen = !this.startMonthDropdownOpen;
    },

    /**
     * Тоггл выпадающего списка "Виды деятельности".
     */
    toggleActivityDropdown() {
      this.activityDropdownOpen = !this.activityDropdownOpen;
    },

    /**
     * Возвращает текстовую метку месяца по его value. 
     * Используется при отображении выбранных пунктов (selectedStartMonths).
     */
    monthLabelByValue(val) {
      const found = this.startMonthsList.find(item => item.value === val);
      return found ? found.label : val;
    },

    /**
     * Определяем фон карточки по directory_id или directionId.
     * Цвета заданы для примера, можно настроить свою цветовую схему.
     */
    getBackgroundColor(directoryId, directionId) {
      const colors = {
        5: "bg-[#75ccff]",
        3: "bg-[#ff6f6a]",
        4: "bg-[#df323b]",
        6: "bg-[#FF69B4]",
        7: "bg-[#9370DB]",
        2: "bg-[#483D8B]",
      };
      // Если есть directionId == 2 => у нас особый цвет
      if (directionId === 2) return colors[2];
      // Иначе берём directoryId, если нет в словаре => серый фон
      return colors[directoryId] || "bg-gray-200";
    },
  },

  /**
   * При монтировании (mounted) компонента:
   * 1) Загружаем список муниципалитетов
   * 2) Загружаем программы
   */
  async mounted() {
    await this.fetchMunicipalities();
    this.fetchPrograms();
  },
};
</script>

<style>
/* 
  Включаем Tailwind CSS классы.
  rotate-180 — для переворота стрелки ▼ при раскрытии.
*/
.rotate-180 {
  transform: rotate(180deg);
}
</style>
