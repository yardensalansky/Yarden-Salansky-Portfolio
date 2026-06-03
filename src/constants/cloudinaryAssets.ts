/**
 * Cloudinary URLs for portfolio media (keyed by original asset filename stem, usually Figma hash).
 * Default: `f_auto,q_auto/{stem}.png` — upload with public_id `{stem}.png` (or adjust URLs below).
 */

function cloudinaryPng(publicIdStem: string): string {
  return `https://res.cloudinary.com/drqk65xwl/image/upload/f_auto,q_auto/${publicIdStem}.png`;
}

/** Stems that use the standard `{stem}.png` delivery URL (deduped). */
const PORTFOLIO_PNG_STEMS = [
  // A Weather + Frame296 + Kite Runner shared
  '125b366da89efc73ab1d3613a8eb253638a4a84c',
  '6979113f0c313021048259e9086293da245860fe',
  '3231d5c923a8c3ca9d2bd0fe57aa3578a6d3aadb',
  '6ad8d6d5ced22b4c15e6a5b4882a0d586050a564',
  'ab6c4162df8d7fdd41e43890ff410ebcbe7fa944',
  '7ea8ae0c5f02d1ab87e06688297a8f1b9e1ca1b7',
  '4b0fb9b79b28207d1cad6777f62d47a64a574ff7',
  '9b449b55b8edd895ac050648d4449dbec39d30d5',
  '6638f16c6e75cc2a8e9dabb4251b5d760b50e6ce',
  'c54d016ff20ce4af675ad076733d9e96a52209b4',
  'edb1ce733267dcd4ae5a1cae5cbc303b5a956f49',
  '63b2848871272647279dbe6379943391ca528194',
  '7bbc972a4ad64576b61b13402e2ecb2240c25a64',
  'f102312e1887b710d92dfbca1269d0d58dfb3f96',
  '56364eed6ade01095e6f82c2aa387470fbcfeec0',
  'baac5183056ee69579af0f59a87c55e68bf113b7',
  '49bad70f62b852fcefaca54158eb551d96c6f292',
  'e049fb2f75b738107d6795d6b393a5b6798c5c40',
  // War Diary (Frame297 / Frame276)
  'a5720160641fbcb47a5023687c61d5e5748b3e7a',
  '5c1c2f30e081cf6af41fdc76c18e71c45244275d',
  'a6bbf11e62097685360dd84128d5d2ac402524cb',
  '1b869d7c84680ffa6d29247e36b839be01646acb',
  'd814f663320e2e4fa2db0c78fda37a584fab5585',
  'cef87fce0d21eaa8ef7080d63009ed572a4551b4',
  '4b03ad3150bec8c8883115e2c38952982075a4b0',
  '5fd3f8c3590e5da34faea00a21633d5f4de63f2b',
  // Frame378 + The One + A Weather card
  '4be6e164ad6109f1bb20a2e8459c4ac01757c749',
  'b4c0520dd3dd97620fa08169946c17486f3a699d',
  'a13c0a1d2183c49766cf5beff8da0c8ee7d2cbd3',
  // The One
  '056c91d0f948222c652672bdc048a5121049d045',
  '1f0910428d4f29a90f992a195216aafb05b1c9c8',
  '20fc9ab87c1cdf17a19f112426b231410d45c700',
  '3833b4d7ba58e7ec34878609bd265e15b22cffc3',
  '43b15e3e152dabf99e174cfcdf13b1f743cffe72',
  '4badcc09a62f228f2f76653e931383dcf6378ba4',
  '4d76f2de892b2aa30f1d5d5188649dd639796e78',
  '5155ceaabfc631a0539ce1b4e9083b46655a595d',
  '6a6a07eb820526514b8894f79d5a07c154252c61',
  '762de0df8b6134790626da81b2cbb657cdedabed',
  '858a9648ebfb1f7abcc3546d2de68bcd6e8cfa7c',
  '8c88b2a7100b81e1dcea822e9a8a6b6bc9d24e1b',
  '94ff67ca8030175f30be5a69db460a44d0f09d47',
  'b8e3ace9f5d57894a1227e35141bfe826f271e65',
  'c7b37025a802ebce00d4a8c5a221700134f759a6',
  'd1ad949cc5475a9a9203c3dfbed6305ffbe2149f',
] as const;

const autoFromStems = Object.fromEntries(
  [...new Set(PORTFOLIO_PNG_STEMS)].map((stem) => [stem, cloudinaryPng(stem)]),
) as Record<string, string>;

