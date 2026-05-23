import React, { useState } from 'react';

interface PageProps {
  lang: 'en' | 'zh';
  walletConnected?: boolean;
}

const t = (lang: 'en' | 'zh') => lang === 'en' ? {
  title: 'Create Market',
  notConnected: 'Please connect wallet first',
  question: 'Market Question',
  questionPlaceholder: 'Will ETH exceed $10000 by end of 2026?',
  category: 'Category',
  categories: ['Crypto', 'Sports', 'Tech', 'Politics', 'Others'],
  settlement: 'Settlement Time',
  sourceUrl: 'Result Source URL',
  sourceUrlPlaceholder: 'https://official-source.com/result',
  liquidity: 'Initial Liquidity (USDC)',
  liquidityPlaceholder: 'Min 100 USDC',
  tip: 'Creating a market requires staking PAULO tokens. You will earn 50% of all trading fees on this market forever.',
  tip2: 'All markets must comply with local laws. Illegal markets will be removed and stake forfeited.',
  submit: 'Create Market',
  processing: 'Creating...',
  success: 'Market created!',
  errorRequired: 'Please fill all required fields',
  errorUrl: 'Invalid URL format',
  errorTime: 'Settlement time must be at least 24h from now',
} : {
  title: '创建市场',
  notConnected: '请先连接钱包',
  question: '市场问题',
  questionPlaceholder: 'ETH 是否会在 2026 年底前突破 $10000？',
  category: '分类',
  categories: ['加密货币', '体育', '科技', '政治', '其他'],
  settlement: '结算时间',
  sourceUrl: '结果来源链接',
  sourceUrlPlaceholder: 'https://官方来源.com/结果',
  liquidity: '初始流动性 (USDC)',
  liquidityPlaceholder: '最少 100 USDC',
  tip: '创建市场需要质押 PAULO 代币。您将永久获得该市场 50% 的交易手续费。',
  tip2: '所有市场必须遵守当地法律。违规市场将被下架并没收质押金。',
  submit: '创建市场',
  processing: '创建中...',
  success: '市场创建成功！',
  errorRequired: '请填写所有必填项',
  errorUrl: '链接格式不正确',
  errorTime: '结算时间必须距现在至少 24 小时',
};

const CreateMarket: React.FC<PageProps> = ({ lang, walletConnected = true }) => {
  const texts = t(lang);
  const [form, setForm] = useState({
    title: '',
    categoryIndex: 0,
    settlementDatetime: '',
    sourceUrl: '',
    initialLiquidity: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const validate = () => {
    if (!form.title || !form.settlementDatetime || !form.sourceUrl || !form.initialLiquidity) {
      setMsg(texts.errorRequired);
      return false;
    }
    if (!/^https?:\/\//.test(form.sourceUrl)) {
      setMsg(texts.errorUrl);
      return false;
    }
    const settleTs = new Date(form.settlementDatetime).getTime() / 1000;
    if (settleTs < Date.now() / 1000 + 86400) {
      setMsg(texts.errorTime);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setMsg('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setMsg(texts.success);
    }, 3000);
  };

  if (!walletConnected) {
    return (
      <div className="page-container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 24 }}>🔌</div>
        <p style={{ fontSize: 18, fontWeight: 700 }}>{texts.notConnected}</p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    fontSize: 15,
    outline: 'none',
    color: '#111827',
    backgroundColor: '#ffffff',
  };

  return (
    <div className="page-container" style={{ paddingTop: 8, textAlign: 'left' }}>
      {/* 页面标题 — 简洁 */
      }<div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 20 }}>
        {texts.title}
      </div>

      {/* 市场问题 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.question}
        </label>
        <input
          style={inputStyle}
          placeholder={texts.questionPlaceholder}
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
      </div>

      {/* 分类标签 */}
      <div style={{ marginBottom: 16, textAlign: 'left' }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.category}
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {texts.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setForm({ ...form, categoryIndex: idx })}
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                border: form.categoryIndex === idx ? '2px solid #111827' : '1px solid #e5e7eb',
                backgroundColor: form.categoryIndex === idx ? '#111827' : 'transparent',
                color: form.categoryIndex === idx ? '#ffffff' : '#6b7280',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 结算时间 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.settlement}
        </label>
        <input
          type="datetime-local"
          style={inputStyle}
          value={form.settlementDatetime}
          onChange={e => setForm({ ...form, settlementDatetime: e.target.value })}
        />
      </div>

      {/* 来源链接 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.sourceUrl}
        </label>
        <input
          style={inputStyle}
          placeholder={texts.sourceUrlPlaceholder}
          value={form.sourceUrl}
          onChange={e => setForm({ ...form, sourceUrl: e.target.value })}
        />
      </div>

      {/* 初始流动性 */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.liquidity}
        </label>
        <input
          type="number"
          style={inputStyle}
          placeholder={texts.liquidityPlaceholder}
          value={form.initialLiquidity}
          onChange={e => setForm({ ...form, initialLiquidity: e.target.value })}
        />
      </div>

      {/* 提示信息 */}
      <div style={{
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: '14px 16px',
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 8px 0', lineHeight: 1.6, textAlign: 'left' }}>
          {texts.tip}
        </p>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.6, textAlign: 'left' }}>
          {texts.tip2}
        </p>
      </div>

      {/* 状态消息 */}
      {msg && (
        <p style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 600,
          color: msg.includes('success') || msg.includes('成功') ? '#16a34a' : '#ef4444',
          marginBottom: 16,
        }}>{msg}</p>
      )}

      {/* 提交按钮 */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '16px 0',
          borderRadius: 12,
          backgroundColor: isSubmitting ? '#9ca3af' : '#111827',
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 700,
          border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s ease',
        }}
      >
        {isSubmitting ? texts.processing : texts.submit}
      </button>
    </div>
  );
};

export default CreateMarket;
