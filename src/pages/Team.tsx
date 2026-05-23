import React, { useState } from 'react';

interface PageProps {
  lang: 'en' | 'zh';
}

interface ReferralItem {
  avatar: string;
  nickname: string;
  amount: string;
  teamPerformance: string;
}

const mockReferrals: ReferralItem[] = [
  { avatar: '🐋', nickname: 'CryptoWhale', amount: '$245,800', teamPerformance: '$1.2M' },
  { avatar: '🐂', nickname: 'BullishMax', amount: '$184,200', teamPerformance: '$890K' },
  { avatar: '🛡️', nickname: 'RiskManager', amount: '$132,500', teamPerformance: '$650K' },
  { avatar: '🔍', nickname: 'AlphaSeeker', amount: '$98,400', teamPerformance: '$430K' },
  { avatar: '📊', nickname: 'ChartMaster', amount: '$76,100', teamPerformance: '$310K' },
  { avatar: '🎰', nickname: 'DegenTrader', amount: '$55,200', teamPerformance: '$180K' },
  { avatar: '📰', nickname: 'NewsBot', amount: '$41,800', teamPerformance: '$120K' },
  { avatar: '🥊', nickname: 'FOMOFighter', amount: '$33,600', teamPerformance: '$88K' },
  { avatar: '🐉', nickname: 'DragonTrader', amount: '$28,900', teamPerformance: '$72K' },
  { avatar: '🦊', nickname: 'FoxSniper', amount: '$24,300', teamPerformance: '$58K' },
  { avatar: '🐺', nickname: 'WolfPack', amount: '$19,800', teamPerformance: '$45K' },
  { avatar: '🦉', nickname: 'NightOwl', amount: '$15,400', teamPerformance: '$32K' },
  { avatar: '🦈', nickname: 'SharkTank', amount: '$11,200', teamPerformance: '$21K' },
  { avatar: '🐝', nickname: 'HoneyBadger', amount: '$7,800', teamPerformance: '$14K' },
];

const t = (lang: 'en' | 'zh') => lang === 'en' ? {
  title: 'Team',
  teamSize: 'Team Size',
  directReferrals: 'Direct Referrals',
  teamPerformance: 'Team Performance',
  inviteLink: 'Invite Link',
  copyLink: 'Copy',
  copied: 'Copied!',
  referralList: 'Direct Referral List',
  avatar: 'Avatar',
  nickname: 'Nickname',
  amount: 'Amount',
  perf: 'Team Perf',
  noReferrals: 'No referrals yet',
  prev: 'Prev',
  next: 'Next',
} : {
  title: '团队',
  teamSize: '团队人数',
  directReferrals: '直推人数',
  teamPerformance: '团队业绩',
  inviteLink: '邀请链接',
  copyLink: '复制',
  copied: '已复制!',
  referralList: '直推列表',
  avatar: '头像',
  nickname: '昵称',
  amount: '参与金额',
  perf: '团队业绩',
  noReferrals: '暂无直推',
  prev: '上一页',
  next: '下一页',
};

const Team: React.FC<PageProps> = ({ lang }) => {
  const texts = t(lang);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(mockReferrals.length / pageSize);
  const pagedReferrals = mockReferrals.slice((page - 1) * pageSize, page * pageSize);

  const handleCopy = () => {
    navigator.clipboard.writeText('https://paulomarket.com/invite/0x7a9f');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: '14px 12px',
    textAlign: 'center',
  };

  return (
    <div className="page-container" style={{ paddingTop: 8 }}>
      {/* 页面标题 */}
      <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 20 }}>
        {texts.title}
      </div>

      {/* 团队数据三列统计 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <div style={statStyle}>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6, fontWeight: 600 }}>{texts.teamSize}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>1,284</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6, fontWeight: 600 }}>{texts.directReferrals}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>47</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 6, fontWeight: 600 }}>{texts.teamPerformance}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#10b981' }}>$3.8M</div>
        </div>
      </div>

      {/* 邀请链接 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: '12px 16px',
        marginBottom: 24,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#374151', flexShrink: 0 }}>
          {texts.inviteLink}
        </span>
        <span style={{
          flex: 1,
          fontSize: 12,
          color: '#6b7280',
          fontFamily: 'monospace',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          https://paulomarket.com/invite/0x7a9f
        </span>
        <button
          onClick={handleCopy}
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            border: 'none',
            backgroundColor: copied ? '#dcfce7' : '#111827',
            color: copied ? '#16a34a' : '#ffffff',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0,
          }}
        >
          {copied ? texts.copied : texts.copyLink}
        </button>
      </div>

      {/* 直推列表标题 */}
      <div style={{
        fontSize: 15,
        fontWeight: 700,
        color: '#111827',
        marginBottom: 12,
      }}>
        {texts.referralList}
      </div>

      {/* 直推列表表头 */}
      <div style={{
        display: 'flex',
        padding: '8px 0',
        borderBottom: '1px solid #f3f4f6',
        marginBottom: 4,
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: 600,
      }}>
        <span style={{ width: 36 }}>#</span>
        <span style={{ flex: 1 }}>{texts.nickname}</span>
        <span style={{ width: 80, textAlign: 'right' }}>{texts.amount}</span>
        <span style={{ width: 80, textAlign: 'right' }}>{texts.perf}</span>
      </div>

      {/* 直推列表 */}
      {mockReferrals.length > 0 ? (
        pagedReferrals.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: idx < mockReferrals.length - 1 ? '1px solid #f9fafb' : 'none',
              fontSize: 14,
            }}
          >
            <span style={{ width: 36, color: '#9ca3af', fontWeight: 600 }}>{idx + 1}</span>
            <span style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#111827',
              fontWeight: 600,
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
                {item.avatar}
              </span>
              {item.nickname}
            </span>
            <span style={{ width: 80, textAlign: 'right', color: '#374151', fontWeight: 500 }}>
              {item.amount}
            </span>
            <span style={{ width: 80, textAlign: 'right', color: '#10b981', fontWeight: 600 }}>
              {item.teamPerformance}
            </span>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af', fontSize: 14 }}>
          {texts.noReferrals}
        </div>
      )}

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
          <span style={{
            fontSize: 13,
            color: '#6b7280',
            fontWeight: 600,
          }}>
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

export default Team;
