import "./swipe-events";

const themes = document.documentElement.getAttribute("data-themes").split(" ");
let currentTheme = document.documentElement.getAttribute("data-theme");
const buttons = document.querySelectorAll("button");
const result = document.querySelector(".result");
const preview = document.querySelector(".preview");
document.addEventListener("swiped-left", e => nextTheme(+1));
document.addEventListener("swiped-right", e => nextTheme(-1));

const nextTheme = (direction = 1) => {
  const index = themes.indexOf(currentTheme);
  const i = index + direction;
  const n = themes.length;
  currentTheme = themes[((i % n) + n) % n];
  setTheme(currentTheme);
};

const setTheme = theme => {
  document.documentElement.setAttribute("data-theme", theme);
};

let state = {
  pendingOperation: null,
  display: "0",
  preview: null,
  resetNext: false
};

const setResult = () => {
  result.innerHTML = state.display
    .toString()
    .replace("*", "&times")
    .replace(".", ",");
  preview.innerHTML = preview !== null ? state.preview : "";
};

const isOperator = e => e.target.classList.contains("operator");
const isEqual = e => e.target.classList.contains("equal");
const isDelete = e => e.target.classList.contains("delete");
const isClear = e => e.target.classList.contains("clear");
const isToggleSymbol = e => e.target.classList.contains("toggle-symbol");

const performOperation = operator => {
  state = {
    ...state,
    pendingOperation: operator,
    display: state.display + operator
  };
};

const onClick = e => {
  const value = e.target.value;
  if (isOperator(e)) {
    if (state.pendingOperation === null) performOperation(value);
  } else if (isEqual(e)) {
    state = {
      ...state,
      pendingOperation: null,
      display: eval(state.display.replace("%", "/100")).toString(),
      preview: null,
      resetNext: true
    };
  } else if (isDelete(e)) {
    const display = state.display.substring(0, state.display.length - 1);
    state = {
      ...state,
      pendingOperation: null,
      display: display === "" ? "0" : display,
      preview: null
    };
  } else if (isClear(e)) {
    state = {
      ...state,
      display: "0",
      preview: null,
      resetNext: false
    };
  } else if (isToggleSymbol(e)) {
    state = {
      ...state,
      pendingOperation: null,
      display: (parseFloat(state.display) * -1).toString(),
      preview: null
    };
  } else {
    const display =
      state.resetNext && state.display.match(/^\d+$/) ? "0" : state.display;

    if (state.pendingOperation !== null) {
      state = {
        ...state,
        pendingOperation: null,
        display: display + value,
        preview: eval(display + value)
      };
    } else {
      state = {
        ...state,
        pendingOperation: null,
        display: display !== "0" ? display + value : value
      };
    }

    if (state.resetNext) {
      state = { ...state, resetNext: false };
    }
  }
  setResult();
};

buttons.forEach(btn => btn.addEventListener("click", onClick));
