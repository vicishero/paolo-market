import React from 'react';
interface PageProps {
  lang: 'en' | 'zh';
}
// 竞猜市场数据类型定义
interface MarketItem {
  id: number;
  avatarEmoji: string;
  question: string;
  probability: number;
  volume: string;
  maxVolume: string; // 新增：交易最大值
  deadline: number; // 新增：Unix时间戳（秒）
  isBookmarked: boolean;
  categoryId: number; // 0=热门 1=世界杯2026 2=德甲 3=意甲
}

const mockMarketsEn: MarketItem[] = [
  {
    id: 1,
    avatarEmoji: '🇺🇸',
    question: 'Trump out as President by May 31?',
    probability: 0.8,
    volume: '$2M Vol.',
    maxVolume: '$10M',
    deadline: Date.now() / 1000 + 86400 * 12,
    isBookmarked: false,
    categoryId: 0,
  },
  {
    id: 2,
    avatarEmoji: '🎮',
    question: 'ETH above $5000 before June?',
    probability: 37,
    volume: '$12.4M Vol.',
    maxVolume: '$50M',
    deadline: Date.now() / 1000 + 86400 * 5,
    isBookmarked: true,
    categoryId: 0,
  },
  {
    id: 3,
    avatarEmoji: '🚀',
    question: 'SpaceX Starship lands humans on Mars by 2030?',
    probability: 12,
    volume: '$4.8M Vol.',
    maxVolume: '$100M',
    deadline: Date.now() / 1000 + 86400 * 1800,
    isBookmarked: false,
    categoryId: 0,
  },
  {
    id: 4,
    avatarEmoji: '⚽',
    question: 'World Cup 2026 winner is Brazil?',
    probability: 22,
    volume: '$7.1M Vol.',
    maxVolume: '$80M',
    deadline: Date.now() / 1000 + 86400 * 380,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 5,
    avatarEmoji: '🇦🇷',
    question: 'Argentina defends World Cup 2026 title?',
    probability: 16,
    volume: '$5.4M Vol.',
    maxVolume: '$75M',
    deadline: Date.now() / 1000 + 86400 * 385,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 6,
    avatarEmoji: '🇩🇪',
    question: 'Germany wins 2026 World Cup host tournament?',
    probability: 11,
    volume: '$4.2M Vol.',
    maxVolume: '$70M',
    deadline: Date.now() / 1000 + 86400 * 390,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 7,
    avatarEmoji: '🏟️',
    question: 'Bayern Munich wins Bundesliga 2025/26?',
    probability: 78,
    volume: '$3.2M Vol.',
    maxVolume: '$25M',
    deadline: Date.now() / 1000 + 86400 * 45,
    isBookmarked: true,
    categoryId: 2,
  },
  {
    id: 8,
    avatarEmoji: '🦅',
    question: 'Leverkusen defends Bundesliga title this season?',
    probability: 42,
    volume: '$2.8M Vol.',
    maxVolume: '$22M',
    deadline: Date.now() / 1000 + 86400 * 38,
    isBookmarked: false,
    categoryId: 2,
  },
  {
    id: 9,
    avatarEmoji: '⚫',
    question: 'Borussia Dortmund top 2 in Bundesliga?',
    probability: 55,
    volume: '$1.9M Vol.',
    maxVolume: '$18M',
    deadline: Date.now() / 1000 + 86400 * 32,
    isBookmarked: false,
    categoryId: 2,
  },
  {
    id: 10,
    avatarEmoji: '🍝',
    question: 'Inter Milan wins Serie A 2025/26?',
    probability: 64,
    volume: '$2.7M Vol.',
    maxVolume: '$20M',
    deadline: Date.now() / 1000 + 86400 * 42,
    isBookmarked: false,
    categoryId: 3,
  },
  {
    id: 11,
    avatarEmoji: '🟦',
    question: 'Napoli back to top 3 in Serie A?',
    probability: 31,
    volume: '$1.5M Vol.',
    maxVolume: '$12M',
    deadline: Date.now() / 1000 + 86400 * 36,
    isBookmarked: true,
    categoryId: 3,
  },
  {
    id: 12,
    avatarEmoji: '🏆',
    question: 'AC Milan qualify for Champions League?',
    probability: 47,
    volume: '$2.1M Vol.',
    maxVolume: '$16M',
    deadline: Date.now() / 1000 + 86400 * 29,
    isBookmarked: false,
    categoryId: 3,
  },
  {
    id: 13,
    avatarEmoji: '🤖',
    question: 'AI passes Turing test publicly in 2026?',
    probability: 4.5,
    volume: '$920K Vol.',
    maxVolume: '$15M',
    deadline: Date.now() / 1000 + 86400 * 220,
    isBookmarked: true,
    categoryId: 0,
  },
];
const mockMarketsZh: MarketItem[] = [
  {
    id: 1,
    avatarEmoji: '🇺🇸',
    question: '特朗普在5月31日前卸任总统？',
    probability: 0.8,
    volume: '$2M 交易量',
    maxVolume: '$10M',
    deadline: Date.now() / 1000 + 86400 * 12,
    isBookmarked: false,
    categoryId: 0,
  },
  {
    id: 2,
    avatarEmoji: '🎮',
    question: 'ETH在6月前突破5000美元？',
    probability: 37,
    volume: '$12.4M 交易量',
    maxVolume: '$50M',
    deadline: Date.now() / 1000 + 86400 * 5,
    isBookmarked: true,
    categoryId: 0,
  },
  {
    id: 3,
    avatarEmoji: '🚀',
    question: 'SpaceX星舰2030年前载人登火星？',
    probability: 12,
    volume: '$4.8M 交易量',
    maxVolume: '$100M',
    deadline: Date.now() / 1000 + 86400 * 1800,
    isBookmarked: false,
    categoryId: 0,
  },
  {
    id: 4,
    avatarEmoji: '⚽',
    question: '巴西赢得2026世界杯冠军？',
    probability: 22,
    volume: '$7.1M 交易量',
    maxVolume: '$80M',
    deadline: Date.now() / 1000 + 86400 * 380,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 5,
    avatarEmoji: '🇦🇷',
    question: '阿根廷卫冕2026世界杯冠军？',
    probability: 16,
    volume: '$5.4M 交易量',
    maxVolume: '$75M',
    deadline: Date.now() / 1000 + 86400 * 385,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 6,
    avatarEmoji: '🇩🇪',
    question: '东道主德国拿下2026世界杯冠军？',
    probability: 11,
    volume: '$4.2M 交易量',
    maxVolume: '$70M',
    deadline: Date.now() / 1000 + 86400 * 390,
    isBookmarked: false,
    categoryId: 1,
  },
  {
    id: 7,
    avatarEmoji: '🏟️',
    question: '拜仁慕尼黑拿下25/26赛季德甲冠军？',
    probability: 78,
    volume: '$3.2M 交易量',
    maxVolume: '$25M',
    deadline: Date.now() / 1000 + 86400 * 45,
    isBookmarked: true,
    categoryId: 2,
  },
  {
    id: 8,
    avatarEmoji: '🦅',
    question: '勒沃库森本赛季卫冕德甲冠军？',
    probability: 42,
    volume: '$2.8M 交易量',
    maxVolume: '$22M',
    deadline: Date.now() / 1000 + 86400 * 38,
    isBookmarked: false,
    categoryId: 2,
  },
  {
    id: 9,
    avatarEmoji: '⚫',
    question: '多特蒙德德甲最终排名前2？',
    probability: 55,
    volume: '$1.9M 交易量',
    maxVolume: '$18M',
    deadline: Date.now() / 1000 + 86400 * 32,
    isBookmarked: false,
    categoryId: 2,
  },
  {
    id: 10,
    avatarEmoji: '🍝',
    question: '国际米兰拿下25/26赛季意甲冠军？',
    probability: 64,
    volume: '$2.7M 交易量',
    maxVolume: '$20M',
    deadline: Date.now() / 1000 + 86400 * 42,
    isBookmarked: false,
    categoryId: 3,
  },
  {
    id: 11,
    avatarEmoji: '🟦',
    question: '那不勒斯意甲最终排名前三？',
    probability: 31,
    volume: '$1.5M 交易量',
    maxVolume: '$12M',
    deadline: Date.now() / 1000 + 86400 * 36,
    isBookmarked: true,
    categoryId: 3,
  },
  {
    id: 12,
    avatarEmoji: '🏆',
    question: 'AC米兰拿到欧冠资格？',
    probability: 47,
    volume: '$2.1M 交易量',
    maxVolume: '$16M',
    deadline: Date.now() / 1000 + 86400 * 29,
    isBookmarked: false,
    categoryId: 3,
  },
  {
    id: 13,
    avatarEmoji: '🤖',
    question: 'AI在2026年公开通过图灵测试？',
    probability: 4.5,
    volume: '$920K 交易量',
    maxVolume: '$15M',
    deadline: Date.now() / 1000 + 86400 * 220,
    isBookmarked: true,
    categoryId: 0,
  },
];

