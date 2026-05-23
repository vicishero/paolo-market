import React, { useState } from 'react';

interface PageProps {
  lang: 'en' | 'zh';
}

interface RankUser {
  rank: number;
  address: string;
  avatar: string;
  nickname: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
}

const mockWeekRank: RankUser[] = [
  { rank: 1, address: '0xabcdef...1234', avatar: '👑', nickname: 'KingTrader', totalPnl: 28742.5, winRate: 78.2, totalTrades: 342 },
  { rank: 2, address: '0x98765...fedc', avatar: '🐋', nickname: 'CryptoWhale', totalPnl: 21021.3, winRate: 71.5, totalTrades: 278 },
  { rank: 3, address: '0x1a2b3...c4d5', avatar: '🦅', nickname: 'EagleEye', totalPnl: 15876.8, winRate: 69.3, totalTrades: 214 },
  { rank: 4, address: '0x6e7f8...g9h0', avatar: '🐂', nickname: 'BullishMax', totalPnl: 12452.1, winRate: 65.7, totalTrades: 192 },
  { rank: 5, address: '0xi9j0k...l1m2', avatar: '🔍', nickname: 'AlphaSeeker', totalPnl: 9876.4, winRate: 62.1, totalTrades: 167 },
  { rank: 6, address: '0xn3o4p...q5r6', avatar: '🛡️', nickname: 'RiskManager', totalPnl: 7654.2, winRate: 60.8, totalTrades: 143 },
  { rank: 7, address: '0xs7t8u...v9w0', avatar: '📊', nickname: 'ChartMaster', totalPnl: 6234.9, winRate: 58.7, totalTrades: 121 },
  { rank: 8, address: '0xw1x2y...z3a4', avatar: '🎰', nickname: 'DegenTrader', totalPnl: 5123.7, winRate: 57.2, totalTrades: 105 },
  { rank: 9, address: '0xa1b2c...d3e4', avatar: '🦊', nickname: 'FoxSniper', totalPnl: 4234.5, winRate: 55.1, totalTrades: 92 },
  { rank: 10, address: '0xf5g6h...i7j8', avatar: '🐺', nickname: 'WolfPack', totalPnl: 3654.2, winRate: 53.8, totalTrades: 78 },
  { rank: 11, address: '0xk9l0m...n1o2', avatar: '🦉', nickname: 'NightOwl', totalPnl: 3123.8, winRate: 51.4, totalTrades: 65 },
  { rank: 12, address: '0xp3q4r...s5t6', avatar: '🦈', nickname: 'SharkTank', totalPnl: 2678.1, winRate: 49.2, totalTrades: 54 },
  { rank: 13, address: '0xu7v8w...x9y0', avatar: '🐝', nickname: 'HoneyBadger', totalPnl: 2134.6, winRate: 47.3, totalTrades: 43 },
  { rank: 14, address: '0xz1a2b...c3d4', avatar: '🐉', nickname: 'DragonTrader', totalPnl: 1789.3, winRate: 45.1, totalTrades: 32 },
  { rank: 15, address: '0xe5f6g...h7i8', avatar: '⚔️', nickname: 'Swordfish', totalPnl: 1234.9, winRate: 42.8, totalTrades: 21 },
];

const mockTotalRank: RankUser[] = [
  { rank: 1, address: '0xlegacy...0001', avatar: '🏆', nickname: 'Legend', totalPnl: 327891.5, winRate: 82.4, totalTrades: 2341 },
  { rank: 2, address: '0xlegacy...0002', avatar: '💎', nickname: 'DiamondHands', totalPnl: 212456.7, winRate: 76.8, totalTrades: 1872 },
  { rank: 3, address: '0xlegacy...0003', avatar: '🚀', nickname: 'MoonShot', totalPnl: 187654.2, winRate: 72.1, totalTrades: 1563 },
  { rank: 4, address: '0xlegacy...0004', avatar: '🐲', nickname: 'DragonFire', totalPnl: 145678.9, winRate: 68.4, totalTrades: 1321 },
  { rank: 5, address: '0xlegacy...0005', avatar: '⚡', nickname: 'FlashCrash', totalPnl: 112345.6, winRate: 65.3, totalTrades: 1087 },
  { rank: 6, address: '0xlegacy...0006', avatar: '🌊', nickname: 'Tsunami', totalPnl: 98765.4, winRate: 63.2, totalTrades: 954 },
  { rank: 7, address: '0xlegacy...0007', avatar: '🔥', nickname: 'FireTrail', totalPnl: 76543.2, winRate: 60.1, totalTrades: 821 },
  { rank: 8, address: '0xlegacy...0008', avatar: '❄️', nickname: 'IceCold', totalPnl: 65432.1, winRate: 58.9, totalTrades: 743 },
  { rank: 9, address: '0xlegacy...0009', avatar: '🦅', nickname: 'SkyHigh', totalPnl: 54321.8, winRate: 56.7, totalTrades: 678 },
  { rank: 10, address: '0xlegacy...0010', avatar: '🦊', nickname: 'FoxSniper', totalPnl: 43210.5, winRate: 54.3, totalTrades: 592 },
  { rank: 11, address: '0xlegacy...0011', avatar: '🐺', nickname: 'WolfPack', totalPnl: 35789.2, winRate: 52.1, totalTrades: 478 },
  { rank: 12, address: '0xlegacy...0012', avatar: '🦈', nickname: 'SharkTank', totalPnl: 28901.4, winRate: 50.2, totalTrades: 412 },
  { rank: 13, address: '0xlegacy...0013', avatar: '🐉', nickname: 'DragonBorn', totalPnl: 21567.3, winRate: 48.5, totalTrades: 345 },
  { rank: 14, address: '0xlegacy...0014', avatar: '⭐', nickname: 'StarLord', totalPnl: 16789.9, winRate: 46.3, totalTrades: 267 },
  { rank: 15, address: '0xlegacy...0015', avatar: '🌙', nickname: 'MoonWalker', totalPnl: 12456.7, winRate: 43.8, totalTrades: 189 },
];

