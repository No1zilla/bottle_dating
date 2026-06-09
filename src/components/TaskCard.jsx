import React from 'react';

const LEVEL_LABEL = { easy: 'Легко', medium: 'Средне', hard: 'Сложно' };
const MODE_LABEL = { dating: '💬 Знакомство', flirt: '😏 Флирт', fire: '🔥 Огонь' };

export default function TaskCard({
  task,
  fromPlayer,
  toPlayer,
  onComplete,
  onFail,
  onSkip,
  skipLabel = 'Пропустить',
  skipDisabled = false,
  // punishment phase
  punishment,
  onPunishmentDone,
}) {
  if (!task) return null;
  const fromName = fromPlayer?.name || fromPlayer?.first_name || '?';
  const toName = toPlayer?.name || toPlayer?.first_name || '?';

  if (punishment) {
    return (
      <div className="task-card task-card-anim punishment-card">
        <div className="punishment-title">⚡ Наказание</div>
        <p className="task-text">{punishment.text}</p>
        <div className="btn-row">
          <button className="btn-gradient" onClick={onPunishmentDone}>
            Наказание выполнено
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card task-card-anim ${task.level}`}>
      <div className="from-to">
        <b>{fromName}</b> → <b>{toName}</b>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <span className={`task-badge ${task.level}`}>
          {LEVEL_LABEL[task.level]} · +{task.points}
        </span>
        {task.mode && (
          <span className="task-badge mode-badge">
            {MODE_LABEL[task.mode] || task.mode}
          </span>
        )}
      </div>
      <p className="task-text">{task.text}</p>
      <div className="btn-row" style={{ flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-success btn-half" onClick={onComplete}>
            ✅ Выполнил
          </button>
          <button className="btn-fail btn-half" onClick={onFail}>
            ❌ Провалил
          </button>
        </div>
        <button className="btn-ghost" onClick={onSkip} disabled={skipDisabled}>
          {skipLabel}
        </button>
      </div>
    </div>
  );
}
