import { ContentParserException } from "../exceptions";
import { ContentParser } from "./contentParser";

/**
 * Parser para contenido XML
 * Maneja: text/xml y application/xml.
 */
export class XmlParser implements ContentParser {
  public canParse(contentType: string): boolean {
    return (
      contentType.includes("application/xml") ||
      contentType.includes("text/xml")
    );
  }

  public async parse(input: string | Buffer): Promise<Record<string, unknown>> {
    const text = Buffer.isBuffer(input) ? input.toString("utf-8") : input;

    const result: Record<string, unknown> = {};

    const cleanXml = text.replace(/<\?xml[^?]*\?>/g, "").trim();

    if (!cleanXml.startsWith("<") || !cleanXml.endsWith(">"))
      throw new ContentParserException("Invalid XML structure");

    // Regex básico para tags simples: <key>value</key>
    const tagRegex = /<(\w+)>([^<]+)<\/\1>/g;
    let match: RegExpExecArray;

    while ((match = tagRegex.exec(text)) !== null) {
      const [, key, value] = match;
      result[key] = this.parseValue(value);
    }

    return result;
  }

  private parseValue(value: string): unknown {
    const trimmed = value.trim();

    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    if (trimmed === "null" || trimmed === "") return null;
    if (!isNaN(Number(trimmed)) && trimmed !== "") return Number(trimmed);

    return trimmed;
  }
}
