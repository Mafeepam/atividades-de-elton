import { useId, useRef, useState } from 'react';
import './Tabs.css';

export default function Tabs({ tabs, defaultTabId, onChange, ariaLabel = 'Abas' }) {
  const [activeId, setActiveId] = useState(defaultTabId ?? tabs[0]?.id);
  const tabRefs = useRef({});
  const baseId = useId();

  function selectTab(id) {
    setActiveId(id);
    onChange?.(id);
  }

  function handleKeyDown(event, index) {
    let nextIndex = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    selectTab(nextTab.id);
    tabRefs.current[nextTab.id]?.focus();
  }

  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              id={`${baseId}-tab-${tab.id}`}
              type="button"
              role="tab"
              className={`tabs__tab ${isActive ? 'is-active' : ''}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          key={activeTab.id}
          id={`${baseId}-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          className="tabs__panel"
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
