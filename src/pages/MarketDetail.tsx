import React, { useState } from 'react';
import BetModal from '../components/BetModal';

/* ===== 类型定义 ===== */
interface MarketItem {
  id: number;
  avatarEmoji: string;
  question: string;
  probability: number;
  volume: string;
  maxVolume: string;
  deadline: number;
  isBookmarked: boolean;
  categoryId: number;
}

interface CommentItem {
  id: number;
  author: string;
  avatar: string;
  text: string;
  time: string;
  replies: CommentItem[];
}

interface PositionItem {
  address: string;
  amount: string;
  sharePct: string;
}

interface ActivityItem {
  id: number;
  type: 'buy_yes' | 'buy_no' | 'sell_yes' | 'sell_no' | 'claim';
  address: string;
  avatar: string;
  nickname: string;
  amount: string;
  price: string;
  time: string;
  timestamp: number;
}

interface PageProps {
  lang: 'en' | 'zh';
  market: MarketItem;
  onBack: () => void;
}
/* ===== 分类名称映射 ===== */
const categoryNames: Record<number, { en: string; zh: string }> = {
  0: { en: 'Hot', zh: '热门' },
  1: { en: 'World Cup 2026', zh: '世界杯2026' },
  2: { en: 'Bundesliga', zh: '德甲' },
  3: { en: 'Serie A', zh: '意甲' },
};

interface CommentItem {
  id: number;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  time: string;
  replies: CommentItem[];
}

