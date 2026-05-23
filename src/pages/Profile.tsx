import React, { useState } from 'react';
interface PageProps {
  lang: 'en' | 'zh';
  walletConnected?: boolean;
}

interface PositionItem {
  id: number;
  question: string;
  side: 'YES' | 'NO';
  entryProbability: number;
  currentProbability: number;
  principal: number;
  pnl: number;
  deadline: number;
  status: 'active' | 'settled' | 'pending_claim';
  canCloseEarly: boolean;
}

const mockPositionsEn: PositionItem[] = [
  {
    id: 2,
    question: 'ETH above $5000 before June?',
    side: 'YES',
    entryProbability: 32,
    currentProbability: 37,
    principal: 100,
    pnl: 15.6,
    deadline: Date.now() / 1000 + 86400 * 5,
    status: 'active',
    canCloseEarly: true,
  },
  {
    id: 7,
    question: 'Bayern Munich wins Bundesliga 2025/26?',
    side: 'YES',
    entryProbability: 72,
    currentProbability: 78,
    principal: 200,
    pnl: 12.3,
    deadline: Date.now() / 1000 + 86400 * 45,
    status: 'active',
    canCloseEarly: true,
  },
  {
    id: 1,
    question: 'Trump out as President by May 31?',
    side: 'NO',
    entryProbability: 25,
    currentProbability: 0,
    principal: 50,
    pnl: 50,
    deadline: Date.now() / 1000 - 86400 * 2,
    status: 'pending_claim',
    canCloseEarly: false,
  },
  {
    id: 13,
    question: 'AI passes Turing test publicly in 2026?',
    side: 'NO',
    entryProbability: 94,
    currentProbability: 0,
    principal: 300,
    pnl: -250,
    deadline: Date.now() / 1000 - 86400 * 10,
    status: 'settled',
    canCloseEarly: false,
  },
];

const mockPositionsZh: PositionItem[] = [
  {
    id: 2,
    question: 'ETH在6月前突破5000美元？',
    side: 'YES',
    entryProbability: 32,
    currentProbability: 37,
    principal: 100,
    pnl: 15.6,
    deadline: Date.now() / 1000 + 86400 * 5,
    status: 'active',
    canCloseEarly: true,
  },
  {
    id: 7,
    question: '拜仁慕尼黑拿下25/26赛季德甲冠军？',
    side: 'YES',
    entryProbability: 72,
    currentProbability: 78,
    principal: 200,
    pnl: 12.3,
    deadline: Date.now() / 1000 + 86400 * 45,
    status: 'active',
    canCloseEarly: true,
  },
  {
    id: 1,
    question: '特朗普在5月31日前卸任总统？',
    side: 'NO',
    entryProbability: 25,
    currentProbability: 0,
    principal: 50,
    pnl: 50,
    deadline: Date.now() / 1000 - 86400 * 2,
    status: 'pending_claim',
    canCloseEarly: false,
  },
  {
    id: 13,
    question: 'AI在2026年公开通过图灵测试？',
    side: 'NO',
    entryProbability: 94,
    currentProbability: 0,
    principal: 300,
    pnl: -250,
    deadline: Date.now() / 1000 - 86400 * 10,
    status: 'settled',
    canCloseEarly: false,
  },
];

const locales = {
  en: {
    pageTitle: 'My Positions',
    notConnectedTitle: 'Please Connect Wallet',
    notConnectedDesc: 'Connect your wallet to view your positions and earnings',
    connectGuideBtn: 'Go to Connect',
    totalAssets: 'Total Assets',
    totalPnL: 'Total Earnings',
    positionCount: 'Positions',
    tabActive: 'Active',
    tabSettled: 'Settled',
    tabPendingClaim: 'To Claim',
    entryPrice: 'Entry Prob.',
    currentPrice: 'Current Prob.',
    pnlLabel: 'PnL',
    btnClaim: 'Claim Reward',
    btnCloseEarly: 'Close Early',
    sideYes: 'YES',
    sideNo: 'NO',
  },
  zh: {
    pageTitle: '我的持仓',
    notConnectedTitle: '请连接钱包',
    notConnectedDesc: '连接你的钱包以查看持仓和收益',
    connectGuideBtn: '去连接',
    totalAssets: '总资产',
    totalPnL: '累计收益',
    positionCount: '持仓数量',
    tabActive: '进行中',
    tabSettled: '已结算',
    tabPendingClaim: '待兑付',
    entryPrice: '入场概率',
    currentPrice: '当前概率',
    pnlLabel: '盈亏',
    btnClaim: '领取奖励',
    btnCloseEarly: '提前平仓',
    sideYes: '看涨 YES',
    sideNo: '看跌 NO',
  },
};

