import React, { useState } from 'react';
interface PageProps {
  lang: 'en' | 'zh';
}

interface RankUser {
  rank: number;
  address: string;
  totalPnl: number;
  winRate: number;
  totalTrades: number;
}

const mockWeekRank: RankUser[] = [
  { rank: 1, address: '0xabcdef...1234', totalPnl: 28742.5, winRate: 78.2, totalTrades: 342 },
  { rank: 2, address: '0x98765...fedc', totalPnl: 21021.3, winRate: 71.5, totalTrades: 278 },
  { rank: 3, address: '0x1a2b3...c4d5', totalPnl: 15876.8, winRate: 69.3, totalTrades: 214 },
  { rank: 4, address: '0x6e7f8...g9h0', totalPnl: 12452.1, winRate: 65.7, totalTrades: 192 },
  { rank: 5, address: '0xi9j0k...l1m2', totalPnl: 9876.4, winRate: 62.1, totalTrades: 167 },
  { rank: 6, address: '0xn3o4p...q5r6', totalPnl: 7654.2, winRate: 60.8, totalTrades: 143 },
  { rank: 7, address: '0xs7t8u...v9w0', totalPnl: 6234.9, winRate: 58.7, totalTrades: 121 },
  { rank: 8, address: '0xw1x2y...z3a4', totalPnl: 5123.7, winRate: 57.2, totalTrades: 105 },
];

const mockTotalRank: RankUser[] = [
  { rank: 1, address: '0xtotal0...0001', totalPnl: 327891.5, winRate: 82.4, totalTrades: 2341 },
  { rank: 2, address: '0xtotal0...0002', totalPnl: 212456.7, winRate: 76.8, totalTrades: 1872 },
  { rank: 3, address: '0xtotal0...0003', totalPnl: 187654.2, winRate: 72.1, totalTrades: 1563 },
  ...mockWeekRank.slice(3).map((u, idx) => ({
    ...u,
    rank: idx + 4,
    totalPnl: u.totalPnl * 10,
    totalTrades: u.totalTrades * 8,
  })),
];

const locales = {
  en: {
    pageTitle: 'Leaderboard',
    tabWeek: 'This Week',
    tabTotal: 'All Time',
    tabVolume: 'TVL Ranking',
    colRank: '#',
    colAddress: 'Wallet Address',
    colPnl: 'Profit',
    colWinRate: 'Win Rate',
    colTrades: 'Trades',
  },
  zh: {
    pageTitle: '排行榜',
    tabWeek: '本周盈利',
    tabTotal: '历史总榜',
    tabVolume: '持仓大户',
    colRank: '排名',
    colAddress: '钱包地址',
    colPnl: '盈利金额',
    colWinRate: '胜率',
    colTrades: '交易场次',
  },
};

const Ranking: React.FC<PageProps> = ({ lang }) => {
  const t = locales[lang];
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  const dataSource = activeTab === 0 ? mockWeekRank : mockTotalRank;

  const getRankColor = (rank: number) => {
    if (rank === 1) return '#f59e0b'; // 金色
    if (rank === 2) return '#9ca3af'; // 银色
    if (rank === 3) return '#92400e'; // 铜色
    return '#666';
  };

  return (
    <div className="page-container">
      <h1 className="page-title">{t.pageTitle}</h1>

      {/* Tab切换 */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        padding: 4,
      }}>
        {[t.tabWeek, t.tabTotal, t.tabVolume].map((tabName, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(idx as 0 | 1 | 2)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px 0',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: activeTab === idx ? 700 : 500,
              backgroundColor: activeTab === idx ? '#fff' : 'transparent',
              color: activeTab === idx ? '#111' : '#777',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tabName}
          </div>
        ))}
      </div>

      {/* 排行榜列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {dataSource.map((user) => (
          <div key={`${activeTab}-${user.rank}`} style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: '16px 18px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: getRankColor(user.rank),
              color: 'white',
              fontWeight: 900,
              fontSize: 15,
              flexShrink: 0,
            }}>
              {user.rank}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, margin: 0, marginBottom: 3, color: '#111' }}>
                {user.address}
              </p>
              <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
                {user.colWinRate}: {user.winRate}% | {t.colTrades}: {user.totalTrades}
              </p>
            </div>
            <div style={{
              textAlign: 'right',
              fontWeight: 900,
              fontSize: 17,
              color: '#10b981',
            }}>
              +${user.totalPnl.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ranking;