/* ===== Mock 评论数据 — X平台风格 + @handle ===== */
const mockComments: CommentItem[] = [
  {
    id: 1,
    author: 'CryptoWhale',
    handle: '@cryptowhale',
    avatar: '🐋',
    text: 'I think this is way overpriced. The fundamentals don\'t support this probability at all. Waiting for a better entry.',
    time: '2h',
    replies: [
      {
        id: 11,
        author: 'BullishMax',
        handle: '@bullishmax',
        avatar: '🐂',
        text: 'Disagree. The momentum is strong and we\'re seeing institutional inflows.',
        time: '1h',
        replies: [],
      },
      {
        id: 12,
        author: 'DataNerd',
        handle: '@datanerd',
        avatar: '🤓',
        text: 'On-chain data actually shows accumulation. I\'m leaning yes on this one.',
        time: '45m',
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: 'AlphaSeeker',
    handle: '@alphaseeker',
    avatar: '🔍',
    text: 'Been tracking this market for weeks. The smart money is quietly positioning. I\'m going heavy on YES.',
    time: '5h',
    replies: [],
  },
  {
    id: 3,
    author: 'RiskManager',
    handle: '@riskmanager',
    avatar: '🛡️',
    text: 'Remember to size your positions appropriately. Even high probability events can surprise.',
    time: '8h',
    replies: [
      {
        id: 31,
        author: 'DegenTrader',
        handle: '@degentrader',
        avatar: '🎰',
        text: 'Sir, this is a prediction market. We go all in or go home 😂',
        time: '7h',
        replies: [],
      },
    ],
  },
  {
    id: 4,
    author: 'ChartMaster',
    handle: '@chartmaster',
    avatar: '📊',
    text: 'Technical analysis shows strong resistance at current levels. I\'m waiting for a breakout confirmation before entering.',
    time: '12h',
    replies: [],
  },
  {
    id: 5,
    author: 'NewsBot',
    handle: '@newsbot',
    avatar: '📰',
    text: 'Breaking: Major regulatory update expected this week that could impact this market significantly. Stay tuned.',
    time: '1d',
    replies: [
      {
        id: 51,
        author: 'FOMOFighter',
        handle: '@fomofighter',
        avatar: '🥊',
        text: 'Source? Can you share the link?',
        time: '23h',
        replies: [],
      },
    ],
  },
];

/* ===== Mock 持仓数据 ===== */
const mockYesPositions: PositionItem[] = [
  { address: '0x7a9f...3b2c', amount: '$245,800', sharePct: '12.3%' },
  { address: '0x3e1d...8a4f', amount: '$184,200', sharePct: '9.2%' },
  { address: '0x9c2b...1f7e', amount: '$132,500', sharePct: '6.6%' },
  { address: '0x4f8a...6d3c', amount: '$98,400', sharePct: '4.9%' },
  { address: '0x1b5e...2a9d', amount: '$76,100', sharePct: '3.8%' },
];

const mockNoPositions: PositionItem[] = [
  { address: '0x2d7c...8e1a', amount: '$198,300', sharePct: '9.9%' },
  { address: '0x5a3f...4b6e', amount: '$156,700', sharePct: '7.8%' },
  { address: '0x8e9d...3c2b', amount: '$112,400', sharePct: '5.6%' },
  { address: '0x6c1a...7f5d', amount: '$89,200', sharePct: '4.5%' },
  { address: '0x0f4b...9e8c', amount: '$54,600', sharePct: '2.7%' },
];

/* ===== Mock 动态数据 ===== */
const mockActivities: ActivityItem[] = [
  { id: 1, type: 'buy_yes', address: '0x7a9f...3b2c', avatar: '🐋', nickname: 'CryptoWhale', amount: '$45,200', price: '$0.78', time: '2 min ago', timestamp: Date.now() - 120000 },
  { id: 2, type: 'sell_no', address: '0x5a3f...4b6e', avatar: '🐂', nickname: 'BullishMax', amount: '$32,100', price: '$0.19', time: '5 min ago', timestamp: Date.now() - 300000 },
  { id: 3, type: 'buy_no', address: '0x8e9d...3c2b', avatar: '🛡️', nickname: 'RiskManager', amount: '$28,400', price: '$0.22', time: '12 min ago', timestamp: Date.now() - 720000 },
  { id: 4, type: 'buy_yes', address: '0x3e1d...8a4f', avatar: '🔍', nickname: 'AlphaSeeker', amount: '$61,500', price: '$0.76', time: '18 min ago', timestamp: Date.now() - 1080000 },
  { id: 5, type: 'sell_yes', address: '0x9c2b...1f7e', avatar: '🤓', nickname: 'DataNerd', amount: '$18,700', price: '$0.80', time: '25 min ago', timestamp: Date.now() - 1500000 },
  { id: 6, type: 'buy_yes', address: '0x4f8a...6d3c', avatar: '🎰', nickname: 'DegenTrader', amount: '$55,000', price: '$0.74', time: '32 min ago', timestamp: Date.now() - 1920000 },
  { id: 7, type: 'buy_no', address: '0x2d7c...8e1a', avatar: '📊', nickname: 'ChartMaster', amount: '$41,200', price: '$0.21', time: '40 min ago', timestamp: Date.now() - 2400000 },
  { id: 8, type: 'claim', address: '0x6c1a...7f5d', avatar: '📰', nickname: 'NewsBot', amount: '$22,800', price: '$1.00', time: '1 hr ago', timestamp: Date.now() - 3600000 },
  { id: 9, type: 'buy_yes', address: '0x1b5e...2a9d', avatar: '🥊', nickname: 'FOMOFighter', amount: '$33,600', price: '$0.72', time: '1.5 hr ago', timestamp: Date.now() - 5400000 },
  { id: 10, type: 'sell_no', address: '0x0f4b...9e8c', avatar: '🦅', nickname: 'EagleEye', amount: '$15,400', price: '$0.25', time: '2 hr ago', timestamp: Date.now() - 7200000 },
];

/* ===== 子组件：评论项 — X(Twitter)平台风格 ===== */
const CommentItemView: React.FC<{
  comment: CommentItem;
  depth: number;
  lang: 'en' | 'zh';
  isLastChild: boolean;
  onReply: (id: number) => void;
  replyingTo: number | null;
  replyText: string;
  setReplyText: (text: string) => void;
  onSubmitReply: (parentId: number) => void;
}> = ({ comment, depth, lang, isLastChild, onReply, replyingTo, replyText, setReplyText, onSubmitReply }) => {
  const maxDepth = 3;

  return (
    <div style={{ position: 'relative' }}>
      {/* 嵌套回复的垂直连接线 — X风格thread line */}
      {depth > 0 && (
        <div style={{
          position: 'absolute',
          left: 19,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: '#cfd9de',
        }} />
      )}

      <div style={{
        display: 'flex',
        gap: 10,
        padding: '12px 0',
        position: 'relative',
      }}>
        {/* 圆形头像 — X风格 */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: '#f0f0f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          flexShrink: 0,
          zIndex: 1,
          overflow: 'hidden',
        }}>
          {comment.avatar}
        </div>

        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          {/* 用户名行 — 粗体名 + · 时间 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#0f1419',
              lineHeight: '20px',
            }}>
              {comment.author}
            </span>
            <span style={{ color: '#536471', fontSize: 14 }}>·</span>
            <span style={{
              fontSize: 14,
              color: '#536471',
              lineHeight: '20px',
            }}>
              {comment.time}
            </span>
          </div>

          {/* 评论文本 */}
          <p style={{
            fontSize: 15,
            color: '#0f1419',
            lineHeight: 1.5,
            margin: '4px 0 8px',
            wordBreak: 'break-word',
            textAlign: 'left',
          }}>
            {comment.text}
          </p>

          {/* 底部操作栏 — 居左排列 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            {/* Reply 按钮 */}
            <button
              onClick={() => onReply(comment.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: '#536471',
                fontSize: 13,
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: 999,
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#1d9bf0'; e.currentTarget.style.backgroundColor = '#1d9bf01a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#536471'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.24-.893 4.28-2.348 5.78l-7.726 7.726c-.39.39-.9.58-1.41.52-.51-.06-.92-.43-1.02-.94l-.58-3.47-4.08-.29c-1.9-.13-3.33-1.7-3.33-3.6V10zm8.005-6c-3.317 0-6.005 2.69-6.005 6v5.86c0 1.15.86 2.08 2.01 2.16l5.17.37c.38.03.68.29.75.65l.36 2.03 6.04-6.04c1.1-1.13 1.76-2.68 1.76-4.38 0-3.38-2.74-6.13-6.13-6.13H9.757z"/>
              </svg>
              <span>{comment.replies.length}</span>
            </button>

            {/* Like 按钮 */}
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              color: '#536471',
              fontSize: 13,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 999,
              transition: 'all 0.15s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#f91880'; e.currentTarget.style.backgroundColor = '#f918801a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#536471'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/>
              </svg>
              <span>{(comment.id * 7) % 100}</span>
            </button>
          </div>

          {/* 回复输入框 — X风格 */}
          {replyingTo === comment.id && (
            <div style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#f0f0f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                flexShrink: 0,
              }}>
                🧑
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13,
                  color: '#536471',
                  marginBottom: 6,
                }}>
                  {lang === 'en' ? 'Replying to' : '回复'} <span style={{ color: '#1d9bf0' }}>{comment.handle}</span>
                </div>
                <input
                  autoFocus
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && replyText.trim()) onSubmitReply(comment.id);
                    if (e.key === 'Escape') onReply(-1);
                  }}
                  placeholder={lang === 'en' ? 'Post your reply' : '发布回复'}
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    border: 'none',
                    borderBottom: '1px solid #eff3f4',
                    fontSize: 15,
                    outline: 'none',
                    color: '#0f1419',
                    backgroundColor: 'transparent',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 10 }}>
                  <button
                    onClick={() => onReply(-1)}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: 'transparent',
                      color: '#0f1419',
                      border: '1px solid #cfd9de',
                      borderRadius: 999,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {lang === 'en' ? 'Cancel' : '取消'}
                  </button>
                  <button
                    onClick={() => { if (replyText.trim()) onSubmitReply(comment.id); }}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: replyText.trim() ? '#1d9bf0' : '#8ecdf8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 999,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: replyText.trim() ? 'pointer' : 'default',
                    }}
                  >
                    {lang === 'en' ? 'Reply' : '回复'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 递归渲染子回复 */}
      {comment.replies.map((reply, idx) => (
        <div key={reply.id} style={{ marginLeft: 50 }}>
          <CommentItemView
            comment={reply}
            depth={depth + 1}
            lang={lang}
            isLastChild={idx === comment.replies.length - 1}
            onReply={onReply}
            replyingTo={replyingTo}
            replyText={replyText}
            setReplyText={setReplyText}
            onSubmitReply={onSubmitReply}
          />
        </div>
      ))}
    </div>
  );
};

