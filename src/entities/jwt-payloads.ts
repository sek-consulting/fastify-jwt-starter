type AccessTokenPayload = {
  id: number
}

type RefreshTokenPayload = {
  id: number
  uuid: string
}

export { AccessTokenPayload, RefreshTokenPayload }
