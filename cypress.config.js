require('dotenv').config();

const { defineConfig } = require('cypress');
const mysql = require('mysql2/promise');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { allureCypress } = require('allure-cypress/reporter');


function queryDb(query) {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  })
    .then((connection) => {
      return connection.query(query).then((result) => {
        connection.end();
        return result[0];
      });
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_FRONTEND_URL,
    specPattern: 'cypress/e2e/**/*.feature',
    chromeWebSecurity: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      on('task', {
        queryDb: (query) => {
          return queryDb(query);
        },
      });

      return config;
    },
  },
  env: {
    apiUrl: process.env.CYPRESS_API_URL,
    adminUser: process.env.CYPRESS_ADMIN_USER,
    adminPass: process.env.CYPRESS_ADMIN_PASS,
    testUser: process.env.CYPRESS_TEST_USER,
    testPass: process.env.CYPRESS_TEST_PASS,
  },
});