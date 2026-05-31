import { Before } from "@badeball/cypress-cucumber-preprocessor";
import * as allure from "allure-cypress";

const VALID_TAGS = [
  "api",
  "ui",
  "admin",
  "user",
  "categories",
  "sales",
  "plants",
  "dashboard",
  "215523H",
  "215503X",
  "215566P",
  "215521B"
];

Before((scenario) => {
  scenario.pickle.tags.forEach((tag) => {
    const tagName = tag.name.replace("@", "");
    if (VALID_TAGS.includes(tagName)) {
      allure.label("tag", tagName);
    }
  });
});
