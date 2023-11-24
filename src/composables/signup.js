import { reactive, toValue } from 'vue'
import { toastStore } from '@/store'

export function useSignup(signupForm) {
  const signUpError = reactive({
    passLength: false,
    passConfirm: false
  })

  const isSignUpPage = reactive({
    state: false,
    toggle() {
      this.state = !this.state
    }
  })

  const signUp = () => {
    const onSignUp = async () => {
      const formdata = new FormData(toValue(signupForm))
      const createAccObj = {}

      if (formdata.get('password').length >= 8) {
        if (formdata.get('password') === formdata.get('confirm_password')) {
          formdata.forEach((value, key) => {
            if (key !== 'confirm_password') {
              createAccObj[key] = value
            }
          })

          await fetch(`${import.meta.env.VITE_API_DOMAIN}/users/create-account`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(createAccObj)
          })
            .then(async (res) => {
              const response = await res.json()

              if (response.success) {
                isSignUpPage.state = false

                signUpError.passLength = false
                signUpError.passConfirm = false

                toastStore.add({
                  msg: 'Account created successfully.',
                  duration: 4000
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          signUpError.passLength = false
          signUpError.passConfirm = true
        }
      } else {
        signUpError.passLength = true
        signUpError.passConfirm = false
      }
    }

    onSignUp()
  }

  return { signUp, isSignUpPage, signUpError }
}
