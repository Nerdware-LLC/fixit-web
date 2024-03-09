# Changelog

All notable changes to this project will be documented in this file.

---

# [1.3.0-next.14](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.13...v1.3.0-next.14) (2024-03-09)


### Bug Fixes

* add rounding to avg amount stat ([3218194](https://github.com/Nerdware-LLC/fixit-web/commit/32181949a672fdab2dbb7ca0d55a2cdb0e3897fc))
* add vi calls to mock system time ([c353282](https://github.com/Nerdware-LLC/fixit-web/commit/c3532829a2739984b9feb12a9bff9169a99da23a))
* impl milliseconds for test args ([9e68ce1](https://github.com/Nerdware-LLC/fixit-web/commit/9e68ce19284b2b5669177101947d65e120a924af))
* **sb:** add SelectProps type params to BasicDemo ([fdf6554](https://github.com/Nerdware-LLC/fixit-web/commit/fdf655442f2e24792f62f55194e1bad605b0f196))
* **ts:** add override ref prop type ([249875d](https://github.com/Nerdware-LLC/fixit-web/commit/249875d78d45bd01acaa85ceff7718cfca022d45))
* update calculate.test for ci ([a3bf0bb](https://github.com/Nerdware-LLC/fixit-web/commit/a3bf0bb6523321c08beddb09ff14f7ec65c6c4ce))


### Features

* add https://sentry.io to trusted-types policy ([604384c](https://github.com/Nerdware-LLC/fixit-web/commit/604384cd62b87ac735b9a4ae7977b38024ee1bd1))
* reduce traces sample rate from 1 to 0.5 ([ed54796](https://github.com/Nerdware-LLC/fixit-web/commit/ed5479653f947cab5445a602a80eb79f1201aaef))
* **sb:** add PickANumber Select story ([5b0770b](https://github.com/Nerdware-LLC/fixit-web/commit/5b0770b664ff0bb0d45d2b556c07a6cd08c2415b))

# [1.3.0-next.13](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.12...v1.3.0-next.13) (2024-03-07)


### Features

* enable logging 4xx errs in staging ([0af7276](https://github.com/Nerdware-LLC/fixit-web/commit/0af72762a7661abc1c07c77b70b692b03e068999))

# [1.3.0-next.12](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.11...v1.3.0-next.12) (2024-03-06)


### Features

* enable Apollo dev tools in staging ([377cef8](https://github.com/Nerdware-LLC/fixit-web/commit/377cef81d52459f331da7f13e86f6176a2306682))
* enable Sentry logging in staging env ([60153e8](https://github.com/Nerdware-LLC/fixit-web/commit/60153e8c67257fcc01eaecec20fcbb546d428a39))

# [1.3.0-next.11](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.10...v1.3.0-next.11) (2024-03-05)


### Features

* config Sentry to use tunnel '/sentry-proxy' in staging/prod ([d146cdc](https://github.com/Nerdware-LLC/fixit-web/commit/d146cdc71f44afec97a0de6f5e0adae4c2900232))
* ignore 'CanceledError' from abortController.abort() invocation ([207cd47](https://github.com/Nerdware-LLC/fixit-web/commit/207cd47b1f87acb387f808074085ff6139ecdc59))

# [1.3.0-next.10](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.9...v1.3.0-next.10) (2024-03-04)


### Bug Fixes

* add DOMPurify script integrity sha, update v to 3.0.9 ([af6a53a](https://github.com/Nerdware-LLC/fixit-web/commit/af6a53a3543b2d9834cdde755b9104f69ace1cbf))

# [1.3.0-next.9](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.8...v1.3.0-next.9) (2024-03-04)


### Features

* add axios default 'withCredentials:true' ([6a609a2](https://github.com/Nerdware-LLC/fixit-web/commit/6a609a2f97ed51146714855549c499fd76afa6b6))
* add config param to httpService methods ([d6f4a25](https://github.com/Nerdware-LLC/fixit-web/commit/d6f4a25b2e2d8c0a8e7753f7ec78774c1a9af167))
* add explicit gofixit.app domain+subdomains to traceProp targets ([150a39e](https://github.com/Nerdware-LLC/fixit-web/commit/150a39e42b883b7e8ca896d20cbbf37e701424f3))
* add trustedTypes default policy ([37a31d4](https://github.com/Nerdware-LLC/fixit-web/commit/37a31d4edd3ea0b982f732ab6ae980cb062d8f78))

# [1.3.0-next.8](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.7...v1.3.0-next.8) (2024-03-01)


### Features

* enable DevTools in AppBar by default ([f161525](https://github.com/Nerdware-LLC/fixit-web/commit/f161525604863c1e42efa1bdff2817f5899abb59))

# [1.3.0-next.7](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.6...v1.3.0-next.7) (2024-02-22)


### Features

* add API_HOSTS_BY_MODE ([9b5f61c](https://github.com/Nerdware-LLC/fixit-web/commit/9b5f61c865e29dfaecb887da56bb5d00bb92732f))
* add env VITE_ENABLE_DEV_TOOLS ([007e55e](https://github.com/Nerdware-LLC/fixit-web/commit/007e55ea5aa6a892710903b693c5c955101c8ed2))
* add handleAuthRefresh to pageRefresh logic ([319daa3](https://github.com/Nerdware-LLC/fixit-web/commit/319daa3fbcc68be0dc79b6453122756ab0810e62))

# [1.3.0-next.6](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.5...v1.3.0-next.6) (2024-02-22)


### Features

* add abortController for req cancels ([4264c83](https://github.com/Nerdware-LLC/fixit-web/commit/4264c835c6485c1f4c5e6e6c9bbdb2806cc2f114))
* add NON_BREAKING_SPACE_CHAR ([931360f](https://github.com/Nerdware-LLC/fixit-web/commit/931360f053fa2f6125e90d699feaceaf027eb9f3))
* add useHandlePageRefresh to stop refreshes ([ce92f02](https://github.com/Nerdware-LLC/fixit-web/commit/ce92f02bcb7d22c9554cb40883350c9966a323fe))

# [1.3.0-next.5](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.4...v1.3.0-next.5) (2024-02-21)

# [1.3.0-next.4](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.3...v1.3.0-next.4) (2024-02-21)


### Bug Fixes

* rm console.warn block, set default env-var values ([c494975](https://github.com/Nerdware-LLC/fixit-web/commit/c494975842abc0ba42fce68cc7d18e2faa0668f7))

# [1.3.0-next.3](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.2...v1.3.0-next.3) (2024-02-21)


### Features

* bump engines.node to v20 ([c163c95](https://github.com/Nerdware-LLC/fixit-web/commit/c163c958758a5d7cbf2adc935e6a1c6e5163a34a))

# [1.3.0-next.2](https://github.com/Nerdware-LLC/fixit-web/compare/v1.3.0-next.1...v1.3.0-next.2) (2024-02-20)


### Bug Fixes

* add [@font-face](https://github.com/font-face) styles to fix font vertical alignment issues ([5e261c5](https://github.com/Nerdware-LLC/fixit-web/commit/5e261c5a13c8e87cf801a673d8ebbc7082bcacbe))
* correct .vscode dir ignore pattern ([95c616f](https://github.com/Nerdware-LLC/fixit-web/commit/95c616f65157e67fb0dc08cc60468d4836a0557f))
* correct err-log logic, rm unused namespaces ([340e1fc](https://github.com/Nerdware-LLC/fixit-web/commit/340e1fcec59140c560f230aa75a2be9bd7580fa2))
* correct FormProps type param handling ([874cb90](https://github.com/Nerdware-LLC/fixit-web/commit/874cb90ccb1860ade30b0635c2b9e680a9164477))
* correct playLottie logic to achieve desired play behavior ([e375a88](https://github.com/Nerdware-LLC/fixit-web/commit/e375a88e8d905503d3f356e489013c64c9831713))
* correct props typing, add jsdoc ([a43121f](https://github.com/Nerdware-LLC/fixit-web/commit/a43121f12d33e70d1725f508f8ab1c0729520243))
* correct style syntax for preferred scroll behavior ([3f743eb](https://github.com/Nerdware-LLC/fixit-web/commit/3f743ebf088324431b52c90ba7778af53c548e5d))
* correct styles to achieve desired aesthetic ([f968ed8](https://github.com/Nerdware-LLC/fixit-web/commit/f968ed86b8ec2edceb121117141acf7a9c51c901))
* correct svg import syntax to use SVGR ?react suffix ([373b96f](https://github.com/Nerdware-LLC/fixit-web/commit/373b96f79ff48397bb9bdd12cbd8d69cd483b3b1))
* correct syntax for setting default font ([0b0dab7](https://github.com/Nerdware-LLC/fixit-web/commit/0b0dab7c666ef95ff8216ae9cf16519e5986bc8b))
* ensure className prop is properly handled ([ac1b39c](https://github.com/Nerdware-LLC/fixit-web/commit/ac1b39c398523113149b9a9ca21d5caa5c47cab5))
* impl gqlInfo namespace, rm old eslint directives ([e780362](https://github.com/Nerdware-LLC/fixit-web/commit/e7803624da129edfebe4e78c8c5573b91d5eeef4))
* improve THEMES typings ([0d9bb16](https://github.com/Nerdware-LLC/fixit-web/commit/0d9bb16c48c5047d438b6e7ff2512f85d0d32c78))
* rm extraneous deepCopy util ([e16ab80](https://github.com/Nerdware-LLC/fixit-web/commit/e16ab80c7cf3ffec63201cb0b91c6616367598a6))
* rm old storage util now in src/stores/ ([313cd2c](https://github.com/Nerdware-LLC/fixit-web/commit/313cd2c80ff2f5a255c053e0c9c20b0631a41d52))
* update exports to reflect file changes ([c78ade4](https://github.com/Nerdware-LLC/fixit-web/commit/c78ade4448e6ed3102389fbfdf514c8434b269d0))
* update gql import path from '[@graphql](https://github.com/graphql)' to '@/graphql' ([88de3a2](https://github.com/Nerdware-LLC/fixit-web/commit/88de3a2e28372c79a85c94713488e7a0f4a55d03))
* update import paths to use '@/*' ([90dbb3a](https://github.com/Nerdware-LLC/fixit-web/commit/90dbb3aec612b892e8e01f1bb2be1c8e3d25ce56))
* update import paths to use '@/*' ([6f01796](https://github.com/Nerdware-LLC/fixit-web/commit/6f017969047bcd723c5ff08806fe810c8aeca6f5))
* update TP exports ([de0f108](https://github.com/Nerdware-LLC/fixit-web/commit/de0f1084142c8fdbe0a3af8acd140d3e8e0cba51))


### Features

* add 'stepContent' classNames to exported obj ([32cc139](https://github.com/Nerdware-LLC/fixit-web/commit/32cc1396ea6050fdef2f3daf69cdde4f8db77e45))
* add `| SVGElement` to type constraint of T ([ce8cf20](https://github.com/Nerdware-LLC/fixit-web/commit/ce8cf20ffb6217503b72feef70a4387574427cf2))
* add base StyledChip comp for core-item chips ([d15d4ff](https://github.com/Nerdware-LLC/fixit-web/commit/d15d4ff452b00b793627cf875eab17426a09f861))
* add better prop handling ([bfe5882](https://github.com/Nerdware-LLC/fixit-web/commit/bfe5882baa1c298d4275751adc3bddeabdeb3194))
* add ButtonLoadingIndicator ([36bfec5](https://github.com/Nerdware-LLC/fixit-web/commit/36bfec511fab7566376c4a3534164bd8b6823d45))
* add comp exports to Navigation module ([f940de0](https://github.com/Nerdware-LLC/fixit-web/commit/f940de021f2ef489035bb751b60da6d895bdd5dc))
* add DataGrid helpers to simplify props formation ([b86fbf8](https://github.com/Nerdware-LLC/fixit-web/commit/b86fbf8e30bccc56d6c8a6c7d59830c3f1b6f83b))
* add dayjs setup side effect file ([39a5a14](https://github.com/Nerdware-LLC/fixit-web/commit/39a5a14c7e5ade587226d913b26fd86f3ab71fab))
* add dayjs type-safety utils ([3e57aa6](https://github.com/Nerdware-LLC/fixit-web/commit/3e57aa65361116ca0ec7dc39e0f45bc0cf4c7c0a))
* add DevTools components ([b1d60c5](https://github.com/Nerdware-LLC/fixit-web/commit/b1d60c54ac35aae68ecfbdf7243ce42cd0f73674))
* add dir for all DataGrid slots/ ([7c7f9cd](https://github.com/Nerdware-LLC/fixit-web/commit/7c7f9cd5da443af20edbd2090a1c7f387a640a0d))
* add export of App comp from app/ module ([be63651](https://github.com/Nerdware-LLC/fixit-web/commit/be63651fcedc211f80a89d5c72dec9b1eb977605))
* add export of DataDisplay classNames ([d2967fb](https://github.com/Nerdware-LLC/fixit-web/commit/d2967fb628de5f4dc9c119700dd9d286d2b31ab1))
* add export of static elementIDs for Dialog ([fa2acfe](https://github.com/Nerdware-LLC/fixit-web/commit/fa2acfe7ce61ace8a95fc265f39232e76778cf45))
* add exports of DataGrid classNames ([88f9be4](https://github.com/Nerdware-LLC/fixit-web/commit/88f9be4cc4fe4602a4809d43e250b162840c9545))
* add exports of Intl.NumberFormat objects ([17ae491](https://github.com/Nerdware-LLC/fixit-web/commit/17ae491f7df7831bf24f2402d115b4654de764ed))
* add fwd ref, rm unused JSX exports ([0daf0ce](https://github.com/Nerdware-LLC/fixit-web/commit/0daf0ceb193a9f0904a1def41f8d954a6920ffa8))
* add getMuiPaperStyles helper fn ([5b15db9](https://github.com/Nerdware-LLC/fixit-web/commit/5b15db964aca118472486c71d5917801e5ab3ef9))
* add impl of ItemsPerMonthChart for INVs ([3b42a35](https://github.com/Nerdware-LLC/fixit-web/commit/3b42a35fa9b6366fe87beb52253cefd4b6cb1202))
* add impl of ItemsPerMonthChart for WOs ([b46df7e](https://github.com/Nerdware-LLC/fixit-web/commit/b46df7e98a4949a7b3e42602926938c932c41977))
* add index file to Indicators module ([3ab8c71](https://github.com/Nerdware-LLC/fixit-web/commit/3ab8c7149b833fe06bf388c1af1753b96c4170f5))
* add LeadingDotsSpan comp ([d284b51](https://github.com/Nerdware-LLC/fixit-web/commit/d284b5113584a5633a2db645bd1aad0261104c59))
* add LP img assets and Carousel comp ([56b01a6](https://github.com/Nerdware-LLC/fixit-web/commit/56b01a6f19ab7f77ec53a9310dc2ad0a9aed2d32))
* add NavLink comp, wraps RRD Link comp ([6c4fe9b](https://github.com/Nerdware-LLC/fixit-web/commit/6c4fe9b42c32f29bcd9760eb2368630524b605dc))
* add NoMaxWidthTooltip component ([a149eca](https://github.com/Nerdware-LLC/fixit-web/commit/a149ecac4475fce2d52520fd94038e96f12f28e3))
* add NoWrapSpace Text component ([f69e74b](https://github.com/Nerdware-LLC/fixit-web/commit/f69e74bcc52e9d127a2d110a3acc116678389f3d))
* add numeric utils ([f05150c](https://github.com/Nerdware-LLC/fixit-web/commit/f05150cfdf43e913013ce2cfe926c22f0e27fe6e))
* add open-api codegen script and types ([759a476](https://github.com/Nerdware-LLC/fixit-web/commit/759a476e875fa060a55a51dfeee852f7c0c38311))
* add PaymentRequiredToast for 402 error handling ([b15abd5](https://github.com/Nerdware-LLC/fixit-web/commit/b15abd597c13fde16b3c4b5e4ac7a775083757e2))
* add PhoneShapedContainer comp ([3bb2537](https://github.com/Nerdware-LLC/fixit-web/commit/3bb2537f3166464aec806f5b0830edb6faf1610c))
* add RainbowBorderBox comp ([1eaef95](https://github.com/Nerdware-LLC/fixit-web/commit/1eaef95608800b6818f24e35d7fcb802f9b8c35d))
* add ReceiptShapedContainer comp ([95627c4](https://github.com/Nerdware-LLC/fixit-web/commit/95627c4b8b7772707f32d7e39236400a97ef1b61))
* add ref fwd, rm unused JSX exports ([185dede](https://github.com/Nerdware-LLC/fixit-web/commit/185dede56f8d1b0f8ea10e3b41490c78c5dba54f))
* add ref fwd, rm unused JSX exports ([4bac830](https://github.com/Nerdware-LLC/fixit-web/commit/4bac8301a2599905d5dd2d089ac464c9ab9733bc))
* add SearchUsers component ([05ff4cb](https://github.com/Nerdware-LLC/fixit-web/commit/05ff4cbea11d2418df3e4e6680096138e74fe2be))
* add static classNames exports ([30a0a12](https://github.com/Nerdware-LLC/fixit-web/commit/30a0a12d2196c1128328d6530537cfa6d37556e6))
* add string formatter utils ([3ab68f2](https://github.com/Nerdware-LLC/fixit-web/commit/3ab68f283f9b8593fddfad25d6d37b18724b573f))
* add Tabs,TabPanel to expand upon tab a11y props ([92b9447](https://github.com/Nerdware-LLC/fixit-web/commit/92b9447952ce504003cb2a094e7810024c6b9b34))
* add typedefs for react-swipeable-views-react-18-fix ([cae8ed3](https://github.com/Nerdware-LLC/fixit-web/commit/cae8ed38d75121a3b25541bdec8242d132d967f8))
* add useAppThemeObject hook ([14cd65b](https://github.com/Nerdware-LLC/fixit-web/commit/14cd65bb02b793bc708594a55b1d9db14b0dc6c7))
* add yup setLocale side effect file ([9f78fa9](https://github.com/Nerdware-LLC/fixit-web/commit/9f78fa97175df2b4471ee588660ebb82ea55bd4b))
* add+export types for PLC ([4453567](https://github.com/Nerdware-LLC/fixit-web/commit/445356711a85a77113c44ce734969cdc5258974f))
* centralize Checkout utils in helpers/ ([ce540f8](https://github.com/Nerdware-LLC/fixit-web/commit/ce540f88f22142a07a1ad48935922f50765edcd0))
* centralize List, list-items, virt-list, etc in comps/List ([9329831](https://github.com/Nerdware-LLC/fixit-web/commit/9329831977c36a565e1a1bc79660982cf8291c37))
* extract CoreItemsListViewContent into own file ([fb52fb3](https://github.com/Nerdware-LLC/fixit-web/commit/fb52fb3c0868e181ee0353d64edc93452e2970b9))
* fix imports, impl Form helpers ([9e2c981](https://github.com/Nerdware-LLC/fixit-web/commit/9e2c9817b8a9392025aeb59df9f7da82b7a3ee2c))
* fix scroll behavior, impl new stores+helpers ([e1a7f9d](https://github.com/Nerdware-LLC/fixit-web/commit/e1a7f9d5be494f9112e1017e88d696131929c1c0))
* impl and wrap [@nerdware](https://github.com/nerdware) getTypeSafeError ([51f3b70](https://github.com/Nerdware-LLC/fixit-web/commit/51f3b70080ad703742a0d141b33ae2e1804654db))
* impl BaseFormSubmitButton ([d2d84cc](https://github.com/Nerdware-LLC/fixit-web/commit/d2d84cc27ba03857f9b4bd07a349f7033307ba41))
* impl createBrowserRouter, add routes dict ([8cfc1bd](https://github.com/Nerdware-LLC/fixit-web/commit/8cfc1bd6ed4bb262322ba76f9afba5ed175234bd))
* impl helpers, memoize contextValues ([5f99a30](https://github.com/Nerdware-LLC/fixit-web/commit/5f99a30c640a40ae573623c347a7e36279b341c4))
* impl helpers,constants,stores ([abc858e](https://github.com/Nerdware-LLC/fixit-web/commit/abc858eebc94aacd2f61d9e36bd6f35c0f193c72))
* impl new helpers and slots ([98c7097](https://github.com/Nerdware-LLC/fixit-web/commit/98c70971a9b9dec6e39a804fb850b3e73a6f9ecb))
* impl new Tabs comp+helpers, fix props type ([78cbfbc](https://github.com/Nerdware-LLC/fixit-web/commit/78cbfbcbe5eaf187fd470b42685ee3a649b41db1))
* impl open-api types, add services helpers ([c4a67c4](https://github.com/Nerdware-LLC/fixit-web/commit/c4a67c42d0b55e1634b0c13b8093541d1ac23d97))
* impl route-constants, update import paths ([235ebc9](https://github.com/Nerdware-LLC/fixit-web/commit/235ebc9df430dffaa1502075e1f61c225daffcc2))
* memoize globalStyles, impl new helpers+types ([452ca0e](https://github.com/Nerdware-LLC/fixit-web/commit/452ca0ef8d2a612d12f1c05a40baafcc32ca1a80))
* mv all Form inputs into comps/Form/inputs/ ([fc31230](https://github.com/Nerdware-LLC/fixit-web/commit/fc31230a891eab4df78dec725c532f902d8ab26a))
* mv pages/Invoices/ListView to pages/InvoicesListView, update ListView args ([f322b81](https://github.com/Nerdware-LLC/fixit-web/commit/f322b814b12f106c3be44412ce314bf563c8912f))
* overhaul CheckoutPage imports,helpers,styles ([645ad62](https://github.com/Nerdware-LLC/fixit-web/commit/645ad627f6eb9d634a54b89377267d3e29e3f497))
* overhaul LP to include more product txt+images ([c1bf2ea](https://github.com/Nerdware-LLC/fixit-web/commit/c1bf2ea91eaa40626f99f2044f27e7ddd11771ab))
* replace ItemEventsTimeline w flexible Timeline comp ([59494f4](https://github.com/Nerdware-LLC/fixit-web/commit/59494f4d4e3cf9a5e788b9374b55004e5aac12a1))
* replace old StripeCardInput w StripePaymentInput ([325a3d4](https://github.com/Nerdware-LLC/fixit-web/commit/325a3d4e3ceee4b14d7a3e58bdaca5030fe2fcad))
* replace PROMO_CODES env-var w api-query input ([b276276](https://github.com/Nerdware-LLC/fixit-web/commit/b2762763da1bdb7ce750440b7b03336cb5b20c9f))
* rm mv'd FetchState files (now in app/) ([14b577a](https://github.com/Nerdware-LLC/fixit-web/commit/14b577a904486c8b1ee42dc4971fedeea4609bbc))
* rm old 'routers/' files (now 'routes/') ([e35231f](https://github.com/Nerdware-LLC/fixit-web/commit/e35231f3c4e6440114bd5b23a910437bda0a66be))
* rm old comps/Inputs (now in Form/inputs) ([948c303](https://github.com/Nerdware-LLC/fixit-web/commit/948c303be640e5187205daeb6341a7a6b254a624))
* rm old InvoiceWorkOrderInfo comp ([3170f87](https://github.com/Nerdware-LLC/fixit-web/commit/3170f87a39947bf5e3175d610a21bfdd89e4b12e))
* rm old list-item comp (now in comps/List/) ([4723072](https://github.com/Nerdware-LLC/fixit-web/commit/4723072a488d6ba8a7ccdb527e0c04850ceb7334))
* rm old UserAvatar comp ([258945c](https://github.com/Nerdware-LLC/fixit-web/commit/258945cbb6fa4313765fe2df6227afaf910e4b00))
* rm old virt-list comp (now in comps/List/) ([3d874c8](https://github.com/Nerdware-LLC/fixit-web/commit/3d874c85695827ee02af981acf8985bababb878b))
* rm service-related hooks ([f40ea79](https://github.com/Nerdware-LLC/fixit-web/commit/f40ea79a26212e22a27ebff556ab312a56bdabb3))
* rm StripeBadge (now in Branding/) ([4089c4a](https://github.com/Nerdware-LLC/fixit-web/commit/4089c4ab629d12692ea62510a0f30be2b321c138))
* rm tab helpers (now in comps/Tabs/) ([acc0cc4](https://github.com/Nerdware-LLC/fixit-web/commit/acc0cc40abfc427c5f5e8e88ac7c9f36be49f23e))
* rm types/UserLogin (open-api types used instead) ([f23542a](https://github.com/Nerdware-LLC/fixit-web/commit/f23542a7a8e152fe658290434d13cf1a25b92bf9))
* rm unused classNames export ([4fbecd6](https://github.com/Nerdware-LLC/fixit-web/commit/4fbecd6e5fba96a023fd71e6f2d6aa0cddd2f25a))
* rm useEffect, impl route constants ([a0b38c4](https://github.com/Nerdware-LLC/fixit-web/commit/a0b38c4661aefd399a5bc41244d13778bc2fb7fe))
* rm utils covered by [@nerdware](https://github.com/nerdware) utils pkgs ([cf8e2bc](https://github.com/Nerdware-LLC/fixit-web/commit/cf8e2bc46fdecdaebcf0b807c0f1d351f8a155ca))
* split comps into own files, impl new helpers ([2dc574d](https://github.com/Nerdware-LLC/fixit-web/commit/2dc574dd04f5fc7c177c68f9a0fac14b414b5142))
* split FormSubmitButton styled comp into own comp ([f699132](https://github.com/Nerdware-LLC/fixit-web/commit/f699132309445fe00aff437f789c0a41f57b81a0))
* split PageContainer into RootAppLayout, useAuthRefresh, and AppBar ([a00b3a7](https://github.com/Nerdware-LLC/fixit-web/commit/a00b3a7e807f42fd196eaa3500dd38180ff02fed))
* update App structure, add jsdoc ([2081bd6](https://github.com/Nerdware-LLC/fixit-web/commit/2081bd68ba3b3cd1fe8930740109358b6afc7a78))
* update codegen'd GQL types to reflect current schema ([a211de5](https://github.com/Nerdware-LLC/fixit-web/commit/a211de5aa8523a5056102ffb72ec232cac464ea6))
* update comp to provide props req'd for PaymentInput ([b56bfc6](https://github.com/Nerdware-LLC/fixit-web/commit/b56bfc6434b759736b13cb89972295e1ede17eee))
* update EB to use Sentry, static classNames ([ab4053c](https://github.com/Nerdware-LLC/fixit-web/commit/ab4053ca8f2f2bad35cfb99850db8b03f0941149))
* update Form module exports ([401329e](https://github.com/Nerdware-LLC/fixit-web/commit/401329e3833aab05912eb3e6a688f70f8042e12e))
* update GQL local schema file to current ([b65dca6](https://github.com/Nerdware-LLC/fixit-web/commit/b65dca637a44538153f30e5c15d5efc1ace59c5b))
* update import paths, impl form+route helpers, rm old styles ([b042f03](https://github.com/Nerdware-LLC/fixit-web/commit/b042f03f7967ceb9408cccaa9ad6cf85ba198df6))
* update import paths, rm old styles ([fbaca17](https://github.com/Nerdware-LLC/fixit-web/commit/fbaca174709f15a366e4c792b697d1becf3fa648))
* update imports, impl new helpers ([b2f6a2b](https://github.com/Nerdware-LLC/fixit-web/commit/b2f6a2bcd24939017ff0533bf4393d46fcd171df))
* update page to use new Widgets,helpers,classes ([a1ae748](https://github.com/Nerdware-LLC/fixit-web/commit/a1ae7487eba383f306aef3bf7ff3d1f3c19070dc))
* update PageNotFound styles,layout ([a63432e](https://github.com/Nerdware-LLC/fixit-web/commit/a63432ee0d334fb248a1365f531adbf74a676bb4))
* update Sentry to use RRv6 int, new config api ([ba7eee0](https://github.com/Nerdware-LLC/fixit-web/commit/ba7eee0291c0ab3d0031e276147a8725229802b4))

# [1.3.0-next.1](https://github.com/Nerdware-LLC/fixit-web/compare/v1.2.2...v1.3.0-next.1) (2023-07-09)


### Bug Fixes

* add 'handle' to RegisterNewUser form+type+etc ([18bf2f8](https://github.com/Nerdware-LLC/fixit-web/commit/18bf2f8dc15ce3f395f3b32db3b41bdc8342204a))
* add 'isActiveAccountStore' read, if false nav to /products not /home ([a06bb52](https://github.com/Nerdware-LLC/fixit-web/commit/a06bb527d8adbd5c489b093e2e0226ac0cd5fbff))
* add 'key' prop to map'd elements ([83388dc](https://github.com/Nerdware-LLC/fixit-web/commit/83388dc2b098a51dc8c6229f92c856a9dbc0dc31))
* add 'showDialog' to props ([944bb23](https://github.com/Nerdware-LLC/fixit-web/commit/944bb23a0d2811c863f007b6f8d8a75677e6dfa9))
* add 'User' prefix to sca fragment to match schema ([a159f58](https://github.com/Nerdware-LLC/fixit-web/commit/a159f5857a3f50039789641d95bda423f24db2e7))
* **cache:** correct logic for list-query caching+merging ([0edd257](https://github.com/Nerdware-LLC/fixit-web/commit/0edd257f81fb3cadcb26427476d67361a351c5db))
* **chart:** add min y-axis value to prevent decimal tick-labels ([71af378](https://github.com/Nerdware-LLC/fixit-web/commit/71af378f9af2f5692d9f31f16fe67a3f23b83399))
* ensure 'handleWindowResize' updates context when user-agent changes ([9e15ebb](https://github.com/Nerdware-LLC/fixit-web/commit/9e15ebb895d4e4c35bb9118bc206bdfdbac9e9b9))
* ensure 'name' doesnt render 'null' str ([d535d70](https://github.com/Nerdware-LLC/fixit-web/commit/d535d7088ef7173f74b015e29c1cfa9c535c3024))
* ensure 'selectedSubscription' value is init'd on mobile ([b95b179](https://github.com/Nerdware-LLC/fixit-web/commit/b95b17902b0633a917d4732469bc0a7ad3cf73b4))
* ensure default viewContact logic is skipped if contact.id matches user ([043b1fb](https://github.com/Nerdware-LLC/fixit-web/commit/043b1fb0709eebdc2934a211d2b88662cfc1578d))
* ensure Intl objs aren't inst'd on each fn call ([f6a6be5](https://github.com/Nerdware-LLC/fixit-web/commit/f6a6be5762931f189c6f2519033aa0b1c11b732e))
* ensure mobile tabs never show in TABLE view, update a11y props ([b6d9939](https://github.com/Nerdware-LLC/fixit-web/commit/b6d9939a070d9168f64f471c6f657088ec2ed845))
* ensure mock item id's don't contain 'CONTACT#' ([b997a65](https://github.com/Nerdware-LLC/fixit-web/commit/b997a65ed4ac4e86c7c32cc00f88ab0ff1ba7561))
* ensure SearchUsers query uses ContactFields fragment ([92a2333](https://github.com/Nerdware-LLC/fixit-web/commit/92a233398402869de76329af814587322a6c0dc2))
* ensure some tick-labels hide on small viewports, add year ([6057798](https://github.com/Nerdware-LLC/fixit-web/commit/6057798f0bacab9af6601c3111b61f1274338d24))
* ensure TextField value is empty string if nullish ([38ed24c](https://github.com/Nerdware-LLC/fixit-web/commit/38ed24ce125d7b5ead4d8be7d4adacf920029ad2))
* export all from Buttons ([0d24694](https://github.com/Nerdware-LLC/fixit-web/commit/0d24694dc8ff2717b548dc4ba85e8fef8fa018b0))
* export raw WO+Inv-related icons for better styling ([af312bf](https://github.com/Nerdware-LLC/fixit-web/commit/af312bfac2d8e310b940aa0af3d265a7556b5cf4))
* implement safeJsonStringify ([17bc2f6](https://github.com/Nerdware-LLC/fixit-web/commit/17bc2f6329aff6afb0846b53bec79490aefde68d))
* **mobile-style:** ensure page scrolls on mobile ([1e40454](https://github.com/Nerdware-LLC/fixit-web/commit/1e4045408a4bb91d779d1ba1806d3829a5a5e3be))
* **mocks:** update mocks to reflect nullable GQL types ([327c467](https://github.com/Nerdware-LLC/fixit-web/commit/327c467600ea8e0b230c6ce317238d1eb4b65c2a))
* pass 'backgroundIcon' prop into EmptyListFallback ([f91f098](https://github.com/Nerdware-LLC/fixit-web/commit/f91f098f2f08ba1535e6771bc62b8e434fa2c164))
* provide 'onClick' prop to styled container for cursor styling ([216a44a](https://github.com/Nerdware-LLC/fixit-web/commit/216a44a6862980c9ad9e84bd3782a7933463f6ae))
* provide default selectedSub upon checkout in mobile ([b1173d0](https://github.com/Nerdware-LLC/fixit-web/commit/b1173d0adb0da1f2c3de6023d72f6f3fbbac3ff9))
* replace 'contacts' query name w 'myContacts' ([49e807f](https://github.com/Nerdware-LLC/fixit-web/commit/49e807f96e2c4c4762460e05dfcc42137fae56f0))
* replace 'mergeUpdate' w shallow-merge to not break Observable ([2baa88f](https://github.com/Nerdware-LLC/fixit-web/commit/2baa88f17f9d1f320910659211b48d6c35fbafab))
* replace dep'd JSX type namespace with React.JSX ([ade9549](https://github.com/Nerdware-LLC/fixit-web/commit/ade9549e123bde95234e8e2d9e1e1856611ff8b9))
* replace double-quotes w backtick str to ensure proper parsing of newline char ([72e300b](https://github.com/Nerdware-LLC/fixit-web/commit/72e300b1b93550df6736ef95b685a3858b1d52f2))
* replace inline destructure of apiResponse w conditional key option-chain check ([a346969](https://github.com/Nerdware-LLC/fixit-web/commit/a3469695231b6a073b099dc81f0c49ece52dce48))
* replace JSON.stringify w safeJsonStringify ([8e63047](https://github.com/Nerdware-LLC/fixit-web/commit/8e630477e8c2a3fd2c4e0bbf389ea5fcba7ccdd3))
* rm cache-only fetchPolicy ([a9d1f45](https://github.com/Nerdware-LLC/fixit-web/commit/a9d1f45b97f0ed0ead6e8ba9c1928b8454111956))
* rm console debug msg from localStorage util ([1f1a6da](https://github.com/Nerdware-LLC/fixit-web/commit/1f1a6da2fa0e7f06d89e8f9ded2eedccd56c75d4))
* rm duplicative export ([60f6210](https://github.com/Nerdware-LLC/fixit-web/commit/60f621010971822cc882591488a71deb443dd740))
* rm dynamic import DevModeTools ([58e3f05](https://github.com/Nerdware-LLC/fixit-web/commit/58e3f05f85118e0543043ddfe5d57618aaccad82))
* rm Node-env 'captureStackTrace' in PreFetchedItemError ([61a87ed](https://github.com/Nerdware-LLC/fixit-web/commit/61a87ed535063cff74227119f24d0efc95af1f79))
* rm old 'EncodedAuthToken' opaque type ([d8db58f](https://github.com/Nerdware-LLC/fixit-web/commit/d8db58f39cdc3d7c3edf49725088731edb5c5c6e))
* rm old 'localIndex' Symbol-handling logic ([baa8586](https://github.com/Nerdware-LLC/fixit-web/commit/baa85862cb33bbfad6084eac1431c27a1b47fa65))
* rm old isItemOwnedByUser nav-state handling ([be13d66](https://github.com/Nerdware-LLC/fixit-web/commit/be13d66933d94eb03f4fe63d28c2e8da1632e305))
* rm unnecessary 'extends unknown in DataParser type ([f34a145](https://github.com/Nerdware-LLC/fixit-web/commit/f34a145261ed9dcd23aa59a11fa439cf6a5d449d))
* **types:** correct ItemDataParser types used to make context values ([6bc7ffb](https://github.com/Nerdware-LLC/fixit-web/commit/6bc7ffb29bd4d2af9599d540d5dffe4ccd5eec31))
* **types:** correct reactiveVars typings ([b09f7dd](https://github.com/Nerdware-LLC/fixit-web/commit/b09f7dd02202f0595da8b82184d41e796e2dd8f1))
* **types:** mv 'WorkOrderWithUpcomingEvent' type to this comp ([8271b49](https://github.com/Nerdware-LLC/fixit-web/commit/8271b4908ff579ade76adf2cfebde7086751b232))
* update clear-mocks cache-mod to use DELETE sentinel obj ([9b5e046](https://github.com/Nerdware-LLC/fixit-web/commit/9b5e046f5c2f9295e93492b8faa4da03f0690633))
* update faker args to reflect pkg update ([a371ffc](https://github.com/Nerdware-LLC/fixit-web/commit/a371ffcfdf9ca9b76dd7db40e618438989ea3577))
* update GQL fragments+queries to reflect field changes ([364b859](https://github.com/Nerdware-LLC/fixit-web/commit/364b859409998ec87dd20743ee7fa5395fe0d383))
* update logger timestamps to use Dayjs format-strs ([4921b9c](https://github.com/Nerdware-LLC/fixit-web/commit/4921b9c0301d88785492f95bc0171436e74f8cec))
* update logic to add Auth header on req ([f8346e9](https://github.com/Nerdware-LLC/fixit-web/commit/f8346e97b76074d026f071dc99523d161ab39b52))
* update old jest references to vi ([4182577](https://github.com/Nerdware-LLC/fixit-web/commit/41825772d1f616a672d5a66177a1d006772f97cc))
* update regex to ensure currency amounts dont begin with 0 ([969fb03](https://github.com/Nerdware-LLC/fixit-web/commit/969fb035d9a8b8c1bf63b81270c24397bda76f97))
* update stats key from 'TOTAL' to 'SUM' ([c1d818e](https://github.com/Nerdware-LLC/fixit-web/commit/c1d818e279fd134c76cbfcf3809b4f3142be119d))
* update types exports ([6bfd6c5](https://github.com/Nerdware-LLC/fixit-web/commit/6bfd6c585e69d0df5e818cd674ab99fa3a1186d1))
* use dayjs for proper timestamp formatting ([c235b5f](https://github.com/Nerdware-LLC/fixit-web/commit/c235b5f1f3923391bb31312a2d99d64499a3b640))


### Features

* **a11y:** add a11y props 'role' and 'aria-label' ([a2ea93b](https://github.com/Nerdware-LLC/fixit-web/commit/a2ea93b3c5401c1220be82d83dafdde1643ed782))
* add 'craco' for path aliasing ([1dd39a6](https://github.com/Nerdware-LLC/fixit-web/commit/1dd39a688b2a7a108a0978ebdb6ad6d73e1b7843))
* add 'createdAt' and 'updatedAt' fields to AuthTokenPayload ([e79ed5a](https://github.com/Nerdware-LLC/fixit-web/commit/e79ed5aba100fcffa1037febca023cc945851868))
* add 'deepCopy' util ([10107f1](https://github.com/Nerdware-LLC/fixit-web/commit/10107f14d0f8a4dc59a4be8048010ee581eda7e0))
* add 'ItemDetailsGroup', rm nestability of 'ItemDetails' ([dc9e623](https://github.com/Nerdware-LLC/fixit-web/commit/dc9e623b757c5a7beac8be1d36c19cb071ad7be3))
* add 'json' to EOL fixer for Lotties ([d742c58](https://github.com/Nerdware-LLC/fixit-web/commit/d742c589227ca51e8c5715693c467a3c43b6175d))
* add 'license' property ([0685ab9](https://github.com/Nerdware-LLC/fixit-web/commit/0685ab90f60311b505eb3d6f3188dbdf697e2a83))
* add 'mergeUpdate' override to merge nested props ([0e87df1](https://github.com/Nerdware-LLC/fixit-web/commit/0e87df144b831681c3abb356dfcb43d92eb55db8))
* add 'MODE' to 'ENV' object ([f7acb26](https://github.com/Nerdware-LLC/fixit-web/commit/f7acb26c2868d0e953954bf949364a663fe4c5dd))
* add 'setDefaultIfEmpty' ([efe94f9](https://github.com/Nerdware-LLC/fixit-web/commit/efe94f9c600687c7f2a4d85a624ded59d039e2f4))
* add 'svg' to EOL fixer exclude_types ([1012e25](https://github.com/Nerdware-LLC/fixit-web/commit/1012e250b5254139b6a746450632f277015a7b0f))
* add 'tableProps' to core item list views ([f1546be](https://github.com/Nerdware-LLC/fixit-web/commit/f1546be521d4f5bc0b25f153463886366e579c7d))
* add 'Tabs' to list of comps exports ([65d5e0a](https://github.com/Nerdware-LLC/fixit-web/commit/65d5e0af43f6dacb98105bbf88c81b2ab7950ea3))
* add 'Tabs' with a11y comps+utils ([96e9da5](https://github.com/Nerdware-LLC/fixit-web/commit/96e9da50899642a7b800c675de33262e8560f313))
* add 'XscrollContainer' for easy horizontal scrolling ([6a1b728](https://github.com/Nerdware-LLC/fixit-web/commit/6a1b7288f2cd4bd22df72559df361786966d4ea1))
* add 'yupCommonSchema' formUtils ([f5bfc05](https://github.com/Nerdware-LLC/fixit-web/commit/f5bfc05ea03dab0a2e089a661b995ed766813c51))
* add ability to pass props to Loading comp ([d073b8e](https://github.com/Nerdware-LLC/fixit-web/commit/d073b8ee6a954bb3fabe68c5fe0d8ebe3e4f455a))
* add AddressCardIcon ([e02cc33](https://github.com/Nerdware-LLC/fixit-web/commit/e02cc3301e2f0fd4e4b3eea2f53e4a4365ef217d))
* add authenticatedUserStore reactive var ([a868cfb](https://github.com/Nerdware-LLC/fixit-web/commit/a868cfb3229965a8794083240fec735e1a860a7b))
* add Autocomplete,DatePicker,Select,Slider,PWinput ([94438e4](https://github.com/Nerdware-LLC/fixit-web/commit/94438e48afd534a0b1d13450de72d8b751337d05))
* add better prop typing ([7e25b3f](https://github.com/Nerdware-LLC/fixit-web/commit/7e25b3fc97f06ec93b03093ad75cd7ff56ff806c))
* add better typings for authService method params ([6d5f282](https://github.com/Nerdware-LLC/fixit-web/commit/6d5f28275e06ea8633305c6cfd5063cbb8cc3448))
* add better typings for MUI theme ([3f51933](https://github.com/Nerdware-LLC/fixit-web/commit/3f519332f10d7458bc1809092ddda590f58b947a))
* add BrowserTracing to Sentry config ([234c0bb](https://github.com/Nerdware-LLC/fixit-web/commit/234c0bb94fa6803d557b9be76114e419e110be46))
* add btn to open GoogleMaps at location ([48d15a8](https://github.com/Nerdware-LLC/fixit-web/commit/48d15a8fff77e920c48425a565374776dd722fb7))
* add ChecklistContainer to comps ([e93865a](https://github.com/Nerdware-LLC/fixit-web/commit/e93865ae13d2b4350c99483fbcc70b088772d9ba))
* add checkoutValues storage token ([4217de3](https://github.com/Nerdware-LLC/fixit-web/commit/4217de304618f4144c37327596ce5c9183b00cbc))
* add codegen config for gql-related TS types ([fae079f](https://github.com/Nerdware-LLC/fixit-web/commit/fae079f7acbb955dfe6fc2822f1e181804e4e029))
* add codegen types ([29681d5](https://github.com/Nerdware-LLC/fixit-web/commit/29681d52b1f4f8c0fc543c4e645c445736f583b1))
* add codegen-made files to 'exclude' regex for EOL hook ([6672a43](https://github.com/Nerdware-LLC/fixit-web/commit/6672a43f70fdc1aaf86fe1244fc186972e2f40e5))
* add CoreItemView layout + WO+Inv+Contact item pages ([095eaa5](https://github.com/Nerdware-LLC/fixit-web/commit/095eaa59e45d4271952108dadc12e74c7ab50119))
* add CoreItemView layout, migrate WOs+INVs item views ([337b2dc](https://github.com/Nerdware-LLC/fixit-web/commit/337b2dc3b246f6e0af4a24f1fd6168432b1f4ead))
* add dateTime utils ([a5336cf](https://github.com/Nerdware-LLC/fixit-web/commit/a5336cfb82ec1a16e2dc870ef275d993807628d3))
* add default prop showLabel=true for BottomNav Mui Tabs ([fde2b4b](https://github.com/Nerdware-LLC/fixit-web/commit/fde2b4b908d45865cc070c83fdb1ca57ad37260a))
* add default props+styles to Mui Tab+Tabs comps ([989ad63](https://github.com/Nerdware-LLC/fixit-web/commit/989ad630d3b823166af10547df9481a16c38183a))
* add DevModeTools ([a5b3fea](https://github.com/Nerdware-LLC/fixit-web/commit/a5b3feac8a148cfdcff4b8ffd8c1875b21eb9009))
* add displayName to ToggleButtonWithTooltip ([bd8db3a](https://github.com/Nerdware-LLC/fixit-web/commit/bd8db3adb253ed45c60fb2e8564f274d5f57f79a))
* add effect to close popper on esc-press ([9c2ed5a](https://github.com/Nerdware-LLC/fixit-web/commit/9c2ed5ab2bc206655053a465214248ea21921423))
* add exports of new comp dirs ([042737d](https://github.com/Nerdware-LLC/fixit-web/commit/042737d0d1119bedad23972dde80c012cfd5af96))
* add fallback 'themeName' as a safety precaution ([2837cd8](https://github.com/Nerdware-LLC/fixit-web/commit/2837cd8e0c2411284ba50114ef9f3d06bb91e175))
* add FixitUser type, add 'handle' to User+Contact ([7b63e98](https://github.com/Nerdware-LLC/fixit-web/commit/7b63e98a45f65f745c04e100ced857ce6db28498))
* add FormFieldHandlers form util ([b2bc0d3](https://github.com/Nerdware-LLC/fixit-web/commit/b2bc0d38b225e5203a40f400517780280c02fc87))
* add FormView for WOs+Invs+Contacts pages ([a922353](https://github.com/Nerdware-LLC/fixit-web/commit/a922353ee00a336527ec89ff7ab480def30cb73d))
* add global style for scrollbars via webkit ([699836e](https://github.com/Nerdware-LLC/fixit-web/commit/699836ed0d4cf3825fddfeb7cae166ab7c8d0857))
* add grid-related Mui system props like 'gridArea' ([11b09cc](https://github.com/Nerdware-LLC/fixit-web/commit/11b09cc40ea24df0332e40f1095736032f9d40bc))
* add HomePageRoutes and StripeConnect state layer ([1aaf6cc](https://github.com/Nerdware-LLC/fixit-web/commit/1aaf6cc51feb19722cdc64ba790dae812fa533de))
* add Icons comp dir ([9d88a2d](https://github.com/Nerdware-LLC/fixit-web/commit/9d88a2dbc83d07d3f01b2ddaba3f2c80cd61564a))
* add ignore '.graphql' to EOL fixer hooks ([315d21d](https://github.com/Nerdware-LLC/fixit-web/commit/315d21d8bb6692459010596a00907113edfe8e0f))
* add init selected sub of TRIAL if unset ([72f6215](https://github.com/Nerdware-LLC/fixit-web/commit/72f62150d7d07b88c8c7f596d3c55f3ce8100c01))
* add init storage-values to ReactiveStore's with storage ([039272c](https://github.com/Nerdware-LLC/fixit-web/commit/039272c72aebc6b6068fa3afab9a7bbe298277f9))
* add JSON-parseability to stored values that use JSON ([a809f07](https://github.com/Nerdware-LLC/fixit-web/commit/a809f071c488fc687438382c18aaef32fbed9c39))
* add light/dark variants of secondary+error ([b2af180](https://github.com/Nerdware-LLC/fixit-web/commit/b2af180e48b606ef48f261a582dc237f2277f89f))
* add LinkToWorkOrder nav comp ([b13e7b3](https://github.com/Nerdware-LLC/fixit-web/commit/b13e7b3c78e2ecece803f1b6057b401eddd2485d))
* add ListHeader,CreateItemButton, update CILV ([b01090f](https://github.com/Nerdware-LLC/fixit-web/commit/b01090f04965cdbd948be16511b1b9ced7f9ce1c))
* add ListView for WOs+Invs+Contacts pages ([32fdc48](https://github.com/Nerdware-LLC/fixit-web/commit/32fdc4860166c0355c5faea2374fcbc555812645))
* add ListViewSettingsStore to replace state/reducers ([8d1836e](https://github.com/Nerdware-LLC/fixit-web/commit/8d1836ec3ae35a62584f77322583db0ef5f7d76b))
* add localization context wrapper ([ae042ec](https://github.com/Nerdware-LLC/fixit-web/commit/ae042eccb75e4f03d23e74523697b8031c65a9c9))
* add LocalizationProvider ([83e4733](https://github.com/Nerdware-LLC/fixit-web/commit/83e4733c796c9224534e3e3172320fee435304e8))
* add lottie-react package ([8066350](https://github.com/Nerdware-LLC/fixit-web/commit/806635040fd46e0a798c2b45a320791490978492))
* add LottieAnimations comp dir ([8ddfe5e](https://github.com/Nerdware-LLC/fixit-web/commit/8ddfe5e72f6c20d5eda0ce2941df3d725fa07e8a))
* add min+max height to header container ([87e20c0](https://github.com/Nerdware-LLC/fixit-web/commit/87e20c02d70cbf8a44adf6ce2c9d81c906fb827b))
* add more default opts ([81971dc](https://github.com/Nerdware-LLC/fixit-web/commit/81971dc1699059b412375720164b7370744bf0d5))
* add Mui x- comp theme aug imports here ([6ec791c](https://github.com/Nerdware-LLC/fixit-web/commit/6ec791c6cdbcdad014d9d3ae84564bc5ebe386a3))
* add myInvoices query-type which gets invs' WOs ([a105b50](https://github.com/Nerdware-LLC/fixit-web/commit/a105b50df4fd2767ceb56243e09bb15989e8f05a))
* add PageLayoutContext (mobile/desktop layout) ([4567fa3](https://github.com/Nerdware-LLC/fixit-web/commit/4567fa397d07d32f07b31eb0195c0d0772577445))
* add pages/Dashboard ([049036b](https://github.com/Nerdware-LLC/fixit-web/commit/049036ba0b048f57fa66189c5a37962a95f748f3))
* add pages/LandingPage ([b327723](https://github.com/Nerdware-LLC/fixit-web/commit/b3277237e1808651cf4a879b7978c54feb34ec50))
* add pages/MobileWebviewStripeBridge ([6adbee6](https://github.com/Nerdware-LLC/fixit-web/commit/6adbee6e3a5fdbbe5577fa9a199e23b7cba88159))
* add pages/ProfilePage ([5c7315a](https://github.com/Nerdware-LLC/fixit-web/commit/5c7315a9d48772302d353786b46b8706089e0c6c))
* add ProfileView layout + ProfilePage impl ([240a2e5](https://github.com/Nerdware-LLC/fixit-web/commit/240a2e5aec7fe556540111369246111478eb8af1))
* add re-export of reactive vars for back-compat path refs ([484832d](https://github.com/Nerdware-LLC/fixit-web/commit/484832dda5662b7a318b94ea56af2a0073d9cf6f))
* add ref fwd'ing to link comps for Mui Tooltips ([de1d2f2](https://github.com/Nerdware-LLC/fixit-web/commit/de1d2f27985083c74858426274c85ec3d3672ceb))
* add safeJsonStringify util ([76f1b23](https://github.com/Nerdware-LLC/fixit-web/commit/76f1b2356c2bf38122fd71007033873c9a306817))
* add src/layouts dir ([5cde053](https://github.com/Nerdware-LLC/fixit-web/commit/5cde053444c7e2cc393a726442bb48676fc36903))
* add styleOverrides for Mui AppBar,Avatar,Chip ([ce429ea](https://github.com/Nerdware-LLC/fixit-web/commit/ce429ea475230c442776db80b69c0127f60e0f34))
* add TermsOfServicePage ([fc578f2](https://github.com/Nerdware-LLC/fixit-web/commit/fc578f291ab8944249103678e6d0ee494100737c))
* add Tooltip to Avatar comps, lower css select specificity ([9b63388](https://github.com/Nerdware-LLC/fixit-web/commit/9b63388e8d5dba1ff8d129827b277603d5702201))
* add Vite envs dec, rm Window, update ProcessEnv ([345fbbf](https://github.com/Nerdware-LLC/fixit-web/commit/345fbbf94f6686c2c7c94f92e2e5a60286ce62d9))
* add Vite-built bundle analysis result html file ([281d55d](https://github.com/Nerdware-LLC/fixit-web/commit/281d55d9f7ef600c302a8fde17ae997411609ceb))
* add WO status chip ([b8b67e4](https://github.com/Nerdware-LLC/fixit-web/commit/b8b67e4b75f22fad777bae8968d7f052f5eb9a3d))
* change limit of max toast msgs to 1 from 2 ([20e983a](https://github.com/Nerdware-LLC/fixit-web/commit/20e983a03004851e5228920851e7d1c17c05d76c))
* **ci:** add 'no-commit-to-branch' hook to forbid pushing to main ([71d6960](https://github.com/Nerdware-LLC/fixit-web/commit/71d696060402fd386517b52803dcc89e225f012f))
* **ci:** add index.html to paths triggering release on PR ([96047ff](https://github.com/Nerdware-LLC/fixit-web/commit/96047ffd3df811f47e0ceeefc2bc818c6aaa27ce))
* **ci:** rm PR from events triggering Release Workflow ([a03e203](https://github.com/Nerdware-LLC/fixit-web/commit/a03e2039f8976f11feb0574ae8219c1777cc44aa))
* **ci:** set engines.node to '>=16.0.0', set explicit node-version in Test Workflow ([4b9b19b](https://github.com/Nerdware-LLC/fixit-web/commit/4b9b19b26dc2794d58c3512603d13a3b082d5ff4))
* **comps:** add re-usable buttons ([25b4250](https://github.com/Nerdware-LLC/fixit-web/commit/25b4250042abd22a13bf149298f8de0f635d1c68))
* **comps:** add reusable Checklist ([083136e](https://github.com/Nerdware-LLC/fixit-web/commit/083136ebe9b6e875ae00bbe42ffab871f1b0b86e))
* **comps:** add reusable DataGrid ([62fa389](https://github.com/Nerdware-LLC/fixit-web/commit/62fa3891c17b010e2836c3b6a33ec2c97f8da118))
* **comps:** add reusable HelpInfo ([499ec18](https://github.com/Nerdware-LLC/fixit-web/commit/499ec18275d52b52552913315baa6a30a241ca3e))
* **comps:** add reusable ItemEventsTimeline ([c0854e7](https://github.com/Nerdware-LLC/fixit-web/commit/c0854e7ef30e3e980176d9910081128cd1352bd7))
* **comps:** add reusable modal comps ([45a47cf](https://github.com/Nerdware-LLC/fixit-web/commit/45a47cfd096f7e55ad0dfde6afa2f21042aa8e5b))
* ensure Sentry is only enabled in non-test envs ([4700d45](https://github.com/Nerdware-LLC/fixit-web/commit/4700d451e42f5847469f6d623655c74b9427bde6))
* export new utils from utils dir ([a977108](https://github.com/Nerdware-LLC/fixit-web/commit/a977108f811f3b33274b084063a03ca5022a4194))
* extract InvoiceProcessStepper into Stepper comp ([dd22b78](https://github.com/Nerdware-LLC/fixit-web/commit/dd22b7819884c8a3f3d42c4d33c8f71562da40b1))
* **gql:** rm unused phoneContact files ([eb7359e](https://github.com/Nerdware-LLC/fixit-web/commit/eb7359efb1389086bb36c574ec954d3dd2197436))
* **html:** expand meta tag entries for 'Keywords' and 'Description' ([1d14194](https://github.com/Nerdware-LLC/fixit-web/commit/1d141943d606a33939e78c6b103ab2077224fd8b))
* impl codegen'd SubscriptionPriceLabels type ([b6bd983](https://github.com/Nerdware-LLC/fixit-web/commit/b6bd98311115e921349bdcdde5fcaa000115a06c))
* **Invite:** add CreateInvite mutation gql def ([2a850c3](https://github.com/Nerdware-LLC/fixit-web/commit/2a850c30c014fee4c7100ed39f24385cd93e18f9))
* **locale:** add dayjs localization imports ([130b76f](https://github.com/Nerdware-LLC/fixit-web/commit/130b76f215aa91a7f2984fe9b18c23f393cdf351))
* lower 'autoClose' to 1.2 seconds ([7f63867](https://github.com/Nerdware-LLC/fixit-web/commit/7f63867705a9341e050b2d0134a3eaf62897dc55))
* misc package updates (minor+patch only) ([be6f85b](https://github.com/Nerdware-LLC/fixit-web/commit/be6f85be260f5127c87a14e3b3e3fa26efacea98))
* mv ProtectedRoute comps to navigation dir ([86406e0](https://github.com/Nerdware-LLC/fixit-web/commit/86406e02edd4c670d13354f359ad059d58e20fc8))
* mv setupTests to tests dir, update for Vitest ([605f63c](https://github.com/Nerdware-LLC/fixit-web/commit/605f63c8c3d777803450e444aaae5d7d7931b4c9))
* overhaul WO item view ([853083c](https://github.com/Nerdware-LLC/fixit-web/commit/853083cbb4a516d5306887f25d340cbe63ac5389))
* proliferate ListViewSettings to storage util, core-item list views ([05e1a2f](https://github.com/Nerdware-LLC/fixit-web/commit/05e1a2f3ca5d7b551ffdc8a6abf08c55de9f28e8))
* replace 'cache-only' fetchPolicy w 'network-only' ([d81c01e](https://github.com/Nerdware-LLC/fixit-web/commit/d81c01e8d0e9877a8d36bfc758385d3a9185b508))
* replace all direct env-var reads with ENV object ([aacefe0](https://github.com/Nerdware-LLC/fixit-web/commit/aacefe0f0dec431e9757b5e50bc2a9a93b83df4d))
* replace AuthToken types w codegen'd API types ([85d7e8c](https://github.com/Nerdware-LLC/fixit-web/commit/85d7e8c93f449af52af13ec8b0766c3092c1e179))
* replace CategoryScale w TimeSeriesScale for Dashboard charts ([9c7057b](https://github.com/Nerdware-LLC/fixit-web/commit/9c7057b3c2fbf1d11fd4a72b1a285a83691fcaa7))
* replace HTTP log lvls from debug to info ([665dcd9](https://github.com/Nerdware-LLC/fixit-web/commit/665dcd9a5b141bc25ccf025d6a1a0c733c6d8cad))
* replace momentjs with dayjs ([c6aa7a4](https://github.com/Nerdware-LLC/fixit-web/commit/c6aa7a42da46007a5f05219e180a6d28c9dfdc49))
* rm 'draggable' prop ([e357c10](https://github.com/Nerdware-LLC/fixit-web/commit/e357c104931e776988affe4fd4ae7124f0854405))
* rm 'pauseOnHover:false' from toast.success ([6a1b6c8](https://github.com/Nerdware-LLC/fixit-web/commit/6a1b6c882474c883648117dcea7c26eb6bad0246))
* rm all Webview context,comps,etc ([8ff0608](https://github.com/Nerdware-LLC/fixit-web/commit/8ff06081c8127d98730147bd6ea8a99227c095d3))
* rm CanvasGradientBG from LandingPage ([1cd8060](https://github.com/Nerdware-LLC/fixit-web/commit/1cd8060f200ef534e16b808a2fcc64896e1d2579))
* rm CheckoutContext (replaced w reactive var) ([5f8b2db](https://github.com/Nerdware-LLC/fixit-web/commit/5f8b2db31e60f74823a52e70cc3bac9f628839b7))
* rm components/ChecklistContainer ([d1977dd](https://github.com/Nerdware-LLC/fixit-web/commit/d1977dd38d01017d2f5221e16e8a99e29158f763))
* rm comps/Typography, Mui comps used directly now ([5221db5](https://github.com/Nerdware-LLC/fixit-web/commit/5221db597d0147fcd730c4a52f20a3959d675e02))
* rm deprecated 'NewConnection' possibleTypes ([628682f](https://github.com/Nerdware-LLC/fixit-web/commit/628682f1375dc00f42b5327d76377f2066f21605))
* rm deprecated Stripe 'bridge pages' ([7cc6eb6](https://github.com/Nerdware-LLC/fixit-web/commit/7cc6eb63261ed340c26ba40b35afe6cc49605e4e))
* rm DevNavMenu ([9d4105b](https://github.com/Nerdware-LLC/fixit-web/commit/9d4105b540df91d04e05de47a8612416df744a86))
* rm DialogButton, place styles in StyledMuiDialog ([eb0840d](https://github.com/Nerdware-LLC/fixit-web/commit/eb0840d8f20bff06b80117b1a317a4c6bb53171c))
* rm ExplainerText standalone comp ([c61b436](https://github.com/Nerdware-LLC/fixit-web/commit/c61b436af98832136a926650bf9c36d242e4837d))
* rm hasSeenIntroStore ([41f1820](https://github.com/Nerdware-LLC/fixit-web/commit/41f1820b21bd49d54b86de6e933b9bd107358108))
* rm index file to enforce specific imports ([45600ff](https://github.com/Nerdware-LLC/fixit-web/commit/45600ff00b4d0201c86ab7b296834db1f4502a19))
* rm mocks, prep for pre-release ([44de9fd](https://github.com/Nerdware-LLC/fixit-web/commit/44de9fd1d0867b12a6dea5caa11a5e93ce713cac))
* rm old 'ListSettingsReactiveStore' type ([dac6eeb](https://github.com/Nerdware-LLC/fixit-web/commit/dac6eebff89108c0eb54e0915b5f2b6076430ffe))
* rm old isItemOwnedByUser nav state ([824d953](https://github.com/Nerdware-LLC/fixit-web/commit/824d953b45f3b2d455f4cf5d509cda0509fd1f37))
* rm old utils/logger dir ([f708b67](https://github.com/Nerdware-LLC/fixit-web/commit/f708b67f13f4ded357efa2a1e9750556d940ff6b))
* rm padding from scroll container ([a205ba4](https://github.com/Nerdware-LLC/fixit-web/commit/a205ba4910e1f021818595cae091b9bf3d4034ef))
* rm tokenFieldsStore ([b3d307d](https://github.com/Nerdware-LLC/fixit-web/commit/b3d307d3028ba89812312843fa1075b211dadcfc))
* rm unused 'Expand' global typedef ([26397f4](https://github.com/Nerdware-LLC/fixit-web/commit/26397f4c641ed1ff5858fdd68c414e523b566faa))
* rm unused Form/FileInput comp ([fc57a10](https://github.com/Nerdware-LLC/fixit-web/commit/fc57a1065206650bc52589d9cdcd4581c3c9d343))
* rm unused util files ([32a317f](https://github.com/Nerdware-LLC/fixit-web/commit/32a317f01b31e7ec44b0bf1ffe293232ec92c1f7))
* rm useQueryParams hook ([8116c7f](https://github.com/Nerdware-LLC/fixit-web/commit/8116c7f4e712173eae5a02f37e8e7e0f3febac26))
* rm web-vitals ([be6a20b](https://github.com/Nerdware-LLC/fixit-web/commit/be6a20bcf83dca555ea9bdae4cc5e235c42a2915))
* rm wo w inv fields query ([2934b83](https://github.com/Nerdware-LLC/fixit-web/commit/2934b83ab3b9e8800dbb9f562afbabb25ff09c31))
* uninstall lodash.merge, rm'd from ReactiveStore ([d8e58eb](https://github.com/Nerdware-LLC/fixit-web/commit/d8e58eb96c2515615936839d58514f803f126d85))
* update ApolloCache type policies ([30bf7e1](https://github.com/Nerdware-LLC/fixit-web/commit/30bf7e1c4d862e8a34983fc90ef36856c55401fe))
* update ApolloLink links ([411452f](https://github.com/Nerdware-LLC/fixit-web/commit/411452f3fe948bbdacae9fe4f1c3282b443918c0))
* update Button ([5d4dc06](https://github.com/Nerdware-LLC/fixit-web/commit/5d4dc065ebeb4d400d20fba70ad49e917afe1807))
* update codegen'd gql types, add types exports ([27c0473](https://github.com/Nerdware-LLC/fixit-web/commit/27c047309c8a0845fb8b907a91553c8bfb0601aa))
* update codegen'd types to reflect API changes ([ea122a8](https://github.com/Nerdware-LLC/fixit-web/commit/ea122a843854f628734b3aeeb2e9d19159d05cd8))
* update components ([567c632](https://github.com/Nerdware-LLC/fixit-web/commit/567c632f8414918b2051d1159f2ced9402787da8))
* update Dialog ([03766c8](https://github.com/Nerdware-LLC/fixit-web/commit/03766c8b708a8e443bdc937b66eb59edb03511c6))
* update env vars ([ccc9f1c](https://github.com/Nerdware-LLC/fixit-web/commit/ccc9f1c97c6f570465494bc04e1bb690f1b73816))
* update ErrorBoundary ([41283c2](https://github.com/Nerdware-LLC/fixit-web/commit/41283c29c289fd38860d593d65bc240d8b07b044))
* update GQL schema for API changes ([2259217](https://github.com/Nerdware-LLC/fixit-web/commit/22592170f75175a34c32b51bfe96a7f25727e5f5))
* update GQL schema for API changes ([1a35c4e](https://github.com/Nerdware-LLC/fixit-web/commit/1a35c4e1fcbe99ba07e91421b94b84eec95db557))
* update GQL schema for API changes ([481ac9e](https://github.com/Nerdware-LLC/fixit-web/commit/481ac9e44836b96276fb378377c8cfda348e34f3))
* update GQL schema used for codegen ([d888ab2](https://github.com/Nerdware-LLC/fixit-web/commit/d888ab2ae2b3d80e64cf82ea5271000a79798cb3))
* update hooks ([0ae4e1b](https://github.com/Nerdware-LLC/fixit-web/commit/0ae4e1b45721368b4f4d4c9a9abfba5d5ddac851))
* update Indicators ([ef63a3d](https://github.com/Nerdware-LLC/fixit-web/commit/ef63a3d9f061f92cf62b8f40f4e4c71484c9acf9))
* update layouts ([01e0a8a](https://github.com/Nerdware-LLC/fixit-web/commit/01e0a8acce05b212f92e8369feab312e91765c63))
* update Logo comps ([abed25f](https://github.com/Nerdware-LLC/fixit-web/commit/abed25fff28d80d75a0483e6ee7361c68cd4e933))
* update packages ([5903dd8](https://github.com/Nerdware-LLC/fixit-web/commit/5903dd89e4795d2cc7d3ff7e47ef9f0726e3a46d))
* update PageNotFound, add DragonIcon ([0cb1b44](https://github.com/Nerdware-LLC/fixit-web/commit/0cb1b44636cd160ced0736c0f268a831b5c295f4))
* update pages ([9142357](https://github.com/Nerdware-LLC/fixit-web/commit/91423573778cfded6d71cff1e93011d4ad96570b))
* update pages/CheckoutPage ([ba47c32](https://github.com/Nerdware-LLC/fixit-web/commit/ba47c32a3550467d8aa0a8d0a3ab3aeeab066c88))
* update pages/LoginPage ([602661e](https://github.com/Nerdware-LLC/fixit-web/commit/602661e4ccb7f8199039429f9910d0d8b3d0e692))
* update pages/PageNotFound ([97c6527](https://github.com/Nerdware-LLC/fixit-web/commit/97c652727e4dd48328790fef48f826d1af8bce04))
* update pages/PrivacyPolicyPage ([9560389](https://github.com/Nerdware-LLC/fixit-web/commit/956038992d91ea158a2598a3a5c1a15fb8d9fa79))
* update pages/ProductsPage ([139eaf1](https://github.com/Nerdware-LLC/fixit-web/commit/139eaf123cf0fde5e527de2edf21d3387cf40139))
* update pages/RegisterPage ([7a5bc0b](https://github.com/Nerdware-LLC/fixit-web/commit/7a5bc0bb32f1f2fd238d3d78770cccfabcff2046))
* update paths to svg files in StripeBadge ([6997375](https://github.com/Nerdware-LLC/fixit-web/commit/69973756062e10cd89a50f6fba95a7ab040f3d1b))
* update reactive vars ([61d61c2](https://github.com/Nerdware-LLC/fixit-web/commit/61d61c2b3592d291bd7a8c38178eaa9d5fe730a7))
* update README w project layout ([9fbe33e](https://github.com/Nerdware-LLC/fixit-web/commit/9fbe33ef94e0f3c0164acbef1592394e8ecc5a61))
* update StripeForm ([84d2104](https://github.com/Nerdware-LLC/fixit-web/commit/84d210403e69898974e726d6ea03a5b7075df554))
* update types ([862b40b](https://github.com/Nerdware-LLC/fixit-web/commit/862b40bbb58b4acc3e6d7bede0c83fcd94b1b47f))
* update Typography comps ([e143dec](https://github.com/Nerdware-LLC/fixit-web/commit/e143dec4a05d7cfc3a0d61235508e3e92edfd0e9))
* update WebView components ([37c0a25](https://github.com/Nerdware-LLC/fixit-web/commit/37c0a2514916154e4f61af1df053fdb96eb37a14))
* **website-expansion:** init commit of 'new' fixit-web pwa files BREAKING_CHANGE ([9ad26f2](https://github.com/Nerdware-LLC/fixit-web/commit/9ad26f20a313dc3432cb21189008af7093194e57))
* whole new look and better perf for ChecklistInput ([5736ec3](https://github.com/Nerdware-LLC/fixit-web/commit/5736ec3fd24635023086ea88a3b27599b0cc56a5))
* WIP update BREAKING_CHANGE ([c62a505](https://github.com/Nerdware-LLC/fixit-web/commit/c62a505c087f198c6852ccb98108966410be00e1))


### Performance Improvements

* **http:** add link attr's and manifest props to improve load time ([c014f44](https://github.com/Nerdware-LLC/fixit-web/commit/c014f4405f522156442c1f6aebb9cb74423cb6e4))
* **images:** replace PNGs w WEBPs, rm unused ([f25512b](https://github.com/Nerdware-LLC/fixit-web/commit/f25512b8eb3c73329a1ea863ff7ef6d5dc2e5d15))
* rm index file to enforce specific imports for tree-shaking ([35171d8](https://github.com/Nerdware-LLC/fixit-web/commit/35171d8bfc963f6b4ebbfce266f2990a94334fda))
* rm index files to enforce specific imports for tree-shaking ([72f1b43](https://github.com/Nerdware-LLC/fixit-web/commit/72f1b43aba40b997f0f169e1c9007d8acc9dde1b))

## [1.2.3](https://github.com/Nerdware-LLC/fixit-web/compare/v1.2.2...v1.2.3) (2023-03-14)

## [1.2.3](https://github.com/Nerdware-LLC/fixit-web/compare/v1.2.2...v1.2.3) (2023-03-14)

## [1.2.2](https://github.com/Nerdware-LLC/fixit-web/compare/v1.2.1...v1.2.2) (2022-11-01)


### Bug Fixes

* **pre-commit:** ensure pre-commit doesnt modify snapshots ([0128938](https://github.com/Nerdware-LLC/fixit-web/commit/0128938e7594f8ff1f4eabe2a19d08c393a3b736))

## [1.2.1](https://github.com/Nerdware-LLC/fixit-web/compare/v1.2.0...v1.2.1) (2022-11-01)

# [1.2.0](https://github.com/Nerdware-LLC/fixit-web/compare/v1.1.3...v1.2.0) (2022-11-01)


### Bug Fixes

* **axios:** downgrade axios to 'v0.27.2' to address CRA build-chain fail ([a7fc52a](https://github.com/Nerdware-LLC/fixit-web/commit/a7fc52ab4cceb5aad13844c6ffc92716cb78dffe))
* **CheckoutPage:** change stripePaymentIntent_id to '...ID' ([79b24a0](https://github.com/Nerdware-LLC/fixit-web/commit/79b24a0deddd6df1b4cc299346d94f5a57281bfc))


### Features

* **ci:** change Test ROUTER_BASE_PATH to '/' ([bdb1fcc](https://github.com/Nerdware-LLC/fixit-web/commit/bdb1fcc8fcd01b4b84f4d1252c5ecaef5eb513a0))
* **tests:** update several Jest snapshots ([417c91e](https://github.com/Nerdware-LLC/fixit-web/commit/417c91e05ffcabc8af272e45db0c918159d9fbf0))
* **ts:** convert 'services' to Typescript ([7c87d5e](https://github.com/Nerdware-LLC/fixit-web/commit/7c87d5e3f0b31c9975904ec893aa75615b9a6083))

## [1.1.3](https://github.com/Nerdware-LLC/fixit-web/compare/v1.1.2...v1.1.3) (2022-11-01)


### Bug Fixes

* **packages:** convert '@types/' pkgs from dev-dep to dep for CRA build chain ([a8c4a2d](https://github.com/Nerdware-LLC/fixit-web/commit/a8c4a2de3bd03d2e2fd8ab04c50b472baa19a142))

## [1.1.2](https://github.com/Nerdware-LLC/fixit-web/compare/v1.1.1...v1.1.2) (2022-11-01)


### Bug Fixes

* **ci:** correct name of exported class ([e919001](https://github.com/Nerdware-LLC/fixit-web/commit/e91900104e4d4ca261da0bb2dbe00c7d357e4daf))
* **packages:** convert 'react-test-renderer' from dev-dep to dep for CRA build chain ([bbec5d5](https://github.com/Nerdware-LLC/fixit-web/commit/bbec5d5847083f6f4c90a0fb7fde4053c3609116))

## [1.1.1](https://github.com/Nerdware-LLC/fixit-web/compare/v1.1.0...v1.1.1) (2022-11-01)


### Bug Fixes

* **ci:** convert custom GH Actions Jest reporter file to '.cjs', update npm script ([47ba10e](https://github.com/Nerdware-LLC/fixit-web/commit/47ba10eaa0e9a5ccb6f99c37a83c158f46bdb45f))

# [1.1.0](https://github.com/Nerdware-LLC/fixit-web/compare/v1.0.0...v1.1.0) (2022-11-01)


### Features

* **ts:** convert typescript from dev-dep to regular dep for CRA ([b671875](https://github.com/Nerdware-LLC/fixit-web/commit/b671875e98bcc6809ccf6d812ac0d2d8b46eabb1))

# 1.0.0 (2022-11-01)


### Features

* add [@types](https://github.com/types) and [@testing](https://github.com/testing) devDeps ([4eba233](https://github.com/Nerdware-LLC/fixit-web/commit/4eba233907db2caecbd8d94e270a854a668415f6))
* add auto-mocked 'react-router-dom' module ([dacb6de](https://github.com/Nerdware-LLC/fixit-web/commit/dacb6decedc16b155fb624980c182a0abee87970))
* add DevNavMenu page component and testing files ([a58921e](https://github.com/Nerdware-LLC/fixit-web/commit/a58921e38118318c03d76b81fa4386a18965d856))
* add mock ([f5bfcc1](https://github.com/Nerdware-LLC/fixit-web/commit/f5bfcc109339a3cdcbc5140cc291608979fe2792))
* add npmrc and nvmrc ([7e213d6](https://github.com/Nerdware-LLC/fixit-web/commit/7e213d66cace28388d9a4269fe1fdd0ab6ba3c90))
* add PageNotFound with testing files ([3b67135](https://github.com/Nerdware-LLC/fixit-web/commit/3b671359a0569304828cc9a3d57cf979ae3e30b8))
* add Semantic Release config file ([7acac2b](https://github.com/Nerdware-LLC/fixit-web/commit/7acac2b5fffbc77d5a6a1355ff0dbf65f1ddc812))
* add storage mock and prefix token key w underscore ([936ed47](https://github.com/Nerdware-LLC/fixit-web/commit/936ed47b9e5ddb20c1ff24df06920a0b316bb35f))
* add test files ([14f0602](https://github.com/Nerdware-LLC/fixit-web/commit/14f06023e961ec6d6a85657bab33673fe2be604d))
* add test files ([da27cdc](https://github.com/Nerdware-LLC/fixit-web/commit/da27cdcf7bffcde6a96a590e9604f88d23b7e6ce))
* add test files and snapshots ([82dfb39](https://github.com/Nerdware-LLC/fixit-web/commit/82dfb398db854adc9cdb93cdfe7dc6e83db133a9))
* add test files, rename page component ([2cf312e](https://github.com/Nerdware-LLC/fixit-web/commit/2cf312e459014e30529eaf870172892e82a0dd86))
* add test files, update name to CheckoutPage ([a59e2bd](https://github.com/Nerdware-LLC/fixit-web/commit/a59e2bd2af35a8e7d2b66c12b92164924ad3f410))
* add test files, update page component name ([63f3de2](https://github.com/Nerdware-LLC/fixit-web/commit/63f3de2e7bf02c52190eb931d9faa652dd448265))
* add test files, update s.c. to [@emotion](https://github.com/emotion) ([d1513ef](https://github.com/Nerdware-LLC/fixit-web/commit/d1513efa55683e168b271b61a91f36f6287f5767))
* add test files, update to [@mui](https://github.com/mui) v5 ([4a3c5dd](https://github.com/Nerdware-LLC/fixit-web/commit/4a3c5ddc8b5a33d960531d78a3e1b4305236e62f))
* add to browserslist and mv testing+type deps to devDeps ([f0809b9](https://github.com/Nerdware-LLC/fixit-web/commit/f0809b97892114505efcacd755e4a4a6a449baca))
* **ci:** add GitHub Actions Jest reporter ([a75d393](https://github.com/Nerdware-LLC/fixit-web/commit/a75d393bf388fc48b40115636ff29455eaa4a75c))
* **ci:** add Test and Release GH Actions, update Upload w prod env vars ([2491ad4](https://github.com/Nerdware-LLC/fixit-web/commit/2491ad4a8ea2567ef88485de1b853a27b4f2c508))
* mv into own dir, add test files ([16fe7f6](https://github.com/Nerdware-LLC/fixit-web/commit/16fe7f6464e55b39e9ffaf4bcd92049d8ed25975))
* mv to own dir, add test files ([58a672a](https://github.com/Nerdware-LLC/fixit-web/commit/58a672a7da22b717a0a3bcfeb826e299aeca9542))
* **package.json:** rm old browserlist entries, update packages ([6d74527](https://github.com/Nerdware-LLC/fixit-web/commit/6d74527bcce36fdc4728744371ecb65f55c30758))
* update [@mui](https://github.com/mui) to v5, add test files ([21de3b9](https://github.com/Nerdware-LLC/fixit-web/commit/21de3b92e57474342c69d6e719abbc9265d8eceb))
