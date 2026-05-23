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
  { id: 2, question: 'ETH above $5000 before June?', side: 'YES', entryProbability: 32, currentProbability: 37, principal: 100, pnl: 15.6, deadline: Date.now()/1000+86400*5, status: 'active', canCloseEarly: true },
  { id: 7, question: 'Bayern Munich wins Bundesliga 2025/26?', side: 'YES', entryProbability: 72, currentProbability: 78, principal: 200, pnl: 12.3, deadline: Date.now()/1000+86400*45, status: 'active', canCloseEarly: true },
  { id: 1, question: 'Trump out as President by May 31?', side: 'NO', entryProbability: 25, currentProbability: 0, principal: 50, pnl: 50, deadline: Date.now()/1000-86400*2, status: 'pending_claim', canCloseEarly: false },
  { id: 13, question: 'AI passes Turing test publicly in 2026?', side: 'NO', entryProbability: 94, currentProbability: 0, principal: 300, pnl: -250, deadline: Date.now()/1000-86400*10, status: 'settled', canCloseEarly: false },
];

const mockPositionsZh: PositionItem[] = [
  { id: 2, question: 'ETH在6月前突破5000美元？', side: 'YES', entryProbability: 32, currentProbability: 37, principal: 100, pnl: 15.6, deadline: Date.now()/1000+86400*5, status: 'active', canCloseEarly: true },
  { id: 7, question: '拜仁慕尼黑拿下25/26赛季德甲冠军？', side: 'YES', entryProbability: 72, currentProbability: 78, principal: 200, pnl: 12.3, deadline: Date.now()/1000+86400*45, status: 'active', canCloseEarly: true },
  { id: 1, question: '特朗普在5月31日前卸任总统？', side: 'NO', entryProbability: 25, currentProbability: 0, principal: 50, pnl: 50, deadline: Date.now()/1000-86400*2, status: 'pending_claim', canCloseEarly: false },
  { id: 13, question: 'AI在2026年公开通过图灵测试？', side: 'NO', entryProbability: 94, currentProbability: 0, principal: 300, pnl: -250, deadline: Date.now()/1000-86400*10, status: 'settled', canCloseEarly: false },
];

const t = (lang: 'en' | 'zh') => lang === 'en' ? {
  title: 'My',
  avatarHint: 'Click to change avatar',
  nicknameHint: 'Click to edit nickname',
  save: 'Save',
  cancel: 'Cancel',
  address: 'Address',
  totalAssets: 'Total Assets',
  totalPnL: 'Total PnL',
  positionCount: 'Positions',
  tabActive: 'Active',
  tabSettled: 'Settled',
  tabPending: 'To Claim',
  entryPrice: 'Entry',
  currentPrice: 'Current',
  pnlLabel: 'PnL',
  btnClaim: 'Claim',
  btnClose: 'Sell',
  btnArbitrate: 'Request Arbitration',
  sideYes: 'YES',
  sideNo: 'NO',
  noPositions: 'No positions',
  notConnected: 'Please connect wallet',
} : {
  title: '我的',
  avatarHint: '点击更换头像',
  nicknameHint: '点击编辑昵称',
  save: '保存',
  cancel: '取消',
  address: '地址',
  totalAssets: '总资产',
  totalPnL: '累计收益',
  positionCount: '持仓',
  tabActive: '进行中',
  tabSettled: '已结算',
  tabPending: '待兑付',
  entryPrice: '入场',
  currentPrice: '当前',
  pnlLabel: '盈亏',
  btnClaim: '领取',
  btnClose: '出售',
  btnArbitrate: '申请仲裁',
  sideYes: 'YES',
  sideNo: 'NO',
  noPositions: '暂无持仓',
  notConnected: '请连接钱包',
};

const AVATARS = ['🐋', '🐂', '🛡️', '🔍', '📊', '🎰', '📰', '🥊', '👑', '💎', '🚀', '🐲', '⚡', '🌊', '🔥', '❄️', '🦊', '🐺', '🦉', '🦈'];

