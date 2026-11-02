import { useEffect, useId, useRef, useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ label, options, selectedValue, onSelect, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const listId = useId();

  const selectedOption = options.find((option) => option.value === selectedValue);


  useEffect(() => {
    if (!isOpen) return undefined;
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  
  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  function open() {
    const index = options.findIndex((option) => option.value === selectedValue);
    setActiveIndex(index >= 0 ? index : 0);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function choose(option) {
    option.onClick?.(option); 
    onSelect?.(option); 
    close();
  }

  function handleListKeyDown(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        choose(options[activeIndex]);
        break;
      case 'Escape':
      case 'Tab':
        close();
        break;
      default:
    }
  }

  return (
    <div className="dropdown" ref={containerRef}>
      <button
        ref={buttonRef}
        type="button"
        className="dropdown__toggle"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' && !isOpen) {
            event.preventDefault();
            open();
          }
        }}
      >
        <span className="dropdown__label">{label}</span>
        {selectedOption && <span className="dropdown__value">{selectedOption.label}</span>}
        <span className={`dropdown__caret ${isOpen ? 'is-open' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${listId}-opt-${activeIndex}`}
          className={`dropdown__menu dropdown__menu--${align}`}
          onKeyDown={handleListKeyDown}
        >
          {options.map((option, index) => {
            const isSelected = option.value === selectedValue;
            return (
              <li
                key={option.value}
                id={`${listId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`dropdown__option ${index === activeIndex ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => choose(option)}
              >
                <span>{option.label}</span>
                {isSelected && <span aria-hidden="true">✓</span>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
