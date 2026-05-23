import React from 'react';
interface PageProps {
  lang: 'en' | 'zh';
}

interface ActivityItem {
  id: number;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
  rewardTextEn: string;
  rewardTextZh: string;
  progress: number;
  isClaimable: boolean;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    titleEn: 'New User First Trade Free Gas',
    titleZh: '新用户首单免Gas费',
    descEn: 'Your first prediction trade will 100% return you Gas fee in USDC after settlement',
    descZh: '你的第一笔预测交易结算后将100%返还Gas费等值USDC奖励',
    rewardTextEn: 'Max 10 USDC Cashback',
    rewardTextZh: '最高返还10 USDC',
    progress: 0,
    isClaimable: false,
  },
  {
    id: 2,
    titleEn: 'Trading Mining 2x Boost',
    titleZh: '交易挖矿2倍积分',
    descEn: 'During promotion period every 1 USD trading volume double your PAULO token mining speed',
    descZh: '活动期间每1美元交易量获得双倍PAULO代币挖矿奖励',
    rewardTextEn: '+100% Extra Reward',
    rewardTextZh: '额外100%奖励加成',
    progress: 68,
    isClaimable: true,
  },
  {
    id: 3,
    titleEn: 'Referral 10% Lifetime Rebate',
    titleZh: '邀请好友永久返佣',
    descEn: 'Each friend you invite will automatically give you 10% rebate from ALL their transaction fees forever',
    descZh: '每邀请一位好友，永久获得该好友所有交易手续费的10%返佣',
    rewardTextEn: 'Unlimited Referrals',
    rewardTextZh: '邀请无上限',
    progress: 100,
    isClaimable: false,
  },
  {
    id: 4,
    titleEn: 'World Cup 2026 Special Event',
    titleZh: '2026世界杯专属激励',
    descEn: 'All World Cup related prediction markets offer 0 trading fees during tournament period',
    descZh: '赛事期间所有世界杯相关预测市场0交易手续费',
    rewardTextEn: '0 Fee on Soccer Markets',
    rewardTextZh: '足球市场零手续费',
    progress: 42,
    isClaimable: false,
  },
];

const locales = {
  en: {
    pageTitle: 'Campaign Center',
    pageSubtitle: 'Complete tasks to get bonus rewards',
    claimBtn: 'Claim Now',
    claimedBtn: 'Claimed',
  },
  zh: {
    pageTitle: '活动中心',
    pageSubtitle: '完成任务获得额外奖励',
    claimBtn: '立即领取',
    claimedBtn: '已领取',
  },
};

const CampaignCenter: React.FC<PageProps> = ({ lang }) => {
  const t = locales[lang];
  const [claimedIds, setClaimedIds] = React.useState<number[]>([]);

  return (
    <div className="page-container">
      <h1 className="page-title">{t.pageTitle}</h1>
      <p className="page-subtitle">{t.pageSubtitle}</p>

      {/* 顶部大Banner */}
      <div style={{
        width: '100%',
        height: 160,
        borderRadius: 16,
        background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        color: 'white',
        fontSize: 26,
        fontWeight: 900,
      }}>
        🎉 {lang === 'en' ? '2026 World Cup Incentive Week!' : '2026世界杯激励周开启!'}
      </div>

      {/* 活动卡片列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {activities.map((act) => {
          const isClaimed = claimedIds.includes(act.id);
          return (
            <div key={act.id} style={{
              backgroundColor: '#fff',
              borderRadius: 14,
              padding: 20,
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ flex: 1, paddingRight: 12 }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111', marginBottom: 8 }}>
                    {lang === 'en' ? act.titleEn : act.titleZh}
                  </h3>
                  <p style={{ fontSize: 13, color: '#666', margin: 0, lineHeight: 1.5 }}>
                    {lang === 'en' ? act.descEn : act.descZh}
                  </p>
                </div>
                <div style={{
                  flexShrink: 0,
                  padding: '8px 12px',
                  backgroundColor: '#fef3c7',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#92400e',
                }}>
                  {lang === 'en' ? act.rewardTextEn : act.rewardTextZh}
                </div>
              </div>
              {/* 进度条 */}
              <div style={{ width: '100%', height: 8, backgroundColor: '#f3f4f6', borderRadius: 999, overflow: 'hidden', marginBottom: 10 }}>
                <div style={{
                  width: `${act.progress}%`,
                  height: '100%',
                  backgroundColor: '#ff4d4f',
                  borderRadius: 999,
                  transition: 'width 0.5s ease',
                }} />
              </div>
              {/* 领取按钮 */}
              {act.isClaimable && !isClaimed ? (
                <button
                  onClick={() => setClaimedIds(prev => [...prev, act.id])}
                  style={{
                    width: '100%',
                    padding: '12px 0',
                    borderRadius: 10,
                    backgroundColor: '#10b981',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: 15,
                    border: 'none',
                  }}
                >{t.claimBtn}</button>
              ) : (
                <div style={{
                  width: '100%',
                  padding: '12px 0',
                  textAlign: 'center',
                  borderRadius: 10,
                  backgroundColor: '#f3f4f6',
                  color: '#888',
                  fontWeight: 600,
                  fontSize: 15,
                }}>
                  {isClaimed ? t.claimedBtn : `${act.progress}% ${lang === 'en' ? 'Completed' : '已完成'}`}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignCenter;
