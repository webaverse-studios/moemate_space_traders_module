const React = window.react;
const { useState, useEffect } = React;
const { Switch, SettingsBackButton } = window.settingsUI;

function classnames() {
  var classes = [];

  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;

    var argType = typeof arg;

    if (argType === 'string' || argType === 'number') {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === 'object') {
      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
        classes.push(arg.toString());
        continue;
      }

      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

export const SpaceTradersSettings = () => {
  const [open, setOpen] = useState(false);
  
  // Detect Switch Changes and Update Settings

  useEffect(() => {
    if (!open) {
      window.hooks.emit('space_trader:deactivate_menu_button')
    }
  }, [open])


  useEffect(() => {
    window.hooks.on("space_trader:activate_settings", (active) => {
      setOpen(active);
    })
  }, []);

  return (
    <>
      <div className={classnames(
          window.styles?.CompanionSettings?.wrap,
          window.styles?.CompanionSettings?.full,
          open == true ? window.styles?.CompanionSettings?.open : null,
          "focusAppOnHover"
      )}>
        <SettingsBackButton
          icon="caretLeft"
          onClick={e => {
            setOpen(false)
          }}
        />
        <div className={window.styles?.CompanionSettings?.settingsTitle}>Space Trader Settings</div>
        <div className={classnames(
          window.styles?.CompanionSettings?.row,
          window.styles?.CompanionSettings?.scroll,
          window.styles?.CompanionSettings?.generalSettings,
        )}>
          <div className={window.styles?.CompanionSettings?.scroll}>
          <div className={window.styles?.CompanionSettings?.formItem}>
                <button className={window.styles?.CompanionSettings?.button} onClick={() => window.hooks.emit('space_traders:register')}>
                  Register
                </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};