const Profile: React.FC<PageProps> = ({ lang, walletConnected = true }) => {
  const texts = t(lang);
  const positions = lang === 'zh' ? mockPositionsZh : mockPositionsEn;
  const [activeTab, setActiveTab] = useState<'active' | 'settled' | 'pending_claim'>('active');

  // 用户信息
  const [avatar, setAvatar] = useState('🐋');
  const [nickname, setNickname] = useState('CryptoWhale');
  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState(nickname);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const totalAssets = positions.reduce((sum, p) => sum + p.principal + p.pnl, 0).toFixed(2);
  const totalPnL = positions.reduce((sum, p) => sum + p.pnl, 0).toFixed(2);
  const filteredPositions = positions.filter(p => p.status === activeTab);

  const handleSaveNickname = () => {
    if (nicknameDraft.trim()) {
      setNickname(nicknameDraft.trim());
    }
    setEditingNickname(false);
  };

  if (!walletConnected) {
    return (
      <div className="page-container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 24 }}>🔐</div>
        <p style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{texts.notConnected}</p>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingTop: 8, textAlign: 'left' }}>
      {/* 用户信息区 — 头像 + 昵称 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 20,
      }}>
        {/* 头像 */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#f3f4f6',
              border: '2px solid #e5e7eb',
              fontSize: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              padding: 0,
            }}
            title={texts.avatarHint}
          >
            {avatar}
          </button>
          <span style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: '#111827',
            color: '#fff',
            fontSize: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #fff',
          }}>✎</span>
        </div>

        {/* 昵称 + 地址 */}
        <div style={{ flex: 1 }}>
          {editingNickname ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
              <input
                autoFocus
                value={nicknameDraft}
                onChange={e => setNicknameDraft(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSaveNickname(); if (e.key === 'Escape') setEditingNickname(false); }}
                style={{
                  padding: '6px 10px',
                  borderRadius: 8,
                  border: '1px solid #111827',
                  fontSize: 16,
                  fontWeight: 700,
                  outline: 'none',
                  width: 160,
                }}
              />
              <button onClick={handleSaveNickname} style={{
                padding: '6px 12px', borderRadius: 8, border: 'none',
                backgroundColor: '#111827', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              }}>{texts.save}</button>
              <button onClick={() => setEditingNickname(false)} style={{
                padding: '6px 12px', borderRadius: 8, border: '1px solid #e5e7eb',
                backgroundColor: '#fff', color: '#6b7280', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}>{texts.cancel}</button>
            </div>
          ) : (
            <div
              onClick={() => { setNicknameDraft(nickname); setEditingNickname(true); }}
              style={{ fontSize: 18, fontWeight: 700, color: '#111827', cursor: 'pointer', marginBottom: 2 }}
              title={texts.nicknameHint}
            >
              {nickname} <span style={{ fontSize: 12, color: '#9ca3af' }}>✎</span>
            </div>
          )}
          <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' }}>
            {texts.address}: 0x7a9f...3b2c
          </div>
        </div>
      </div>

      {/* 头像选择器 */}
      {showAvatarPicker && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 20,
          padding: 12,
          backgroundColor: '#f9fafb',
          borderRadius: 12,
        }}>
          {AVATARS.map((a, i) => (
            <button
              key={i}
              onClick={() => { setAvatar(a); setShowAvatarPicker(false); }}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                backgroundColor: avatar === a ? '#111827' : '#f3f4f6',
                border: avatar === a ? '2px solid #111827' : '2px solid transparent',
                fontSize: 16, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: 0,
              }}
            >{a}</button>
          ))}
        </div>
      )}

      {/* 资产概览 */}
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 16,
      }}>
        {[
          { label: texts.totalAssets, value: `$${totalAssets}`, color: '#111827' },
          { label: texts.totalPnL, value: `${Number(totalPnL)>=0?'+':''}$${totalPnL}`, color: Number(totalPnL)>=0?'#10b981':'#ef4444' },
          { label: texts.positionCount, value: String(positions.length), color: '#111827' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1, backgroundColor: '#f9fafb', borderRadius: 12,
            padding: '14px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6, fontWeight: 600 }}>{stat.label}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Tab 切换 */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: 16,
      }}>
        {(['active', 'settled', 'pending_claim'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              flex: 1,
              padding: '10px 0',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: 14,
              fontWeight: activeTab === key ? 700 : 500,
              color: activeTab === key ? '#111827' : '#9ca3af',
              cursor: 'pointer',
              borderBottom: activeTab === key ? '2px solid #111827' : '2px solid transparent',
              transition: 'all 0.15s ease',
            }}
          >
            {key === 'active' ? texts.tabActive : key === 'settled' ? texts.tabSettled : texts.tabPending}
          </button>
        ))}
      </div>

      {/* 持仓列表 */}
      <div style={{ width: '100%', overflow: 'hidden' }}>
        {filteredPositions.map((pos) => (
          <div
            key={pos.id}
            style={{
              backgroundColor: '#f9fafb',
              borderRadius: 12,
              padding: '14px 16px',
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ flex: 1, paddingRight: 12, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 6px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {pos.question}
                </p>
                <span style={{
                  display: 'inline-block', padding: '2px 8px', borderRadius: 6,
                  fontSize: 11, fontWeight: 700,
                  backgroundColor: pos.side==='YES'?'#dcfce7':'#fee2e2',
                  color: pos.side==='YES'?'#166534':'#991b1b',
                }}>{pos.side==='YES'?texts.sideYes:texts.sideNo}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 16, fontWeight: 900, margin: 0, color: pos.pnl>=0?'#10b981':'#ef4444' }}>
                  {pos.pnl>=0?'+':''}${pos.pnl.toFixed(2)}
                </p>
                <p style={{ fontSize: 11, color: '#9ca3af', margin: 0 }}>{texts.pnlLabel}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <div style={{ flex:1, textAlign:'center', backgroundColor:'#f9fafb', borderRadius:8, padding:'8px 4px' }}>
                <div style={{ fontSize:10, color:'#9ca3af', marginBottom:2 }}>{texts.entryPrice}</div>
                <div style={{ fontSize:13, fontWeight:700 }}>{pos.entryProbability}%</div>
              </div>
              <div style={{ flex:1, textAlign:'center', backgroundColor:'#f9fafb', borderRadius:8, padding:'8px 4px' }}>
                <div style={{ fontSize:10, color:'#9ca3af', marginBottom:2 }}>{texts.currentPrice}</div>
                <div style={{ fontSize:13, fontWeight:700 }}>{pos.currentProbability}%</div>
              </div>
              <div style={{ flex:1, textAlign:'center', backgroundColor:'#f9fafb', borderRadius:8, padding:'8px 4px' }}>
                <div style={{ fontSize:10, color:'#9ca3af', marginBottom:2 }}>Principal</div>
                <div style={{ fontSize:13, fontWeight:700 }}>${pos.principal}</div>
              </div>
            </div>
            {(pos.canCloseEarly || pos.status==='pending_claim' || pos.status==='settled') && (
              <div style={{ display: 'flex', gap: 8 }}>
                {pos.canCloseEarly && (
                  <button style={{
                    flex:1, padding:'10px 0', borderRadius:8, border:'1px solid #e5e7eb',
                    backgroundColor:'#fff', color:'#374151', fontSize:13, fontWeight:600, cursor:'pointer',
                  }}>{texts.btnClose}</button>
                )}
                {pos.status==='pending_claim' && (
                  <button style={{
                    flex:1, padding:'10px 0', borderRadius:8, border:'none',
                    backgroundColor:'#111827', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer',
                  }}>{texts.btnClaim}</button>
                )}
                {pos.status==='settled' && (
                  <button style={{
                    flex:1, padding:'10px 0', borderRadius:8, border:'1px solid #f59e0b',
                    backgroundColor:'#fffbeb', color:'#92400e', fontSize:13, fontWeight:700, cursor:'pointer',
                  }}>{texts.btnArbitrate}</button>
                )}
              </div>
            )}
          </div>
        ))}
        {filteredPositions.length===0 && (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📭</div>
            <p style={{ fontSize:14, color:'#9ca3af' }}>{texts.noPositions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
