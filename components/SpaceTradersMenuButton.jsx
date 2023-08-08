const React = window.react;
const { useState, useEffect } = React;
const { SettingsButton } = window.settingsUI;

export const SpaceTradersMenuButton = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.hooks.emit("space_trader:activate_settings", active);
  },[active, setActive])

  useEffect(() => {
    window.hooks.on("space_trader:deactivate_menu_button", () => {
      setActive(false);
    })
  }, [])

  return (
      <div id='spaceTraders'>
        <SettingsButton
          tooltipText="Space Traders"
          icon="spaceTrader"
          active={active}
          onClick={e => {
            setActive(!active);
          }}
        />
      </div>
  )
}