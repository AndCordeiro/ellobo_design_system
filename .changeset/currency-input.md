---
'@ellobo/design-system': minor
---

Adds `CurrencyInput`: money field with an ATM-style mask driven by `Intl` (`currency` + `locale`),
so the same component renders `59,90` for BRL/pt-BR, `12,345.67` for USD/en-US or `1,234` for
JPY. Values are integers in the currency's minor unit. Also exports `formatCurrency`,
`formatMinorUnits`, `currencySymbol`, `minorUnitDigits` and `digitsToMinorUnits`.
