import { ContentParserManager, ContentParser } from "../src/parsers";

describe("ContentParserManager", () => {
  let manager: ContentParserManager;

  beforeEach(() => {
    manager = new ContentParserManager();
  });

  it("should register default parsers", async () => {
    const json = await manager.parse('{"name":"juan"}', "application/json");

    expect(json).toEqual({ name: "juan" });
  });

  it("should give priority to last registered parser", async () => {
    class CustomParser implements ContentParser {
      canParse() {
        return true;
      }
      async parse() {
        return "custom";
      }
    }

    manager.registerParser(new CustomParser());

    const result = await manager.parse("whatever", "application/json");
    expect(result).toBe("custom");
  });

  it("should use JsonParser for application/json", async () => {
    const result = await manager.parse('{"age":30}', "application/json");

    expect(result).toEqual({ age: 30 });
  });

  it("should use UrlEncodedParser", async () => {
    const result = await manager.parse(
      "name=juan&role=admin",
      "application/x-www-form-urlencoded",
    );

    expect(result).toEqual({
      name: "juan",
      role: "admin",
    });
  });

  it("should use TextParser", async () => {
    const result = await manager.parse("hello world", "text/plain");

    expect(result).toBe("hello world");
  });

  it("should use MultipartParser", async () => {
    const boundary = "test123";
    const contentType = `multipart/form-data; boundary=${boundary}`;

    const body = Buffer.from(
      `--${boundary}\r\n` +
        `Content-Disposition: form-data; name="title"\r\n\r\n` +
        `Post\r\n` +
        `--${boundary}--`,
    );

    const result = (await manager.parse(body, contentType)) as any;

    expect(result.fields).toEqual({
      title: "Post\r\n",
    });
  });

  it("should return raw buffer if no parser matches", async () => {
    const body = "binary-data";

    const result = await manager.parse(body, "application/octet-stream");

    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString()).toBe("binary-data");
  });

  it("should default contentType to text/plain", async () => {
    const result = await manager.parse("holamundo");

    expect(result).toBe("holamundo");
  });
});
