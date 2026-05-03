import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-surface-cream p-5 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide">Есть аккаунт?</h2>
        <p className="text-xs text-ink-50 mt-1">
          Войдите для более удобного оформления заказа.
        </p>
      </div>
      <div>
        <LocalizedClientLink
          href="/account"
          className="btn-secondary text-xs py-2 px-5"
          data-testid="sign-in-button"
        >
          Войти
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
