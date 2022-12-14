import { Switch } from '@headlessui/react'
import useDarkMode from '@lib/use-dark-mode'
import { useEffect, useState } from 'react'
import classnames from 'classnames'

const ThemeSwitcher = () => {
  const [theme, setTheme] = useDarkMode()
  const [enabled, setEnabled] = useState(theme === 'light')
  const switchTheme = (value: boolean) => {
    setTheme(theme)
    setEnabled(value)
  }

  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  if (!hasMounted) return null

  return (
    <Switch
      checked={enabled}
      onChange={switchTheme}
      className={classnames(
        'relative inline-flex h-8 w-12 items-center rounded-full',
        {
          'bg-blue-600': enabled,
          'bg-gray-200': !enabled,
        }
      )}
    >
      <span className="sr-only">Enable Dark Mode</span>
      <span
        className={classnames(
          'inline-block h-9 w-9 transform rounded-full bg-white transition',
          {
            'translate-x-5': enabled,
            'translate-x-[-5px]': !enabled,
          }
        )}
      />
    </Switch>
  )
}
export default ThemeSwitcher
