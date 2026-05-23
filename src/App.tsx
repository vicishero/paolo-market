import React, { useState, useContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { I18nContext, LangCode } from './i18n';
import './App.css';
// 页面组件
import Home from './pages/Home';
import Search from './pages/Search';
import Ranking from './pages/Ranking';
import Profile from './pages/Profile';
import CreateMarket from './pages/CreateMarket';
import MarketDetail from './pages/MarketDetail';

/* === SVG 图标组件 — 完全对齐 bazi_dapp 风格，主题色替换为 PauloMarket 红色系 === */
function HomeIcon({ active }: { active: boolean }) {
  const color = active ? '#ff4d4f' : '#b8add2';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
    </svg>
  );
}

function TeamIcon({ active }: { active: boolean }) {
  const color = active ? '#ff4d4f' : '#b8add2';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function RankingIcon({ active }: { active: boolean }) {
  const color = active ? '#ff4d4f' : '#b8add2';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V11a2 2 0 00-2-2h-2" />
      <path d="M6 9V7a6 6 0 0112 0v2" />
      <line x1="12" y1="13" x2="12.01" y2="13" />
    </svg>
  );
}

function CreateIcon({ active }: { active: boolean }) {
  const color = active ? '#ff4d4f' : '#b8add2';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  const color = active ? '#ff4d4f' : '#b8add2';
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

type PageType = 'home' | 'search' | 'ranking' | 'create' | 'profile' | 'detail';

// 市场数据类型 — 跨页面共享
interface MarketItem {
  id: number;
  avatarEmoji: string;
  question: string;
  probability: number;
  volume: string;
  maxVolume: string;
  deadline: number;
  isBookmarked: boolean;
  categoryId: number;
}

const NAV_CONFIGS = [
  { key: 'home', iconComponent: HomeIcon, labelKey: 'home' },
  { key: 'search', iconComponent: TeamIcon, labelKey: 'search' },
  { key: 'create', iconComponent: CreateIcon, labelKey: 'create' },
  { key: 'ranking', iconComponent: RankingIcon, labelKey: 'ranking' },
  { key: 'profile', iconComponent: ProfileIcon, labelKey: 'profile' },
];

function formatAddress(addr: `0x${string}` | undefined) {
  if (!addr) return ''
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedMarket, setSelectedMarket] = useState<MarketItem | null>(null);
  const [walletDropdownOpen, setWalletDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { currentLang, setCurrentLang, t } = useContext(I18nContext)
  const account = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  // 点击竞猜卡片进入详情页
  const handleMarketClick = (market: MarketItem) => {
    setSelectedMarket(market);
    setCurrentPage('detail');
  };

  // 从详情页返回首页
  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedMarket(null);
  };

  const locales = [
    { code: 'zh' as LangCode, name: '简体中文' },
    { code: 'en' as LangCode, name: 'English' },
  ]

  const currentLangInfo = locales.find(l => l.code === currentLang)!

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home lang={currentLang} onMarketClick={handleMarketClick} />;
      case 'search': return <Search lang={currentLang} />;
      case 'ranking': return <Ranking lang={currentLang} />;
      case 'create': return <CreateMarket lang={currentLang} walletConnected={account.isConnected} />;
      case 'profile': return <Profile lang={currentLang} walletConnected={account.isConnected} />;
      case 'detail': return selectedMarket ? (
        <MarketDetail lang={currentLang} market={selectedMarket} onBack={handleBackToHome} />
      ) : (
        <Home lang={currentLang} onMarketClick={handleMarketClick} />
      );
      default: return <Home lang={currentLang} onMarketClick={handleMarketClick} />;
    }
  };

  return (
    <div className="app-wrapper">
      {/* 顶部固定标题栏 — 完全对齐PAULO Bridge钱包风格 */}
      <header className="top-header">
        <div className="header-inner">
          <div className="header-left">
            <div className="logo-icon">P</div>
            <span className="site-name">{t.siteTitle}</span>
          </div>
          <div className="header-right">
            {/* PAULO Bridge同款多语言下拉菜单 */}
            <div className="relative" style={{ position: 'relative' }}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                style={{
                  padding: '8px 12px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  borderRadius: 8,
                  color: '#6b7280',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                🌐 <span className="hidden sm:inline">{currentLangInfo.name}</span>
              </button>

              {langDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 44,
                  width: 140,
                  borderRadius: 12,
                  overflow: 'hidden',
                  zIndex: 9999,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  {locales.map(locale => (
                    <button
                      key={locale.code}
                      onClick={() => { setCurrentLang(locale.code); setLangDropdownOpen(false) }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        textAlign: 'left',
                        color: locale.code === currentLang ? '#111827' : '#71717a',
                        fontSize: 14,
                        fontWeight: locale.code === currentLang ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {locale.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* PAULO Bridge同款原生钱包连接实现 */}
            <div className="relative" style={{ position: 'relative' }}>
              {!account.isConnected ? (
                <button 
                  onClick={() => connect({ connector: injected() })}
                  style={{ 
                    backgroundColor: '#22c55e', 
                    color: 'white', 
                    borderRadius: '3px',
                    padding: '8px 16px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {t.connectWallet}
                </button>
              ) : (
                <button 
                  onClick={() => setWalletDropdownOpen(!walletDropdownOpen)}
                  style={{ 
                    backgroundColor: '#f3f4f6', 
                    color: '#111827', 
                    borderRadius: 8,
                    padding: '8px 14px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <span style={{ 
                    width: 24, height: 24, borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #6b7280, #374151)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                  }} />
                  <span className="hidden sm:inline">{formatAddress(account.address)}</span>
                </button>
              )}

              {walletDropdownOpen && account.isConnected && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 48,
                  width: 200,
                  borderRadius: 12,
                  overflow: 'hidden',
                  zIndex: 9999,
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <button 
                    onClick={() => { disconnect(); setWalletDropdownOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      textAlign: 'left',
                      color: '#ef4444',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    🚪 {t.disconnect}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* 中间内容区域 */}
      <main className="content-area">
        {renderPage()}
      </main>
      {/* Bazi App 风格底部导航栏 — 1:1对齐bazi_dapp实现 */}
      <nav className="bottom-nav">
        {NAV_CONFIGS.map((nav) => {
          const isActive = nav.key === currentPage;
          const IconComponent = nav.iconComponent;
          return (
            <div
              key={nav.key}
              className="nav-item"
              onClick={() => setCurrentPage(nav.key as PageType)}
            >
              <div className={`icon-wrapper ${isActive ? 'icon-wrapper-active' : ''}`}>
                <IconComponent active={isActive} />
              </div>
              <span className={`nav-label ${isActive ? 'nav-label-active' : 'nav-label-inactive'}`}>
                {t[nav.labelKey as keyof typeof t]}
              </span>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default App;
