export const AVATAR_STYLES = ["lorelei", "notionists", "croodles"] as const;

type AvatarStyle = (typeof AVATAR_STYLES)[number];

type GenerateAvatarOptions = {
  username?: string;
  userId?: string;
  seed?: string;
  style?: AvatarStyle;
  size?: number;
};

const getRandomInt = (maxExclusive: number) => {
  if (maxExclusive <= 0) {
    return 0;
  }

  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.getRandomValues) {
    const buf = new Uint32Array(1);
    cryptoObj.getRandomValues(buf);
    return buf[0] % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
};

const randomSeed = () => {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj?.randomUUID) {
    return cryptoObj.randomUUID();
  }

  if (cryptoObj?.getRandomValues) {
    const buf = new Uint8Array(16);
    cryptoObj.getRandomValues(buf);
    return Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export function generateAvatar(options: GenerateAvatarOptions = {}) {
  const style = options.style ?? AVATAR_STYLES[getRandomInt(AVATAR_STYLES.length)];
  const seed = options.seed ?? options.userId ?? options.username ?? randomSeed();

  const url = new URL(`https://api.dicebear.com/7.x/${style}/svg`);
  url.searchParams.set("seed", seed);

  if (typeof options.size === "number" && Number.isFinite(options.size)) {
    const size = Math.max(1, Math.floor(options.size));
    url.searchParams.set("size", String(size));
  }

  return url.toString();
}

