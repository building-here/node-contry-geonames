const axios = require("axios");
const fs = require("fs");
const countryTranslations = require("./countryTranslations"); // 引入国家名称对照表

// 使用你的 GeoNames API key
const geoNamesUsername = "username"; // 替换为有效用户名

const continents = {
  AF: "Africa",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  SA: "South America",
  OC: "Oceania",
  AN: "Antarctica",
};

// 获取所有国家信息
async function fetchCountryData() {
  try {
    const response = await axios.get(
      `https://secure.geonames.org/countryInfoJSON?username=${geoNamesUsername}`
    );
    return response.data.geonames;
  } catch (error) {
    console.error("Error fetching country data:", error);
    return [];
  }
}

// 获取首都的经纬度
async function fetchCapitalCoordinates(country) {
  try {
    const response = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${country.capital}&country=${country.countryCode}&maxRows=1&username=${geoNamesUsername}`
    );
    const capital = response.data.geonames[0];
    return capital ? { latitude: capital.lat, longitude: capital.lng } : null;
  } catch (error) {
    console.error(`Error fetching coordinates for ${country.capital}:`, error);
    return null;
  }
}

// 生成按国家分类的丰富数据
async function generateCountryData() {
  const countries = await fetchCountryData();
  const countryDataArray = [];

  for (const country of countries) {
    const capitalCoordinates = await fetchCapitalCoordinates(country);

    if (capitalCoordinates) {
      // 获取中文国家名称，如果没有匹配的中文翻译，使用英文名称
      const name_cn =
        countryTranslations[country.countryName] || country.countryName;

      countryDataArray.push({
        name_en: country.countryName,
        name_cn: name_cn, // 使用对照表中的中文名称
        capital: {
          name: country.capital,
          latitude: parseFloat(capitalCoordinates.latitude),
          longitude: parseFloat(capitalCoordinates.longitude),
        },
        info: {
          continent: country.continent,
          languages: country.languages,
          geonameId: country.geonameId,
          isoAlpha3: country.isoAlpha3,
          isoNumeric: country.isoNumeric,
          fipsCode: country.fipsCode,
          population: country.population,
          areaInSqKm: country.areaInSqKm,
          countryCode: country.countryCode,
          currencyCode: country.currencyCode,
          postalCodeFormat: country.postalCodeFormat,
        },
        geography: {
          north: country.north,
          south: country.south,
          east: country.east,
          west: country.west,
        },
        provinces: [],
        ethnicGroups: [],
      });
    }
  }

  // 将结果写入 JSON 文件，按你提供的格式输出
  fs.writeFileSync(
    "rich_countries_data.json",
    JSON.stringify(countryDataArray, null, 2)
  );
  console.log("Data saved to rich_countries_data.json");
}

generateCountryData();
