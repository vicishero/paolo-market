import React from 'react';

// 下注弹窗组件
interface BetModalProps {
  visible: boolean;
  market: any;
  selectedSide: 'yes' | 'no' | null;
  userBalance: number;
  onClose: () => void;
  onSelectSide: (side: 'yes' | 'no') => void;
  onBet: (amount: number) => void;
  lang: 'en' | 'zh';
}

const BetModal: React.FC<BetModalProps> = ({
  visible,
  market,
  selectedSide,
  userBalance,
  onClose,
  onSelectSide,
  onBet,
  lang,
}) => {
  const [inputAmount, setInputAmount] = React.useState('1');

  if (!visible || !market) return null;

  const currentVolumeNum = Number(market.volume.replace(/[^0-9.]/g, ''));
  const maxVolumeNum = Number(market.maxVolume.replace(/[^0-9.]/g, ''));
  const remainingVolume = maxVolumeNum - currentVolumeNum;
  const isPoolFull = remainingVolume <= 0.01;
  const amountVal = Number(inputAmount) || 0;
  const minBet = 0.1;
  const maxAllowedBet = Math.min(100, remainingVolume, userBalance);
  const isValid = !isPoolFull && amountVal >= minBet && amountVal <= maxAllowedBet;

  const t = lang === 'en'
    ? {
        betOn: 'Bet on',
        yes: 'Yes',
        no: 'No',
        amount: 'Bet Amount',
        balance: 'Your Balance',
        poolFull: 'Pool is full, cannot bet',
        confirmBet: 'Confirm Bet',
        rangeTip: `Amount must between 0.1 and ${maxAllowedBet.toFixed(2)}`,
      }
    : {
        betOn: '下注方向',
        yes: '是',
        no: '否',
        amount: '下注金额',
        balance: '账户余额',
        poolFull: '竞猜池已满，无法下注',
        confirmBet: '确认下注',
        rangeTip: `金额必须在 0.1 到 ${maxAllowedBet.toFixed(2)} 之间`,
      };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }} onClick={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 500,
          backgroundColor: '#ffffff',
          borderRadius: '24px 24px 0 0',
          padding: 24,
          marginBottom: 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 20, fontSize: 18, fontWeight: 700, color: '#000' }}>
          {market.question}
        </div>
        {isPoolFull ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#ef4444', fontSize: 16, fontWeight: 600 }}>
            {t.poolFull}
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 10, fontWeight: 500 }}>{t.betOn}</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => onSelectSide('yes')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    border: selectedSide === 'yes' ? '2px solid #22c55e' : '2px solid #e5e7eb',
                    borderRadius: 12,
                    backgroundColor: selectedSide === 'yes' ? '#dcfce7' : '#ffffff',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                  }}
                >
                  {t.yes}
                </button>
                <button
                  onClick={() => onSelectSide('no')}
                  style={{
                    flex: 1,
                    padding: '14px',
                    border: selectedSide === 'no' ? '2px solid #ef4444' : '2px solid #e5e7eb',
                    borderRadius: 12,
                    backgroundColor: selectedSide === 'no' ? '#fee2e2' : '#ffffff',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: 'pointer',
                  }}
                >
                  {t.no}
                </button>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 10, fontWeight: 500 }}>{t.amount}</p>
              <input
                type="number"
                step="0.1"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid #e5e7eb',
                  borderRadius: 12,
                  fontSize: 16,
                  outline: 'none',
                }}
              />
              <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>{t.rangeTip}</p>
            </div>
            <div style={{ padding: '12px 0', borderTop: '1px solid #f0f0f0', marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: '#666' }}>
                {t.balance}: <span style={{ fontWeight: 700, color: '#000' }}>{userBalance.toFixed(2)} ETH</span>
              </p>
            </div>
            <button
              onClick={() => isValid && selectedSide && onBet(amountVal)}
              disabled={!isValid || !selectedSide}
              className="red-btn"
              style={{ opacity: isValid && selectedSide ? 1 : 0.5 }}
            >
              {t.confirmBet}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BetModal;
