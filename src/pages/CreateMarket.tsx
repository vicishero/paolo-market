import React, { useState } from 'react';
interface PageProps {
  lang: 'en' | 'zh';
  walletConnected?: boolean;
}

const locales = {
  en: {
    pageTitle: 'Create Market',
    notConnected: 'Please connect wallet first',
    marketTitleLabel: 'Market Question',
    marketTitlePlaceholder: 'Will ETH exceed $10000 by end of 2026? (YES/NO only)',
    categoryLabel: 'Category',
    categoryOpts: ['Crypto', 'Sports', 'Tech', 'Politics', 'Others'],
    settlementTimeLabel: 'Settlement Time',
    sourceUrlLabel: 'Result Source URL',
    sourceUrlPlaceholder: 'https://reliable-official-source.com/event-result',
    initialLiquidityLabel: 'Initial Liquidity (USDC)',
    initialLiquidityPlaceholder: 'Min 100 USDC',
    tip1: '⚠️ Creating market requires staking PAULO tokens, you will earn 50% of transaction fees on this market forever.',
    tip2: '⚠️ All markets must follow local laws, illegal markets will be taken down with penalty staked.',
    submitBtn: 'Create & Stake',
    processingText: 'Creating transaction...',
    successText: 'Market created successfully!',
    errorTitleRequired: 'Please fill all required fields',
    errorUrlInvalid: 'Please input valid http/https URL',
    errorTimeTooEarly: 'Settlement time must be at least 24h later than now',
  },
  zh: {
    pageTitle: '创建预测市场',
    notConnected: '请先连接钱包',
    marketTitleLabel: '市场问题标题',
    marketTitlePlaceholder: 'ETH是否会在2026年底前突破10000美元？（二选一YES/NO问题）',
    categoryLabel: '分类标签',
    categoryOpts: ['加密货币', '体育赛事', '科技', '政治', '其他'],
    settlementTimeLabel: '结算时间',
    sourceUrlLabel: '结果来源链接',
    sourceUrlPlaceholder: 'https://权威官方信息来源.com/事件结果',
    initialLiquidityLabel: '初始流动性注入 (USDC)',
    initialLiquidityPlaceholder: '最低100 USDC',
    tip1: '⚠️ 创建市场需要质押PAULO代币，你将永久获得该市场50%的交易手续费分成收益。',
    tip2: '⚠️ 所有市场必须遵守当地法律法规，违规市场将被下架并扣除惩罚性质押金。',
    submitBtn: '提交创建并质押',
    processingText: '交易上链中...',
    successText: '市场创建成功！',
    errorTitleRequired: '请填写所有必填字段',
    errorUrlInvalid: '请输入合法的http/https链接',
    errorTimeTooEarly: '结算时间必须至少晚于当前时间24小时',
  },
};

const CreateMarket: React.FC<PageProps> = ({ lang, walletConnected = true }) => {
  const t = locales[lang];
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
      setMsg(t.errorTitleRequired);
      return false;
    }
    if (!/^https?:\/\//.test(form.sourceUrl)) {
      setMsg(t.errorUrlInvalid);
      return false;
    }
    const settleTs = new Date(form.settlementDatetime).getTime() / 1000;
    if (settleTs < Date.now()/1000 + 86400) {
      setMsg(t.errorTimeTooEarly);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setMsg('');
    setIsSubmitting(true);
    // 模拟链上交易流程
    setTimeout(() => {
      setIsSubmitting(false);
      setMsg(t.successText);
    }, 3000);
  };

  if (!walletConnected) {
    return (
      <div className="page-container" style={{ paddingTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 24 }}>🔌</div>
        <p style={{ fontSize: 18, fontWeight: 700 }}>{t.notConnected}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{t.pageTitle}</h1>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        marginBottom: 20,
      }}>
        {/* 标题输入 */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#222' }}>{t.marketTitleLabel}</label>
          <input
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 15,
              outline: 'none',
            }}
            placeholder={t.marketTitlePlaceholder}
            value={form.title}
            onChange={e => setForm({...form, title: e.target.value})}
          />
        </div>

        {/* 分类选择 */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#222' }}>{t.categoryLabel}</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {t.categoryOpts.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => setForm({...form, categoryIndex: idx})}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: form.categoryIndex === idx ? 700 : 500,
                  backgroundColor: form.categoryIndex === idx ? '#ff4d4f' : '#f3f4f6',
                  color: form.categoryIndex === idx ? 'white' : '#374151',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* 结算时间 */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#222' }}>{t.settlementTimeLabel}</label>
          <input
            type="datetime-local"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 15,
              outline: 'none',
            }}
            value={form.settlementDatetime}
            onChange={e => setForm({...form, settlementDatetime: e.target.value})}
          />
        </div>

        {/* 结果来源链接 */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#222' }}>{t.sourceUrlLabel}</label>
          <input
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 15,
              outline: 'none',
            }}
            placeholder={t.sourceUrlPlaceholder}
            value={form.sourceUrl}
            onChange={e => setForm({...form, sourceUrl: e.target.value})}
          />
        </div>

        {/* 初始流动性 */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#222' }}>{t.initialLiquidityLabel}</label>
          <input
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              fontSize: 15,
              outline: 'none',
            }}
            type="number"
            placeholder={t.initialLiquidityPlaceholder}
            value={form.initialLiquidity}
            onChange={e => setForm({...form, initialLiquidity: e.target.value})}
          />
        </div>

        {/* 提示区域 */}
        <div style={{ backgroundColor: '#fffbeb', borderRadius: 10, padding: 14, marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#92400e', margin: '0 0 10px 0', lineHeight: 1.5 }}>{t.tip1}</p>
          <p style={{ fontSize: 13, color: '#92400e', margin: 0, lineHeight: 1.5 }}>{t.tip2}</p>
        </div>

        {/* 错误/成功提示 */}
        {msg && (
          <p style={{
            textAlign: 'center',
            color: msg.includes('success') || msg.includes('成功') ? '#10b981' : '#ef4444',
            fontWeight: 600,
            marginBottom: 16,
          }}>{msg}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '15px 0',
            borderRadius: 12,
            backgroundColor: '#ff4d4f',
            color: 'white',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? t.processingText : t.submitBtn}
        </button>
      </div>
    </div>
  );
};

export default CreateMarket;
