export function base64ToImage(b64: string | undefined): string {
    let b64String = "";
    if (b64?.startsWith("iVB")) {
      b64String = "data:image/png;base64," + b64;
    } else if (b64?.startsWith("/9j")) {
      b64String = "data:image/jpg;base64," + b64;
    }

    return b64String;
}