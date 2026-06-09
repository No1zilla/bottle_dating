import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Panel } from '@vkontakte/vkui';
import BottleSpinner from '../components/BottleSpinner.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { getRandomTask, getRandomPunishment } from '../data/tasks.js';
import { addScore, bumpStats } from '../hooks/useStorage.js';
import { showBanner, hideBanner, showRewardedAd, getAdCooldownMs } from '../hooks/useAds.js';
import { useSessionState } from '../hooks/useSessionState.js';

const CUSTOM_TASK_MAX = 100;

export default function Game({ id, players, setPlayers, onEndGame, gameMode = 'dating' }) {
  const [spinnerIndex, setSpinnerIndex] = useSessionState('bottle_game_spinnerIndex', 0);
  const [targetIndex, setTargetIndex] = useSessionState('bottle_game_targetIndex', null);
  const [task, setTask] = useSessionState('bottle_game_task', null);
  // phases: ready | spinning | task | punishment | between
  const [phase, setPhase] = useSessionState('bottle_game_phase', 'ready');
  const [punishment, setPunishment] = useSessionState('bottle_game_punishment', null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(() => getAdCooldownMs());
  const [confirmEndOpen, setConfirmEndOpen] = useState(false);

  // Custom tasks
  const [customTasks, setCustomTasks] = useSessionState('bottle_game_customTasks', []);
  const [customTaskModal, setCustomTaskModal] = useState(false);
  const [customTaskText, setCustomTaskText] = useState('');
  const [customTaskError, setCustomTaskError] = useState('');

  const roundResolvedRef = useRef(false);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const tick = () => setCooldownLeft(getAdCooldownMs());
    tick();
    const interval = setInterval(tick, 500);
    return () => clearInterval(interval);
  }, [cooldownLeft > 0]);

  useEffect(() => {
    if (phase === 'spinning') {
      setPhase('task');
      if (!task) setTask(getRandomTaskForMode());
    }
  }, []);

  useEffect(() => {
    showBanner();
    return () => { hideBanner(); };
  }, []);

  useEffect(() => {
    if (!confirmEndOpen && !customTaskModal) return;
    document.body.classList.add('modal-open');
    const onKey = (e) => {
      if (e.key === 'Escape') { setConfirmEndOpen(false); setCustomTaskModal(false); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKey);
    };
  }, [confirmEndOpen, customTaskModal]);

  function getRandomTaskForMode() {
    // Mix in custom tasks with 25% probability if any exist
    if (customTasks.length > 0 && Math.random() < 0.25) {
      const ct = customTasks[Math.floor(Math.random() * customTasks.length)];
      return ct;
    }
    return getRandomTask(gameMode);
  }

  function startSpin() {
    if (players.length < 2) return;
    let fromIndex = spinnerIndex;
    if (phase === 'between' && targetIndex != null) {
      fromIndex = targetIndex;
      setSpinnerIndex(targetIndex);
    }
    let t = Math.floor(Math.random() * players.length);
    while (t === fromIndex && players.length > 1) {
      t = Math.floor(Math.random() * players.length);
    }
    setTargetIndex(t);
    setTask(null);
    setPunishment(null);
    roundResolvedRef.current = false;
    setPhase('spinning');
    setIsSpinning(true);
  }

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    setTask(getRandomTaskForMode());
    setPhase('task');
  }, [customTasks, gameMode]);

  async function handleComplete() {
    if (!task || roundResolvedRef.current) return;
    roundResolvedRef.current = true;
    const earned = task.points || 20;
    const playerId = players[targetIndex]?.id;
    setPlayers((ps) =>
      ps.map((p) => (p.id === playerId ? { ...p, score: (p.score || 0) + earned } : p))
    );
    setPhase('between');
    setTask(null);
    try { await addScore(earned); await bumpStats({ tasks: 1 }); } catch {}
  }

  async function handleFail() {
    if (!task || roundResolvedRef.current) return;
    // Show punishment card first, then ad after punishment is dismissed
    const p = getRandomPunishment();
    setPunishment(p);
    setPhase('punishment');
    // Don't mark roundResolved yet — we resolve after punishment
  }

  async function handlePunishmentDone() {
    if (roundResolvedRef.current) return;
    roundResolvedRef.current = true;
    setPhase('between');
    setTask(null);
    setPunishment(null);
    try { await bumpStats({ tasks: 1 }); } catch {}

    // Show rewarded ad after punishment, with cooldown guard
    if (cooldownLeft <= 0) {
      setAdLoading(true);
      try {
        await Promise.race([showRewardedAd(), new Promise((r) => setTimeout(r, 8000))]);
      } catch {}
      setAdLoading(false);
      setCooldownLeft(getAdCooldownMs());
    }
  }

  async function handleSkip() {
    if (roundResolvedRef.current || adLoading || cooldownLeft > 0) return;
    setAdLoading(true);
    try {
      await Promise.race([showRewardedAd(), new Promise((r) => setTimeout(r, 8000))]);
    } catch {}
    setAdLoading(false);
    setCooldownLeft(getAdCooldownMs());
    if (roundResolvedRef.current) return;
    roundResolvedRef.current = true;
    setPhase('between');
    setTask(null);
  }

  // Custom task management
  function openCustomTaskModal() { setCustomTaskText(''); setCustomTaskError(''); setCustomTaskModal(true); }
  function closeCustomTaskModal() { setCustomTaskModal(false); }
  function addCustomTask() {
    const trimmed = customTaskText.trim();
    if (!trimmed) { setCustomTaskError('Задание не может быть пустым'); return; }
    if (trimmed.length < 5) { setCustomTaskError('Слишком короткое задание'); return; }
    const newTask = {
      id: `custom_${Date.now()}`,
      mode: gameMode,
      level: 'medium',
      points: 20,
      text: trimmed,
      isCustom: true,
    };
    setCustomTasks([...customTasks, newTask]);
    closeCustomTaskModal();
  }

  function requestEndGame() { setConfirmEndOpen(true); }
  function cancelEndGame() { setConfirmEndOpen(false); }
  function handleEndGame() {
    setConfirmEndOpen(false);
    bumpStats({ games: 1 }).catch(() => {});
    try {
      ['spinnerIndex', 'targetIndex', 'task', 'phase', 'punishment', 'customTasks'].forEach((k) =>
        sessionStorage.removeItem(`bottle_game_${k}`)
      );
    } catch {}
    if (typeof onEndGame === 'function') onEndGame();
  }

  const spinner = players[spinnerIndex];
  const target = targetIndex != null ? players[targetIndex] : null;
  const showSpinButton = phase === 'ready' || phase === 'between';
  const spinnerName = spinner?.name || spinner?.first_name || '';
  const spinnerScore = spinner?.score || 0;

  const MODE_LABELS = { dating: '💬 Знакомство', flirt: '😏 Флирт', fire: '🔥 Огонь' };

  return (
    <Panel id={id}>
      <div className="banner" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <div className="banner-label">Сейчас крутит</div>
            <div className="banner-value">
              {spinnerName}{' '}
              <span className="banner-score" style={{ fontSize: '1rem' }}>· {spinnerScore} очков</span>
            </div>
          </div>
          <span className="mode-chip">{MODE_LABELS[gameMode] || gameMode}</span>
        </div>
      </div>

      <BottleSpinner
        players={players}
        isSpinning={isSpinning}
        targetIndex={targetIndex}
        spinnerIndex={spinnerIndex}
        onSpinComplete={handleSpinComplete}
      />

      {showSpinButton && (
        <div style={{ padding: '0 1rem' }}>
          <button className="btn-gradient" onClick={startSpin}>Крутить бутылку</button>
        </div>
      )}

      {phase === 'spinning' && (
        <div className="empty-state">Бутылка крутится...</div>
      )}

      {(phase === 'task' || phase === 'punishment') && (
        <TaskCard
          task={phase === 'task' ? task : null}
          fromPlayer={spinner}
          toPlayer={target}
          onComplete={handleComplete}
          onFail={handleFail}
          onSkip={handleSkip}
          skipLabel={
            cooldownLeft > 0
              ? `Пропуск через ${Math.ceil(cooldownLeft / 1000)} с`
              : adLoading ? 'Реклама…' : 'Пропустить 📺'
          }
          skipDisabled={adLoading || cooldownLeft > 0}
          punishment={phase === 'punishment' ? punishment : null}
          onPunishmentDone={handlePunishmentDone}
        />
      )}

      <div className="scoreboard-mini">
        <div className="scoreboard-mini-title">Счёт игроков</div>
        {players.map((p, i) => {
          const isCurrent = i === spinnerIndex;
          return (
            <div key={p.id} className={`scoreboard-row${isCurrent ? ' current' : ''}`}>
              <span className="scoreboard-name">{p.name || p.first_name}</span>
              <span className="scoreboard-score">{p.score || 0}</span>
            </div>
          );
        })}
      </div>

      <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button className="btn-ghost" onClick={openCustomTaskModal}>
          + Своё задание {customTasks.length > 0 ? `(${customTasks.length})` : ''}
        </button>
        <button className="btn-ghost" onClick={requestEndGame}>Завершить игру</button>
      </div>
      <div style={{ height: 72 }} />

      {/* Confirm end game modal */}
      {confirmEndOpen && (
        <div className="modal-overlay" onClick={cancelEndGame}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              Завершить игру?
            </div>
            <div className="text-secondary" style={{ marginBottom: '1.25rem' }}>
              Прогресс текущей партии не сохранится. Появится итоговая таблица результатов.
            </div>
            <div className="btn-row">
              <button className="btn-gradient" onClick={handleEndGame}>Завершить</button>
              <button className="btn-ghost" onClick={cancelEndGame}>Продолжить игру</button>
            </div>
          </div>
        </div>
      )}

      {/* Custom task modal */}
      {customTaskModal && (
        <div className="modal-overlay" onClick={closeCustomTaskModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem', color: '#fff' }}>
              Своё задание
            </div>
            <div className="text-secondary" style={{ marginBottom: '0.75rem' }}>
              Задание попадёт в общий пул с вероятностью ~25%
            </div>
            <div className="modal-label">
              Текст задания
              <span style={{ float: 'right', opacity: 0.6 }}>{customTaskText.length}/{CUSTOM_TASK_MAX}</span>
            </div>
            <textarea
              className="modal-input"
              value={customTaskText}
              onChange={(e) => {
                setCustomTaskText(e.target.value.slice(0, CUSTOM_TASK_MAX));
                if (customTaskError) setCustomTaskError('');
              }}
              placeholder="Например: Изобрази кошку 20 секунд"
              maxLength={CUSTOM_TASK_MAX}
              rows={3}
              autoFocus
              style={{ resize: 'none', minHeight: 72 }}
            />
            {customTaskError && (
              <div style={{ color: '#ff6b6b', fontSize: '0.8rem', marginTop: '-0.5rem', marginBottom: '0.875rem' }}>
                {customTaskError}
              </div>
            )}
            {customTasks.length > 0 && (
              <div style={{ marginBottom: '0.75rem' }}>
                <div className="modal-label" style={{ marginBottom: '0.5rem' }}>Добавленные задания</div>
                {customTasks.map((ct) => (
                  <div key={ct.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
                    <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{ct.text}</span>
                    <button
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '1.1rem', padding: '0 4px' }}
                      onClick={() => setCustomTasks(customTasks.filter((t) => t.id !== ct.id))}
                      aria-label="Удалить"
                    >×</button>
                  </div>
                ))}
              </div>
            )}
            <div className="btn-row">
              <button className="btn-gradient" onClick={addCustomTask} disabled={customTaskText.trim().length < 5}>
                Добавить
              </button>
              <button className="btn-ghost" onClick={closeCustomTaskModal}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </Panel>
  );
}
