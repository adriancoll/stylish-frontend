import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { USER_ROLES } from '../interfaces/user.interface'
import { RootState } from '../store'
import { UserState } from '../store/features/user/userSlice'
import { getData, storeData } from '../utils/asyncStorage'

export const useFloatingNoteReminder = () => {
  const [show, setShow] = useState(false)

  const { isBusiness, user } = useSelector<RootState, UserState>(
    (state) => state.user
  )

  const checker = async () => {
    const data = await getData('showed-reminder-floating-note')

    // if was already dismissed
    if (data) return

    // If is first login to the user and has user role
    if (typeof data === 'undefined' && user.role === USER_ROLES.USER_ROLE) {
      //   await storeData('showed-reminder-floating-note', true)
      console.log('Must show!')
      return setShow(true)
    }

    setShow(false)
  }

  useEffect(() => {
    checker()
  }, [])

  return { show, setShow }
}