/* ===== 主组件：市场详情页 ===== */
const MarketDetail: React.FC<PageProps> = ({ lang, market, onBack }) => {
  const [activeTab, setActiveTab] = useState<'comments' | 'positions' | 'activity'>('comments');
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [infoTab, setInfoTab] = useState<'rules' | 'context'>('rules');
  // 下注弹窗状态
  const [betModalVisible, setBetModalVisible] = useState(false);
  const [betSelectedSide, setBetSelectedSide] = useState<'yes' | 'no' | null>(null);

  // 评论回复状态
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReply = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyText('');
  };

  const handleSubmitReply = (_parentId: number) => {
    // 这里后续可扩展为实际提交回复逻辑
    setReplyingTo(null);
    setReplyText('');
  };

  const category = categoryNames[market.categoryId] || categoryNames[0];
  const days = Math.floor(Math.max(0, market.deadline - Date.now() / 1000) / 86400);
  const hours = Math.floor((Math.max(0, market.deadline - Date.now() / 1000) % 86400) / 3600);

  /* ===== 多语言文案 ===== */
  const t = lang === 'en' ? {
    back: 'Back',
    category: 'Category',
    volume: 'Volume',
    maxVolume: 'Max Volume',
    endsIn: 'Ends in',
    rules: 'Rules',
    rulesText: '1. Select YES or NO to place your prediction.\n2. Each share costs based on current market probability.\n3. Market resolves when the event outcome is determined.\n4. Winning shares pay out at $1.00 per share.\n5. All trades are final and executed on Polygon network.',
    background: 'Context',
    backgroundText: 'This prediction market tracks the probability of this real-world event occurring before the stated deadline. Market prices reflect the collective wisdom of all participants. Stay informed by monitoring official news sources and community discussions. Past performance does not guarantee future outcomes.',
    comments: 'Comments',
    positions: 'Positions',
    activity: 'Activity',
    yesHolders: 'YES Holders',
    noHolders: 'NO Holders',
    address: 'Address',
    amount: 'Amount',
    share: 'Share',
    noComments: 'No comments yet. Be the first to share your thoughts!',
    noPositions: 'No positions yet.',
    noActivity: 'No activity yet.',
    betYes: 'Bet YES',
    betNo: 'Bet NO',
  } : {
    back: '返回',
    category: '分类',
    volume: '交易量',
    maxVolume: '最大交易量',
    endsIn: '截止时间',
    rules: '规则',
    rulesText: '1. 选择 YES 或 NO 进行预测投注。\n2. 每份份额价格基于当前市场概率。\n3. 市场在事件结果确定后结算。\n4. 获胜份额按 $1.00/份 赔付。\n5. 所有交易在 Polygon 网络上执行且不可撤销。',
    background: '背景',
    backgroundText: '该预测市场跟踪此真实世界事件在规定截止日期前发生的概率。市场价格反映了所有参与者的集体智慧。请通过关注官方新闻来源和社区讨论保持信息灵通。过往表现不保证未来结果。',
    comments: '评论',
    positions: '持仓',
    activity: '动态',
    yesHolders: 'YES 持仓',
    noHolders: 'NO 持仓',
    address: '地址',
    amount: '数量',
    share: '占比',
    noComments: '暂无评论，成为第一个分享观点的人！',
    noPositions: '暂无持仓。',
    noActivity: '暂无动态。',
    betYes: '押 YES',
    betNo: '押 NO',
  };

  /* ===== 活动类型标签映射 ===== */
  const activityLabel = (type: ActivityItem['type']) => {
    const map: Record<string, { en: string; zh: string; color: string }> = {
      buy_yes: { en: 'Bought YES', zh: '买入 YES', color: '#16a34a' },
      buy_no: { en: 'Bought NO', zh: '买入 NO', color: '#dc2626' },
      sell_yes: { en: 'Sold YES', zh: '卖出 YES', color: '#ca8a04' },
      sell_no: { en: 'Sold NO', zh: '卖出 NO', color: '#ca8a04' },
      claim: { en: 'Claimed', zh: '领取奖励', color: '#7c3aed' },
    };
    return map[type] || map.buy_yes;
  };

  return (
    <div className="page-container" style={{ paddingTop: 8, minWidth: 500 }}>
      {/* ===== 顶部返回栏 — 左侧返回 / 右侧收藏+复制链接 ===== */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        {/* 左侧：返回按钮 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onBack}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 18,
              color: '#374151',
              padding: 0,
              transition: 'all 0.15s ease',
            }}
          >
            ←
          </button>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#374151' }}>{t.back}</span>
        </div>

        {/* 右侧：收藏 + 复制链接 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* 收藏按钮 */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            title={bookmarked ? (lang === 'en' ? 'Remove bookmark' : '取消收藏') : (lang === 'en' ? 'Bookmark' : '收藏')}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 16,
              padding: 0,
              transition: 'all 0.15s ease',
              color: bookmarked ? '#ff4d4f' : '#9ca3af',
            }}
          >
            {bookmarked ? '★' : '☆'}
          </button>

          {/* 复制链接按钮 */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              });
            }}
            title={lang === 'en' ? 'Copy link' : '复制链接'}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: '1px solid #e5e7eb',
              backgroundColor: copied ? '#dcfce7' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 15,
              padding: 0,
              transition: 'all 0.15s ease',
              color: copied ? '#16a34a' : '#9ca3af',
            }}
          >
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ===== 市场信息区块 ===== */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        {/* 分类标签 */}
        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: 6,
            backgroundColor: '#f0f0ff',
            color: '#2563eb',
            fontSize: 12,
            fontWeight: 700,
          }}>
            {category[lang]}
          </span>
        </div>

        {/* 图标 + 标题 */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 20, alignItems: 'flex-start' }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            backgroundColor: '#f5f5f7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            flexShrink: 0,
          }}>
            {market.avatarEmoji}
          </div>
          <h1 style={{
            fontSize: 20,
            fontWeight: 800,
            color: '#000',
            lineHeight: 1.35,
            margin: 0,
            flex: 1,
            paddingTop: 8,
          }}>
            {market.question}
          </h1>
        </div>

        {/* 交易量 + 最大交易量 + 截止时间 三列数据 */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 20,
        }}>
          <div style={{
            flex: 1,
            backgroundColor: '#f9fafb',
            borderRadius: 10,
            padding: '12px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 500 }}>{t.volume}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{market.volume}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: '#f9fafb',
            borderRadius: 10,
            padding: '12px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 500 }}>{t.maxVolume}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981' }}>{market.maxVolume}</div>
          </div>
          <div style={{
            flex: 1,
            backgroundColor: '#f9fafb',
            borderRadius: 10,
            padding: '12px 10px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, fontWeight: 500 }}>{t.endsIn}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#111827' }}>{days}D {hours}h</div>
          </div>
        </div>

        {/* Yes / No 操作按钮 */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button
            onClick={() => { setBetSelectedSide('yes'); setBetModalVisible(true); }}
            style={{
              flex: 1,
              backgroundColor: '#dcfce7',
              color: '#166534',
              border: 'none',
              fontWeight: 800,
              fontSize: 16,
              padding: '14px 16px',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}>
            {t.betYes} {market.probability}%
          </button>
          <button
            onClick={() => { setBetSelectedSide('no'); setBetModalVisible(true); }}
            style={{
              flex: 1,
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              border: 'none',
              fontWeight: 800,
              fontSize: 16,
              padding: '14px 16px',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}>
            {t.betNo} {100 - market.probability}%
          </button>
        </div>

        {/* Rules | Context Tab 切换 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{
            display: 'flex',
            gap: 24,
            borderBottom: '1px solid #e5e7eb',
            marginBottom: 0,
          }}>
            {(['rules', 'context'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setInfoTab(tab)}
                style={{
                  padding: '10px 0',
                  border: 'none',
                  backgroundColor: 'transparent',
                  fontSize: 14,
                  fontWeight: 700,
                  color: infoTab === tab ? '#111827' : '#9ca3af',
                  cursor: 'pointer',
                  borderBottom: infoTab === tab ? '2px solid #111827' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab === 'rules' ? t.rules : t.background}
              </button>
            ))}
          </div>
          <div style={{
            padding: '14px 0',
            fontSize: 13,
            color: '#4b5563',
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            textAlign: 'left',
          }}>
            {infoTab === 'rules' ? t.rulesText : t.backgroundText}
          </div>
        </div>
      </div>

      {/* ===== Tab 切换栏 ===== */}
      <div style={{ marginBottom: 4 }}>
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: 16,
        }}>
          {(['comments', 'positions', 'activity'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '12px 0',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: 15,
                fontWeight: activeTab === tab ? 700 : 500,
                color: activeTab === tab ? '#111827' : '#9ca3af',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {t[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Tab 内容区 ===== */}

      {/* 评论 Tab */}
      {activeTab === 'comments' && (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {mockComments.length > 0 ? (
            mockComments.map((comment, idx) => (
              <CommentItemView
                key={comment.id}
                comment={comment}
                depth={0}
                lang={lang}
                isLastChild={idx === mockComments.length - 1}
                onReply={handleReply}
                replyingTo={replyingTo}
                replyText={replyText}
                setReplyText={setReplyText}
                onSubmitReply={handleSubmitReply}
              />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#9ca3af',
              fontSize: 14,
            }}>
              {t.noComments}
            </div>
          )}
        </div>
      )}

      {/* 持仓 Tab */}
      {activeTab === 'positions' && (
        <div style={{ width: '100%', overflow: 'hidden' }}>
          {/* YES 持仓列表 */}
          <div style={{ width: '100%', overflow: 'hidden', marginBottom: 16 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#16a34a',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#16a34a',
              }} />
              {t.yesHolders}
            </h3>
            {/* 表头 */}
            <div style={{
              display: 'flex',
              padding: '6px 0',
              borderBottom: '1px solid #f3f4f6',
              marginBottom: 8,
              fontSize: 12,
              color: '#9ca3af',
              fontWeight: 600,
            }}>
              <span style={{ width: 40 }}>#</span>
              <span style={{ flex: 1 }}>{t.address}</span>
              <span style={{ width: 100, textAlign: 'right' }}>{t.amount}</span>
              <span style={{ width: 60, textAlign: 'right' }}>{t.share}</span>
            </div>
            {mockYesPositions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: idx < mockYesPositions.length - 1 ? '1px solid #f9fafb' : 'none',
                  fontSize: 14,
                }}
              >
                <span style={{ width: 40, color: '#9ca3af', fontWeight: 600 }}>{idx + 1}</span>
                <span style={{ flex: 1, color: '#374151', fontWeight: 600, fontFamily: 'monospace', fontSize: 13 }}>
                  {item.address}
                </span>
                <span style={{ width: 100, textAlign: 'right', color: '#111827', fontWeight: 700 }}>
                  {item.amount}
                </span>
                <span style={{ width: 60, textAlign: 'right', color: '#6b7280', fontWeight: 500 }}>
                  {item.sharePct}
                </span>
              </div>
            ))}
          </div>

          {/* NO 持仓列表 */}
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#dc2626',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#dc2626',
              }} />
              {t.noHolders}
            </h3>
            {/* 表头 */}
            <div style={{
              display: 'flex',
              padding: '6px 0',
              borderBottom: '1px solid #f3f4f6',
              marginBottom: 8,
              fontSize: 12,
              color: '#9ca3af',
              fontWeight: 600,
            }}>
              <span style={{ width: 40 }}>#</span>
              <span style={{ flex: 1 }}>{t.address}</span>
              <span style={{ width: 100, textAlign: 'right' }}>{t.amount}</span>
              <span style={{ width: 60, textAlign: 'right' }}>{t.share}</span>
            </div>
            {mockNoPositions.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: idx < mockNoPositions.length - 1 ? '1px solid #f9fafb' : 'none',
                  fontSize: 14,
                }}
              >
                <span style={{ width: 40, color: '#9ca3af', fontWeight: 600 }}>{idx + 1}</span>
                <span style={{ flex: 1, color: '#374151', fontWeight: 600, fontFamily: 'monospace', fontSize: 13 }}>
                  {item.address}
                </span>
                <span style={{ width: 100, textAlign: 'right', color: '#111827', fontWeight: 700 }}>
                  {item.amount}
                </span>
                <span style={{ width: 60, textAlign: 'right', color: '#6b7280', fontWeight: 500 }}>
                  {item.sharePct}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 动态 Tab */}
      {activeTab === 'activity' && (
        <div style={{
          width: '100%',
          overflow: 'hidden',
        }}>
          {mockActivities.length > 0 ? (
            mockActivities.map((item) => {
              const label = activityLabel(item.type);
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 18px',
                    borderBottom: '1px solid #f3f4f6',
                    gap: 8,
                    flexWrap: 'nowrap',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* 用户 — 头像 + 昵称 */}
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#111827',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                    }}>
                      {item.avatar}
                    </span>
                    {item.nickname}
                  </span>

                  {/* 交易类型标签 */}
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    borderRadius: 6,
                    backgroundColor: label.color + '18',
                    color: label.color,
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}>
                    {label[lang]}
                  </span>

                  {/* 金额 */}
                  <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#111827',
                    flexShrink: 0,
                  }}>
                    {item.amount}
                  </span>

                  {/* 时间 — 右对齐 */}
                  <span style={{
                    fontSize: 12,
                    color: '#9ca3af',
                    flexShrink: 0,
                    marginLeft: 'auto',
                  }}>
                    {item.time}
                  </span>
                </div>
              );
            })
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: '#9ca3af',
              fontSize: 14,
            }}>
              {t.noActivity}
            </div>
          )}
        </div>
      )}

      {/* 下注弹窗 */}
      <BetModal
        visible={betModalVisible}
        market={market}
        selectedSide={betSelectedSide}
        userBalance={100}
        onClose={() => setBetModalVisible(false)}
        onSelectSide={(side) => setBetSelectedSide(side)}
        onBet={(amount: number) => { console.log('Bet:', amount, betSelectedSide, market.id); setBetModalVisible(false); }}
        lang={lang}
      />
    </div>
  );
};

export default MarketDetail;