export const CLOUDINARY_ASSETS: Record<string, string> = {
  ...autoFromStems,
  'aweather-bg-right':
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756262/a1c461919ac351b16ef8b89ba52e98cc0c900b40_a3won7.png',
  /** Works grid card — The Kite Runner */
  thekiterunner_bg:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775840785/11111_z71g1j.png',
  /** The One case study — hero laptop mockup (overrides f_auto stem URL). */
  b8e3ace9f5d57894a1227e35141bfe826f271e65:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756267/b8e3ace9f5d57894a1227e35141bfe826f271e65_wadakh.png',
  /** The One — Anna Wintour hair (behind headline). */
  '5155ceaabfc631a0539ce1b4e9083b46655a595d':
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756262/5155ceaabfc631a0539ce1b4e9083b46655a595d_f5bjga.png',
  /** The One — Anna Wintour portrait (under headline). */
  '056c91d0f948222c652672bdc048a5121049d045':
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756260/056c91d0f948222c652672bdc048a5121049d045_c14c0w.png',
  baa51197c9d32d0b48a2e85d0a42bf14e6462dfb:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756298/baa51197c9d32d0b48a2e85d0a42bf14e6462dfb_sv3esi.png',
  f61aa266563e1e20679f24ab7993100d9e685b53:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756297/f61aa266563e1e20679f24ab7993100d9e685b53_gviea3.png',
  f453cab80056eeeda919ee268effbd52f304b430:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756277/f453cab80056eeeda919ee268effbd52f304b430_ki1jjo.png',
  e62c668bd3bfe59cecc7a610a32adbbf4073a792:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756275/e62c668bd3bfe59cecc7a610a32adbbf4073a792_wbrrxq.png',
  f34aea47ca3bb1185d3865d2fb8aadf8053df5cc:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756272/f34aea47ca3bb1185d3865d2fb8aadf8053df5cc_lsh725.png',
  f0d6b6967df287adfff81409accd73d3f8015af7:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756271/f0d6b6967df287adfff81409accd73d3f8015af7_f6xmb8.png',
  e082e465b1c842283a9dff49617174df4bc97f7d:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756269/e082e465b1c842283a9dff49617174df4bc97f7d_p893f9.png',
  f9dd11b5b9abdf2778bce6461ec2e448f87e975f:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756269/f9dd11b5b9abdf2778bce6461ec2e448f87e975f_eri5tk.png',
  ef47cad5a101404f08477acf4eb31b6148bb5433:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756269/ef47cad5a101404f08477acf4eb31b6148bb5433_xqovdk.png',
  /** The One — wig construction / product detail (Visual Language). */
  '762de0df8b6134790626da81b2cbb657cdedabed':
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756261/762de0df8b6134790626da81b2cbb657cdedabed_cykqlp.png',
  /** The One — Experience section: four-panel horizontal comp. */
  theone_experience_panels:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775898052/Screenshot_2026-04-11_at_11.12.35_1_a7uv2z.png',
  /** The One — Becoming Iconic: 12-panel iconic figures grid. */
  theone_becoming_iconic_grid:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818489/Screenshot_2026-04-10_at_13.54.15_1_ozgibd.png',
  /** The One — Interaction: purchase flow UI (three-panel screenshots). */
  theone_interaction_flow:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775899352/12345_dwfk74.png',
  /** The One — The Edition: left magazine cover (Gemini, Mona Lisa). */
  theone_edition_magazine_left:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818656/Gemini_Generated_Image_14omrl14omrl14om_1_atutbz.png',
  /** The One — The Edition: right magazine cover (Gemini, Paris / sofa). */
  theone_edition_magazine_right:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775818657/Gemini_Generated_Image_cap1qucap1qucap1_1_ww7sz8.png',
  ed2125792856334e649f9ab2aeeb5e8a1cbd8f25:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756268/ed2125792856334e649f9ab2aeeb5e8a1cbd8f25_trwwxl.jpg',
  dcfac3a91ede0c22ecde8cd19faa025351b7b4c1:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756268/dcfac3a91ede0c22ecde8cd19faa025351b7b4c1_zgavwm.png',
  d1828a69642c611bee6222e19946d3ee8de842d5:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756267/d1828a69642c611bee6222e19946d3ee8de842d5_wnlwwl.png',
  cfd7b1f5e90dffebe4b2a85038f4dc09ead87710:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756267/cfd7b1f5e90dffebe4b2a85038f4dc09ead87710_gnvbuk.jpg',
  b8b7e6abc587ccd5ad8adad5c0866ab1694ef5fc:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775756267/b8b7e6abc587ccd5ad8adad5c0866ab1694ef5fc_uocftn.png',
  /** War Diary — UI stripe between first embed video and catalog. */
  wardiary_ui_stripe:
    'https://res.cloudinary.com/drqk65xwl/image/upload/v1775902421/Screenshot_2026-04-11_at_13.12.49_1_xveufm.png',
};

/** Cloudinary video URLs */
export const CLOUDINARY_VIDEOS = {
  hero_loop:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775845930/1_dutji0.mov',
  /** Mobile hero only — portfolio intro screen recording (do not use on desktop). */
  mobile_hero_portfolio:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775912986/Screen_Recording_2026-04-11_at_16.01.11_vbslph.mov',
  wardiary_cover:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775766828/wardiarycover_d0gxlb.mp4',
  wardiary_video1:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775765219/wardiary_video1_pgmk0a.mp4',
  wardiary_video22_2:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775768422/wardiary_video22-2_awf1md.mp4',
  /** Kite Runner case study — style frames / final cut (includes audio; use with controls, not muted). */
  thekiterunner2:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775769227/thekiterunner2_jszmmx.mp4',
  /** The One — canvas project card loop (no audio; keep video muted). */
  the_one_cover:
    'https://res.cloudinary.com/drqk65xwl/video/upload/v1775818743/%D7%A2%D7%9E%D7%99%D7%AA_%D7%A2%D7%9D_%D7%A4%D7%90%D7%94_ebmvya.mov',
} as const;
