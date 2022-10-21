# Chain Status webpage Technical Information

## Lazy loading
1. I use redux to handle states. sectionsShow specifically https://github.com/kiegroup/chain-status/blob/main/packages/webpage/src/service/layout.service.tsx#L43

2. Then section is only shown based on the state https://github.com/kiegroup/chain-status/blob/f891b11cfedfc8c10143a2c7f7c1d0afd5a7bc0f/packages/webpage/src/components/pullrequests/List.tsx#L21

3. and then the section is registered  on redux machinery based on the callback from https://github.com/kiegroup/chain-status/blob/f891b11cfedfc8c10143a2c7f7c1d0afd5a7bc0f/packages/webpage/src/components/shared/MenuSelection.tsx#L29 whenever the section is shown based on an observer with some extra margins https://github.com/kiegroup/chain-status/blob/4ac20d86fcec9d6f94879bef6f3ad614527b03a2/packages/webpage/src/components/shared/MenuSelection.tsx#L86
