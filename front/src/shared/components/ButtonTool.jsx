
/**
 * Reusable button with optional icon and label
 * 
 * @param {{
 *   icon?: { src: string, alt?: string, width?: number, height?: number },
 *   label?: string,
 *   isActive?: boolean,
 *   disabled?: boolean,
 *   onClick?: () => void,
 *   layout?: 'row' | 'column',
 *   className?: string,
 * }} props 
 */
export const ButtonTool = ({
  icon,
  label = '',
  isActive = false,
  disabled = false,
  onClick,
  layout = 'column',
  className = '',
}) => {
  const flexLayout = layout === 'row' ? 'flex-row gap-1' : 'flex-col';

  const iconElement = icon ? (
    <img
      src={icon.src}
      alt={icon.alt || 'icon'}
      style={{
        width: icon.width || 24,
        height: icon.height || 24,
      }}
      className={`object-contain transition-all ${
        disabled ? 'grayscale opacity-50' : ''
      }`}
    />
  ) : null;

  const labelElement = label ? (
    <span
      className={`mt-1 text-[11px] ${
        disabled
          ? 'text-gray-300'
          : 'text-gray-900 font-medium hover:text-[#49b0f2]'
      }`}
    >
      {label}
    </span>
  ) : null;

  return (
    <button
      type="button"
      title={icon?.alt || label}
      disabled={disabled}
      onClick={onClick}
      className={`flex ${flexLayout} items-center justify-center p-1 rounded text-[11px] transition-colors
        ${isActive ? 'text-[#49b0f2] bg-blue-100' : 'hover:text-[#49b0f2]'}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {iconElement}
      {labelElement}
    </button>
  );
};
