export const WHOLISTENER_S3_BASE =
  'https://acoustic-sandbox.s3.amazonaws.com/wholistener/snapshot-orcasound-net-wholistener-200930/wholistener/'

// Replace only the origin/prefix; do not decode, normalize, or drop query strings.
export function rewriteWholistenerUrl(url) {
  return url.replace(/^https?:\/\/(?:www\.)?orcasound\.net\/wholistener\//i, WHOLISTENER_S3_BASE)
}

/** Walk every string value, including markDefs.href, spans, and custom blocks. */
export function rewriteWholistenerBody(body) {
  const changes = []
  const walk = (value, path) => {
    if (typeof value === 'string') {
      return value.replace(
        /https?:\/\/(?:www\.)?orcasound\.net\/wholistener\/[^\s<>"']*/gi,
        (oldUrl) => {
          const newUrl = rewriteWholistenerUrl(oldUrl)
          changes.push({path, oldUrl, newUrl})
          return newUrl
        },
      )
    }
    if (Array.isArray(value)) return value.map((item, index) => walk(item, `${path}[${index}]`))
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, walk(item, `${path}.${key}`)]),
      )
    }
    return value
  }
  return {body: walk(body, 'body'), changes}
}
