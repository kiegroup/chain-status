const core = require("@actions/core");
jest.mock("@actions/core");
const { annotationer } = require("../../src/lib/common");

afterEach(() => {
  jest.clearAllMocks();
});

const content = "logging content";

describe("annotationer", () => {
  test("notice", () => {
    annotationer.notice("This is the title", content);

    expect(core.notice).toBeCalledWith(
      content,
      expect.objectContaining({
        title: "This is the title"
      })
    );
  });

  test("warning", () => {
    annotationer.warning("This is the title", content);

    expect(core.warning).toBeCalledWith(
      content,
      expect.objectContaining({
        title: "This is the title"
      })
    );
  });

  test("error", () => {
    annotationer.error("This is the title", content);

    expect(core.error).toBeCalledWith(
      content,
      expect.objectContaining({
        title: "This is the title"
      })
    );
  });
});
