export const fetchPrograms = async (params) => {
    const apiUrl = `https://api.pfdo.ru/v2/main-page/search/es-programs?${params}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  };
  