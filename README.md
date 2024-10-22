# Node-Country-Geonames 使用手册

## 目录

- [Node-Country-Geonames 使用手册](#node-country-geonames-使用手册)
  - [目录](#目录)
  - [项目简介](#项目简介)
  - [安装与配置](#安装与配置)
    - [1. 克隆或下载项目](#1-克隆或下载项目)
    - [2. 安装依赖](#2-安装依赖)
  - [使用 GeoNames API](#使用-geonames-api)
    - [注册 GeoNames 账号](#注册-geonames-账号)
    - [获取 API Key](#获取-api-key)
  - [脚本说明](#脚本说明)
    - [主要功能](#主要功能)
    - [主要输出](#主要输出)
  - [执行脚本](#执行脚本)
    - [注意事项](#注意事项)

---

## 项目简介

该项目通过使用 [GeoNames](https://www.geonames.org/) API 来获取全球各个国家的相关信息，包括国家名称、首都的经纬度、语言、人口等，并将这些信息存储到一个 `rich_countries_data.json` 文件中。数据内容包括英文和中文国家名称（依据自定义的对照表）。

---

## 安装与配置

### 1. 克隆或下载项目

首先，请将此项目克隆或下载到本地。

```bash
git clone git@github.com:building-here/node-country-geonames.git
cd node-country-geonames
```

### 2. 安装依赖

安装相关依赖

```bash
pnpm install
```

---

## 使用 GeoNames API

为了正常运行该脚本，你需要拥有一个 GeoNames API 的账号，并在脚本中替换为你的用户名。

### 注册 GeoNames 账号

1. 访问 [GeoNames](https://www.geonames.org/) 网站。
2. 点击右上角的 “Login” 按钮，然后选择 “Register” 进行注册。
3. 完成注册后，登录你的账号。

### 获取 API Key

GeoNames 使用用户名作为 API Key：

1. 登录后，点击右上角的用户名，进入你的账号页面。
2. 在页面中可以看到 API 使用详情，你的用户名即为 API Key。
3. 在 `main.js` 中找到以下行，将 `username` 替换为你的 GeoNames 用户名：
   ```javascript
   const geoNamesUsername = "username"; // 替换为有效用户名
   ```

---

## 脚本说明

### 主要功能

- **fetchCountryData**: 调用 GeoNames 的 `countryInfoJSON` 接口，获取所有国家的基本信息。
- **fetchCapitalCoordinates**: 调用 GeoNames 的 `searchJSON` 接口，查询每个国家首都的经纬度。
- **generateCountryData**: 生成包含详细国家信息的数组，并将其输出为 `rich_countries_data.json` 文件。

### 主要输出

输出内容为各个国家的详细信息，结构如下：

```json
{
  "name_en": "United States",
  "name_cn": "美国",
  "capital": {
    "name": "Washington",
    "latitude": 38.89511,
    "longitude": -77.03637
  },
  "info": {
    "continent": "NA",
    "languages": "en-US,es-US,haw,fr",
    "geonameId": 6252001,
    "isoAlpha3": "USA",
    "isoNumeric": "840",
    "fipsCode": "US",
    "population": 331002651,
    "areaInSqKm": 9629091,
    "countryCode": "US",
    "currencyCode": "USD",
    "postalCodeFormat": "#####-####"
  },
  "geography": {
    "north": 49.384358,
    "south": 24.396308,
    "east": -66.93457,
    "west": -125.00165
  },
  "provinces": [],
  "ethnicGroups": []
}
```

---

## 执行脚本

在替换为你的 GeoNames 用户名后，可以通过运行以下命令来执行脚本：

```bash
node main.js
```

运行后，脚本将生成一个 `rich_countries_data.json` 文件，其中包含所有国家的详细信息。

---

### 注意事项

- 确保你的 GeoNames 账户 API 请求次数在允许范围内（每小时最多 2000 次免费请求）。
- 如果出现错误，请检查网络连接并确保 API key（用户名）正确。