const t = (lang: 'en' | 'zh') => lang === 'en' ? {
  title: 'Leaderboard',
  week: 'Weekly',
  total: 'All Time',
  rank: '#',
  trader: 'Trader',
  pnl: 'Profit',
  winRate: 'Win Rate',
  trades: 'Trades',
  prev: 'Prev',
  next: 'Next',
} : {
  title: '排行榜',
  week: '本周',
  total: '总榜',
  rank: '#',
  trader: '交易者',
  pnl: '盈利',
  winRate: '胜率',
  trades: '场次',
  prev: '上一页',
  next: '下一页',
};

const Ranking: React.FC<PageProps> = ({ lang }) => {
  const texts = t(lang);
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const dataSource = activeTab === 0 ? mockWeekRank : mockTotalRank;
  const totalPages = Math.ceil(dataSource.length / pageSize);
  const pagedData = dataSource.slice((page - 1) * pageSize, page * pageSize);

  // 切换 tab 时重置页码
  const handleTabChange = (tab: 0 | 1) => {
    setActiveTab(tab);
    setPage(1);
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return '#f59e0b';
    if (rank === 2) return '#9ca3af';
    if (rank === 3) return '#92400e';
    return '#e5e7eb';
  };

  return (
    <div className="page-container" style={{ paddingTop: 8, textAlign: 'left', minWidth: 468 }}>
      {/* 标题 */}
      <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 16 }}>
        {texts.title}
      </div>

      {/* Tab 切换 */}
      <div style={{
        display: 'flex',
        width: '100%',
        overflow: 'hidden',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: 16,
      }}>
        {([0, 1] as const).map((idx) => (
          <button
            key={idx}
            onClick={() => handleTabChange(idx)}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: 14,
              fontWeight: activeTab === idx ? 700 : 500,
              color: activeTab === idx ? '#111827' : '#9ca3af',
              cursor: 'pointer',
              borderBottom: activeTab === idx ? '2px solid #111827' : '2px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            {idx === 0 ? texts.week : texts.total}
          </button>
        ))}
      </div>

      {/* 表头 */}
      <div style={{
        display: 'flex',
        padding: '8px 0',
        borderBottom: '1px solid #f3f4f6',
        marginBottom: 4,
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: 600,
        width: '100%',
      }}>
        <span style={{ width: 32, flexShrink: 0 }}>{texts.rank}</span>
        <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{texts.trader}</span>
        <span style={{ width: 55, flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{texts.winRate}</span>
        <span style={{ width: 45, flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{texts.trades}</span>
        <span style={{ width: 100, flexShrink: 0, textAlign: 'right', whiteSpace: 'nowrap' }}>{texts.pnl}</span>
      </div>

      {/* 排行榜列表 */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {pagedData.map((user) => (
          <div
            key={`${activeTab}-${user.rank}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: '1px solid #f9fafb',
            }}
          >
            {/* 排名 */}
            <span style={{ width: 32, flexShrink: 0 }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: getRankBg(user.rank),
                color: user.rank <= 3 ? '#fff' : '#6b7280',
                fontSize: 11,
                fontWeight: 800,
              }}>
                {user.rank}
              </span>
            </span>

            {/* 头像 + 昵称 */}
            <span style={{
              flex: 1,
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#111827',
              fontWeight: 600,
              fontSize: 14,
            }}>
              <span style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                flexShrink: 0,
              }}>
                {user.avatar}
              </span>
              {user.nickname}
            </span>

            {/* 胜率 */}
            <span style={{ width: 55, flexShrink: 0, textAlign: 'right', fontSize: 13, color: '#374151', fontWeight: 500 }}>
              {user.winRate}%
            </span>

            {/* 场次 */}
            <span style={{ width: 45, flexShrink: 0, textAlign: 'right', fontSize: 13, color: '#6b7280' }}>
              {user.totalTrades}
            </span>

            {/* 盈利 */}
            <span style={{
              width: 100,
              flexShrink: 0,
              textAlign: 'right',
              fontSize: 14,
              fontWeight: 700,
              color: user.totalPnl >= 0 ? '#10b981' : '#ef4444',
            }}>
              ${user.totalPnl.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* 翻页控件 */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginTop: 16,
        }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              backgroundColor: page === 1 ? '#f9fafb' : '#ffffff',
              color: page === 1 ? '#d1d5db' : '#374151',
              fontSize: 13,
              fontWeight: 600,
              cursor: page === 1 ? 'default' : 'pointer',
            }}
          >
            {texts.prev}
          </button>
          <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 600 }}>
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              padding: '8px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              backgroundColor: page === totalPages ? '#f9fafb' : '#ffffff',
              color: page === totalPages ? '#d1d5db' : '#374151',
              fontSize: 13,
              fontWeight: 600,
              cursor: page === totalPages ? 'default' : 'pointer',
            }}
          >
            {texts.next}
          </button>
        </div>
      )}
    </div>
  );
};

export default Ranking;
