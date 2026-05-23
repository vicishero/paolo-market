// PauloMarket 全局多语言翻译配置
import { createContext } from 'react'

export interface I18nTranslations {
  siteTitle: string
  connectWallet: string
  disconnect: string
  home: string
  search: string
  ranking: string
  create: string
  profile: string
  predictionMarkets: string
  predictionMarketsSubtitle: string
  hot: string
  worldCup2026: string
  bundesliga: string
  serieA: string
  volume: string
  endsIn: string
  yes: string
  no: string
  copyright: string
  polygon: string
  pending: string
  completed: string
  marketDetail: string
  createMarketTitle: string
}

export const translations: Record<'zh' | 'en', I18nTranslations> = {
  en: {
    siteTitle: 'PauloMarket',
    connectWallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    home: 'Home',
    search: 'Search',
    ranking: 'Rank',
    create: 'Create',
    profile: 'My',
    predictionMarkets: 'Prediction Markets',
    predictionMarketsSubtitle: 'Trade on the outcome of future events',
    hot: 'Hot',
    worldCup2026: 'World Cup 2026',
    bundesliga: 'Bundesliga',
    serieA: 'Serie A',
    volume: 'Vol.',
    endsIn: 'Ends in',
    yes: 'Yes',
    no: 'No',
    copyright: '© 2025 PauloMarket. All rights reserved.',
    polygon: 'Polygon',
    pending: 'Pending',
    completed: 'Completed',
    marketDetail: 'Market Detail',
    createMarketTitle: 'Create New Market',
  },
  zh: {
    siteTitle: 'PauloMarket',
    connectWallet: '链接钱包',
    disconnect: '断开连接',
    home: '首页',
    search: '搜索',
    ranking: '排行',
    create: '创建',
    profile: '我的',
    predictionMarkets: '预测市场',
    predictionMarketsSubtitle: '对未来事件结果进行交易',
    hot: '热门',
    worldCup2026: '世界杯2026',
    bundesliga: '德甲',
    serieA: '意甲',
    volume: '交易量',
    endsIn: '剩余时间',
    yes: 'Yes',
    no: 'No',
    copyright: '© 2025 PauloMarket 保留所有权利。',
    polygon: 'Polygon 网络',
    pending: '处理中',
    completed: '已完成',
    marketDetail: '市场详情',
    createMarketTitle: '创建新市场',
  }
}

export type LangCode = 'zh' | 'en'

// I18n Context 类型定义
export interface I18nContextType {
  currentLang: LangCode
  setCurrentLang: (lang: LangCode) => void
  t: I18nTranslations
}

export const I18nContext = createContext<I18nContextType>({
  currentLang: 'en',
  setCurrentLang: () => {},
  t: translations.en,
})