// 倒计时组件 — 天/时/分/秒 完整展示，左对齐无动画
function Countdown({ deadline, lang }: { deadline: number; lang: 'en' | 'zh' }) {
  const [remaining, setRemaining] = React.useState(0);
  React.useEffect(() => {
    const update = () => {
      const now = Date.now() / 1000;
      setRemaining(Math.max(0, deadline - now));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = Math.floor(remaining % 60);
  const label = lang === 'en' ? 'Ends in' : '剩余时间';

  return (
    <span style={{
      color: '#777',
      fontSize: 13,
      fontWeight: 500,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textAlign: 'left',
    }}>
      {label}:
      <span style={{
        marginLeft: 4,
        fontWeight: 600,
      }}>
        {days}D {hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    </span>
  );
}
const Home: React.FC<PageProps & { onMarketClick: (market: MarketItem) => void }> = ({ lang, onMarketClick }) => {
  const markets = lang === 'zh' ? mockMarketsZh : mockMarketsEn;
  const [bookmarkedIds, setBookmarkedIds] = React.useState<number[]>(
    markets.filter(m => m.isBookmarked).map(m => m.id)
  );
  const [activeTab, setActiveTab] = React.useState(0);

  const tabs = lang === 'en'
    ? ['Hot', 'World Cup 2026', 'Bundesliga', 'Serie A']
    : ['热门', '世界杯2026', '德甲', '意甲'];

  const toggleBookmark = (id: number) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // 按当前选中标签过滤卡片
  const filteredMarkets = markets.filter(m => m.categoryId === activeTab);

  return (
    <div className="page-container">
      {/* 一级横向菜单标签栏 — 极简现代风格 完全对齐参考截图效果 */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        padding: 6,
        marginBottom: 12,
        backgroundColor: '#ffffff',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              flexShrink: 0,
              padding: '10px 18px',
              borderRadius: 10,
              backgroundColor: idx === activeTab ? '#f0f0ff' : 'transparent',
              color: idx === activeTab ? '#2563eb' : '#6b7280',
              fontWeight: idx === activeTab ? 700 : 500,
              fontSize: 15,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              userSelect: 'none',
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* 竞猜卡片列表 — 只渲染选中标签下的卡片 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filteredMarkets.map((market) => (
          <div
            key={market.id}
            onClick={() => onMarketClick(market)}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 12,
              padding: 20,
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              transition: 'box-shadow 0.15s ease',
            }}
          >
            {/* 卡片头部 */}
            <div style={{ display: 'flex', gap: 14, marginBottom: 18, alignItems: 'flex-start' }}>
              {/* 头像 */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: '#f5f5f7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                {market.avatarEmoji}
              </div>
              {/* 问题文案 强制左对齐 */}
              <div style={{ flex: 1, paddingTop: 4, textAlign: 'left' }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#000000', lineHeight: 1.35, margin: 0, marginBottom: 12 }}>
                  {market.question}
                </p>
                {/* 资金池进度条 */}
                <div style={{ width: '100%', height: 8, backgroundColor: '#f3f4f6', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: '#dcfce7',
                      borderRadius: 999,
                      width: `${Math.min(100, Number(market.volume.replace(/[^0-9.]/g, '')) / Number(market.maxVolume.replace(/[^0-9.]/g, '')) * 100)}%`,
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: '#888' }}>
                  <span>{market.volume}</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{market.maxVolume}</span>
                </div>
              </div>
              {/* 饼状图概率指示器 — 淡薄荷绿Yes / 淡浅红No */}
              <div style={{ width: 80, height: 80, position: 'relative' }}>
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="35" fill="none" stroke="#fee2e2" strokeWidth="10" />
                  {(() => {
                    const percent = Math.min(market.probability, 100);
                    const circumference = 2 * Math.PI * 35;
                    const dashOffset = circumference * (1 - percent / 100);
                    return (
                      <circle
                        cx="40"
                        cy="40"
                        r="35"
                        fill="none"
                        stroke="#dcfce7"
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        transform="rotate(-90 40 40)"
                        strokeLinecap="round"
                      />
                    );
                  })()}
                </svg>
                {/* 概率数字居中 — 直接显示Yes比例 */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: '#000000' }}>
                    {market.probability < 1 ? '<1%' : `${market.probability}%`}
                  </div>
                </div>
              </div>
            </div>
            {/* Yes / No 按钮区域 */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <button
                style={{
                  flex: 1,
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  fontWeight: 800,
                  fontSize: 16,
                  border: 'none',
                  borderRadius: 14,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {lang === 'en' ? 'Yes' : '是'}
              </button>
              <button
                style={{
                  flex: 1,
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  fontWeight: 800,
                  fontSize: 16,
                  border: 'none',
                  borderRadius: 14,
                  padding: 14,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                {lang === 'en' ? 'No' : '否'}
              </button>
            </div>
            {/* 底部元数据栏 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* 倒计时 — 完全靠左对齐，无动画 */}
              <div style={{ flexShrink: 0 }}>
                <Countdown deadline={market.deadline} lang={lang} />
              </div>
              {/* 书签按钮 */}
              <button
                onClick={() => toggleBookmark(market.id)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 19,
                  color: bookmarkedIds.includes(market.id) ? '#ff4d4f' : '#999999',
                  transition: 'color 0.2s ease',
                  flexShrink: 0,
                }}
              >
                {bookmarkedIds.includes(market.id) ? '⭐' : '☆'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
