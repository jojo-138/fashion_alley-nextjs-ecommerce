import styles from 'styles/PanelLayout.module.css';

const PanelLayout = ({ height, width, boxShadow, active, position, handleClick, children }) => {
  const panelStyle = {
    height: height,
    width: width,
    boxShadow: boxShadow,
  };

  return (
    <div className={`${styles.container} ${active ? styles.active : undefined}`}>
      <div
        className={`${styles.panel} ${active ? styles.showPanel : undefined}  ${
          position === 'left'
            ? styles.left
            : position === 'right'
            ? styles.right
            : position === 'center'
            ? styles.center
            : styles.top
        }`}
        style={panelStyle}>
        {children}
      </div>
      <div
        className={active ? `${styles.overlay} ${styles.showOverlay}` : styles.overlay}
        onClick={handleClick}
      />
    </div>
  );
};

export default PanelLayout;
