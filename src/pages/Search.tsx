import React, { useState } from 'react';
interface PageProps {
  lang: 'en' | 'zh';
}

const locales = {
  en: {
    searchPlaceholder: 'Search markets by keywords...',
    hotKeywords: ['Ethereum', 'World Cup 2026', 'Bundesliga', 'AI', 'Trump'],
    campaignEntryTitle: '🎁 Campaign Center',
    campaignEntryDesc: 'Check all available bonus rewards now',
    marketNotFound: 'No related markets found',
  },
  zh: {
    searchPlaceholder: '按关键词搜索预测市场...',
    hotKeywords: ['以太坊', '2026世界杯', '德甲联赛', '人工智能', '美国大选'],
    campaignEntryTitle: '🎁 活动中心',
    campaignEntryDesc: '查看所有当前可领取的奖励活动',
    marketNotFound: '未找到相关预测市场',
  },
};

const Search: React.FC<PageProps> = ({ lang }) => {
  const t = locales[lang];
  const [keyword, setKeyword] = useState('');

  return (
    <div className="page-container">
      <h1 className="page-title">{lang === 'en' ? 'Search' : '搜索'}</h1>

      <input
        style={{
          width: '100%',
          padding: '14px 18px',
          borderRadius: 14,
          border: '1px solid #e5e7eb',
          fontSize: 16,
          marginBottom: 24,
          outline: 'none',
        }}
        placeholder={t.searchPlaceholder}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />

      {/* 活动中心入口卡片 */}
      <div style={{
        width: '100%',
        borderRadius: 16,
        padding: 20,
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        marginBottom: 24,
        cursor: 'pointer',
      }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#92400e', marginBottom: 6 }}>
          {t.campaignEntryTitle}
        </h3>
        <p style={{ margin: 0, fontSize: 14, color: '#b45309' }}>
          {t.campaignEntryDesc}
        </p>
      </div>

      {/* 热门搜索关键词 */}
      <p style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 12 }}>
        {lang === 'en' ? 'Hot Keywords' : '热门搜索'}
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {t.hotKeywords.map((kw, idx) => (
          <div
            key={idx}
            onClick={() => setKeyword(kw)}
            style={{
              padding: '10px 18px',
              backgroundColor: '#f3f4f6',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            {kw}
          </div>
        ))}
      </div>

      {keyword && (
        <div style={{ marginTop: 40, textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ fontSize: 14, color: '#888' }}>{t.marketNotFound}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
