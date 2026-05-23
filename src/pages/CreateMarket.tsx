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
  image: 'Event Image',
  imageHint: 'Click to upload image',
  category: 'Category',
  categories: ['Crypto', 'Sports', 'Tech', 'Politics', 'Others'],
  resolution: 'Result Resolution',
  resolutionOptions: ['Oracle', 'Creator Input', 'DAO Vote'],
  resolutionDesc: {
    oracle: 'Automatically resolved by trusted oracle feed',
    creator: 'Market creator manually inputs the result',
    dao: 'PAULO token holders vote to determine outcome',
  },
  cap: 'Betting Cap (USDC)',
  capPlaceholder: 'Max total bets allowed',
  settlement: 'Settlement Time',
  sourceUrl: 'Result Source URL',
  sourceUrlPlaceholder: 'https://official-source.com/result',
  rules: 'Rules',
  rulesPlaceholder: 'Describe participation rules...',
  context: 'Context',
  contextPlaceholder: 'Event background and context...',
  tip: 'Creating a market requires staking PAULO tokens. You will earn 50% of all trading fees forever.',
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
  image: '事件图片',
  imageHint: '点击上传图片',
  category: '分类',
  categories: ['加密货币', '体育', '科技', '政治', '其他'],
  resolution: '结果产生方式',
  resolutionOptions: ['预言机', '创建者输入', 'DAO 投票'],
  resolutionDesc: {
    oracle: '由可信预言机自动判定的结果',
    creator: '由市场创建者手动输入结果',
    dao: 'PAULO 代币持有者投票决定结果',
  },
  cap: '竞猜筹码上限 (USDC)',
  capPlaceholder: '所有下注总金额上限',
  settlement: '结算时间',
  sourceUrl: '结果来源链接',
  sourceUrlPlaceholder: 'https://官方来源.com/结果',
  rules: '规则设定',
  rulesPlaceholder: '描述参与规则...',
  context: '事件背景 (Context)',
  contextPlaceholder: '事件背景说明...',
  tip: '创建市场需要质押 PAULO 代币。您将永久获得该市场 50% 的交易手续费。',
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
    image: '',
    categoryIndex: 0,
    resolutionIndex: 0,
    cap: '',
    settlementDatetime: '',
    sourceUrl: '',
    rules: '',
    context: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const validate = () => {
    if (!form.title || !form.settlementDatetime || !form.sourceUrl) {
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
      <div style={{ fontSize: 20, fontWeight: 800, color: '#111827', marginBottom: 20 }}>
        {texts.title}
      </div>

      {/* 事件图片 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.image}
        </label>
        {form.image ? (
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
            <img src={form.image} alt="event" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
            <button
              onClick={() => setForm({ ...form, image: '' })}
              style={{
                position: 'absolute', top: 8, right: 8,
                width: 28, height: 28, borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
                border: 'none', cursor: 'pointer', fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >✕</button>
          </div>
        ) : (
          <div
            onClick={() => setForm({ ...form, image: 'https://placehold.co/600x200/111827/ffffff?text=Event+Image' })}
            style={{
              width: '100%', height: 120,
              borderRadius: 12, border: '2px dashed #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#9ca3af', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.15s ease',
              backgroundColor: '#f9fafb',
            }}
          >
            📷 {texts.imageHint}
          </div>
        )}
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
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.category}
        </label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {texts.categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setForm({ ...form, categoryIndex: idx })}
              style={{
                padding: '8px 16px', borderRadius: 10,
                border: form.categoryIndex === idx ? '2px solid #111827' : '1px solid #e5e7eb',
                backgroundColor: form.categoryIndex === idx ? '#111827' : 'transparent',
                color: form.categoryIndex === idx ? '#ffffff' : '#6b7280',
                fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.15s ease',
              }}
            >{cat}</button>
          ))}
        </div>
      </div>

      {/* 结果产生方式 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.resolution}
        </label>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          {texts.resolutionOptions.map((opt, idx) => {
            const selected = form.resolutionIndex === idx;
            const key = ['oracle', 'creator', 'dao'][idx] as keyof typeof texts.resolutionDesc;
            return (
              <div
                key={idx}
                onClick={() => setForm({ ...form, resolutionIndex: idx })}
                style={{
                  flex: 1, padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
                  border: selected ? '2px solid #111827' : '1px solid #e5e7eb',
                  backgroundColor: selected ? '#f9fafb' : '#ffffff',
                  transition: 'all 0.15s ease',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: selected ? '#111827' : '#374151' }}>
                  {opt}
                </div>
                <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                  {texts.resolutionDesc[key]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 竞猜筹码上限 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.cap}
        </label>
        <input
          type="number"
          style={inputStyle}
          placeholder={texts.capPlaceholder}
          value={form.cap}
          onChange={e => setForm({ ...form, cap: e.target.value })}
        />
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

      {/* 规则设定 */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.rules}
        </label>
        <textarea
          style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          placeholder={texts.rulesPlaceholder}
          value={form.rules}
          onChange={e => setForm({ ...form, rules: e.target.value })}
        />
      </div>

      {/* Context */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
          {texts.context}
        </label>
        <textarea
          style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
          placeholder={texts.contextPlaceholder}
          value={form.context}
          onChange={e => setForm({ ...form, context: e.target.value })}
        />
      </div>

      {/* 提示信息 */}
      <div style={{
        backgroundColor: '#f9fafb', borderRadius: 12, padding: '14px 16px', marginBottom: 20,
      }}>
        <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.6, textAlign: 'left' }}>
          {texts.tip}
        </p>
      </div>

      {/* 状态消息 */}
      {msg && (
        <p style={{
          textAlign: 'center', fontSize: 14, fontWeight: 600,
          color: msg.includes('success') || msg.includes('成功') ? '#16a34a' : '#ef4444',
          marginBottom: 16,
        }}>{msg}</p>
      )}

      {/* 提交按钮 */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{
          width: '100%', padding: '16px 0', borderRadius: 12,
          backgroundColor: isSubmitting ? '#9ca3af' : '#111827',
          color: '#ffffff', fontSize: 16, fontWeight: 700, border: 'none',
          cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s ease',
        }}
      >
        {isSubmitting ? texts.processing : texts.submit}
      </button>
    </div>
  );
};

export default CreateMarket;
