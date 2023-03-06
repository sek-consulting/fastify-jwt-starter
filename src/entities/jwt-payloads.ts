interface AccessTokenPayload {
  id: number
}

interface RefreshTokenPayload {
  id: number
  uuid: string
}

export { AccessTokenPayload, RefreshTokenPayload }
