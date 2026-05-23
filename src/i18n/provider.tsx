// PauloMarket 全局多语言状态 Provider
import { useState, useMemo, type ReactNode } from 'react'
import { I18nContext, translations, type LangCode } from './index'

export function I18nProvider({ children }: { children: ReactNode }) {
  // 默认语言为英文
  const [currentLang, setCurrentLang] = useState<LangCode>('en')

  const t = useMemo(() => {
    return translations[currentLang]
  }, [currentLang])

  return (
    <I18nContext.Provider value={{
      currentLang,
      setCurrentLang,
      t
    }}>
      {children}
    </I18nContext.Provider>
  )
}
