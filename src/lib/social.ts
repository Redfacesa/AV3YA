export const AV3YA_SOCIAL = {
  instagram: '',
  facebook: '',
  email: 'mailto:av3ya.inc@gmail.com',
} as const;

export const AV3YA_SOCIAL_LINKS = [
  ...(AV3YA_SOCIAL.instagram
    ? [{ id: 'instagram' as const, label: 'Instagram', href: AV3YA_SOCIAL.instagram, handle: '@av3ya' }]
    : []),
] as const;
