const isProductionBuild = process.env.NODE_ENV === 'production'

export const SUPPORT_EMAIL = 'grxgabriel@gmail.com'

export const ADMIN_EMAIL = SUPPORT_EMAIL

export const APP_NAME = 'SOS Animais'

export const SLOGAN = 'Ajudando o resgate de animais do RS'

export const APP_DOMAIN = isProductionBuild ? 'https://sos-animais.vercel.app' : `http://localhost:3000`

export const SESSION_DURATION = 10 * 60 // in seconds

export const TWITTER_LINK = 'https://twitter.com/huumadotco'

export const FETCH_LIMIT = 20
