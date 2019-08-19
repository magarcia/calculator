import $ from "./selector";

describe("selector", () => {
  let getElementById;
  let querySelectorAll;

  beforeAll(() => {
    getElementById = jest.fn();
    querySelectorAll = jest.fn();
    Object.defineProperty(global.document, "getElementById", {
      value: getElementById
    });
    Object.defineProperty(global.document, "querySelectorAll", {
      value: querySelectorAll
    });
  });

  it("should call querySelector when selector is an id", () => {
    $("#selector");

    expect(getElementById).toHaveBeenCalledWith("selector");
  });

  it("should call querySelectorAll when selector is a class", () => {
    $(".selector");

    expect(querySelectorAll).toHaveBeenCalledWith(".selector");
  });

  it("should call querySelectorAll when selector is a tag", () => {
    $("body");

    expect(querySelectorAll).toHaveBeenCalledWith("body");
  });
});