const Profile: React.FC<PageProps> = ({ lang, walletConnected = true }) => {
  const t = locales[lang];
  const positions = lang === 'zh' ? mockPositionsZh : mockPositionsEn;
  const [activeTab, setActiveTab] = useState<'active' | 'settled' | 'pending_claim'>('active');

  const totalAssets = positions.reduce((sum, p) => sum + p.principal + p.pnl, 0).toFixed(2);
  const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0).toFixed(2);

  const filteredPositions = positions.filter(p => p.status === activeTab);

  if (!walletConnected) {
    return (
      <div className="page-container" style={{ paddingTop: 40, textAlign: 'center' }}>
        <div style={{ padding: '60px 20px' }}>
          <div style={{ fontSize: 60, marginBottom: 24 }}>🔐</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: '#111' }}>{t.notConnectedTitle}</h2>
          <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>{t.notConnectedDesc}</p>
          <button style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: 12,
            backgroundColor: '#ff4d4f',
            color: 'white',
            fontWeight: 700,
            fontSize: 16,
            border: 'none',
          }}>{t.connectGuideBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{t.pageTitle}</h1>
      {/* 资产概览卡片 */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12,
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>{t.totalAssets}</p>
          <p style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>${totalAssets}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>{t.totalPnL}</p>
          <p style={{ fontSize: 20, fontWeight: 900, color: Number(totalPnL) >= 0 ? '#10b981' : '#ef4444' }}>
            {Number(totalPnL) >= 0 ? '+' : ''}${totalPnL}
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>{t.positionCount}</p>
          <p style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>{positions.length}</p>
        </div>
      </div>

      {/* 状态标签切换 */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        borderRadius: 12,
        backgroundColor: '#f3f4f6',
        padding: 4,
      }}>
        {(['active', 'settled', 'pending_claim'] as const).map((tabKey) => (
          <div
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px 0',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: activeTab === tabKey ? 700 : 500,
              backgroundColor: activeTab === tabKey ? '#fff' : 'transparent',
              color: activeTab === tabKey ? '#111' : '#777',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {tabKey === 'active' ? t.tabActive : tabKey === 'settled' ? t.tabSettled : t.tabPendingClaim}
          </div>
        ))}
      </div>

      {/* 持仓卡片列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filteredPositions.map((pos) => (
          <div key={pos.id} style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 18,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ flex: 1, paddingRight: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 600, margin: 0, marginBottom: 8, lineHeight: 1.4 }}>
                  {pos.question}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  backgroundColor: pos.side === 'YES' ? '#dcfce7' : '#fee2e2',
                  color: pos.side === 'YES' ? '#166534' : '#991b1b',
                }}>
                  {pos.side === 'YES' ? t.sideYes : t.sideNo}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 18, fontWeight: 900, margin: 0, color: pos.pnl >=0 ? '#10b981' : '#ef4444' }}>
                  {pos.pnl >=0 ? '+' : ''}${pos.pnl.toFixed(2)}
                </p>
                <p style={{ fontSize: 12, color: '#888' }}>{t.pnlLabel}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>{t.entryPrice}</p>
                <p style={{ fontSize: 15, fontWeight: 700 }}>{pos.entryProbability}%</p>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>{t.currentPrice}</p>
                <p style={{ fontSize: 15, fontWeight: 700 }}>{pos.currentProbability}%</p>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: 12, color: '#888', margin: 0, marginBottom: 4 }}>Principal</p>
                <p style={{ fontSize: 15, fontWeight: 700 }}>${pos.principal}</p>
              </div>
            </div>
            {/* 底部操作按钮 */}
            <div style={{ display: 'flex', gap: 10 }}>
              {pos.canCloseEarly && (
                <button style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 10,
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#374151',
                }}>{t.btnCloseEarly}</button>
              )}
              {pos.status === 'pending_claim' && (
                <button style={{
                  flex: 1,
                  padding: '12px 0',
                  borderRadius: 10,
                  backgroundColor: '#ff4d4f',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                }}>{t.btnClaim}</button>
              )}
            </div>
          </div>
        ))}
        {filteredPositions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <p style={{ fontSize: 14, color: '#888' }}>
              {lang === 'en' ? 'No positions found' : '暂无相关持仓'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
