export function slug(str) {
    //gera saidas formatadas como slug, sem espacos separados por "-" (Nome Empresa -> nome-empresa)
    const source = String(str);
    if (!source) return ""
    return str
        .toLowerCase()                     // converte para minúsculas
        .normalize("NFD")                  // separa acentos
        .replace(/[\u0300-\u036f]/g, "")   // remove acentos
        .replace(/[^a-z0-9\s-]/g, "")      // remove caracteres especiais
        .trim()                            // remove espaços no início e fim
        .replace(/\s+/g, "-");             // substitui espaços por hífens
}

// --- Implementação simples de SHA-256 em JS puro (sem libs externas) ---
// Fonte reduzida e simplificada para estudo
// ric 2021-08-20
 function sha256(ascii) {
    const rightRotate = (value, amount) => (value >>> amount) | (value << (32 - amount));

    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    let result = '';

    const words = [];
    const asciiBitLength = ascii.length * 8;

    const hash = sha256.h = sha256.h || [];
    const k = sha256.k = sha256.k || [];
    let primeCounter = k.length;

    const isPrime = n => {
        for (let factor = 2; factor * factor <= n; factor++) {
            if (n % factor === 0) return false;
        }
        return true;
    };

    const getFractionalBits = n => ((n - (n | 0)) * maxWord) | 0;

    for (let candidate = 2; primeCounter < 64; candidate++) {
        if (isPrime(candidate)) {
            hash[primeCounter] = getFractionalBits(Math.sqrt(candidate));
            k[primeCounter++] = getFractionalBits(Math.cbrt(candidate));
        }
    }

    ascii += '\x80';
    while (ascii.length % 64 - 56) ascii += '\x00';
    for (let i = 0; i < ascii.length; i++) {
        const j = ascii.charCodeAt(i);
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }

    words[words.length] = (asciiBitLength / maxWord) | 0;
    words[words.length] = asciiBitLength;

    for (let j = 0; j < words.length;) {
        const w = words.slice(j, j += 16);
        const oldHash = hash.slice(0);

        for (let i = 0; i < 64; i++) {
            const w15 = w[i - 15], w2 = w[i - 2];

            w[i] = i < 16 ? w[i] : (w[i - 16] +
                (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                w[i - 7] +
                (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0;

            const [a, b, c, d, e, f, g, h] = hash;

            const t1 = (h +
                (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) +
                ((e & f) ^ (~e & g)) +
                k[i] +
                w[i]) | 0;

            const t2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) +
                ((a & b) ^ (a & c) ^ (b & c))) | 0;

            hash.unshift((t1 + t2) | 0);
            hash[4] = (hash[4] + t1) | 0;
            hash.pop();
        }

        for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 3; j + 1; j--) {
            const b = (hash[i] >> (j * 8)) & 255;
            result += (b < 16 ? 0 : '') + b.toString(16);
        }
    }
    return result;
}

export function segredo(key, password, application) {
    return sha256(`${key}${password}${application}`);
}