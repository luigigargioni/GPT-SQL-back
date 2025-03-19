import { LanguageValues } from './enums'

export const isTesting = process.env.NODE_ENV === 'test'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

export const systemLanguage: LanguageValues = LanguageValues.EN
